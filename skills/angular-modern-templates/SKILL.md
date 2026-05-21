---
name: angular-modern-templates
description: Write Angular 21 templates using native control flow (@if, @for, @switch), property bindings, and event bindings. Use when writing templates to leverage modern syntax over deprecated structural directives.
---

# Angular Modern Template Syntax

## Overview

Angular 21 introduces native control flow syntax (@if, @for, @switch) replacing *ngIf, *ngFor, \*ngSwitch. This provides better performance, readability, and type safety.

## When to Use

- Writing any Angular template
- Refactoring templates from old structural directive syntax
- Building components with conditional rendering or lists
- Improving template readability and performance

## Native Control Flow

### @if / @else

```html
<!-- Modern syntax (@if) -->
@if (isLoading) {
<p>Loading...</p>
} @else if (hasError) {
<p>Error occurred</p>
} @else {
<p>Content loaded</p>
}

<!-- Old syntax (*ngIf) - avoid -->
<p *ngIf="isLoading">Loading...</p>
<p *ngIf="hasError">Error occurred</p>
<p *ngIf="!isLoading && !hasError">Content loaded</p>
```

### @for Loop

```html
<!-- Modern syntax (@for with track) -->
@for (item of items(); track item.id) {
<div class="item">
  <h3>{{ item.title }}</h3>
  <p>{{ item.description }}</p>
</div>
} @empty {
<p>No items found</p>
}

<!-- Old syntax (*ngFor) - avoid -->
<div *ngFor="let item of items; trackBy: trackById" class="item">
  <h3>{{ item.title }}</h3>
  <p>{{ item.description }}</p>
</div>
```

### @switch / @case

```html
<!-- Modern syntax (@switch) -->
@switch (status) { @case ('pending') {
<span class="badge warning">Pending</span>
} @case ('completed') {
<span class="badge success">Completed</span>
} @case ('failed') {
<span class="badge error">Failed</span>
} @default {
<span class="badge">Unknown</span>
} }

<!-- Old syntax (*ngSwitch) - avoid -->
<span [ngSwitch]="status">
  <span *ngSwitchCase="'pending'" class="badge warning">Pending</span>
  <span *ngSwitchCase="'completed'" class="badge success">Completed</span>
  <span *ngSwitchDefault class="badge">Unknown</span>
</span>
```

## Property Bindings

### Class Binding

```html
<!-- Modern - use [class.name] instead of ngClass -->
<div [class.active]="isActive" [class.disabled]="isDisabled">Content</div>

<!-- Old - avoid ngClass -->
<div [ngClass]="{ active: isActive, disabled: isDisabled }">Content</div>
```

### Style Binding

```html
<!-- Modern - use [style.property] instead of ngStyle -->
<div [style.color]="textColor" [style.font-weight]="fontWeight">Styled text</div>

<!-- Old - avoid ngStyle -->
<div [ngStyle]="{ color: textColor, fontWeight: fontWeight }">Styled text</div>
```

### Complex Style/Class

```html
<!-- Use shorthand syntax -->
<div [class]="classes()" [style]="styles()">Content</div>

<!-- Where in component: -->
<!-- classes = computed(() => `${active() ? 'active' : ''} ${disabled() ? 'disabled' : ''}`) -->
```

## Event Binding

```html
<!-- Event binding -->
<button (click)="handleClick()">Click me</button>
<input (change)="handleChange($event)" />

<!-- Passing values -->
<button (click)="deleteItem(item.id)">Delete</button>

<!-- Event object -->
<input type="text" (input)="onInput($event)" />
```

## Two-Way Binding

```html
<!-- Two-way binding with FormsModule -->
<input [(ngModel)]="taskTitle" />

<!-- Equivalent to: -->
<input [value]="taskTitle" (input)="taskTitle = $event.target.value" />
```

## Template Variables & References

```html
<!-- Reference variable -->
<input #nameInput type="text" />
<button (click)="handleClick(nameInput.value)">Click</button>

<!-- As expression variable (built-in) -->
@for (item of items(); track item.id) {
<div>{{ $index }}: {{ item.name }}</div>
}
```

## Async Pipe

```html
<!-- Handle observables and promises -->
<p>{{ (user$ | async)?.name }}</p>

<!-- In @if -->
@if ((user$ | async) as user) {
<p>User: {{ user.name }}</p>
}

<!-- In @for -->
@for (item of (items$ | async); track item.id) {
<div>{{ item.title }}</div>
}
```

## Signals in Templates

```html
<!-- Call signals as functions -->
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>

<!-- In @if -->
@if (isLoggedIn()) {
<p>Welcome back!</p>
}

<!-- In @for -->
@for (task of tasks(); track task.id) {
<div>{{ task.title }}</div>
}
```

## Anti-Patterns to Avoid

| Anti-Pattern                 | Problem                           | Solution               |
| ---------------------------- | --------------------------------- | ---------------------- |
| `*ngIf`                      | Deprecated, harder to read        | Use `@if`              |
| `*ngFor`                     | Deprecated, needs trackBy         | Use `@for` with track  |
| `*ngSwitch`                  | Deprecated, verbose               | Use `@switch/@case`    |
| `[ngClass]`                  | Harder to read than class binding | Use `[class.name]`     |
| `[ngStyle]`                  | Harder to read than style binding | Use `[style.property]` |
| Arrow functions in templates | Not supported                     | Use method references  |
| Complex logic in templates   | Reduces readability               | Move to component      |

## Red Flags

- ✗ Using `*ngIf`, `*ngFor`, `*ngSwitch`
- ✗ Using `[ngClass]` or `[ngStyle]`
- ✗ Complex logic in templates
- ✗ Arrow functions in templates
- ✗ Missing `track` in `@for` loops
- ✗ No error handling in async operations

## Verification

- [ ] No deprecated structural directives
- [ ] Native control flow used (@if, @for, @switch)
- [ ] @for loops have track function
- [ ] Class/style bindings used correctly
- [ ] No arrow functions in templates
- [ ] Template logic is minimal
- [ ] Async operations handled properly
