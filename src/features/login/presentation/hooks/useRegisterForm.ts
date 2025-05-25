// src/features/login/presentation/hooks/useRegisterForm.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Aquí va tu petición al backend para registrar usuario
      // await registerApi(username, password);
      // Simulación de éxito:
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // Puedes redirigir al login si quieres:
        // router.push('/login');
      }, 1000);
    } catch (err: any) {
      setError('No se pudo crear el usuario. Intenta con otro nombre.');
      setLoading(false);
    }
  };

  return { handleRegister, loading, error, success };
}
