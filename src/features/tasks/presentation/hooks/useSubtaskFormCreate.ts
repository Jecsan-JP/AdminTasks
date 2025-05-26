// src/features/tasks/presentation/hooks/useSubtaskFormCreate.ts
import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';
import { http } from '@/common/singletons/http';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';
import { Task } from '../../domain/models/Task';

const tasksRepository = new TasksDataRepository(http);

export function useSubtaskFormCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateSubtask = async (
    task: Partial<CreateTaskDto>,
    parentTaskId: string
  ): Promise<CreateTaskDto | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await firstValueFrom(
        tasksRepository.createSubtask({
          ...task,
          parentTaskId,
        } as CreateTaskDto)
      );
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Subtarea creada!',
        'La subtarea se ha creado exitosamente.'
      );
      return response;
    } catch (err: any) {
      setError('No se pudo crear la subtarea. Intenta de nuevo.');
      swalDataManager().showErrorMessage('Ocurrió un error al crear la subtarea', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateSubtask, loading, error, success };
}
