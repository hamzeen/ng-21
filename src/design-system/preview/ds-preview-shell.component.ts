import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DS_PREVIEW_MANIFEST, DsPreviewItem } from './ds-preview.manifest';

@Component({
  selector: 'ds-preview-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="ds-shell">
      <button
        type="button"
        class="ds-drawer-toggle"
        [class.ds-drawer-toggle--closed]="!isOpen()"
        (click)="toggle()"
        [attr.aria-label]="
          isOpen() ? 'Hide design system navigation' : 'Show design system navigation'
        "
        [title]="isOpen() ? 'Hide navigation' : 'Show navigation'"
      >
        <i
          class="fa-solid fa-chevron-left ds-drawer-toggle__icon"
          [class.ds-drawer-toggle__icon--closed]="!isOpen()"
        ></i>
      </button>

      <aside class="ds-sidebar" [class.ds-sidebar--closed]="!isOpen()">
        <div class="ds-sidebar__inner">
          <div class="ds-sidebar__header">
            <span class="ds-sidebar__title">Design System</span>
          </div>

          <nav>
            @for (group of groupNames; track group) {
              <p class="ds-sidebar__group">{{ group }}</p>

              @for (item of groups[group]; track item.path) {
                <a [routerLink]="item.path" routerLinkActive="active">
                  {{ item.label }}
                </a>
              }
            }
          </nav>
        </div>
      </aside>

      <main class="ds-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .ds-shell {
        position: relative;
        display: flex;
        height: 100vh;
        overflow: hidden;
        font-family: 'Manrope', 'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background: #eef4fb;
      }

      .ds-sidebar {
        width: 220px;
        flex: 0 0 220px;
        border-right: 1px solid #e0e0e0;
        background: #eef4fb;
        transform: translateX(0);
        transition:
          transform 280ms ease,
          width 280ms ease,
          flex-basis 280ms ease,
          border-color 280ms ease;
      }

      .ds-sidebar--closed {
        width: 0;
        flex-basis: 0;
        transform: translateX(-220px);
        border-right-color: transparent;
      }

      .ds-sidebar__inner {
        width: 220px;
        height: 100%;
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ds-sidebar__header {
        margin-bottom: 1.5rem;
        padding-right: 2.5rem;
      }

      .ds-sidebar__title {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #ff385c;
      }

      .ds-drawer-toggle {
        position: fixed;
        top: 1.15rem;
        left: 200px;
        z-index: 100;
        width: 36px;
        height: 36px;
        border: 1px solid #dddddd;
        border-radius: 999px;
        background: #ffffff;
        color: #484848;
        display: grid;
        place-items: center;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
        transition:
          left 280ms ease,
          background 180ms ease,
          color 180ms ease,
          transform 180ms ease;
      }

      .ds-drawer-toggle:hover {
        background: #fff0f3;
        color: #ff385c;
        transform: scale(1.04);
      }

      .ds-drawer-toggle--closed {
        left: 10px;
      }

      .ds-drawer-toggle__icon {
        font-size: 14px;
        line-height: 1;
        transform: rotate(0deg);
        transform-origin: center;
        transition: transform 280ms ease;
      }

      .ds-drawer-toggle__icon--closed {
        transform: rotate(180deg);
      }

      .ds-drawer-toggle:hover .ds-drawer-toggle__icon {
        transform: rotate(0deg) translateX(-1px);
      }

      .ds-drawer-toggle--closed:hover .ds-drawer-toggle__icon {
        transform: rotate(180deg) translateX(1px);
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
        transition:
          background 160ms ease,
          color 160ms ease,
          transform 160ms ease;
      }

      nav a:hover {
        background: #f5f5f5;
        transform: translateX(2px);
      }

      nav a.active {
        background: #fff0f3;
        color: #ff385c;
        font-weight: 600;
      }

      .ds-content {
        flex: 1;
        min-width: 0;
        overflow-y: auto;
        padding: 2.5rem;
      }
    `,
  ],
})
export class DsPreviewShellComponent {
  readonly isOpen = signal(true);

  readonly groups = DS_PREVIEW_MANIFEST.reduce(
    (acc, item) => {
      acc[item.group] ??= [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, DsPreviewItem[]>,
  );

  readonly groupNames = Object.keys(this.groups);

  toggle(): void {
    this.isOpen.update((value) => !value);
  }
}
