import { Routes } from "@angular/router";
import { authGuard } from "../guards/auth.guard";
import { ROUTE } from "../shared/route.enum";
import { publicRoutes } from "./public.routes";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: `${ROUTE.AUTH}`,
    pathMatch: "full",
  },
  {
    path: ROUTE.PUBLIC,
    loadComponent: () => import("../pages/public/public.component"),
    children: publicRoutes,
  },
  {
    path: ROUTE.AUTH,
    canActivate: [authGuard],
    loadComponent: () => import("../pages/auth/auth.component"),
    children: publicRoutes,
  },
  { path: "**", redirectTo: ROUTE.AUTH },
]
