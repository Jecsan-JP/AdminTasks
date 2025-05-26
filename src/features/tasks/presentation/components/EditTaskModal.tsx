import React, { useEffect } from 'react';
import Modal from '@/common/presentation/components/Modal';
import { Task } from '../../domain/models/Task';
import TaskForm from './TaskForm';
import { useTaskFormEdit } from '../hooks/useTaskEdit';
import { CreateTaskDto } from '../../domain/models/CreateTaskDto';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  isSubtask?: boolean;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  isSubtask,
}) => {
  const { handleEditTask } = useTaskFormEdit();

  // Si quieres resetear algún estado local, puedes usar useEffect aquí

  const handleSave = async (values: Partial<Task>) => {
    const { title, description, status } = values;
    const dto = { title, description, status }; // Ajusta según tu modelo
    await handleEditTask(dto as CreateTaskDto, task._id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar tarea">
      <TaskForm onSubmit={handleSave} initialValues={task} />
    </Modal>
  );
};

export default EditTaskModal;
