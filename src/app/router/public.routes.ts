import { Routes } from '@angular/router';
import { ROUTE } from './routes/route';

export const publicRoutes: Routes = [
  {
    path: '',
    redirectTo: `${ROUTE.PUBLIC.HOME}`,
    pathMatch: 'full',
  },
  {
    path: ROUTE.PUBLIC.HOME,
    loadComponent: () => import('../pages/public/home/home.component'),
  },
  {
    path: ROUTE.PUBLIC.LOGIN,
    loadComponent: () => import('../pages/public/login/login.component'),
  },
  { path: '**', redirectTo: ROUTE.PUBLIC.HOME },
];
