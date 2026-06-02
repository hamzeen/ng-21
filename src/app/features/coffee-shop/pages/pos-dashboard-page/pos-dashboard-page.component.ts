import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveOrdersPanelComponent } from '../../components/active-orders-panel/active-orders-panel.component';
import { BaristaStatusPanelComponent } from '../../components/barista-status-panel/barista-status-panel.component';
import { OrderCreationPanelComponent } from '../../components/order-creation-panel/order-creation-panel.component';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-pos-dashboard-page',
  standalone: true,
  imports: [RouterLink, ActiveOrdersPanelComponent, BaristaStatusPanelComponent, OrderCreationPanelComponent],
  template: `
    <main class="min-h-full w-full max-w-full overflow-x-hidden bg-[var(--color-gray-100)] px-4 py-8 text-[var(--color-gray-900)] sm:px-6 lg:px-8">
      <header class="mx-auto mb-6 flex w-full max-w-7xl min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">Coffee Shop</p>
          <h1 class="text-3xl font-bold tracking-tight md:text-4xl">POS Dashboard</h1>
          <p class="mt-2 text-sm text-[var(--color-gray-500)]">
            Create orders and monitor barista workload from the main terminal.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
          <a
            routerLink="/coffee-shop/barista/tablet-1"
            class="inline-flex items-center justify-center rounded-xl bg-[var(--color-white)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm"
          >
            Tablet 1
          </a>
          <a
            routerLink="/coffee-shop/barista/tablet-2"
            class="inline-flex items-center justify-center rounded-xl bg-[var(--color-white)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm"
          >
            Tablet 2
          </a>
          <button
            type="button"
            class="rounded-xl bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)]"
            (click)="store.seedDemoData()"
          >
            Seed Demo
          </button>
          <button
            type="button"
            class="rounded-xl bg-[var(--color-gray-900)] px-4 py-2 text-sm font-semibold text-[var(--color-white)]"
            (click)="store.resetDay()"
          >
            Reset Day
          </button>
        </div>
      </header>

      <section class="mx-auto grid w-full max-w-7xl min-w-0 gap-5 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <app-order-creation-panel />

        <div class="grid w-full min-w-0 gap-5">
          <div class="grid w-full min-w-0 grid-cols-1 gap-4 min-[900px]:grid-cols-3">
            <article class="min-w-0 rounded-3xl bg-[var(--color-white)] p-5 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Pending</p>
              <p class="mt-2 text-3xl font-bold">{{ store.pendingOrders().length }}</p>
            </article>
            <article class="min-w-0 rounded-3xl bg-[var(--color-white)] p-5 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">In progress</p>
              <p class="mt-2 text-3xl font-bold">{{ inProgressCount() }}</p>
            </article>
            <a
              routerLink="/coffee-shop/pos/completed-orders"
              class="min-w-0 rounded-3xl bg-[var(--color-white)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              aria-label="View today's completed orders"
            >
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Completed</p>
              <p class="mt-2 text-3xl font-bold">{{ store.totalCompletedToday() }}</p>
              <p class="mt-2 text-xs font-semibold text-[var(--color-primary)]">View completed orders</p>
            </a>
          </div>

          <app-active-orders-panel [orders]="store.activeOrders()" />
          <app-barista-status-panel [baristas]="store.baristas()" [orders]="store.orders()" />
        </div>
      </section>
    </main>
  `,
})
export class PosDashboardPageComponent {
  readonly store = inject(CoffeeShopStore);

  inProgressCount(): number {
    return this.store.orders().filter((order) => order.status === 'in-progress').length;
  }
}
