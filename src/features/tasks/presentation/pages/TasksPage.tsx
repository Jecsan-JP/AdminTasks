import React from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  const { tasks, loading, error } = useTasks();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="mt-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold text-blue-700">Mis Tareas</h1>
        {loading && <div className="text-center">Cargando tareas...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <TaskList tasks={tasks} />
        {/* Aquí puedes agregar un botón para crear nueva tarea */}
      </div>
    </div>
  );
};

export default TasksPage;
