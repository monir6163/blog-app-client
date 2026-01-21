import { Route } from "@/types";

export const UserRoutes: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        isActive: true,
      },
      {
        title: "Write Blog",
        url: "/dashboard/write-blog",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
];
