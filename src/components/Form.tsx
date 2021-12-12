import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IData {
  todo: string;
}

const Form = () => {
  const setToDo = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IData>();

  const handleOnValid = (data: IData) => {
    setValue("todo", "");
    setToDo((state) => {
      return [...state, { id: Date.now(), text: data.todo, category }];
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
