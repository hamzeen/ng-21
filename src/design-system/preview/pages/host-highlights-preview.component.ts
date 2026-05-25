import { Component } from '@angular/core';
import {
  HostHighlightsComponent,
  HostHighlightItem,
} from '@design-system/organisms/host-highlights';

@Component({
  selector: 'ds-host-highlights-preview',
  standalone: true,
  imports: [HostHighlightsComponent],
  template: `
    <div class="max-w-4xl">
      <h1 class="preview-title">Host Highlights</h1>

      <p class="preview-desc">
        A simple organism for presenting host identity and stay highlights. Useful for listing
        detail pages, property summaries, and booking confidence sections.
      </p>

      <!-- ── Default ───────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Default</h2>
        <p class="ds-section-desc">
          Shows host metadata followed by three contextual highlights with supporting icons.
        </p>

        <ds-host-highlights />
      </section>

      <!-- ── Custom host ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Custom host</h2>
        <p class="ds-section-desc">
          Host name, meta information, avatar and highlight items can be customized from the parent.
        </p>

        <ds-host-highlights
          hostName="Maya"
          meta="Superhost · 4 years hosting"
          avatarUrl="https://i.pravatar.cc/96?img=47"
          [items]="customHostHighlights"
        />
      </section>

      <!-- ── Long descriptions ─────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Long descriptions</h2>
        <p class="ds-section-desc">
          Description text wraps naturally while keeping the icon column stable.
        </p>

        <ds-host-highlights
          hostName="Urban Stay Collective"
          meta="Verified host · 2 years hosting"
          avatarUrl="https://i.pravatar.cc/96?img=56"
          [items]="longHighlights"
        />
      </section>

      <!-- ── Component API ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label mb-4">Component API</h2>

        <div class="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <div
            class="grid grid-cols-3 bg-gray-50 px-5 py-3
                   text-xs font-semibold uppercase tracking-wider text-gray-400
                   border-b border-gray-200"
          >
            <span>Input</span>
            <span>Type</span>
            <span>Description</span>
          </div>

          @for (row of apiRows; track row.input) {
            <div
              class="grid grid-cols-3 px-5 py-3 text-sm
                     border-b border-gray-100 last:border-0
                     hover:bg-gray-50 transition-colors"
            >
              <code class="font-mono text-xs" style="color: #ff385c;">{{ row.input }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.type }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-title {
        font-size: 28px;
        font-weight: 700;
        color: #222;
        margin-bottom: 8px;
      }

      .preview-desc {
        font-size: 14px;
        color: #767676;
        line-height: 1.6;
        margin-bottom: 2.5rem;
      }

      .ds-section-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #9ca3af;
        margin-bottom: 4px;
      }

      .ds-section-desc {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class HostHighlightsPreviewComponent {
  readonly customHostHighlights: HostHighlightItem[] = [
    {
      icon: 'fa-solid fa-medal',
      title: 'Highly rated host',
      description: 'Guests consistently rate Maya highly for communication and care.',
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Fast responses',
      description: 'Usually responds within an hour.',
    },
    {
      icon: 'fa-solid fa-shield-heart',
      title: 'Trusted stay',
      description: 'A reliable choice for short city breaks and weekend trips.',
    },
  ];

  readonly longHighlights: HostHighlightItem[] = [
    {
      icon: 'fa-solid fa-house-chimney-window',
      title: 'Designed for longer stays',
      description:
        'The home includes practical amenities, calm shared spaces, and flexible sleeping arrangements for guests staying more than a few nights.',
    },
    {
      icon: 'fa-solid fa-route',
      title: 'Easy access to the city',
      description:
        'Guests can reach restaurants, transport links, and local attractions without needing to plan complicated transfers.',
    },
    {
      icon: 'fa-solid fa-comments',
      title: 'Clear communication',
      description:
        'The host provides simple arrival instructions, helpful local tips, and responsive support throughout the stay.',
    },
  ];

  readonly apiRows = [
    {
      input: 'hostName',
      type: 'string',
      description: 'Name of the host or hosting company.',
    },
    {
      input: 'meta',
      type: 'string',
      description: 'Secondary host information, such as Superhost status or hosting duration.',
    },
    {
      input: 'avatarUrl',
      type: 'string',
      description: 'Image URL for the host avatar or company logo.',
    },
    {
      input: 'items',
      type: 'HostHighlightItem[]',
      description: 'List of highlight rows with icon, title and description.',
    },
  ];
}
