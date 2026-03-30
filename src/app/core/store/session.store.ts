// session.store.ts
import { computed, signal } from '@angular/core';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionState = {
  user: SessionUser | null;
};

const STORAGE_KEY = 'app_session';

const initialState: SessionState = loadFromSessionStorage();

const state = signal<SessionState>(initialState);

function loadFromSessionStorage(): SessionState {
  const raw = sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { user: null };
  }

  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return { user: null };
  }
}

function persist(stateValue: SessionState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateValue));
}

export const sessionStore = {
  user: computed(() => state().user),
  isAuthenticated: computed(() => !!state().user),

  login(user: SessionUser): void {
    const newState: SessionState = { user };
    state.set(newState);
    persist(newState);
  },

  logout(): void {
    const newState: SessionState = { user: null };
    state.set(newState);
    sessionStorage.removeItem(STORAGE_KEY);
  },

  updateUserName(name: string): void {
    const currentState = state();
    const currentUser = currentState.user;

    if (!currentUser) {
      return;
    }

    const newState: SessionState = {
      ...currentState,
      user: {
        ...currentUser,
        name,
      },
    };

    state.set(newState);
    persist(newState);
  },
};
