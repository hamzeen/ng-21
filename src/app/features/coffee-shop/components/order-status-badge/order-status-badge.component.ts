import { Component, input } from '@angular/core';
import { OrderStatus, ORDER_STATUS_LABEL } from '../../models/order-status.model';

@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  template: `
    <span [class]="statusClass()">
      {{ label() }}
    </span>
  `,
})
export class OrderStatusBadgeComponent {
  readonly status = input.required<OrderStatus>();

  label(): string {
    return ORDER_STATUS_LABEL[this.status()];
  }

  statusClass(): string {
    switch (this.status()) {
      case 'pending':
        return 'inline-flex items-center rounded-full bg-[var(--color-gray-100)] px-2.5 py-1 text-xs font-semibold text-[var(--color-gray-700)]';
      case 'in-progress':
        return 'inline-flex items-center rounded-full bg-[var(--color-secondary-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--color-secondary-hover)]';
      case 'completed':
        return 'inline-flex items-center rounded-full bg-[var(--color-success-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--color-success)]';
    }
  }
}
