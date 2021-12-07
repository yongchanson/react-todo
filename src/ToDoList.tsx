import React, { useState } from "react";

const ToDoList = () => {
  const [value, setValue] = useState("");

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue("");
  };

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleSubmitForm}>
        <input value={value} onChange={handleChangeInput} type="text" placeholder="Write a to do"></input>
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
