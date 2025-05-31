import { useState, useRef } from "react";
import { useTodoActions } from "../hooks/useTodoStore";
import type { ChangeEvent, KeyboardEvent } from "react";

const Editor = () => {
  const { onCreate } = useTodoActions();

  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLInputElement>(null);

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
    onCreate(content);
    setContent("");
  };

  return (
    <div className="flex gap-2 mb-5">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={onSubmit}
        className="w-20 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      >
        추가
      </button>
    </div>
  );
};

export default Editor;
