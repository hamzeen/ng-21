import { TemplateRef } from '@angular/core';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardConfig {
  header?: string;
  body?: string;
  footer?: string;

  headerTemplate?: TemplateRef<unknown>;
  bodyTemplate?: TemplateRef<unknown>;
  footerTemplate?: TemplateRef<unknown>;

  variant?: CardVariant;
  padding?: CardPadding;
}
