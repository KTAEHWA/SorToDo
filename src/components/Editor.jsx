import { TodoDispatchContext } from "../App";
import "./Editor.css";
import { useState, useRef, useContext } from "react";

const Editor = () => {

    const { onCreate } = useContext(TodoDispatchContext);

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    // 엔터키를 눌렀을 때 해당 내용을 제출
    const onKeydown = (e) => {
        if(e.keyCode === 13) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        // 빈 문자열은 투두에 추가하지 않는다
        if(content === "") {
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }

    return (
        <div className="Editor">
            <input ref={contentRef} value={content} onKeyDown={onKeydown} onChange={onChangeContent} placeholder="새로운 Todo..."/>
            <button onClick={onSubmit}>추가</button>
        </div>
    )
}

export default Editor;