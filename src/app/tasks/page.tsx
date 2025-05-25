'use client';
import ProtectedRoute from '@/common/auth/ProtectedRoute';
import TasksPage from '@/features/tasks/presentation/pages/TasksPage';

const Tasks = () => {
  return (
    <ProtectedRoute>
      <TasksPage />
    </ProtectedRoute>
  );
};

export default Tasks;
