import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DS_PREVIEW_MANIFEST, DsPreviewItem } from './ds-preview.manifest';

@Component({
  selector: 'ds-preview-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="ds-shell">
      <aside class="ds-sidebar">
        <div class="ds-sidebar__header">
          <span class="ds-sidebar__title">Design System</span>
        </div>
        <nav>
          @for (group of groupNames; track group) {
            <p class="ds-sidebar__group">{{ group }}</p>
            @for (item of groups[group]; track item.path) {
              <a [routerLink]="item.path" routerLinkActive="active">{{ item.label }}</a>
            }
          }
        </nav>
      </aside>
      <main class="ds-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .ds-shell {
        display: flex;
        height: 100vh;
        font-family: 'Manrope', 'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      .ds-sidebar {
        width: 220px;
        border-right: 1px solid #e0e0e0;
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .ds-sidebar__header {
        margin-bottom: 1.5rem;
      }
      .ds-sidebar__title {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #ff385c;
      }
      .ds-sidebar__group {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #999;
        margin: 1rem 0 4px;
      }
      nav a {
        display: block;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        text-decoration: none;
      }
      nav a:hover {
        background: #f5f5f5;
      }
      nav a.active {
        background: #fff0f3;
        color: #ff385c;
        font-weight: 600;
      }
      .ds-content {
        flex: 1;
        overflow-y: auto;
        padding: 2.5rem;
      }
    `,
  ],
})
export class DsPreviewShellComponent {
  readonly groups = DS_PREVIEW_MANIFEST.reduce(
    (acc, item) => {
      acc[item.group] ??= [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, DsPreviewItem[]>,
  );

  readonly groupNames = Object.keys(this.groups);
}
