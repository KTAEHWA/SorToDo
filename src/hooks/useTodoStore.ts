import todoItems from "../constants/todoItems";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { Todos } from "../types/todo";

interface TodoActions {
  onCreate: (content: string) => void;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
}

interface TodoState {
  todoItems: Todos;
  nextId: number;

  actions: TodoActions;
}

export const useTodoStore = create<TodoState>()(
  immer((set, _) => ({
    todoItems: todoItems,
    nextId: 3,
    actions: {
      onCreate: (content: string) => {
        set((state) => {
          const newTodo = {
            id: state.nextId++,
            isDone: false,
            content,
            date: Date.now(),
          };
          state.todoItems.push(newTodo);
        });
      },
      onUpdate: (targetId: number) => {
        set((state) => {
          const todoItem = state.todoItems.find((item) => item.id === targetId);
          if (todoItem) {
            todoItem.isDone = !todoItem.isDone;
          }
        });
      },
      onDelete: (targetId: number) => {
        set((state) => {
          state.todoItems = state.todoItems.filter(
            (item) => item.id !== targetId
          );
        });
      },
    },
  }))
);

export const useTodoInfo = () =>
  useTodoStore(
    useShallow((state) => ({
      todoItems: state.todoItems,
      nextId: state.nextId,
    }))
  );

export const useTodoActions = () => useTodoStore((state) => state.actions);
