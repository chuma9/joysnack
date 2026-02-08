'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import PostCard from './PostCard';
import { getPosts, type Post } from '@/lib/supabase';

function SkeletonCard() {
  return (
    <div className="snap-post">
      <div
        className="post-card"
        style={{
          animation: 'fadeIn 0.5s ease both',
          background: 'linear-gradient(135deg, var(--linen) 0%, var(--sand) 100%)',
          border: 'none',
        }}
      >
        <div className="px-8 pt-8 pb-10 md:px-14 md:pt-12 md:pb-14 flex flex-col min-h-[380px] md:min-h-[460px]">
          <div className="flex items-center gap-3">
            <div className="skeleton w-10 h-10 rounded-full" style={{ opacity: 0.3 }} />
            <div className="flex flex-col gap-1.5">
              <div className="skeleton w-24 h-3" style={{ opacity: 0.25 }} />
              <div className="skeleton w-14 h-2.5" style={{ opacity: 0.15 }} />
            </div>
          </div>
          <div className="flex-1 flex items-center py-10 md:py-14">
            <div className="space-y-3.5 w-full">
              <div className="skeleton w-full h-6" style={{ opacity: 0.2 }} />
              <div className="skeleton w-[85%] h-6" style={{ opacity: 0.15 }} />
              <div className="skeleton w-[55%] h-6" style={{ opacity: 0.1 }} />
            </div>
          </div>
          <div className="skeleton w-12 h-2.5" style={{ opacity: 0.12 }} />
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
          <PostCard post={post} isActive={index === activeIndex} />
        </div>
      ))}

      {/* Progress rail — side dots */}
      {posts.length > 1 && (
        <div className="progress-rail">
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
