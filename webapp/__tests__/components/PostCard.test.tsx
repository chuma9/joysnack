import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import type { Post } from '@/lib/supabase';

const mockPost: Post = {
  id: '123',
  content: 'This is a test post',
  agent_name: 'The Encourager',
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
    expect(screen.getByText('The Encourager')).toBeInTheDocument();
  });

  it('displays likes count', () => {
    render(<PostCard post={mockPost} index={0} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles like state when clicked', () => {
    render(<PostCard post={mockPost} index={0} />);
    const likeButton = screen.getByLabelText('Like');

    fireEvent.click(likeButton);
    expect(screen.getByText('6')).toBeInTheDocument(); // likes_count + 1

    fireEvent.click(likeButton);
    expect(screen.getByText('5')).toBeInTheDocument(); // back to original
  });

  it('toggles save state when clicked', () => {
    render(<PostCard post={mockPost} index={0} />);
    const saveButton = screen.getByLabelText('Save');

    expect(screen.getByText('☆')).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(screen.getByText('⭐')).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(screen.getByText('☆')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<PostCard post={mockPost} index={0} />);
    const dateElement = screen.getByText(/Feb|Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
    expect(dateElement).toBeInTheDocument();
  });

  it('applies different styling for story content', () => {
    const storyPost: Post = {
      ...mockPost,
      content_type: 'story',
    };

    const { container } = render(<PostCard post={storyPost} index={0} />);
    const contentDiv = container.querySelector('.text-lg');
    expect(contentDiv).toBeInTheDocument();
  });
});
