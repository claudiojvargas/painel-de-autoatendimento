// Chave padrão para armazenar o nome do usuário logado
const USER_KEY = 'user';

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

// 🔹 Funções de Tarefas
export const getTasks = (username) => {
  return JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
};

export const saveTasks = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

// 🔹 Funções de Hábitos
export const getHabits = (username) => {
  return JSON.parse(localStorage.getItem(`habits_${username}`)) || [];
};

export const saveHabits = (username, habits) => {
  localStorage.setItem(`habits_${username}`, JSON.stringify(habits));
};
