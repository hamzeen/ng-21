import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoffeeShopStore } from '../../store/coffee-shop.store';
import { OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-creation-panel',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm">
      <div class="mb-5 flex items-center gap-3">
        <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
          <i aria-hidden="true" class="fa-solid fa-cash-register"></i>
        </span>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">Sales terminal</p>
          <h2 class="text-xl font-bold text-[var(--color-gray-900)]">Create Order</h2>
        </div>
      </div>

      <div class="grid gap-4">
        <label class="grid gap-1 text-sm font-medium text-[var(--color-gray-700)]">
          Customer / token note
          <input
            class="min-w-0 rounded-xl border border-[var(--color-gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
            [(ngModel)]="customerName"
            placeholder="Walk-in, Table 3, A customer name..."
          />
        </label>

        @for (item of items(); track item.id) {
          <div class="grid min-w-0 gap-2 rounded-2xl bg-[var(--color-gray-100)] p-2 min-[900px]:grid-cols-[minmax(0,1fr)_88px_auto]">
            <input
              class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
              [(ngModel)]="item.name"
              placeholder="Drink name"
            />
            <input
              type="number"
              min="1"
              class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
              [(ngModel)]="item.quantity"
            />
            <button
              type="button"
              class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm font-semibold text-[var(--color-gray-700)]"
              (click)="removeItem(item.id)"
            >
              Remove
            </button>
          </div>
        }

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-[var(--color-gray-300)] px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)]"
            (click)="addItem()"
          >
            <i aria-hidden="true" class="fa-solid fa-plus text-[var(--color-primary)]"></i>
            Add Item
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
            (click)="createOrder()"
          >
            <i aria-hidden="true" class="fa-solid fa-receipt"></i>
            Create Order
          </button>
        </div>
      </div>
    </section>
  `,
})
export class OrderCreationPanelComponent {
  private readonly store = inject(CoffeeShopStore);

  customerName = '';
  readonly items = signal<OrderItem[]>([this.createEmptyItem()]);

  addItem(): void {
    this.items.update((items) => [...items, this.createEmptyItem()]);
  }

  removeItem(itemId: string): void {
    this.items.update((items) => items.filter((item) => item.id !== itemId));

    if (this.items().length === 0) {
      this.addItem();
    }
  }

  createOrder(): void {
    const validItems = this.items().filter((item) => item.name.trim() && item.quantity > 0);

    if (validItems.length === 0) {
      return;
    }

    this.store.createOrder(validItems, this.customerName);
    this.customerName = '';
    this.items.set([this.createEmptyItem()]);
  }

  private createEmptyItem(): OrderItem {
    return {
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
    };
  }
}
