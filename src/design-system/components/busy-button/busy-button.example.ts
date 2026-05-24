import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, timer } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

import { BusyButtonComponent } from '@design-system/components/busy-button';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, BusyButtonComponent],
  template: `
    <section class="form-demo">
      <h2>Reserve your stay</h2>

      <!-- Primary: confirm booking -->
      <app-busy-button
        label="Confirm Booking"
        loadingLabel="Reserving..."
        variant="primary"
        size="lg"
        [fullWidth]="true"
        [isLoading]="isConfirming"
        (clicked)="onConfirm()"
      >
      </app-busy-button>

      <!-- Secondary: save draft -->
      <app-busy-button
        label="Save Draft"
        loadingLabel="Saving..."
        variant="secondary"
        size="md"
        [isLoading]="isSaving"
        (clicked)="onSave()"
      >
      </app-busy-button>

      <!-- Danger: cancel reservation -->
      <app-busy-button
        label="Cancel Reservation"
        loadingLabel="Cancelling..."
        variant="danger"
        size="sm"
        [isLoading]="isCancelling"
        (clicked)="onCancel()"
      >
      </app-busy-button>

      <!-- Externally disabled (e.g. invalid form) -->
      <app-busy-button label="Submit" variant="primary" size="md" [disabled]="true">
      </app-busy-button>

      <p *ngIf="statusMessage" class="status">{{ statusMessage }}</p>
    </section>
  `,
})
export class BookingFormComponent {
  isConfirming = false;
  isSaving = false;
  isCancelling = false;
  statusMessage = '';

  onConfirm(): void {
    this.isConfirming = true;
    this.statusMessage = '';

    // Simulated API call — replace with your actual service call
    timer(2500)
      .pipe(
        switchMap(() => of({ bookingId: 'BK-1234' })), // or throwError(() => new Error('Failed'))
        finalize(() => (this.isConfirming = false)), // ← always resets, even on error
      )
      .subscribe({
        next: (res) => (this.statusMessage = `Booking confirmed! ID: ${res.bookingId}`),
        error: (err) => (this.statusMessage = `Something went wrong. Please try again.`),
      });
  }

  onSave(): void {
    this.isSaving = true;

    timer(1500)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => (this.statusMessage = 'Draft saved.'),
        error: () => (this.statusMessage = 'Save failed. Try again.'),
      });
  }

  onCancel(): void {
    this.isCancelling = true;

    timer(2000)
      .pipe(finalize(() => (this.isCancelling = false)))
      .subscribe({
        next: () => (this.statusMessage = 'Reservation cancelled.'),
        error: () => (this.statusMessage = 'Cancellation failed. Try again.'),
      });
  }
}
