import { useForm } from "react-hook-form";

interface IData {
  todo: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm();

  const handleOnValid = (data: IData) => {
    console.log("data", data);
    setValue("todo", "");
  };

  console.log("errors", errors);

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleSubmit(handleOnValid)}>
        <input {...register("todo", { required: "todo is required" })} type="text" placeholder="Write a todo" />
        <button type="submit">Add</button>
      </form>
      <h1>{errors?.todo?.message}</h1>
    </div>
  );
};

export default ToDoList;
