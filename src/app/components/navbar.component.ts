import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sessionStore } from '../stores/session.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-screen w-64 flex-col bg-slate-950 text-white">
      <div class="border-b border-white/10 px-6 py-5">
        <h1 class="text-2xl font-semibold tracking-tight">My App</h1>
      </div>

      <nav class="flex-1 px-3 py-4">
        <div class="space-y-1">
          <a
            routerLink="/"
            routerLinkActive="bg-white/10 text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <i class="fa-solid fa-list-check w-5 text-center text-sm"></i>
            <span class="text-sm font-medium">My Tasks</span>
          </a>
          <a
            routerLink="/signal-computed-demo"
            routerLinkActive="bg-white/10 text-white"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <i class="fa-solid fa-bolt w-5 text-center text-sm"></i>
            <span class="text-sm font-medium">Signal Computed Demo</span>
          </a>

          <a
            routerLink="/register"
            routerLinkActive="bg-white/10 text-white"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <i class="fa-regular fa-user w-5 text-center text-sm"></i>
            <span class="text-sm font-medium">User Registration</span>
          </a>

          <a
            routerLink="/list"
            routerLinkActive="bg-white/10 text-white"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <i class="fa-regular fa-rectangle-list w-5 text-center text-sm"></i>
            <span class="text-sm font-medium">Invoice List</span>
          </a>

          <a
            routerLink="/icon-doc"
            routerLinkActive="bg-white/10 text-white"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <i class="fa-regular fa-rectangle-list w-5 text-center text-sm"></i>
            <span class="text-sm font-medium">Icon Documentation</span>
          </a>
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
  private readonly router = inject(Router);

  logout(): void {
    sessionStore.logout();
    this.router.navigate(['/login']);
  }
}
