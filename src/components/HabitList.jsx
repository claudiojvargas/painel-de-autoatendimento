import { useEffect, useState, useRef } from 'react'; 
import { useAuth } from "../context/AuthContext";
import { getHabits, saveHabits } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import HabitCard from './HabitCard';
import { format } from 'date-fns';

const HabitList = ({ habits, setHabits }) => {
  const [form, setForm] = useState({ name: '', frequency: 'diário' });
  const [filter, setFilter] = useState("pending"); // Filtro inicial
  const [showPopup, setShowPopup] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const { user } = useAuth();

  // Índice do primeiro hábito visível no carrossel
  const [startIndex, setStartIndex] = useState(0);
  const MAX_VISIBLE = 5;

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
    if (!user) return;

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
    setShowPopup(false);
  };

  const toggleToday = (id) => {
    if (!user) return;

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
    if (!user) return;

    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    saveHabits(user, updated);
  };

  // Filtragem na renderização
  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    if (filter === "pending") return !habit.history.includes(today);
    if (filter === "completed") return habit.history.includes(today);
    if (filter === "daily") return habit.frequency === "diário";
    if (filter === "weekly") return habit.frequency === "semanal";
    return true;
  });

  // Função para retornar 5 hábitos visíveis com wrap-around
  const getVisibleHabits = () => {
    if (filteredHabits.length <= MAX_VISIBLE) {
      return filteredHabits;
    }
    const result = [];
    for (let i = 0; i < MAX_VISIBLE; i++) {
      result.push(filteredHabits[(startIndex + i) % filteredHabits.length]);
    }
    return result;
  };

  const visibleHabits = getVisibleHabits();

  // Avança o carrossel a cada 3 segundos
  useEffect(() => {
    if (filteredHabits.length <= MAX_VISIBLE) return; // não precisa rodar

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % filteredHabits.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [filteredHabits]);

  // Controle manual com setas
  const scrollCarousel = (direction) => {
    if (filteredHabits.length <= MAX_VISIBLE) return;

    setStartIndex((prev) => {
      if (direction === 'left') {
        return (prev - 1 + filteredHabits.length) % filteredHabits.length;
      } else {
        return (prev + 1) % filteredHabits.length;
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-6 bg-gray-50 p-6">
        {/* Lado esquerdo: contadores, filtros, botão */}
        <div className="flex flex-col col-span-2 items-center space-y-5">
          {/* Contadores */}
          <div className="flex space-x-3">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded font-medium text-sm">
              Concluídas: {habits.filter(h => h.history.includes(today)).length}
            </div>
            <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded font-medium text-sm">
              Pendentes: {habits.filter(h => !h.history.includes(today)).length}
            </div>
          </div>

          {/* Filtros principais */}
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded text-sm font-medium ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("all")}
            >
              Todos
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-medium ${
                filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pendentes
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-medium ${
                filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("completed")}
            >
              Concluídas
            </button>
          </div>

          {/* Filtros secundários */}
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded text-xs font-normal ${
                filter === "daily" ? "bg-gray-400 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("daily")}
            >
              Diário
            </button>
            <button
              className={`px-3 py-1 rounded text-xs font-normal ${
                filter === "weekly" ? "bg-gray-400 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("weekly")}
            >
              Semanal
            </button>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={() => setShowPopup(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow text-lg font-medium mt-4"
          >
            Adicionar Hábito +
          </button>
        </div>

        {/* Lado direito: carrossel com setas */}
        <div className="col-span-8 flex items-center space-x-2 ml-8">
          {/* Seta esquerda */}
          <button
            onClick={() => scrollCarousel('left')}
            className="text-3xl text-gray-400 hover:text-gray-700 mr-8"
            aria-label="Scroll Left"
          >
            &#8249;
          </button>

          {/* Container do carrossel sem scroll nativo */}
          <div className="flex gap-4 py-2">
            {visibleHabits.length === 0 && (
              <p className="text-center text-gray-500 self-center">
                Nenhum hábito encontrado.
              </p>
            )}
            {visibleHabits.map((habit) => (
              <div key={habit.id} className="flex-shrink-0 w-64">
                <HabitCard
                  habit={habit}
                  onToggleToday={toggleToday}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>

          {/* Seta direita */}
          <button
            onClick={() => scrollCarousel('right')}
            className="text-3xl text-gray-400 hover:text-gray-700"
            aria-label="Scroll Right"
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Popup adicionar hábito */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 w-96 shadow-lg space-y-6"
          >
            <h2 className="text-lg font-semibold text-gray-900">Novo Hábito</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Nome do hábito"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
            />
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="diário">Diário</option>
              <option value="semanal">Semanal</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Adicionar Hábito
            </button>

            <button
              type="button"
              onClick={() => setShowPopup(false)}
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

export default HabitList;
