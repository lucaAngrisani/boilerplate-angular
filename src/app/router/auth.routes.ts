import { Routes } from "@angular/router";
import { ROUTE } from "src/app/shared/route.enum";

export const authRoutes: Routes = [
    {
        path: "",
        redirectTo: `${ROUTE.HOME}`,
        pathMatch: "full",
    },
    {
        path: ROUTE.HOME,
        loadComponent: () => import("../pages/auth/home/home.component"),
    },
    { path: "**", redirectTo: ROUTE.HOME },
];
