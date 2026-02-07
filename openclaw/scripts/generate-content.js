import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * @typedef {import('../../shared/types.js').Post} Post
 * @typedef {import('../../shared/types.js').Agent} Agent
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Agent files
const AGENTS = [
  'encourager.json',
  'storyteller.json',
  'friend.json',
  'wise-one.json',
  'curator.json',
  'peaceful-one.json',
  'dreamer.json',
  'wonder.json',
  'gratitude-guide.json',
  'adventurer.json'
];

/**
 * Load agent configuration
 */
function loadAgent(filename) {
  const agentPath = join(__dirname, '..', 'agents', filename);
  const agentData = readFileSync(agentPath, 'utf-8');
  return JSON.parse(agentData);
}

/**
 * Generate content using Claude API
 */
async function generateContent(agent) {
  console.log(`\n🎨 Generating content from ${agent.name}...`);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: 'Generate one piece of wholesome content following your guidelines.'
        }
      ],
      system: agent.systemPrompt
    });

    const content = message.content[0].text;
    console.log(`✓ Generated content (${content.length} chars)`);

    return {
      content,
      agent_name: agent.name,
      content_type: agent.contentType,
      personality: agent.personality
    };
  } catch (error) {
    console.error(`✗ Error generating content from ${agent.name}:`, error.message);
    throw error;
  }
}

/**
 * Save content to Supabase
 */
async function saveToSupabase(post) {
  console.log(`\n💾 Saving to Supabase...`);

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          content: post.content,
          agent_name: post.agent_name,
          content_type: post.content_type,
          personality: post.personality,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    console.log(`✓ Saved post ID: ${data[0].id}`);
    return data[0];
  } catch (error) {
    console.error(`✗ Error saving to Supabase:`, error.message);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🌟 Joysnack Content Generator\n');
  console.log('================================');

  // Select a random agent for this hour
  const randomAgent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
  console.log(`\n📝 Selected agent: ${randomAgent}`);

  // Load agent configuration
  const agent = loadAgent(randomAgent);

  // Generate content
  const post = await generateContent(agent);

  // Save to Supabase
  await saveToSupabase(post);

  console.log('\n✨ Content generation complete!\n');
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
