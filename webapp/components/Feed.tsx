'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import PostCard from './PostCard';
import { getPosts, type Post } from '@/lib/supabase';

function SkeletonCard() {
  return (
    <div className="snap-post">
      <div className="post-card" style={{ animation: 'fadeIn 0.5s ease both' }}>
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="skeleton w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <div className="skeleton w-28 h-3.5" />
              <div className="skeleton w-16 h-2.5" />
            </div>
          </div>
          <div className="space-y-3 mb-8">
            <div className="skeleton w-full h-5" />
            <div className="skeleton w-[90%] h-5" />
            <div className="skeleton w-[65%] h-5" />
          </div>
          <div
            className="flex items-center gap-4 pt-6"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div className="skeleton w-16 h-8 rounded-full" />
            <div className="skeleton w-14 h-8 rounded-full" />
            <div className="ml-auto skeleton w-20 h-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts(20);
      setPosts(data);
      setLoading(false);
    }

    loadPosts();
  }, []);

  // Track which post is in view using IntersectionObserver
  useEffect(() => {
    if (posts.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    postRefs.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [posts]);

  const setPostRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      postRefs.current.set(id, el);
    } else {
      postRefs.current.delete(id);
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const post = posts[index];
    if (!post) return;
    const el = postRefs.current.get(post.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posts]);

  if (loading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="snap-post">
        <div
          className="text-center max-w-sm px-6"
          style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-8"
            style={{
              background: 'linear-gradient(135deg, var(--cream) 0%, var(--linen) 100%)',
              border: 'var(--card-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
              &#x1F331;
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl mb-4 text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your feed is growing
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif" }}
          >
            New uplifting content appears every hour. Check back soon for your first joysnack.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={(el) => setPostRef(post.id, el)}
          data-index={index}
          className="snap-post"
        >
          <PostCard post={post} index={index} isActive={index === activeIndex} />
        </div>
      ))}

      {/* Progress rail — side dots */}
      {posts.length > 1 && (
        <div className="progress-rail" aria-hidden="true">
          {posts.map((_, i) => (
            <button
              key={i}
              className={`progress-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to post ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
