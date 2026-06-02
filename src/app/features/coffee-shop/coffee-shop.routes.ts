import { Routes } from '@angular/router';
import { BaristaBoardPageComponent } from './pages/barista-board-page/barista-board-page.component';
import { BaristaEntryPageComponent } from './pages/barista-entry-page/barista-entry-page.component';
import { PosDashboardPageComponent } from './pages/pos-dashboard-page/pos-dashboard-page.component';
import { CompletedOrdersPageComponent } from './pages/completed-orders-page/completed-orders-page.component';

export const COFFEE_SHOP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pos',
  },
  {
    path: 'pos',
    component: PosDashboardPageComponent,
  },
  {
    path: 'pos/completed-orders',
    component: CompletedOrdersPageComponent,
  },
  {
    path: 'barista/:tabletId',
    component: BaristaEntryPageComponent,
  },
  {
    path: 'barista/:tabletId/board',
    component: BaristaBoardPageComponent,
  },
];
