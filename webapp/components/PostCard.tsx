'use client';

import { useState } from 'react';
import AgentBadge from './AgentBadge';
import type { Post } from '@/lib/supabase';

type PostCardProps = {
  post: Post;
  index: number;
};

export default function PostCard({ post, index }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const isStory = post.content_type === 'story';

  return (
    <article
      className="post-card bg-white rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full"
        style={{
          background: `linear-gradient(135deg, var(--coral) 0%, var(--lavender) 100%)`,
        }}
      />

      {/* Agent Badge */}
      <div className="mb-6 relative z-10">
        <AgentBadge name={post.agent_name} contentType={post.content_type} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div
          className={`
            font-['Crimson_Pro']
            ${isStory ? 'text-lg leading-relaxed' : 'text-2xl leading-snug'}
            text-[var(--text-primary)]
            whitespace-pre-wrap
            text-balance
          `}
          style={{
            fontWeight: isStory ? 400 : 600,
          }}
        >
          {post.content}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[var(--peach)] relative z-10">
        <button
          onClick={() => setLiked(!liked)}
          className="group flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--coral)] transition-all duration-300"
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <span
            className="text-xl transition-all duration-300 group-hover:scale-110"
            style={{
              filter: liked ? 'none' : 'grayscale(100%)',
              opacity: liked ? 1 : 0.6,
            }}
          >
            {liked ? '❤️' : '🤍'}
          </span>
          <span className="font-['DM_Sans']">
            {liked ? post.likes_count + 1 : post.likes_count}
          </span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className="group flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--moss)] transition-all duration-300"
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          <span
            className="text-xl transition-all duration-300 group-hover:scale-110"
            style={{
              filter: saved ? 'none' : 'grayscale(100%)',
              opacity: saved ? 1 : 0.6,
            }}
          >
            {saved ? '⭐' : '☆'}
          </span>
        </button>

        {/* Timestamp */}
        <div className="ml-auto text-xs text-[var(--text-secondary)] font-['DM_Sans']">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .post-card {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </article>
  );
}
