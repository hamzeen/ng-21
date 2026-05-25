import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { ToastConfig, ToastItem, ToastVariant } from './toast.types';
import { ToastContainerComponent } from './toast-container.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private containerRef: ComponentRef<ToastContainerComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  show(config: ToastConfig): string {
    const id = crypto.randomUUID();
    this.ensureContainer();
    this.containerRef!.instance.add({ ...config, id });
    return id;
  }

  info(message: string, duration = 4000): string {
    return this.show({ variant: 'info', message, duration });
  }

  success(message: string, duration = 4000): string {
    return this.show({ variant: 'success', message, duration });
  }

  warn(message: string, duration = 4000): string {
    return this.show({ variant: 'warn', message, duration });
  }

  error(message: string): string {
    return this.show({ variant: 'error', message, duration: undefined });
  }

  dismiss(id: string): void {
    this.containerRef?.instance.remove(id);
  }

  private ensureContainer(): void {
    if (this.containerRef) return;

    this.containerRef = createComponent(ToastContainerComponent, {
      environmentInjector: this.injector,
    });

    this.appRef.attachView(this.containerRef.hostView);
    document.body.appendChild(this.containerRef.location.nativeElement);
  }
}
