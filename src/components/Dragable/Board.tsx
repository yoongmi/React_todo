import { Droppable } from "react-beautiful-dnd";
import DragableCard from "./DragableCard";
import styled, { createGlobalStyle } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../../atoms";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

const Title = styled.h3`
  padding-top: 10px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
`;
const Wrapper = styled.div`
  padding: 10px 0 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 230px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#d5d5d5"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  border-radius: 0 0 5px 5px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 25px;
  }
`;

export default Board;
