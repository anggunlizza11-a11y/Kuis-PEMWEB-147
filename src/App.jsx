import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/InitialTodos";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => {
      setFeedback("");
    }, 3000);
  };

  const handleAddTodo = (newTodoData) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((item) => Number(item.id))) + 1 : 1;

    const newTodo = {
      id: nextId,
      ...newTodoData,
    };

    setTodos((prev) => [...prev, newTodo]);
    showFeedback("Tugas baru berhasil ditambahkan.");
  };

  const handleUpdateTodo = (id, updatedData) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    showFeedback("Informasi tugas berhasil diperbarui.");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
    showFeedback("Tugas berhasil dihapus.");
  };

  return (
    <BrowserRouter>
      {feedback && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            background: "#1e293b",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "6px",
            zIndex: 1000,
            fontSize: "14px",
          }}
        >
          {feedback}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAddTodo={handleAddTodo}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}