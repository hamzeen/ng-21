import { Component } from '@angular/core';
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
      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dialog</h1>
      <p class="text-sm text-gray-500 leading-relaxed mb-10">
        A composable, accessible dialog system. Supports string and markup APIs, two close
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
          Four size variants — <code class="ds-code">sm</code>, <code class="ds-code">md</code>,
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

      <!-- ── Confirm Dialog ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Confirmation Dialog
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Explicit close strategy, no ✕ button, header question + footer actions. Result is shown
          below after interaction.
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

      <!-- ── Stacked Dialogs ────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Stacked Dialogs
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Each dialog is independent. Opening a new one stacks on top. Closing one returns focus to
          the one beneath. Backdrop darkens with each layer.
        </p>
        <button class="ds-btn ds-btn--secondary" (click)="openStacked()">
          Open stacked dialogs
        </button>
      </section>

      <!-- ── Async / Busy ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Async Action
        </h2>
        <p class="text-sm text-gray-500 mb-5">
          Dialog stays open during an async operation. The confirm button uses
          <code class="ds-code">BusyButtonComponent</code>
          and closes automatically on success.
        </p>
        <button class="ds-btn ds-btn--secondary" (click)="openAsync()">Open async dialog</button>
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
            <span>Input</span>
            <span>Type</span>
            <span>Default</span>
            <span>Description</span>
          </div>
          @for (row of apiRows; track row.input) {
            <div
              class="grid grid-cols-4 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0
                        hover:bg-gray-50 transition-colors"
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
  confirmResult = '';
  isSubmitting = false;

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
  ];

  constructor(private dialog: DialogService) {}

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
      body: 'This dialog can only be closed using the ✕ button. Clicking outside does nothing.',
      size: 'md',
      closeStrategy: 'explicit',
    });
  }

  openSize(size: 'sm' | 'md' | 'lg' | 'fullscreen'): void {
    this.dialog.open({
      title: `${size.charAt(0).toUpperCase() + size.slice(1)} dialog`,
      body: `This is a "${size}" size dialog. The content area scales with the dialog width.`,
      footer: 'This is the footer area.',
      size,
      closeStrategy: 'backdrop',
    });
  }

  openFull(): void {
    this.dialog.open({
      title: 'Header + Body + Footer',
      body: 'This dialog has all three slots filled — header, body and footer.',
      footer: 'All three slots are present here.',
      size: 'md',
    });
  }

  openHeaderBody(): void {
    this.dialog.open({
      title: 'Header + Body only',
      body: 'No footer slot here. The dialog ends after the body content.',
      size: 'md',
    });
  }

  openHeaderFooter(): void {
    this.dialog.open({
      title: 'Header + Footer only',
      footer: 'No body — just a question and actions.',
      size: 'sm',
      closeStrategy: 'explicit',
      showClose: true,
    });
  }

  openConfirm(): void {
    this.confirmResult = '';
    const ref = this.dialog.open({
      title: 'Delete this booking?',
      size: 'sm',
      closeStrategy: 'explicit',
      showClose: false,
      confirmLabel: 'Yes, delete',
      cancelLabel: 'Keep it',
      onConfirm: () => {
        ref.close('confirmed');
        return timer(0); // closes immediately
      },
    });

    ref.afterClosed().subscribe((result) => {
      this.confirmResult = result ?? 'cancelled';
    });
  }

  openStacked(): void {
    const ref1 = this.dialog.open({
      title: 'Dialog 1 — bottom of stack',
      body: 'Click the button below to open a second dialog on top of this one.',
      footer: 'Open dialog 2',
      size: 'md',
    });

    // Simulate opening dialog 2 from footer action
    setTimeout(() => {
      const ref2 = this.dialog.open({
        title: 'Dialog 2 — middle of stack',
        body: 'This is stacked on top of Dialog 1. Backdrop is darker. Click below to go deeper.',
        footer: 'Open dialog 3',
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
}
