import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoffeeOrder } from '../../models/order.model';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-completed-orders-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <main
      class="h-screen overflow-y-auto bg-[var(--color-gray-100)] p-4 text-[var(--color-gray-900)] md:p-8"
    >
      <header
        class="mx-auto mb-6 flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Coffee Shop
          </p>
          <h1 class="text-3xl font-bold tracking-tight md:text-4xl">Completed Orders</h1>
          <p class="mt-2 text-sm text-[var(--color-gray-500)]">
            Review today's fulfilled orders and barista performance from pickup to completion.
          </p>
        </div>

        <a
          routerLink="/coffee-shop/pos"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <i aria-hidden="true" class="fa-solid fa-arrow-left text-[var(--color-primary)]"></i>
          Back to POS
        </a>
      </header>

      <section class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        <article
          class="relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm"
        >
          <i
            aria-hidden="true"
            class="fa-solid fa-stopwatch pointer-events-none absolute -right-5 -top-5 text-9xl text-[var(--color-primary)] opacity-5"
          ></i>

          <div class="relative flex h-full flex-1 flex-col">
            <div class="flex items-start gap-4">
              <span
                class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-xl text-[var(--color-primary)]"
              >
                <i aria-hidden="true" class="fa-solid fa-stopwatch"></i>
              </span>

              <div class="min-w-0">
                <p
                  class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]"
                >
                  Average
                </p>
                <h2 class="mt-1 text-xl font-bold">Serving Time</h2>
              </div>
            </div>

            <div class="flex flex-1 items-center justify-center py-8 text-center">
              <p class="text-4xl font-bold tracking-tight md:text-5xl">
                {{ formatDuration(store.dailyFulfillmentSummary().averageFulfillmentMs) }}
              </p>
            </div>

            <div class="mt-auto border-t border-[var(--color-gray-300)] pt-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="flex min-w-0 items-center gap-3">
                  <span
                    class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
                  >
                    <i aria-hidden="true" class="fa-solid fa-bag-shopping"></i>
                  </span>

                  <div class="min-w-0">
                    <p class="text-xl font-bold">
                      {{ store.dailyFulfillmentSummary().completedOrders }}
                    </p>
                    <p class="text-sm text-[var(--color-gray-500)]">Orders</p>
                  </div>
                </div>

                <div
                  class="flex min-w-0 items-center gap-3 border-l border-[var(--color-gray-300)] pl-4"
                >
                  <span
                    class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
                  >
                    <i aria-hidden="true" class="fa-solid fa-clock"></i>
                  </span>

                  <div class="min-w-0">
                    <p class="truncate text-xl font-bold">
                      {{ formatDuration(store.dailyFulfillmentSummary().totalFulfillmentMs) }}
                    </p>
                    <p class="text-sm text-[var(--color-gray-500)]">Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article
          class="relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm"
        >
          <i
            aria-hidden="true"
            class="fa-solid fa-star pointer-events-none absolute -right-5 -top-5 text-9xl text-[var(--color-secondary)] opacity-5"
          ></i>

          <div class="relative flex h-full flex-1 flex-col">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
              Leaderboard
            </p>
            <h2 class="mt-1 text-xl font-bold">Best performer today</h2>

            @if (store.dailyFulfillmentSummary().bestPerformer; as bestPerformer) {
              <div
                class="mt-6 overflow-hidden rounded-3xl bg-[var(--color-primary-subtle)] p-5 md:p-6"
              >
                <div class="flex min-w-0 items-center gap-4">
                  <span
                    class="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl text-white shadow-sm"
                  >
                    <i aria-hidden="true" class="fa-solid fa-trophy"></i>
                  </span>

                  <div class="min-w-0">
                    <span
                      class="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                    >
                      Top performer
                    </span>

                    <p
                      class="mt-3 truncate text-3xl font-bold tracking-tight text-[var(--color-gray-900)] md:text-4xl"
                    >
                      {{ bestPerformer.baristaName }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-auto border-t border-[var(--color-gray-300)] pt-6">
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex min-w-0 items-center gap-3">
                    <span
                      class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
                    >
                      <i aria-hidden="true" class="fa-solid fa-bag-shopping"></i>
                    </span>

                    <div class="min-w-0">
                      <p class="text-xl font-bold">{{ bestPerformer.completedOrders }}</p>
                      <p class="text-sm text-[var(--color-gray-500)]">Orders</p>
                    </div>
                  </div>

                  <div
                    class="flex min-w-0 items-center gap-3 border-l border-[var(--color-gray-300)] pl-4"
                  >
                    <span
                      class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
                    >
                      <i aria-hidden="true" class="fa-solid fa-clock"></i>
                    </span>

                    <div class="min-w-0">
                      <p class="truncate text-xl font-bold">
                        {{ formatDuration(bestPerformer.averageFulfillmentMs) }}
                      </p>
                      <p class="text-sm text-[var(--color-gray-500)]">Avg</p>
                    </div>
                  </div>
                </div>
              </div>
            } @else {
              <div
                class="mt-5 rounded-2xl border border-dashed border-[var(--color-gray-300)] p-4 text-sm text-[var(--color-gray-500)]"
              >
                No completed orders with fulfilment time yet.
              </div>
            }
          </div>
        </article>
      </section>

      <section
        class="mx-auto mt-5 max-w-7xl rounded-3xl border border-[var(--color-gray-300)] bg-white p-5 shadow-sm"
      >
        <div class="mb-5 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-success-subtle)] text-[var(--color-success)]"
            >
              <i aria-hidden="true" class="fa-solid fa-clipboard-check"></i>
            </span>

            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
                Fulfilled today
              </p>
              <h2 class="text-xl font-bold">Completed Orders Table</h2>
            </div>
          </div>

          <span
            class="rounded-full bg-[var(--color-success-subtle)] px-3 py-1 text-sm font-semibold text-[var(--color-success)]"
          >
            {{ store.completedOrdersToday().length }} completed
          </span>
        </div>

        @if (store.completedOrdersToday().length > 0) {
          <div class="overflow-x-auto rounded-2xl border border-[var(--color-gray-300)]">
            <table class="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead
                class="bg-[var(--color-gray-100)] text-xs uppercase tracking-wide text-[var(--color-gray-500)]"
              >
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
                  <tr>
                    <td class="px-4 py-3 font-bold">{{ order.token }}</td>

                    <td class="px-4 py-3">
                      <span class="inline-flex items-center gap-2">
                        <i
                          aria-hidden="true"
                          class="fa-solid fa-mug-saucer text-[var(--color-gray-500)]"
                        ></i>
                        {{ order.items.length }} item(s)
                      </span>
                    </td>

                    <td class="px-4 py-3">
                      <span class="inline-flex items-center gap-2">
                        <i
                          aria-hidden="true"
                          class="fa-solid fa-user-check text-[var(--color-secondary)]"
                        ></i>
                        {{ order.assignedBaristaName || '-' }}
                      </span>
                    </td>

                    <td class="px-4 py-3">{{ order.createdAt | date: 'shortTime' }}</td>
                    <td class="px-4 py-3">
                      {{ order.claimedAt ? (order.claimedAt | date: 'shortTime') : '-' }}
                    </td>
                    <td class="px-4 py-3">
                      {{ order.completedAt ? (order.completedAt | date: 'shortTime') : '-' }}
                    </td>
                    <td class="px-4 py-3 font-semibold text-[var(--color-success)]">
                      {{ fulfillmentTime(order) }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div
            class="rounded-2xl border border-dashed border-[var(--color-gray-300)] p-8 text-center text-sm text-[var(--color-gray-500)]"
          >
            No orders have been completed today yet.
          </div>
        }
      </section>

      @if (store.dailyFulfillmentSummary().leaderboard.length > 0) {
        <section class="mx-auto mt-5 max-w-7xl rounded-3xl bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-center gap-3">
            <span
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)]"
            >
              <i aria-hidden="true" class="fa-solid fa-ranking-star"></i>
            </span>

            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
                Ranking
              </p>
              <h2 class="text-xl font-bold">Barista fulfilment leaderboard</h2>
              <p class="mt-1 text-sm text-[var(--color-gray-500)]">
                More completed orders wins. Average time is used as the tie-breaker.
              </p>
            </div>
          </div>

          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            @for (
              barista of store.dailyFulfillmentSummary().leaderboard;
              track barista.tabletId;
              let index = $index
            ) {
              <article
                class="relative min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                [class.bg-[var(--color-secondary-subtle)]]="index === 0"
              >
                <i
                  aria-hidden="true"
                  class="fa-solid fa-fire pointer-events-none absolute -right-4 -top-5 text-8xl text-[var(--color-secondary)] opacity-[0.05]"
                ></i>

                <div class="relative min-w-0 space-y-4">
                  <div class="flex min-w-0 items-center gap-3">
                    <span
                      class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-bold text-[var(--color-secondary)] shadow-sm"
                    >
                      #{{ index + 1 }}
                    </span>

                    <p class="min-w-0 truncate text-xl font-bold">
                      {{ barista.baristaName }}
                    </p>

                    @if (index === 0) {
                      <span
                        class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-secondary)] shadow-sm"
                        title="Current leader"
                      >
                        <i aria-hidden="true" class="fa-solid fa-medal"></i>
                      </span>
                    }
                  </div>

                  <p class="inline-flex items-center gap-2 text-sm text-[var(--color-gray-700)]">
                    <i
                      aria-hidden="true"
                      class="fa-solid fa-circle-check text-[var(--color-success)]"
                    ></i>
                    {{ barista.completedOrders }} completed order(s)
                  </p>

                  <div>
                    <span
                      class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--color-secondary)] shadow-sm"
                    >
                      <i aria-hidden="true" class="fa-solid fa-stopwatch"></i>
                      Avg. {{ formatDuration(barista.averageFulfillmentMs) }}
                    </span>
                  </div>
                </div>
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
