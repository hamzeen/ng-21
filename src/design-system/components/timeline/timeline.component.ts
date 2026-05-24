import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineIcon, TimelineItem } from './timeline.types';

@Component({
  selector: 'ds-timeline',
  standalone: true,
  template: `
    <section
      class="w-full rounded-3xl border border-[var(--color-border-default)] bg-[var(--color-bg-base)] p-5 shadow-sm sm:p-6 lg:p-8"
    >
      @if (heading()) {
        <header class="mb-8">
          @if (eyebrow()) {
            <p
              class="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]"
            >
              {{ eyebrow() }}
            </p>
          }

          <h2
            class="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
          >
            {{ heading() }}
          </h2>

          @if (description()) {
            <p class="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              {{ description() }}
            </p>
          }
        </header>
      }

      <ol class="relative">
        @for (item of items(); track item.title; let last = $last; let index = $index) {
          <li class="relative flex gap-4 pb-8 last:pb-0 sm:gap-6 sm:pb-10">
            @if (!last) {
              <span
                aria-hidden="true"
                class="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-[var(--color-border-default)] sm:left-6 sm:top-[52px] sm:h-[calc(100%-3.25rem)]"
              ></span>
            }

            <div
              class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-base)] text-[var(--color-text-link)] shadow-sm sm:h-12 sm:w-12"
            >
              @switch (item.icon ?? fallbackIcon(index)) {
                @case ('mail') {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                    <path
                      d="m6.5 8 5.5 4 5.5-4"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }

                @case ('work') {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5.75 7h12.5A1.75 1.75 0 0 1 20 8.75v8.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25v-8.5A1.75 1.75 0 0 1 5.75 7Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                    <path
                      d="M9 12h6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                }

                @case ('done') {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }

                @case ('home') {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 11.25 12 5l8 6.25"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.5 10.5V19h11v-8.5"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }

                @case ('calendar') {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 4v3M17 4v3M5 9h14M6.75 6h10.5A2.75 2.75 0 0 1 20 8.75v8.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25v-8.5A2.75 2.75 0 0 1 6.75 6Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                }

                @default {
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m12 4 2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 16l-4.7 2.45.9-5.23-3.8-3.7 5.25-.76L12 4Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              }
            </div>

            <article class="min-w-0 flex-1 pt-1">
              <h3
                class="text-lg font-semibold leading-7 tracking-tight text-[var(--color-text-primary)] sm:text-xl"
              >
                {{ item.title }}
              </h3>

              <p
                class="mt-1 max-w-3xl break-words text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base sm:leading-7"
              >
                {{ item.description }}
              </p>
            </article>
          </li>
        }
      </ol>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  heading = input<string>('');
  eyebrow = input<string>('Timeline');
  description = input<string>('');
  items = input<TimelineItem[]>([]);

  protected fallbackIcon(index: number): TimelineIcon {
    const icons: TimelineIcon[] = ['mail', 'work', 'done'];
    return icons[index % icons.length];
  }
}
