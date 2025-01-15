"use client";
import { ReactNode } from "react";
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const Navbar = dynamic(() => import('./components/Navbar'), { ssr: false });
const AuthProvider = dynamic(() => import('./AuthProvider'), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NavbarWrapper>
        {children}
      </NavbarWrapper>
    </AuthProvider>
  );
}

function NavbarWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      {children}
    </>
  );
}
