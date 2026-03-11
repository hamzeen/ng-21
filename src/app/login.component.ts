import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { sessionStore } from './stores/session.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  name = signal('');

  constructor(private router: Router) {}

  login(): void {
    sessionStore.login({
      id: crypto.randomUUID(),
      name: this.name() || 'Demo User',
      email: 'demo@example.com',
    });

    this.router.navigate(['/']);
  }
}
