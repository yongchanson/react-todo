import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log("data", data);
  };
  console.log("register", register("email"));
  console.log("errors", errors);

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
        <input
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com/g, message: "Only @naver.com emails allowed" },
          })}
          type="email"
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: { value: false, message: "Write your firstname" }, minLength: 5 })} type="text" placeholder="FirstName" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: { value: false, message: "Write your lastname" }, minLength: 5 })} type="text" placeholder="LastName" />
        <span>{errors?.lastName?.message}</span>
        <input {...register("username", { required: { value: true, message: "Username is required" }, minLength: 5 })} type="text" placeholder="Username" />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "Password is required", minLength: { value: 5, message: "Your Password is too short" } })}
          type="password"
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("passwordConfirm", { required: "PasswordConfirm is required", minLength: 5 })} type="password" placeholder="PasswordConfirm" />
        <span>{errors?.passwordConfirm?.message}</span>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
