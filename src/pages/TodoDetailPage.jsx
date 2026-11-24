import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetailPage({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const todo = todos.find((item) => String(item.id) === String(id));

  if (!todo) {
    return (
      <div style={{ maxWidth: "700px", margin: "60px auto", textAlign: "center" }}>
        <h2>Tugas tidak ditemukan</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "760px", margin: "60px auto", padding: "0 20px" }}>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "28px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "24px",
          background: "#fff",
        }}
      >
        <div>
          <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Judul</h2>
          <p style={{ marginTop: 0, marginBottom: "24px", color: "#334155" }}>{todo.title}</p>

          <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Deskripsi</h3>
          <div
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              padding: "12px",
              minHeight: "90px",
              color: "#334155",
            }}
          >
            {todo.description || "-"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: "4px" }}>Status</h3>
            <p style={{ marginTop: 0, marginBottom: "16px", color: "#334155" }}>{todo.status}</p>

            <h3 style={{ marginTop: 0, marginBottom: "4px" }}>Prioritas</h3>
            <p style={{ marginTop: 0, marginBottom: "16px", color: "#334155" }}>{todo.priority}</p>

            <h3 style={{ marginTop: 0, marginBottom: "4px" }}>Deadline</h3>
            <p style={{ marginTop: 0, marginBottom: "20px", color: "#334155" }}>{todo.deadline}</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Kembali
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              style={{
                background: "#4f6ef7",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isEditOpen}
        mode="edit"
        initialData={todo}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(updatedData) => onUpdateTodo(todo.id, updatedData)}
      />
    </div>
  );
}