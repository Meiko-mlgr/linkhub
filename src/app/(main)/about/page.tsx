'use client';

import Link from 'next/link';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
  </svg>
);

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen font-display text-slate-200">
      <header className="sticky top-0 z-10 bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <h1 className="text-xl font-bold text-white">LinkHub</h1>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Home</Link>
              <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Features</Link>
              <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Pricing</Link>
              <span className="text-sm font-medium text-primary">About</span>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-bold bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">Log in</Link>
              <Link href="/login" className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">Sign up</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">About LinkHub</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">A minimalist and elegant "link-in-bio" service for content creators, professionals, and brands.</p>
          </div>
          <div className="space-y-12">
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Why I Built This</h3>
              <p className="text-slate-400 leading-relaxed">
                LinkHub started as a personal challenge: could I build a complete SaaS application from scratch to really solidify my full-stack skills? I wanted to create a practical tool, similar to services I've seen, that covers everything from users signing up and managing their data to having a live, interactive front-end. Think of it as a hands-on way for me to demonstrate the kind of web applications I enjoy building.
              </p>
            </div>
            
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Tech Stack Used</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                I chose these technologies because they work well together and make the development process enjoyable while delivering a fast experience for users:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon />
                  <span className="text-slate-300"><strong className="font-semibold text-slate-200">Next.js:</strong> A powerful React framework for building fast, server-rendered applications with the App Router.</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span className="text-slate-300"><strong className="font-semibold text-slate-200">TypeScript:</strong> For adding static types to JavaScript, which helps catch errors early and improves code quality.</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span className="text-slate-300"><strong className="font-semibold text-slate-200">Tailwind CSS:</strong> A utility-first CSS framework for rapid, custom UI development without writing traditional CSS.</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span className="text-slate-300"><strong className="font-semibold text-slate-200">Supabase:</strong> An open-source Firebase alternative providing a Postgres database, authentication, file storage, and auto-generated APIs.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-slate-900/50 border border-primary/20 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
              <p className="text-slate-300 leading-relaxed">
                Hi, I'm Mikko, currently studying Computer Engineering but really diving deep into the world of software development. I'm particularly excited about creating interactive and engaging web experiences, like the 3D social app mentioned in my projects. Building LinkHub was a fantastic way for me to put my skills in full-stack development (especially with tools like Next.js, Supabase, and even some fun visualization libraries) into practice and show what I can build from concept to completion. I really enjoy the process of bringing ideas to life through code and am always looking for the next interesting challenge.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}