import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, toDoState } from "../../atoms";

interface IForm {
  board: string;
}

function CreateBoard() {
  //보드추가
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setBoard = useSetRecoilState(BoardState);
  const setTodo = useSetRecoilState(toDoState);

  const submit = ({ board }: IForm) => {
    const newBoard = board;

    setTodo((prev) => {
      return { ...prev, [newBoard]: [] };
    });

    setValue("board", "");
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <input
        {...register("board", { required: true })}
        type="text"
        placeholder="Add Board"
      />
      <button>Add</button>
    </Form>
  );
}

const Form = styled.form`
  margin-bottom: 20px;
`;

export default CreateBoard;
