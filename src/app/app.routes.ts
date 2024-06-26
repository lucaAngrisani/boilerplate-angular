import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
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
    canActivate: [authGuard],
    loadChildren: () => import("./pages/auth/auth.module"),
  },
  { path: "**", redirectTo: ROUTE.AUTH },
]
