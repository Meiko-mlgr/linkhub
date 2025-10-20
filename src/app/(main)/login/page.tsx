'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          }
        }
      });

      if (error) throw error;
      alert('Success! Please check your email for a verification link.');
      router.push('/dashboard');

    } catch (error: any) {
      console.error('Error during sign up:', error);
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error during sign in:', error);
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-[#182630] p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">LinkHub</h1>
          <p className="mt-2 text-sm text-gray-400">Your central place for all your links.</p>
        </div>

        <div>
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 border-b-3 py-3 text-sm font-bold focus:outline-none transition-colors duration-200 ${
                !isSignUp
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:border-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 border-b-3 py-3 text-sm font-bold focus:outline-none transition-colors duration-200 ${
                isSignUp
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:border-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <div className="space-y-4 rounded-lg">
            {isSignUp && (
              <div>
                <label className="sr-only" htmlFor="username">Username</label>
                <input
                  id="username" name="username" type="text"
                  value={username} onChange={(e) => setUsername(e.target.value)} required
                  className="relative block w-full appearance-none rounded-lg border border-gray-700 bg-background-dark px-4 py-3 text-white placeholder-gray-400 focus:z-10 focus:border-[--color-primary] focus:outline-none focus:ring-[--color-primary] sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
                className="relative block w-full appearance-none rounded-lg border border-gray-700 bg-background-dark px-4 py-3 text-white placeholder-gray-400 focus:z-10 focus:border-[--color-primary] focus:outline-none focus:ring-[--color-primary] sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password" name="password" type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password} onChange={(e) => setPassword(e.target.value)} required
                className="relative block w-full appearance-none rounded-lg border border-gray-700 bg-background-dark px-4 py-3 text-white placeholder-gray-400 focus:z-10 focus:border-[--color-primary] focus:outline-none focus:ring-[--color-primary] sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit" disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-opacity-90 hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}