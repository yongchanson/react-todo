# React ToDo

### React Hook Form

- React Hook Form을 이용해서 form과 input을 쉽게 만들고, 관리할 수 있다.
- React Hook Form을 이용하면 value, setValue, onSubmit, onChange등 Form에 필요한 모든 것들을 대체할 수 있다.
- useForm() 내부에서 다양한 메서드들을 가져와서 사용할 수 있다.
- `register()`
  - register()함수는 input에 등록하는 함수로서 input에 필요한 모든 속성들을 가지고 있다.
  - `{...register("input type명")}`를 통해 input의 type을 지정하고, 다양한 속성들을 지정할 수 있다.
  - html input에 지정한 속성들은 변조가 가능하지만, react hook form을 이용해서 js로 지정한 속성들은 변조하지 못하게 막아준다.
- `watch()`
  - watch()를 통해 register()를 통해 등록한 모든 input의 변경사항을 실시간으로 확인할 수 있다.
  - 일종의 onChange이벤트가 하는 역할과 비슷하다.
- `handleSubmit`
  - handleSubmit은 form의 onSubmit에서 사용하는 함수로, 첫 번째 인자로는 onValid함수를, 두 번째 인자로는 onInValid함수를 받는다.
  - onValid함수는 form의 onSubmit이 성공했을 때, 실행하는 함수이고, onInValid함수는 실패했을 때, 실행하는 함수이다.
  - form의 onSubmit이 성공했을 때, onValid함수의 인자로 input에 입력한 값들을 객체로 받아올 수 있다.
- `formState`
  - formState에는 form에서 발생하는 다양한 상태를 볼 수 있는데, 그 중 formState.error를 이용하면 form에서 발생하는 에러를 확인할 수 있다.
- `setError`
  - setError()를 통해 기존 input에서 발생한 error외에 또 다른 error들을 커스터마이징해서 발생시킬 수 있다.
  - `setError("extraError", { message: "Server is offline" })`처럼 input외적으로 발생한 오류도 처리할 수 있다.
- `setValue`
  - setValue("email","")를 통해 form을 성공적으로 submit하고 난 후에, 해당 input의 값을 ""로 비워줄 수 있다.
- https://react-hook-form.com

```javascript
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

// `useForm<IForm>({ defaultValues: { email: "@naver.com", firstName: "sugar", lastName: "salt"} })`을 통해 각각의 input의 기본 값을 설정해 줄 수 있다.
const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm < IForm > { defaultValues: { email: "@naver.com", firstName: "sugar", lastName: "salt" } };

  const onValid = (data: IForm) => {
    console.log("data", data);
    if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: "PasswordConfirm is wrong" }, { shouldFocus: true });
    } else {
      setError("successMessage", { message: "You have successfully submitted the form" });
    }
    setValue("email", "");
  };
  console.log("errors", errors);

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
        <input
          // pattern을 통해 해당 input의 입력 값을 정규표현식으로 체크해 줄 수 있다.
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
          // validate에는 추가적으로 확인할 것들이 여러 개 필요할 때, 구분해서 확인할 수 있다.
          // validate는 기본적으로 함수를 가지고, 함수가 리턴하는 값이 문자열 또는 false이면 해당 validate의 검증을 실패한 것이다.
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
        // setError를 통해 전달한 message를 받게 된다.
        <span>{errors?.successMessage?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;
```

### ToDo.tsx

```js
import { IToDo } from "../atom";

// IToDo["category"] 형태로 IToDo인터페이스에서 category의 내용만 가져올 수 있다.
const ToDo = ({ text, category }: IToDo) => {
  const handleChangeCategory = (category: IToDo["category"]) => {
    console.log("category", category);
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "To Do" && <button onClick={() => handleChangeCategory("To Do")}>To Do</button>}
      {category !== "Doing" && <button onClick={() => handleChangeCategory("Doing")}>Doing</button>}
      {category !== "Done" && <button onClick={() => handleChangeCategory("Done")}>Done</button>}
    </li>
  );
};

export default ToDo;
```
