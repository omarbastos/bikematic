import { lazy } from "react";

const routes = [
  {
    path: "/",
    key: "home",
    Component: lazy(
      () => import(/* webpackChunkName: "HomePage" */ "./pages/Home")
    ),
  },
];
export default routes;
