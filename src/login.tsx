import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//     const [value, setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//       const {
//         currentTarget: { value },
//       } = event;
//       setToDoError("");
//       setToDo(value);
//     };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       if (toDoError.length < 20) {
//         return setToDoError("To do should be longer");
//       }
//       console.log("submit");
//     };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={value}
//           type="text"
//           placeholder="write a todo"
//         />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface Iform {
  email: string;
  firstName: string;
  password: string;
  password2: string;
  extraError?: string;
}

function ToDoList() {
  //watch : form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Iform>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: Iform) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        {
          message: "password are not the same",
        },
        { shouldFocus: true }
      );
    }

    // setError("extraError", { message: "server offline" });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("firstName", { required: "write here" })}
          placeholder="write a todo"
        />
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 10 })}
          placeholder="password"
        />
        <span>{errors.password?.message}</span>
        <input
          {...register("password2", {
            required: "write here",
            minLength: {
              value: 5,
              message: "youre password is too short.",
            },
          })}
          placeholder="password"
        />
        <span>{errors.password2?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
