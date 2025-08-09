import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { useAuth } from "../context/AuthContext";
import { getTasks, saveTasks } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';

const TaskList = ({ tasks, setTasks }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Média",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("pending");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setTasks(getTasks(user));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...editingTask, ...form } : task
      );
      setTasks(updatedTasks);
      saveTasks(user, updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        ...form,
        completed: false,
      };
      const updated = [...tasks, newTask];
      setTasks(updated);
      saveTasks(user, updated);
    }

    setForm({ title: "", category: "", priority: "Média", dueDate: "" });
  };

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    saveTasks(user, updatedTasks);

    // Atualiza lista de acordo com o filtro
    if (filter === "pending") {
      setTasks(updatedTasks.filter((t) => !t.completed));
    } else if (filter === "completed") {
      setTasks(updatedTasks.filter((t) => t.completed));
    } else {
      setTasks(updatedTasks);
    }
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveTasks(user, updated);
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate || "",
    });
    setEditingTask(task);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "high") return task.priority === "Alta";
    if (filter === "medium") return task.priority === "Média";
    if (filter === "low") return task.priority === "Baixa";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filtros + Contadores */}
      <div className="flex flex-col items-center gap-4">
        {/* Contadores */}
        <div className="flex gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
            Concluídas: {tasks.filter(t => t.completed).length}
          </div>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium">
            Pendentes: {tasks.filter(t => !t.completed).length}
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("pending")}
          >
            Pendentes
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("completed")}
          >
            Concluídas
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "high" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("high")}
          >
            Alta
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "medium" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("medium")}
          >
            Média
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "low" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("low")}
          >
            Baixa
          </button>
        </div>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="Título"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleInputChange}
          placeholder="Categoria"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium shadow hover:bg-blue-600 transition"
        >
          {editingTask ? "Salvar Alterações" : "Adicionar Tarefa"}
        </button>
      </form>

      {/* Lista de Tarefas */}
      <div className="space-y-3">
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhuma tarefa encontrada.
          </p>
        )}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
