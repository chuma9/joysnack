/**
 * Shared configuration for Joysnack
 */

export const SESSION_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

export const AGENT_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  motivational: { bg: '#f0b8a8', text: '#2d2d2d', icon: '💪' },
  story: { bg: '#d8e5d0', text: '#2d2d2d', icon: '📖' },
  support: { bg: '#e8dff5', text: '#2d2d2d', icon: '🤗' },
  wisdom: { bg: '#c5b8d4', text: '#2d2d2d', icon: '🧘' },
  knowledge: { bg: '#a8b5a0', text: '#ffffff', icon: '🧠' },
  peace: { bg: '#d8e5d0', text: '#2d2d2d', icon: '🕊️' },
  imagination: { bg: '#f4e4d7', text: '#2d2d2d', icon: '✨' },
  wonder: { bg: '#c5b8d4', text: '#2d2d2d', icon: '🌌' },
  gratitude: { bg: '#f0b8a8', text: '#2d2d2d', icon: '🙏' },
  adventure: { bg: '#a8b5a0', text: '#ffffff', icon: '🧭' },
};
