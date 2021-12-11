import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atom";

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
      {category !== "To Do" && (
        <button name="To Do" onClick={handleChangeCategory}>
          To Do
        </button>
      )}
      {category !== "Doing" && (
        <button name="Doing" onClick={handleChangeCategory}>
          Doing
        </button>
      )}
      {category !== "Done" && (
        <button name="Done" onClick={handleChangeCategory}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
