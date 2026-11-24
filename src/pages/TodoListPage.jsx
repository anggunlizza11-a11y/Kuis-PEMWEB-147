import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoModal";

export default function TodoListPage({ todos, onAddTodo, onDeleteTodo }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmDelete = (todo) => {
    const confirmed = window.confirm(`Yakin ingin menghapus tugas "${todo.title}"?`);
    if (confirmed) {
      onDeleteTodo(todo.id);
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "32px" }}>Todo List</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          style={{
            background: "#4f6ef7",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Tambah Todo
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
            <th style={{ padding: "12px 8px" }}>Judul</th>
            <th style={{ padding: "12px 8px" }}>Status</th>
            <th style={{ padding: "12px 8px" }}>Prioritas</th>
            <th style={{ padding: "12px 8px" }}>Deadline</th>
            <th style={{ padding: "12px 8px", textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>
                Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 8px" }}>{todo.title}</td>
                <td style={{ padding: "14px 8px" }}>{todo.status}</td>
                <td style={{ padding: "14px 8px" }}>{todo.priority}</td>
                <td style={{ padding: "14px 8px" }}>{todo.deadline}</td>
                <td style={{ padding: "14px 8px", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button
                      title="Lihat Detail"
                      onClick={() => navigate(`/todo/${todo.id}`)}
                      style={{
                        background: "#4f6ef7",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Hapus Tugas"
                      onClick={() => handleConfirmDelete(todo)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <TodoModal
        isOpen={isAddOpen}
        mode="add"
        onClose={() => setIsAddOpen(false)}
        onSubmit={onAddTodo}
      />
    </div>
  );
}