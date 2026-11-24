import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoModal({ isOpen, mode = "add", initialData = null, onClose, onSubmit }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "to-do",
        priority: initialData.priority || "low",
        deadline: initialData.deadline || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [mode, initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Judul tugas wajib diisi.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 900,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "460px",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: "20px" }}>
          {mode === "edit" ? "Update Todo" : "Tambah Todo"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
              Judul
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul tugas"
              style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
              Deskripsi
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi tugas"
              style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 10px" }}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
                Prioritas
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 10px" }}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#4f6ef7",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {mode === "edit" ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}