import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { ROUTE } from "./shared/route.enum";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: `${ROUTE.AUTH}`,
    pathMatch: "full",
  },
  {
    path: ROUTE.PUBLIC,
    loadChildren: () => import("./pages/public/public.module"),
  },
  {
    path: ROUTE.AUTH,
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadChildren: () => import("./pages/auth/auth.module"),
  },
  { path: "**", redirectTo: ROUTE.AUTH },
]
