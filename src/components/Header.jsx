import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 border-b border-gray-200 text-gray-800 px-4 py-2 flex justify-between items-center shadow-sm z-50">
      <h1 className="text-lg font-semibold tracking-tight">Meu Painel</h1>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Olá, {user}</span>
          <button
            onClick={logout}
            className="p-2 rounded hover:bg-gray-100 transition"
            title="Sair"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
