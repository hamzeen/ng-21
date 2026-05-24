import { Observable } from 'rxjs';
import { TemplateRef } from '@angular/core';

export type DialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';
export type DialogCloseStrategy = 'backdrop' | 'explicit';
export type AsyncState = 'idle' | 'loading' | 'success' | 'error';

export interface DialogConfig {
  // ── Layout
  size?: DialogSize;
  closeStrategy?: DialogCloseStrategy;
  showClose?: boolean;

  // ── String API
  title?: string;
  body?: string;
  footer?: string;

  // ── Template API (takes priority over string)
  headerTemplate?: TemplateRef<any>;
  bodyTemplate?: TemplateRef<any>;
  footerTemplate?: TemplateRef<any>;

  // ── Confirm API
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => Observable<any>;
}
