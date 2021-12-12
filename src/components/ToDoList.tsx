import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, IToDo, toDoSelector } from "../atom";
import Form from "./Form";
import ToDo from "./ToDo";

const ToDoList = () => {
  const filteredToDoArray = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  console.log("filteredToDoArray", filteredToDoArray);

  const handleSelectInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as IToDo["category"]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h1>📝 To Do 📝</h1>
      <hr />
      <form>
        <select value={category} onInput={handleSelectInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <Form />
      {filteredToDoArray?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDoList;
