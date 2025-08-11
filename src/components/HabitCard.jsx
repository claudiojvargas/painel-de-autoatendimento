import { format } from 'date-fns';
import { CheckSquare, Trash2 } from 'lucide-react';

const HabitCard = ({ habit, onToggleToday, onDelete }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const doneToday = habit.history.includes(today);

  return (
    <div className="bg-white shadow rounded-lg p-4 w-56 h-56 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Frequência: {habit.frequency}
        </p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
            doneToday
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {doneToday ? 'Feito hoje' : 'Não feito hoje'}
        </span>
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={() => onToggleToday(habit.id)}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md transition ${
            doneToday
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
          aria-label={doneToday ? "Desmarcar hábito" : "Marcar hábito"}
          title={doneToday ? "Desmarcar hábito" : "Marcar hábito"}
        >
          <CheckSquare size={18} />
          {doneToday ? 'Desmarcar' : 'Marcar'}
        </button>

        <button
          onClick={() => onDelete(habit.id)}
          className="flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
          aria-label="Excluir hábito"
          title="Excluir hábito"
        >
          <Trash2 size={18} />
          Excluir
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
