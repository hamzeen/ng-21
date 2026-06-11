import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveOrdersPanelComponent } from '../../components/active-orders-panel/active-orders-panel.component';
import { BaristaStatusPanelComponent } from '../../components/barista-status-panel/barista-status-panel.component';
import { OrderCreationPanelComponent } from '../../components/order-creation-panel/order-creation-panel.component';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-pos-dashboard-page',
  standalone: true,
  imports: [
    RouterLink,
    ActiveOrdersPanelComponent,
    BaristaStatusPanelComponent,
    OrderCreationPanelComponent,
  ],
  template: `
    <main
      class="min-h-full w-full max-w-full overflow-x-hidden bg-gray-100 px-4 py-8 text-gray-900 sm:px-6 lg:px-8"
    >
      <header
        class="mx-auto mb-6 flex w-full max-w-7xl min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-primary">Coffee Shop</p>
          <h1 class="text-3xl font-bold tracking-tight md:text-4xl">POS Dashboard</h1>
          <p class="mt-2 text-sm text-gray-500">
            Create orders and monitor barista workload from the main terminal.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
          <a
            routerLink="/coffee-shop/barista/tablet-1"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <i aria-hidden="true" class="fa-solid fa-tablet-screen-button text-primary"></i>
            Tablet 1
          </a>
          <a
            routerLink="/coffee-shop/barista/tablet-2"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <i aria-hidden="true" class="fa-solid fa-tablet-screen-button text-primary"></i>
            Tablet 2
          </a>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary-hover"
            (click)="store.seedDemoData()"
          >
            <i aria-hidden="true" class="fa-solid fa-wand-magic-sparkles"></i>
            Seed Demo
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
            (click)="store.resetDay()"
          >
            <i aria-hidden="true" class="fa-solid fa-rotate-left"></i>
            Reset Day
          </button>
        </div>
      </header>

      <section
        class="mx-auto grid w-full max-w-7xl min-w-0 gap-5 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]"
      >
        <app-order-creation-panel />

        <div class="grid w-full min-w-0 gap-5">
          <div class="grid w-full min-w-0 grid-cols-1 gap-4 min-[900px]:grid-cols-3">
            <article
              class="group relative min-w-0 overflow-hidden rounded-3xl border border-warning bg-warning-subtle p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <i
                aria-hidden="true"
                class="fa-solid fa-receipt absolute -right-3 -top-4 text-7xl text-warning opacity-10"
              ></i>
              <div class="relative flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-warning">Pending</p>
                  <p class="mt-2 text-4xl font-bold text-gray-900">
                    {{ store.pendingOrders().length }}
                  </p>
                  <p class="mt-2 text-sm text-gray-700">Waiting to be picked</p>
                </div>
                <span
                  class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-warning shadow-sm"
                >
                  <i aria-hidden="true" class="fa-solid fa-bell"></i>
                </span>
              </div>
            </article>

            <article
              class="group relative min-w-0 overflow-hidden rounded-3xl border border-gray-300 bg-gray-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <i
                aria-hidden="true"
                class="fa-solid fa-mug-hot absolute -right-4 -top-5 text-7xl text-info opacity-10"
              ></i>
              <div class="relative flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-info">In progress</p>
                  <p class="mt-2 text-4xl font-bold text-gray-900">
                    {{ inProgressCount() }}
                  </p>
                  <p class="mt-2 text-sm text-gray-700">Being prepared now</p>
                </div>
                <span
                  class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-info shadow-sm"
                >
                  <i aria-hidden="true" class="fa-solid fa-mug-saucer"></i>
                </span>
              </div>
            </article>

            <a
              routerLink="/coffee-shop/pos/completed-orders"
              class="group relative min-w-0 overflow-hidden rounded-3xl border border-success bg-success-subtle p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              aria-label="View today's completed orders"
            >
              <i
                aria-hidden="true"
                class="fa-solid fa-circle-check absolute -right-4 -top-5 text-7xl text-success opacity-10"
              ></i>
              <div class="relative flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-success">
                    Completed
                  </p>
                  <p class="mt-2 text-4xl font-bold text-gray-900">
                    {{ store.totalCompletedToday() }}
                  </p>
                  <p class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-success">
                    View completed orders
                    <i
                      aria-hidden="true"
                      class="fa-solid fa-arrow-right text-xs transition group-hover:translate-x-0.5"
                    ></i>
                  </p>
                </div>
                <span
                  class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-success shadow-sm"
                >
                  <i aria-hidden="true" class="fa-solid fa-check"></i>
                </span>
              </div>
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
