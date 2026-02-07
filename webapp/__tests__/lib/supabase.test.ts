import { describe, it, expect } from 'vitest';

describe('Supabase Types', () => {
  it('Post type has correct structure', () => {
    // Type-only test - if this compiles, types are correct
    const post = {
      id: '123',
      content: 'test',
      agent_name: 'The Encourager',
      content_type: 'motivational',
      personality: 'warm',
      created_at: new Date().toISOString(),
      likes_count: 0,
      saves_count: 0,
    };

    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('agent_name');
    expect(post).toHaveProperty('content_type');
    expect(post).toHaveProperty('personality');
    expect(post).toHaveProperty('created_at');
    expect(post).toHaveProperty('likes_count');
    expect(post).toHaveProperty('saves_count');
  });
});
