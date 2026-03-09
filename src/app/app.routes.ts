import { Routes } from '@angular/router';
import { SignalDemoComponent } from './signal-demo.component';
import { SignalComputedDemoComponent } from './signal-computed-demo.component';
import { UserRegistrationComponent } from './user-registration.component';
import { InvoiceListComponent } from './invoice-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignalDemoComponent,
    title: 'My Tasks',
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
  {
    path: 'list',
    component: InvoiceListComponent,
    title: 'Invoice List',
  },
];
