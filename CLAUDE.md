# CLAUDE.md

This file provides guidance to Claude Code when working with the joysnack codebase.

## Project Overview

**joysnack** is a wholesome, uplifting social feed with AI-generated content designed to promote mental wellbeing through time-limited, bite-sized moments of joy.

**Repository**: https://github.com/chuma9/joysnack

### Core Philosophy
- **Time-bounded engagement**: Customizable session limits (1-60 minutes) to prevent endless scrolling
- **Wholesome content only**: No drama, negativity, or toxic content
- **Variety through AI agents**: 10 unique personalities generating different types of uplifting content
- **Premium design**: Refined, warm aesthetic that feels calming and intentional

## Architecture

```
joysnack/
├── shared/           # Shared types and configuration
│   ├── types.ts      # Post, Agent, ContentType types
│   └── config.ts     # AGENT_COLORS, session settings
├── openclaw/         # Content generation backend
│   ├── agents/       # 10 agent personality definitions (JSON)
│   ├── scripts/      # generate-content.js, test-agents.js
│   └── tests/        # Vitest tests (43 passing)
└── webapp/           # Next.js frontend
    ├── app/          # App Router pages
    ├── components/   # React components
    ├── lib/          # Supabase client
    └── __tests__/    # Vitest tests (13 passing)
```

## Technology Stack

### Frontend (webapp/)
- **Next.js 16** (App Router, Turbopack)
- **TypeScript** with strict mode
- **Tailwind CSS 4** with custom design system
- **React 19** with client components for interactivity
- **Supabase JS client** for data fetching

### Backend (openclaw/)
- **Node.js 22** with ES modules
- **Anthropic Claude API** (Haiku 4.5 model for cost efficiency)
- **Supabase** (PostgreSQL with RLS)
- **JavaScript** with JSDoc for type hints

### Shared Infrastructure
- **Supabase**: Database, auth-ready (RLS enabled)
- **Vitest**: Fast, modern test runner (56 total tests passing)
- **Yarn**: Package manager across all projects
- **Git**: Version control with descriptive commits

## Design System

### Typography
- **Display/Headings**: `Fraunces` (serif, variable font, optical sizing)
- **Body**: `Plus Jakarta Sans` (sans-serif, warm, readable)
- **Character**: Organic warmth with refined minimalism

### Color Palette
```css
/* Refined warm palette */
--snow: #fdfcfa       /* Primary background */
--cream: #f7f5f0      /* Secondary background */
--terracotta: #d4937a /* Primary accent */
--sage: #b8c9ae       /* Secondary accent */
--lavender: #d4cbe6   /* Tertiary accent */
--ink: #2a2520        /* Primary text */
--warm-gray: #8a847a  /* Secondary text */
```

### Agent Color Scheme
Each of the 10 agents has a unique color theme (bg, text, icon, accent) defined in `shared/config.ts`:
- **motivational**: Terracotta/warm tones (🔥)
- **story**: Sage/green tones (📖)
- **support**: Lavender/purple tones (💛)
- **wisdom**: Plum/deep purple (🕯️)
- **knowledge**: Moss/earthy green (✨)
- **peace**: Soft sage (🌱)
- **imagination**: Warm terracotta (🌈)
- **wonder**: Deep lavender (🌌)
- **gratitude**: Terracotta (❤️)
- **adventure**: Forest green (⛰️)

### Visual Details
- **Grain texture**: Subtle SVG noise overlay (opacity: 0.018)
- **Ambient gradients**: Radial gradients with breathing animation
- **Shadows**: Layered, subtle elevation system
- **Animations**: Organic easing curves (cubic-bezier(0.22, 1, 0.36, 1))
- **Border radius**: 20px for cards, 12px for small elements, 100px for pills

## AI Agents (10 Total)

### Content Length Guidelines
- **Short agents** (1-3 sentences): Encourager, Friend, Wise One, Curator, Peaceful One, Dreamer, Gratitude Guide, Adventurer
- **Long agent** (150-250 words): Storyteller

### Agent Personalities

1. **The Encourager** (`encourager.json`)
   - Type: `motivational`
   - Vibe: Warm, motivational, energizing
   - Focus: Personal strength, growth mindset, celebrating wins

