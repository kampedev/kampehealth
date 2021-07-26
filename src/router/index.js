import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Zarota from '../views/Zarota.vue'
import GetAccount from '../views/auth/GetAccount.vue'
import Privacy from '../views/auth/Privacy.vue'
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
import AddClientAgencyOffline from '../views/clients/offline/AddClientAgencyOffline.vue'
import AddClientEmployeeOffline from '../views/clients/offline/AddClientEmployeeOffline.vue'
import ALLEnrolleesOfflineEmployee from '../views/clients/offline/ALLEnrolleesOfflineEmployee.vue'
import EditOfflineEmployee from '../views/clients/offline/EditOfflineEmployee.vue'
import AddClientFormFormal from '../views/clients/AddClientFormFormal.vue'
import EditProvider from '../views/providers/EditProvider.vue'
import ManageClientsEmployee from '../views/clients/ManageClientsEmployee.vue'
import SingleClient from '../views/clients/SingleClient.vue'
import SinglePatient from '../views/clients/SinglePatient.vue'
import SingleClientBiometrics from '../views/clients/SingleClientBiometrics.vue'
import SingleClientCaptureSignature from '../views/clients/SingleClientCaptureSignature.vue'
import SingleClientSelectSector from '../views/clients/SingleClientSelectSector.vue'
import SingleClientHealthFacility from '../views/clients/SingleClientHealthFacility.vue'
import SingleClientEnrolmentSuccess from '../views/clients/SingleClientEnrolmentSuccess.vue'
import ViewClientsProvider from '../views/clients/ViewClientsProvider.vue'
import ViewClientsAgency from '../views/clients/ViewClientsAgency.vue'
import ProviderDashboard from '../views/providers/Dashboard.vue'
import HDashboard from '../views/hmos/Dashboard.vue'
import ListProviders from '../views/providers/ListProviders.vue'
import SingleProvider from '../views/providers/SingleProvider.vue'
import AddEmployee from '../views/employees/AddEmployee.vue'
import Employee from '../views/employees/Employee.vue'
import AddEmployeeState from '../views/employees/AddEmployeeState.vue'
import ViewEmployees from '../views/employees/ViewEmployees.vue'
import AddDependents from '../views/dependents/AddDependents.vue'
import MyDependents from '../views/dependents/MyDependents.vue'
import SingleDependent from '../views/dependents/SingleDependent.vue'
import AddPlan from '../views/plans/AddPlan.vue'
import Plans from '../views/plans/Plans.vue'
import Funds from '../views/funds/Funds.vue'
import StateDashboard from '../views/shis/StateDashboard.vue'
import AllClaims from '../views/claims/AllClaims.vue'
import Allreferrals from '../views/claims/Allreferrals.vue'
import AddClaim from '../views/claims/AddClaim.vue'
import UploadClaimDocuments from '../views/claims/UploadClaimDocuments.vue'
import ProvidersClaims from '../views/claims/ProvidersClaims.vue'
import SingleClaim from '../views/claims/SingleClaim.vue'
import SingleReferral from '../views/claims/SingleReferral.vue'
import EditClaim from '../views/claims/EditClaim.vue'
import ServiceProcessing from '../views/claims/ServiceProcessing.vue'
import AddReferral from '../views/claims/AddReferral.vue'
import TransferofHCP from '../views/others/TransferofHCP.vue'
import SingleTransferofHCP from '../views/others/SingleTransferofHCP.vue'
import QualityAssurance from '../views/others/QualityAssurance.vue'
import QualityAssuranceItemsHR from '../views/others/QualityAssuranceItemsHR.vue'
import QualityAssuranceItemsMntIssues from '../views/others/QualityAssuranceItemsMntIssues.vue'
import QualityAssuranceItemsClinical from '../views/others/QualityAssuranceItemsClinical.vue'
import ServiceSummaryForm from '../views/services/ServiceSummaryForm.vue'
import DetailsofTreatment from '../views/services/DetailsofTreatment.vue'
import SingleServiceSummary from '../views/services/SingleServiceSummary.vue'
import ManageDrug from '../views/drugs/ManageDrug.vue'
import ManageService from '../views/drugs/ManageService.vue'
import AddComplaint from '../views/complaints/AddComplaint.vue'
import MyComplaints from '../views/complaints/MyComplaints.vue'
import AddRecord from '../views/ehr/AddRecord.vue'
import MyRecords from '../views/ehr/MyRecords.vue'
import AddInventory from '../views/inventories/AddInventory.vue'
import MyInventories from '../views/inventories/MyInventories.vue'
import AddAgency from '../views/providers/AddAgency.vue'
import Settings from '../views/auth/Settings.vue'
import EditUser from '../views/auth/EditUser.vue'
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
import MDApage from '../views/shis/MDApage.vue'
import WardManager from '../views/shis/WardManager.vue'
import SingleLGA from '../views/shis/SingleLGA.vue'
import SingleWard from '../views/shis/SingleWard.vue'
import ListTPAs from '@/views/tpas/ListTPAs.vue'
import SingleTPA from '@/views/tpas/SingleTPA.vue'
import AddClientTPA from '@/views/tpas/AddClientTPA.vue'
import ViewClientsTPA from '@/views/tpas/ViewClientsTPA.vue'
import AddOfficers from '@/views/tpas/AddOfficers.vue'
import TPADashboard from '@/views/tpas/TPADashboard.vue'
import TPAData from '@/views/tpas/TPAData.vue'
import TPAEmployeeDashboard from '@/views/tpas/TPAEmployeeDashboard.vue'
import SingleEmployee from '@/views/employees/SingleEmployee.vue'
import DuplicateUsers from '../views/clients/DuplicateUsers.vue'
import DuplicateUsersIDcard from '../views/clients/DuplicateUsersIDcard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/landing',
    name: 'Home',
    component: Home
  },
  {
    path: '/zarota',
    component: Zarota
  },
  {
    path: '/activate-account',
    component: GetAccount
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/privacy',
    component: Privacy
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
    path: '/edit-user/:id',
    component: EditUser,
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
    path: '/add-client-offline',
    component: AddClientAgencyOffline,
    meta: {
        requiresAuth: true,
      },
  },

  {
    path: '/offline-sync',
    component: ALLEnrolleesOfflineEmployee,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/edit-offline',
    component: EditOfflineEmployee,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-client/employee-offline',
    component: AddClientEmployeeOffline,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-client-formal',
    component: AddClientFormFormal,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/manage-clients',
    component: ManageClientsEmployee,
    meta: {
        requiresAuth: true,
      },
  },

  {
    path: '/client/:id',
    component: SingleClient,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/patient/:id',
    component: SinglePatient,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client/biometrics/:id',
    component: SingleClientBiometrics,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client/capture-signature/:id',
    component: SingleClientCaptureSignature,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client-select-sector/:id',
    component: SingleClientSelectSector,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client-select-facility/:id',
    component: SingleClientHealthFacility,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/client-submit-success/:id',
    component: SingleClientEnrolmentSuccess,
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
    path: '/edit-provider/:id',
    component: EditProvider,
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
    path: '/mda-manager',
    component: MDApage,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/lga/:id',
    component: SingleLGA,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/ward/:id',
    component: SingleWard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/ward-manager',
    component: WardManager,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/provider/add-employee/:id',
    component: AddEmployee,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/employee-dashboard',
    component: Employee,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-employee-state',
    component: AddEmployeeState,
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
    path: '/add-dependent/:id',
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
    path: '/dependent/:id',
    component: SingleDependent,
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
  path: '/all-claims',
  component: AllClaims,
  meta: {
      requiresAuth: true,
    },
},
  {
  path: '/all-referrals',
  component: Allreferrals,
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
    path: '/claim/:id',
    component: SingleClaim,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/referral/:id',
    component: SingleReferral,
    meta: {
        requiresAuth: true,
      },
  },
  {
  path: '/edit-claim/:id',
  component: EditClaim,
  meta: {
      requiresAuth: true,
    },
},
  {
  path: '/upload-claims-docs/:id',
  component: UploadClaimDocuments,
  meta: {
      requiresAuth: true,
    },
},
  {
    path: '/service-processing-form/:id',
    component: ServiceProcessing,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add-referral',
    component: AddReferral,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/transfer-of-hcp',
    component: TransferofHCP,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/transfer/:id',
    component: SingleTransferofHCP,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/quality-assurance',
    component: QualityAssurance,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/quality-assurance-items-hr',
    component: QualityAssuranceItemsHR,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/quality-assurance-items-management',
    component: QualityAssuranceItemsMntIssues,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/quality-assurance-items-clinical',
    component: QualityAssuranceItemsClinical,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/service-summary-form/:id',
    component: ServiceSummaryForm,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/details-of-treatment/:id',
    component: DetailsofTreatment,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/single-service-summary',
    component: SingleServiceSummary,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/manage-drugs',
    component: ManageDrug,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/manage-services',
    component: ManageService,
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
  path: '/my-tpas',
  component: ListTPAs,
  meta: {
      requiresAuth: true,
    },
},
{
path: '/tpa/:id',
component: SingleTPA,
meta: {
    requiresAuth: true,
  },
},

{
  path: '/tpa-dashboard',
  component: TPADashboard,
  meta: {
      requiresAuth: true,
    },
},
{
  path: '/tpa-data',
  component: TPAData,
  meta: {
      requiresAuth: true,
    },
},
  {
    path: '/tpa-employee-dashboard',
    component: TPAEmployeeDashboard,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/employee/:id',
    component: SingleEmployee,
    meta: {
        requiresAuth: true,
      },
  },
{
  path: '/add-officers',
  component: AddOfficers,
  meta: {
      requiresAuth: true,
    },
},
{
  path: '/view-clients-tpa',
  component: ViewClientsTPA,
  meta: {
      requiresAuth: true,
    },
},
{
  path: '/add-client-tpa',
  component: AddClientTPA,
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
  // {
  //   path: '/provider-employee',
  //   component: ProviderEmployee,
  //   meta: {
  //       requiresAuth: true,
  //     },
  // },
  {
    path: '/personnel',
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
  {
    path: '/duplicate',
    component: DuplicateUsers,
    meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/duplicate-id-card',
    component: DuplicateUsersIDcard,
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
      next({ path: '/' });
    }
  }
  next();
});

export default router
