import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
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

  useEffect(() => {
    setTasks(getTasks());
  }, []);

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
      saveTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        ...form,
        completed: false,
      };
      const updated = [...tasks, newTask];
      setTasks(updated);
      saveTasks(updated);
    }

    setForm({ title: "", category: "", priority: "Média", dueDate: "" });
  };

  const handleToggle = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveTasks(updated);
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

  return (
    <div className="space-y-6">
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
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhuma tarefa ainda.
          </p>
        )}
        {tasks.map((task) => (
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
