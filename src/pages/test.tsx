// import { useState } from "react";

// export default function Home() {
//   return (
//     <main>
//       <h1>Hello lifting</h1>
//       <A></A>
//     </main>
//   );
// }

// const A = () => {
//   const [count, setCount] = useState<number>(0);
//   return (
//     <div className="comp-div">
//       <p>I am A!</p>
//       <p>Count is: {count}</p>
//       {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
//       <B amount={count}></B>
//       <C quantity={count} updater={setCount}></C>
//     </div>
//   );
// };

// interface bProps {
//   amount: number;
// }

// const B = (props: bProps) => {
//   return (
//     <div className="comp-div">
//       <p>I am B!</p>
//       <p>Amount is: {props.amount}</p>
//     </div>
//   );
// };

// interface cProps {
//   quantity: number;
//   updater: (val: number) => void;
// }

// const C = (props: cProps) => {
//   return (
//     <div className="comp-div">
//       <p>I am C!</p>
//       <p>Quantity is: {props.quantity}</p>
//       <button onClick={() => props.updater(props.quantity + 1)}>
//         Increment
//       </button>
//       <button onClick={() => props.updater(props.quantity - 1)}>
//         Decrement
//       </button>
//     </div>
//   );
// };
//---//
import { useState } from "react";

const DATA = ["Mark", "Brandon", "Swen"];

interface OrderItem {
  quantity: number;
  itemId: number;
}

type Order = OrderItem[];

const ORDERDATA: Order = [{ quantity: 5, itemId: 12 }];

const Mapping = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  return (
    <div>
      <p>Selected: {JSON.stringify(selectedStudents)}</p>
      {DATA.map((student) => {
        return (
          <RenderStudent
            key={student}
            name={student}
            currentSelected={selectedStudents}
            updater={setSelectedStudents}
          />
        );
      })}
    </div>
  );
};

interface renderStudentProps {
  name: string;
  currentSelected: string[];
  updater: (val: string[]) => void;
}

const RenderStudent = (props: renderStudentProps) => {
  return (
    <div>
      <div>
        <p>{props.name}</p>
        <button
          onClick={() => {
            props.updater([...props.currentSelected, props.name]);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            props.updater(
              props.currentSelected.filter((name) => props.name !== name)
            );
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Mapping;
