import { useCounterStore } from "../lib/counter.store";

export default function BasicExample() {
  const { count, increment } = useCounterStore();
  return (
    <div>
      <button onClick={increment}>count is {count}</button>
      <p>Basic example using Zustand for state management.</p>
    </div>
  );
}
