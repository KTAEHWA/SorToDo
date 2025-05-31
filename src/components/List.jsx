import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData 호출!");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="flex flex-col gap-7">
      <h4 className="text-lg font-semibold">Todo List 📃</h4>

      <div className="flex flex-col text-sm text-gray-600 gap-2">
        <span>total: {totalCount}</span>
        <span>done: {doneCount}</span>
        <span>notDone: {notDoneCount}</span>
      </div>

      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
        className="w-full border-b-2 border-blue-300 py-3 focus:outline-none focus:border-blue-500"
      />

      <div className="flex flex-col gap-5">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default List;
