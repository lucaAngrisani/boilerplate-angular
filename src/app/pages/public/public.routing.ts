import { Routes } from "@angular/router";
import { ROUTE } from "src/app/shared/route.enum";
import { PublicComponent } from "./public.component";

export const publicRoutes: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      {
        path: "",
        redirectTo: `${ROUTE.HOME}`,
        pathMatch: "full",
      },
      {
        path: ROUTE.HOME,
        loadComponent: () => import("./home/home.component"),
      },
      {
        path: ROUTE.LOGIN,
        loadComponent: () => import("./login/login.component"),
      },
      { path: "**", redirectTo: ROUTE.HOME },
    ]
  }
]
