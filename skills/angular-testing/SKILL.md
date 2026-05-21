---
name: angular-testing
description: Write unit tests for Angular 21 components and services using Vitest. Use when writing tests, testing signals, mocking dependencies, and ensuring code quality.
---

# Angular Testing

## Overview

Write comprehensive unit tests for Angular components and services using Vitest and TestBed. Test behavior, not implementation details. Use signals by reading their values directly.

## When to Use

- Writing unit tests for new components or services
- Fixing bugs with reproduction tests (Prove-It Pattern)
- Refactoring with test safety nets
- Ensuring code quality and behavior

## Component Testing

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment counter', () => {
    expect(component.counter()).toBe(0);
    component.increment();
    expect(component.counter()).toBe(1);
  });

  it('should compute doubled value', () => {
    component.counter.set(5);
    expect(component.doubled()).toBe(10);
  });

  it('should emit countChanged output', (done) => {
    component.countChanged.subscribe((value: number) => {
      expect(value).toBe(1);
      done();
    });

    component.increment();
  });
});
```

## Service Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get selected user', () => {
    service.setSelectedUser('user-1');
    expect(service.selectedUserId()).toBe('user-1');
  });

  it('should compute selected user', () => {
    service.users.set([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ]);
    service.setSelectedUser('1');

    expect(service.selectedUser()?.name).toBe('Alice');
  });
});
```

## Testing Signals

```typescript
// Read signal values directly
it('should update signal value', () => {
  const count = signal(0);
  expect(count()).toBe(0); // ✓ Read by calling as function

  count.set(5);
  expect(count()).toBe(5);
});

// Test computed values
it('should compute derived value', () => {
  const count = signal(5);
  const doubled = computed(() => count() * 2);

  expect(doubled()).toBe(10);

  count.set(7);
  expect(doubled()).toBe(14);
});

// Test effects
it('should trigger effect on signal change', (done) => {
  const count = signal(0);
  let callCount = 0;

  effect(() => {
    callCount++;
    count(); // Track dependency
  });

  expect(callCount).toBe(1);
  count.set(1);
  expect(callCount).toBe(2);

  done();
});
```

## Async Testing

```typescript
// Using done callback
it('should handle async operation', (done) => {
  service.loadData().subscribe(() => {
    expect(service.data()).toBeTruthy();
    done();
  });
});

// Using fakeAsync/tick
it('should complete after delay', fakeAsync(() => {
  let result = false;
  setTimeout(() => {
    result = true;
  }, 1000);

  expect(result).toBeFalse();
  tick(1000);
  expect(result).toBeTrue();
}));

// Using waitForAsync
it('should handle promises', waitForAsync(() => {
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(component.data).toBeTruthy();
  });
}));
```

## Arrange-Act-Assert Pattern

```typescript
it('should mark task as completed', () => {
  // Arrange: Set up test data
  const task = { id: '1', title: 'Test', completed: false };

  // Act: Perform the action
  const result = component.completeTask(task);

  // Assert: Verify the outcome
  expect(result.completed).toBeTrue();
});
```

## Test Organization

```typescript
describe('TaskService', () => {
  // Group related tests
  describe('getTasks', () => {
    it('should return tasks', () => {});
    it('should handle errors', () => {});
  });

  describe('completeTask', () => {
    it('should update task status', () => {});
    it('should record timestamp', () => {});
  });
});
```

## Best Practices

- **One assertion per concept** - Each test verifies one behavior
- **DAMP over DRY** - Self-contained, readable tests
- **Test behavior, not implementation** - What, not how
- **Use descriptive names** - `should_increment_counter_when_clicked()`
- **Prefer real over mocks** - Real implementations when possible
- **Isolate state** - Each test independent

## Red Flags

- ✗ Tests that pass on first run (not actually testing)
- ✗ Mocking everything (reduces confidence)
- ✗ Flaky tests (timing-dependent)
- ✗ Testing framework code, not your code
- ✗ No assertions, just setup code
- ✗ Complex shared setup (use DAMP instead)
- ✗ Multiple assertions per test

## Verification

- [ ] Every new behavior has a test
- [ ] Bug fixes include reproduction tests
- [ ] All tests pass: `npm test`
- [ ] Test names describe behavior
- [ ] No skipped or disabled tests
- [ ] Coverage hasn't decreased
- [ ] Tests are deterministic
