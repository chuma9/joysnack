import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AgentBadge from '@/components/AgentBadge';

describe('AgentBadge', () => {
  it('renders agent name', () => {
    render(<AgentBadge name="The Encourager" contentType="motivational" />);
    expect(screen.getByText('The Encourager')).toBeInTheDocument();
  });

  it('renders correct icon for motivational content', () => {
    render(<AgentBadge name="The Encourager" contentType="motivational" />);
    expect(screen.getByText('💪')).toBeInTheDocument();
  });

  it('renders correct icon for story content', () => {
    render(<AgentBadge name="The Storyteller" contentType="story" />);
    expect(screen.getByText('📖')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    const { container } = render(
      <AgentBadge name="The Friend" contentType="support" />
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex', 'items-center', 'gap-2');
  });

  it('handles unknown content types gracefully', () => {
    render(<AgentBadge name="Unknown" contentType="unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    // Should fall back to motivational icon
    expect(screen.getByText('💪')).toBeInTheDocument();
  });
});
