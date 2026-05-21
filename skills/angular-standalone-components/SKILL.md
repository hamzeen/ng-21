---
name: angular-standalone-components
description: Build standalone Angular 21 components without NgModules. Use when creating new components, directives, or pipes that should work independently without module configuration.
---

# Angular Standalone Components

## Overview

Standalone components are the modern Angular pattern. Every new component should be standalone by default. They work independently without NgModule configuration and simplify dependency management.

## When to Use

- Creating any new component, directive, or pipe
- Refactoring existing NgModule-based code
- Building reusable component libraries
- Simplifying dependency injection

## Standalone Component Structure

```typescript
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  template: `
    <div class="task-item">
      <input type="checkbox" [checked]="task().completed" (change)="onToggle()" />
      <span [class.completed]="task().completed">
        {{ task().title }}
      </span>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
  styles: [
    `
      .completed {
        text-decoration: line-through;
      }
    `,
  ],
  // ✓ Mark as standalone
  standalone: true,
  // ✓ Import everything needed
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  task = input.required<Task>();
  deleted = output<string>();
  toggled = output<string>();

  onToggle() {
    this.toggled.emit(this.task().id);
  }

  onDelete() {
    this.deleted.emit(this.task().id);
  }
}
```

## Standalone Directive

```typescript
import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true, // ✓ Mark as standalone
})
export class HighlightDirective {
  highlightColor = input<string>('yellow');

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
```

## Standalone Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone: true, // ✓ Mark as standalone
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    if (!array) return array;

    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
```

## Standalone Page Component

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list-page',
  template: `
    @if (loading()) {
      <p>Loading...</p>
    } @else {
      <div class="tasks">
        @for (task of tasks(); track task.id) {
          <app-task-item
            [task]="task"
            (deleted)="onDeleteTask($event)"
            (toggled)="onToggleTask($event)"
          />
        }
      </div>
    }
  `,
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPageComponent {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  loading = this.taskService.isLoading;

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  onToggleTask(id: string) {
    this.taskService.toggleTask(id);
  }
}
```

## Key Practices

### Always Include `standalone: true`

```typescript
// ✓ Correct
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
})
export class ExampleComponent {}

// ✗ Wrong - not standalone
@Component({
  selector: 'app-example',
})
export class ExampleComponent {}
```

### Import Everything Needed

```typescript
@Component({
  selector: 'app-task',
  template: `@if (show) {
    <p>{{ message }}</p>
  }`,
  standalone: true,
  // ✓ Must import CommonModule for @if
  imports: [CommonModule],
})
export class TaskComponent {
  show = true;
  message = 'Hello';
}
```

### Use `input.required()` for Required Inputs

```typescript
@Component({
  selector: 'app-card',
  template: `<div>{{ title() }}</div>`,
  standalone: true,
})
export class CardComponent {
  // ✓ Required input - must be provided
  title = input.required<string>();

  // ✓ Optional input with default
  subtitle = input<string>('');
}
```

## Red Flags

- ✗ New components not marked as standalone
- ✗ Missing imports in standalone component
- ✗ Mixing standalone and NgModule components
- ✗ `@NgModule` decorators in new code
- ✗ Providers in component instead of app config

## Verification

- [ ] Component marked with `standalone: true`
- [ ] All used dependencies in `imports`
- [ ] CommonModule imported if using structural directives (@if, @for)
- [ ] FormsModule imported if using ngModel
- [ ] Service dependencies use `inject()`
- [ ] Component has OnPush change detection
- [ ] Tests run successfully
