import { FormBuilder, Validators } from '@angular/forms';

const fb = new FormBuilder().nonNullable;

export function createRegistrationForm() {
  return fb.group({
    name: fb.control('', [Validators.required, Validators.minLength(2)]),
    email: fb.control('', [Validators.required, Validators.email]),
    password: fb.control('', [Validators.required, Validators.minLength(6)]),
  });
}

export type RegistrationForm = ReturnType<typeof createRegistrationForm>;

export const Forms = {
  registration: createRegistrationForm,
} as const;
