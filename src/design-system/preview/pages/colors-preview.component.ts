import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ColorToken {
  name: string;
  value: string;
  textDark?: boolean;
}

interface ColorGroup {
  title: string;
  description: string;
  colors: ColorToken[];
}

@Component({
  selector: 'ds-colors-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preview-page">
      <h1 class="preview-title">Colors</h1>
      <p class="preview-desc">
        Design tokens for all colors used across the system. Click any swatch to copy the CSS
        variable to clipboard.
      </p>

      @for (group of colorGroups; track group.title) {
        <section class="color-section">
          <h2 class="color-section__title">{{ group.title }}</h2>
          <p class="color-section__desc">{{ group.description }}</p>
          <div class="color-grid">
            @for (color of group.colors; track color.name) {
              <div
                class="color-card"
                [class.color-card--dark-text]="color.textDark"
                [style.background]="color.value"
                (click)="copyToClipboard(color.name)"
                [title]="'Click to copy ' + color.name"
              >
                <span class="color-card__name">{{ color.name }}</span>
                <span class="color-card__value">{{ color.value }}</span>
                <span class="color-card__copied" [class.visible]="copiedToken === color.name">
                  ✓ Copied!
                </span>
              </div>
            }
          </div>
        </section>
      }
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

      .color-section {
        margin-bottom: 3rem;
      }
      .color-section__title {
        font-size: 20px;
        font-weight: 600;
        color: #222;
        margin-bottom: 6px;
      }
      .color-section__desc {
        font-size: 14px;
        color: #767676;
        margin-bottom: 1.25rem;
        line-height: 1.6;
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }

      .color-card {
        position: relative;
        padding: 20px 16px 16px;
        border-radius: 8px;
        cursor: pointer;
        min-height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 2px;
        transition:
          transform 0.1s ease,
          box-shadow 0.1s ease;
        border: 1px solid rgba(0, 0, 0, 0.08);
      }
      .color-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }
      .color-card:active {
        transform: scale(0.98);
      }

      .color-card__name {
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        font-family: 'Courier New', monospace;
      }
      .color-card__value {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
        font-family: 'Courier New', monospace;
      }
      .color-card--dark-text .color-card__name {
        color: #222;
      }
      .color-card--dark-text .color-card__value {
        color: #484848;
      }

      .color-card__copied {
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
      .color-card__copied.visible {
        opacity: 1;
      }
    `,
  ],
})
export class ColorsPreviewComponent {
  copiedToken = '';

  colorGroups: ColorGroup[] = [
    {
      title: 'Brand',
      description: 'Primary and secondary brand colors used in buttons, links and key UI elements.',
      colors: [
        { name: '--color-primary', value: '#FF385C' },
        { name: '--color-primary-hover', value: '#E0294B' },
        { name: '--color-primary-active', value: '#C8213E' },
        { name: '--color-primary-subtle', value: '#FFF0F3', textDark: true },
        { name: '--color-secondary', value: '#00A699' },
        { name: '--color-secondary-hover', value: '#008F83' },
        { name: '--color-secondary-subtle', value: '#E6F7F6', textDark: true },
      ],
    },
    {
      title: 'Neutrals',
      description: 'Gray scale used for text, backgrounds, borders and dividers.',
      colors: [
        { name: '--color-gray-900', value: '#222222' },
        { name: '--color-gray-700', value: '#484848' },
        { name: '--color-gray-500', value: '#767676' },
        { name: '--color-gray-300', value: '#DDDDDD', textDark: true },
        { name: '--color-gray-100', value: '#F7F7F7', textDark: true },
        { name: '--color-white', value: '#FFFFFF', textDark: true },
      ],
    },
    {
      title: 'Semantic',
      description: 'Communicates status and feedback — success, warning, danger and info.',
      colors: [
        { name: '--color-success', value: '#008A05' },
        { name: '--color-success-subtle', value: '#EDFAEE', textDark: true },
        { name: '--color-warning', value: '#C47D02' },
        { name: '--color-warning-subtle', value: '#FEF7E6', textDark: true },
        { name: '--color-danger', value: '#C13515' },
        { name: '--color-danger-subtle', value: '#FCEEE9', textDark: true },
        { name: '--color-info', value: '#0066CC' },
        { name: '--color-info-subtle', value: '#E6F0FA', textDark: true },
      ],
    },
    {
      title: 'Text',
      description: 'Text color tokens for primary, secondary, muted, inverse and link states.',
      colors: [
        { name: '--color-text-primary', value: '#222222' },
        { name: '--color-text-secondary', value: '#484848' },
        { name: '--color-text-muted', value: '#767676' },
        { name: '--color-text-inverse', value: '#FFFFFF', textDark: false },
        { name: '--color-text-link', value: '#FF385C' },
      ],
    },
    {
      title: 'Background',
      description: 'Surface and background tokens used across layouts and components.',
      colors: [
        { name: '--color-bg-base', value: '#FFFFFF', textDark: true },
        { name: '--color-bg-subtle', value: '#F7F7F7', textDark: true },
        { name: '--color-bg-overlay', value: 'rgba(0,0,0,0.5)' },
      ],
    },
    {
      title: 'Border',
      description: 'Border color tokens for default, strong and focus states.',
      colors: [
        { name: '--color-border-default', value: '#DDDDDD', textDark: true },
        { name: '--color-border-strong', value: '#AAAAAA', textDark: true },
        { name: '--color-border-focus', value: '#222222' },
      ],
    },
  ];

  copyToClipboard(tokenName: string): void {
    const cssVar = `var(${tokenName})`;
    navigator.clipboard.writeText(cssVar).then(() => {
      this.copiedToken = tokenName;
      setTimeout(() => (this.copiedToken = ''), 1500);
    });
  }
}
