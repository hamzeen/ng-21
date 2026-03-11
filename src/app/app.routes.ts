import { Routes } from '@angular/router';
import { SignalDemoComponent } from './signal-demo.component';
import { SignalComputedDemoComponent } from './signal-computed-demo.component';
import { UserRegistrationComponent } from './user-registration.component';
import { InvoiceListComponent } from './invoice-list.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    pathMatch: 'full',
    component: SignalDemoComponent,
    title: 'My Tasks',
    canActivate: [authGuard],
  },
  {
    path: 'signal-computed-demo',
    component: SignalComputedDemoComponent,
    title: 'Signal Computed Demo',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
    title: 'User Registration',
  },
  {
    path: 'list',
    component: InvoiceListComponent,
    title: 'Invoice List',
    canActivate: [authGuard],
  },
];
