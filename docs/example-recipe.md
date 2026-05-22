# Example 2: Recipe Explorer Feature

## Step 1 — Create the feature spec

```md
/spec Build a recipe explorer feature with recipe cards, search by title, filter by tag, empty state, and recipe detail navigation.
```

Expected AI output:

- Feature scope
- Search behavior
- Filter behavior
- Card layout requirements
- Routing expectations
- Accessibility requirements

---

## Step 2 — Plan the architecture

```md
/plan Use Angular 21 standalone components, route-level lazy loading, signals for local UI state, and Vitest for tests.
Do not write production code yet.
```

Expected AI output:

- Suggested folder structure
- Route design
- Component breakdown
- Data model
- Testing plan

Suggested structure:

```txt
src/app/features/recipes/
  components/
    recipe-card/
    recipe-search/
    recipe-tag-filter/
  pages/
    recipe-list-page/
    recipe-detail-page/
  data/
    recipes.data.ts
  models/
    recipe.model.ts
  recipes.routes.ts
```

---

## Step 3 — Write failing tests

```md
/tdd Write failing Vitest tests for:

- rendering recipe cards
- searching recipes by title
- filtering recipes by tag
- showing empty state
- navigating to recipe detail
  Do not implement production code yet.
```

---

## Step 4 — Implement against tests

```md
Now implement the Recipe Explorer feature to pass the tests.
Keep the solution simple. Use signals for search/filter state and Angular 21 template control flow.
```

---

## Step 5 — Review

```md
/review Review the Recipe Explorer as:

- Angular Specialist
- QA Engineer
- Accessibility Reviewer
- Senior Frontend Architect

Focus on feature boundaries, lazy loading, signal usage, template clarity, and test coverage.
```

---

## Step 6 — Ship

```md
/ship Run final readiness checks for the Recipe Explorer feature.
Summarize whether it is ready to merge and list any remaining risks.
```

---
