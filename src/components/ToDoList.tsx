import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IData {
  todo: string;
}

interface IToDo {
  id: number;
  text: string;
  category: "To Do" | "Doing" | "Done";
}

const toDoState = atom<IToDo[]>({ key: "toDoState", default: [] });

const ToDoList = () => {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleOnValid = (data: IData) => {
    console.log("data", data);
    setValue("todo", "");
    setToDo((state) => {
      return [...state, { id: Date.now(), text: data.todo, category: "To Do" }];
    });
  };
  console.log("toDo", toDo);

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit(handleOnValid)}>
        <input {...register("todo", { required: "todo is required" })} type="text" placeholder="Write a todo" />
        <button type="submit">Add</button>
      </form>
      <h1>{errors?.todo?.message}</h1>
      <ul>
        {toDo.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
