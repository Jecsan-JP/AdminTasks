import React, { useState } from 'react';
import { Task } from '../../domain/models/Task';
import TaskItem from './TaskItem';
import Button from '@/common/presentation/components/Button';
import Modal from '@/common/presentation/components/Modal';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = () => {
    // Lógica para crear la tarea (llamar hook/repositorio)
    setIsModalOpen(false);
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
        {/* <TaskForm onSubmit={handleCreateTask} /> */}
        <>Formulario crear tarea</>
      </Modal>
    </div>
  );
};

export default TaskList;
