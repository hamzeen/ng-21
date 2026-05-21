---
name: test-driven-development
description: Drive development with tests. Use when implementing logic, fixing bugs, or changing behavior. Write tests first (RED), make them pass (GREEN), then refactor (REFACTOR).
---

# Test-Driven Development (TDD)

## Overview

Write failing tests first, then implement code to make them pass. TDD ensures correctness, creates regression guards, and documents expected behavior.

## When to Use

- Implementing any new logic or behavior
- Fixing any bug (use Prove-It Pattern)
- Modifying existing functionality
- Adding edge case handling
- Any change that could break existing behavior

**When NOT to use**: Pure configuration, documentation, or static content with no behavioral impact.

## The TDD Cycle: RED → GREEN → REFACTOR

```
    RED              GREEN           REFACTOR
Write test     Write minimal code    Clean up
that fails     to make it pass       implementation
   ↓               ↓                    ↓
Test FAILS     Test PASSES         Tests PASS
   └────────────────┼────────────────┘
                (repeat)
```

### Step 1: RED - Write Failing Test

Test must fail. A test that passes immediately proves nothing.

```typescript
// RED: Test fails because function doesn't exist yet
describe('TaskService', () => {
  it('creates a task with title and default status', async () => {
    const task = await taskService.createTask({ title: 'Buy groceries' });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Buy groceries');
    expect(task.status).toBe('pending');
    expect(task.createdAt).toBeInstanceOf(Date);
  });
});
```

### Step 2: GREEN - Make It Pass

Write minimum code to make test pass. Don't over-engineer.

```typescript
// GREEN: Minimal implementation
export async function createTask(input: { title: string }): Promise<Task> {
  const task = {
    id: generateId(),
    title: input.title,
    status: 'pending' as const,
    createdAt: new Date(),
  };
  await db.tasks.insert(task);
  return task;
}
```

### Step 3: REFACTOR - Clean Up

Improve code without changing behavior. Tests stay green.

```typescript
// REFACTOR: Extract shared logic, improve naming
class TaskFactory {
  static createNew(input: { title: string }): Task {
    return {
      id: generateId(),
      title: input.title,
      status: 'pending',
      createdAt: new Date(),
    };
  }
}

export async function createTask(input: { title: string }): Promise<Task> {
  const task = TaskFactory.createNew(input);
  await db.tasks.insert(task);
  return task;
}
```

## The Prove-It Pattern (Bug Fixes)

When a bug is reported, write a test that reproduces it first:

```
Bug Report
    ↓
Write reproduction test (TEST FAILS - bug confirmed)
    ↓
Implement fix
    ↓
Test PASSES (bug fixed, regression guarded)
    ↓
Run full suite (no regressions)
```

### Example

```typescript
// Bug: "Completing a task doesn't update the completedAt timestamp"

// STEP 1: Write reproduction test (it should FAIL)
it('sets completedAt when task is completed', async () => {
  const task = await taskService.createTask({ title: 'Test' });
  const completed = await taskService.completeTask(task.id);

  expect(completed.status).toBe('completed');
  expect(completed.completedAt).toBeInstanceOf(Date); // This fails → bug confirmed
});

// STEP 2: Fix the bug
export async function completeTask(id: string): Promise<Task> {
  return db.tasks.update(id, {
    status: 'completed',
    completedAt: new Date(), // This was missing
  });
}

// STEP 3: Test passes → bug fixed
```

## Test Pyramid

Invest testing effort according to the pyramid:

```
        ╱╲
       ╱  ╲         E2E Tests (~5%)
      ╱    ╲        Full user flows, real browser
     ╱──────╲
    ╱        ╲      Integration Tests (~15%)
   ╱          ╲     Component interactions, API boundaries
  ╱────────────╲
 ╱              ╲   Unit Tests (~80%)
╱────────────────╲  Pure logic, isolated, milliseconds each
```

**The Beyonce Rule:** If you liked it, you should have put a test on it. Infrastructure changes, refactoring, and migrations are not responsible for catching bugs — your tests are.

## Test Sizes

| Size       | Constraints                                     | Speed        | Example                                 |
| ---------- | ----------------------------------------------- | ------------ | --------------------------------------- |
| **Small**  | Single process, no I/O, no network, no database | Milliseconds | Pure function tests, data transforms    |
| **Medium** | Multi-process OK, localhost only                | Seconds      | API tests with test DB, component tests |
| **Large**  | Multi-machine OK, external services             | Minutes      | E2E tests, performance benchmarks       |

Small tests should be the vast majority. They're fast, reliable, easy to debug.

## Writing Good Tests

### Arrange-Act-Assert Pattern

```typescript
it('marks overdue tasks when deadline has passed', () => {
  // Arrange: Set up test scenario
  const task = createTask({
    title: 'Test',
    deadline: new Date('2025-01-01'),
  });

  // Act: Perform action being tested
  const result = checkOverdue(task, new Date('2025-01-02'));

  // Assert: Verify outcome
  expect(result.isOverdue).toBe(true);
});
```

### One Assertion Per Concept

```typescript
// ✓ Good: Each test verifies one behavior
it('rejects empty titles', () => { ... });
it('trims whitespace from titles', () => { ... });
it('enforces maximum title length', () => { ... });

// ✗ Bad: Everything in one test
it('validates titles correctly', () => {
  expect(() => createTask({ title: '' })).toThrow();
  expect(createTask({ title: '  hello  ' }).title).toBe('hello');
  expect(() => createTask({ title: 'a'.repeat(256) })).toThrow();
});
```

