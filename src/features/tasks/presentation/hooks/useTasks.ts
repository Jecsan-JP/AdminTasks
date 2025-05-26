import { useCallback, useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { http } from '@/common/singletons/http';
import { Task } from '../../domain/models/Task';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';
import { useTasksContext } from '../context/TasksProvider';

const tasksRepository = new TasksDataRepository(http);

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshTrigger, isRefreshing } = useTasksContext();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await firstValueFrom(tasksRepository.getTasks());
      setTasks(response.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshTrigger]);

  return { 
    tasks, 
    loading: loading || isRefreshing, 
    error, 
    refreshTasks: fetchTasks 
  };
}
