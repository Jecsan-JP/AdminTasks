import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '@/common/auth/AuthContext';
import { useRouter } from 'next/navigation';
// import RegisterForm from '../components/RegisterForm'; // Si lo implementas

const AuthSwitcher = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/tasks'); // O la ruta privada principal
    }
  }, [isAuthenticated, router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthSwitcher;
