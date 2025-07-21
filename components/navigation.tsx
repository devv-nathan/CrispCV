"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Zap, User, FileText, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSupabase } from '@/hooks/useSupabase';
import AuthModal from '@/components/auth/AuthModal';

export default function Navigation() {
  const pathname = usePathname();
  const [showSupport, setShowSupport] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useSupabase();

  const navItems = [
    { href: '/', label: 'Home', icon: FileText },
    { href: '/free-tool', label: 'Free Tool', icon: Zap },
    { href: '/pro-tool', label: 'Pro Tool', icon: User },
    { href: '/about', label: 'About', icon: Info },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2 w-full max-w-3xl',
            'rounded-full',
            'bg-white/80 shadow-xl border border-gray-200 backdrop-blur-lg pointer-events-auto',
          )}
          style={{
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-extrabold text-lg px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gray-100">
              {/* CrispCV SVG Logo (updated) */}
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 24c0-4 3.2-8 8-8h6" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M22 26l3 3 6-6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-heading)' }}>
              CrispCV
            </span>
          </Link>
          {/* Nav Items */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {navItems.slice(1, 4).map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-base font-medium transition-colors',
                    pathname === item.href ? 'font-bold text-black' : 'text-black',
                    'hover:bg-gray-100',
                  )}
                  style={{ fontWeight: pathname === item.href ? 700 : 500, background: 'none' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {/* Support Me Button */}
          <Button
            className="rounded-full bg-black hover:bg-gray-900 text-white px-7 py-3 text-base font-semibold shadow-none"
            style={{ fontWeight: 700 }}
            onClick={() => setShowSupport(true)}
          >
            Support Me
          </Button>
          
          {/* Auth Button */}
          {user ? (
            <Button
              variant="outline"
              className="rounded-full border border-gray-200 text-black px-4 py-2 text-sm font-medium"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full border border-gray-200 text-black px-4 py-2 text-sm font-medium"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowSupport(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-0 max-w-lg w-full flex flex-col items-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-black/90 hover:bg-black z-10" onClick={() => setShowSupport(false)} aria-label="Close">×</button>
            <div className="w-full flex flex-col items-center justify-center pt-6">
              <Image src="/upi.jpg" alt="UPI QR" width={160} height={160} className="object-cover w-40 h-40 rounded-2xl" />
            </div>
            <div className="p-4 w-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-3 mt-2">Support CrispCV</h2>
              <p className="text-gray-700 mb-2 text-center">Maintaining and running CrispCV costs real money (APIs, hosting, etc). If you find it useful, consider supporting me—every bit helps keep the project alive and free for all. Thank you!</p>
              <Button className="rounded-full bg-black hover:bg-gray-900 text-white px-6 py-2 mt-4" onClick={() => setShowSupport(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}