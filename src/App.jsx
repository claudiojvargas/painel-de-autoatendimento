import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getTasks, getHabits } from "./services/storageService";

function App() {
  const { user } = useAuth();

  // Estados globais para tasks e habits
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);

  // Carregar dados do localStorage no primeiro render, baseado no usuário logado
  useEffect(() => {
    if (user) {
      setTasks(getTasks(user));
      setHabits(getHabits(user));
    }
  }, [user]);

  if (!user) return <Login />;

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Home
            tasks={tasks}
            setTasks={setTasks}
            habits={habits}
            setHabits={setHabits}
          />
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;