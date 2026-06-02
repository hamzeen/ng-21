import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoffeeOrder } from '../../models/order.model';
import { CoffeeShopStore, FulfillmentMetric } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-completed-orders-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <main class="h-screen overflow-y-auto bg-[var(--color-gray-100)] p-4 text-[var(--color-gray-900)] md:p-8">
      <header class="mx-auto mb-6 flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">Coffee Shop</p>
          <h1 class="text-3xl font-bold tracking-tight md:text-4xl">Completed Orders</h1>
          <p class="mt-2 text-sm text-[var(--color-gray-500)]">
            Review today's fulfilled orders and barista performance from pickup to completion.
          </p>
        </div>

        <a
          routerLink="/coffee-shop/pos"
          class="inline-flex items-center justify-center rounded-xl bg-[var(--color-white)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm"
        >
          Back to POS
        </a>
      </header>

      <section class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article class="rounded-3xl bg-[var(--color-white)] p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Today</p>
          <h2 class="mt-1 text-xl font-bold">Average fulfilment time</h2>

          <div class="mt-5 flex flex-wrap items-end gap-4">
            <p class="text-4xl font-bold tracking-tight">
              {{ formatDuration(store.dailyFulfillmentSummary().averageFulfillmentMs) }}
            </p>
            <p class="pb-1 text-sm text-[var(--color-gray-500)]">
              across {{ store.dailyFulfillmentSummary().completedOrders }} completed order(s)
            </p>
          </div>

          <p class="mt-4 text-sm text-[var(--color-gray-500)]">
            Total pickup-to-completion time:
            <span class="font-semibold text-[var(--color-gray-700)]">
              {{ formatDuration(store.dailyFulfillmentSummary().totalFulfillmentMs) }}
            </span>
          </p>
        </article>

        <article class="rounded-3xl bg-[var(--color-white)] p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Leaderboard</p>
          <h2 class="mt-1 text-xl font-bold">Best performer today</h2>
          <p class="mt-1 text-sm text-[var(--color-gray-500)]">Ranked by completed orders first, then average fulfilment time.</p>

          @if (store.dailyFulfillmentSummary().bestPerformer; as bestPerformer) {
            <div class="mt-5 rounded-2xl bg-[var(--color-secondary-subtle)] p-4">
              <p class="text-2xl font-bold text-[var(--color-secondary)]">{{ bestPerformer.baristaName }}</p>
              <p class="mt-1 text-sm text-[var(--color-gray-700)]">
                {{ bestPerformer.completedOrders }} completed order(s) · Avg.
                {{ formatDuration(bestPerformer.averageFulfillmentMs) }}
              </p>
            </div>
          } @else {
            <div class="mt-5 rounded-2xl border border-dashed border-[var(--color-gray-300)] p-4 text-sm text-[var(--color-gray-500)]">
              No completed orders with fulfilment time yet.
            </div>
          }
        </article>
      </section>

      <section class="mx-auto mt-5 max-w-7xl rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Fulfilled today</p>
            <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Completed Orders Table</h2>
          </div>
          <span class="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-sm font-semibold text-[var(--color-gray-700)]">
            {{ store.completedOrdersToday().length }} completed
          </span>
        </div>

        @if (store.completedOrdersToday().length > 0) {
          <div class="overflow-x-auto rounded-2xl border border-[var(--color-gray-300)]">
            <table class="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead class="bg-[var(--color-gray-100)] text-xs uppercase tracking-wide text-[var(--color-gray-500)]">
                <tr>
                  <th class="px-4 py-3">Token</th>
                  <th class="px-4 py-3">Items</th>
                  <th class="px-4 py-3">Barista</th>
                  <th class="px-4 py-3">Created</th>
                  <th class="px-4 py-3">Picked</th>
                  <th class="px-4 py-3">Fulfilled</th>
                  <th class="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--color-gray-300)]">
                @for (order of store.completedOrdersToday(); track order.id) {
                  <tr class="text-[var(--color-gray-900)]">
                    <td class="px-4 py-3 font-bold">{{ order.token }}</td>
                    <td class="px-4 py-3">{{ order.items.length }} item(s)</td>
                    <td class="px-4 py-3">{{ order.assignedBaristaName || '-' }}</td>
                    <td class="px-4 py-3">{{ order.createdAt | date: 'shortTime' }}</td>
                    <td class="px-4 py-3">{{ order.claimedAt ? (order.claimedAt | date: 'shortTime') : '-' }}</td>
                    <td class="px-4 py-3">{{ order.completedAt ? (order.completedAt | date: 'shortTime') : '-' }}</td>
                    <td class="px-4 py-3 font-semibold">{{ fulfillmentTime(order) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div class="rounded-2xl border border-dashed border-[var(--color-gray-300)] p-8 text-center text-sm text-[var(--color-gray-500)]">
            No orders have been completed today yet.
          </div>
        }
      </section>

      @if (store.dailyFulfillmentSummary().leaderboard.length > 0) {
        <section class="mx-auto mt-5 max-w-7xl rounded-3xl bg-[var(--color-white)] p-5 shadow-sm">
          <div class="mb-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Ranking</p>
            <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Barista fulfilment leaderboard</h2>
            <p class="mt-1 text-sm text-[var(--color-gray-500)]">More completed orders wins. Average time is used as the tie-breaker.</p>
          </div>

          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            @for (barista of store.dailyFulfillmentSummary().leaderboard; track barista.tabletId) {
              <article class="rounded-2xl border border-[var(--color-gray-300)] p-4">
                <p class="text-lg font-bold">{{ barista.baristaName }}</p>
                <p class="mt-1 text-sm text-[var(--color-gray-500)]">{{ barista.completedOrders }} completed order(s)</p>
                <p class="mt-3 text-sm font-semibold text-[var(--color-gray-700)]">
                  Avg. {{ formatDuration(barista.averageFulfillmentMs) }}
                </p>
              </article>
            }
          </div>
        </section>
      }
    </main>
  `,
})
export class CompletedOrdersPageComponent {
  readonly store = inject(CoffeeShopStore);

  fulfillmentTime(order: CoffeeOrder): string {
    if (!order.claimedAt || !order.completedAt) {
      return '-';
    }

    return this.formatDuration(order.completedAt - order.claimedAt);
  }

  formatDuration(durationMs: number): string {
    if (!durationMs || durationMs < 0) {
      return '0m';
    }

    const totalSeconds = Math.round(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds}s`;
    }

    if (seconds === 0) {
      return `${minutes}m`;
    }

    return `${minutes}m ${seconds}s`;
  }
}
