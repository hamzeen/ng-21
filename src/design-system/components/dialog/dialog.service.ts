import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.types';
import { DialogRef } from './dialog-ref';

interface DialogEntry {
  ref: DialogRef;
  componentRef: ComponentRef<DialogComponent>;
  backdropEl: HTMLElement;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private stack: DialogEntry[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  open(config: DialogConfig = {}): DialogRef {
    const dialogRef = new DialogRef();
    const backdropEl = this.createBackdrop(this.stack.length);

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    // Pass inputs
    componentRef.setInput('config', config);
    componentRef.setInput('dialogRef', dialogRef);
    componentRef.setInput('zIndex', 1000 + this.stack.length * 10);

    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);
    document.body.appendChild(backdropEl);

    // Lock body scroll on first dialog
    if (this.stack.length === 0) {
      document.body.style.overflow = 'hidden';
    }

    const entry: DialogEntry = { ref: dialogRef, componentRef, backdropEl };
    this.stack.push(entry);

    // Backdrop click — only for 'backdrop' strategy
    if ((config.closeStrategy ?? 'backdrop') === 'backdrop') {
      backdropEl.addEventListener('click', () => this.close(dialogRef));
    }

    // Auto-cleanup when closed
    dialogRef.afterClosed().subscribe(() => this.cleanup(entry));

    return dialogRef;
  }

  close(ref: DialogRef): void {
    ref.close();
  }

  closeAll(): void {
    [...this.stack].forEach((entry) => entry.ref.close());
  }

  private cleanup(entry: DialogEntry): void {
    this.appRef.detachView(entry.componentRef.hostView);
    entry.componentRef.destroy();
    entry.backdropEl.remove();

    this.stack = this.stack.filter((e) => e !== entry);

    // Restore scroll when stack is empty
    if (this.stack.length === 0) {
      document.body.style.overflow = '';
    }
  }

  private createBackdrop(index: number): HTMLElement {
    const el = document.createElement('div');
    const opacity = Math.min(0.4 + index * 0.08, 0.8);
    const zIndex = 999 + index * 10;

    el.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,${opacity});
      backdrop-filter: blur(${2 + index}px);
      z-index: ${zIndex};
      animation: ds-backdrop-in 0.2s ease;
    `;
    return el;
  }
}
