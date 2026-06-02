import { Component, input, output } from '@angular/core';
import { CoffeeOrder } from '../../models/order.model';
import { OrderCardComponent } from '../order-card/order-card.component';

@Component({
  selector: 'app-current-order-card',
  standalone: true,
  imports: [OrderCardComponent],
  template: `
    <section class="rounded-3xl bg-[var(--color-gray-100)] p-4">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Now making</p>
          <h2 class="text-lg font-bold text-[var(--color-gray-900)]">My Current Order</h2>
        </div>
      </div>

      @if (order()) {
        <app-order-card [order]="order()!" />
        <button
          type="button"
          class="mt-4 w-full rounded-xl bg-[var(--color-success)] px-4 py-3 text-sm font-semibold text-[var(--color-white)]"
          (click)="complete.emit(order()!.id)"
        >
          Mark Completed
        </button>
      } @else {
        <div class="rounded-2xl border border-dashed border-[var(--color-gray-300)] bg-[var(--color-white)] p-6 text-center">
          <p class="text-sm font-medium text-[var(--color-gray-700)]">No active order</p>
          <p class="mt-1 text-sm text-[var(--color-gray-500)]">Pick one from the pending queue.</p>
        </div>
      }
    </section>
  `,
})
export class CurrentOrderCardComponent {
  readonly order = input<CoffeeOrder | undefined>();
  readonly complete = output<string>();
}
