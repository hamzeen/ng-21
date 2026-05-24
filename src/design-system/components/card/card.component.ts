import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardConfig, CardPadding, CardVariant } from './card.types';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="overflow-hidden rounded-2xl bg-white transition-shadow duration-200"
      [ngClass]="cardClasses"
    >
      @if (hasHeader) {
        <header [ngClass]="sectionClasses">
          @if (config.headerTemplate) {
            <ng-container *ngTemplateOutlet="config.headerTemplate" />
          } @else {
            <h3 class="text-base font-semibold leading-snug text-gray-900">
              {{ config.header }}
            </h3>
          }
        </header>
      }

      @if (hasBody) {
        <section [ngClass]="bodyClasses">
          @if (config.bodyTemplate) {
            <ng-container *ngTemplateOutlet="config.bodyTemplate" />
          } @else {
            <p class="text-sm leading-relaxed text-gray-600">
              {{ config.body }}
            </p>
          }
        </section>
      }

      @if (hasFooter) {
        <footer [ngClass]="footerClasses">
          @if (config.footerTemplate) {
            <ng-container *ngTemplateOutlet="config.footerTemplate" />
          } @else {
            <p class="text-xs leading-relaxed text-gray-500">
              {{ config.footer }}
            </p>
          }
        </footer>
      }
    </article>
  `,
})
export class CardComponent {
  @Input({ required: true }) config!: CardConfig;

  get hasHeader(): boolean {
    return !!(this.config.header || this.config.headerTemplate);
  }

  get hasBody(): boolean {
    return !!(this.config.body || this.config.bodyTemplate);
  }

  get hasFooter(): boolean {
    return !!(this.config.footer || this.config.footerTemplate);
  }

  get variant(): CardVariant {
    return this.config.variant ?? 'default';
  }

  get padding(): CardPadding {
    return this.config.padding ?? 'md';
  }

  get cardClasses(): string[] {
    const variants: Record<CardVariant, string[]> = {
      default: ['border', 'border-gray-200'],
      elevated: ['border', 'border-gray-100', 'shadow-sm', 'hover:shadow-md'],
      outlined: ['border', 'border-gray-300'],
    };

    return variants[this.variant];
  }

  get sectionClasses(): string[] {
    return [...this.paddingClasses, 'border-b', 'border-gray-100'];
  }

  get bodyClasses(): string[] {
    return this.paddingClasses;
  }

  get footerClasses(): string[] {
    return [...this.paddingClasses, 'border-t', 'border-gray-100'];
  }

  private get paddingClasses(): string[] {
    const sizes: Record<CardPadding, string[]> = {
      none: ['p-0'],
      sm: ['p-4'],
      md: ['p-5'],
      lg: ['p-6'],
    };

    return sizes[this.padding];
  }
}
