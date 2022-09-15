import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "../../atoms2";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface ICate {
  category: string;
}

function ToDoList() {
  //watch : form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    console.log(category);
  };

  const { register, handleSubmit, setValue } = useForm<ICate>();
  const setCate = useSetRecoilState(categoryState);
  const cateSubmit = (cate: ICate) => {
    const newCate = cate;
    console.log(cate);
    setValue("category", "");
  };

  return (
    <Container>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(cateSubmit)}>
        <input {...register("category")} placeholder="add category" />
        <button>Add</button>
      </form>
      <br />
      <form>
        <select value={category} onInput={onInput}>
          <option value={categories.TO_DO}>TO DO</option>
          <option value={categories.DOING}>DOING</option>
          <option value={categories.DONE}>DONE</option>
        </select>
      </form>
      <CreateToDo />
      <hr />
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
  h1 {
    font-size: 30px;
    font-wieght: bold;
  }
`;

export default ToDoList;
