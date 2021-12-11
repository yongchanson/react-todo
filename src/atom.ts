import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "To Do" | "Doing" | "Done";
}

export const toDoState = atom<IToDo[]>({ key: "toDoState", default: [] });

export const categoryState = atom<IToDo["category"]>({ key: "categoryState", default: "To Do" });

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const currentToDos = get(toDoState);
    const currentCategory = get(categoryState);
    const filteredToDoArray = currentToDos.filter((todo) => todo.category === currentCategory);
    return filteredToDoArray;
  },
});
