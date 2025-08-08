import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-blue-500 text-white rounded p-4 shadow">
      <h1 className="text-lg font-bold">Meu Painel</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="font-medium">Olá, {user}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
