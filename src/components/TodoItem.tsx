import { useTodoActions } from "../hooks/useTodoStore";
import type { Todo } from "../types/todo";

const TodoItem = ({ id, isDone, content, date }: Todo) => {
  const { onUpdate, onDelete } = useTodoActions();

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center gap-5 pb-5 border-b border-gray-200">
      <input
        onChange={onChangeCheckbox}
        checked={isDone}
        type="checkbox"
        className="w-5 h-5"
      />
      <div className="flex-1">{content}</div>
      <div className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString()}
      </div>
      <button
        onClick={onClickDeleteButton}
        className="text-sm text-gray-500 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
      >
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
