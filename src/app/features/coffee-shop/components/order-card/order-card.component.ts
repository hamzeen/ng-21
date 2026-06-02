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
            class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-white)] text-lg font-bold text-[var(--color-primary)] shadow-sm"
          >
            {{ order().token }}
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
              Order
            </p>
            <h3 class="text-xl font-bold text-[var(--color-gray-900)]">{{ order().token }}</h3>
            @if (order().customerName) {
              <p class="mt-1 truncate text-sm text-[var(--color-gray-500)]">
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
            class="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-white)] px-3 py-2 text-sm text-[var(--color-gray-900)] shadow-sm"
          >
            <span class="inline-flex min-w-0 items-center gap-2">
              <i
                aria-hidden="true"
                class="fa-solid fa-mug-saucer shrink-0 text-[var(--color-primary)]"
              ></i>
              <span class="truncate">{{ item.name }}</span>
            </span>
            <span
              class="shrink-0 rounded-full bg-[var(--color-gray-100)] px-2 py-0.5 text-xs font-semibold"
              >× {{ item.quantity }}</span
            >
          </li>
        }
      </ul>

      <div
        class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-gray-500)]"
      >
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
          class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
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
        return 'rounded-2xl border border-[var(--color-warning)] bg-[var(--color-warning-subtle)] p-4 shadow-sm';
      case 'in-progress':
        return 'rounded-2xl border border-[var(--color-info)] bg-[var(--color-info-subtle)] p-4 shadow-sm';
      case 'completed':
        return 'rounded-2xl border border-[var(--color-success)] bg-[var(--color-success-subtle)] p-4 shadow-sm';
    }
  }
}
