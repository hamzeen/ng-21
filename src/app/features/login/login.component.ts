import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Forms } from '../../../shared/constants/form.constants';
import { sessionStore } from '../../core/store/session.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = signal(Forms.login());

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  login(): void {
    const { name } = this.form().getRawValue();

    sessionStore.login({
      id: crypto.randomUUID(),
      name: name || 'Demo User',
      email: 'demo@example.com',
    });

    this.router.navigate(['/']);
  }
}
