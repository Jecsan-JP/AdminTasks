// src/common/auth/ProtectedRoute.tsx
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Solo redirige si isAuthenticated es exactamente false
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  // Puedes mostrar un loader mientras se determina el estado
  if (isAuthenticated === undefined) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
