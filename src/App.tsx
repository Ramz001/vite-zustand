import BasicExample from "./components/basic-example";
import AsyncExample from "./components/async-example";

function App() {
  return (
    <>
      <h1>Zustand Tests</h1>
      <BasicExample />
      <hr style={{ margin: "40px 0" }} />
      <AsyncExample />
    </>
  );
}

export default App;
