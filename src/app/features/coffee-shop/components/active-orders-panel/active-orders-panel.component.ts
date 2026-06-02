import { Component, input } from '@angular/core';
import { CoffeeOrder } from '../../models/order.model';
import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge.component';

@Component({
  selector: 'app-active-orders-panel',
  standalone: true,
  imports: [OrderStatusBadgeComponent],
  template: `
    <section class="min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm">
      <div class="mb-5 flex min-w-0 flex-col gap-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Kitchen queue</p>
          <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Active Orders</h2>
        </div>
        <span class="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-sm font-semibold text-[var(--color-gray-700)]">
          {{ orders().length }} active
        </span>
      </div>

      @if (orders().length > 0) {
        <div class="max-w-full overflow-x-auto rounded-2xl border border-[var(--color-gray-300)]">
          <table class="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead class="bg-[var(--color-gray-100)] text-xs uppercase tracking-wide text-[var(--color-gray-500)]">
              <tr>
                <th class="px-4 py-3">Token</th>
                <th class="px-4 py-3">Items</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Barista</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-gray-300)]">
              @for (order of orders(); track order.id) {
                <tr class="text-[var(--color-gray-900)]">
                  <td class="px-4 py-3 font-bold">{{ order.token }}</td>
                  <td class="px-4 py-3">{{ order.items.length }} item(s)</td>
                  <td class="px-4 py-3"><app-order-status-badge [status]="order.status" /></td>
                  <td class="px-4 py-3">{{ order.assignedBaristaName || '-' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="rounded-2xl border border-dashed border-[var(--color-gray-300)] p-6 text-center text-sm text-[var(--color-gray-500)]">
          No active orders yet.
        </div>
      }
    </section>
  `,
})
export class ActiveOrdersPanelComponent {
  readonly orders = input.required<CoffeeOrder[]>();
}
