// src/features/tasks/presentation/hooks/useTaskDelete.ts
import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';
import { http } from '@/common/singletons/http';
import { useTasksContext } from '../context/TasksProvider';

const tasksRepository = new TasksDataRepository(http);

export function useTaskDelete() {
  const [loading, setLoading] = useState(false);
  const { refreshTasks } = useTasksContext(); // <-- Importante

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    setLoading(true);
    try {
      await swalDataManager().deleteItem('Tarea', async () => {
        await firstValueFrom(tasksRepository.deleteTask(taskId));
        swalDataManager().showSuccesMessage(
          '¡Tarea eliminada!',
          'La tarea se ha eliminado exitosamente.'
        );
        refreshTasks(); // <-- Refresca aquí, justo después de eliminar
      });
    } catch (err: any) {
      swalDataManager().showErrorMessage('Ocurrió un error al eliminar la tarea', err);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteTask, loading };
}
