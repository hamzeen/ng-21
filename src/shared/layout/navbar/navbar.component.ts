import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sessionStore } from '../../../app/core/store/session.store';
import { NAV_LINKS } from '../../constants/nav-links.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="flex h-screen w-64 flex-col bg-slate-950 text-white">
      <div class="border-b border-white/10 px-6 py-5">
        <h1 class="text-2xl font-semibold tracking-tight">My App</h1>
      </div>

      <nav class="flex-1 px-3 py-4">
        <div class="space-y-1">
          @for (link of navLinks; track link.route) {
            <a
              [routerLink]="link.route"
              routerLinkActive="bg-white/10 text-white"
              [routerLinkActiveOptions]="{ exact: link.exact || false }"
              class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <i [class]="link.icon + ' w-5 text-center text-sm'"></i>
              <span class="text-sm font-medium">{{ link.label }}</span>
            </a>
          }
        </div>
      </nav>

      <div class="border-t border-white/10 px-4 py-4">
        <div class="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/64?img=12"
            alt="User avatar"
            class="h-10 w-10 rounded-full object-cover"
          />

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
            class="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
            title="Logout"
            aria-label="Logout"
          >
            <i class="fa-solid fa-right-from-bracket text-sm"></i>
          </button>
        </div>
      </div>
    </aside>
  `,
})
export class NavbarComponent {
  readonly sessionStore = sessionStore;
  readonly navLinks = NAV_LINKS;
  private readonly router = inject(Router);

  logout(): void {
    sessionStore.logout();
    this.router.navigate(['/login']);
  }
}
