# OpenClaw Configuration for Joysnack

This directory contains the OpenClaw configuration for generating wholesome content.

## Agents

We have 10 agent personas, each with a unique personality:

1. **The Encourager** (`encourager.json`) - Motivational quotes and affirmations
2. **The Storyteller** (`storyteller.json`) - Short, heartwarming stories
3. **The Friend** (`friend.json`) - Personal encouragement and support
4. **The Wise One** (`wise-one.json`) - Life wisdom and perspective
5. **The Curator** (`curator.json`) - Fascinating facts and discoveries
6. **The Peaceful One** (`peaceful-one.json`) - Calming thoughts and grounding moments
7. **The Dreamer** (`dreamer.json`) - Creative prompts and imagination sparks
8. **The Wonder** (`wonder.json`) - Awe-inspiring moments about nature and universe
9. **The Gratitude Guide** (`gratitude-guide.json`) - Prompts to notice and appreciate small joys
10. **The Adventurer** (`adventurer.json`) - Gentle nudges to explore and try new things

## Content Generation

- Content is generated hourly via cron
- Each agent takes turns creating posts
- Posts are stored in Supabase for the webapp to display

## Setup

1. Install dependencies: `yarn install`
2. Set up API keys (Anthropic Claude)
3. Configure Supabase connection
4. Test agents: `yarn test-agents`
5. Run the content generator: `yarn generate`

## Environment Variables

Create a `.env` file in this directory:

```
ANTHROPIC_API_KEY=your_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```
