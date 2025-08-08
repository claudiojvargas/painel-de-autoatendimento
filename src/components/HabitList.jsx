import { useEffect, useState } from 'react';
import { getHabits, saveHabits } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import HabitCard from './HabitCard';
import { format } from 'date-fns';

const HabitList = ({ habits, setHabits }) => {
  const [form, setForm] = useState({ name: '', frequency: 'diário' });

  useEffect(() => {
    setHabits(getHabits());
  }, [setHabits]);

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
    saveHabits(updated);

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
    saveHabits(updated);
  };

  const handleDelete = (id) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    saveHabits(updated);
  };

  return (
    <div className="space-y-6">
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
        {habits.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum hábito ainda.
          </p>
        )}
        {habits.map((habit) => (
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
