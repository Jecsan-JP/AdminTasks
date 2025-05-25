import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { RegisterDataRepository } from '../../domain/repositories/RegisterRepository';
import { http } from '@/common/singletons/http';
import { LoginRequestDto } from '../../domain/models/LoginRequestDto';

const registerRepository = new RegisterDataRepository(http);

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
      const dto: LoginRequestDto = { username, password };
      const response = await firstValueFrom(registerRepository.register(dto));
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Usuario creado!',
        'Ahora puedes iniciar sesión.'
      );
      // Opcional: redirige al login después de un pequeño delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError('No se pudo crear el usuario. Intenta con otro nombre.');
      swalDataManager().showErrorMessage('Ocurrió un error al crear el usuario', err);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error, success };
}
