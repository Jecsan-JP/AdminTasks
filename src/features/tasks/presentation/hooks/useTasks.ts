import { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { http } from '@/common/singletons/http';
import { Task } from '../../domain/models/Task';
import { TasksDataRepository } from '../../domain/repositories/TasksRepository';

const tasksRepository = new TasksDataRepository(http);

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const tasks = await firstValueFrom(tasksRepository.getTasks());
        setTasks(tasks.tasks);
      } catch (err: any) {
        setError('No se pudieron cargar las tareas');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return { tasks, loading, error };
}
