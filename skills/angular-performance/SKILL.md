---
name: angular-performance
description: Optimize Angular 21 applications for speed using OnPush change detection, lazy loading, code splitting, and bundle optimization. Use when improving load times, reducing bundle size, or responding to performance issues.
---

# Angular Performance Optimization

## Overview

Optimize Angular applications with OnPush change detection, lazy loading, code splitting, and bundle size monitoring. Measure before optimizing to avoid premature optimization.

## When to Use

- Performance requirements exist in specs
- Users report slow behavior
- Core Web Vitals below thresholds
- Suspected performance regressions
- Building large applications

## Core Web Vitals Targets

| Metric                          | Good    | Needs Help | Poor    |
| ------------------------------- | ------- | ---------- | ------- |
| LCP (Largest Contentful Paint)  | ≤ 2.5s  | ≤ 4.0s     | > 4.0s  |
| INP (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms    | > 500ms |
| CLS (Cumulative Layout Shift)   | ≤ 0.1   | ≤ 0.25     | > 0.25  |

## OnPush Change Detection

```typescript
// ✓ Always use OnPush
@Component({
  selector: 'app-task',
  template: `<div>{{ task().title }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush, // Essential
})
export class TaskComponent {
  task = input.required<Task>();
}

// ✗ Never use default change detection
@Component({
  selector: 'app-task',
  template: `<div>{{ task.title }}</div>`,
  // Missing OnPush - checks entire component tree on every change
})
export class TaskComponent {
  @Input() task!: Task;
}
```

## Lazy Loading Routes

```typescript
// Load feature modules only when needed
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
];
```

## Code Splitting

```typescript
// Dynamic imports for heavy features
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./heavy-chart.component'));

@Component({
  template: `
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  `,
})
export class DashboardComponent {}
```

## Image Optimization

```html
<!-- Art direction + responsive sizes -->
<picture>
  <!-- Mobile: portrait crop -->
  <source
    media="(max-width: 767px)"
    srcset="/hero-mobile-400.avif 400w, /hero-mobile-800.avif 800w"
    sizes="100vw"
    width="800"
    height="1000"
    type="image/avif"
  />
  <!-- Desktop: landscape crop -->
  <source
    srcset="/hero-800.avif 800w, /hero-1200.avif 1200w"
    sizes="(max-width: 1200px) 100vw, 1200px"
    width="1200"
    height="600"
    type="image/avif"
  />
  <img src="/hero-desktop.jpg" width="1200" height="600" fetchpriority="high" alt="Hero image" />
</picture>

<!-- Below-the-fold lazy load -->
<img src="/content.webp" width="800" height="400" loading="lazy" decoding="async" alt="Content" />
```

## N+1 Query Prevention

```typescript
// ✗ BAD - N+1 queries
const tasks = await db.tasks.findMany();
for (const task of tasks) {
  task.owner = await db.users.findUnique({
    where: { id: task.ownerId },
  });
}

// ✓ GOOD - Single query with join
const tasks = await db.tasks.findMany({
  include: { owner: true },
});
```

## Bundle Size Monitoring

```bash
# Check bundle size
ng build --stats-json

# Analyze with webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/ng-21/stats.json
```

## Performance Budget

```json
{
  "bundles": [
    {
      "name": "main",
      "maxSize": "200kb"
    },
    {
      "name": "polyfills",
      "maxSize": "50kb"
    }
  ]
}
```

## Tree Shaking

```typescript
// ✓ Good - tree-shakeable named exports
export const formatDate = (d: Date) => d.toLocaleDateString();

// ✗ Bad - forces inclusion of entire module
export default { formatDate };

// ✓ Import only what you need
import { formatDate } from './utils'; // Other exports not bundled
```

## Avoiding Unnecessary Re-renders

```typescript
// ✓ Stable reference with readonly
const DEFAULT_OPTIONS = { sort: 'date' } as const;

@Component({
  template: `<TaskList [options]="DEFAULT_OPTIONS" />`,
})
export class ParentComponent {}

// ✗ Creates new object every render
@Component({
  template: `<TaskList [options]="{ sort: 'date' }" />`,
})
export class BadComponent {}
```

## Track by in Loops

```html
<!-- ✓ GOOD - track prevents unnecessary DOM operations -->
@for (item of items(); track item.id) {
<div>{{ item.name }}</div>
}

<!-- ✗ BAD - recreates DOM on every change -->
@for (item of items()) {
<div>{{ item.name }}</div>
}
```

## Performance Checklist

- [ ] All components use `ChangeDetectionStrategy.OnPush`
- [ ] Feature routes lazy loaded
- [ ] Bundle size < 200KB gzipped (main)
- [ ] Images optimized with responsive sizes
- [ ] No N+1 queries in API calls
- [ ] Core Web Vitals within "Good" thresholds
- [ ] No memory leaks in subscriptions
- [ ] Monitoring in production

## Red Flags

- ✗ Default change detection on all components
- ✗ Eager loading all routes
- ✗ Unoptimized images
- ✗ N+1 query patterns
- ✗ Large bundles without code splitting
- ✗ No performance monitoring

## Verification

- [ ] LCP < 2.5 seconds
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle size tracked
- [ ] No performance regressions
- [ ] Lighthouse score ≥ 90
