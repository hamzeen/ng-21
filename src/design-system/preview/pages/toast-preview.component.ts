import { Component } from '@angular/core';
import { ToastService } from '@design-system/components/toast';

@Component({
  selector: 'ds-toast-preview',
  standalone: true,
  template: `
    <div class="max-w-3xl">
      <h1 class="preview-title">Toast</h1>
      <p class="preview-desc">
        Lightweight notifications anchored to the bottom-center of the screen. Toasts stack newest
        on top, auto-dismiss after 4s (except errors), and can always be manually dismissed.
      </p>

      <!-- ── Variants ───────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Variants</h2>
        <p class="ds-section-desc">
          Four variants — each with a corresponding icon, background and border color derived from
          design tokens.
        </p>
        <div class="flex flex-wrap gap-3">
          <button class="ds-btn" (click)="showInfo()">Info</button>
          <button class="ds-btn" (click)="showSuccess()">Success</button>
          <button class="ds-btn" (click)="showWarn()">Warning</button>
          <button class="ds-btn" (click)="showError()">Error</button>
        </div>
      </section>

      <!-- ── Stacking ───────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Stacking</h2>
        <p class="ds-section-desc">Newest toast appears on top. Max 5 visible at once.</p>
        <button class="ds-btn" (click)="showStack()">Stack 4 toasts</button>
      </section>

      <!-- ── Long message ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Multi-line message</h2>
        <p class="ds-section-desc">
          Message text wraps naturally — toast width is capped at 480px.
        </p>
        <button class="ds-btn" (click)="showLong()">Show long message</button>
      </section>

      <!-- ── Error persists ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Error — no auto-dismiss</h2>
        <p class="ds-section-desc">
          Errors stay until the user manually dismisses them. All other variants auto-dismiss after
          4 seconds.
        </p>
        <button class="ds-btn" (click)="showError()">Show persistent error</button>
      </section>

      <!-- ── Service API ────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label mb-4">Service API</h2>
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div
            class="grid grid-cols-3 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Method</span>
            <span>Signature</span>
            <span>Description</span>
          </div>
          @for (row of apiRows; track row.method) {
            <div
              class="grid grid-cols-3 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0
                        hover:bg-gray-50 transition-colors"
            >
              <code class="font-mono text-xs" style="color: #FF385C;">{{ row.method }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.signature }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-title {
        font-size: 28px;
        font-weight: 700;
        color: #222;
        margin-bottom: 8px;
      }
      .preview-desc {
        font-size: 14px;
        color: #767676;
        line-height: 1.6;
        margin-bottom: 2.5rem;
      }
      .ds-section-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #9ca3af;
        margin-bottom: 4px;
      }
      .ds-section-desc {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .ds-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        border: 1.5px solid #ddd;
        background: #fff;
        color: #222;
        font-family: inherit;
        transition:
          background 0.15s,
          border-color 0.15s;
        &:hover {
          background: #f7f7f7;
          border-color: #aaa;
        }
      }
    `,
  ],
})
export class ToastPreviewComponent {
  apiRows = [
    {
      method: 'toast.info()',
      signature: '(message, duration?)',
      description: 'Info toast, auto-dismisses in 4s',
    },
    {
      method: 'toast.success()',
      signature: '(message, duration?)',
      description: 'Success toast, auto-dismisses in 4s',
    },
    {
      method: 'toast.warn()',
      signature: '(message, duration?)',
      description: 'Warning toast, auto-dismisses in 4s',
    },
    {
      method: 'toast.error()',
      signature: '(message)',
      description: 'Error toast, persists until dismissed',
    },
    {
      method: 'toast.show()',
      signature: '(config: ToastConfig)',
      description: 'Full config — variant, message, duration',
    },
    {
      method: 'toast.dismiss()',
      signature: '(id: string)',
      description: 'Programmatically dismiss a specific toast',
    },
  ];

  constructor(private toast: ToastService) {}

  showInfo(): void {
    this.toast.info('Your listing has been saved successfully.');
  }
  showSuccess(): void {
    this.toast.success('Booking confirmed! Check your email for details.');
  }
  showWarn(): void {
    this.toast.warn('Your session is about to expire in 5 minutes.');
  }
  showError(): void {
    this.toast.error('Payment failed. Please check your card details and try again.');
  }

  showLong(): void {
    this.toast.info(
      'Your reservation request has been sent to the host. You will receive a confirmation within 24 hours. Check your inbox for updates.',
    );
  }

  showStack(): void {
    setTimeout(() => this.toast.info('Listing saved to your wishlist.'), 0);
    setTimeout(() => this.toast.success('Profile updated successfully.'), 150);
    setTimeout(() => this.toast.warn('Price has changed since you last viewed this listing.'), 300);
    setTimeout(() => this.toast.error('Unable to load availability. Please refresh.'), 450);
  }
}
