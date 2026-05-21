---
name: angular-routing-lazy-loading
description: Implement Angular 21 routing with lazy loading and route guards. Use when setting up navigation, protecting routes, or optimizing bundle size with feature module lazy loading.
---

# Angular Routing & Lazy Loading

## Overview

Configure functional routing in `app.routes.ts`, implement lazy loading to split code by feature, and use functional guards to protect routes. Lazy loading is essential for performance on large applications.

## When to Use

- Setting up application routing
- Creating feature routes
- Protecting routes with authentication
- Optimizing bundle size with lazy loading
- Implementing route guards

## Route Configuration

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'recipes',
    loadChildren: () => import('./features/recipes/recipes.routes').then((m) => m.RECIPE_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
```

## Functional Route Guards

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

// Simple authentication guard
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Role-based guard
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  const userRoles = authService.getUserRoles();

  if (requiredRoles.some((role) => userRoles.includes(role))) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
```

## Lazy Loading Patterns

### Component Lazy Loading

```typescript
// Load component on-demand
{
  path: 'heavy-feature',
  loadComponent: () =>
    import('./features/heavy/heavy.component').then(m => m.HeavyComponent),
}
```

### Feature Module Lazy Loading

```typescript
// Load entire feature with children
{
  path: 'admin',
  loadChildren: () =>
    import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  canActivate: [adminGuard],
}
```

### Feature Routes File

```typescript
// src/features/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then((m) => m.SettingsComponent),
      },
    ],
  },
];
```

## App Configuration

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // other providers
  ],
};
```

## Best Practices

- Lazy load feature modules to reduce initial bundle size
- Use functional guards for route protection
- Always include 404 wildcard route at end
- Keep route configuration flat or minimal nesting
- Use feature route files for organization
- Protect sensitive routes with guards

## Red Flags

- ✗ Eager loading all routes
- ✗ Class-based guards (use functional)
- ✗ No route guards on sensitive pages
- ✗ Missing wildcard route
- ✗ Route configuration mixed in app component

## Verification

- [ ] Routes defined in `app.routes.ts`
- [ ] Feature routes use lazy loading
- [ ] Route guards implemented with `CanActivateFn`
- [ ] 404 wildcard route at end
- [ ] Bundle size reduced with lazy loading
- [ ] Tests verify guard behavior
