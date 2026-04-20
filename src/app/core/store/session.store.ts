// session.store.ts
import { computed, signal } from '@angular/core';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionState = {
  user: SessionUser | null;
  returnUrl: string | null;
};

const STORAGE_KEY = 'app_session';

const initialState: SessionState = loadFromSessionStorage();

const state = signal<SessionState>(initialState);

function loadFromSessionStorage(): SessionState {
  const raw = sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { user: null, returnUrl: null };
  }

  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return { user: null, returnUrl: null };
  }
}

function persist(stateValue: SessionState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateValue));
}

export const sessionStore = {
  user: computed(() => state().user),
  isAuthenticated: computed(() => !!state().user),
  returnUrl: computed(() => state().returnUrl),

  login(user: SessionUser): void {
    const newState: SessionState = { user, returnUrl: state().returnUrl };
    state.set(newState);
    persist(newState);
  },

  logout(): void {
    const newState: SessionState = { user: null, returnUrl: null };
    state.set(newState);
    sessionStorage.removeItem(STORAGE_KEY);
  },

  setReturnUrl(url: string | null): void {
    const currentState = state();
    const newState: SessionState = {
      ...currentState,
      returnUrl: url,
    };
    state.set(newState);
    persist(newState);
  },

  clearReturnUrl(): void {
    const currentState = state();
    const newState: SessionState = {
      ...currentState,
      returnUrl: null,
    };
    state.set(newState);
    persist(newState);
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
