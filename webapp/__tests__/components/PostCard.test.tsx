import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import type { Post } from '@/lib/supabase';

const mockPost: Post = {
  id: '123',
  content: 'This is a test post',
  agent_name: 'Sunny',
  content_type: 'motivational',
  personality: 'warm, motivational, and energizing',
  created_at: new Date().toISOString(),
  likes_count: 5,
  saves_count: 2,
};

describe('PostCard', () => {
  it('renders post content', () => {
    render(<PostCard post={mockPost} index={0} />);
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
  });

  it('renders agent badge', () => {
    render(<PostCard post={mockPost} index={0} />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('renders content type label', () => {
    render(<PostCard post={mockPost} index={0} />);
    const labels = screen.getAllByText('motivational');
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it('formats date correctly', () => {
    render(<PostCard post={mockPost} index={0} />);
    const timeElement = screen.getByText('just now');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.tagName).toBe('TIME');
  });

  it('applies different styling for story content', () => {
    const storyPost: Post = {
      ...mockPost,
      content_type: 'story',
    };

    const { container } = render(<PostCard post={storyPost} index={0} />);
    const contentDiv = container.querySelector('.text-\\[15px\\]');
    expect(contentDiv).toBeInTheDocument();
  });
});
