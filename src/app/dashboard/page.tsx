'use client';

import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import { Link as LinkIcon, Edit, Trash2, Plus } from 'lucide-react';

type Link = {
  id: number;
  title: string;
  url: string;
};

export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const router = useRouter();

  const [links, setLinks] = useState<Link[]>([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        const { data: profileData } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        setProfile(profileData);
        
        const { data: linksData } = await supabase
          .from('links')
          .select('id, title, url')
          .eq('user_id', user.id)
          .order('id', { ascending: true });
        setLinks(linksData || []);

      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    checkUserAndFetchData();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleAddLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data: newLink, error } = await supabase
      .from('links')
      .insert({ title: newLinkTitle, url: newLinkUrl, user_id: user.id })
      .select()
      .single();

    if (error) {
      alert('Error adding link: ' + error.message);
    } else {
      setLinks([...links, newLink]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      const { error } = await supabase.from('links').delete().eq('id', linkId);
      if (error) {
        alert('Error deleting link: ' + error.message);
      } else {
        // Remove the link from local state for an instant UI update
        setLinks(links.filter(link => link.id !== linkId));
      }
    }
  };

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="font-display">
      <header className="border-b border-gray-700/50 bg-[--color-background-dark]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <h1 className="text-xl font-bold text-white">LinkHub</h1>
          <button onClick={handleSignOut} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-700">
            Sign Out
          </button>
        </div>
      </header>
      
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Dashboard</h2>
              <p className="text-gray-400">Your LinkHub is live and ready to be shared with the world.</p>
            </div>
            <div className="relative">
              <input className="form-input w-full rounded-lg border-gray-700/50 bg-gray-800/30 py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500" readOnly type="text" value={`linkhub.app/${profile?.username || '...'}`} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">My Links</h3>
            
            <form onSubmit={handleAddLink} className="flex gap-2">
              <input value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} className="form-input w-1/3 rounded-lg border-gray-700/50 bg-gray-800/30 py-2 px-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:border-transparent" placeholder="Link Title (e.g., My Portfolio)" required />
              <div className="relative w-2/3">
                 <input value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} className="form-input w-full rounded-lg border-gray-700/50 bg-gray-800/30 py-2 pl-3 pr-10 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:border-transparent" placeholder="https://your-link.com" type="url" required />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 bg-[--color-primary] text-white rounded-r-lg hover:bg-opacity-90 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="flex items-center gap-4 rounded-xl p-3 bg-gray-800/20 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700/50 text-gray-300">
                    <LinkIcon />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-semibold text-white truncate">{link.title}</p>
                    <p className="text-sm text-gray-400 truncate">{link.url}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-[--color-primary] transition-colors" disabled>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteLink(link.id)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {links.length === 0 && !isLoading && (
                <p className="text-center text-gray-400 py-4">You haven't added any links yet. Add one above to get started!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}