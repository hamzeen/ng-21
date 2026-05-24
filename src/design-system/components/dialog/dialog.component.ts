import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { DialogConfig, AsyncState } from './dialog.types';
import { DialogRef } from './dialog-ref';
import { BusyButtonComponent } from '@design-system/components/busy-button';

@Component({
  selector: 'ds-dialog',
  standalone: true,
  imports: [CommonModule, BusyButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="ds-dialog-wrapper"
      [style.z-index]="zIndex"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="config.title ? 'ds-dialog-title' : null"
    >
      <div
        class="ds-dialog"
        [class]="dialogClasses"
        (keydown.escape)="onEscapeKey()"
        tabindex="-1"
        #dialogEl
      >
        <!-- ── Header ───────────────────────────── -->
        <div class="ds-dialog__header">
          <ng-content select="[dsDialogHeader]">
            <span *ngIf="config.title" id="ds-dialog-title" class="ds-dialog__title">
              {{ config.title }}
            </span>
          </ng-content>

          <button
            *ngIf="showClose"
            class="ds-dialog__close"
            (click)="close()"
            aria-label="Close dialog"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <!-- ── Body ─────────────────────────────── -->
        <ng-container *ngIf="hasBody">
          <div class="ds-dialog__body">
            <ng-content select="[dsDialogBody]">
              <p *ngIf="config.body" class="ds-dialog__body-text">
                {{ config.body }}
              </p>
            </ng-content>
          </div>
        </ng-container>

        <!-- ── Footer: async confirm ────────────── -->
        <ng-container *ngIf="isConfirmDialog">
          <div class="ds-dialog__footer">
            <div class="ds-dialog__footer-actions">
              <button
                class="ds-dialog__cancel-btn"
                [disabled]="asyncState === 'loading' || asyncState === 'success'"
                (click)="close()"
              >
                {{ config.cancelLabel ?? 'Cancel' }}
              </button>

              <app-busy-button
                [label]="config.confirmLabel ?? 'Confirm'"
                loadingLabel="Working..."
                variant="primary"
                size="md"
                [isLoading]="asyncState === 'loading'"
                [disabled]="asyncState === 'success'"
                (clicked)="onConfirmClick()"
              >
              </app-busy-button>
            </div>
          </div>
        </ng-container>

        <!-- ── Footer: string/slot ───────────────── -->
        <ng-container *ngIf="hasFooter">
          <div class="ds-dialog__footer">
            <ng-content select="[dsDialogFooter]">
              <p *ngIf="config.footer" class="ds-dialog__footer-text">
                {{ config.footer }}
              </p>
            </ng-content>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes ds-dialog-in {
        from {
          opacity: 0;
          transform: translate(-50%, -48%) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .ds-dialog-wrapper {
        position: fixed;
        inset: 0;
        pointer-events: none;
      }

      .ds-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 16px;
        box-shadow:
          0 8px 40px rgba(0, 0, 0, 0.18),
          0 2px 8px rgba(0, 0, 0, 0.08);
        pointer-events: all;
        animation: ds-dialog-in 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        max-height: 90vh;
        overflow-y: auto;
        outline: none;

        &.size-sm {
          width: min(400px, 92vw);
        }
        &.size-md {
          width: min(560px, 92vw);
        }
        &.size-lg {
          width: min(780px, 92vw);
        }
        &.size-fullscreen {
          width: 100vw;
          height: 100vh;
          border-radius: 0;
          top: 0;
          left: 0;
          transform: none;
        }
      }

      .ds-dialog__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 24px 24px 0;
        gap: 16px;
      }

      .ds-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #222;
        line-height: 1.3;
        flex: 1;
      }

      .ds-dialog__close {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #767676;
        transition:
          background 0.15s,
          color 0.15s;

        &:hover {
          background: #f7f7f7;
          color: #222;
        }
      }

      .ds-dialog__body {
        padding: 16px 24px;
      }

      .ds-dialog__body-text {
        font-size: 14px;
        color: #484848;
        line-height: 1.6;
      }

      .ds-dialog__footer {
        padding: 16px 24px 24px;
        border-top: 1px solid #f0f0f0;
        margin-top: 8px;
      }

      .ds-dialog__footer-text {
        font-size: 13px;
        color: #767676;
        text-align: right;
      }

      /* ── Confirm footer ────────────────────── */
      .ds-dialog__footer-status {
        min-height: 20px;
        margin-bottom: 12px;
      }

      .ds-dialog__footer-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
      }

      .ds-dialog__status-text {
        font-size: 13px;
        color: #767676;
        opacity: 0;
        transition: opacity 0.2s ease;

        &.visible {
          opacity: 1;
        }
        &--success {
          color: #008a05;
          font-weight: 600;
        }
        &--error {
          color: #c13515;
        }
      }

      .ds-dialog__cancel-btn {
        padding: 10px 20px;
        border-radius: 9999px;
        border: 1.5px solid #ddd;
        background: #fff;
        color: #222;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition:
          background 0.15s,
          border-color 0.15s;

        &:hover:not(:disabled) {
          background: #f7f7f7;
          border-color: #aaa;
        }
        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
    `,
  ],
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() config!: DialogConfig;
  @Input() dialogRef!: DialogRef;
  @Input() zIndex = 1000;

  asyncState: AsyncState = 'idle';

  private previouslyFocused: HTMLElement | null = null;
  private focusTrapHandler!: (e: KeyboardEvent) => void;

  get showClose(): boolean {
    return this.config.showClose ?? true;
  }

  get hasBody(): boolean {
    return !!this.config.body;
  }

  get hasFooter(): boolean {
    return !!this.config.footer && !this.isConfirmDialog;
  }

  get isConfirmDialog(): boolean {
    return !!this.config.onConfirm;
  }

  get dialogClasses(): string {
    return `size-${this.config.size ?? 'md'}`;
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
  }

  ngAfterViewInit(): void {
    const dialogEl = this.el.nativeElement.querySelector('.ds-dialog');
    if (dialogEl) {
      dialogEl.focus();
      this.setupFocusTrap(dialogEl);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.focusTrapHandler);
    this.previouslyFocused?.focus();
  }

  close(): void {
    this.dialogRef.close();
  }

  onEscapeKey(): void {
    if ((this.config.closeStrategy ?? 'backdrop') === 'backdrop') {
      this.close();
    }
  }

  onConfirmClick(): void {
    if (!this.config.onConfirm || this.asyncState === 'loading') return;

    this.asyncState = 'loading';
    this.cdr.markForCheck();

    this.config
      .onConfirm()
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: () => {
          this.asyncState = 'success';
          this.cdr.markForCheck();
          setTimeout(() => this.close(), 1000);
        },
        error: () => {
          this.asyncState = 'error';
          this.cdr.markForCheck();
        },
      });
  }

  private setupFocusTrap(dialogEl: HTMLElement): void {
    const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    this.focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableEls = Array.from(dialogEl.querySelectorAll<HTMLElement>(focusable)).filter(
        (el) => !el.hasAttribute('disabled'),
      );

      if (!focusableEls.length) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);
  }
}
