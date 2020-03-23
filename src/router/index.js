import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/clients/Dashboard.vue'
import AddClient from '../views/clients/AddClient.vue'
import ProviderDashboard from '../views/providers/Dashboard.vue'
import HDashboard from '../views/hmos/Dashboard.vue'
import AddEmployee from '../views/employees/AddEmployee.vue'
import AddDependents from '../views/dependents/AddDependents.vue'
import Plans from '../views/plans/Plans.vue'
import Funds from '../views/funds/Funds.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/client-dashboard',
    component: Dashboard
  },
  {
    path: '/add-client',
    component: AddClient
  },
  {
    path: '/provider-dashboard',
    component: ProviderDashboard
  },
  {
    path: '/hmo-dashboard',
    component: HDashboard
  },
  {
    path: '/add-employee',
    component: AddEmployee
  },
  {
    path: '/add-dependents',
    component: AddDependents
  },
  {
    path: '/plans',
    component: Plans
  },
  {
    path: '/fund-manager',
    component: Funds
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
