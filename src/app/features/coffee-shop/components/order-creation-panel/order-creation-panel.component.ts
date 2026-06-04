import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@design-system/components/button';
import { OrderCurrency, OrderItem, PaymentMode } from '../../models/order.model';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-order-creation-panel',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  template: `
    <section
      class="min-w-0 overflow-hidden rounded-3xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-5 shadow-sm"
    >
      <div class="mb-5 flex items-center gap-3">
        <span
          class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
        >
          <i aria-hidden="true" class="fa-solid fa-cash-register"></i>
        </span>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
            Sales terminal
          </p>
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

        <div class="grid gap-3">
          <div
            class="hidden grid-cols-[minmax(0,1fr)_84px_128px_44px] gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)] min-[900px]:grid"
          >
            <span>Item</span>
            <span>Qty</span>
            <span>Unit price</span>
            <span class="sr-only">Actions</span>
          </div>

          @for (item of items(); track item.id) {
            <div
              class="grid min-w-0 gap-2 rounded-2xl bg-[var(--color-gray-100)] p-2 min-[900px]:grid-cols-[minmax(0,1fr)_84px_128px_44px]"
            >
              <input
                class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                [ngModel]="item.name"
                (ngModelChange)="updateItemName(item.id, $event)"
                placeholder="Drink name"
              />

              <input
                type="number"
                min="1"
                class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                [ngModel]="item.quantity"
                (ngModelChange)="updateItemQuantity(item.id, $event)"
                aria-label="Quantity"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                class="min-w-0 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                [ngModel]="item.unitPrice"
                (ngModelChange)="updateItemUnitPrice(item.id, $event)"
                placeholder="Price"
                aria-label="Unit price"
              />

              <button
                type="button"
                class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] text-[var(--color-gray-500)] transition hover:border-[var(--color-danger)] hover:text-[var(--color-danger)]"
                aria-label="Remove item"
                (click)="removeItem(item.id)"
              >
                <i aria-hidden="true" class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          }
        </div>

        <div
          class="flex flex-col gap-3 rounded-3xl bg-[var(--color-primary-subtle)] p-4 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between"
        >
          <div class="min-w-0 min-[640px]:basis-2/3">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
              Total
            </p>
            <p class="mt-1 text-3xl font-bold text-[var(--color-gray-900)]">
              {{ formatCurrency(orderTotal()) }}
            </p>
          </div>

          <p
            class="min-w-0 text-sm leading-5 text-[var(--color-gray-700)] min-[640px]:basis-1/3 min-[640px]:text-right"
          >
            @if (hasValidItems()) {
              Ready for checkout.
            } @else {
              Add item name, quantity and unit price.
            }
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <ds-button variant="secondary" size="md" (clicked)="addItem()">
            <i aria-hidden="true" class="fa-solid fa-plus text-[var(--color-primary)]"></i>
            Add Item
          </ds-button>

          <ds-button size="md" [disabled]="!hasValidItems()" (clicked)="openCheckout()">
            <i aria-hidden="true" class="fa-solid fa-receipt"></i>
            Checkout
          </ds-button>
        </div>
      </div>
    </section>

    @if (isCheckoutOpen()) {
      <div
        class="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm"
        (click)="closeCheckout()"
      ></div>

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-dialog-title"
        class="fixed left-1/2 top-1/2 z-[1001] max-h-[92vh] w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-white p-6 text-[var(--color-gray-900)] shadow-2xl"
      >
        <header class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
              Checkout
            </p>
            <h2 id="checkout-dialog-title" class="mt-1 text-2xl font-bold tracking-tight">
              Confirm payment
            </h2>
            <p class="mt-2 text-sm text-[var(--color-gray-500)]">
              Choose payment and receipt handling in one step.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--color-gray-500)] transition hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)]"
            aria-label="Close checkout"
            (click)="closeCheckout()"
          >
            <i aria-hidden="true" class="fa-solid fa-xmark"></i>
          </button>
        </header>

        <div class="mt-6 rounded-3xl bg-[var(--color-gray-100)] p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
                Order summary
              </p>
              <p class="mt-1 text-lg font-bold">{{ itemCount() }} item(s)</p>
            </div>
            <span
              class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)] shadow-sm"
            >
              <i aria-hidden="true" class="fa-solid fa-bag-shopping"></i>
            </span>
          </div>

          <div class="mt-4 grid gap-2">
            @for (item of validItems(); track item.id) {
              <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm">
                <div class="min-w-0">
                  <p class="truncate font-medium text-[var(--color-gray-900)]">
                    {{ item.name }}
                  </p>
                  <p class="mt-0.5 text-xs text-[var(--color-gray-500)]">
                    {{ item.quantity }} × {{ formatCurrency(item.unitPrice) }}
                  </p>
                </div>
                <span class="font-semibold text-[var(--color-gray-900)]">
                  {{ formatCurrency(lineTotal(item)) }}
                </span>
              </div>
            }
          </div>

          <div class="mt-4 border-t border-[var(--color-gray-300)] pt-4">
            <div class="flex items-center justify-between gap-3">
              <span class="text-sm font-semibold text-[var(--color-gray-700)]">Total payable</span>
              <span class="text-2xl font-bold text-[var(--color-gray-900)]">
                {{ formatCurrency(orderTotal()) }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-3">
          <p class="text-sm font-semibold text-[var(--color-gray-900)]">Payment method</p>

          <div class="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              [class]="paymentModeClass('manual')"
              (click)="selectedPaymentMode.set('manual')"
            >
              <span
                class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)] shadow-sm"
              >
                <i aria-hidden="true" class="fa-solid fa-money-bill-wave"></i>
              </span>
              <span class="min-w-0 text-left">
                <span class="block font-bold">Manual / Cash</span>
                <span class="mt-1 block text-xs text-[var(--color-gray-500)]">Default for now</span>
              </span>
            </button>

            <button
              type="button"
              [class]="paymentModeClass('card')"
              (click)="selectedPaymentMode.set('card')"
            >
              <span
                class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-info)] shadow-sm"
              >
                <i aria-hidden="true" class="fa-solid fa-credit-card"></i>
              </span>
              <span class="min-w-0 text-left">
                <span class="block font-bold">Card / NFC</span>
                <span class="mt-1 block text-xs text-[var(--color-gray-500)]">Coming soon</span>
              </span>
            </button>
          </div>
        </div>

        <label
          class="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-3xl border border-[var(--color-gray-300)] bg-white p-4"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-success-subtle)] text-[var(--color-success)]"
            >
              <i aria-hidden="true" class="fa-solid fa-print"></i>
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-bold text-[var(--color-gray-900)]"
                >Print receipt</span
              >
              <span class="mt-1 block text-xs text-[var(--color-gray-500)]">
                Enabled by default. Placeholder until Electron printing is added.
              </span>
            </span>
          </span>

          <input
            type="checkbox"
            class="h-5 w-5 shrink-0 accent-[var(--color-primary)]"
            [(ngModel)]="shouldPrintReceipt"
          />
        </label>

        @if (selectedPaymentMode() === 'card') {
          <div
            class="mt-5 rounded-3xl border border-[var(--color-warning)] bg-[var(--color-warning-subtle)] p-4 text-sm text-[var(--color-gray-700)]"
          >
            <p class="font-bold text-[var(--color-warning)]">
              <i aria-hidden="true" class="fa-solid fa-circle-info mr-2"></i>
              Card payment is not available yet
            </p>
            <p class="mt-1">
              For this prototype, continuing with card payment will cancel this draft and reset the
              order form.
            </p>
          </div>
        }

        <footer class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ds-button variant="secondary" size="md" (clicked)="closeCheckout()"> Back </ds-button>

          <ds-button
            [variant]="selectedPaymentMode() === 'card' ? 'danger' : 'primary'"
            size="md"
            (clicked)="completeCheckout()"
          >
            @if (selectedPaymentMode() === 'card') {
              <i aria-hidden="true" class="fa-solid fa-ban"></i>
              Cancel order
            } @else {
              <i aria-hidden="true" class="fa-solid fa-check"></i>
              Complete {{ formatCurrency(orderTotal()) }}
            }
          </ds-button>
        </footer>
      </section>
    }
  `,
})
export class OrderCreationPanelComponent {
  private readonly store = inject(CoffeeShopStore);
  private readonly currency: OrderCurrency = 'EUR';

  customerName = '';
  shouldPrintReceipt = true;

  readonly items = signal<OrderItem[]>([this.createEmptyItem()]);
  readonly isCheckoutOpen = signal(false);
  readonly selectedPaymentMode = signal<PaymentMode>('manual');

  readonly validItems = computed(() =>
    this.items().filter(
      (item) => item.name.trim() && Number(item.quantity) > 0 && Number(item.unitPrice) > 0,
    ),
  );
  readonly hasValidItems = computed(() => this.validItems().length > 0);
  readonly itemCount = computed(() =>
    this.validItems().reduce((total, item) => total + Number(item.quantity || 0), 0),
  );
  readonly orderTotal = computed(() =>
    this.validItems().reduce((total, item) => total + this.lineTotal(item), 0),
  );

  addItem(): void {
    this.items.update((items) => [...items, this.createEmptyItem()]);
  }

  removeItem(itemId: string): void {
    this.items.update((items) => items.filter((item) => item.id !== itemId));

    if (this.items().length === 0) {
      this.addItem();
    }
  }

  updateItemName(itemId: string, name: string): void {
    this.updateItem(itemId, { name });
  }

  updateItemQuantity(itemId: string, quantity: string | number): void {
    this.updateItem(itemId, { quantity: this.toPositiveNumber(quantity, 1) });
  }

  updateItemUnitPrice(itemId: string, unitPrice: string | number): void {
    this.updateItem(itemId, { unitPrice: this.toPositiveNumber(unitPrice, 0) });
  }

  lineTotal(item: OrderItem): number {
    return Number(item.quantity || 0) * Number(item.unitPrice || 0);
  }

  openCheckout(): void {
    if (!this.hasValidItems()) {
      return;
    }

    this.selectedPaymentMode.set('manual');
    this.shouldPrintReceipt = true;
    this.isCheckoutOpen.set(true);
  }

  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
  }

  completeCheckout(): void {
    if (this.selectedPaymentMode() === 'card') {
      this.cancelCardPlaceholderOrder();
      return;
    }

    const now = Date.now();
    const printRequested = this.shouldPrintReceipt;

    this.store.createOrder(this.validItems(), this.customerName, {
      paymentMode: 'manual',
      paymentStatus: 'paid',
      paymentCompletedAt: now,
      receiptPrintRequested: printRequested,
      receiptPrintedAt: printRequested ? this.printReceiptPlaceholder() : undefined,
      currency: this.currency,
    });

    if (!printRequested) {
      this.skipPrintPlaceholder();
    }

    this.resetOrderForm();
  }

  paymentModeClass(mode: PaymentMode): string {
    const selected = this.selectedPaymentMode() === mode;
    const selectedClass =
      mode === 'manual'
        ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
        : 'border-[var(--color-info)] bg-[var(--color-info-subtle)]';

    return [
      'flex min-w-0 items-center gap-3 rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm',
      selected ? selectedClass : 'border-[var(--color-gray-300)] bg-white',
    ].join(' ');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: this.currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount || 0);
  }

  private updateItem(itemId: string, patch: Partial<OrderItem>): void {
    this.items.update((items) =>
      items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
    );
  }

  private toPositiveNumber(value: string | number, fallback: number): number {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      return fallback;
    }

    return numericValue;
  }

  private cancelCardPlaceholderOrder(): void {
    this.resetOrderForm();
  }

  private resetOrderForm(): void {
    this.customerName = '';
    this.items.set([this.createEmptyItem()]);
    this.shouldPrintReceipt = true;
    this.selectedPaymentMode.set('manual');
    this.isCheckoutOpen.set(false);
  }

  private printReceiptPlaceholder(): number {
    return Date.now();
  }

  private skipPrintPlaceholder(): void {
    // Placeholder for the future Electron printing integration.
  }

  private createEmptyItem(): OrderItem {
    return {
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
      unitPrice: 0,
    };
  }
}
