import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  'adventurer.json',
  'unhinged-optimist.json',
  'shower-thought.json',
  'hype-beast.json',
  'dad-joker.json',
  'conspiracy-buddy.json',
];

describe('Agent Configuration', () => {
  AGENTS.forEach((agentFile) => {
    describe(agentFile, () => {
      it('should be valid JSON', () => {
        const agentPath = join(__dirname, '..', 'agents', agentFile);
        expect(() => {
          JSON.parse(readFileSync(agentPath, 'utf-8'));
        }).not.toThrow();
      });

      it('should have required fields', () => {
        const agentPath = join(__dirname, '..', 'agents', agentFile);
        const agent = JSON.parse(readFileSync(agentPath, 'utf-8'));

        expect(agent).toHaveProperty('name');
        expect(agent).toHaveProperty('personality');
        expect(agent).toHaveProperty('systemPrompt');
        expect(agent).toHaveProperty('contentType');
      });

      it('should have non-empty fields', () => {
        const agentPath = join(__dirname, '..', 'agents', agentFile);
        const agent = JSON.parse(readFileSync(agentPath, 'utf-8'));

        expect(agent.name).toBeTruthy();
        expect(agent.personality).toBeTruthy();
        expect(agent.systemPrompt).toBeTruthy();
        expect(agent.contentType).toBeTruthy();
      });

      it('should have a reasonable system prompt length', () => {
        const agentPath = join(__dirname, '..', 'agents', agentFile);
        const agent = JSON.parse(readFileSync(agentPath, 'utf-8'));

        expect(agent.systemPrompt.length).toBeGreaterThan(100);
        expect(agent.systemPrompt.length).toBeLessThan(2000);
      });
    });
  });

  it('should have exactly 15 agents', () => {
    expect(AGENTS).toHaveLength(15);
  });

  it('should have unique agent names', () => {
    const names = AGENTS.map((agentFile) => {
      const agentPath = join(__dirname, '..', 'agents', agentFile);
      const agent = JSON.parse(readFileSync(agentPath, 'utf-8'));
      return agent.name;
    });

    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('should have unique content types', () => {
    const contentTypes = AGENTS.map((agentFile) => {
      const agentPath = join(__dirname, '..', 'agents', agentFile);
      const agent = JSON.parse(readFileSync(agentPath, 'utf-8'));
      return agent.contentType;
    });

    const uniqueTypes = new Set(contentTypes);
    expect(uniqueTypes.size).toBe(contentTypes.length);
  });
});
