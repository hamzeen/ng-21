---
name: frontend-ui-engineering
description: Build production-quality user interfaces that are accessible, performant, and visually polished. Use when building UI components, implementing layouts, managing state, or fixing visual/UX issues.
---

# Frontend UI Engineering

## Overview

Build production-quality user interfaces that are accessible, performant, and visually polished. The goal is UI that looks professionally designed, not AI-generated.

## When to Use

- Building new UI components or pages
- Modifying user-facing interfaces
- Implementing responsive layouts
- Adding interactivity or state management
- Fixing visual or UX issues

## Component Architecture

### File Structure

Colocate everything related to a component:

```
src/components/
  TaskList/
    TaskList.tsx          # Component implementation
    TaskList.test.tsx     # Tests
    TaskList.stories.tsx  # Storybook stories
    use-task-list.ts      # Custom hook (if complex state)
    types.ts              # Component-specific types
```

### Component Patterns

**Prefer composition over configuration**:

```typescript
// ✓ Good: Composable
<Card>
  <CardHeader>
    <CardTitle>Tasks</CardTitle>
  </CardHeader>
  <CardBody>
    <TaskList tasks={tasks} />
  </CardBody>
</Card>

// ✗ Avoid: Over-configured
<Card
  title="Tasks"
  headerVariant="large"
  bodyPadding="md"
  content={<TaskList tasks={tasks} />}
/>
```

**Keep components focused**:

```typescript
// ✓ Good: Does one thing
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 p-3">
      <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />
      <span className={task.done ? 'line-through text-muted' : ''}>
        {task.title}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
        <TrashIcon />
      </Button>
    </li>
  );
}
```

**Separate data fetching from presentation**:

```typescript
// Container: handles data
export function TaskListContainer() {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) return <TaskListSkeleton />;
  if (error) return <ErrorState message="Failed to load tasks" />;
  if (tasks.length === 0) return <EmptyState message="No tasks yet" />;

  return <TaskList tasks={tasks} />;
}

// Presentation: handles rendering
export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul role="list" className="divide-y">
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
```

## State Management Hierarchy

Choose the simplest approach that works:

```
Local state (signal)       → Component-specific UI state
Lifted state               → Shared between 2-3 siblings
Context                    → Theme, auth, locale (read-heavy)
URL searchParams           → Filters, pagination (shareable)
Server state (RxJS)        → Remote data with caching
```

**Avoid prop drilling deeper than 3 levels.** If passing through components that don't use them, introduce context or restructure.

## Avoiding the "AI Aesthetic"

AI-generated UI has recognizable patterns. Avoid all of them:

| AI Default               | Problem                 | Production Quality              |
| ------------------------ | ----------------------- | ------------------------------- |
| Purple/indigo everything | Generic, identical apps | Use project's actual palette    |
| Excessive gradients      | Visual noise            | Flat or subtle gradients        |
| Rounded everything       | Ignores hierarchy       | Consistent border-radius system |
| Generic hero sections    | Template-driven         | Content-first layouts           |
| Lorem ipsum copy         | Hides layout problems   | Realistic placeholder content   |
| Oversized padding        | Destroys hierarchy      | Consistent spacing scale        |
| Stock card grids         | Ignores priority        | Purpose-driven layouts          |

## Design System Adherence

### Spacing and Layout

Use consistent spacing scale. Don't invent values:

```css
/* Use the scale: 0.25rem increments (or project standard) */
padding: 1rem; /* 16px ✓ Good */
gap: 0.75rem; /* 12px ✓ Good */
padding: 13px; /* Not on scale ✗ Bad */
margin-top: 2.3rem; /* Not on scale ✗ Bad */
```

### Typography

Respect the type hierarchy:

```
h1 → Page title (one per page)
h2 → Section title
h3 → Subsection title
body → Default text
small → Secondary/helper text
```

Never skip heading levels. Never use heading styles for non-heading content.

### Color

- Use semantic color tokens: `text-primary`, `bg-surface`, `border-default`
- Ensure sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color (use icons, text, patterns too)

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation

```typescript
// Every interactive element must be keyboard accessible
<button onClick={handleClick}>Click me</button>        // ✓ Focusable
<div onClick={handleClick}>Click me</div>             // ✗ Not focusable
```

### ARIA Labels

```typescript
// Label interactive elements lacking visible text
<button aria-label="Close dialog"><XIcon /></button>

// Label form inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Alert/Live Regions
<div role="alert" aria-live="polite">
  {statusMessage}
</div>
```

### Focus Management

```typescript
// Move focus when content changes
function Dialog({ isOpen, onClose }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  return (
    <dialog open={isOpen}>
      <button ref={closeRef} onClick={onClose}>Close</button>
    </dialog>
  );
}
```

### Meaningful Empty and Error States

```typescript
// Don't show blank screens
function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div role="status" className="text-center py-12">
        <TasksEmptyIcon className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-sm font-medium">No tasks</h3>
        <p className="mt-1 text-sm">Get started by creating a new task.</p>
        <Button className="mt-4" onClick={onCreateTask}>
          Create Task
        </Button>
      </div>
    );
  }

  return <ul role="list">...</ul>;
}
```

## Responsive Design

Design mobile-first, then expand:

```css
/* Tailwind: mobile-first responsive */
grid-cols-1          /* Mobile: single column */
sm:grid-cols-2       /* Small: 2 columns */
lg:grid-cols-3       /* Large: 3 columns */
gap-4
```

Test at breakpoints: 320px, 768px, 1024px, 1440px.

## Loading and Transitions

```typescript
// Skeleton loading (not spinners for content)
function TaskListSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading tasks">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-12 bg-muted animate-pulse rounded" />
      ))}
    </div>
  );
}

// Optimistic updates for perceived speed
function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
      );

      return { previous };
    },
    onError: (_err, _taskId, context) => {
      queryClient.setQueryData(['tasks'], context?.previous);
    },
  });
}
```

## Red Flags

- Components with >200 lines (split them)
- Inline styles or arbitrary pixel values
- Missing error/loading/empty states
- No keyboard navigation testing
- Color as sole indicator of state
- Generic "AI look" (purple gradients, oversized cards)

## Verification

- [ ] Component renders without console errors
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader conveys content and structure
- [ ] Responsive: works at 320px, 768px, 1024px, 1440px
- [ ] Loading, error, and empty states handled
- [ ] Follows project's design system (spacing, colors, typography)
- [ ] No accessibility warnings in dev tools or axe-core
