'use client';

import Image from 'next/image';
import { AGENT_COLORS } from '@shared/config';

type AgentBadgeProps = {
  name: string;
  contentType: string;
};

export default function AgentBadge({ name, contentType }: AgentBadgeProps) {
  const theme = AGENT_COLORS[contentType] || AGENT_COLORS.motivational;

  return (
    <div className="inline-flex items-center" style={{ gap: '12px' }}>
      {/* Avatar */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <Image
          src={theme.avatar}
          alt={name}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Name + type */}
      <div className="flex flex-col">
        <span
          className="text-sm font-medium leading-tight"
          style={{
            color: '#ffffff',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {name}
        </span>
        <span
          className="text-[11px] leading-tight capitalize"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          {contentType}
        </span>
      </div>
    </div>
  );
}
