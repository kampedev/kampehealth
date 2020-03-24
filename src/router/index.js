import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import SelectType from '../views/auth/SelectType.vue'
import SignupClient from '../views/auth/SignupClient.vue'
import OnboardClient from '../views/onboarding/OnboardClient.vue'
import Dashboard from '../views/clients/Dashboard.vue'
import AddClient from '../views/clients/AddClient.vue'
import ProviderDashboard from '../views/providers/Dashboard.vue'
import HDashboard from '../views/hmos/Dashboard.vue'
import AddEmployee from '../views/employees/AddEmployee.vue'
import AddDependents from '../views/dependents/AddDependents.vue'
import Plans from '../views/plans/Plans.vue'
import Funds from '../views/funds/Funds.vue'
import StateDashboard from '../views/shis/StateDashboard.vue'
import AddClaim from '../views/claims/AddClaim.vue'
import AddComplaint from '../views/complaints/AddComplaint.vue'

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
    path: '/select-type',
    component: SelectType
  },
  {
    path: '/signup-client',
    component: SignupClient
  },
  {
    path: '/onboard-client',
    component: OnboardClient
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
    path: '/state-dashboard',
    component: StateDashboard
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
  {
    path: '/add-claim',
    component: AddClaim
  },
  {
    path: '/add-complaint',
    component: AddComplaint
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
