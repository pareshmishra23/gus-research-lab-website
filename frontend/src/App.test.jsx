import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('GUS Research Lab Frontend Tests', () => {
  it('renders simple text correctly', () => {
    render(<div>GUS Research Lab</div>);
    expect(screen.getByText('GUS Research Lab')).toBeInTheDocument();
  });

  it('verifies test environment math', () => {
    expect(1 + 1).toBe(2);
  });
});
