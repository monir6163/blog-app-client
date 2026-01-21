import { Route } from "@/types/route.types";

export const AdminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        isActive: true,
      },
      {
        title: "Write Blog",
        url: "/admin-dashboard/write-blog",
      },
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
    ],
  },
];
