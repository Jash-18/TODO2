import { useState, useCallback, useEffect } from "react";
import { todoService } from "../services/api";
import toast from "react-hot-toast";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Fade from "@mui/material/Fade";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const isCompleted = todo.status === "completed";

  const priorityLabels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Fade in timeout={300}>
      <div className={`todo-card ${isCompleted ? "completed" : ""}`}>
        <div className="todo-card-header">
          <div
            className={`todo-checkbox ${isCompleted ? "checked" : ""}`}
            onClick={() => onToggle(todo._id)}
            role="checkbox"
            aria-checked={isCompleted}
            tabIndex={0}
          >
            {isCompleted && (
              <CheckIcon style={{ fontSize: 14, color: "white" }} />
            )}
          </div>
          <div className="todo-card-content">
            <div className="todo-card-title">{todo.title}</div>
            {todo.description && (
              <div className="todo-card-desc">{todo.description}</div>
            )}
            <div className="todo-card-meta">
              <span className={`todo-badge badge-priority-${todo.priority}`}>
                {priorityLabels[todo.priority]}
              </span>
              {todo.dueDate && (
                <span className="todo-badge badge-due">
                  <CalendarTodayIcon style={{ fontSize: 12, marginRight: 4 }} />
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>
          <div className="todo-card-actions">
            <button
              className="icon-btn"
              onClick={() => onEdit(todo)}
              aria-label="Edit todo"
            >
              <EditIcon style={{ fontSize: 18 }} />
            </button>
            <button
              className="icon-btn delete"
              onClick={() => onDelete(todo._id)}
              aria-label="Delete todo"
            >
              <DeleteIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

const TodoModal = ({ todo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
    priority: todo?.priority || "medium",
    dueDate: todo?.dueDate ? todo.dueDate.split("T")[0] : "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    await onSave({
      ...formData,
      dueDate: formData.dueDate || undefined,
    });
    setLoading(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{todo ? "Edit Task" : "New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Add some details..."
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Priority</label>
              <select
                className="form-control"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Saving..." : todo ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
      style={{ maxWidth: 360 }}
    >
      <h2 className="modal-title">Confirm</h2>
      <p style={{ color: "var(--gray-600)", marginBottom: "1.5rem" }}>
        {message}
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          style={{ flex: 1 }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
          style={{ flex: 1 }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      const { data } = await todoService.getAll(params);
      setTodos(data.todos);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggle = async (id) => {
    try {
      const { data } = await todoService.toggle(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editTodo) {
        const { data } = await todoService.update(editTodo._id, formData);
        setTodos((prev) =>
          prev.map((t) => (t._id === editTodo._id ? data.todo : t)),
        );
        toast.success("Task updated");
      } else {
        const { data } = await todoService.create(formData);
        setTodos((prev) => [data.todo, ...prev]);
        toast.success("Task created");
      }
      setModalOpen(false);
      setEditTodo(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await todoService.delete(deleteId);
      setTodos((prev) => prev.filter((t) => t._id !== deleteId));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setDeleteId(null);
    }
  };

  const openEdit = (todo) => {
    setEditTodo(todo);
    setModalOpen(true);
  };

  const openNew = () => {
    setEditTodo(null);
    setModalOpen(true);
  };

  const filteredTodos = todos;
  const pendingCount = todos.filter((t) => t.status === "pending").length;
  const completedCount = todos.filter((t) => t.status === "completed").length;

  return (
    <>
      <div className="todo-header">
        <h1 className="todo-title">My Tasks</h1>
        <p className="todo-subtitle">
          {pendingCount} pending, {completedCount} completed
        </p>
      </div>

      <div className="add-todo-card">
        <button className="btn btn-primary btn-block" onClick={openNew}>
          + Add New Task
        </button>
      </div>

      <div className="filters">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-title">No tasks yet</div>
          <p>Add your first task to get started!</p>
        </div>
      ) : (
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={openEdit}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <TodoModal
          todo={editTodo}
          onClose={() => {
            setModalOpen(false);
            setEditTodo(null);
          }}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
};

export default TodoList;
