import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastItem, ToastVariant } from './toast.types';

@Component({
  selector: 'ds-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="ds-toast"
      [class]="toastClasses"
      role="alert"
      [attr.aria-live]="toast.variant === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Left icon -->
      <span class="ds-toast__icon" [innerHTML]="iconHtml"></span>

      <!-- Message -->
      <p class="ds-toast__message">{{ toast.message }}</p>

      <!-- Progress bar -->
      <div
        *ngIf="toast.duration"
        class="ds-toast__progress"
        [style.animation-duration]="toast.duration + 'ms'"
      ></div>

      <!-- Close button -->
      <button class="ds-toast__close" (click)="onDismiss()" aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 2l12 12M14 2L2 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes toast-out {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
          max-height: 120px;
          margin-bottom: 0;
        }
        to {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          max-height: 0;
          margin-bottom: -12px;
        }
      }

      @keyframes progress {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }

      .ds-toast {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-5);
        border-radius: 16px;
        width: min(480px, calc(100vw - 2rem));
        box-shadow:
          0 4px 24px rgba(0, 0, 0, 0.12),
          0 1px 4px rgba(0, 0, 0, 0.06);
        animation: toast-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        overflow: hidden;
        border: 1px solid transparent;

        &.is-dismissing {
          animation: toast-out 0.24s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        &.variant-info {
          background: var(--color-bg-base);
          border-color: var(--color-border-default);

          .ds-toast__icon {
            color: var(--color-info);
          }
          .ds-toast__progress {
            background: var(--color-info);
          }
        }

        &.variant-success {
          background: var(--color-success-subtle);
          border-color: var(--color-success);

          .ds-toast__icon {
            color: var(--color-success);
          }
          .ds-toast__progress {
            background: var(--color-success);
          }
        }

        &.variant-warn {
          background: var(--color-warning-subtle);
          border-color: var(--color-warning);

          .ds-toast__icon {
            color: var(--color-warning);
          }
          .ds-toast__progress {
            background: var(--color-warning);
          }
        }

        &.variant-error {
          background: var(--color-danger-subtle);
          border-color: var(--color-danger);

          .ds-toast__icon {
            color: var(--color-danger);
          }
          .ds-toast__progress {
            background: var(--color-danger);
          }
        }
      }

      .ds-toast__icon {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
        margin-top: 1px;
        display: flex;
        align-items: center;
        justify-content: center;

        ::ng-deep svg {
          width: 22px;
          height: 22px;
        }
      }

      .ds-toast__message {
        flex: 1;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.5;
        color: var(--color-text-primary);
        padding-right: var(--space-2);
      }

      .ds-toast__close {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border: none;
        background: transparent;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-muted);
        transition:
          background 0.15s,
          color 0.15s;
        margin-top: -2px;

        &:hover {
          background: rgba(0, 0, 0, 0.06);
          color: var(--color-text-primary);
        }
      }

      .ds-toast__progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        border-radius: 0 0 16px 16px;
        opacity: 0.4;
        animation: progress linear forwards;
      }
    `,
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() toast!: ToastItem;
  @Output() dismissed = new EventEmitter<string>();

  iconHtml!: SafeHtml;
  isDismissing = false;

  private timer?: ReturnType<typeof setTimeout>;

  private readonly icons: Record<ToastVariant, string> = {
    info: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>`,
    success: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>`,
    warn: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,
    error: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>`,
  };

  get toastClasses(): string {
    return [`variant-${this.toast.variant}`, this.isDismissing ? 'is-dismissing' : '']
      .filter(Boolean)
      .join(' ');
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(this.icons[this.toast.variant]);

    if (this.toast.duration) {
      this.timer = setTimeout(() => this.onDismiss(), this.toast.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  onDismiss(): void {
    if (this.isDismissing) return;
    this.isDismissing = true;
    this.cdr.markForCheck();
    setTimeout(() => this.dismissed.emit(this.toast.id), 240);
  }
}
