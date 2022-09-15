import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragableCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
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
          </Card>
        )}
      </Draggable>
    </div>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 7px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#c2c9ff" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

export default React.memo(DragableCard);
// React.memo() 변화된 아이템만 렌더링.
