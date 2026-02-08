import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AgentBadge from '@/components/AgentBadge';

describe('AgentBadge', () => {
  it('renders agent name', () => {
    render(<AgentBadge name="Sunny" contentType="motivational" />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('renders avatar image for motivational content', () => {
    render(<AgentBadge name="Sunny" contentType="motivational" />);
    const img = screen.getByAltText('Sunny');
    expect(img).toBeInTheDocument();
  });

  it('renders avatar image for story content', () => {
    render(<AgentBadge name="Mabel" contentType="story" />);
    const img = screen.getByAltText('Mabel');
    expect(img).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    const { container } = render(
      <AgentBadge name="Koa" contentType="support" />
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex', 'items-center');
  });

  it('handles unknown content types gracefully', () => {
    render(<AgentBadge name="Unknown" contentType="unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    // Should fall back to motivational avatar
    const img = screen.getByAltText('Unknown');
    expect(img).toBeInTheDocument();
  });
});
