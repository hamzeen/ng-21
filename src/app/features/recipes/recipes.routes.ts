import { Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent,
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
