import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Item, RenderItem, itemValidator } from "@/components/RenderItem";
import { log } from "console";
import { number, z } from "zod";
// interface Selectors {
//   currentOrder: number[];
//   orderUpdater: (val: number[]) => void;
// }

interface OrderRow {
  itemId: number;
  quantity: number;
}

export type Order = OrderRow[];

const TableValidator = z.object({
  id: z.number().positive().int(),
  location: z.object({
    id: z.number().positive().int(),
    name: z.string(),
    Item: z.array(itemValidator),
  }),
});

type Table = z.infer<typeof TableValidator>;

const DinePage = () => {
  const router = useRouter();

  const [table, setTable] = useState<Table | null>(null);
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

  const tableId = router.query.table_id;
  useEffect(() => {
    const getItemsFromApi = async () => {
      if (!tableId) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tables/${tableId}`
      );
      const data = await response.json();
      const validated = TableValidator.safeParse(data);
      if (!validated.success) {
        router.push("/");
        return;
      }
      setTable(validated.data);
    };
    getItemsFromApi();
  }, [router.query]);

  const flattenOrder = (order: Order) => {
    let result = [];

    for (let i = 0; i < order.length; i++) {
      const item = order[i];

      for (let i = 0; i < item.quantity; i++) {
        result.push(item.itemId);
      }
    }

    return result;
  };

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
            itemIds: flattenOrder(order),
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

  if (!table) {
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
        Hello diners of table {tableId}! Welcome and enjoy this assortment of
        meals
      </h1>
      <div className="order-overview">
        <p>{JSON.stringify(order)}</p>
        <button className="order-button" onClick={submitOrder}>
          Place Order
        </button>
      </div>
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
          {table.location.Item.filter(filterItem).map((item) => (
            <div className="items-card" key={item.title}>
              <RenderItem
                id={item.id}
                title={item.title}
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
    </div>
  );
};
export default DinePage;
