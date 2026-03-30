import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks.component';
import { SignalComputedDemoComponent } from './signal-computed-demo.component';
import { UserRegistrationComponent } from './user-registration.component';
import { InvoiceListComponent } from './invoice-list.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
import { IconDocComponent } from './icon-doc.component';

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
