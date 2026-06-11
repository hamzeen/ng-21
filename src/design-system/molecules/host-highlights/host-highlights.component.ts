import { Component, input } from '@angular/core';

export type HostHighlightItem = {
  icon: string;
  title: string;
  description: string;
};

@Component({
  selector: 'ds-host-highlights',
  standalone: true,
  template: `
    <section class="w-full max-w-4xl border-y border-gray-300 py-8 font-sans">
      <!-- Host -->
      <div class="flex items-center gap-6 border-b border-gray-300 pb-8">
        <img
          class="h-16 w-16 rounded-full object-cover"
          [src]="avatarUrl()"
          [alt]="hostName() + ' logo'"
        />

        <div>
          <h2 class="m-0 text-xl font-bold tracking-tight text-gray-900">
            Hosted by {{ hostName() }}
          </h2>

          <p class="mt-1 text-sm leading-6 text-gray-500">
            {{ meta() }}
          </p>
        </div>
      </div>

      <!-- Highlights -->
      <div class="grid gap-7 pt-8">
        @for (item of items(); track item.title) {
          <article class="grid grid-cols-[40px_1fr] items-start gap-6">
            <i [class]="item.icon + ' text-center text-2xl leading-none text-gray-900'"></i>

            <div>
              <h3 class="m-0 text-base font-semibold tracking-tight text-gray-900">
                {{ item.title }}
              </h3>

              <p class="mt-1 text-sm leading-6 text-gray-500">
                {{ item.description }}
              </p>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class HostHighlightsComponent {
  readonly hostName = input('Excellence Holiday Homes');
  readonly meta = input('Superhost · 10 months hosting');
  readonly avatarUrl = input('https://i.pravatar.cc/96?img=30');

  readonly items = input<HostHighlightItem[]>([
    {
      icon: 'fa-solid fa-fire-flame-curved',
      title: 'Outdoor entertainment',
      description: 'The pool, BBQ area, and outdoor seating are great for summer trips.',
    },
    {
      icon: 'fa-solid fa-key',
      title: 'Great check-in experience',
      description: 'Recent guests loved the smooth start to this stay.',
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Beautiful area',
      description: 'Guests love this home’s scenic location.',
    },
  ]);
}
