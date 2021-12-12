import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

const ToDo = ({ id, text, category }: IToDo) => {
  const setToDo = useSetRecoilState(toDoState);

  const handleChangeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDo((todoArray) => {
      const targetIndex = todoArray.findIndex((todo) => todo.id === id);
      const frontArray = todoArray.slice(0, targetIndex);
      const backArray = todoArray.slice(targetIndex + 1);
      const newTodo = { id, text, category: name as IToDo["category"] };
      const newTodoArray = [...frontArray, newTodo, ...backArray];
      return newTodoArray;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={handleChangeCategory}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={handleChangeCategory}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={handleChangeCategory}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
