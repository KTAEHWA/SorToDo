import "./Header.css";
import { memo } from "react";

const Header = () => {
    return <div className="Header">
                <h3>오늘은 📆</h3>
                <h1>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일</h1>
            </div>
}

export default memo(Header);