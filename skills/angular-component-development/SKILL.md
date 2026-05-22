---
name: angular-component-development
description: Build Angular 21 standalone components with input/output functions, signals, and OnPush change detection. Use when creating new components or refactoring existing ones for modern Angular development.
---

# Angular Component Development

## Overview

Build standalone Angular 21 components using modern patterns: `input()` / `output()`, signals for local state, `computed()` for derived state, and OnPush change detection for optimal performance.

For framework-level Angular guidance, consult `skills/angular-developer/SKILL.md` first.

This skill focuses on this repository’s component implementation patterns and Angular 21 conventions.

## When to Use

- Creating new components
- Refactoring existing components to modern patterns
- Implementing component communication
- Building component hierarchies

## Component Structure

```typescript
import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ counter() }}</p>
      <p>Doubled: {{ doubled() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  // Use input() function instead of @Input decorator
  initialValue = input<number>(0);

  // Use output() function instead of @Output decorator
  countChanged = output<number>();

  // Signal for mutable state
  counter = signal(this.initialValue());

  // Computed for derived state
  doubled = computed(() => this.counter() * 2);

  increment() {
    this.counter.update((v) => v + 1);
    this.countChanged.emit(this.counter());
  }
}
```

## Key Practices

### Always Use `ChangeDetectionStrategy.OnPush`

```typescript
@Component({
  selector: 'app-example',
  template: `{{ message() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush, // ✓ Required
})
export class ExampleComponent {
  message = signal('Hello');
}
```

### Use `input()` and `output()` Functions

```typescript
// ✓ Modern - use functions
name = input<string>('');
clicked = output<void>();

// ✗ Deprecated - avoid decorators
@Input() name: string = '';
@Output() clicked = new EventEmitter<void>();
```

### Prefer Inline Templates for Small Components

```typescript
@Component({
  selector: 'app-button',
  template: `<button (click)="onClick()">{{ label() }}</button>`, // ✓ Inline
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input<string>('Click me');
  onClick = output<void>();
}
```

### Organize Component Logic Clearly

1. Inputs first
2. Outputs second
3. Signals for state
4. Computed values
5. Methods

## Red Flags

- ✗ Using `@Input` / `@Output` decorators
- ✗ Missing `ChangeDetectionStrategy.OnPush`
- ✗ Components larger than 200 lines (split them)
- ✗ Complex logic in templates
- ✗ Missing standalone flag

## Verification

- [ ] Component is standalone
- [ ] All inputs use `input()` function
- [ ] All outputs use `output()` function
- [ ] `ChangeDetectionStrategy.OnPush` is set
- [ ] Component has clear, single responsibility
- [ ] Template is readable
- [ ] Tests exist
