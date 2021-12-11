import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atom";
import Form from "./Form";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDo = useRecoilValue(toDoState);
  const [filteredToDo, filteredDoing, filteredDone] = useRecoilValue(toDoSelector);

  return (
    <div>
      <Form />
      <h2>To Do</h2>
      <ul>
        {filteredToDo.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />

      <h2>Doing</h2>
      <ul>
        {filteredDoing.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />

      <h2>Done</h2>
      <ul>
        {filteredDone.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ToDoList;
