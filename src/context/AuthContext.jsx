import { createContext, useContext, useState, useEffect } from "react";
import { getUser, saveUser, clearUser } from "../services/storageService";

const AuthContext = createContext();

// Hook para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carregar usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (username) => {
    saveUser(username);
    setUser(username);
  };

  const logout = () => {
    clearUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
