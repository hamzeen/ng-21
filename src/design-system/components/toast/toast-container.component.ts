import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastItem } from './toast.types';

const MAX_TOASTS = 5;

@Component({
  selector: 'ds-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ds-toast-container" aria-label="Notifications" role="region">
      @for (toast of toasts; track toast.id) {
        <ds-toast [toast]="toast" (dismissed)="remove($event)"> </ds-toast>
      }
    </div>
  `,
  styles: [
    `
      .ds-toast-container {
        position: fixed;
        bottom: var(--space-6);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: var(--space-3);
        z-index: 9999;
        pointer-events: none;

        ds-toast {
          pointer-events: all;
        }
      }
    `,
  ],
})
export class ToastContainerComponent {
  toasts: ToastItem[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  add(toast: ToastItem): void {
    this.toasts = [toast, ...this.toasts].slice(0, MAX_TOASTS);
    this.cdr.markForCheck();
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.cdr.markForCheck();
  }
}
