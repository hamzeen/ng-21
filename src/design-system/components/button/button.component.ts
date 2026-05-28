import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from './button.types';

const BASE_CLASSES = [
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'rounded-full',
  'border',
  'font-semibold',
  'tracking-tight',
  'whitespace-nowrap',
  'select-none',
  'transition-all',
  'duration-200',
  'ease-out',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
  'active:scale-[0.98]',
  'disabled:pointer-events-none',
  'disabled:cursor-not-allowed',
].join(' ');

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: [
    'border-transparent',
    'bg-rose-500',
    'text-white',
    'shadow-sm',
    'hover:bg-rose-600',
    'hover:shadow-md',
    'focus-visible:ring-rose-500',
    'disabled:bg-gray-200',
    'disabled:text-gray-400',
    'disabled:shadow-none',
  ].join(' '),

  secondary: [
    'border-gray-300',
    'bg-white',
    'text-gray-900',
    'shadow-sm',
    'hover:border-gray-900',
    'hover:bg-gray-50',
    'focus-visible:ring-gray-900',
    'disabled:border-transparent',
    'disabled:bg-gray-100',
    'disabled:text-gray-400',
    'disabled:shadow-none',
  ].join(' '),

  tertiary: [
    'border-transparent',
    'bg-gray-900',
    'text-white',
    'shadow-sm',
    'hover:bg-gray-700',
    'hover:shadow-md',
    'focus-visible:ring-gray-900',
    'disabled:bg-gray-200',
    'disabled:text-gray-400',
    'disabled:shadow-none',
  ].join(' '),

  danger: [
    'border-transparent',
    'bg-red-700',
    'text-white',
    'shadow-sm',
    'hover:bg-red-800',
    'hover:shadow-md',
    'focus-visible:ring-red-700',
    'disabled:bg-gray-200',
    'disabled:text-gray-400',
    'disabled:shadow-none',
  ].join(' '),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'size-9 p-0 text-sm',
  md: 'size-11 p-0 text-sm',
  lg: 'size-12 p-0 text-base',
};

@Component({
  selector: 'ds-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-disabled]="disabled()"
      [attr.aria-label]="iconOnly() ? ariaLabel() : null"
      [class]="classes()"
      (click)="onClick($event)"
    >
      @if (label()) {
        {{ label() }}
      } @else {
        <ng-content />
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');
  label = input<string>('');
  disabled = input(false);
  fullWidth = input(false);
  iconOnly = input(false);
  ariaLabel = input<string>('');

  clicked = output<MouseEvent>();

  classes = computed(() =>
    [
      BASE_CLASSES,
      VARIANT_CLASSES[this.variant()],
      this.iconOnly() ? ICON_ONLY_SIZE_CLASSES[this.size()] : SIZE_CLASSES[this.size()],
      this.fullWidth() && !this.iconOnly() ? 'w-full' : '',
      this.iconOnly() ? 'rounded-full' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
