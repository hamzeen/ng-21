---
name: angular-accessibility
description: Build accessible Angular 21 applications with WCAG 2.1 AA compliance. Use when building components to ensure keyboard navigation, ARIA labels, color contrast, and screen reader support.
---

# Angular Accessibility (WCAG 2.1 AA)

## Overview

Build fully accessible Angular applications that meet WCAG 2.1 AA standards. Every component must support keyboard navigation, screen readers, and users with different abilities.

## When to Use

- Building any user-facing component
- Fixing accessibility issues
- Ensuring compliance with accessibility standards
- Supporting keyboard-only and screen reader users

## Keyboard Navigation

```typescript
@Component({
  selector: 'app-custom-button',
  template: `
    <button
      [disabled]="disabled()"
      (click)="onClick()"
      [attr.aria-label]="label()"
      [attr.aria-pressed]="isPressed()"
    >
      {{ label() }}
    </button>
  `,
})
export class CustomButtonComponent {
  label = input.required<string>();
  disabled = input(false);
  isPressed = input(false);
  onClick = output<void>();
}
```

### Never Trap Focus

```html
<!-- ✓ Good - Tab can escape -->
<div role="dialog" class="modal">
  <button (click)="close()">Close</button>
  <input type="text" />
</div>

<!-- ✗ Bad - Traps focus without escape -->
<div role="dialog" class="modal">
  <!-- No close button, no escape -->
</div>
```

## ARIA Labels

```html
<!-- Button without visible text -->
<button [attr.aria-label]="'Close dialog'">
  <svg><use href="#close-icon"></use></svg>
</button>

<!-- Form input labeling -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- Or aria-label when no visible label -->
<input [attr.aria-label]="'Search tasks'" type="search" />

<!-- Alert/Live Regions -->
<div [attr.role]="'alert'" [attr.aria-live]="'polite'">{{ statusMessage() }}</div>

<!-- Landmarks -->
<nav [attr.aria-label]="'Main navigation'">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

## Color Contrast

```css
/* WCAG AA requires 4.5:1 for normal text, 3:1 for large text */
.text-primary {
  color: #000; /* 7:1 on white - ✓ Good */
  background: #fff;
}

.text-muted {
  color: #666; /* 7.5:1 on white - ✓ Good */
  background: #fff;
}

.text-disabled {
  color: #999; /* 4.5:1 on white - ✓ Good */
  background: #fff;
}

/* ✗ Bad - insufficient contrast */
.text-bad {
  color: #ccc; /* 3:1 on white - Too low */
  background: #fff;
}
```

## Semantic HTML

```html
<!-- Use semantic elements -->
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article content</article>
<aside>Sidebar</aside>
<footer>Footer</footer>

<!-- Use button for clickable elements -->
<button (click)="handleClick()">Click me</button>

<!-- Not div with click handler -->
<div (click)="handleClick()">Click me</div>
<!-- ✗ Not accessible -->
```

## Form Accessibility

```html
<!-- Proper form structure -->
<form>
  <div class="form-group">
    <label for="name">Full Name</label>
    <input
      id="name"
      type="text"
      required
      [attr.aria-required]="true"
      [attr.aria-describedby]="'name-hint'"
    />
    <p id="name-hint" class="hint">Your full legal name</p>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      required
      [attr.aria-invalid]="emailError() ? 'true' : 'false'"
      [attr.aria-describedby]="emailError() ? 'email-error' : undefined"
    />
    @if (emailError()) {
    <p id="email-error" class="error">{{ emailError() }}</p>
    }
  </div>

  <button type="submit">Submit</button>
</form>
```

## Focus Management

```typescript
@Component({
  selector: 'app-dialog',
  template: `
    <div role="dialog" [attr.aria-modal]="'true'" [attr.aria-labelledby]="'dialog-title'">
      <h2 id="dialog-title">{{ title() }}</h2>
      <p>{{ content() }}</p>
      <button (click)="confirm()" #confirmBtn>Confirm</button>
      <button (click)="cancel()">Cancel</button>
    </div>
  `,
})
export class DialogComponent {
  title = input.required<string>();
  content = input.required<string>();
  @ViewChild('confirmBtn') confirmBtn!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    // Focus first button when dialog opens
    this.confirmBtn.nativeElement.focus();
  }
}
```

## Empty and Error States

```html
<!-- Empty state with guidance -->
@if (tasks().length === 0) {
<div class="empty-state">
  <div class="empty-icon" [attr.aria-hidden]="'true'">
    <svg><use href="#tasks-icon"></use></svg>
  </div>
  <h3>No tasks</h3>
  <p>Get started by creating a new task.</p>
  <button (click)="createTask()">Create Task</button>
</div>
}

<!-- Error state with recovery -->
@if (error()) {
<div role="alert" class="error-state">
  <p>Failed to load tasks: {{ error() }}</p>
  <button (click)="retry()">Try again</button>
</div>
}
```

## Image Accessibility

```html
<!-- Always include descriptive alt text -->
<img src="/hero.jpg" alt="Team collaborating in office" width="800" height="600" />

<!-- Decorative images use empty alt -->
<img src="/divider.svg" alt="" [attr.aria-hidden]="'true'" />

<!-- Icon with label -->
<button [attr.aria-label]="'Add new item'">
  <svg [attr.aria-hidden]="'true'"><use href="#plus"></use></svg>
  Add
</button>
```

## Testing for Accessibility

```typescript
// Use axe-core for automated testing
import { axe, toHaveNoViolations } from 'jasmine-axe';

describe('TaskComponent - Accessibility', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should have no accessibility violations', async () => {
    fixture.detectChanges();
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
});
```

## Red Flags

- ✗ Color as sole indicator of state
- ✗ Missing alt text on images
- ✗ Keyboard traps
- ✗ No focus indicators
- ✗ Interactive elements that aren't buttons
- ✗ Missing ARIA labels on icon buttons
- ✗ Contrast ratio below 4.5:1
- ✗ No semantic HTML

## Verification

- [ ] Keyboard navigation works completely
- [ ] Screen reader announces all content
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All form inputs labeled
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Alt text on all images
- [ ] axe-core checks pass
