// src/features/tasks/presentation/components/TaskList.tsx
import React, { useState } from 'react';
import { Task } from '../../domain/models/Task';
import TaskItem from './TaskItem';
import Button from '@/common/presentation/components/Button';
import Modal from '@/common/presentation/components/Modal';
import TaskForm from './TaskForm';
import { useTasks } from '../hooks/useTasks';
import { useTaskFormCreate } from '../hooks/useTaskFormCreate';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks: initialTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, fetchTasks } = useTasks();
  const {
    handleCreateTask: createTask,
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = useTaskFormCreate();

  const handleCreateTask = async (task: Partial<Task>) => {
    const newTask = await createTask(task as CreateTaskDto);
    if (newTask) {
      fetchTasks(); // Recargar la información
      setIsModalOpen(false);
    }
  };

  if (!tasks.length)
    return <div className="text-center text-gray-500">No tienes tareas aún.</div>;
  return (
    <div className="space-y-4">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>+ Nueva tarea</Button>
      </div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva tarea"
      >
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </div>
  );
};

export default TaskList;
