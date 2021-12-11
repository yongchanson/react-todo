import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IData {
  todo: string;
}

const Form = () => {
  const setToDo = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IData>();

  const handleOnValid = (data: IData) => {
    setValue("todo", "");
    setToDo((state) => {
      return [...state, { id: Date.now(), text: data.todo, category: "To Do" }];
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnValid)}>
        <input {...register("todo", { required: "To Do is required" })} type="text" placeholder="Write a to do." />
        <button type="submit">Add</button>
      </form>
      <h1>{errors?.todo?.message}</h1>
    </>
  );
};

export default Form;
