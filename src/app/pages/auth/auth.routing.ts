import { Routes } from "@angular/router";
import { ROUTE } from "src/app/shared/route.enum";
import { AuthComponent } from "./auth.component";

export const authRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
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
      { path: "**", redirectTo: ROUTE.HOME },
    ]
  }
]
