/**
 * Shared configuration for Joysnack
 */

export const SESSION_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

export const AGENT_COLORS: Record<string, {
  bg: string;
  text: string;
  icon: string;
  accent: string;
  gradient: string;
  avatar: string;
}> = {
  motivational: { bg: '#faf0ec', text: '#8b5a42', icon: '\u{1F525}', accent: '#b07058', gradient: 'linear-gradient(135deg, #9e6450 0%, #b8806a 40%, #a07058 100%)', avatar: '/avatars/sunny.png' },
  story:        { bg: '#f0f5ed', text: '#5a6e52', icon: '\u{1F4D6}', accent: '#7a8a68', gradient: 'linear-gradient(135deg, #687860 0%, #808e70 40%, #748268 100%)', avatar: '/avatars/mabel.png' },
  support:      { bg: '#f2eef8', text: '#6b5d8a', icon: '\u{1F49B}', accent: '#8a7898', gradient: 'linear-gradient(135deg, #7d6e90 0%, #9688a4 40%, #887a96 100%)', avatar: '/avatars/koa.png' },
  wisdom:       { bg: '#f0ecf5', text: '#6b5a82', icon: '\u{1F54A}\u{FE0F}', accent: '#806070', gradient: 'linear-gradient(135deg, #705060 0%, #8a6a7a 40%, #7c5e6e 100%)', avatar: '/avatars/sage.png' },
  knowledge:    { bg: '#edf2ea', text: '#5a6e4e', icon: '\u{2728}', accent: '#6e7a52', gradient: 'linear-gradient(135deg, #5e6e48 0%, #748660 40%, #687a54 100%)', avatar: '/avatars/nyx.png' },
  peace:        { bg: '#f0f5ed', text: '#5a6e52', icon: '\u{1F331}', accent: '#7a9a78', gradient: 'linear-gradient(135deg, #6a8a6e 0%, #82a080 40%, #769876 100%)', avatar: '/avatars/willow.png' },
  imagination:  { bg: '#faf0ec', text: '#8b6a52', icon: '\u{1F308}', accent: '#a87058', gradient: 'linear-gradient(135deg, #986048 0%, #b08068 40%, #a07058 100%)', avatar: '/avatars/luna.png' },
  wonder:       { bg: '#f0ecf5', text: '#6b5a82', icon: '\u{1F30C}', accent: '#6e6090', gradient: 'linear-gradient(135deg, #5e5080 0%, #78689a 40%, #6a5c8a 100%)', avatar: '/avatars/nova.png' },
  gratitude:    { bg: '#faf0ec', text: '#8b5a42', icon: '\u{2764}\u{FE0F}', accent: '#9a6850', gradient: 'linear-gradient(135deg, #8e5e46 0%, #a87a60 40%, #986e54 100%)', avatar: '/avatars/honey.png' },
  adventure:    { bg: '#edf2ea', text: '#4e5e46', icon: '\u{26F0}\u{FE0F}', accent: '#527248', gradient: 'linear-gradient(135deg, #486840 0%, #608858 40%, #547448 100%)', avatar: '/avatars/scout.png' },
  unhinged:     { bg: '#fff5e6', text: '#8b6914', icon: '\u{1F92F}', accent: '#b89830', gradient: 'linear-gradient(135deg, #9e8428 0%, #b09840 40%, #a89030 100%)', avatar: '/avatars/sparky.png' },
  showerthought:{ bg: '#e8f0f8', text: '#4a6382', icon: '\u{1F6BF}', accent: '#627488', gradient: 'linear-gradient(135deg, #566a7e 0%, #6e8292 40%, #627486 100%)', avatar: '/avatars/drifter.png' },
  hype:         { bg: '#fce8e8', text: '#8b3a3a', icon: '\u{1F525}', accent: '#b85848', gradient: 'linear-gradient(135deg, #a44e3e 0%, #be6e5a 40%, #ae5e4e 100%)', avatar: '/avatars/blaze.png' },
  dadjoke:      { bg: '#f5f0e0', text: '#6b5e32', icon: '\u{1F60E}', accent: '#8e8058', gradient: 'linear-gradient(135deg, #7e7250 0%, #968a64 40%, #887e58 100%)', avatar: '/avatars/pops.png' },
  conspiracy:   { bg: '#e8eff5', text: '#3a5a7a', icon: '\u{1F575}\u{FE0F}', accent: '#546270', gradient: 'linear-gradient(135deg, #485868 0%, #64747e 40%, #566470 100%)', avatar: '/avatars/mulder.png' },
};
