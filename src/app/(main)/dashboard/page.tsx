'use client';

import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { Link as LinkIcon, Edit, Trash2, Plus, Copy, Clock, Lock, X, Palette, BarChart2, Check, XCircle, Settings, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type LinkType = {
  id: number;
  title: string;
  url: string;
};

type Profile = {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
};

const isSupabaseStorageUrl = (url: string | null): boolean => {
  return url ? url.includes('/storage/v1/object/public/avatars/') : false;
};


export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const [links, setLinks] = useState<LinkType[]>([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingUrl, setEditingUrl] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingFullName, setEditingFullName] = useState('');
  const [editingAvatarUrl, setEditingAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData } = await supabase.from('profiles').select('username, full_name, avatar_url').eq('id', user.id).single();
        setProfile(profileData);
        if (profileData) {
          setEditingFullName(profileData.full_name || '');
          if (isSupabaseStorageUrl(profileData.avatar_url)) {
            setEditingAvatarUrl('');
          } else {
            setEditingAvatarUrl(profileData.avatar_url || '');
          }
        }

        const { data: linksData } = await supabase.from('links').select('id, title, url').eq('user_id', user.id).order('id', { ascending: true });
        setLinks(linksData || []);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    checkUserAndFetchData();
  }, [router, supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUploading(true);

    const profileUpdateData: { full_name: string | null, avatar_url: string | null } = {
      full_name: editingFullName || null,
      avatar_url: editingAvatarUrl || null,
    };

    let uploadedFileUrl: string | null = null;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) {
        alert('Error uploading new picture: ' + uploadError.message);
        setIsUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      uploadedFileUrl = urlData.publicUrl;

      profileUpdateData.avatar_url = uploadedFileUrl;
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(profileUpdateData)
      .eq('id', user.id)
      .select('username, full_name, avatar_url')
      .single();

    setIsUploading(false);
    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      setProfile(data);
      setAvatarFile(null);
      if (uploadedFileUrl) {
          setEditingAvatarUrl('');
      } else {
          setEditingAvatarUrl(data.avatar_url || '');
      }

      setIsSettingsModalOpen(false);
      alert('Profile updated successfully!');
    }
  };

  const handleAddLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { data: newLink, error } = await supabase.from('links').insert({ title: newLinkTitle, url: newLinkUrl, user_id: user.id }).select().single();
    if (error) {
      alert('Error adding link: ' + error.message);
    } else {
      setLinks([...links, newLink]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
   };
  const handleDeleteLink = async (linkId: number) => {
    if (true) {
      const { error } = await supabase.from('links').delete().eq('id', linkId);
      if (error) {
        alert('Error deleting link: ' + error.message);
      } else {
        setLinks(links.filter(link => link.id !== linkId));
      }
    }
   };
  const startEditing = (link: LinkType) => {
    setEditingLinkId(link.id);
    setEditingTitle(link.title);
    setEditingUrl(link.url);
   };
  const cancelEditing = () => {
    setEditingLinkId(null);
    setEditingTitle('');
    setEditingUrl('');
   };
  const handleUpdateLink = async (linkId: number) => {
    const { data: updatedLink, error } = await supabase
      .from('links')
      .update({ title: editingTitle, url: editingUrl })
      .eq('id', linkId)
      .select()
      .single();

    if (error) {
      alert('Error updating link: ' + error.message);
    } else {
      setLinks(links.map(link => link.id === linkId ? updatedLink : link));
      cancelEditing();
    }
   };


  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="font-display">
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative rounded-xl bg-[#182630] p-8 shadow-2xl w-full max-w-md animate-fade-in-scale">
            <button onClick={() => setIsSettingsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white disabled:opacity-50" disabled={isUploading}><X size={24} /></button>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6 text-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Account Settings</h3>
                <p className="text-sm text-gray-400">Update your profile information. This will be visible on your public page.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input id="fullName" type="text" value={editingFullName} onChange={(e) => setEditingFullName(e.target.value)} className="form-input w-full rounded-md border-gray-600 bg-gray-700 py-2 px-3 text-sm text-white placeholder-gray-400" placeholder="e.g., Sophia Carter" />
                </div>
                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-300 mb-2">Profile Picture URL</label>
                  <input id="avatarUrl" type="url" value={editingAvatarUrl} onChange={(e) => setEditingAvatarUrl(e.target.value)} className="form-input w-full rounded-md border-gray-600 bg-gray-700 py-2 px-3 text-sm text-white placeholder-gray-400" placeholder="https://your-image-url.com/picture.jpg" />
                </div>
                <div className="text-center text-sm text-gray-400">OR</div>
                <div>
                  <label htmlFor="avatarFile" className="block text-sm font-medium text-gray-300 mb-2">Upload a New Picture</label>
                  <div className="flex items-center">
                    <input id="avatarFile" type="file" onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)} accept="image/*" className="hidden" />
                    <label htmlFor="avatarFile" className="custom-file-label flex-shrink-0">Choose File</label>
                    <span className="file-name-display">{avatarFile ? avatarFile.name : 'No file chosen'}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsSettingsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-gray-700/50 disabled:opacity-50" disabled={isUploading}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isUploading}>
                  {isUploading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative rounded-xl bg-[#182630] p-8 shadow-2xl w-full max-w-md animate-fade-in-scale">
            <button onClick={() => setIsUpgradeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
            
            <div className="flex flex-col items-center text-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-primary-light text-primary rounded-full">
                <Star size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Upgrade to LinkHub Pro</h3>
                <p className="text-sm text-gray-400">Unlock custom domains, advanced analytics, and powerful customization options to take your page to the next level.</p>
              </div>
              <div className="flex flex-col sm:flex-row w-full gap-3">
                <button type="button" onClick={() => setIsUpgradeModalOpen(false)} className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-gray-700/50">
                  Maybe Later
                </button>
                <Link href="/pricing" className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-opacity-90">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-gray-700/50 bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="text-xl font-bold text-white hover:text-primary transition-colors">
            LinkHub
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-white ring-2 ring-transparent hover:ring-primary transition-all overflow-hidden" // Added relative
              >
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt="User" layout="fill" objectFit="cover" />
                ) : (
                  user?.email?.charAt(0).toUpperCase()
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-48 rounded-lg bg-[#182630] shadow-2xl ring-1 ring-gray-700/50 animate-dropdown-fade-in">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setEditingFullName(profile?.full_name || '');
                        if (isSupabaseStorageUrl(profile?.avatar_url || null)) {
                          setEditingAvatarUrl('');
                        } else {
                          setEditingAvatarUrl(profile?.avatar_url || '');
                        }
                        setAvatarFile(null);
                        setIsSettingsModalOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-primary hover:text-white"
                    >
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </button>
                    <div className="my-1 h-px bg-gray-700/50"></div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Dashboard</h2>
              <p className="text-gray-400">Your LinkHub is live and ready to be shared with the world.</p>
            </div>
            <div className="relative">
              <input className="form-input w-full rounded-lg border-gray-700/50 bg-gray-800/30 py-3 pl-4 pr-12 text-sm text-white" readOnly type="text" value={`LinkHub.netlify.app/${profile?.username || '...'}`} />
              <button onClick={() => {
                  try {
                    const input = document.createElement('textarea');
                    input.value = `LinkHub.netlify.app/${profile?.username || ''}`;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    alert('Copied to clipboard!');
                  } catch (err) {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy. Please copy manually.');
                  }
                }} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-primary transition-colors">
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h3 className="text-xl font-bold text-white">My Links</h3>
            <form onSubmit={handleAddLink} className="flex gap-2">
              <input value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} className="form-input w-1/3 rounded-lg border-gray-700/50 bg-gray-800/30 py-2 px-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Link Title" required />
              <div className="relative w-2/3">
                 <input value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} className="form-input w-full rounded-lg border-gray-700/50 bg-gray-800/30 py-2 pl-3 pr-10 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://your-link.com" type="url" required />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 bg-primary text-white rounded-r-lg hover:bg-opacity-90 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className={`rounded-xl p-3 shadow-sm transition-colors duration-300 ease-in-out ${
                  editingLinkId === link.id ? 'bg-sky-950/50' : 'bg-gray-800/20'
                }`}>
                  {editingLinkId === link.id ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700/50 text-gray-300 flex-shrink-0"><LinkIcon /></div>
                        <div className="flex-1 flex flex-col gap-2">
                          <input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} className="form-input w-full rounded-md border-gray-600 bg-gray-700 py-1 px-2 text-sm text-white placeholder-gray-400" placeholder="Title" />
                          <input value={editingUrl} onChange={(e) => setEditingUrl(e.target.value)} className="form-input w-full rounded-md border-gray-600 bg-gray-700 py-1 px-2 text-sm text-white placeholder-gray-400" placeholder="URL" type="url" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button onClick={cancelEditing} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors"><XCircle size={18} /></button>
                        <button onClick={() => handleUpdateLink(link.id)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-green-500 transition-colors"><Check size={18} /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700/50 text-gray-300"><LinkIcon /></div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-white truncate">{link.title || 'No title'}</p>
                        <p className="text-sm text-gray-400 truncate">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setIsUpgradeModalOpen(true)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-primary transition-colors"><Clock size={18} /></button>
                        <button onClick={() => startEditing(link)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-primary transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteLink(link.id)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {links.length === 0 && !isLoading && (
                <p className="text-center text-gray-400 py-4">You haven&apos;t added any links yet. Add one above to get started!</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">Pro Features</h3>
              <button onClick={() => setIsUpgradeModalOpen(true)} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary hover:bg-primary/20 transition-colors">
                Upgrade
              </button>
            </div>
            <div className="relative rounded-xl border border-dashed border-gray-700/50 bg-gray-800/10 p-6 overflow-hidden">
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background-dark/70 backdrop-blur-sm">
                <Lock size={32} className="text-yellow-500 mb-2" />
                <p className="font-bold text-lg text-gray-100">This is a Pro Feature</p>
                <p className="text-gray-400 text-sm mb-4">Upgrade your account to unlock these and more.</p>

                <button onClick={() => setIsUpgradeModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors">Upgrade Now</button>
              </div>
              <div className="space-y-4 filter blur-sm">
                <h4 className="font-bold text-gray-500">Customization Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 rounded-xl p-4 bg-gray-800/20"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 text-gray-400"><Palette /></div><div><p className="font-semibold text-gray-300">Appearance</p><p className="text-sm text-gray-500">Customize your page</p></div></div>
                  <div className="flex items-center gap-4 rounded-xl p-4 bg-gray-800/20"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 text-gray-400"><BarChart2 /></div><div><p className="font-semibold text-gray-300">Analytics</p><p className="text-sm text-gray-500">Track your clicks</p></div></div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}