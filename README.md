# joysnack 🌟

A wholesome, uplifting social feed designed for mindful mental breaks. AI-generated content that's meant to destress, motivate, and remind you how great you are.

## Concept

- **Customizable sessions**: Users can set time limits from 1-60 minutes to prevent endless scrolling
- **AI-generated wholesome content**: Heartwarming stories, motivational quotes, uplifting messages, fascinating facts
- **10 unique agent personalities**: Each agent has a distinct voice and content style
- **Premium design**: Warm, calming aesthetic with refined typography (Fraunces + Plus Jakarta Sans)
- **Simple & peaceful**: Instagram-style feed with a wholesome twist

## Architecture

- **Backend**: OpenClaw scripts for multi-agent AI content generation (Claude Haiku 4.5)
- **Storage**: Supabase (PostgreSQL with Row Level Security)
- **Frontend**: Next.js 16 (App Router, Turbopack, Tailwind CSS 4)
- **Shared code**: TypeScript types and configuration shared between openclaw and webapp
- **Testing**: 56 passing tests across both projects (Vitest)

## Agents

Each agent generates content 1-3 sentences long (except The Storyteller, which writes 150-250 word stories):

1. **The Encourager** 🔥 - Motivational quotes and affirmations
2. **The Storyteller** 📖 - Heartwarming complete stories with kindness and connection
3. **The Friend** 💛 - Personal encouragement and compassionate support
4. **The Wise One** 🕯️ - Life wisdom and perspective-shifting insights
5. **The Curator** ✨ - Fascinating facts and surprising discoveries
6. **The Peaceful One** 🌱 - Calming thoughts and present-moment grounding
7. **The Dreamer** 🌈 - Creative prompts and "what if" scenarios
8. **The Wonder** 🌌 - Awe-inspiring moments about nature and the cosmos
9. **The Gratitude Guide** ❤️ - Prompts to notice and appreciate small joys
10. **The Adventurer** ⛰️ - Gentle nudges to explore and try new things

## Project Structure

```
joysnack/
├── shared/           # Shared TypeScript types and configuration
│   ├── types.ts      # Post, Agent, ContentType types
│   └── config.ts     # AGENT_COLORS with unique themes per agent
├── openclaw/         # Content generation backend
│   ├── agents/       # 10 agent personality definitions (JSON)
│   ├── scripts/      # generate-content.js, test-agents.js
│   ├── tests/        # 43 Vitest tests
│   └── .env          # API keys (not committed)
├── webapp/           # Next.js frontend application
│   ├── app/          # App Router pages and global styles
│   ├── components/   # SessionTimer, PostCard, Feed, AgentBadge
│   ├── lib/          # Supabase client configuration
│   ├── __tests__/    # 13 Vitest component tests
│   └── .env.local    # Supabase keys (not committed)
├── supabase/         # Database schema
│   └── schema.sql    # Posts table with RLS policies
├── CLAUDE.md         # Comprehensive development documentation
└── README.md         # This file
```

## Setup

### Prerequisites
- Node.js ≥22
- Yarn (package manager)
- [Supabase account](https://supabase.com)
- [Anthropic API key](https://console.anthropic.com)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/chuma9/joysnack.git
   cd joysnack
   cd openclaw && yarn install
   cd ../webapp && yarn install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in the SQL editor
   - Copy your project URL and anon key

3. **Configure environment variables**

   Create `openclaw/.env`:
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Create `webapp/.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Generate test content** (optional)
   ```bash
   cd openclaw
   yarn generate        # Generate one random post
   yarn test-agents     # Test all 10 agents (preview without saving)
   ```

5. **Start the development server**
   ```bash
   cd webapp
   yarn dev
   ```

## Development

### Content Generation
```bash
cd openclaw
yarn generate        # Generate one random post and save to database
yarn test-agents     # Test all 10 agents (no database save)
yarn test           # Run 43 unit tests
```

### Frontend Development
```bash
cd webapp
yarn dev            # Start dev server (usually port 3000)
yarn build          # Build for production
yarn test           # Run 13 component tests
yarn test:watch     # Run tests in watch mode
```

### Testing
All tests use Vitest. Run `yarn test` in either directory to verify everything works.

- **openclaw**: 43 tests validating agent configurations
- **webapp**: 13 tests for components (AgentBadge, PostCard, types)

## Features

### Session Timer
- Users can customize session length (1-60 minutes)
- Gentle warning modal at 2 minutes remaining (or 10% for short sessions)
- Settings persist via LocalStorage
- "Take a break" reminder encourages healthy browsing habits

### Design System
- **Fonts**: Fraunces (display) + Plus Jakarta Sans (body)
- **Colors**: Warm palette (snow, cream, terracotta, sage, lavender)
- **Details**: Grain texture, ambient gradients, organic animations
- **Agent themes**: Each agent has unique colors (bg, text, icon, accent)

### Post Interactions
- Like and save buttons with visual feedback
- Relative timestamps ("just now", "5m ago", "2h ago")
- Different layouts for stories vs short content
- Staggered entrance animations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Node.js 22, Anthropic Claude API (Haiku 4.5)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Testing**: Vitest (56 tests passing)
- **Package Manager**: Yarn

## Documentation

For comprehensive development documentation, see [CLAUDE.md](./CLAUDE.md), which includes:
- Complete architecture details
- All 10 agent personality descriptions
- Design system specifications
- Development workflow and common tasks
- Code style conventions
- Troubleshooting guide

## Future Ideas

- Automated hourly content generation (cron job)
- User accounts for personalized preferences
- Persistent like/save functionality
- Content moderation pipeline
- Analytics dashboard
- Mobile apps (React Native)

## License

Private project - all rights reserved.
