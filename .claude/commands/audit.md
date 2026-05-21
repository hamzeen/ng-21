---
description: Comprehensive project audit — review entire src/ against Angular 21 standards, architecture patterns, accessibility, performance, testing coverage
---

Invoke the [code-review-and-quality](../../skills/code-review-and-quality/) skill alongside [angular-component-development](../../skills/angular-component-development/), [angular-performance](../../skills/angular-performance/), and [angular-testing](../../skills/angular-testing/).

## Full Project Audit Scope

Systematically review the entire `src/` directory across all dimensions.

### 1. Components & Patterns

- [ ] All components use `@Component` with standalone
- [ ] All components have `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Using `input()` and `output()` functions (not `@Input/@Output`)
- [ ] Using `inject()` for dependency injection (not constructor)
- [ ] Templates use `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`)
- [ ] No arrow functions in templates
- [ ] Proper class/style bindings (not `ngClass`/`ngStyle`)
- [ ] Component naming consistent (PascalCase for classes, kebab-case for files)

### 2. Services & Architecture

- [ ] Services have single responsibility
- [ ] Using `providedIn: 'root'` for singletons
- [ ] No circular dependencies
- [ ] Services use `inject()` not constructor injection
- [ ] Proper HTTP error handling
- [ ] Type safety - no `any` types
- [ ] Services organized in logical folders

### 3. State Management (Signals)

- [ ] Using `signal()` for mutable state
- [ ] Using `computed()` for derived state
- [ ] Using `effect()` for side effects (appropriately scoped)
- [ ] No unnecessary RxJS where signals work
- [ ] Signals combined with OnPush for optimal performance

### 4. Routing

- [ ] Routes properly lazy-loaded
- [ ] Route guards implemented correctly
- [ ] Route paths consistent (kebab-case)
- [ ] Preloading strategy defined
- [ ] No duplicate routes

### 5. Accessibility (WCAG 2.1 AA)

- [ ] Semantic HTML used throughout
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] ARIA labels on icon buttons
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible
- [ ] No keyboard traps

### 6. Performance

- [ ] OnPush change detection on all components
- [ ] Lazy loading routes properly split
- [ ] No N+1 queries in HTTP requests
- [ ] Images optimized (lazy loading, correct formats)
- [ ] Bundle size reasonable
- [ ] No memory leaks from subscriptions
- [ ] trackBy used in `@for` loops

### 7. Testing

- [ ] Unit tests for all services
- [ ] Component tests cover critical paths
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] TestBed properly configured
- [ ] Mocking strategy consistent
- [ ] Test coverage ≥ 80%
- [ ] No hardcoded values in tests

### 8. Code Quality

- [ ] TypeScript strict mode enabled
- [ ] Type inference used appropriately
- [ ] No `any` types (use `unknown` if needed)
- [ ] Naming conventions consistent
- [ ] No dead code or commented-out code
- [ ] Files properly organized and modular
- [ ] Imports clean and organized

### 9. Security

- [ ] No hardcoded secrets
- [ ] User input sanitized
- [ ] API calls properly authenticated
- [ ] CSRF protection if applicable
- [ ] No XSS vulnerabilities

### 10. Documentation

- [ ] Components documented with purpose
- [ ] Complex logic has comments
- [ ] README maintained
- [ ] Installation/setup steps clear

## Audit Workflow

1. List all files in `src/app/` (components, services, directives, pipes)
2. Sample review: check ~30-40% of files in detail
3. Full spot-check: quick scan remaining 60-70%
4. Verify each checklist item above
5. Generate report categorized by severity

## Output Format

Organize findings as:

- **Critical** — Blocks production (security, data loss, crashes)
- **Important** — Fix before next release
- **Suggestion** — Worth addressing
- **Nit** — Optional improvements

Include:

- Specific file:line references
- What the issue is
- How to fix it
- Estimated effort

## Related Skills

- [code-review-and-quality](../../skills/code-review-and-quality/)
- [angular-component-development](../../skills/angular-component-development/)
- [angular-service-architecture](../../skills/angular-service-architecture/)
- [angular-signals-state-management](../../skills/angular-signals-state-management/)
- [angular-performance](../../skills/angular-performance/)
- [angular-accessibility](../../skills/angular-accessibility/)
- [angular-testing](../../skills/angular-testing/)
