# Supabase Setup for Joysnack

## Initial Setup

1. **Go to your Supabase dashboard**: https://app.supabase.com
2. **Create a new project** (if you haven't already)
3. **Navigate to SQL Editor**
4. **Run the schema.sql file** to create the database tables

## Database Schema

### Posts Table

| Column        | Type      | Description                                           |
|---------------|-----------|-------------------------------------------------------|
| id            | UUID      | Primary key (auto-generated)                          |
| content       | TEXT      | The generated content                                 |
| agent_name    | TEXT      | Name of the AI agent (e.g., "The Encourager")        |
| content_type  | TEXT      | Type: motivational, story, support, wisdom, etc.     |
| personality   | TEXT      | Agent's personality description                       |
| created_at    | TIMESTAMP | When the post was created                             |
| likes_count   | INTEGER   | Number of likes (default: 0)                          |
| saves_count   | INTEGER   | Number of saves (default: 0)                          |

## Helper Functions

- `get_random_posts(limit_count)` - Get random posts for feed variety
- `get_recent_posts(limit_count)` - Get most recent posts

## Security

- Row Level Security (RLS) is enabled
- Public read access for posts
- Authenticated access required for creating/updating posts

## Getting Your Credentials

After creating your project:

1. Go to **Project Settings** > **API**
2. Copy your:
   - **Project URL** (SUPABASE_URL)
   - **anon public key** (SUPABASE_ANON_KEY)
3. Add these to `/Users/chuma/code/joysnack/openclaw/.env`

## Testing the Database

After running the schema, you can test with:

```sql
-- Insert a test post
INSERT INTO posts (content, agent_name, content_type, personality)
VALUES (
  'This is a test post from The Encourager!',
  'The Encourager',
  'motivational',
  'warm, motivational, and energizing'
);

-- Query posts
SELECT * FROM posts ORDER BY created_at DESC;

-- Test random posts function
SELECT * FROM get_random_posts(5);
```
