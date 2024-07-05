import { Order } from "@/pages/dine/[location_id].tsx/[table_id]";
import { RenderItemProps } from "./RenderItem";
import { RenderItem } from "./RenderItem";

const addItem = (itemId: number, currentOrder: Order): Order => {
  console.log(currentOrder);
  const currentRow = currentOrder.find((row) => row.itemId === itemId);
  if (currentRow === undefined) {
    return [...currentOrder, { itemId: itemId, quantity: 1 }];
  } else {
    const newOrder = currentOrder.map((row) => {
      if (row.itemId !== itemId) {
        return row;
      } else {
        return { ...row, quantity: row.quantity + 1 };
      }
    });
    return newOrder;
  }
};

const removeItem = (itemId: number, currentOrder: Order): Order => {
  const currentRow = currentOrder.find((row) => row.itemId === itemId);
  // if the item is in there, reduce quantity by one
  // if the item is not in there, do nothing
  if (currentRow === undefined) {
    return currentOrder;
  } else {
    // if the quanity of the row was equal to 1 before removal, we remove the whole row
    if (currentRow.quantity === 1) {
      const newOrder = currentOrder.filter((row) => row.itemId !== itemId);
      return newOrder;
    } else {
      // otherwise we just lower quantiy by 1
      const newOrder = currentOrder.map((row) => {
        if (row.itemId !== itemId) {
          return row;
        } else {
          return { ...row, quantity: row.quantity - 1 };
        }
      });
      return newOrder;
    }
  }
};

export interface CounterProps {
  itemId: number;
  currentOrder: Order;
  updater: (val: Order) => void;
}

const Counter = (props: CounterProps) => {
  const increment = () => {
    props.updater(addItem(props.itemId, props.currentOrder));
  };
  const decrement = () => {
    props.updater(removeItem(props.itemId, props.currentOrder));
  };

  return (
    <div className="counter-container">
      <p>
        Amount:{" "}
        {props.currentOrder.find((row) => row.itemId === props.itemId)
          ?.quantity || 0}
      </p>
      <div className="counter">
        <button className="button" onClick={decrement}>
          -
        </button>
        <button className="button" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};
export default Counter;
