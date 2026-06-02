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
      <section class="relative w-full max-w-md overflow-hidden rounded-3xl bg-[var(--color-white)] p-6 shadow-sm">
        <i aria-hidden="true" class="fa-solid fa-mug-hot absolute -right-5 -top-6 text-8xl text-[var(--color-primary)] opacity-5"></i>
        <div class="relative">
          <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
            <i aria-hidden="true" class="fa-solid fa-tablet-screen-button"></i>
          </span>
          <p class="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">{{ tabletId }}</p>
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
            class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
            (click)="startShift()"
          >
            <i aria-hidden="true" class="fa-solid fa-play"></i>
            Start Shift
          </button>
        </div>
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
