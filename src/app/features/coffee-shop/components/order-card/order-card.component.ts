import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CoffeeOrder } from '../../models/order.model';
import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [DatePipe, OrderStatusBadgeComponent],
  template: `
    <article [class]="cardClass()">
      <div class="relative flex items-start justify-between gap-4">
        <div class="flex min-w-0 items-start gap-3">
          <span
            class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-bold text-primary shadow-sm"
          >
            {{ order().token }}
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Order</p>
            <h3 class="text-xl font-bold text-gray-900">{{ order().token }}</h3>
            @if (order().customerName) {
              <p class="mt-1 truncate text-sm text-gray-500">
                {{ order().customerName }}
              </p>
            }
          </div>
        </div>

        <app-order-status-badge [status]="order().status" />
      </div>

      <ul class="mt-4 space-y-2">
        @for (item of order().items; track item.id) {
          <li
            class="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm text-gray-900 shadow-sm"
          >
            <span class="inline-flex min-w-0 items-center gap-2">
              <i aria-hidden="true" class="fa-solid fa-mug-saucer shrink-0 text-primary"></i>
              <span class="truncate">{{ item.name }}</span>
            </span>
            <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold"
              >× {{ item.quantity }}</span
            >
          </li>
        }
      </ul>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span class="inline-flex items-center gap-1">
          <i aria-hidden="true" class="fa-regular fa-clock"></i>
          {{ order().createdAt | date: 'shortTime' }}
        </span>
        @if (order().assignedBaristaName) {
          <span class="inline-flex items-center gap-1">
            <i aria-hidden="true" class="fa-solid fa-user-check"></i>
            Picked by {{ order().assignedBaristaName }}
          </span>
        }
      </div>

      @if (showPickAction()) {
        <button
          type="button"
          class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:bg-primary-active"
          (click)="pick.emit(order().id)"
        >
          <i aria-hidden="true" class="fa-solid fa-hand"></i>
          Pick Order
        </button>
      }
    </article>
  `,
})
export class OrderCardComponent {
  readonly order = input.required<CoffeeOrder>();
  readonly showPickAction = input(false);
  readonly pick = output<string>();

  cardClass(): string {
    switch (this.order().status) {
      case 'pending':
        return 'rounded-2xl border border-warning bg-warning-subtle p-4 shadow-sm';
      case 'in-progress':
        return 'rounded-2xl border border-info bg-info-subtle p-4 shadow-sm';
      case 'completed':
        return 'rounded-2xl border border-success bg-success-subtle p-4 shadow-sm';
    }
  }
}
