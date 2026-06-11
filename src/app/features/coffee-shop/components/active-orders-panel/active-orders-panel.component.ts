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
      class="min-w-0 overflow-hidden rounded-3xl border border-gray-300 bg-white p-5 shadow-sm"
      style="max-width: calc(100vw - 115px);"
    >
      <div
        class="mb-5 flex min-w-0 flex-col gap-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between"
      >
        <div class="flex min-w-0 items-center gap-3">
          <span
            class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-subtle text-primary"
          >
            <i aria-hidden="true" class="fa-solid fa-fire-burner"></i>
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Kitchen queue</p>
            <h2 class="text-xl font-bold text-gray-900">Active Orders</h2>
          </div>
        </div>
        <span
          class="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700"
        >
          <i aria-hidden="true" class="fa-solid fa-layer-group text-xs text-primary"></i>
          {{ orders().length }} active
        </span>
      </div>

      @if (orders().length > 0) {
        <div class="max-w-full overflow-x-auto rounded-2xl border border-gray-300">
          <table class="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th class="px-4 py-3">Token</th>
                <th class="px-4 py-3">Items</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Barista</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              @for (order of orders(); track order.id) {
                <tr [class]="rowClass(order.status)">
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-bold shadow-sm"
                    >
                      {{ order.token }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-2 text-gray-900">
                      <i aria-hidden="true" class="fa-solid fa-mug-saucer text-gray-500"></i>
                      {{ order.items.length }} item(s)
                    </span>
                  </td>
                  <td class="px-4 py-3"><app-order-status-badge [status]="order.status" /></td>
                  <td class="px-4 py-3">
                    @if (order.assignedBaristaName) {
                      <span class="inline-flex items-center gap-2 font-semibold text-gray-900">
                        <i aria-hidden="true" class="fa-solid fa-user-check text-secondary"></i>
                        {{ order.assignedBaristaName }}
                      </span>
                    } @else {
                      <span class="inline-flex items-center gap-2 font-semibold text-warning">
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
          class="rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-6 text-center text-sm text-gray-500"
        >
          <i aria-hidden="true" class="fa-solid fa-mug-hot mb-2 text-2xl text-gray-500"></i>
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
        return 'bg-warning-subtle text-gray-900';
      case 'in-progress':
        return 'bg-white text-gray-900';
      case 'completed':
        return 'bg-success-subtle text-gray-900';
    }
  }
}
