import { Component, input } from '@angular/core';
import { Barista } from '../../models/barista.model';
import { CoffeeOrder } from '../../models/order.model';

@Component({
  selector: 'app-barista-status-panel',
  standalone: true,
  template: `
    <section
      class="min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm"
      style="max-width: calc(100vw - 115px);"
    >
      <div class="mb-5 flex items-center gap-3">
        <span
          class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)]"
        >
          <i aria-hidden="true" class="fa-solid fa-users"></i>
        </span>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
            Tablet activity
          </p>
          <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Baristas</h2>
        </div>
      </div>

      @if (baristas().length > 0) {
        <div class="grid min-w-0 gap-3 md:grid-cols-2">
          @for (barista of baristas(); track barista.tabletId) {
            <article [class]="baristaCardClass(barista)">
              <div class="flex items-start justify-between gap-3">
                <div class="flex min-w-0 items-start gap-3">
                  <span
                    class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-white)] text-lg font-bold text-[var(--color-primary)] shadow-sm"
                  >
                    {{ barista.name.charAt(0) }}
                  </span>
                  <div class="min-w-0">
                    <p class="truncate text-base font-bold text-[var(--color-gray-900)]">
                      {{ barista.name }}
                    </p>
                    <p class="text-xs text-[var(--color-gray-500)]">{{ barista.tabletId }}</p>
                    <p
                      class="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-gray-500)]"
                    >
                      <i aria-hidden="true" class="fa-regular fa-clock"></i>
                      Clocked in {{ formatTime(barista.clockedInAt) }}
                    </p>
                  </div>
                </div>
                <span
                  class="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-white)] px-3 py-1 text-xs font-semibold text-[var(--color-success)] shadow-sm"
                >
                  <i aria-hidden="true" class="fa-solid fa-circle-check"></i>
                  {{ barista.completedCount }} done
                </span>
              </div>

              <div class="mt-4 rounded-2xl bg-[var(--color-white)] p-3 text-sm shadow-sm">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                >
                  {{ barista.activeOrderId ? 'Current order' : 'Status' }}
                </p>
                @if (activeToken(barista); as token) {
                  <p class="mt-1 inline-flex items-center gap-2 font-bold text-[var(--color-info)]">
                    <i aria-hidden="true" class="fa-solid fa-mug-hot"></i>
                    {{ token }} in progress
                  </p>
                } @else {
                  <p
                    class="mt-1 inline-flex items-center gap-2 font-bold text-[var(--color-secondary)]"
                  >
                    <i aria-hidden="true" class="fa-solid fa-circle-check"></i>
                    Available
                  </p>
                }
              </div>
            </article>
          }
        </div>
      } @else {
        <div
          class="rounded-2xl border border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-100)] p-6 text-center text-sm text-[var(--color-gray-500)]"
        >
          <i aria-hidden="true" class="fa-solid fa-user-plus mb-2 text-2xl"></i>
          <p>No baristas registered yet.</p>
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

  baristaCardClass(barista: Barista): string {
    return barista.activeOrderId
      ? 'min-w-0 rounded-2xl border border-[var(--color-gray-300)] bg-[var(--color-gray-100)] p-4'
      : 'min-w-0 rounded-2xl border border-[var(--color-gray-300)] bg-[var(--color-secondary-subtle)] p-4';
  }

  formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  }
}
