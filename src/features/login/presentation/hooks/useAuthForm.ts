import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/common/auth/AuthContext';
import { LoginRepositoryImpl } from '../../domain/repositories/LoginRepository';
import { http } from '@/common/singletons/http';
import { LoginRequestDto } from '../../domain/models/LoginRequestDto';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { useRouter } from 'next/navigation';

const loginRepository = new LoginRepositoryImpl(http);

interface JwtPayload {
  userId: string;
  username: string;
  iat: number;
  exp: number;
}

export function useAuthForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const dto: LoginRequestDto = { username, password };
      const response = await firstValueFrom(loginRepository.login(dto));
      const decoded = jwtDecode<JwtPayload>(response.token);
      const expireIn = decoded.exp * 1000 - Date.now();
      login(response.token, expireIn);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Usuario o contraseña incorrectos ' + err);
      swalDataManager().showErrorMessage(
        'Ocurrio un error al procesar la informacion: Usuario o contraseña incorrectos',
        err
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
