import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeShopStore } from '../../store/coffee-shop.store';

@Component({
  selector: 'app-barista-entry-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="grid min-h-screen place-items-center bg-[var(--color-gray-100)] p-4">
      <section class="w-full max-w-md rounded-3xl bg-[var(--color-white)] p-6 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">{{ tabletId }}</p>
        <h1 class="mt-2 text-3xl font-bold text-[var(--color-gray-900)]">Good morning</h1>
        <p class="mt-2 text-sm text-[var(--color-gray-500)]">
          Enter your name once at the start of the day. This tablet will remember your shift until tomorrow.
        </p>

        <label class="mt-6 grid gap-2 text-sm font-medium text-[var(--color-gray-700)]">
          Barista name
          <input
            class="rounded-xl border border-[var(--color-gray-300)] px-3 py-3 text-base outline-none focus:border-[var(--color-primary)]"
            [ngModel]="name()"
            (ngModelChange)="name.set($event)"
            placeholder="Ex: Nimal"
            autofocus
          />
        </label>

        <button
          type="button"
          class="mt-5 w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
          (click)="startShift()"
        >
          Start Shift
        </button>
      </section>
    </main>
  `,
})
export class BaristaEntryPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(CoffeeShopStore);

  readonly tabletId = this.route.snapshot.paramMap.get('tabletId') ?? 'tablet-1';
  readonly name = signal('');

  ngOnInit(): void {
    const todaysSession = this.store.getTodaysShiftSession(this.tabletId);

    if (todaysSession) {
      this.store.ensureBaristaFromTodaysShift(this.tabletId);
      this.router.navigate(['/coffee-shop/barista', this.tabletId, 'board'], { replaceUrl: true });
      return;
    }

    this.name.set(this.store.getLastKnownBaristaName(this.tabletId));
  }

  startShift(): void {
    const baristaName = this.name().trim();

    if (!baristaName) {
      return;
    }

    this.store.registerBarista(this.tabletId, baristaName);
    this.router.navigate(['/coffee-shop/barista', this.tabletId, 'board']);
  }
}
