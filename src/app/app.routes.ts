import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks.component';
import { SignalComputedDemoComponent } from './components/signal-computed-demo.component';
import { UserRegistrationComponent } from './components/user-registration.component';
import { InvoiceListComponent } from './components/invoice-list.component';
import { authGuard } from './guards/auth.guard';
import { IconDocComponent } from './components/icon-doc.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    pathMatch: 'full',
    component: TasksComponent,
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
    path: 'icon-doc',
    component: IconDocComponent,
    title: 'Icon Documentation',
  },
  {
    path: 'list',
    component: InvoiceListComponent,
    title: 'Invoice List',
    canActivate: [authGuard],
  },
];
