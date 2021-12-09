import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  passwordConfirm: string;
  successMessage?: string;
  extraError?: string;
}

const ReactHookForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({ defaultValues: { email: "@naver.com", firstName: "sugar", lastName: "salt" } });

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: "PasswordConfirm is wrong" }, { shouldFocus: true });
    } else {
      setError("successMessage", { message: "You have successfully submitted the form" });
    }
    setValue("email", "");
  };

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
        <input {...register("firstName", { required: { value: false, message: "Write your firstname" }, minLength: 3 })} type="text" placeholder="FirstName" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: { value: false, message: "Write your lastname" }, minLength: 3 })} type="text" placeholder="LastName" />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: { value: true, message: "Username is required" },
            validate: {
              noMasterWord: (value) => {
                if (value.match(/master/g)) {
                  return "Can't use a master word!";
                }
                return true;
              },
              noBadWord: (value) => {
                if (value.match(/bad/g)) {
                  return "Can't use a bad word!";
                }
                return true;
              },
            },
            minLength: 3,
          })}
          type="text"
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "Password is required", minLength: { value: 3, message: "Your Password is too short" } })}
          type="password"
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("passwordConfirm", { required: "PasswordConfirm is required", minLength: 3 })} type="password" placeholder="PasswordConfirm" />
        <span>{errors?.passwordConfirm?.message}</span>
        <button type="submit">Add</button>
        <span>{errors?.successMessage?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ReactHookForm;
