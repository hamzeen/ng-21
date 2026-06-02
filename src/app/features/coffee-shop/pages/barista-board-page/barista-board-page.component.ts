import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CurrentOrderCardComponent } from '../../components/current-order-card/current-order-card.component';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-barista-board-page',
  standalone: true,
  imports: [RouterLink, CurrentOrderCardComponent, OrderCardComponent],
  template: `
    <main class="min-h-screen bg-[var(--color-gray-100)] p-4 text-[var(--color-gray-900)] md:p-8">
      <header class="mx-auto mb-6 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">{{ tabletId }}</p>
          <h1 class="text-3xl font-bold tracking-tight md:text-4xl">Barista Board</h1>
          @if (barista()) {
            <p class="mt-2 text-sm text-[var(--color-gray-500)]">
              Signed in as <strong class="text-[var(--color-gray-900)]">{{ barista()!.name }}</strong>
              @if (barista()?.clockedInAt) {
                <span> · Clocked in {{ formatTime(barista()!.clockedInAt) }}</span>
              }
            </p>
          }
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="rounded-xl bg-[var(--color-white)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm">
            Done: {{ barista()?.completedCount ?? 0 }}
          </span>
          <a
            routerLink="/coffee-shop/pos"
            class="rounded-xl bg-[var(--color-white)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] shadow-sm"
          >
            POS
          </a>
        </div>
      </header>

      @if (!barista()) {
        <section class="mx-auto max-w-5xl rounded-3xl bg-[var(--color-white)] p-6 text-center shadow-sm">
          <h2 class="text-xl font-bold">Name required</h2>
          <p class="mt-2 text-sm text-[var(--color-gray-500)]">Start your shift before picking orders.</p>
          <button
            type="button"
            class="mt-4 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)]"
            (click)="goToEntry()"
          >
            Enter Name
          </button>
        </section>
      } @else {
        <section class="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[360px_1fr]">
          <app-current-order-card [order]="currentOrder()" (complete)="completeOrder($event)" />

          <section class="rounded-3xl bg-[var(--color-white)] p-5 shadow-sm">
            <div class="mb-5 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Choose your next work</p>
                <h2 class="text-xl font-bold">Pending Orders</h2>
              </div>
              <span class="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-sm font-semibold text-[var(--color-gray-700)]">
                {{ store.pendingOrders().length }} waiting
              </span>
            </div>

            @if (message()) {
              <div class="mb-4 rounded-2xl bg-[var(--color-primary-subtle)] px-4 py-3 text-sm font-medium text-[var(--color-primary-active)]">
                {{ message() }}
              </div>
            }

            @if (store.pendingOrders().length > 0) {
              <div class="grid gap-4 md:grid-cols-2">
                @for (order of store.pendingOrders(); track order.id) {
                  <app-order-card [order]="order" [showPickAction]="!currentOrder()" (pick)="pickOrder($event)" />
                }
              </div>
            } @else {
              <div class="rounded-2xl border border-dashed border-[var(--color-gray-300)] p-8 text-center">
                <p class="text-sm font-medium text-[var(--color-gray-700)]">No pending orders</p>
                <p class="mt-1 text-sm text-[var(--color-gray-500)]">New orders will appear here.</p>
              </div>
            }
          </section>
        </section>
      }
    </main>
  `,
})
export class BaristaBoardPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly store = inject(CoffeeShopStore);

  readonly tabletId = this.route.snapshot.paramMap.get('tabletId') ?? 'tablet-1';
  readonly message = signal('');

  readonly barista = computed(() => this.store.getBarista(this.tabletId));
  readonly currentOrder = computed(() => this.store.getCurrentOrderForBarista(this.tabletId));

  ngOnInit(): void {
    this.store.ensureBaristaFromTodaysShift(this.tabletId);
  }

  pickOrder(orderId: string): void {
    const result = this.store.claimOrder(orderId, this.tabletId);
    this.message.set(result.message);
  }

  completeOrder(orderId: string): void {
    this.store.completeOrder(orderId, this.tabletId);
    this.message.set('Order completed. Pick another order when ready.');
  }

  goToEntry(): void {
    this.router.navigate(['/coffee-shop/barista', this.tabletId]);
  }

  formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  }
}
