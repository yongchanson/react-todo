import { useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import Form from "./Form";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDo = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Do</h1>
      <Form />
      <ul>
        {toDo.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
