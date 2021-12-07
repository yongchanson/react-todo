import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log("data", data);
  };
  console.log("formState.errors", formState);

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
        <input {...register("email", { required: true, minLength: 10 })} type="text" placeholder="Email" />
        <input {...register("firstName", { required: true, minLength: 5 })} type="text" placeholder="FirstName" />
        <input {...register("lastName", { required: true, minLength: 5 })} type="text" placeholder="LastName" />
        <input {...register("username", { required: true, minLength: 5 })} type="text" placeholder="Username" />
        <input {...register("password", { required: true, minLength: { value: 5, message: "Your Password is too short" } })} type="text" placeholder="Password" />
        <input {...register("passwordConfirm", { required: "PasswordConfirm is required", minLength: 5 })} type="text" placeholder="PasswordConfirm" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
