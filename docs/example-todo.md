# Example 1: Todo Component AI Workflow

## Step 1 — Create the feature spec

```md
/spec Build a todo component where a user can add, complete, filter, and delete tasks.
```

Expected AI output:

- User stories
- Acceptance criteria
- Component responsibilities
- Edge cases
- Accessibility notes
- Testing scope

---

## Step 2 — Ask for a plan, not code

```md
/plan Use Angular 21 signals and Vitest. Do not write production code yet.
```

Expected AI output:

- Component structure
- State model
- Test strategy
- Implementation sequence
- Files to create or modify

---

## Step 3 — Generate failing tests first

```md
/tdd Write failing tests for initial render, adding a todo, completing a todo, deleting a todo, filtering active/completed tasks, and empty state.
```

Expected AI output:

- Vitest test file
- Angular TestBed setup
- Failing assertions based on the approved spec
- No production implementation yet

---

## Step 4 — Implement the smallest solution

```md
Now implement the smallest Angular 21 solution to pass the tests.
Use signals for local state, standalone components, and modern Angular control flow.
```

Expected AI output:

- Minimal component implementation
- Template using `@if`, `@for`, and `@switch` where useful
- No unnecessary abstractions
- Tests passing

---

## Step 5 — Review with multiple roles

```md
/review Review as Angular Specialist, QA Engineer, Senior Developer, and Code Reviewer.
Check correctness, readability, architecture, accessibility, and test coverage.
```

Expected AI output:

- Issues grouped by severity
- Suggested fixes
- Missing tests
- Architecture risks
- Accessibility concerns

---

## Step 6 — Ship readiness

```md
/ship Run final checks and summarize readiness.
Confirm build, tests, lint/typecheck if available, accessibility, and release risks.
```

Expected AI output:

- Go / no-go status
- Passing checks
- Blocking issues
- Non-blocking improvements
- Suggested commit message

---
