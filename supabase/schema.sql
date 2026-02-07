-- Joysnack Database Schema
-- Run this in your Supabase SQL Editor

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  personality TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);

-- Create index on agent_name for filtering
CREATE INDEX IF NOT EXISTS posts_agent_name_idx ON posts(agent_name);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public posts are viewable by everyone"
  ON posts
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated inserts (for content generation)
CREATE POLICY "Authenticated users can insert posts"
  ON posts
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated updates (for likes/saves)
CREATE POLICY "Authenticated users can update posts"
  ON posts
  FOR UPDATE
  USING (true);

-- Optional: Create a function to get random posts
CREATE OR REPLACE FUNCTION get_random_posts(limit_count INTEGER DEFAULT 10)
RETURNS SETOF posts AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM posts
  ORDER BY RANDOM()
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a function to get recent posts
CREATE OR REPLACE FUNCTION get_recent_posts(limit_count INTEGER DEFAULT 20)
RETURNS SETOF posts AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM posts
  ORDER BY created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE posts IS 'Stores AI-generated wholesome content from various agent personalities';
COMMENT ON COLUMN posts.content IS 'The actual generated content text';
COMMENT ON COLUMN posts.agent_name IS 'Name of the AI agent that generated this content';
COMMENT ON COLUMN posts.content_type IS 'Type of content (motivational, story, support, wisdom, gossip, humor, knowledge, peace)';
COMMENT ON COLUMN posts.personality IS 'Personality description of the agent';
COMMENT ON COLUMN posts.likes_count IS 'Number of likes/hearts received';
COMMENT ON COLUMN posts.saves_count IS 'Number of times saved by users';
