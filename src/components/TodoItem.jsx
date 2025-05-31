import { TodoDispatchContext } from "../App";
import "./TodoItem.css"
import { memo, useContext } from "react";

const TodoItem = ({id, isDone, content, date}) => {
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);
    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return <div className="TodoItem">
                {/* button이 아니기 때문에 onClick()이 아니라 onChange() */}
                <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
                <div className="content">{content}</div>
                <div className="date">{new Date(date).toLocaleDateString()}</div>
                <button onClick={onClickDeleteButton}>삭제</button>
            </div>
}

export default memo(TodoItem);