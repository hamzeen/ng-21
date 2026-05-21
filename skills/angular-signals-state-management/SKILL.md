---
name: angular-signals-state-management
description: Manage Angular 21 state using signals, computed values, and effects. Use when building reactive applications without RxJS complexity or managing component/service state.
---

# Angular Signals & State Management

## Overview

Signals are Angular's modern reactive primitive for state management. Use signals for local state, computed for derived state, and effects for side effects. Avoid RxJS complexity for simple state.

## When to Use

- Managing component or service state
- Creating derived state from multiple signals
- Side effects tied to state changes
- Replacing RxJS for simple state management

## Signal Patterns

### Basic Signal Usage

```typescript
import { signal, computed, effect } from '@angular/core';

// State
private count = signal(0);

// Derived state
doubled = computed(() => this.count() * 2);

// Side effects
ngOnInit() {
  effect(() => {
    console.log(`Count changed to ${this.count()}`);
  });
}

// Update state
increment() {
  this.count.update(v => v + 1);  // ✓ Use update
  // this.count.mutate(v => v++);  // ✗ Never use mutate
}
```

### Computed Values

```typescript
// Simple derived state
total = computed(() => this.items().length);

// Complex computations
filteredItems = computed(() => {
  const items = this.items();
  const filter = this.filter();
  return items.filter((item) => item.name.includes(filter));
});

// Derived state depending on multiple signals
summary = computed(() => ({
  count: this.items().length,
  total: this.items().reduce((sum, item) => sum + item.price, 0),
  filtered: this.filteredItems().length,
}));
```

### Effects

```typescript
// Trigger side effect when signal changes
effect(() => {
  const userId = this.userId();
  console.log(`Loading user ${userId}`);
  this.loadUser(userId);
});

// Effect with cleanup
effect(() => {
  const subscriptions = new Subscription();
  subscriptions.add(this.data$.subscribe((data) => this.processData(data)));

  return () => subscriptions.unsubscribe();
});
```

### Signal Inputs/Outputs

```typescript
// Pass signals between components
export class ParentComponent {
  count = signal(0);
}

export class ChildComponent {
  parentCount = input<Signal<number>>(); // Receive signal

  localCount = computed(() => {
    return this.parentCount()() + 1; // Call twice (signal + function)
  });
}
```

## State Update Patterns

### `set()` - Replace entire value

```typescript
this.count.set(10); // ✓ Direct replacement
this.items.set([]); // Clear array
```

### `update()` - Transform current value

```typescript
this.count.update((v) => v + 1); // ✓ Increment
this.items.update((list) => [...list, newItem]); // Add item
```

### Never use `mutate()`

```typescript
// ✗ Avoid mutate - breaks reactivity tracking
this.items.mutate((list) => {
  list.push(newItem);
});

// ✓ Use update instead
this.items.update((list) => [...list, newItem]);
```

## Anti-Patterns to Avoid

| Anti-Pattern                 | Problem                           | Solution                      |
| ---------------------------- | --------------------------------- | ----------------------------- |
| Using `mutate()`             | Breaks reactivity tracking        | Use `update()` or `set()`     |
| Mutating signal value        | Changes without notification      | Immutable updates only        |
| Excessive effects            | Hard to trace, performance issues | Keep effects minimal          |
| Effect without dependencies  | Fires on every change             | Explicitly depend on signals  |
| Computed that causes effects | Race conditions                   | Separate computed and effects |

## Red Flags

- ✗ Using `signal.mutate()` anywhere
- ✗ Modifying signal values directly (`signal.value = x`)
- ✗ Too many nested effects
- ✗ Effects that create more signals
- ✗ Computed values with side effects

## Verification

- [ ] State uses signals, not RxJS for simple cases
- [ ] All state updates use `set()` or `update()`
- [ ] `mutate()` not used anywhere
- [ ] Derived state uses `computed()`
- [ ] Side effects use `effect()`
- [ ] No direct mutations of signal values
- [ ] Tests cover state changes
