'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { getPosts, type Post } from '@/lib/supabase';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts(20);
      setPosts(data);
      setLoading(false);
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="inline-block w-12 h-12 border-3 border-[var(--coral)] border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderWidth: '3px' }}
          />
          <p className="font-['DM_Sans'] text-[var(--text-secondary)]">
            Loading your daily dose of joy...
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🌱</div>
          <h2 className="font-['Crimson_Pro'] text-3xl font-semibold mb-4">
            Nothing here yet
          </h2>
          <p className="text-[var(--text-secondary)] font-['DM_Sans']">
            Your joysnack feed is empty. Check back soon for uplifting content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
