import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';
import { http } from '@/common/singletons/http';
import { useTasksContext } from '../context/TasksProvider';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';

const tasksRepository = new TasksDataRepository(http);

export function useTaskFormEdit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { refreshTasks } = useTasksContext();

  const handleEditTask = async (
    task: CreateTaskDto,
    idTask: string
  ): Promise<CreateTaskDto | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await firstValueFrom(tasksRepository.updateTask(task, idTask));
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Tarea editada!',
        'La tarea se ha editado exitosamente.'
      );
      refreshTasks(); // Refresca la lista después de editar
      return response;
    } catch (err: any) {
      setError('No se pudo editar la tarea. Intenta de nuevo.');
      swalDataManager().showErrorMessage('Ocurrió un error al editar la tarea', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleEditTask, loading, error, success };
}
