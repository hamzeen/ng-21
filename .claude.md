# Claude Angular Workspace Configuration

This file contains Angular-specific instructions and best practices for Claude AI when working in this workspace.

## Project Context

- **Framework**: Angular 21 (Latest)
- **Language**: TypeScript (strict mode)
- **Architecture**: Standalone components (default in Angular 20+)
- **State Management**: Signals
- **Styling**: CSS (no preprocessor)
- **Project Name**: ng-21

## Angular 21 Coding Standards

### TypeScript Best Practices

- Always use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Use `input()` and `output()` functions instead of decorators
- Use `inject()` function for dependency injection

### Component Development

#### Structure

```typescript
import { Component, input, output, computed, signal } from '@angular/core';

@Component({
  selector: 'app-component-name',
  template: `<div>{{ message }}</div>`,
  styles: `
    /* inline styles */
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  // Use input() function instead of @Input
  name = input<string>('');

  // Use output() function instead of @Output
  clicked = output<void>();

  // Use signal for state
  counter = signal(0);

  // Use computed for derived state
  doubled = computed(() => this.counter() * 2);
}
```

#### Template Guidelines

- Use native control flow: `@if`, `@for`, `@switch` (NOT `*ngIf`, `*ngFor`, `*ngSwitch`)
- Use class bindings instead of `ngClass`: `[class.active]="isActive"`
- Use style bindings instead of `ngStyle`: `[style.color]="textColor"`
- NO arrow functions in templates
- Use async pipe for observables

#### Change Detection

- ALWAYS set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use signals for state updates (signals work perfectly with OnPush)

### Services

```typescript
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyService {
  private http = inject(HttpClient);
}
```

- Design services around single responsibility
- Use `providedIn: 'root'` for singleton services
- Use `inject()` instead of constructor injection
- Keep state transformations pure

### State Management with Signals

```typescript
// Local state
count = signal(0);

// Derived state
doubled = computed(() => this.count() * 2);

// Update state
this.count.set(10);
this.count.update((v) => v + 1);

// Do NOT use mutate()
```

### Accessibility Requirements

ALL code MUST:

- Pass AXE accessibility checks
- Follow WCAG AA minimums
- Include proper ARIA attributes
- Maintain color contrast ratios
- Implement focus management

### Routing & Lazy Loading

- Use lazy loading for feature routes
- Keep route configurations in `app.routes.ts`
- Use standalone components with routing

### Images

- Use `NgOptimizedImage` for all static images
- Cannot use `NgOptimizedImage` with inline base64 images
- Always include `width` and `height` attributes

## Project Structure Reference

```
src/
├── app/
│   ├── core/                    # Singleton services, guards, store
│   ├── features/                # Feature modules (lazy-loaded)
│   ├── shared/                  # Shared components, pipes, directives
│   ├── app.config.ts           # App configuration
│   ├── app.routes.ts           # Routing configuration
│   ├── app.ts                  # Root component
│   └── app.spec.ts             # App tests
└── main.ts                      # Bootstrap
```

## Common Tasks

### Generate Component

```bash
ng generate component path/component-name
```

### Generate Service

```bash
ng generate service path/service-name
```

### Add Route Guard

```bash
ng generate guard core/guards/guard-name
```

### Run Development Server

```bash
npm start
# Runs on http://localhost:4200
```

### Run Tests

```bash
npm test
```

## Available Slash Commands

Use these slash commands for common development tasks. Each command is modular and located in [.claude/commands/](.claude/commands/):

- **`/test`** - Run unit tests with Vitest [.claude/commands/test.md](.claude/commands/test.md)
- **`/review`** - Perform multi-axis code review on staged changes [.claude/commands/review.md](.claude/commands/review.md)
- **`/audit`** - Comprehensive project audit of entire src/ directory [.claude/commands/audit.md](.claude/commands/audit.md)
- **`/build`** - Build for production with optimizations [.claude/commands/build.md](.claude/commands/build.md)
- **`/serve`** - Start development server at http://localhost:4200 [.claude/commands/serve.md](.claude/commands/serve.md)
- **`/a11y`** - Check accessibility compliance (WCAG 2.1 AA) [.claude/commands/a11y.md](.claude/commands/a11y.md)

## Claude-Specific Instructions

When working in this workspace, Claude should:

1. **Always check Angular 21 best practices first** - Use the standards above
2. **Use signals over RxJS when possible** - Signals are the modern Angular state management
3. **Implement OnPush change detection** - Required for all components
4. **Use standalone components** - Never use NgModules in new code
5. **Prefer `input()` and `output()` functions** - Not decorators
6. **Use `inject()` for dependency injection** - Not constructors
7. **Implement accessibility** - AXE + WCAG AA compliance required
8. **Keep templates simple** - Use native control flow syntax
9. **Type everything** - Strict TypeScript typing required
10. **Test accessibility** - Include AXE checks in tests

## Technology Stack

- **Angular**: 21.x
- **TypeScript**: Latest strict mode
- **CSS**: Native CSS (no SASS/LESS)
- **Testing**: Vitest
- **Build Tool**: Angular CLI / esbuild

## Useful Angular 21 Resources

- Angular Documentation: https://angular.dev
- Angular Style Guide: https://angular.dev/style-guide
- Standalone Components: https://angular.dev/guide/standalone-components
- Signals: https://angular.dev/guide/signals
- Routing: https://angular.dev/guide/routing
