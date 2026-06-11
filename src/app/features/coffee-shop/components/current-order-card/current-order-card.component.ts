import { Component, input, output } from '@angular/core';
import { CoffeeOrder } from '../../models/order.model';
import { OrderCardComponent } from '../order-card/order-card.component';

@Component({
  selector: 'app-current-order-card',
  standalone: true,
  imports: [OrderCardComponent],
  template: `
    <section class="rounded-3xl bg-primary-subtle p-4">
      <div class="mb-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm"
          >
            <i aria-hidden="true" class="fa-solid fa-mug-hot"></i>
          </span>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-primary">Now making</p>
            <h2 class="text-lg font-bold text-gray-900">My Current Order</h2>
          </div>
        </div>
      </div>

      @if (order()) {
        <app-order-card [order]="order()!" />
        <button
          type="button"
          class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          (click)="complete.emit(order()!.id)"
        >
          <i aria-hidden="true" class="fa-solid fa-circle-check"></i>
          Mark Completed
        </button>
      } @else {
        <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
          <i aria-hidden="true" class="fa-solid fa-hand-pointer mb-3 text-2xl text-primary"></i>
          <p class="text-sm font-medium text-gray-700">No active order</p>
          <p class="mt-1 text-sm text-gray-500">Pick one from the pending queue.</p>
        </div>
      }
    </section>
  `,
})
export class CurrentOrderCardComponent {
  readonly order = input<CoffeeOrder | undefined>();
  readonly complete = output<string>();
}
