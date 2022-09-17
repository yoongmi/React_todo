import { Draggable, Droppable } from "react-beautiful-dnd";
import DragableCard from "./DragableCard";
import styled from "styled-components";
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

  //보드삭제
  const deleteBoard = () => {
    setToDos((prev) => {
      const copy = { ...prev };
      delete copy[boardId];
      return { ...copy };
    });
  };

  //리스트 전부 삭제
  const deleteAll = () => {
    setToDos((prev) => {
      return { ...prev, [boardId]: [] };
    });
  };

  return (
    <Wrapper>
      <Title>
        {boardId} <button onClick={deleteBoard}>X</button>
      </Title>
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
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
            <button onClick={deleteAll}>Delete List All</button>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
  button {
    font-weight: 300;
    color: #666;
    cursor: pointer;
    border: 0 none;
    background-color: transparent;
  }
`;
const Wrapper = styled.div`
  padding: 10px 0 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  position: relative;
  flex-grow: 1;
  padding: 10px;
  padding-bottom: 45px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#c5c4ec"
      : props.isDraggingFromThis
      ? "#e8e8e8"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  border-radius: 0 0 5px 5px;
  & > button {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
    height: 30px;
    border: 0 none;
    cursor: pointer;
    &:hover {
    }
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 30px;
    border: 0 none;
    border-bottom: 2px solid #6c5ce7;
    padding: 0 5px;
  }
`;

export default Board;
