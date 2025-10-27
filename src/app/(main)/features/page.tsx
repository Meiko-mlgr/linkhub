import Link from 'next/link';
import { Link as LinkIcon, Palette, BarChart2, Star, Globe } from 'lucide-react';

export default function FeaturesPage() {
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
              <span className="text-sm font-medium text-primary">Features</span>
              <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Pricing</Link>
              <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">About</Link>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">LinkHub Features</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Everything you need to connect your audience to your content, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <LinkIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Unlimited Links</h4>
                <p className="mt-1 text-slate-400">Add as many links as you need to connect your audience to all your platforms, content, and products.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Basic Customization</h4>
                <p className="mt-1 text-slate-400">Personalize your page with profile picture uploads and arrange your links in the perfect order.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Link Management</h4>
                <p className="mt-1 text-slate-400">Easily add, edit, and delete your links anytime through a simple and intuitive dashboard.</p>
              </div>
            </div>


            <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Shareable Public URL</h4>
                <p className="mt-1 text-slate-400">Get a unique `linkhub.app/username` URL to share everywhere, making it easy for followers to find you.</p>
              </div>
            </div>

            {/* Pro Feature Teaser */}
            <div className="md:col-span-2 p-8 bg-primary/10 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-yellow-500">
                 <Star size={40} fill="currentColor" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h4 className="text-xl font-bold text-white mb-2">Unlock Pro Features!</h4>
                <p className="text-slate-300 leading-relaxed">
                  Upgrade to LinkHub Pro for advanced customization (themes, fonts), link scheduling, detailed analytics, custom domains, and priority support.
                </p>
              </div>
              <Link href="/pricing" className="flex-shrink-0 px-6 py-3 text-sm font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}