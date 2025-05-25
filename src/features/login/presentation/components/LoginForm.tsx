import React, { useState } from 'react';
import { useAuthForm } from '../hooks/useAuthForm';

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error } = useAuthForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-gray-700" htmlFor="username">
          Usuario
        </label>
        <input
          id="username"
          type="text"
          className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Tu usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-gray-700" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Tu contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
      <div className="mt-6 text-center text-black">
        ¿No tienes cuenta?{' '}
        <button
          className="font-semibold text-blue-600 hover:underline"
          onClick={onSwitch}
          type="button"
        >
          Regístrate
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
