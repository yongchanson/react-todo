import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "To Do" | "Doing" | "Done";
}

export const toDoState = atom<IToDo[]>({ key: "toDoState", default: [] });

// selector는 atom을 통해 생성한 state값을 받아와서 state값을 변형해서 변형한 결과를 반환한다.
// 주의할 점은 state자체를 바꾸는 것이 아닌 state의 output인 결과 값을 바꾸고 있는 것이다.
// selector()메서드를 이용해서 selector함수를 생성해준 후, key와 get을 지정해준다.
// get은 함수를 가지고, 함수의 파라미터로 get함수를 받아와서 get함수를 통해 state값을 받아온 후, state값을 변형해서 반환할 수 있다.
// selector함수의 get에서 반환한 값은 useRecoilValue(toDoSelector)를 통해 받아올 수 있다.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const allToDos = get(toDoState);
    const filteredToDo = allToDos.filter((todo) => todo.category === "To Do");
    const filteredDoing = allToDos.filter((todo) => todo.category === "Doing");
    const filteredDone = allToDos.filter((todo) => todo.category === "Done");
    const filteredAllToDoArray = [filteredToDo, filteredDoing, filteredDone];
    return filteredAllToDoArray;
  },
});
