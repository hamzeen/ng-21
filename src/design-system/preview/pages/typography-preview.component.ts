import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TypeToken {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  sample: string;
  tag: string;
}

interface TypeGroup {
  title: string;
  description: string;
  tokens: TypeToken[];
}

@Component({
  selector: 'ds-typography-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preview-page">
      <h1 class="preview-title">Typography</h1>
      <p class="preview-desc">
        Type scale based on Airbnb's Cereal/Circular aesthetic — clean, functional, and designed for
        readability. Click any row to copy the CSS token.
      </p>

      <!-- Font Family -->
      <section class="type-section">
        <h2 class="type-section__title">Font Family</h2>
        <div class="font-family-grid">
          @for (font of fontFamilies; track font.name) {
            <div
              class="font-family-card"
              (click)="copyToClipboard(font.token)"
              [title]="'Click to copy ' + font.token"
            >
              <div class="font-family-card__sample" [style.font-family]="font.stack">Aa Bb Cc</div>
              <div class="font-family-card__meta">
                <span class="font-family-card__name">{{ font.name }}</span>
                <span class="font-family-card__token">{{ font.token }}</span>
                <span class="font-family-card__stack">{{ font.stack }}</span>
              </div>
              <span class="copied-badge" [class.visible]="copiedToken === font.token">
                ✓ Copied!
              </span>
            </div>
          }
        </div>
      </section>

      <!-- Type Scale sections -->
      @for (group of typeGroups; track group.title) {
        <section class="type-section">
          <h2 class="type-section__title">{{ group.title }}</h2>
          <p class="type-section__desc">{{ group.description }}</p>

          <div class="type-scale">
            <!-- Table header -->
            <div class="type-scale__header">
              <span>Sample</span>
              <span>Token</span>
              <span>Size</span>
              <span>Weight</span>
              <span>Line Height</span>
            </div>

            @for (token of group.tokens; track token.name) {
              <div
                class="type-scale__row"
                (click)="copyToClipboard(token.name)"
                [title]="'Click to copy ' + token.name"
              >
                <span
                  class="type-scale__sample"
                  [style.font-size]="token.size"
                  [style.font-weight]="token.weight"
                  [style.line-height]="token.lineHeight"
                >
                  {{ token.sample }}
                </span>
                <span class="type-scale__token">{{ token.name }}</span>
                <span class="type-scale__meta">{{ token.size }}</span>
                <span class="type-scale__meta">{{ token.weight }}</span>
                <span class="type-scale__meta">{{ token.lineHeight }}</span>
                <span class="copied-badge" [class.visible]="copiedToken === token.name">
                  ✓ Copied!
                </span>
              </div>
            }
          </div>
        </section>
      }

      <!-- Weight showcase -->
      <section class="type-section">
        <h2 class="type-section__title">Font Weights</h2>
        <p class="type-section__desc">All available weight tokens shown at 24px.</p>
        <div class="weight-grid">
          @for (w of weights; track w.token) {
            <div
              class="weight-card"
              (click)="copyToClipboard(w.token)"
              [title]="'Click to copy ' + w.token"
            >
              <span class="weight-card__sample" [style.font-weight]="w.value">
                {{ w.label }}
              </span>
              <span class="weight-card__token">{{ w.token }}</span>
              <span class="weight-card__value">{{ w.value }}</span>
              <span class="copied-badge" [class.visible]="copiedToken === w.token">✓</span>
            </div>
          }
        </div>
      </section>

      <!-- Live specimen -->
      <section class="type-section">
        <h2 class="type-section__title">Live Specimen</h2>
        <p class="type-section__desc">How the type scale looks in a real content context.</p>
        <div class="specimen">
          <p class="specimen__eyebrow">Visual Language</p>
          <h1 class="specimen__h1">The quick brown fox jumps over the lazy dog</h1>
          <h2 class="specimen__h2">Designing for clarity and purpose</h2>
          <h3 class="specimen__h3">Typography creates hierarchy and rhythm</h3>
          <p class="specimen__body">
            Good typography is invisible — it guides the reader without drawing attention to itself.
            The scale, spacing, and weight choices here follow Airbnb's principle of warm,
            human-centered design.
          </p>
          <p class="specimen__small">
            Caption text · 12px · Regular · Used for labels, timestamps, and helper text.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-page {
        max-width: 900px;
      }

      .preview-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        color: #222;
      }
      .preview-desc {
        font-size: 14px;
        color: #767676;
        margin-bottom: 2.5rem;
        line-height: 1.6;
      }

      /* ── Section ─────────────────────────── */
      .type-section {
        margin-bottom: 3.5rem;
      }
      .type-section__title {
        font-size: 18px;
        font-weight: 600;
        color: #222;
        margin-bottom: 6px;
      }
      .type-section__desc {
        font-size: 14px;
        color: #767676;
        margin-bottom: 1.25rem;
        line-height: 1.6;
      }

      /* ── Font Family ─────────────────────── */
      .font-family-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      .font-family-card {
        position: relative;
        border: 1px solid #dddddd;
        border-radius: 12px;
        padding: 24px;
        cursor: pointer;
        transition:
          border-color 0.15s,
          box-shadow 0.15s;
        overflow: hidden;
      }
      .font-family-card:hover {
        border-color: #ff385c;
        box-shadow: 0 2px 12px rgba(255, 56, 92, 0.1);
      }
      .font-family-card__sample {
        font-size: 48px;
        font-weight: 600;
        color: #222;
        margin-bottom: 16px;
        line-height: 1;
      }
      .font-family-card__name {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #222;
      }
      .font-family-card__token {
        display: block;
        font-size: 12px;
        color: #ff385c;
        font-family: monospace;
        margin: 2px 0;
      }
      .font-family-card__stack {
        display: block;
        font-size: 11px;
        color: #767676;
        font-family: monospace;
      }

      /* ── Type Scale Table ────────────────── */
      .type-scale {
        border: 1px solid #dddddd;
        border-radius: 12px;
        overflow: hidden;
      }
      .type-scale__header {
        display: grid;
        grid-template-columns: 2fr 1.5fr 80px 80px 100px;
        padding: 10px 20px;
        background: #f7f7f7;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #767676;
        border-bottom: 1px solid #dddddd;
      }
      .type-scale__row {
        position: relative;
        display: grid;
        grid-template-columns: 2fr 1.5fr 80px 80px 100px;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: background 0.1s;
        overflow: hidden;
      }
      .type-scale__row:last-child {
        border-bottom: none;
      }
      .type-scale__row:hover {
        background: #fff0f3;
      }

      .type-scale__sample {
        color: #222;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .type-scale__token {
        font-size: 12px;
        color: #ff385c;
        font-family: monospace;
      }
      .type-scale__meta {
        font-size: 12px;
        color: #767676;
        font-family: monospace;
      }

      /* ── Weights ─────────────────────────── */
      .weight-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
      }
      .weight-card {
        position: relative;
        border: 1px solid #dddddd;
        border-radius: 10px;
        padding: 20px 16px;
        cursor: pointer;
        text-align: center;
        transition:
          border-color 0.15s,
          box-shadow 0.15s;
        overflow: hidden;
      }
      .weight-card:hover {
        border-color: #ff385c;
        box-shadow: 0 2px 8px rgba(255, 56, 92, 0.1);
      }
      .weight-card__sample {
        display: block;
        font-size: 24px;
        color: #222;
        margin-bottom: 8px;
      }
      .weight-card__token {
        display: block;
        font-size: 11px;
        color: #ff385c;
        font-family: monospace;
      }
      .weight-card__value {
        display: block;
        font-size: 11px;
        color: #767676;
        margin-top: 2px;
      }

      /* ── Live Specimen ───────────────────── */
      .specimen {
        border: 1px solid #dddddd;
        border-radius: 12px;
        padding: 40px;
        background: #ffffff;
      }
      .specimen__eyebrow {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #ff385c;
        margin-bottom: 12px;
      }
      .specimen__h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.2;
        color: #222;
        margin-bottom: 16px;
      }
      .specimen__h2 {
        font-size: 28px;
        font-weight: 600;
        line-height: 1.3;
        color: #222;
        margin-bottom: 12px;
      }
      .specimen__h3 {
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        color: #484848;
        margin-bottom: 16px;
      }
      .specimen__body {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.6;
        color: #484848;
        margin-bottom: 12px;
      }
      .specimen__small {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.5;
        color: #767676;
      }

      /* ── Copied badge ────────────────────── */
      .copied-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 11px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        padding: 2px 8px;
        border-radius: 99px;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      .copied-badge.visible {
        opacity: 1;
      }
    `,
  ],
})
export class TypographyPreviewComponent {
  copiedToken = '';

  fontFamilies = [
    {
      name: 'Primary',
      token: '--font-primary',
      stack: "'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    {
      name: 'Monospace',
      token: '--font-mono',
      stack: "'Courier New', Courier, monospace",
    },
  ];

  typeGroups: TypeGroup[] = [
    {
      title: 'Display & Headings',
      description: 'Large type for page titles, hero sections and strong visual hierarchy.',
      tokens: [
        {
          name: '--text-5xl',
          size: '48px',
          weight: '700',
          lineHeight: '1.2',
          sample: 'Display — 48px Bold',
          tag: 'display',
        },
        {
          name: '--text-4xl',
          size: '40px',
          weight: '700',
          lineHeight: '1.2',
          sample: 'Heading 1 — 40px Bold',
          tag: 'h1',
        },
        {
          name: '--text-3xl',
          size: '32px',
          weight: '600',
          lineHeight: '1.25',
          sample: 'Heading 2 — 32px',
          tag: 'h2',
        },
        {
          name: '--text-2xl',
          size: '24px',
          weight: '600',
          lineHeight: '1.375',
          sample: 'Heading 3 — 24px',
          tag: 'h3',
        },
        {
          name: '--text-xl',
          size: '20px',
          weight: '600',
          lineHeight: '1.375',
          sample: 'Heading 4 — 20px',
          tag: 'h4',
        },
      ],
    },
    {
      title: 'Body & UI Text',
      description: 'Text sizes for body copy, labels, captions and supporting content.',
      tokens: [
        {
          name: '--text-lg',
          size: '18px',
          weight: '400',
          lineHeight: '1.6',
          sample: 'Body Large — 18px Regular',
          tag: 'p',
        },
        {
          name: '--text-md',
          size: '16px',
          weight: '400',
          lineHeight: '1.5',
          sample: 'Body — 16px Regular',
          tag: 'p',
        },
        {
          name: '--text-sm',
          size: '14px',
          weight: '400',
          lineHeight: '1.5',
          sample: 'Body Small — 14px Regular',
          tag: 'p',
        },
        {
          name: '--text-xs',
          size: '12px',
          weight: '400',
          lineHeight: '1.5',
          sample: 'Caption — 12px Regular',
          tag: 'span',
        },
      ],
    },
  ];

  weights = [
    { label: 'Ag', token: '--font-regular', value: '400' },
    { label: 'Ag', token: '--font-medium', value: '500' },
    { label: 'Ag', token: '--font-semibold', value: '600' },
    { label: 'Ag', token: '--font-bold', value: '700' },
    { label: 'Ag', token: '--font-extrabold', value: '800' },
  ];

  copyToClipboard(token: string): void {
    const cssVar = `var(${token})`;
    navigator.clipboard.writeText(cssVar).then(() => {
      this.copiedToken = token;
      setTimeout(() => (this.copiedToken = ''), 1500);
    });
  }
}
