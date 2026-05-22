---
name: angular-feature-development
description: Build complete Angular 21 features using a spec-first, test-first workflow. Use when implementing feature areas that combine routes, pages, components, services, state, forms, and tests.
---

---

# Angular Feature Development

## Overview

Build complete Angular 21 features using standalone APIs, route-level lazy loading, signals, typed models, services, and Vitest tests.

For framework-level Angular guidance, consult `skills/angular-developer/SKILL.md` first.

This skill focuses on this repository’s feature-level workflow and project structure.

---

## When to Use

Use this skill when the user asks to build or extend a feature such as:

- A dashboard
- A todo feature
- A recipe explorer
- A registration flow
- A list/detail page
- A search and filter experience
- A feature with routes, components, services, and tests

Do not use this skill for tiny isolated changes unless the change affects feature structure or feature architecture.

---

## Core Workflow

Follow the repository’s AI-assisted development workflow:

```txt
/spec → /plan → /tdd → /build → /review → /ship
```

The feature should not jump straight into implementation. First clarify the expected behavior, then plan the structure, then test, then build.

---

## Feature Development Principles

Prefer:

- Feature-first folder organization
- Route-level lazy loading
- Standalone components
- Signals for local UI state
- `computed()` for derived state
- `inject()` for dependency injection
- `input()` / `output()` for component APIs
- `ChangeDetectionStrategy.OnPush`
- Typed models and clear interfaces
- User-visible behavior tests
- Simple implementation before abstraction

Avoid:

- Large shared modules
- Overly generic abstractions too early
- Constructor injection in new code
- Deeply nested smart components
- Mixing unrelated feature concerns
- Testing private implementation details
- Adding global state before local state is proven insufficient

---

## Suggested Feature Structure

Use a feature-first structure for larger features:

```txt
src/app/features/feature-name/
  components/
  pages/
  services/
  models/
  data/
  feature-name.routes.ts
```

Example:

```txt
src/app/features/recipes/
  components/
    recipe-card/
    recipe-search/
    recipe-tag-filter/
  pages/
    recipe-list-page/
    recipe-detail-page/
  services/
    recipe.service.ts
  models/
    recipe.model.ts
  data/
    recipes.data.ts
  recipes.routes.ts
```

Use folders only when they are useful. Small features do not need every folder.

---

## Routing Guidance

Feature areas should usually be lazy loaded from `app.routes.ts`.

Example parent route:

```ts
export const routes: Routes = [
  {
    path: 'recipes',
    canActivate: [authGuard],
    loadChildren: () => import('./features/recipes/recipes.routes').then((m) => m.RECIPES_ROUTES),
  },
];
```

Example feature route file:

```ts
import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { RecipeDetailComponent } from './pages/recipe-detail-page/recipe-detail-page.component';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeListComponent,
        title: 'Recipes',
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        title: 'Recipe Details',
      },
    ],
  },
];
```

Keep route configuration close to the feature it belongs to.

---

## Component Guidance

Feature components should be small and focused.

Use page components for route-level orchestration:

```txt
pages/recipe-list-page
pages/recipe-detail-page
```

Use child components for reusable UI sections:

```txt
components/recipe-card
components/recipe-search
components/recipe-tag-filter
```

Prefer this style in new components:

```ts
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>();

  readonly title = computed(() => this.recipe().title.trim());
}
```

---

## State Guidance

Prefer the simplest state owner that works.

Use component-local signals for UI state:

```ts
readonly searchTerm = signal('');
readonly selectedTag = signal<RecipeTag | 'ALL'>('ALL');

readonly filteredRecipes = computed(() => {
  const term = this.searchTerm().toLowerCase();
  const tag = this.selectedTag();

  return this.recipes().filter((recipe) => {
    const matchesTerm = recipe.title.toLowerCase().includes(term);
    const matchesTag = tag === 'ALL' || recipe.tags.includes(tag);
    return matchesTerm && matchesTag;
  });
});
```

Use a service when:

- Data is shared across multiple components
- Data fetching is involved
- Business logic needs to be reused
- The feature needs a clear boundary for testing

Avoid introducing global state unless the feature genuinely needs cross-application state.

---

## Service Guidance

Use services for feature data access and business logic.

Prefer `inject()` in new code:

```ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);

  getRecipes() {
    return this.http.get<Recipe[]>('/api/recipes');
  }
}
```

For static demo data, keep data close to the feature:

```txt
features/recipes/data/recipes.data.ts
```

---

## Forms Guidance

For feature forms:

- Prefer typed reactive forms
- Keep validation rules explicit
- Show accessible validation messages
- Disable submit when invalid where appropriate
- Test validation behavior from the user’s perspective

For simple UI filters, signals are usually enough. Do not create a reactive form unless form semantics are useful.

---

## Testing Guidance

Use Vitest and Angular Testing Utilities.

For feature-level tests, cover:

- Initial render
- Main user actions
- Empty state
- Error state, if data fetching is involved
- Search/filter behavior
- Navigation behavior
- Validation behavior, if forms are involved

Prefer tests that verify user-visible behavior rather than internal implementation details.

Example TDD prompt:

```md
/tdd Write failing tests for rendering recipe cards, searching by title, filtering by tag, showing an empty state, and navigating to recipe detail. Do not implement production code yet.
```

---

## Acceptance Criteria Checklist

Before implementation, define:

- What can the user do?
- What should be visible initially?
- What happens when data is empty?
- What happens when data loading fails?
- What are the important edge cases?
- What should be tested?
- What route or URL behavior is expected?
- What accessibility expectations apply?

---

## Build Checklist

Before considering the feature complete, check:

- The route is correctly configured
- Feature routes are lazy loaded where appropriate
- Components are standalone
- Components use OnPush change detection
- Component APIs use `input()` / `output()` where appropriate
- Local UI state uses signals
- Derived state uses `computed()`
- Services use `inject()`
- Tests cover user-visible behavior
- Empty/loading/error states are considered
- The implementation is not over-engineered

---

## Verification

Run the project verification command before shipping:

```bash
npm run verify
```

This should validate:

```txt
typecheck → tests → production build
```

If verification fails, fix the failure before marking the feature ready.

---

## Example Feature Prompt

```md
/spec Build a recipe explorer feature.

User goal:
Users should be able to browse recipes, search by title, filter by tag, and open a detail page.

Core behavior:

- Show recipes as cards
- Search recipes by title
- Filter recipes by tag
- Show an empty state when no recipes match
- Navigate to a recipe detail page

Technical constraints:

- Angular 21
- Standalone components
- Route-level lazy loading
- Signals for local UI state
- Vitest tests

Quality expectations:

- Accessible HTML
- Clear component boundaries
- User-visible behavior tests
- Simple implementation before abstraction
```

---

## Output Expectations

When using this skill, produce:

1. A concise feature plan
2. A proposed folder structure
3. A test strategy
4. The smallest useful implementation
5. Notes on tradeoffs or skipped concerns
6. Verification results or next steps

Keep the implementation aligned with the approved spec and avoid adding unrelated improvements.
