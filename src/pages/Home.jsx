import TaskList from '../components/TaskList';
import HabitList from '../components/HabitList';
import Dashboard from '../components/Dashboard';
import { getUser } from '../services/storageService';

const Home = ({ tasks, setTasks, habits, setHabits }) => {
  const name = getUser();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Olá, {name}!</h1>

      <Dashboard tasks={tasks} habits={habits} />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Tarefas</h2>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Hábitos</h2>
          <HabitList habits={habits} setHabits={setHabits} />
        </div>
      </div>
    </div>
  );
};

export default Home;