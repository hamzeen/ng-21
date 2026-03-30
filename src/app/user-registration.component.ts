import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Forms } from './constants/form-factory';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './user-registration.component.html',
})
export class UserRegistrationComponent {
  form = signal(Forms.registration());

  formState = signal(this.form().value);

  constructor() {
    this.form().valueChanges.subscribe((val) => this.formState.set(val));
  }

  get name() {
    return this.form().get('name');
  }
  get email() {
    return this.form().get('email');
  }
  get password() {
    return this.form().get('password');
  }

  submit() {
    if (this.form().valid) {
      alert('Registration successful!');
    }
  }
}
