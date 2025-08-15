import TaskList from '../components/TaskList';
import HabitList from '../components/HabitList';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';

const Home = ({ tasks, setTasks, habits, setHabits }) => {

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-0 space-y-8">
      <Header />

      <div className="grid md:grid-cols-1 gap-8 mt-24">
        <div>
          <HabitList habits={habits} setHabits={setHabits} />
        </div>
        <div>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>

      <Dashboard tasks={tasks} habits={habits} />
    </div>
  );
};

export default Home;