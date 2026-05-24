import { Observable } from 'rxjs';

export type DialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';
export type DialogCloseStrategy = 'backdrop' | 'explicit';

export type AsyncState = 'idle' | 'loading' | 'success' | 'error';

export interface DialogConfig {
  size?: DialogSize;
  closeStrategy?: DialogCloseStrategy;
  showClose?: boolean;
  title?: string;
  body?: string;
  footer?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => Observable<any>;
}
