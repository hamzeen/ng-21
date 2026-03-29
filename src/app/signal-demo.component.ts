import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sessionStore } from './stores/session.store';
import { IconComponent } from '../shared/components/icon/icon.component';

const DEFAULT_TODOS: { text: string; completed: boolean }[] = [
  { text: 'buy chocolates', completed: true },
  { text: 'have coffee', completed: false },
];

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './signal-demo.component.html',
  styleUrls: ['./signal-demo.component.css'],
})
export class SignalDemoComponent {
  user = 'Calvin';
  sessionStore = sessionStore;
  todos = signal<{ text: string; completed: boolean }[]>(DEFAULT_TODOS);
  completedCount = computed(() => this.todos().filter((todo) => todo.completed).length);

  pendingCount = computed(() => this.todos().filter((todo) => !todo.completed).length);

  totalCount = computed(() => this.todos().length);

  completionPercent = computed(() => {
    const total = this.totalCount();
    const completed = this.completedCount();

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  });

  addTodo(text: string) {
    sessionStore.updateUserName('Hamzeen');
    const trimmed = text.trim();
    if (trimmed) {
      this.todos.update((todos) => [...todos, { text: trimmed, completed: false }]);
    }
  }

  toggleTodo(index: number) {
    this.todos.update((todos) =>
      todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  removeTodo(index: number) {
    this.todos.update((todos) => todos.filter((_, i) => i !== index));
  }
}
