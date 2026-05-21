---
name: angular-http-rxjs
description: Handle HTTP requests and async operations in Angular 21 using HttpClient and RxJS. Use when fetching data from APIs, managing async streams, or integrating with signal-based state.
---

# Angular HTTP & RxJS Integration

## Overview

Use HttpClient for API communication and RxJS for reactive streams. Combine with signals using `toSignal()` for a modern reactive experience.

## When to Use

- Fetching data from APIs
- Handling async operations
- Managing complex data flows
- Integrating with signal-based state
- Implementing caching and error handling

## HttpClient Basics

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = '/api/users';

  getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  createUser(user: Omit<User, 'id'>) {
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
```

## Converting Observables to Signals

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private userId = signal<string | null>(null);

  // Convert observable to signal
  user = toSignal(
    toObservable(this.userId).pipe(
      switchMap((id) => {
        if (!id) return of(null);
        return this.http.get<User>(`/api/users/${id}`);
      }),
      catchError(() => of(null)),
    ),
  );

  selectUser(id: string) {
    this.userId.set(id);
  }
}
```

## Using in Components

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    @if (users(); as userList) {
      <ul>
        @for (user of userList; track user.id) {
          <li (click)="selectUser(user.id)">{{ user.name }}</li>
        }
      </ul>
    } @else if (loading()) {
      <p>Loading...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private userService = inject(UserService);

  users = toSignal(this.userService.getUsers(), { initialValue: null });
  loading = signal(false);
  error = signal<string | null>(null);

  selectUser(id: string) {
    this.userService.selectUser(id);
  }
}
```

## Error Handling

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUser(id: string) {
    return this.http.get<User>(`/api/users/${id}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user', error);
        return throwError(() => new Error('User not found'));
      }),
    );
  }

  // In component
  user = toSignal(this.userService.getUser(userId).pipe(catchError(() => of(null))));
}
```

## RxJS Operators

### switchMap - Switch to new observable

```typescript
// When user ID changes, fetch new user data
user$ = this.userId$.pipe(
  switchMap((id) => this.http.get<User>(`/api/users/${id}`)),
  catchError(() => of(null)),
);
```

### map - Transform data

```typescript
users$ = this.http
  .get<User[]>('/api/users')
  .pipe(map((users) => users.sort((a, b) => a.name.localeCompare(b.name))));
```

### combineLatest - Combine multiple observables

```typescript
userProfile$ = combineLatest([this.user$, this.preferences$, this.settings$]).pipe(
  map(([user, prefs, settings]) => ({ user, prefs, settings })),
);
```

### debounceTime - Wait before emitting

```typescript
searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  switchMap((term) => this.http.get(`/api/search?q=${term}`)),
);
```

## Caching

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<User>>();

  getUser(id: string): Observable<User> {
    if (!this.cache.has(id)) {
      const user$ = this.http.get<User>(`/api/users/${id}`).pipe(
        shareReplay(1), // Cache the result
      );
      this.cache.set(id, user$);
    }
    return this.cache.get(id)!;
  }

  clearCache() {
    this.cache.clear();
  }
}
```

## Retry Logic

```typescript
getUser(id: string) {
  return this.http.get<User>(`/api/users/${id}`).pipe(
    retry({
      count: 3,
      delay: 1000,
    }),
    catchError(error => {
      console.error('Failed after retries', error);
      return throwError(() => error);
    })
  );
}
```

## HTTP Interceptors

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq);
};

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
};
```

## Best Practices

- Use `toSignal()` to integrate observables with signals
- Always handle errors with `catchError()`
- Use `shareReplay()` for multicast subscriptions
- Implement caching for frequently-accessed data
- Use `debounceTime()` for search/filter inputs
- Use `switchMap()` for dependent API calls
- Clean up subscriptions (signals do this automatically)

## Red Flags

- ✗ Unhandled observable errors
- ✗ Forgetting to unsubscribe (use signals instead)
- ✗ Multiple HTTP calls when one suffices
- ✗ No caching for repeated requests
- ✗ Missing retry logic for critical endpoints

## Verification

- [ ] All HTTP calls have error handling
- [ ] Data is cached when appropriate
- [ ] Signals used to manage async state
- [ ] No memory leaks from subscriptions
- [ ] Interceptors handle auth/errors
- [ ] Tests mock HttpClient
