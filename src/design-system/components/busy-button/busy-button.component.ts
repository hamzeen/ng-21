import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-busy-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './busy-button.component.html',
  styleUrls: ['./busy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusyButtonComponent {
  @Input() label = 'Submit';
  @Input() loadingLabel = 'Working...';
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.isLoading || this.disabled;
  }

  get hostClasses(): string[] {
    return [
      `variant-${this.variant}`,
      `size-${this.size}`,
      this.fullWidth ? 'full-width' : '',
      this.isLoading ? 'is-loading' : '',
      this.isDisabled ? 'is-disabled' : '',
    ].filter(Boolean);
  }

  handleClick(): void {
    if (this.isDisabled) return;
    this.clicked.emit();
  }
}
