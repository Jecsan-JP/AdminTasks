// src/features/tasks/presentation/hooks/useTaskFormCreate.ts
import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';
import { http } from '@/common/singletons/http';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';
import { Task } from '../../domain/models/Task';

const tasksRepository = new TasksDataRepository(http);

export function useTaskFormCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateTask = async (
    task: Partial<CreateTaskDto>
  ): Promise<CreateTaskDto | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await firstValueFrom(
        tasksRepository.createTask(task as CreateTaskDto)
      );
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Tarea creada!',
        'La tarea se ha creado exitosamente.'
      );
      return response; // Devolver la tarea creada
    } catch (err: any) {
      setError('No se pudo crear la tarea. Intenta de nuevo.');
      swalDataManager().showErrorMessage('Ocurrió un error al crear la tarea', err);
      return null; // Devolver null en caso de error
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTask, loading, error, success };
}