### DAMP Over DRY in Tests

Descriptive And Meaningful Phrases beat Don't Repeat Yourself. Each test should read like a specification.

```typescript
// ✓ DAMP: Each test is self-contained, readable
it('rejects tasks with empty titles', () => {
  const input = { title: '', assignee: 'user-1' };
  expect(() => createTask(input)).toThrow('Title is required');
});

it('trims whitespace from titles', () => {
  const input = { title: '  Buy groceries  ', assignee: 'user-1' };
  const task = createTask(input);
  expect(task.title).toBe('Buy groceries');
});

// ✗ Over-DRY: Shared setup obscures what each test verifies
```

### Name Tests Descriptively

```typescript
// ✓ Good: Reads like specification
describe('TaskService.completeTask', () => {
  it('sets status to completed and records timestamp', ...);
  it('throws NotFoundError for non-existent task', ...);
  it('is idempotent — completing an already-completed task is a no-op', ...);
});

// ✗ Bad: Vague names
describe('TaskService', () => {
  it('works', ...);
  it('handles errors', ...);
  it('test 3', ...);
});
```

### Prefer Real Implementations Over Mocks

Use the simplest test double that gets the job done:

```
Preference order (most to least preferred):
1. Real implementation         → Highest confidence
2. Fake (in-memory)           → Controlled behavior
3. Stub (canned data)         → Returns fixed responses
4. Mock (interaction)         → Verifies method calls — use sparingly
```

Use mocks only when the real implementation is slow, non-deterministic, or has uncontrollable side effects.

## Anti-Patterns to Avoid

| Anti-Pattern                          | Problem                                                 | Fix                                         |
| ------------------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| Testing implementation details        | Tests break when refactoring even if behavior unchanged | Test inputs and outputs                     |
| Flaky tests (timing, order-dependent) | Erode trust in test suite                               | Use deterministic assertions, isolate state |
| Testing framework code                | Wastes time                                             | Only test YOUR code                         |
| Snapshot abuse                        | Large snapshots, nobody reviews, break on any change    | Use snapingly for visual regression         |
| No test isolation                     | Tests pass individually but fail together               | Each test sets up and tears down            |
| Mocking everything                    | Tests pass but production breaks                        | Prefer real > fake > stub > mock            |

## Red Flags

- Writing code without corresponding tests
- Tests that pass on first run (not testing what you think)
- "All tests pass" but no tests were actually run
- Bug fixes without reproduction tests
- Tests that test framework behavior, not application behavior
- Test names that don't describe expected behavior
- Skipped or disabled tests
- Running same test command twice without code changes

## Verification

- [ ] Every new behavior has test
- [ ] All tests pass: `npm test`
- [ ] Bug fixes include reproduction test that failed before fix
- [ ] Test names describe behavior being verified
- [ ] No skipped or disabled tests
- [ ] Coverage hasn't decreased (if tracked)

**Note**: Run tests after each change that could affect results. After a clean run, re-running the same command without code changes adds no confidence.

## Best Practices (Make Tests Easy to Write and Maintain)

Follow these conventions to keep test writing fast, predictable and low-friction:

- **File organization & names**: place unit tests alongside code using `.spec.ts` suffix (e.g. `foo.service.spec.ts` or `components/foo/foo.component.spec.ts`). Keep tests small and focused.

- **Use Vitest + @testing-library/angular for components**: prefer `render()` for DOM-oriented tests and plain class instantiation for logic-only tests. This keeps tests fast and avoids heavy TestBed wiring when unnecessary.

- **Test template (AAA)**: follow Arrange-Act-Assert strictly.

  ```ts
  it('does X', () => {
    // Arrange
    const sut = new MyClass();

    // Act
    const out = sut.doSomething();

    // Assert
    expect(out).toBe(expected);
  });
  ```

- **Component test template**:

  ```ts
  import { render, screen } from '@testing-library/angular';
  import { MyComponent } from './my.component';

  it('renders list', async () => {
    const { container } = await render(MyComponent, { imports: [] });
    expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
  });
  ```

- **Mocking & spies**: prefer simple fakes or in-memory implementations. Use `vi.spyOn()` for spying. Mock only external effects (network, file system, timers).

- **Signals & reactivity**: test signal state by calling the signal (`mySignal()`) and by invoking the action that updates it. Avoid relying on implicit change detection in unit tests.

- **No fragile timing**: avoid timers and sleeps; use deterministic mocks or `vi.useFakeTimers()` when necessary.

- **Small & fast**: favor unit tests that run in milliseconds. Use integration tests sparingly for cross-module flows.

- **One behavior per test**: keep tests focused on a single expectation or concept to ease debugging and maintenance.

- **Use stable test data**: create factories or builders for test objects (`createTestUser()`) to keep tests readable and replaceable.

- **CI & coverage**: run `npm test -- --coverage` in CI and enforce sensible thresholds (e.g., 70–80% overall or per-package where practical). Fail build on regressions.

- **Local scripts**: add convenient scripts to `package.json`:

  ```json
  {
    "scripts": {
      "test": "vitest",
      "test:watch": "vitest --watch",
      "test:coverage": "vitest --coverage"
    }
  }
  ```

- **Document test strategy**: keep this `SKILL.md` and repo README updated with the chosen runner, commands, and where to add new tests.

- **Stability checks**: if a test is flaky, mark it and create an issue; do not leave flaky tests enabled.

Following these will make future unit tests faster to author and more reliable.
