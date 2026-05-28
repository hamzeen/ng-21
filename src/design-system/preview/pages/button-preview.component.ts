import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@design-system/components/button';

@Component({
  selector: 'ds-button-preview',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="preview-page">
      <!-- Title -->
      <h1 class="preview-title">Button</h1>
      <p class="text-sm text-gray-500 leading-relaxed mb-10">
        A flexible, accessible button component. Supports variants, sizes, full width, icon-only
        actions, label input and custom projected content via
        <code class="ds-code">ng-content</code>.
      </p>

      <!-- ── Variants ───────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Variants</h2>
        <p class="ds-section-desc">
          Three intent-based variants —
          <code class="ds-code">primary</code> for main CTAs,
          <code class="ds-code">secondary</code> for supporting actions,
          <code class="ds-code">tertiary</code> for low-emphasis actions, and
          <code class="ds-code">danger</code> for destructive operations.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="primary">Reserve</ds-button>
          <ds-button variant="secondary">Save draft</ds-button>
          <ds-button variant="tertiary">Learn more</ds-button>
          <ds-button variant="danger">Delete</ds-button>
        </div>
      </section>

      <!-- ── Sizes ──────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Sizes</h2>
        <p class="ds-section-desc">
          Three size options —
          <code class="ds-code">sm</code>, <code class="ds-code">md</code> (default),
          <code class="ds-code">lg</code>.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="primary" size="sm">Small</ds-button>
          <ds-button variant="primary" size="md">Medium</ds-button>
          <ds-button variant="primary" size="lg">Large</ds-button>
        </div>
      </section>

      <!-- ── Disabled ───────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Disabled</h2>
        <p class="ds-section-desc">
          All variants respect the <code class="ds-code">[disabled]</code> input. Cursor changes to
          <code class="ds-code">not-allowed</code> and interactions are blocked.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="primary" [disabled]="true">Primary</ds-button>
          <ds-button variant="secondary" [disabled]="true">Secondary</ds-button>
          <ds-button variant="danger" [disabled]="true">Danger</ds-button>
        </div>
      </section>

      <!-- ── Full Width ─────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Full Width</h2>
        <p class="ds-section-desc">
          Use <code class="ds-code">[fullWidth]="true"</code> for block-level buttons — forms,
          mobile CTAs, confirmation dialogs.
        </p>
        <div class="max-w-sm">
          <ds-button variant="primary" size="lg" [fullWidth]="true">Continue</ds-button>
        </div>
      </section>

      <!-- ── Label Input ────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Label Input</h2>
        <p class="ds-section-desc">
          Pass <code class="ds-code">label</code> as an input instead of projected content for
          simple one-liner usage with no template needed.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="primary" label="Reserve" />
          <ds-button variant="secondary" label="Save draft" />
          <ds-button variant="danger" label="Delete" />
        </div>
      </section>

      <!-- ── Custom Content ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Custom Content</h2>
        <p class="ds-section-desc">
          Project any markup via <code class="ds-code">ng-content</code> — icons, badges, emoji,
          arrows. The button handles layout automatically.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="secondary">
            <span aria-hidden="true">★</span>
            <span>Save to wishlist</span>
          </ds-button>
          <ds-button variant="primary">
            <span>Reserve now</span>
            <span aria-hidden="true">→</span>
          </ds-button>
          <ds-button variant="secondary">
            <span aria-hidden="true">↗</span>
            <span>Share listing</span>
          </ds-button>
        </div>
      </section>

      <!-- ── Icon Only ─────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Icon Only</h2>
        <p class="ds-section-desc">
          Use <code class="ds-code">[iconOnly]="true"</code> for compact circular actions such as
          search, filters, back, close or favourite. Always provide
          <code class="ds-code">ariaLabel</code>.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <ds-button variant="primary" size="sm" [iconOnly]="true" ariaLabel="Search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </ds-button>

          <ds-button variant="primary" size="md" [iconOnly]="true" ariaLabel="Search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </ds-button>

          <ds-button variant="primary" size="lg" [iconOnly]="true" ariaLabel="Search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </ds-button>

          <ds-button variant="secondary" size="md" [iconOnly]="true" ariaLabel="Open filters">
            <i class="fa-solid fa-sliders" aria-hidden="true"></i>
          </ds-button>

          <ds-button variant="tertiary" size="md" [iconOnly]="true" ariaLabel="Go back">
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </ds-button>

          <ds-button variant="danger" size="md" [iconOnly]="true" ariaLabel="Delete">
            <i class="fa-solid fa-trash" aria-hidden="true"></i>
          </ds-button>
        </div>
      </section>

      <!-- ── API Reference ──────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label mb-4">API Reference</h2>
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div
            class="grid grid-cols-4 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Input</span>
            <span>Type</span>
            <span>Default</span>
            <span>Description</span>
          </div>
          @for (row of apiRows; track row.input) {
            <div
              class="grid grid-cols-4 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0
                        hover:bg-gray-50 transition-colors"
            >
              <code class="text-pink-500 font-mono text-xs">{{ row.input }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.type }}</code>
              <code class="text-gray-400 font-mono text-xs">{{ row.default }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-page {
        max-width: 720px;
      }
      .preview-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
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
      .ds-code {
        background: #f4f4f4;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 12px;
        font-family: monospace;
        color: #ff385c;
      }
    `,
  ],
})
export class ButtonPreviewComponent {
  apiRows = [
    {
      input: 'variant',
      type: 'ButtonVariant',
      default: "'primary'",
      description: 'primary | secondary | tertiary | danger',
    },
    { input: 'size', type: 'ButtonSize', default: "'md'", description: 'sm | md | lg' },
    {
      input: 'label',
      type: 'string',
      default: '—',
      description: 'Text shorthand — alternative to ng-content',
    },
    {
      input: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables interaction and dims the button',
    },
    {
      input: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Stretches button to full container width',
    },
    {
      input: 'iconOnly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the button circular for icon-only actions',
    },
    {
      input: 'ariaLabel',
      type: 'string',
      default: "''",
      description: 'Accessible label for icon-only buttons',
    },
  ];
}
