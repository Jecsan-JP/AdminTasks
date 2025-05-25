// src/features/tasks/presentation/components/TaskItem.tsx
import React, { useState } from 'react';
import { Task } from '../../domain/models/Task';
import CommentList from './CommentList';
import Modal from '@/common/presentation/components/Modal';
import EditTaskModal from './EditTaskModal';

interface TaskItemProps {
  task: Task;
  isSubtask?: boolean; // <-- NUEVO
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isSubtask }) => {
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCreateSubtask = () => {
    setIsSubtaskModalOpen(false);
  };

  const handleEditTask = () => {
    // Lógica para editar tarea
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative rounded-lg border bg-gray-50 p-4 shadow-sm">
      {/* Botón circular de editar */}
      <button
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
        onClick={() => setIsEditModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 text-xs font-semibold text-gray-500">Título</div>
          <h2 className="text-lg font-bold text-blue-700">{task.title}</h2>
          <div className="mt-2 mb-1 text-xs font-semibold text-gray-500">Descripción</div>
          <p className="text-gray-700">{task.description}</p>
          <span
            className={`mt-2 inline-block rounded px-2 py-1 text-xs font-semibold ${
              task.status === 'completada'
                ? 'bg-green-200 text-green-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            {task.status}
          </span>
        </div>
        {/* Aquí puedes poner botones de editar/eliminar */}
      </div>

      {/* SOLO en tareas principales */}
      {!isSubtask && (
        <div className="mt-4 flex gap-2">
          <button
            className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200"
            onClick={() => setIsSubtaskModalOpen(true)}
          >
            + Subtarea
          </button>
        </div>
      )}

      <Modal
        isOpen={isSubtaskModalOpen}
        onClose={() => setIsSubtaskModalOpen(false)}
        title="Nueva subtarea"
      >
        {/* <TaskForm onSubmit={handleCreateSubtask} /> */}
        <>Formulario crear subtarea</>
      </Modal>

      {/* Subtareas */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-4 ml-4">
          <h3 className="text-sm font-semibold text-blue-600">Subtareas:</h3>
          <div className="space-y-2">
            {task.subtasks.map((subtask) => (
              <TaskItem key={subtask._id} task={subtask} isSubtask={true} />
            ))}
          </div>
        </div>
      )}

      {/* Comentarios */}
      <div className="mt-4">
        <CommentList comments={task.comments} />
      </div>
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        isSubtask={isSubtask}
        onSave={handleEditTask}
      />
    </div>
  );
};

export default TaskItem;
