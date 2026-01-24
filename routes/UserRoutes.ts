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
        title: "Create Blog",
        url: "/dashboard/create-blog",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
];
