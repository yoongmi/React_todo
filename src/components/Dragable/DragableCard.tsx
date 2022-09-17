import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../../atoms";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const setTodo = useSetRecoilState(toDoState);
  const deleteClick = () => {
    setTodo((prev) => {
      const copyList = [...prev[boardId]].filter((list) => list.id !== toDoId);
      return {
        ...prev,
        [boardId]: copyList,
      };
    });
  };
  return (
    <div>
      <Draggable key={index} draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            {toDoText}

            <DeleteIcon onClick={deleteClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 16 16"
                width="15px"
                height="15px"
              >
                <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z" />
              </svg>
            </DeleteIcon>
          </Card>
        )}
      </Draggable>
    </div>
  );
}

const DeleteIcon = styled.button`
  width: 20px;
  height: 20px;
  border: 0 none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity 0.3s;
`;

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 7px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#c2c9ff" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 5px rgba(0,0,0,0.5)" : "none"};

  button {
    opacity: 0.3;
  }
  &:hover button {
    opacity: 0.8;
  }
`;

export default React.memo(DragableCard);
// React.memo() 변화된 아이템만 렌더링.
