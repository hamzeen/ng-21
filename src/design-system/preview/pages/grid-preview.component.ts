import { Component } from '@angular/core';

@Component({
  selector: 'ds-grid-preview',
  standalone: true,
  template: `
    <div class="max-w-5xl">
      <h1 class="preview-title">Grid</h1>
      <p class="preview-desc">
        A 12-column CSS grid system built on design tokens. Use
        <code class="ds-code">ds-grid</code> as the row and
        <code class="ds-code">ds-col-*</code> for columns. Responsive prefixes
        <code class="ds-code">sm:</code>, <code class="ds-code">md:</code>,
        <code class="ds-code">lg:</code>, <code class="ds-code">xl:</code> work just like Tailwind.
      </p>

      <!-- ── Container ──────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Container</h2>
        <p class="ds-section-desc">
          <code class="ds-code">ds-container</code> centers content with responsive horizontal
          padding — <code class="ds-code">24px</code> mobile,
          <code class="ds-code">40px</code> tablet, <code class="ds-code">80px</code> desktop. Max
          width <code class="ds-code">1280px</code>.
        </p>
        <div class="ds-container bg-rose-50 border border-rose-200 rounded-xl py-4">
          <div class="bg-rose-200 rounded-lg text-center py-3 text-xs font-mono text-rose-700">
            ds-container
          </div>
        </div>
      </section>

      <!-- ── 12 Columns ─────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">12 Columns</h2>
        <p class="ds-section-desc">
          All 12 columns at equal width using <code class="ds-code">ds-col-1</code>.
        </p>
        <div class="ds-grid">
          @for (col of cols12; track col) {
            <div
              class="ds-col-1 bg-rose-100 border border-rose-200
                        rounded py-3 text-center text-xs font-mono text-rose-600"
            >
              {{ col }}
            </div>
          }
        </div>
      </section>

      <!-- ── Common Layouts ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Common Layouts</h2>
        <p class="ds-section-desc">Frequently used column splits.</p>
        <div class="flex flex-col gap-3">
          @for (layout of layouts; track layout.label) {
            <div class="flex flex-col gap-2">
              <span class="text-xs text-gray-400 font-mono">{{ layout.label }}</span>
              <div class="ds-grid">
                @for (col of layout.cols; track $index) {
                  <div
                    class="bg-rose-100 border border-rose-200 rounded
                           py-4 text-center text-xs font-mono text-rose-600"
                    [class]="col"
                  >
                    {{ col }}
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Responsive ─────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Responsive</h2>
        <p class="ds-section-desc">
          <code class="ds-code">ds-col-12</code> on mobile →
          <code class="ds-code">md:ds-col-6</code> on tablet →
          <code class="ds-code">lg:ds-col-4</code> on desktop. Resize the window to see columns
          reflow.
        </p>
        <div class="ds-grid">
          @for (card of cards; track card) {
            <div
              class="ds-col-12 md:ds-col-6 lg:ds-col-4
                        bg-gray-50 border border-gray-200 rounded-xl p-5"
            >
              <div class="w-8 h-8 rounded-full bg-rose-100 mb-3"></div>
              <div class="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          }
        </div>
      </section>

      <!-- ── Offset ─────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Offset</h2>
        <p class="ds-section-desc">
          Push columns using <code class="ds-code">ds-col-offset-*</code>. Useful for centered
          layouts and asymmetric compositions.
        </p>
        <div class="flex flex-col gap-3">
          <div>
            <span class="text-xs text-gray-400 font-mono mb-2 block">
              ds-col-6 + ds-col-offset-3 — centered
            </span>
            <div class="ds-grid">
              <div
                class="ds-col-6 ds-col-offset-3
                          bg-rose-100 border border-rose-200 rounded
                          py-4 text-center text-xs font-mono text-rose-600"
              >
                ds-col-6 ds-col-offset-3
              </div>
            </div>
          </div>

          <div>
            <span class="text-xs text-gray-400 font-mono mb-2 block">
              ds-col-4 + ds-col-offset-8 — right aligned
            </span>
            <div class="ds-grid">
              <div
                class="ds-col-4 ds-col-offset-8
                          bg-rose-100 border border-rose-200 rounded
                          py-4 text-center text-xs font-mono text-rose-600"
              >
                ds-col-4 ds-col-offset-8
              </div>
            </div>
          </div>

          <div>
            <span class="text-xs text-gray-400 font-mono mb-2 block">
              ds-col-8 + ds-col-offset-2 — article width
            </span>
            <div class="ds-grid">
              <div
                class="ds-col-8 ds-col-offset-2
                          bg-rose-100 border border-rose-200 rounded
                          py-4 text-center text-xs font-mono text-rose-600"
              >
                ds-col-8 ds-col-offset-2
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Nested Grid ────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Nested Grid</h2>
        <p class="ds-section-desc">
          Grids can be nested — a <code class="ds-code">ds-col</code> can contain another
          <code class="ds-code">ds-grid</code>. Gutters are inherited.
        </p>
        <div class="ds-grid">
          <div class="ds-col-8 bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p class="text-xs font-mono text-rose-400 mb-3">ds-col-8 (parent)</p>
            <div class="ds-grid">
              <div
                class="ds-col-6 bg-rose-200 rounded py-3
                          text-center text-xs font-mono text-rose-700"
              >
                ds-col-6
              </div>
              <div
                class="ds-col-6 bg-rose-200 rounded py-3
                          text-center text-xs font-mono text-rose-700"
              >
                ds-col-6
              </div>
              <div
                class="ds-col-4 bg-rose-300 rounded py-3
                          text-center text-xs font-mono text-rose-800"
              >
                ds-col-4
              </div>
              <div
                class="ds-col-4 bg-rose-300 rounded py-3
                          text-center text-xs font-mono text-rose-800"
              >
                ds-col-4
              </div>
              <div
                class="ds-col-4 bg-rose-300 rounded py-3
                          text-center text-xs font-mono text-rose-800"
              >
                ds-col-4
              </div>
            </div>
          </div>
          <div
            class="ds-col-4 bg-gray-50 border border-gray-200 rounded-xl p-4
                      flex items-center justify-center"
          >
            <p class="text-xs font-mono text-gray-400">ds-col-4 sidebar</p>
          </div>
        </div>
      </section>

      <!-- ── Real World ─────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Real World — Airbnb-style listing page</h2>
        <p class="ds-section-desc">
          How the grid composes a typical page layout — listing cards, sidebar, full-width hero.
        </p>

        <!-- Hero: full width -->
        <div class="ds-grid mb-4">
          <div
            class="ds-col-12 bg-gray-900 rounded-2xl h-48
                      flex items-center justify-center"
          >
            <p class="text-white text-sm font-medium">Hero — ds-col-12</p>
          </div>
        </div>

        <!-- Main + sidebar -->
        <div class="ds-grid mb-4">
          <div class="ds-col-12 lg:ds-col-8">
            <!-- listing cards 2-up -->
            <div class="ds-grid">
              @for (card of cards; track card) {
                <div
                  class="ds-col-12 md:ds-col-6
                            bg-gray-50 border border-gray-100
                            rounded-xl p-4"
                >
                  <div class="bg-gray-200 rounded-lg h-28 mb-3"></div>
                  <div class="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                  <div class="h-3 bg-rose-100 rounded w-1/4"></div>
                </div>
              }
            </div>
          </div>

          <!-- sticky sidebar -->
          <div
            class="ds-col-12 lg:ds-col-4
                      bg-white border border-gray-200
                      rounded-2xl p-6 h-fit"
          >
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="h-10 bg-rose-500 rounded-xl mb-3"></div>
            <div class="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </section>

      <!-- ── API Reference ──────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label mb-4">API Reference</h2>
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div
            class="grid grid-cols-3 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Class</span>
            <span>Responsive</span>
            <span>Description</span>
          </div>
          @for (row of apiRows; track row.class) {
            <div
              class="grid grid-cols-3 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0
                        hover:bg-gray-50 transition-colors"
            >
              <code class="font-mono text-xs" style="color: #FF385C;">{{ row.class }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.responsive }}</code>
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
export class GridPreviewComponent {
  cols12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  cards = [1, 2, 3, 4];

  layouts = [
    { label: '6 + 6', cols: ['ds-col-6', 'ds-col-6'] },
    { label: '4 + 4 + 4', cols: ['ds-col-4', 'ds-col-4', 'ds-col-4'] },
    { label: '3 + 3 + 3 + 3', cols: ['ds-col-3', 'ds-col-3', 'ds-col-3', 'ds-col-3'] },
    { label: '8 + 4', cols: ['ds-col-8', 'ds-col-4'] },
    { label: '3 + 9', cols: ['ds-col-3', 'ds-col-9'] },
    { label: '2 + 8 + 2', cols: ['ds-col-2', 'ds-col-8', 'ds-col-2'] },
  ];

  apiRows = [
    {
      class: 'ds-container',
      responsive: '—',
      description: 'Max-width centered wrapper with responsive padding',
    },
    {
      class: 'ds-grid',
      responsive: '—',
      description: '12-column CSS grid with responsive gutters',
    },
    {
      class: 'ds-col-{1-12}',
      responsive: 'sm: md: lg: xl:',
      description: 'Span N columns. Use responsive prefix to change at breakpoint',
    },
    {
      class: 'ds-col-offset-{1-11}',
      responsive: 'sm: md: lg: xl:',
      description: 'Push column N positions from the left',
    },
    {
      class: 'ds-col-auto',
      responsive: '—',
      description: 'Let the column size itself based on content',
    },
    { class: 'ds-col-full', responsive: '—', description: 'Span all 12 columns (1 / -1)' },
  ];
}
