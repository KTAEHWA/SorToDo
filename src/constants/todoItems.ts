import type { Todos } from "../types/todo";

const todoItems: Todos = [
  { id: 0, isDone: false, content: "React 공부하기", date: Date.now() },
  { id: 1, isDone: false, content: "빨래하기", date: Date.now() },
  { id: 2, isDone: false, content: "청소하기", date: Date.now() },
];

export default todoItems;
