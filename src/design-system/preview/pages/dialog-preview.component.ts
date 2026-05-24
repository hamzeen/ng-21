import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '@design-system/components/dialog';
import { BusyButtonComponent } from '@design-system/components/busy-button';
import { timer } from 'rxjs';

@Component({
  selector: 'ds-dialog-preview',
  standalone: true,
  imports: [CommonModule, BusyButtonComponent],
  template: `
    <div class="max-w-4xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dialog</h1>
      <p class="text-sm text-gray-500 leading-relaxed mb-10">
        A composable, accessible dialog system. Supports string and template APIs, two close
        strategies, size variants, stacking, focus trap and scroll lock.
      </p>

      <!-- ── Close Strategies ───────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Close Strategy
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          <strong class="text-gray-700">Backdrop</strong> — click anywhere outside to close.
          <strong class="text-gray-700 ml-2">Explicit</strong> — only the ✕ button closes it.
        </p>
        <div class="flex flex-wrap gap-3">
          <button class="ds-btn ds-btn--secondary" (click)="openBackdrop()">Backdrop close</button>
          <button class="ds-btn ds-btn--secondary" (click)="openExplicit()">
            Explicit close only
          </button>
        </div>
      </section>

      <!-- ── Sizes ──────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Sizes</h2>
        <p class="text-sm text-gray-500 mb-5">
          Four size variants —
          <code class="ds-code">sm</code>, <code class="ds-code">md</code>,
          <code class="ds-code">lg</code>, <code class="ds-code">fullscreen</code>.
        </p>
        <div class="flex flex-wrap gap-3">
          <button class="ds-btn ds-btn--secondary" (click)="openSize('sm')">Small</button>
          <button class="ds-btn ds-btn--secondary" (click)="openSize('md')">Medium</button>
          <button class="ds-btn ds-btn--secondary" (click)="openSize('lg')">Large</button>
          <button class="ds-btn ds-btn--secondary" (click)="openSize('fullscreen')">
            Fullscreen
          </button>
        </div>
      </section>

      <!-- ── Slot Combos ────────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Slot Combinations
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Header + Body + Footer, Header + Body only, Header + Footer only.
        </p>
        <div class="flex flex-wrap gap-3">
          <button class="ds-btn ds-btn--secondary" (click)="openFull()">
            Header + Body + Footer
          </button>
          <button class="ds-btn ds-btn--secondary" (click)="openHeaderBody()">Header + Body</button>
          <button class="ds-btn ds-btn--secondary" (click)="openHeaderFooter()">
            Header + Footer
          </button>
        </div>
      </section>

      <!-- ── Template API ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Template API
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Pass <code class="ds-code">headerTemplate</code>,
          <code class="ds-code">bodyTemplate</code> or
          <code class="ds-code">footerTemplate</code> for full markup control — Angular components,
          bindings, anything.
        </p>
        <div class="flex flex-wrap gap-3">
          <button class="ds-btn ds-btn--secondary" (click)="openCustomBody()">Custom body</button>
          <button class="ds-btn ds-btn--secondary" (click)="openCustomHeader()">
            Custom header
          </button>
          <button class="ds-btn ds-btn--secondary" (click)="openFullCustom()">Fully custom</button>
        </div>
      </section>

      <!-- ── Confirm Dialog ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Confirmation Dialog
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Explicit close, no ✕, built-in confirm/cancel buttons via
          <code class="ds-code">onConfirm</code>.
        </p>
        <div class="flex flex-wrap gap-3 items-center">
          <button class="ds-btn ds-btn--danger" (click)="openConfirm()">Delete booking</button>
          <span
            *ngIf="confirmResult"
            class="text-sm font-medium"
            [class.text-green-600]="confirmResult === 'confirmed'"
            [class.text-gray-500]="confirmResult === 'cancelled'"
          >
            {{ confirmResult === 'confirmed' ? '✓ Booking deleted' : '✕ Cancelled' }}
          </span>
        </div>
      </section>

      <!-- ── Async ──────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Async Action
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Button spins during the operation. Dialog closes automatically on success.
        </p>
        <button class="ds-btn ds-btn--secondary" (click)="openAsync()">Open async dialog</button>
      </section>

      <!-- ── Stacked ────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Stacked Dialogs
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Each dialog is independent. Backdrop darkens with each layer.
        </p>
        <button class="ds-btn ds-btn--secondary" (click)="openStacked()">
          Open stacked dialogs
        </button>
      </section>

      <!-- ── API Reference ──────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          API Reference
        </h2>
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div
            class="grid grid-cols-4 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Input</span><span>Type</span><span>Default</span><span>Description</span>
          </div>
          @for (row of apiRows; track row.input) {
            <div
              class="grid grid-cols-4 px-5 py-3 text-sm border-b border-gray-100
                        last:border-0 hover:bg-gray-50 transition-colors"
            >
              <code class="text-pink-500 font-mono text-xs">{{ row.input }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.type }}</code>
              <code class="text-gray-400 font-mono text-xs">{{ row.default }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>
      </section>
    </div>

    <!-- ── Hidden Templates ───────────────────────── -->

    <ng-template #customBodyTpl>
      <div class="flex flex-col gap-3 text-sm text-gray-600">
        <div class="flex justify-between items-center py-2 border-b border-gray-100">
          <span class="text-gray-400 text-xs uppercase tracking-wider">Property</span>
          <span class="font-semibold text-gray-800">Malibu Beach House</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-100">
          <span class="text-gray-400 text-xs uppercase tracking-wider">Check-in</span>
          <span class="font-medium"><b>June 12</b> · <i>Friday</i></span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-100">
          <span class="text-gray-400 text-xs uppercase tracking-wider">Duration</span>
          <span class="font-medium">5 nights</span>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-400 text-xs uppercase tracking-wider">Total</span>
          <span class="text-lg font-bold text-gray-900">$1,240</span>
        </div>
      </div>
    </ng-template>

    <ng-template #customHeaderTpl>
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center"
          style="background: #FFF0F3;"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#FF385C"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
        </div>
        <div>
          <p class="text-base font-semibold text-gray-900">Malibu Beach House</p>
          <p class="text-xs text-gray-400">Malibu, California</p>
        </div>
      </div>
    </ng-template>

    <ng-template #customFooterTpl>
      <div class="flex items-center justify-between w-full">
        <p class="text-xs text-gray-400">Free cancellation before June 10</p>
        <div class="flex gap-2">
          <button
            class="ds-btn ds-btn--secondary"
            style="padding: 8px 16px; font-size: 13px;"
            (click)="closeAll()"
          >
            Cancel
          </button>
          <app-busy-button
            label="Reserve"
            loadingLabel="Reserving..."
            variant="primary"
            size="sm"
            [isLoading]="isReserving"
            (clicked)="simulateReserve()"
          >
          </app-busy-button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .ds-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition:
          background 0.15s,
          box-shadow 0.15s;
        font-family: inherit;
      }
      .ds-btn--secondary {
        background: #fff;
        color: #222;
        border: 1.5px solid #ddd;
        &:hover {
          background: #f7f7f7;
          border-color: #aaa;
        }
      }
      .ds-btn--danger {
        background: #c13515;
        color: #fff;
        &:hover {
          background: #a82c10;
          box-shadow: 0 4px 12px rgba(193, 53, 21, 0.25);
        }
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
export class DialogPreviewComponent {
  @ViewChild('customBodyTpl') customBodyTpl!: TemplateRef<any>;
  @ViewChild('customHeaderTpl') customHeaderTpl!: TemplateRef<any>;
  @ViewChild('customFooterTpl') customFooterTpl!: TemplateRef<any>;

  confirmResult = '';
  isReserving = false;
  private activeRef: any;

  apiRows = [
    {
      input: 'size',
      type: 'DialogSize',
      default: "'md'",
      description: 'sm | md | lg | fullscreen',
    },
    {
      input: 'closeStrategy',
      type: 'DialogCloseStrategy',
      default: "'backdrop'",
      description: 'backdrop | explicit',
    },
    {
      input: 'showClose',
      type: 'boolean',
      default: 'true',
      description: 'Show or hide the ✕ button',
    },
    { input: 'title', type: 'string', default: '—', description: 'Simple string header' },
    { input: 'body', type: 'string', default: '—', description: 'Simple string body' },
    { input: 'footer', type: 'string', default: '—', description: 'Simple string footer' },
    {
      input: 'headerTemplate',
      type: 'TemplateRef',
      default: '—',
      description: 'Custom header markup',
    },
    { input: 'bodyTemplate', type: 'TemplateRef', default: '—', description: 'Custom body markup' },
    {
      input: 'footerTemplate',
      type: 'TemplateRef',
      default: '—',
      description: 'Custom footer markup',
    },
    {
      input: 'confirmLabel',
      type: 'string',
      default: "'Confirm'",
      description: 'Confirm button label',
    },
    {
      input: 'cancelLabel',
      type: 'string',
      default: "'Cancel'",
      description: 'Cancel button label',
    },
    {
      input: 'onConfirm',
      type: '() => Observable',
      default: '—',
      description: 'Async confirm handler',
    },
  ];

  constructor(private dialog: DialogService) {}

  // ── String API ───────────────────────────────────

  openBackdrop(): void {
    this.dialog.open({
      title: 'Backdrop close',
      body: 'Click anywhere outside this dialog to close it.',
      size: 'md',
      closeStrategy: 'backdrop',
    });
  }

  openExplicit(): void {
    this.dialog.open({
      title: 'Explicit close only',
      body: 'This dialog can only be closed using the ✕ button.',
      size: 'md',
      closeStrategy: 'explicit',
    });
  }

  openSize(size: 'sm' | 'md' | 'lg' | 'fullscreen'): void {
    this.dialog.open({
      title: `${size.charAt(0).toUpperCase() + size.slice(1)} dialog`,
      body: `This is a "${size}" size dialog.`,
      footer: 'This is the footer area.',
      size,
    });
  }

  openFull(): void {
    this.dialog.open({
      title: 'Header + Body + Footer',
      body: 'All three slots filled.',
      footer: 'Footer content here.',
      size: 'md',
    });
  }

  openHeaderBody(): void {
    this.dialog.open({
      title: 'Header + Body only',
      body: 'No footer slot. Dialog ends after body.',
      size: 'md',
    });
  }

  openHeaderFooter(): void {
    this.dialog.open({
      title: 'Header + Footer only',
      footer: 'No body — just header and footer.',
      size: 'sm',
      closeStrategy: 'backdrop',
    });
  }

  // ── Template API ─────────────────────────────────

  openCustomBody(): void {
    this.dialog.open({
      title: 'Booking summary',
      bodyTemplate: this.customBodyTpl,
      size: 'sm',
    });
  }

  openCustomHeader(): void {
    this.dialog.open({
      headerTemplate: this.customHeaderTpl,
      body: 'This dialog has a custom header with an icon and subtitle.',
      size: 'md',
    });
  }

  openFullCustom(): void {
    this.isReserving = false;
    this.activeRef = this.dialog.open({
      headerTemplate: this.customHeaderTpl,
      bodyTemplate: this.customBodyTpl,
      footerTemplate: this.customFooterTpl,
      size: 'sm',
      closeStrategy: 'explicit',
    });
  }

  simulateReserve(): void {
    this.isReserving = true;
    timer(2500).subscribe(() => {
      this.isReserving = false;
      this.activeRef?.close('reserved');
    });
  }

  closeAll(): void {
    this.activeRef?.close();
  }

  // ── Confirm ──────────────────────────────────────

  openConfirm(): void {
    this.confirmResult = '';
    const ref = this.dialog.open({
      title: 'Delete this booking?',
      body: 'This action cannot be undone.',
      size: 'sm',
      closeStrategy: 'explicit',
      showClose: false,
      confirmLabel: 'Yes, delete',
      cancelLabel: 'Keep it',
      onConfirm: () => timer(0),
    });

    ref.afterClosed().subscribe((result) => {
      this.confirmResult = result ?? 'cancelled';
    });
  }

  // ── Async ────────────────────────────────────────

  openAsync(): void {
    this.dialog.open({
      title: 'Confirm reservation',
      body: 'Reserve the Malibu Beach House for 5 nights starting June 12?',
      size: 'sm',
      closeStrategy: 'explicit',
      confirmLabel: 'Reserve now',
      cancelLabel: 'Not yet',
      onConfirm: () => timer(3000),
    });
  }

  // ── Stacked ──────────────────────────────────────

  openStacked(): void {
    this.dialog.open({
      title: 'Dialog 1 — bottom of stack',
      body: 'A second dialog will open on top shortly.',
      size: 'md',
    });
    setTimeout(() => {
      this.dialog.open({
        title: 'Dialog 2 — middle of stack',
        body: 'A third dialog will open on top shortly.',
        size: 'sm',
      });
      setTimeout(() => {
        this.dialog.open({
          title: 'Dialog 3 — top of stack',
          body: 'Three dialogs deep! Close this to return to Dialog 2.',
          size: 'sm',
          closeStrategy: 'backdrop',
        });
      }, 600);
    }, 600);
  }
}
