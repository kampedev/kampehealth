
import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";

import Login from "../views/Login.vue";
import EnterPin from "../views/EnterPin.vue";
import Register from "../views/Register.vue";

import AddStateLGA from "../views/admins/AddStateLGA.vue";
import AddLGA from "../views/admins/AddLGA.vue";
import AddFarmerOffline from "../views/customers/AddFarmerOffline.vue";
import AllCustomers from "../views/customers/AllCustomers.vue";
import AllUsers from "../views/agents/AllUsers.vue";
import AddUser from "../views/agents/AddUser.vue";
import SingleCustomer from "../views/customers/SingleCustomer.vue";


const routes = [
  {
    path: "/home",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
      },
      {
        path: "/maps",
        name: "maps",
        components: { default: Maps },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
      {
        path: "/add-customer",
        name: "AddFarmerOffline",
        components: { default: AddFarmerOffline },
      },
      {
        path: "/add-user",
        name: "AddUser",
        components: { default: AddUser },
      },
      {
        path: "/manage-location",
        name: "AddStateLGA",
        components: { default: AddStateLGA },
      },
      {
        path: "/state/:id",
        name: "AddLGA",
        components: { default: AddLGA },
      },
      {
        path: "/all-customers",
        name: "AllCustomers",
        components: { default: AllCustomers },
      },
      {
        path: "/all-users",
        name: "AllUsers",
        components: { default: AllUsers },
      },
      {
        path: "/customer/:id",
        name: "SingleCustomer",
        components: { default: SingleCustomer },
      },
    ],

  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      {
        path: "/enter-pin",
        name: "EnterPin",
        components: { default: EnterPin },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
