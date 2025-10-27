import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type LinkData = {
  id: number;
  title: string;
  url: string;
};

type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  links: LinkData[];
};

export const revalidate = 3600;

async function getProfileData(username: string): Promise<Profile | null> {
  const supabase = createClient();
  
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url')
    .ilike('username', username)
    .single();

  if (profileError || !profileData) {
    return null;
  }

  const { data: linksData } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', profileData.id)
    .order('id', { ascending: true });
  
  return { ...profileData, links: linksData || [] };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const profile = await getProfileData(params.user);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-display">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="relative">
            <Image
              src={profile.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${profile.username}&backgroundColor=0d69f2`}
              alt={profile.full_name || profile.username}
              width={112} 
              height={112}
              className="rounded-full object-cover bg-gray-700 border-2 border-gray-600"
              priority
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">{profile.full_name || profile.username}</h1>
            <p className="text-base text-slate-400">@{profile.username}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {profile.links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-white text-center font-bold py-4 px-6 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl ${
                index === 0 ? 'bg-primary' : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <span className="truncate">{link.title}</span>
            </a>
          ))}
        </div>
      </main>

      <footer className="absolute bottom-6 text-center">
        <Link href="/" className="text-lg font-bold text-white hover:text-primary transition-colors">
          LinkHub
        </Link>
      </footer>
    </div>
  );
}