// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Check, Link as LinkIcon, Palette, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="font-display text-slate-200">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-50 w-full bg-[#101722]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fill-rule="evenodd"></path></svg>
                <h2 className="text-2xl font-bold text-white">LinkHub</h2>
              </div>
              <nav className="hidden items-center gap-8 md:flex">
                <a className="text-sm font-medium text-slate-300 duration-250 hover-text-primary" href="#">Features</a>
                <a className="text-sm font-medium text-slate-300 duration-250 hover-text-primary" href="#">Pricing</a>
                <a className="text-sm font-medium text-slate-300 duration-250 hover-text-primary" href="#">Resources</a>
              </nav>
              <div className="flex items-center gap-4">
                <button onClick={handleGetStarted} className="hidden text-sm font-medium text-slate-300 duration-250 hover-text-primary sm:block">
                  Log In
                </button>
                <button onClick={handleGetStarted} className="flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter text-white md:text-6xl">
                One link to rule them all
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                Connect audiences to all of your content with just one link. Your personal hub for everything you are and create.
              </p>
              <div className="mt-8 flex justify-center">
                <button onClick={handleGetStarted} className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition-transform hover:scale-105">
                  Get Started for Free
                </button>
              </div>
            </div>
          </section>

          <section className="bg-slate-900/50 py-20 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Everything you need to grow your audience
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  LinkHub is the all-in-one platform to connect with your audience, share everything you create and grow your following.
                </p>
              </div>
              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <FeatureCard
                  icon={<LinkIcon size={28} />}
                  title="All your links in one place"
                  description="Share all your important links in one place, from social media profiles to your latest blog posts."
                />
                <FeatureCard
                  icon={<Palette size={28} />}
                  title="Customize your page"
                  description="Personalize your LinkHub page with custom themes, colors, and your own branding."
                />
                <FeatureCard
                  icon={<BarChart2 size={28} />}
                  title="Track your performance"
                  description="Gain insights into your audience with detailed analytics, including clicks, views, and more."
                />
              </div>
            </div>
          </section>

          <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing</h2>
                <p className="mt-4 text-lg text-slate-400">
                  Start for free, then upgrade to unlock more features and take your LinkHub to the next level.
                </p>
              </div>
              <div className="mt-16 grid max-w-4xl mx-auto gap-8 lg:grid-cols-2 lg:gap-4">
                <PricingCard
                  title="Free"
                  description="For beginners and creators just getting started."
                  price="$0"
                  features={['Unlimited links', 'Customizable themes', 'Basic analytics']}
                  onGetStarted={handleGetStarted}
                  isPopular={false}
                />
                <PricingCard
                  title="Pro"
                  description="For creators and businesses who want more power."
                  price="$5"
                  features={['Everything in Free, plus:', 'Advanced analytics', 'Custom domain', 'Priority support']}
                  onGetStarted={handleGetStarted}
                  isPopular={true}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col gap-4 rounded-xl bg-[#101722] p-6 shadow-sm ring-1 ring-slate-800">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const PricingCard = ({ title, description, price, features, onGetStarted, isPopular }: any) => (
  <div className={`relative flex flex-col rounded-xl border ${isPopular ? 'border-2 border-primary' : 'border-slate-800'} background-color p-8`}>
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
        <div className="rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase text-white">Most Popular</div>
      </div>
    )}
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="mt-2 text-slate-400">{description}</p>
    <div className="mt-4">
      <span className="text-4xl font-extrabold text-white">{price}</span>
      <span className="ml-1 font-medium text-slate-400">/month</span>
    </div>
    <button onClick={onGetStarted} className={`mt-6 flex h-10 w-full items-center justify-center rounded-full px-6 text-sm font-bold ${isPopular ? 'bg-primary text-white transition-transform hover:scale-105' : 'bg-slate-800 text-slate-200 transition-transform hover:scale-105 hover:bg-slate-700'}`}>
      Get Started
    </button>
    <ul className="mt-8 space-y-4 text-sm text-slate-400">
      {features.map((feature: string) => (
        <li key={feature} className="flex items-center gap-3">
          <Check className="text-primary" size={20} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);