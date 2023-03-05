const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("src/pages/App-Login.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("src/pages/Home-Cliente.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "profile",
    props: true,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/App-Profile-Piscina.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
