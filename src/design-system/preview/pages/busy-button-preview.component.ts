import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, timer } from 'rxjs';
import { BusyButtonComponent } from '@design-system/components/busy-button';

@Component({
  selector: 'ds-busy-button-preview',
  standalone: true,
  imports: [CommonModule, BusyButtonComponent],
  template: `
    <div class="preview-page">
      <h1 class="preview-title">Busy Button</h1>
      <p class="preview-desc">
        A self-contained button that prevents duplicate submissions. Parent owns
        <code>isLoading</code>. Use <code>finalize()</code> to always reset.
      </p>

      <!-- Variants -->
      <section class="preview-section">
        <h2>Variants</h2>
        <div class="preview-row">
          <app-busy-button label="Primary" variant="primary" [isLoading]="false" />
          <app-busy-button label="Secondary" variant="secondary" [isLoading]="false" />
          <app-busy-button label="Danger" variant="danger" [isLoading]="false" />
        </div>
      </section>

      <!-- Sizes -->
      <section class="preview-section">
        <h2>Sizes</h2>
        <div class="preview-row">
          <app-busy-button label="Small" size="sm" variant="primary" />
          <app-busy-button label="Medium" size="md" variant="primary" />
          <app-busy-button label="Large" size="lg" variant="primary" />
        </div>
      </section>

      <!-- Loading states -->
      <section class="preview-section">
        <h2>Loading states</h2>
        <div class="preview-row">
          <app-busy-button
            label="Primary"
            loadingLabel="Working..."
            variant="primary"
            [isLoading]="true"
          />
          <app-busy-button
            label="Secondary"
            loadingLabel="Saving..."
            variant="secondary"
            [isLoading]="true"
          />
          <app-busy-button
            label="Danger"
            loadingLabel="Removing..."
            variant="danger"
            [isLoading]="true"
          />
        </div>
      </section>

      <!-- Disabled -->
      <section class="preview-section">
        <h2>Disabled</h2>
        <div class="preview-row">
          <app-busy-button label="Primary" variant="primary" [disabled]="true" />
          <app-busy-button label="Secondary" variant="secondary" [disabled]="true" />
          <app-busy-button label="Danger" variant="danger" [disabled]="true" />
        </div>
      </section>

      <!-- Full width -->
      <section class="preview-section">
        <h2>Full width</h2>
        <app-busy-button
          label="Confirm Booking"
          loadingLabel="Reserving..."
          variant="primary"
          size="lg"
          [fullWidth]="true"
          [isLoading]="isConfirming"
          (clicked)="simulate()"
        />
        <p class="preview-hint" *ngIf="statusMsg">{{ statusMsg }}</p>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-page {
        max-width: 720px;
      }
      .preview-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .preview-desc {
        font-size: 14px;
        color: #666;
        margin-bottom: 2.5rem;
        line-height: 1.6;
      }
      .preview-desc code {
        background: #f4f4f4;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 13px;
      }
      .preview-section {
        margin-bottom: 2.5rem;
      }
      .preview-section h2 {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #999;
        margin-bottom: 1rem;
      }
      .preview-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .preview-hint {
        margin-top: 12px;
        font-size: 13px;
        color: #00a699;
      }
    `,
  ],
})
export class BusyButtonPreviewComponent {
  isConfirming = false;
  statusMsg = '';

  constructor(private cdr: ChangeDetectorRef) {}

  simulate(): void {
    this.isConfirming = true;
    this.statusMsg = '';

    timer(2500)
      .pipe(
        finalize(() => {
          this.isConfirming = false;
          this.cdr.markForCheck(); // ← this is the fix
        }),
      )
      .subscribe({
        next: () => {
          this.statusMsg = '✓ Booking confirmed! ID: BK-8821';
          this.cdr.markForCheck();
        },
        error: () => {
          this.statusMsg = '✕ Something went wrong. Try again.';
          this.cdr.markForCheck();
        },
      });
  }
}
