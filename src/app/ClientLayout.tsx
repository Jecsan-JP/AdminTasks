'use client';
import { AuthProvider } from '@/common/auth/AuthContext';
import Navbar from '@/common/presentation/components/Navbar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {!isLoginPage && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}