import { Component, input } from '@angular/core';
import { Barista } from '../../models/barista.model';
import { CoffeeOrder } from '../../models/order.model';

@Component({
  selector: 'app-barista-status-panel',
  standalone: true,
  template: `
    <section class="min-w-0 rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm">
      <div class="mb-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Tablet activity</p>
        <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Baristas</h2>
      </div>

      @if (baristas().length > 0) {
        <div class="grid gap-3 md:grid-cols-2">
          @for (barista of baristas(); track barista.tabletId) {
            <article class="rounded-2xl bg-[var(--color-gray-100)] p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-[var(--color-gray-900)]">{{ barista.name }}</p>
                  <p class="text-xs text-[var(--color-gray-500)]">{{ barista.tabletId }}</p>
                  <p class="mt-1 text-xs text-[var(--color-gray-500)]">Clocked in {{ formatTime(barista.clockedInAt) }}</p>
                </div>
                <span class="rounded-full bg-[var(--color-white)] px-3 py-1 text-xs font-semibold text-[var(--color-gray-700)]">
                  {{ barista.completedCount }} done
                </span>
              </div>

              <div class="mt-4 rounded-xl bg-[var(--color-white)] p-3 text-sm">
                <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Current order</p>
                <p class="mt-1 font-bold text-[var(--color-gray-900)]">
                  {{ activeToken(barista) || 'Available' }}
                </p>
              </div>
            </article>
          }
        </div>
      } @else {
        <div class="rounded-2xl border border-dashed border-[var(--color-gray-300)] p-6 text-center text-sm text-[var(--color-gray-500)]">
          No baristas registered yet.
        </div>
      }
    </section>
  `,
})
export class BaristaStatusPanelComponent {
  readonly baristas = input.required<Barista[]>();
  readonly orders = input.required<CoffeeOrder[]>();

  activeToken(barista: Barista): string | undefined {
    return this.orders().find((order) => order.id === barista.activeOrderId)?.token;
  }

  formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  }
}
