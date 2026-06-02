import { Routes } from '@angular/router';
import { TasksComponent } from './features/tasks/components/tasks/tasks.component';
import { SignalComputedDemoComponent } from './features/signals-demo/components/signal-demo/signal-computed-demo.component';
import { UserRegistrationComponent } from './features/registration/components/user-registration/user-registration.component';
import { InvoiceListComponent } from './features/invoice-list/components/invoice-list/invoice-list.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';

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
    path: 'list',
    component: InvoiceListComponent,
    title: 'Invoice List',
    canActivate: [authGuard],
  },
  {
    path: 'recipes',
    canActivate: [authGuard],
    loadChildren: () => import('./features/recipes/recipes.routes').then((m) => m.RECIPES_ROUTES),
  },
  {
    path: 'ds',
    loadChildren: () =>
      import('../design-system/preview/ds-preview.routes').then((m) => m.DS_PREVIEW_ROUTES),
  },
  {
    path: 'coffee-shop',
    loadChildren: () =>
      import('./features/coffee-shop/coffee-shop.routes').then((m) => m.COFFEE_SHOP_ROUTES),
  },
];
