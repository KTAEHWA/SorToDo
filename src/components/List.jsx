import { TodoStateContext } from "../App";
import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";

const List = () => {
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilteredData = () => {
        if (search === "") {
            return todos;
        }
        return todos.filter((todo) => 
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    }

    const filteredTodos = getFilteredData();

    const {totalCount, doneCount, notDoneCount} = useMemo(() => {
        // memoization 하고 싶은 연산
        console.log("getAnalyzedData 호출!");
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;
    
         return {
                totalCount,
                doneCount,
                notDoneCount
        }
    }, [todos])

    return (
        <div className="List">
            <h4>Todo List 📃</h4>
            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요"/>
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => {
                    return <TodoItem key={todo.id} {...todo} />; // 리스트 형태로 렌더링된 컴포넌트들은
                                                                 // 고유한 키값을 주어 구분한다
                })}
            </div>
        </div>
    )
}

export default List;