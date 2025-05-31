import { TodoDispatchContext } from "../App";
import { useState, useRef, useContext } from "react";

const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content.trim() === "") {
      contentRef.current.focus();
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
        className="w-20 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        추가
      </button>
    </div>
  );
};

export default Editor;
