import React from "react";
import { Redirect } from "react-router-dom";

export const UserManagementAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/user-management/users",
      component: React.lazy(() => import("./users/Users")),
    },
    {
      path: "/apps/user-management/new",
      component: React.lazy(() => import("./user/User")),
    },
    {
      path: "/apps/user-management",
      component: () => <Redirect to="/apps/user-management/users" />,
    },
  ],
};
