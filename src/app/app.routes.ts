import { Routes } from '@angular/router';
import { TasksComponent } from './features/tasks/tasks.component';
import { SignalComputedDemoComponent } from './features/signals-demo/signal-computed-demo.component';
import { UserRegistrationComponent } from './features/registration/user-registration.component';
import { InvoiceListComponent } from './features/invoice-list/invoice-list.component';
import { LoginComponent } from './features/login/login.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { RecipeListComponent } from './features/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail/recipe-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { IconDocComponent } from '../shared/ui/icon-preview/icon-doc.component';

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
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: RecipeListComponent,
        title: 'Recipes',
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        title: 'Recipe Details',
      },
    ],
  },
];
