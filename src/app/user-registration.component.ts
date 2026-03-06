import { Component, signal, computed } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './user-registration.component.html',
})
export class UserRegistrationComponent {
  form = signal(
    new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }),
  );

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