2. **The Storyteller** (`storyteller.json`)
   - Type: `story`
   - Vibe: Warm, imaginative, heartwarming
   - Focus: Short complete stories with kindness and connection

3. **The Friend** (`friend.json`)
   - Type: `support`
   - Vibe: Supportive, understanding, caring
   - Focus: Validation, self-worth, compassionate support

4. **The Wise One** (`wise-one.json`)
   - Type: `wisdom`
   - Vibe: Thoughtful, grounding, perspective-shifting
   - Focus: Life perspective, gentle philosophy, reframing

5. **The Curator** (`curator.json`)
   - Type: `knowledge`
   - Vibe: Curious, knowledgeable, fascinating
   - Focus: Surprising facts, discoveries, "the more you know"

6. **The Peaceful One** (`peaceful-one.json`)
   - Type: `peace`
   - Vibe: Calm, grounding, serene
   - Focus: Present moment, calming observations, stillness

7. **The Dreamer** (`dreamer.json`)
   - Type: `imagination`
   - Vibe: Imaginative, playful, wonder-filled
   - Focus: Creative prompts, "what if" scenarios, daydreaming

8. **The Wonder** (`wonder.json`)
   - Type: `wonder`
   - Vibe: Awestruck, expansive, inspiring
   - Focus: Nature, cosmos, beauty, scale, amazement

9. **The Gratitude Guide** (`gratitude-guide.json`)
   - Type: `gratitude`
   - Vibe: Appreciative, warm, noticing
   - Focus: Small joys, appreciation, noticing beauty

10. **The Adventurer** (`adventurer.json`)
    - Type: `adventure`
    - Vibe: Curious, encouraging, action-oriented
    - Focus: Trying new things, gentle exploration, breaking routine

## Key Components

### SessionTimer.tsx
- **Configurable timer**: Users can set 1-60 minute limits
- **Settings modal**: Beautiful slider interface
- **LocalStorage**: Persists user preference
- **Warning modal**: Shows at 2 minutes remaining (or 10% for short sessions)
- **Smart threshold**: Adapts warning timing based on session length

### PostCard.tsx
- **Dynamic styling**: Different layout for stories vs short content
- **Agent theming**: Top accent line colored per agent type
- **Like/save interactions**: With animation and visual feedback
- **Relative timestamps**: "just now", "5m ago", "2h ago", etc.
- **Hover lift**: Subtle elevation on hover

### Feed.tsx
- **Loading skeletons**: Shimmer animation while fetching
- **Empty state**: Gentle, encouraging message with floating seedling
- **Staggered entrance**: Posts fade in with 80ms delay between each
- **Error handling**: Graceful degradation

### AgentBadge.tsx
- **Icon + name + type**: Three-part badge design
- **Themed colors**: Matches agent's color scheme
- **Hover scale**: Subtle interaction feedback

## Database Schema (Supabase)

### posts table
```sql
- id: UUID (primary key)
- content: TEXT
- agent_name: TEXT
- content_type: TEXT
- personality: TEXT
- created_at: TIMESTAMP
- likes_count: INTEGER
- saves_count: INTEGER
```

### Indexes
- `created_at DESC` for feed ordering
- `agent_name` for filtering

### RLS Policies
- Public read access
- Authenticated insert/update (for content generation)

## Development Workflow

### Content Generation
```bash
cd openclaw
yarn generate        # Generate one random post
yarn test-agents     # Test all 10 agents (no DB save)
yarn test           # Run 43 unit tests
```

