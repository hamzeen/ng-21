import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sessionStore } from '../../../app/core/store/session.store';
import { NAV_LINKS } from '../../constants/nav-links.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside
      class="flex h-screen flex-col overflow-hidden bg-slate-950 text-white shadow-xl transition-all duration-300 ease-in-out"
      [class.w-64]="isOpen()"
      [class.w-20]="!isOpen()"
    >
      <!-- Header -->
      <div
        class="flex h-[73px] items-center border-b border-white/10 px-4"
        [class.justify-between]="isOpen()"
        [class.justify-center]="!isOpen()"
      >
        @if (isOpen()) {
          <h1 class="whitespace-nowrap text-2xl font-semibold tracking-tight">My App</h1>
        }

        <button
          type="button"
          (click)="toggle()"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
          [attr.aria-label]="isOpen() ? 'Collapse sidebar' : 'Expand sidebar'"
          [title]="isOpen() ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <i
            class="fa-solid text-base transition-transform duration-300"
            [class.fa-bars-staggered]="isOpen()"
            [class.fa-bars]="!isOpen()"
          ></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4">
        <div class="space-y-1">
          @for (link of navLinks; track link.route) {
            <a
              [routerLink]="link.route"
              routerLinkActive="bg-white/10 text-white"
              [routerLinkActiveOptions]="{ exact: link.exact || false }"
              class="group flex items-center rounded-xl px-3 py-3 text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
              [class.justify-start]="isOpen()"
              [class.justify-center]="!isOpen()"
              [title]="!isOpen() ? link.label : null"
            >
              <i
                [class]="
                  link.icon +
                  ' w-5 shrink-0 text-center text-sm transition-transform duration-200 group-hover:scale-110'
                "
              ></i>

              @if (isOpen()) {
                <span class="ml-3 whitespace-nowrap text-sm font-medium">
                  {{ link.label }}
                </span>
              }
            </a>
          }
        </div>
      </nav>

      <!-- User Footer -->
      <div class="border-t border-white/10 px-4 py-4">
        <div
          class="flex items-center gap-3"
          [class.justify-start]="isOpen()"
          [class.justify-center]="!isOpen()"
        >
          <img
            src="https://i.pravatar.cc/64?img=12"
            alt="User avatar"
            class="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/10"
          />

          @if (isOpen()) {
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-white">
                {{ sessionStore.user()?.name || 'Guest User' }}
              </p>
              <p class="truncate text-xs text-slate-400">
                {{ sessionStore.user()?.email || 'guest@example.com' }}
              </p>
            </div>

            <button
              type="button"
              (click)="logout()"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
              title="Logout"
              aria-label="Logout"
            >
              <i class="fa-solid fa-right-from-bracket text-sm"></i>
            </button>
          }
        </div>
      </div>
    </aside>
  `,
})
export class NavbarComponent {
  readonly sessionStore = sessionStore;
  readonly navLinks = NAV_LINKS;

  private readonly router = inject(Router);

  readonly isOpen = signal(true);

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  logout(): void {
    sessionStore.logout();
    this.router.navigate(['/login']);
  }
}
