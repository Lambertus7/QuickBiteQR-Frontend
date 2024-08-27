import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Item, RenderItem, itemValidator } from "@/components/RenderItem";
import { number, z } from "zod";
import QRCode from "react-qr-code";
import TicTacToe from "@/components/Tictactoe";

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
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const tictactoeDialogRef = useRef<null | HTMLDialogElement>(null);
  const historyDialogRef = useRef<null | HTMLDialogElement>(null);
  const [table, setTable] = useState<Table | null>(null);
  const [filter, setFilter] = useState<
    "all" | "frequent" | "appetizers" | "mainCourse" | "desserts"
  >("all");
  const [order, setOrder] = useState<Order>([]);
  const [orderHistory, setOrderHistory] = useState<Order>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

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

      for (let j = 0; j < item.quantity; j++) {
        result.push(item.itemId);
      }
    }

    return result;
  };

  const OrderToItems = (order: Order) => {
    return order.map((orderRow) => {
      const menuItem = table?.location.Item.find(
        (item) => item.id === orderRow.itemId
      );
      return {
        name: menuItem?.title || "Unknown Item",
        quantity: orderRow.quantity,
      };
    });
  };

  const calculateTotalPrice = () => {
    return order.reduce((total, item) => {
      const menuItem = table?.location.Item.find((i) => i.id === item.itemId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
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
        setOrder([]);
        setConfirmationMessage("Order has been placed!");
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

  const mappedOrder = OrderToItems(order);

  const OrderHistory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrderHistory(data);
      } else {
        console.error("Failed to fetch order history");
      }
    } catch (error) {
      console.error("Error fetching order history", error);
    }
  };

  const ShowOrderHistory = () => {
    OrderHistory();
    historyDialogRef.current?.showModal();
  };

  return (
    <div className="items-page">
      <dialog className="order-dialog" ref={dialogRef} autoFocus>
        {confirmationMessage ? (
          <>
            <p>{confirmationMessage}</p>
            <button
              className="nice-button order-button"
              onClick={() => {
                setConfirmationMessage("");
                dialogRef.current?.close();
              }}
            >
              Place another order
            </button>
          </>
        ) : (
          <>
            <ul>
              {mappedOrder.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <div className="btn-row">
              <button
                className="nice-button order-button"
                onClick={submitOrder}
              >
                Place Order
              </button>
              <button
                className="nice-button close-button"
                onClick={() => dialogRef.current?.close()}
              >
                close
              </button>
            </div>
          </>
        )}
      </dialog>
      <dialog className="tictactoe-dialog" ref={tictactoeDialogRef} autoFocus>
        <TicTacToe />
        <button
          className="nice-button close-button"
          onClick={() => tictactoeDialogRef.current?.close()}
        >
          Close
        </button>
      </dialog>
      <dialog
        className="history-dialog"
        ref={historyDialogRef}
        autoFocus
      ></dialog>
      <h1 className="header-greeting">Hello diners of table {tableId}!</h1>
      <button className="nice-button history-button" onClick={ShowOrderHistory}>
        History
      </button>
      <button
        className="nice-button show-button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Check & place order
      </button>
      <button
        className="nice-button tictactoebutton"
        onClick={() => tictactoeDialogRef.current?.showModal()}
      >
        Play TicTacToe
      </button>
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
