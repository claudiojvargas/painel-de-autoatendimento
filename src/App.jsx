import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { getUser, getTasks, getHabits } from './services/storageService';

function App() {
  const user = getUser();

  // 🔼 Estados globais
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    setTasks(getTasks());
    setHabits(getHabits());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/home"
        element={
          user ? (
            <Home
              tasks={tasks}
              setTasks={setTasks}
              habits={habits}
              setHabits={setHabits}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
