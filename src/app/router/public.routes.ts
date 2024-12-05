import { Routes } from "@angular/router";
import { ROUTE } from "src/app/shared/route.enum";

export const publicRoutes: Routes = [
    {
        path: "",
        redirectTo: `${ROUTE.HOME}`,
        pathMatch: "full",
    },
    {
        path: ROUTE.HOME,
        loadComponent: () => import("../pages/public/home/home.component"),
    },
    {
        path: ROUTE.LOGIN,
        loadComponent: () => import("../pages/public/login/login.component"),
    },
    { path: "**", redirectTo: ROUTE.HOME },
];
