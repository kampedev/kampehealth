import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import SelectType from '../views/auth/SelectType.vue'
import SignupClient from '../views/auth/SignupClient.vue'
import SignupAgency from '../views/auth/SignupAgency.vue'
import OnboardClient from '../views/onboarding/OnboardClient.vue'
import AllDashboard from '../views/Dashboard.vue'
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
    path: '/signup-agency',
    component: SignupAgency
  },
  {
    path: '/onboard-client',
    component: OnboardClient,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/dashboard',
    component: AllDashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client-dashboard',
    component: Dashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-client',
    component: AddClient,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/provider-dashboard',
    component: ProviderDashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/hmo-dashboard',
    component: HDashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/state-dashboard',
    component: StateDashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-employee',
    component: AddEmployee,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-dependents',
    component: AddDependents,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/plans',
    component: Plans,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/fund-manager',
    component: Funds,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-claim',
    component: AddClaim,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-complaint',
    component: AddComplaint,
    meta: {
        requiresAuth: true,
      },
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') != null) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});

export default router
