export type ToastVariant = 'info' | 'success' | 'warn' | 'error';

export interface ToastConfig {
  variant: ToastVariant;
  message: string;
  duration?: number; // ms — undefined means no auto-dismiss
}

export interface ToastItem extends ToastConfig {
  id: string;
}
