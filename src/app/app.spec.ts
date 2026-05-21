import { render, screen } from '@testing-library/angular';
import { describe, it, expect } from 'vitest';
import { App } from './app';

describe('App (Vitest)', () => {
  it('creates the app and renders header', async () => {
    await render(App);
    const h1 = screen.queryByRole('heading', { level: 1 });
    expect(h1).toBeTruthy();
  });
});
