import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { useAuth } from "../context/AuthContext";
import { getTasks, saveTasks } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const TaskList = ({ tasks, setTasks }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Média",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [startIndex, setStartIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const MAX_VISIBLE = 5;
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setTasks(getTasks(user));
    }
  }, [user, setTasks]);

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
    setShowPopup(false);
  };

  // 🔹 Agora mantém sempre a lista completa no estado
  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    saveTasks(user, updatedTasks);
    setTasks(updatedTasks);
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
    setShowPopup(true);
  };

  // 🔹 Filtro aplicado apenas na hora de exibir
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "high") return task.priority === "Alta";
    if (filter === "medium") return task.priority === "Média";
    if (filter === "low") return task.priority === "Baixa";
    return true;
  });

  const getVisibleTasks = () => {
    if (filteredTasks.length <= MAX_VISIBLE) {
      return filteredTasks;
    }
    const result = [];
    for (let i = 0; i < MAX_VISIBLE; i++) {
      result.push(filteredTasks[(startIndex + i) % filteredTasks.length]);
    }
    return result;
  };

  const visibleTasks = getVisibleTasks();

  useEffect(() => {
    if (filteredTasks.length <= MAX_VISIBLE) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % filteredTasks.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [filteredTasks]);

  const scrollCarousel = (direction) => {
    if (filteredTasks.length <= MAX_VISIBLE) return;
    setStartIndex((prev) =>
      direction === "left"
        ? (prev - 1 + filteredTasks.length) % filteredTasks.length
        : (prev + 1) % filteredTasks.length
    );
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-6 bg-gray-50 p-6 pt-4 rounded-2xl shadow-md">
        {/* Coluna esquerda */}
        <div className="flex flex-col col-span-2 items-center space-y-5">
          <h2 className="text-2xl font-semibold mb-6">Tarefas</h2>

          <div className="flex space-x-3">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded font-medium text-sm">
              Concluídas: {tasks.filter(t => t.completed).length}
            </div>
            <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded font-medium text-sm">
              Pendentes: {tasks.filter(t => !t.completed).length}
            </div>
          </div>

          {/* Filtros principais */}
          <div className="flex flex-wrap justify-center space-x-2">
            {[
              { key: "all", label: "Todos" },
              { key: "pending", label: "Pendentes" },
              { key: "completed", label: "Concluídas" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  filter === key ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Filtros secundários */}
          <div className="flex space-x-2">
            {[
              { key: "high", label: "Alta", color: "bg-red-500" },
              { key: "medium", label: "Média", color: "bg-yellow-500" },
              { key: "low", label: "Baixa", color: "bg-green-500" },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                className={`px-3 py-1 rounded text-xs font-normal ${
                  filter === key
                    ? `${color} text-white`
                    : "bg-gray-200"
                }`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Botão adicionar */}
          <button
            onClick={() => setShowPopup(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow text-lg font-medium mt-4 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Adicionar Tarefa
          </button>
        </div>

        {/* Coluna direita */}
        <div className="col-span-8 flex items-center space-x-2 ml-8">
          <button
            onClick={() => scrollCarousel('left')}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="flex gap-4 py-2 overflow-hidden">
            {visibleTasks.length === 0 && (
              <p className="text-center text-gray-500 self-center">
                Nenhuma tarefa encontrada.
              </p>
            )}
            {visibleTasks.map((task) => (
              <div key={task.id} className="flex-shrink-0 w-64">
                <TaskCard
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('right')}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 w-96 shadow-lg space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
              </h2>
              <button
                type="button"
                onClick={() => { setShowPopup(false); setEditingTask(null); }}
                className="text-gray-500 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="Título"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              placeholder="Categoria"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {editingTask ? "Salvar Alterações" : "Adicionar Tarefa"}
            </button>

            <button
              type="button"
              onClick={() => { setShowPopup(false); setEditingTask(null); }}
              className="w-full mt-2 py-2 text-center text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TaskList;
