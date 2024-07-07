import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Item, RenderItem } from "@/components/RenderItem";
import { log } from "console";

// interface Selectors {
//   currentOrder: number[];
//   orderUpdater: (val: number[]) => void;
// }

interface OrderRow {
  itemId: number;
  quantity: number;
}

export type Order = OrderRow[];

const DinePage = () => {
  const router = useRouter();

  const [items, setItems] = useState<Item[] | null>(null);
  const [filter, setFilter] = useState<
    "all" | "frequent" | "appetizers" | "mainCourse" | "desserts"
  >("all");
  const [order, setOrder] = useState<Order>([]);

  const filterItem = (item: Item): boolean => {
    if (filter === "all") {
      return true;
    }
    if (filter === "frequent") {
      if (item.frequent === true) {
        return true;
      }
    }
    if (filter === "appetizers") {
      if (item.category.name === "Appetizer") {
        return true;
      }
    }
    if (filter === "mainCourse") {
      if (item.category.name === "Main Course") {
        return true;
      }
    }
    if (filter === "desserts") {
      if (item.category.name === "Desserts") return true;
    }
    return false;
  };
  const locationId = router.query.location_id;
  const tableId = router.query.table_id;
  useEffect(() => {
    const getItemsFromApi = async () => {
      const locationId = router.query.location_id;
      const tableId = router.query.table_id;
      if (!locationId) {
        console.log("ERROR");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/locations/${locationId}/items`
      );
      const data = await response.json();
      setItems(data);
    };
    getItemsFromApi();
  }, [router.query]);

  const submitOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableId: Number(tableId),
            itemIds: order.map((orderItem) => orderItem.itemId),
          }),
        }
      );
      if (response.ok) {
        console.log("Great Success! Order has been placed!");
      } else {
        console.error("Failed to submit order!", await response.json());
      }
    } catch (error) {
      console.error("Failed to submit order!", error);
    }
  };

  if (!items) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  //---//

  return (
    <div className="items-page">
      <h1 className="header-greeting">
        Hello diners of table {tableId}! Welcome and enjoy this {locationId}
        assortment of meals
      </h1>
      <p>{JSON.stringify(order)}</p>
      {/* <button onClick={() => setOrder(addItem(2, order))}>
        Add item with ID 2
      </button>
      <button onClick={() => setOrder(addItem(12, order))}>
        Add item with ID 12
      </button>
      <button onClick={() => setOrder(removeItem(12, order))}>
        Remove item with ID 12
      </button> */}
      {/* <p>{filter}</p> */}
      <div className="filter-buttons">
        <button className="button" onClick={() => setFilter("all")}>
          Show All
        </button>
        <button className="button" onClick={() => setFilter("frequent")}>
          Popular Items
        </button>
        <button className="button" onClick={() => setFilter("appetizers")}>
          Appetizers
        </button>
        <button className="button" onClick={() => setFilter("mainCourse")}>
          Main Course
        </button>
        <button className="button" onClick={() => setFilter("desserts")}>
          Desserts
        </button>
      </div>
      <div className="items-header">
        <ul>
          {items.filter(filterItem).map((item) => (
            <div className="items-card" key={item.title}>
              <RenderItem
                id={item.id}
                title={item.title}
                categoryId={item.categoryId}
                description={item.description}
                price={item.price}
                frequent={item.frequent}
                currentOrder={order}
                orderUpdater={setOrder}
              />
            </div>
          ))}
        </ul>
      </div>
      <button className="button" onClick={submitOrder}>
        Place Order
      </button>
    </div>
  );
};
export default DinePage;
