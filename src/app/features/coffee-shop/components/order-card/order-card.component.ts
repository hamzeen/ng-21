import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoffeeOrder } from '../../models/order.model';
import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [DatePipe, OrderStatusBadgeComponent],
  template: `
    <article class="rounded-2xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-4 shadow-sm">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Order</p>
          <h3 class="text-2xl font-bold text-[var(--color-gray-900)]">{{ order().token }}</h3>
          @if (order().customerName) {
            <p class="mt-1 text-sm text-[var(--color-gray-500)]">{{ order().customerName }}</p>
          }
        </div>

        <app-order-status-badge [status]="order().status" />
      </div>

      <ul class="mt-4 space-y-2">
        @for (item of order().items; track item.id) {
          <li class="flex justify-between rounded-xl bg-[var(--color-gray-100)] px-3 py-2 text-sm text-[var(--color-gray-900)]">
            <span>{{ item.name }}</span>
            <span class="font-semibold">× {{ item.quantity }}</span>
          </li>
        }
      </ul>

      <div class="mt-4 flex items-center justify-between text-xs text-[var(--color-gray-500)]">
        <span>{{ order().createdAt | date: 'shortTime' }}</span>
        @if (order().assignedBaristaName) {
          <span>Picked by {{ order().assignedBaristaName }}</span>
        }
      </div>

      @if (showPickAction()) {
        <button
          type="button"
          class="mt-4 w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
          (click)="pick.emit(order().id)"
        >
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
}
