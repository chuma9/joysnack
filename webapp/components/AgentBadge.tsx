'use client';

import { AGENT_COLORS } from '@shared/config';

type AgentBadgeProps = {
  name: string;
  contentType: string;
};

export default function AgentBadge({ name, contentType }: AgentBadgeProps) {
  const theme = AGENT_COLORS[contentType] || AGENT_COLORS.motivational;

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
      style={{
        background: theme.bg,
        color: theme.text,
      }}
    >
      <span className="text-base">{theme.icon}</span>
      <span className="font-['DM_Sans']">{name}</span>
    </div>
  );
}