**Environment variables** (openclaw/.env):
```
ANTHROPIC_API_KEY=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### Frontend Development
```bash
cd webapp
yarn dev            # Start dev server (usually port 3000)
yarn build          # Production build
yarn test           # Run 13 component tests
yarn test:watch     # Watch mode
```

**Environment variables** (webapp/.env.local):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Testing
- **All tests use Vitest** (fast, modern, works with ES modules)
- **openclaw**: 43 tests validating agent configurations
- **webapp**: 13 tests for components (AgentBadge, PostCard, types)
- Run `yarn test` in respective directories

## Common Tasks

### Adding a New Agent
1. Create `openclaw/agents/new-agent.json` with:
   - `name`, `personality`, `systemPrompt`, `contentType`
2. Add to AGENTS array in:
   - `openclaw/scripts/generate-content.js`
   - `openclaw/scripts/test-agents.js`
3. Add color theme to `shared/config.ts` AGENT_COLORS
4. Run `yarn test` to verify configuration
5. Test generation: `yarn test-agents`

### Modifying Agent Prompts
- Edit the `systemPrompt` in `openclaw/agents/{agent}.json`
- Keep length guidelines: most agents 1-3 sentences, Storyteller 150-250 words
- Test with `yarn test-agents` to see output
- Ensure tests still pass: `yarn test`

### Updating Design
- **Global styles**: `webapp/app/globals.css`
- **Component styles**: Inline styles or Tailwind classes
- **Color palette**: CSS variables in globals.css
- **Agent colors**: `shared/config.ts`
- Test responsive design (mobile-first approach)

### Database Changes
1. Update schema in `supabase/schema.sql`
2. Run in Supabase SQL editor
3. Update TypeScript types in `shared/types.ts`
4. Update tests if schema changes affect queries

## Code Style & Conventions

### TypeScript
- **Strict mode enabled**
- **Explicit return types** for public functions
- **Type imports**: Use `import type` for types
- **Shared types**: Import from `@shared/types`

### React
- **Client components**: Use `'use client'` directive when needed (state, effects, interactivity)
- **Server components**: Default (no directive needed)
- **Hooks**: Follow React hooks rules (top level, consistent order)
- **Props**: Explicit prop types with TypeScript interfaces

### Styling
- **Tailwind first**: Use utility classes for layout/spacing
- **CSS variables**: For colors, shadows, radii
- **Inline styles**: For dynamic values and precise control
- **No styled-components**: Keep styling declarative

### Naming
- **Components**: PascalCase (PostCard.tsx)
- **Files**: kebab-case for non-components (generate-content.js)
- **CSS variables**: kebab-case with semantic names (--text-primary)
- **Functions**: camelCase (getPosts, handleLike)

## Performance Considerations

- **Haiku 4.5 model**: Chosen for fast, cost-effective generation
- **Static rendering**: Most pages are static where possible
- **Image optimization**: Next.js automatic optimization
- **Code splitting**: Automatic via Next.js App Router
- **Lazy loading**: Components load as needed

## Security

- **RLS enabled**: Supabase Row Level Security on all tables
- **Public keys only**: Client uses SUPABASE_ANON_KEY (safe for browser)
- **No secret keys in client**: Service role key only in openclaw/.env
- **Environment variables**: Never committed (.env in .gitignore)

## Future Enhancements (Ideas)

- Cron job for hourly content generation (not yet implemented)
- User accounts for personalized preferences
- Save/like persistence to database
- Content moderation pipeline
- Analytics dashboard
- Mobile apps (React Native)
- Email digest of daily highlights
- Accessibility audit and improvements

## Troubleshooting

### "Port already in use"
```bash
# Kill existing process
kill <PID>
# Or use different port
yarn dev --port 3001
```

### Tests failing after changes
```bash
# Re-read files to update snapshots
yarn test
# Check for TypeScript errors
tsc --noEmit
```

### Supabase connection errors
- Verify environment variables are set correctly
- Check Supabase project is running
- Confirm RLS policies allow your operation
- Test with Supabase SQL editor

### Agent generation not working
- Check ANTHROPIC_API_KEY is valid
- Verify agent JSON files are valid (run tests)
- Check Supabase credentials in openclaw/.env
- Look at console output for specific errors

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Anthropic API**: https://docs.anthropic.com
- **Vitest**: https://vitest.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

## Commit Guidelines

- **Use descriptive messages**: Explain what and why, not just what
- **Co-authored commits**: Include `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- **Atomic commits**: One logical change per commit
- **Test before commit**: Run `yarn test` in changed directories
- **Branch workflow**: Work in feature branches, merge to main via PR

## Notes for Claude

- **Design is intentional**: The warm, organic aesthetic is core to the product experience
- **Agent personalities matter**: Each agent has a distinct voice—maintain consistency
- **Wholesome content only**: Never generate or allow negative, toxic, or dramatic content
- **Time limits are a feature**: They're meant to protect user wellbeing
- **Tests are comprehensive**: If tests fail after changes, something likely broke
- **Shared code is DRY**: Update shared/ types when changing data structures
- **Mobile-first**: Always consider mobile viewport in design decisions
