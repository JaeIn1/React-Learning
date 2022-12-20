import React, { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import "./App.css";
export default function App() {
  const [todoData, setTodoDate] = useState([]);
  const [value, setValue] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoDate((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div>
          <h1>할일목록</h1>
        </div>
        <List todoData={todoData} setTodoDate={setTodoDate} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
