import { format } from 'date-fns';

const HabitCard = ({ habit, onToggleToday, onDelete }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const doneToday = habit.history.includes(today);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Info do hábito */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
        <p className="text-sm text-gray-600">
          Frequência: {habit.frequency}
        </p>
        <span
          className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${
            doneToday
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {doneToday ? 'Feito hoje ✅' : 'Não feito hoje ❌'}
        </span>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggleToday(habit.id)}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition ${
            doneToday
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {doneToday ? 'Desmarcar' : 'Marcar'}
        </button>

        <button
          onClick={() => onDelete(habit.id)}
          className="px-3 py-1 text-sm font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};


export default HabitCard;
