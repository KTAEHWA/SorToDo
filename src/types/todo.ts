export type Group = {
  id: number;
  name: string;
  color: string;
};

export type Todo = {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
  groupId: number;
};

export type Todos = Todo[];
export type Groups = Group[];
