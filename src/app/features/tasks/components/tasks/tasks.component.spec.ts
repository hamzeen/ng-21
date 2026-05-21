import { render, screen } from '@testing-library/angular';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TasksComponent } from './tasks.component';
import { sessionStore } from '../../../../core/store/session.store';

describe('TasksComponent (Vitest)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates and shows initial todos and computed counts', () => {
    const component = new TasksComponent();

    // initial values from DEFAULT_TODOS
    expect(component.todos().length).toBe(2);
    expect(component.totalCount()).toBe(2);
    expect(component.completedCount()).toBe(1);
    expect(component.pendingCount()).toBe(1);
  });

  it('addTodo adds a trimmed todo and calls sessionStore.updateUserName', () => {
    const updateSpy = vi.spyOn(sessionStore, 'updateUserName');
    const component = new TasksComponent();

    component.addTodo('  new task  ');

    expect(component.todos().length).toBe(3);
    expect(component.todos()[2].text).toBe('new task');
    expect(updateSpy).toHaveBeenCalledWith('Hamzeen');
  });

  it('toggleTodo toggles completed flag', () => {
    const component = new TasksComponent();

    const before = component.todos()[0].completed;
    component.toggleTodo(0);
    expect(component.todos()[0].completed).toBe(!before);
  });

  it('removeTodo removes the correct item', () => {
    const component = new TasksComponent();

    const initialLen = component.todos().length;
    component.removeTodo(0);
    expect(component.todos().length).toBe(initialLen - 1);
  });
});
