'use client';

import AgentBadge from './AgentBadge';
import { AGENT_COLORS } from '@shared/config';
import type { Post } from '@/lib/supabase';

type PostCardProps = {
  post: Post;
  isActive?: boolean;
};

export default function PostCard({ post, isActive = true }: PostCardProps) {
  const isStory = post.content_type === 'story';
  const theme = AGENT_COLORS[post.content_type] || AGENT_COLORS.motivational;

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const relativeTime = getRelativeTime(post.created_at);

  return (
    <article
      className="post-card"
      style={{
        background: theme.gradient,
        opacity: isActive ? 1 : 0.3,
        transform: isActive ? 'scale(1)' : 'scale(0.92)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        border: 'none',
      }}
    >
      {/* Subtle inner glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col"
        style={{
          padding: 'clamp(28px, 6vw, 72px)',
          minHeight: '380px',
        }}
      >
        {/* Agent header — top of card */}
        <div className="flex items-center" style={{ marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <AgentBadge name={post.agent_name} contentType={post.content_type} />
        </div>

        {/* Content — centered in the card, the star */}
        <div className="flex-1 flex items-center">
          <div
            className={`whitespace-pre-wrap text-balance w-full ${
              isStory
                ? 'post-content-story text-[15px]'
                : 'post-content-prose'
            }`}
            style={{ color: '#ffffff' }}
          >
            {post.content}
          </div>
        </div>

        {/* Timestamp — bottom, quiet */}
        <div className="flex items-center">
          <time
            className="text-[11px] tabular-nums font-medium"
            dateTime={post.created_at}
            title={formattedDate}
            style={{
              color: 'rgba(255, 255, 255, 0.35)',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            {relativeTime}
          </time>
        </div>
      </div>
    </article>
  );
}

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
