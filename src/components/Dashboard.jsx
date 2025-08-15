import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCircle, ListChecks } from "lucide-react";

const Dashboard = ({ tasks = [], habits = [] }) => {
  const today = format(new Date(), "yyyy-MM-dd");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const totalHabits = habits.length;
  const habitsDoneToday = habits.filter((h) =>
    h.history.includes(today)
  ).length;
  const habitProgress =
    totalHabits === 0
      ? 0
      : Math.round((habitsDoneToday / totalHabits) * 100);

  const getProgressColor = (value) => {
    if (value < 30) return "linear-gradient(to right, #ef4444, #f87171)";
    if (value < 70) return "linear-gradient(to right, #f59e0b, #fbbf24)";
    return "linear-gradient(to right, #22c55e, #4ade80)";
  };

  const messages = [
    "Você está mandando bem! 💪",
    "Continue assim! 🚀",
    "Pequenas ações, grandes mudanças 🌱",
    "Persistência é sucesso 🛤️",
    "Seu progresso é incrível ✨",
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300); // tempo do fade-out
    }, 30000); // troca a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/90 border-t border-gray-200 shadow-lg z-50">
      <div className="flex flex-col md:flex-row items-center md:justify-between px-4 py-3 gap-3 text-sm md:text-base">
        
        {/* Tarefas */}
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <ListChecks className="text-blue-600 w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${taskProgress}%`,
                  background: getProgressColor(taskProgress),
                }}
              ></div>
            </div>
          </div>
          <span className="min-w-[50px] text-right font-semibold">
            {completedTasks}/{totalTasks}
          </span>
        </div>

        {/* Hábitos */}
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${habitProgress}%`,
                  background: getProgressColor(habitProgress),
                }}
              ></div>
            </div>
          </div>
          <span className="min-w-[50px] text-right font-semibold">
            {habitsDoneToday}/{totalHabits}
          </span>
        </div>

        {/* Mensagem motivacional */}
        <div
          className={`text-gray-700 font-semibold text-center md:text-right text-base md:text-lg truncate w-full md:w-1/3 transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[messageIndex]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
