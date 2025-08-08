// Chave padrão para o nome do usuário
const USER_KEY = 'user';
const TASKS_KEY = 'tasks';
const HABITS_KEY = 'habits';

// Usuário
export const saveUser = (name) => {
  localStorage.setItem(USER_KEY, name);
};

export const getUser = () => {
  return localStorage.getItem(USER_KEY);
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

// Tarefas
export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Hábitos
export const saveHabits = (habits) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
};

export const getHabits = () => {
  const habits = localStorage.getItem(HABITS_KEY);
  return habits ? JSON.parse(habits) : [];
};
