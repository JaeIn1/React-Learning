import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function List({ todoData, setTodoDate }) {
  const btnStyle = {
    color: "#fff",
    border: "none",
    paddting: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  const getStyle = (completed) => {
    return {
      paddting: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
      backgroundColor: "aliceBlue",
      marginBottom: "6px",
    };
  };

  const handleClick = (id) => {
    let newTodoDate = todoData.filter((data) => data.id !== id);
    console.log(newTodoDate);
    setTodoDate(newTodoDate);
  };
  const handleCompleChange = (id) => {
    let newTodoDate = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    setTodoDate(newTodoDate);
  };

  const handleEnd = (result) => {
    if (!result.destination) return;
    const newTodoData = todoData;
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoDate(newTodoData);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  drappableId="todo"
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className={`${
                          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
                      >
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={() => handleCompleChange(data.id)}
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        />
                        {data.title}
                        <button
                          style={btnStyle}
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
