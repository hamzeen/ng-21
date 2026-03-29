// src/shared/components/icon/icon.component.ts

import { Component, Input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICON_SIZES, IconSize } from '../../icons/icon.types';
import { getIconPath } from '../../icons/icon.registry';

const iconCache = new Map<string, SafeHtml>();

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span
      [innerHTML]="svg()"
      [style.width.px]="sizePx()"
      [style.height.px]="sizePx()"
      class="inline-block"
    ></span>
  `,
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: IconSize = 'm';

  private _svg = signal<SafeHtml>('');
  svg = this._svg;

  sizePx = () => ICON_SIZES[this.size];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnChanges() {
    const name = this.name;

    // ✅ cache
    if (iconCache.has(name)) {
      this._svg.set(iconCache.get(name)!);
      return;
    }

    this.http.get(getIconPath(name), { responseType: 'text' }).subscribe((svg) => {
      const cleaned = svg
        .replace(/fill="[^"]*"/g, 'fill="currentColor"')
        .replace(/width="[^"]*"/g, '')
        .replace(/height="[^"]*"/g, '');

      const safe = this.sanitizer.bypassSecurityTrustHtml(cleaned);

      iconCache.set(name, safe);
      this._svg.set(safe);
    });
  }
}
