import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BuilderPage from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
});

describe('BuilderPage', () => {
  it('shows cards when a set is clicked', () => {
    render(<BuilderPage />);
    fireEvent.click(screen.getByText('warrior'));
    expect(screen.getByText('Knights')).toBeInTheDocument();
  });

  it('adds a card to slots when clicked', () => {
    render(<BuilderPage />);
    fireEvent.click(screen.getByText('warrior'));
    fireEvent.click(screen.getByText('Knights'));
    expect(screen.getByAltText('Knights')).toBeInTheDocument();
  });

  it('does not add duplicate card', () => {
    render(<BuilderPage />);
    fireEvent.click(screen.getByText('warrior'));
    const knightsButton = screen.getAllByText('Knights')[0];
    fireEvent.click(knightsButton);
    fireEvent.click(knightsButton);
    expect(screen.getAllByAltText('Knights')).toHaveLength(1);
  });

  it('removes a card when X is clicked', () => {
    render(<BuilderPage />);
    fireEvent.click(screen.getByText('warrior'));
    fireEvent.click(screen.getByText('Knights'));
    fireEvent.click(screen.getByText('✕'));
    expect(screen.queryByAltText('Knights')).not.toBeInTheDocument();
  });
});