import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { ROUTE } from './routes/route';
import { publicRoutes } from './public.routes';
import { authRoutes } from './auth.routes';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: `${ROUTE.AUTH.BASE_PATH}`,
    pathMatch: 'full',
  },
  {
    path: ROUTE.PUBLIC.BASE_PATH,
    loadComponent: () => import('../layouts/base-layout/base-layout.component'),
    children: publicRoutes,
  },
  {
    path: ROUTE.AUTH.BASE_PATH,
    canActivate: [authGuard],
    loadComponent: () => import('../layouts/auth-layout/auth-layout.component'),
    children: authRoutes,
  },
  { path: '**', redirectTo: ROUTE.AUTH.BASE_PATH },
];
