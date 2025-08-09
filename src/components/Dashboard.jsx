import { format } from 'date-fns';

const Dashboard = ({ tasks, habits }) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  // Progresso de tarefas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Progresso de hábitos
  const totalHabits = habits.length;
  const habitsDoneToday = habits.filter((h) => h.history.includes(today)).length;
  const habitProgress = totalHabits === 0 ? 0 : Math.round((habitsDoneToday / totalHabits) * 100);

  // Mensagens motivacionais
  const messages = [
    'Você está mandando bem! 💪',
    'Continue assim, um passo de cada vez! 🚀',
    'Grandes mudanças começam com pequenas ações. 🌱',
    'Persistência é o caminho do sucesso! 🛤️',
    'Seu progresso é incrível! ✨'
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Seu Progresso Hoje
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarefas */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <p className="text-gray-700 font-medium mb-2">
            Tarefas concluídas:{" "}
            <span className="text-blue-600">{completedTasks}</span>/{totalTasks}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${taskProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Hábitos */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <p className="text-gray-700 font-medium mb-2">
            Hábitos feitos hoje:{" "}
            <span className="text-green-600">{habitsDoneToday}</span>/{totalHabits}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${habitProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mensagem motivacional */}
      <div className="text-center bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-blue-700 font-semibold text-lg">{randomMessage}</p>
      </div>
    </div>
  );
};

export default Dashboard;
