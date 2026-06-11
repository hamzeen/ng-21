import { Component, input } from '@angular/core';
import { OrderStatus, ORDER_STATUS_LABEL } from '../../models/order-status.model';

@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  template: `
    <span [class]="statusClass()">
      <i aria-hidden="true" [class]="iconClass()"></i>
      {{ label() }}
    </span>
  `,
})
export class OrderStatusBadgeComponent {
  readonly status = input.required<OrderStatus>();

  label(): string {
    return ORDER_STATUS_LABEL[this.status()];
  }

  iconClass(): string {
    switch (this.status()) {
      case 'pending':
        return 'fa-solid fa-receipt text-[0.65rem]';
      case 'in-progress':
        return 'fa-solid fa-mug-hot text-[0.65rem]';
      case 'completed':
        return 'fa-solid fa-circle-check text-[0.65rem]';
    }
  }

  statusClass(): string {
    switch (this.status()) {
      case 'pending':
        return 'inline-flex items-center gap-1.5 rounded-full bg-warning-subtle px-2.5 py-1 text-xs font-semibold text-warning';
      case 'in-progress':
        return 'inline-flex items-center gap-1.5 rounded-full bg-info-subtle px-2.5 py-1 text-xs font-semibold text-info';
      case 'completed':
        return 'inline-flex items-center gap-1.5 rounded-full bg-success-subtle px-2.5 py-1 text-xs font-semibold text-success';
    }
  }
}
