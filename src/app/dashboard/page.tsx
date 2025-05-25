'use client';
import ProtectedRoute from '@/common/auth/ProtectedRoute';
import DarshboardPage from '@/features/dashboard/presentation/pages/DarshboardPage';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DarshboardPage />
    </ProtectedRoute>
  );
};

export default Dashboard;
