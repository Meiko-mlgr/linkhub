'use client';

import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };


  if (!user) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold transition-colors hover:bg-red-700"
          >
            Sign Out
          </button>
        </header>

        <main>
          <p className="text-lg">Welcome back, <span className="font-bold">{user.email}</span>!</p>
        </main>
      </div>
    </div>
  );
}