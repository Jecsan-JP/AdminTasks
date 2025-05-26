// src/features/tasks/presentation/components/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { Task } from '../../domain/models/Task';
import { useTaskFormCreate } from '../hooks/useTaskFormCreate';

interface TaskFormProps {
  onSubmit: (task: Partial<Task>) => void;
  initialValues?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [status, setStatus] = useState(initialValues?.status || 'pendiente');
  const { loading, error, success } = useTaskFormCreate();

  useEffect(() => {
    if (success) {
      setTitle('');
      setDescription('');
      setStatus('pendiente');
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      {success && (
        <div className="text-sm text-green-600">¡Tarea creada exitosamente!</div>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
