import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";

function App() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pt-10 px-4">
      <Header />
      <Editor />
      <List />
    </div>
  );
}
export default App;
