import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { Todos, Groups } from "../types/todo";

interface TodoActions {
  onCreate: (content: string, groupId?: number) => void;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
}

interface GroupActions {
  onAddGroup: (name: string, color: string) => void;
  onSetActiveGroup: (groupId: number) => void;
  onDeleteGroup: (groupId: number) => void;
}

interface TodoState {
  todoItems: Todos;
  nextId: number;
  nextGroupId: number;
  groups: Groups;
  activeGroupId: number | null;
  todoActions: TodoActions;
  groupActions: GroupActions;
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todoItems: [],
    nextId: 0,
    nextGroupId: 0,
    groups: [],
    activeGroupId: null,

    todoActions: {
      onCreate: (content, groupId) => {
        set((state) => {
          const group = groupId ?? state.activeGroupId;
          if (group === null) return;
          const newTodo = {
            id: state.nextId++,
            isDone: false,
            content,
            date: Date.now(),
            groupId: group,
          };
          state.todoItems.push(newTodo);
        });
      },
      onUpdate: (targetId) => {
        set((state) => {
          const todo = state.todoItems.find((t) => t.id === targetId);
          if (todo) todo.isDone = !todo.isDone;
        });
      },
      onDelete: (targetId) => {
        set((state) => {
          state.todoItems = state.todoItems.filter((t) => t.id !== targetId);
        });
      },
    },

    groupActions: {
      onAddGroup: (name, color) => {
        set((state) => {
          const newId = state.nextGroupId++;
          state.groups.push({ id: newId, name, color });
          state.activeGroupId = newId;
        });
      },
      onSetActiveGroup: (groupId) => {
        set((state) => {
          state.activeGroupId = groupId;
        });
      },
      onDeleteGroup: (groupId) => {
        set((state) => {
          state.groups = state.groups.filter((g) => g.id !== groupId);
          state.todoItems = state.todoItems.filter(
            (t) => t.groupId !== groupId
          );

          if (state.activeGroupId === groupId) {
            const nextGroup = state.groups[0];
            state.activeGroupId = nextGroup ? nextGroup.id : null;
          }
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
      groups: state.groups,
      activeGroupId: state.activeGroupId,
    }))
  );

export const useTodoActions = () => useTodoStore((state) => state.todoActions);

export const useGroupActions = () =>
  useTodoStore((state) => state.groupActions);
