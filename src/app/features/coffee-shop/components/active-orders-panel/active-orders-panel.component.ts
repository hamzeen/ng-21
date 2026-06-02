import { Component, input } from '@angular/core';
import { CoffeeOrder } from '../../models/order.model';
import { OrderStatus } from '../../models/order-status.model';
import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge.component';

@Component({
  selector: 'app-active-orders-panel',
  standalone: true,
  imports: [OrderStatusBadgeComponent],
  template: `
    <section
      class="min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm"
      style="max-width: calc(100vw - 115px);"
    >
      <div
        class="mb-5 flex min-w-0 flex-col gap-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between"
      >
        <div class="flex min-w-0 items-center gap-3">
          <span
            class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
          >
            <i aria-hidden="true" class="fa-solid fa-fire-burner"></i>
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
              Kitchen queue
            </p>
            <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Active Orders</h2>
          </div>
        </div>
        <span
          class="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-sm font-semibold text-[var(--color-gray-700)]"
        >
          <i
            aria-hidden="true"
            class="fa-solid fa-layer-group text-xs text-[var(--color-primary)]"
          ></i>
          {{ orders().length }} active
        </span>
      </div>

      @if (orders().length > 0) {
        <div class="max-w-full overflow-x-auto rounded-2xl border border-[var(--color-gray-300)]">
          <table class="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead
              class="bg-[var(--color-gray-100)] text-xs uppercase tracking-wide text-[var(--color-gray-500)]"
            >
              <tr>
                <th class="px-4 py-3">Token</th>
                <th class="px-4 py-3">Items</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Barista</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-gray-300)]">
              @for (order of orders(); track order.id) {
                <tr [class]="rowClass(order.status)">
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-white)] text-sm font-bold shadow-sm"
                    >
                      {{ order.token }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-2 text-[var(--color-gray-900)]">
                      <i
                        aria-hidden="true"
                        class="fa-solid fa-mug-saucer text-[var(--color-gray-500)]"
                      ></i>
                      {{ order.items.length }} item(s)
                    </span>
                  </td>
                  <td class="px-4 py-3"><app-order-status-badge [status]="order.status" /></td>
                  <td class="px-4 py-3">
                    @if (order.assignedBaristaName) {
                      <span
                        class="inline-flex items-center gap-2 font-semibold text-[var(--color-gray-900)]"
                      >
                        <i
                          aria-hidden="true"
                          class="fa-solid fa-user-check text-[var(--color-secondary)]"
                        ></i>
                        {{ order.assignedBaristaName }}
                      </span>
                    } @else {
                      <span
                        class="inline-flex items-center gap-2 font-semibold text-[var(--color-warning)]"
                      >
                        <i aria-hidden="true" class="fa-solid fa-bell"></i>
                        Not picked
                      </span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div
          class="rounded-2xl border border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-100)] p-6 text-center text-sm text-[var(--color-gray-500)]"
        >
          <i
            aria-hidden="true"
            class="fa-solid fa-mug-hot mb-2 text-2xl text-[var(--color-gray-500)]"
          ></i>
          <p>No active orders yet.</p>
        </div>
      }
    </section>
  `,
})
export class ActiveOrdersPanelComponent {
  readonly orders = input.required<CoffeeOrder[]>();

  rowClass(status: OrderStatus): string {
    switch (status) {
      case 'pending':
        return 'bg-[var(--color-warning-subtle)] text-[var(--color-gray-900)]';
      case 'in-progress':
        return 'bg-[var(--color-white)] text-[var(--color-gray-900)]';
      case 'completed':
        return 'bg-[var(--color-success-subtle)] text-[var(--color-gray-900)]';
    }
  }
}
