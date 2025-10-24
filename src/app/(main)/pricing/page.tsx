'use client';

import Link from 'next/link';
import { Mail, BarChart2, Home, Check } from 'lucide-react'; // Added relevant icons

// Helper component for the checkmark icon
const CheckIcon = () => (
    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" fillRule="evenodd"></path>
    </svg>
);

export default function PricingPage() {
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
                            <span className="text-sm font-medium text-primary">Pricing</span>
                            <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">About</Link>
                        </nav>
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="px-4 py-2 text-sm font-bold bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">Log in</Link>
                            <Link href="/login" className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">Sign up</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Upgrade to LinkHub Pro</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Unlock the full potential of LinkHub with our Pro plan. Get access to advanced features, customization options, and priority support.</p>
                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Pro Features List */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white">Pro Features</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                                        <Mail className="w-6 h-6" /> {/* Icon from lucide-react */}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Custom Domains</h4>
                                        <p className="mt-1 text-slate-400">Use your own domain name for a more professional and branded presence.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                                        <BarChart2 className="w-6 h-6" /> {/* Icon from lucide-react */}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Advanced Analytics</h4>
                                        <p className="mt-1 text-slate-400">Track clicks, views, and other key metrics to understand your audience.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                                        <Home className="w-6 h-6" /> {/* Icon from lucide-react */}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Enhanced Customization</h4>
                                        <p className="mt-1 text-slate-400">Customize your page with themes, custom backgrounds, and more options.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Box */}
                        <div className="bg-slate-900/50 p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-white">Pricing</h3>
                            <div className="mt-6 space-y-8">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Monthly Option */}
                                    <div className="flex-1 border-2 border-slate-700 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                        <h4 className="text-lg font-semibold text-slate-200">Monthly</h4>
                                        <p className="mt-2 text-4xl font-extrabold text-white">$9<span className="text-base font-medium text-slate-400">/mo</span></p>
                                    </div>
                                    {/* Annual Option */}
                                    <div className="flex-1 border-2 border-primary rounded-lg p-6 text-center relative">
                                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</div>
                                        <h4 className="text-lg font-semibold text-slate-200">Annual</h4>
                                        <p className="mt-2 text-4xl font-extrabold text-white">$99<span className="text-base font-medium text-slate-400">/yr</span></p>
                                        <p className="mt-1 text-sm text-primary">Save 8%</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-center gap-3"><CheckIcon /><span>All Free features included</span></li>
                                    <li className="flex items-center gap-3"><CheckIcon /><span>Priority support</span></li>
                                    <li className="flex items-center gap-3"><CheckIcon /><span>And much more...</span></li>
                                </ul>
                                <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all text-lg">Upgrade to Pro</button>
                                <p className="text-center text-xs text-slate-400">Prices exclude applicable taxes. See full terms and conditions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}