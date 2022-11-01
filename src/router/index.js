import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import RTL from "../views/Rtl.vue";
import Notifications from "../views/Notifications.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Control from "../views/Control.vue";
import Log from "../views/Log.vue";
import MyDevice from "../views/MyDevice.vue";
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
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/control",
    name: "Control",
    component: Control,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logs",
    name: "Logs",
    component: Log,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-devices",
    name: "MyDevice",
    component: MyDevice,
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
