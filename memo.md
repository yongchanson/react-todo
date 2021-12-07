# React ToDo

### React Hook Form

- https://react-hook-form.com
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

```js
import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, watch, handleSubmit, formState } = useForm();
  const currentInputValues = watch();
  const formStateError = formState.errors;

  const onValid = (data: any) => {
    console.log("data", data);
  };

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
```
