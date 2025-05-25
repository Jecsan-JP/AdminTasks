// src/features/login/presentation/components/RegisterForm.tsx
import React, { useEffect, useState } from 'react';
import { useRegisterForm } from '../hooks/useRegisterForm';

interface RegisterFormProps {
  onSwitch: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { handleRegister, loading, error, success } = useRegisterForm();

  useEffect(() => {
    if (success) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [success]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    handleRegister(username, password);
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
          placeholder="Elige un usuario"
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
          className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Elige una contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-gray-700" htmlFor="confirmPassword">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Repite la contraseña"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {success && (
        <div className="text-sm text-green-600">
          ¡Usuario creado exitosamente! Ahora puedes iniciar sesión.
        </div>
      )}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Creando...' : 'Registrarse'}
      </button>
      <div className="mt-6 text-center text-black">
        ¿Ya tienes cuenta?{' '}
        <button
          className="font-semibold text-blue-600 hover:underline"
          onClick={onSwitch}
          type="button"
        >
          Inicia sesión
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
