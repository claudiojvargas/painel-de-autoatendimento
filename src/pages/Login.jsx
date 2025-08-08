import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../services/storageService';

const Login = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();

     if (name.trim() !== '') {
      saveUser(name);
      navigate('/home');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Bem-vindo!</h2>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
