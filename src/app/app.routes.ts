import { Routes } from '@angular/router';
import { SignalDemoComponent } from './signal-demo.component';
import { SignalComputedDemoComponent } from './signal-computed-demo.component';
import { UserRegistrationComponent } from './user-registration.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignalDemoComponent,
    title: 'Signal Demo',
  },
  {
    path: 'signal-computed-demo',
    component: SignalComputedDemoComponent,
    title: 'Signal Computed Demo',
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
    title: 'User Registration',
  },
];
