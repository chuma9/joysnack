import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
 * Test content generation
 */
async function testAgent(agent) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎭 Testing: ${agent.name}`);
  console.log(`Personality: ${agent.personality}`);
  console.log(`Content Type: ${agent.contentType}`);
  console.log(`${'='.repeat(60)}\n`);

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
    console.log('📝 Generated Content:\n');
    console.log(content);
    console.log('\n✓ Success!\n');

  } catch (error) {
    console.error(`✗ Error:`, error.message);
  }
}

/**
 * Main function - test all agents
 */
async function main() {
  console.log('\n🌟 Joysnack Agent Testing\n');
  console.log('Testing all 4 agents...\n');

  for (const agentFile of AGENTS) {
    const agent = loadAgent(agentFile);
    await testAgent(agent);

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✨ All agents tested!\n');
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
