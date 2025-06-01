import TodoItem from "./TodoItem";
import { useState, type ChangeEvent } from "react";
import { useTodoInfo } from "../hooks/useTodoStore";

const List = () => {
  const { todoItems, activeGroupId, groups } = useTodoInfo();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const activeGroup = groups.find((g) => g.id === activeGroupId);
  const groupName = activeGroup?.name ?? "그룹";

  const filteredTodos = todoItems.filter(
    (todo) =>
      todo.groupId === activeGroupId &&
      (!search.trim() ||
        todo.content.toLowerCase().includes(search.toLowerCase()))
  );

  const totalCount = filteredTodos.length;
  const doneCount = filteredTodos.filter((todo) => todo.isDone).length;
  const notDoneCount = totalCount - doneCount;

  return (
    <div className="flex flex-col gap-7">
      <h4 className="text-xl font-semibold">{groupName} 그룹의 Todo List 📃</h4>

      <div className="flex flex-col text-sm text-gray-600 gap-2">
        <span>총 {totalCount}건 중에서</span>
        <span>{doneCount}건 해냈고</span>
        <span>{notDoneCount}건 해야 해요!</span>
      </div>

      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
        className="w-full border-b-2 border-blue-300 py-3 focus:outline-none focus:border-blue-500"
      />

      <div className="bg-[#FFFCEF] px-7 py-5 rounded-lg">
        <div className="flex flex-col gap-5">
          {filteredTodos.length === 0 ? (
            <span className="text-gray-500 text-sm text-center">
              검색 결과가 없습니다.
            </span>
          ) : (
            filteredTodos.map((todo) => <TodoItem key={todo.id} {...todo} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
