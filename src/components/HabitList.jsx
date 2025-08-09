import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { getHabits, saveHabits } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import HabitCard from './HabitCard';
import { format } from 'date-fns';

const HabitList = ({ habits, setHabits }) => {
  const [form, setForm] = useState({ name: '', frequency: 'diário' });
  const [filter, setFilter] = useState("todos");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setHabits(getHabits(user));
    }
  }, [user, setHabits]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHabit = {
      id: uuidv4(),
      name: form.name,
      frequency: form.frequency,
      history: [],
    };

    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabits(user, updated);

    setForm({ name: '', frequency: 'diário' });
  };

  const toggleToday = (id) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    const updated = habits.map((habit) => {
      if (habit.id === id) {
        const alreadyMarked = habit.history.includes(today);
        const newHistory = alreadyMarked
          ? habit.history.filter((d) => d !== today)
          : [...habit.history, today];
        return { ...habit, history: newHistory };
      }
      return habit;
    });

    setHabits(updated);
    saveHabits(user, updated);
  };

  const handleDelete = (id) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    saveHabits(user, updated);
  };

  // Filtrando hábitos
  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    if (filter === "pending") return !habit.history.includes(format(new Date(), 'yyyy-MM-dd'));
    if (filter === "completed") return habit.history.includes(format(new Date(), 'yyyy-MM-dd'));
    if (filter === "daily") return habit.frequency === "diário";
    if (filter === "weekly") return habit.frequency === "semanal";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filtros + Contadores */}
      <div className="flex flex-col items-center gap-4">
        {/* Contadores */}
        <div className="flex gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
            Concluídas: {habits.filter(h => h.history.includes(format(new Date(), 'yyyy-MM-dd'))).length}
          </div>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium">
            Pendentes: {habits.filter(h => !h.history.includes(format(new Date(), 'yyyy-MM-dd'))).length}
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
            className={`px-3 py-1 rounded ${filter === "daily" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("daily")}
          >
            Diário
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "weekly" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("weekly")}
          >
            Semanal
          </button>
        </div>
      </div>

      {/* Formulário de novo hábito */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Novo Hábito
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Nome do hábito"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          name="frequency"
          value={form.frequency}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="diário">Diário</option>
          <option value="semanal">Semanal</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow transition"
        >
          Adicionar Hábito
        </button>
      </form>

      {/* Lista de hábitos */}
      <div className="space-y-3">
        {filteredHabits.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum hábito encontrado.
          </p>
        )}
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleToday={toggleToday}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
