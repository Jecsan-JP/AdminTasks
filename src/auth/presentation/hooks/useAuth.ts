import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { logout: contextLogout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await contextLogout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error
  };
}; 