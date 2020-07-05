import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Pusher from '../views/auth/Pusher.vue'
import SelectType from '../views/auth/SelectType.vue'
import SignupClient from '../views/auth/SignupClient.vue'
import SignupState from '../views/auth/SignupState.vue'
import SignupHmo from '../views/auth/SignupHmo.vue'
import SignupProvider from '../views/auth/SignupProvider.vue'
import SignupAgency from '../views/auth/SignupAgency.vue'
import OnboardClient from '../views/onboarding/OnboardClient.vue'
import AllDashboard from '../views/Dashboard.vue'
import Dashboard from '../views/clients/Dashboard.vue'
import Subscribe from '../views/clients/Subscribe.vue'
import AddClientAgency from '../views/clients/AddClientAgency.vue'
import AddClientProvider from '../views/clients/AddClientProvider.vue'
import ViewClientsProvider from '../views/clients/ViewClientsProvider.vue'
import ViewClientsAgency from '../views/clients/ViewClientsAgency.vue'
import ProviderDashboard from '../views/providers/Dashboard.vue'
import HDashboard from '../views/hmos/Dashboard.vue'
import ListProviders from '../views/providers/ListProviders.vue'
import SingleProvider from '../views/providers/SingleProvider.vue'
import AddEmployee from '../views/employees/AddEmployee.vue'
import ViewEmployees from '../views/employees/ViewEmployees.vue'
import AddDependents from '../views/dependents/AddDependents.vue'
import MyDependents from '../views/dependents/MyDependents.vue'
import AddPlan from '../views/plans/AddPlan.vue'
import Plans from '../views/plans/Plans.vue'
import Funds from '../views/funds/Funds.vue'
import StateDashboard from '../views/shis/StateDashboard.vue'
import AddClaim from '../views/claims/AddClaim.vue'
import ProvidersClaims from '../views/claims/ProvidersClaims.vue'
import SingleClaim from '../views/claims/SingleClaim.vue'
import AddComplaint from '../views/complaints/AddComplaint.vue'
import MyComplaints from '../views/complaints/MyComplaints.vue'
import AddRecord from '../views/ehr/AddRecord.vue'
import MyRecords from '../views/ehr/MyRecords.vue'
import AddInventory from '../views/inventories/AddInventory.vue'
import MyInventories from '../views/inventories/MyInventories.vue'
import AddAgency from '../views/providers/AddAgency.vue'
import Settings from '../views/auth/Settings.vue'
import ClientFunds from '../views/funds/ClientFunds.vue'
import SingleTransaction from '../views/funds/SingleTransaction.vue'
import Doctor from '../views/employees/Doctor.vue'
import Nurse from '../views/employees/Nurse.vue'
import Receptionist from '../views/employees/Receptionist.vue'
import Laboratorist from '../views/employees/Laboratorist.vue'
import Pharmacist from '../views/employees/Pharmacist.vue'
import Accountant from '../views/employees/Accountant.vue'
import Appointments from '../views/appointments/Appointments.vue'
import SingleAppointment from '../views/appointments/SingleAppointment.vue'

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
    path: '/pusher',
    component: Pusher
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
    path: '/signup-state',
    component: SignupState
  },
  {
    path: '/signup-hmo',
    component: SignupHmo
  },
  {
    path: '/signup-provider',
    component: SignupProvider
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
    path: '/user-settings',
    component: Settings,
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
    path: '/subscribe',
    component: Subscribe,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-client-agency',
    component: AddClientAgency,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-client-provider',
    component: AddClientProvider,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/view-clients-provider',
    component: ViewClientsProvider,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/view-clients-agency',
    component: ViewClientsAgency,
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
    path: '/my-providers',
    component: ListProviders,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/provider-:id',
    component: SingleProvider,
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
    path: '/my-employees',
    component: ViewEmployees,
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
    path: '/my-dependents',
    component: MyDependents,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-plan',
    component: AddPlan,
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
    path: '/providers-claims',
    component: ProvidersClaims,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/claim-:id',
    component: SingleClaim,
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
  {
    path: '/my-complaints',
    component: MyComplaints,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-record',
    component: AddRecord,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/my-records',
    component: MyRecords,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-inventory',
    component: AddInventory,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/manage-appointments',
    component: Appointments,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/appointment/:id',
    component: SingleAppointment,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/my-inventories',
    component: MyInventories,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-agency',
    component: AddAgency,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/my-funds',
    component: ClientFunds,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/transaction',
    component: SingleTransaction,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/doctor',
    component: Doctor,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/nurse',
    component: Nurse,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/receptionist',
    component: Receptionist,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/laboratorist',
    component: Laboratorist,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/pharmacist',
    component: Pharmacist,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/accountant',
    component: Accountant,
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
