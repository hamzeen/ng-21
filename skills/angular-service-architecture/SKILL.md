---
name: angular-service-architecture
description: Design Angular 21 services with providedIn root, inject() dependency injection, and signal-based state management. Use when creating services, managing dependencies, or handling shared logic.
---

# Angular Service Architecture

## Overview

Design singleton services using `providedIn: 'root'`, inject dependency injection, and signals for reactive state management. Services should have a single, clear responsibility.

## When to Use

- Creating new services
- Implementing shared business logic
- Managing API communication
- Handling global application state

## Service Structure

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Inject dependencies using inject()
  private http = inject(HttpClient);
  private baseUrl = '/api/users';

  // Signal-based state
  selectedUserId = signal<string | null>(null);
  users = signal<User[]>([]);
  isLoading = signal(false);

  // Computed derived state
  selectedUser = computed(() => {
    const id = this.selectedUserId();
    return this.users().find((u) => u.id === id);
  });

  // Public methods
  getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserSignal(id: string) {
    return toSignal(this.getUser(id));
  }

  setSelectedUser(id: string) {
    this.selectedUserId.set(id);
  }
}
```

## Key Practices

### Use `providedIn: 'root'` for Singletons

```typescript
// ✓ Good - automatically provided at root level
@Injectable({ providedIn: 'root' })
export class MyService {}

// ✗ Avoid - manual provider configuration
@Injectable()
export class MyService {}
// then in module: providers: [MyService]
```

### Use `inject()` for Dependency Injection

```typescript
// ✓ Modern - use inject()
@Injectable({ providedIn: 'root' })
export class MyService {
  private http = inject(HttpClient);
  private config = inject(AppConfig);
}

// ✗ Avoid - constructor injection
@Injectable()
export class MyService {
  constructor(private http: HttpClient) {}
}
```

### Design for Single Responsibility

```typescript
// ✓ Good - focused responsibility
@Injectable({ providedIn: 'root' })
export class UserService {
  // Only user-related operations
  getUser(id: string) {}
  updateUser(user: User) {}
}

// ✗ Bad - too many responsibilities
@Injectable({ providedIn: 'root' })
export class AppService {
  // Users, tasks, settings, auth, API, logging...
}
```

### Use Signals for Reactive State

```typescript
@Injectable({ providedIn: 'root' })
export class UserStore {
  private users = signal<User[]>([]);
  private selectedId = signal<string | null>(null);

  // Expose as read-only
  users$ = computed(() => this.users());
  selected$ = computed(() => {
    const id = this.selectedId();
    return this.users().find((u) => u.id === id);
  });

  setUsers(users: User[]) {
    this.users.set(users);
  }

  selectUser(id: string) {
    this.selectedId.set(id);
  }
}
```

## Red Flags

- ✗ Services injected in constructors instead of `inject()`
- ✗ `providedIn` not specified (creates manual dependency)
- ✗ Multiple unrelated responsibilities in one service
- ✗ Exposing internal signals directly (should be computed)
- ✗ Mixing RxJS and Signals without clear strategy

## Verification

- [ ] Service uses `providedIn: 'root'`
- [ ] Dependencies use `inject()` function
- [ ] Service has single, clear responsibility
- [ ] State is managed with signals
- [ ] Exposed values are computed or read-only
- [ ] Public API is documented
- [ ] Tests exist
