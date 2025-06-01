import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useTodoActions } from "../hooks/useTodoStore";
import { useTodoInfo } from "../hooks/useTodoStore";

const Editor = () => {
  const { onCreate } = useTodoActions();
  const { groups, activeGroupId } = useTodoInfo();

  const [content, setContent] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedGroupId(activeGroupId);
  }, [activeGroupId]);

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content.trim() === "") {
      contentRef.current?.focus();
      return;
    }
    if (selectedGroupId === null) {
      window.alert("새로운 Todo를 추가할 그룹을 선택해주세요.");
      return;
    }
    onCreate(content, selectedGroupId);
    setContent("");
  };

  return (
    <div className="flex flex-col gap-2 mb-5">
      <div className="flex gap-2">
        <select
          value={selectedGroupId ?? undefined}
          onChange={(e) => setSelectedGroupId(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-[100px]"
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <input
          ref={contentRef}
          value={content}
          onKeyDown={onKeydown}
          onChange={onChangeContent}
          placeholder="새로운 Todo를 입력하세요."
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={onSubmit}
          className="w-20 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default Editor;
