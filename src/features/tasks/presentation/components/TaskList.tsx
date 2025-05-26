// src/features/tasks/presentation/components/TaskList.tsx
import React, { useState } from 'react';
import { Task } from '../../domain/models/Task';
import TaskItem from './TaskItem';
import Button from '@/common/presentation/components/Button';
import Modal from '@/common/presentation/components/Modal';
import TaskForm from './TaskForm';
import { useTaskFormCreate } from '../hooks/useTaskFormCreate';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';
import { useTasksContext } from '../context/TasksProvider';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { refreshTasks } = useTasksContext();

  const {
    handleCreateTask: createTask,
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = useTaskFormCreate();

  const handleCreateTask = async (task: Partial<Task>) => {
    const newTask = await createTask(task as CreateTaskDto);
    if (newTask) {
      refreshTasks();
      setIsModalOpen(false);
    }
  };

  const filteredTasks = selectedStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === selectedStatus);

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between text-black">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">Todas las tareas</option>
          <option value="pendiente">Pendientes</option>
          <option value="completada">Completadas</option>
        </select>
        <Button onClick={() => setIsModalOpen(true)}>+ Nueva tarea</Button>
      </div>
      {!filteredTasks.length ? (
        <div className="text-center text-gray-500">No tienes tareas aún.</div>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
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
