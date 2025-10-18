import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type Link = {
  id: number;
  title: string;
  url: string;
};

type Profile = {
  id: string;
  username: string;
  links: Link[];
};

async function getProfileData(username: string): Promise<Profile | null> {
  const supabase = createClient();
  
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')
    .ilike('username', username)
    .single();

  if (profileError || !profileData) {
    return null;
  }

  const { data: linksData, error: linksError } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', profileData.id)
    .order('id', { ascending: true });
  
  if (linksError) {
    console.error("Error fetching links:", linksError);
    return { ...profileData, links: [] };
  }

  return { ...profileData, links: linksData || [] };
}

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfileData(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-400">
              {profile.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">@{profile.username}</h1>
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
                index === 0 ? 'bg-[--color-primary]' : 'bg-[--color-slate-button] hover:bg-[--color-slate-button-hover]'
              }`}
            >
              <span className="truncate">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}