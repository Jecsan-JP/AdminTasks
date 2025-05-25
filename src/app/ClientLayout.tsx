'use client';
import { AuthProvider } from '@/common/auth/AuthContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
