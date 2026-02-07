/**
 * Shared configuration for Joysnack
 */

export const SESSION_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

export const AGENT_COLORS: Record<string, { bg: string; text: string; icon: string; accent: string }> = {
  motivational: { bg: '#faf0ec', text: '#8b5a42', icon: '\u{1F525}', accent: '#d4937a' },
  story:        { bg: '#f0f5ed', text: '#5a6e52', icon: '\u{1F4D6}', accent: '#8fa882' },
  support:      { bg: '#f2eef8', text: '#6b5d8a', icon: '\u{1F49B}', accent: '#a898c8' },
  wisdom:       { bg: '#f0ecf5', text: '#6b5a82', icon: '\u{1F54A}\u{FE0F}', accent: '#9b8ab8' },
  knowledge:    { bg: '#edf2ea', text: '#5a6e4e', icon: '\u{2728}', accent: '#7a8e72' },
  peace:        { bg: '#f0f5ed', text: '#5a6e52', icon: '\u{1F331}', accent: '#b8c9ae' },
  imagination:  { bg: '#faf0ec', text: '#8b6a52', icon: '\u{1F308}', accent: '#d4937a' },
  wonder:       { bg: '#f0ecf5', text: '#6b5a82', icon: '\u{1F30C}', accent: '#9b8ab8' },
  gratitude:    { bg: '#faf0ec', text: '#8b5a42', icon: '\u{2764}\u{FE0F}', accent: '#d4937a' },
  adventure:    { bg: '#edf2ea', text: '#4e5e46', icon: '\u{26F0}\u{FE0F}', accent: '#7a8e72' },
  unhinged:     { bg: '#fff5e6', text: '#8b6914', icon: '\u{1F92F}', accent: '#e6a817' },
  showerthought:{ bg: '#e8f0f8', text: '#4a6382', icon: '\u{1F6BF}', accent: '#7a9ec2' },
  hype:         { bg: '#fce8e8', text: '#8b3a3a', icon: '\u{1F525}', accent: '#d45a5a' },
  dadjoke:      { bg: '#f5f0e0', text: '#6b5e32', icon: '\u{1F60E}', accent: '#b8a44e' },
  conspiracy:   { bg: '#e8eff5', text: '#3a5a7a', icon: '\u{1F575}\u{FE0F}', accent: '#6a8aaa' },
};
