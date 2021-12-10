import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "To Do" | "Doing" | "Done";
}

export const toDoState = atom<IToDo[]>({ key: "toDoState", default: [] });
