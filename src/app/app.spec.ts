import { describe, it, expect } from 'vitest';
import { App } from './app';

describe('App (Vitest)', () => {
  it('creates the app and exposes title signal', () => {
    const component = new App();
    expect(component).toBeTruthy();
    expect(component.title()).toBe('ng-21');
  });
});
