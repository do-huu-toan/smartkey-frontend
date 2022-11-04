import { createRouter, createWebHistory } from "vue-router";
import utils from "../utils";
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/control",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/tables",
    name: "Tables",
    component: () => import("../views/Tables.vue"),
  },
  {
    path: "/billing",
    name: "Billing",
    component: () => import("../views/Billing.vue"),
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: () => import("../views/Rtl.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../views/Notifications.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/control",
    name: "Control",
    component: () => import("../views/Control.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logs",
    name: "Logs",
    component: () => import("../views/Log.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-devices",
    name: "MyDevice",
    component: () => import("../views/MyDevice.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  { 
    path: "/:404(.*)*", 
    redirect: "/sign-in"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (utils.isAuthenticated()) {
      next();
    } else {
      next("/sign-in");
    }
  } else {
    next();
  }
});

export default router;
