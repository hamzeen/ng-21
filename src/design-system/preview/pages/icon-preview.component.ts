import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@design-system/components/icon';
import { IconSize } from '@shared/icon-system/icon.types';

@Component({
  selector: 'app-icon-doc',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="max-w-4xl">
      <!-- Title -->
      <h1 class="preview-title">Icons</h1>
      <p class="preview-desc">
        SVG icon component driven by a registry. Supports multiple sizes and inherits color via
        <code class="ds-code">currentColor</code> — use any Tailwind text utility to colorize.
      </p>

      <!-- ── Available Icons ────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Available Icons</h2>
        <p class="ds-section-desc">
          All icons registered in <code class="ds-code">icon.registry.ts</code>. Click any icon to
          copy its name to clipboard.
        </p>
        <div class="grid grid-cols-3 gap-4">
          @for (icon of icons; track icon) {
            <div
              class="relative flex flex-col items-center gap-3 rounded-xl p-6
             bg-gray-50 border border-transparent
             hover:bg-white hover:border-gray-200 hover:shadow-sm
             transition-all duration-200 cursor-pointer"
              (click)="copyToClipboard(icon)"
              [title]="'Click to copy ' + icon"
            >
              <!-- copied badge -->
              <span
                class="absolute top-3 right-3 text-xs font-semibold text-white
               bg-gray-900 px-2 py-0.5 rounded-full
               transition-opacity duration-200"
                [class.opacity-0]="copiedIcon !== icon"
                [class.opacity-100]="copiedIcon === icon"
              >
                ✓ Copied!
              </span>

              <app-icon [name]="icon" size="l" />
              <span class="text-xs text-gray-500 font-mono">{{ icon }}</span>
            </div>
          }
        </div>
      </section>

      <!-- ── Sizes ──────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Sizes</h2>
        <p class="ds-section-desc">
          Three size options via the <code class="ds-code">size</code> input —
          <code class="ds-code">s</code> (8px), <code class="ds-code">m</code> (16px),
          <code class="ds-code">l</code> (24px).
        </p>
        <div class="grid grid-cols-3 gap-4">
          @for (size of sizes; track size.value) {
            <div
              class="flex flex-col items-center gap-3 rounded-xl p-6
                        bg-gray-50 border border-gray-100"
            >
              <app-icon name="house" [size]="size.value" />
              <span class="text-xs text-gray-500">{{ size.label }}</span>
              <code class="text-xs font-mono" style="color: #FF385C;">size="{{ size.value }}"</code>
            </div>
          }
        </div>
      </section>

      <!-- ── Colors ─────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Colors</h2>
        <p class="ds-section-desc">
          Icons inherit color via <code class="ds-code">currentColor</code>. Apply any Tailwind
          <code class="ds-code">text-*</code> utility or
          <code class="ds-code">var(--color-*)</code> token directly on the component.
        </p>
        <div class="flex flex-wrap gap-4">
          @for (swatch of colorSwatches; track swatch.label) {
            <div
              class="flex flex-col items-center gap-3 rounded-xl p-6 border"
              [class]="swatch.bg"
              [style.border-color]="swatch.border"
            >
              <app-icon name="house" size="l" [class]="swatch.class" />
              <span class="text-xs font-mono" [style.color]="swatch.labelColor">{{
                swatch.label
              }}</span>
            </div>
          }
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
              <code class="font-mono text-xs" style="color: #FF385C;">{{ row.input }}</code>
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
export class IconDocComponent {
  copiedIcon = '';

  icons = ['house', 'user', 'speedometer'];

  sizes: { value: IconSize; label: string }[] = [
    { value: 's', label: 'Small — 8px' },
    { value: 'm', label: 'Medium — 16px' },
    { value: 'l', label: 'Large — 24px' },
  ];

  colorSwatches = [
    {
      label: 'text-gray-900',
      class: 'text-gray-900',
      bg: 'bg-white',
      border: '#e5e7eb',
      labelColor: '#374151',
    },
    {
      label: 'text-rose-500',
      class: 'text-rose-500',
      bg: 'bg-white',
      border: '#e5e7eb',
      labelColor: '#374151',
    },
    {
      label: 'text-blue-500',
      class: 'text-blue-500',
      bg: 'bg-white',
      border: '#e5e7eb',
      labelColor: '#374151',
    },
    {
      label: 'text-white',
      class: 'text-white',
      bg: 'bg-gray-900',
      border: '#111827',
      labelColor: '#9ca3af',
    },
    {
      label: 'text-green-500',
      class: 'text-green-500',
      bg: 'bg-white',
      border: '#e5e7eb',
      labelColor: '#374151',
    },
    {
      label: 'text-amber-500',
      class: 'text-amber-500',
      bg: 'bg-white',
      border: '#e5e7eb',
      labelColor: '#374151',
    },
  ];

  apiRows = [
    {
      input: 'name',
      type: 'string',
      default: '—',
      description: 'Icon name as registered in icon.registry.ts',
    },
    {
      input: 'size',
      type: 'IconSize',
      default: "'m'",
      description: 's (8px) | m (16px) | l (24px)',
    },
  ];

  copyToClipboard(icon: string): void {
    navigator.clipboard.writeText(icon).then(() => {
      this.copiedIcon = icon;
      setTimeout(() => (this.copiedIcon = ''), 1500);
    });
  }
}
