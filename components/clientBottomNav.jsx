'use client'
import { usePathname } from 'next/navigation';
import BottomNav from '@/components/bottomNav';

export default function ClientBottomNav() {
  const pathname = usePathname();
  const hideOnPaths = ['/register', '/login','/verification-otp'];
  
  if (hideOnPaths.includes(pathname)) {
    return null;
  }
  
  return <BottomNav />;
}