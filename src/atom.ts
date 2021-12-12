import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

const localStorageToDos = localStorage.getItem("ToDos");
const parsedToDos = JSON.parse(localStorageToDos as any);

export const toDoState = atom<IToDo[]>({ key: "toDoState", default: parsedToDos?.length > 0 ? parsedToDos : [] });

export const categoryState = atom<IToDo["category"]>({ key: "categoryState", default: Categories.TO_DO });

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const currentToDos = get(toDoState);
    const currentCategory = get(categoryState);
    const filteredToDoArray = currentToDos.filter((todo) => todo.category === currentCategory);
    return filteredToDoArray;
  },
});
