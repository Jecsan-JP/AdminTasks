'use client';
import ProtectedRoute from '@/common/auth/ProtectedRoute';
import TasksPage from '@/features/tasks/presentation/pages/TasksPage';

export default function Home() {
  return (
    <ProtectedRoute>
      <TasksPage />
    </ProtectedRoute>
  );
}
