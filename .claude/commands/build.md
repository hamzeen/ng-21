---
description: Build for production with optimizations — tree-shaking, minification, code splitting
---

Invoke the [angular-performance](../../skills/angular-performance/) skill.

## Run Command

```bash
ng build --configuration production
```

## What It Does

1. Compiles all TypeScript to JavaScript
2. Applies tree-shaking to remove unused code
3. Minifies and uglifies JavaScript
4. Optimizes CSS
5. Code splits lazy-loaded routes into separate bundles
6. Generates source maps for debugging
7. Reports bundle sizes and warnings

## Production Build Process

1. Clean previous build artifacts
2. Compile with optimizations enabled
3. Generate production bundles
4. Report bundle size analysis
5. Check for any build warnings

## Verification

After build:

- [ ] No build errors
- [ ] Bundle size reasonable (< 200KB gzipped main)
- [ ] All lazy-loaded routes split correctly
- [ ] Source maps generated for debugging
- [ ] No console warnings in final bundle

## Related Skills

- [angular-performance](../../skills/angular-performance/)
- [angular-routing-lazy-loading](../../skills/angular-routing-lazy-loading/)
