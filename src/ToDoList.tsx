import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, watch, handleSubmit } = useForm();
  console.log("watch", watch());
  console.log("handleSubmit", handleSubmit);

  return (
    <div>
      <h1>ToDoList</h1>
      <form>
        <input {...register("email")} type="text" placeholder="Email" />
        <input {...register("firstName")} type="text" placeholder="FirstName" />
        <input {...register("lastName")} type="text" placeholder="LastName" />
        <input {...register("username")} type="text" placeholder="Username" />
        <input {...register("password")} type="text" placeholder="Password" />
        <input {...register("passwordConfirm")} type="text" placeholder="PasswordConfirm" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;

/*
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
*/
