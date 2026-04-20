import { Routes } from "@angular/router";
import { ROUTE } from "./routes/route";

export const authRoutes: Routes = [
    {
        path: "",
        redirectTo: `${ROUTE.AUTH.HOME}`,
        pathMatch: "full",
    },
    {
        path: ROUTE.AUTH.HOME,
        loadComponent: () => import("../pages/auth/home/home.component"),
    },
    { path: "**", redirectTo: ROUTE.AUTH.HOME },
];
