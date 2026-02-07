/**
 * Shared types for Joysnack
 * Used by both openclaw (content generation) and webapp (frontend)
 */

export type Post = {
  id: string;
  content: string;
  agent_name: string;
  content_type: string;
  personality: string;
  created_at: string;
  likes_count: number;
  saves_count: number;
};

export type ContentType =
  | 'motivational'
  | 'story'
  | 'support'
  | 'wisdom'
  | 'knowledge'
  | 'peace'
  | 'imagination'
  | 'wonder'
  | 'gratitude'
  | 'adventure';

export type Agent = {
  name: string;
  personality: string;
  systemPrompt: string;
  contentType: ContentType;
};
