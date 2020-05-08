<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.agency_name}}</h5>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/fund-manager'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                                </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Revenue</p>
                                <h1 class="fw-400">&#8358;103,500</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                  <router-link :to="{ path: '/view-clients-agency'}">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                  </router-link>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Clients</p>
                                <h1 class="fw-400">{{clients.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/plans'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Plans</p>
                                <h1 class="fw-400">{{plans.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-providers'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Providers</p>
                                <h1 class="fw-400">{{providers.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12 p-t-20">
                    <h1 class="fw-300">Analytics</h1>
                </div>
                <div class="col-12 m-t-20">
                    <h5> <i class="fe fe-activity"></i> Overview</h5>
                </div>
                <div class="col-md-12">
                    <div class="card m-b-30">
                      <div class="card-body">
                          <div class="apexcharts-canvas" id="chart-06"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i>{{employees.length}} Employees</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr >
                                <!-- <th>Avatar</th> -->
                                <th>Name</th>
                                <th>Position</th>

                                <th>Start date</th>
                                <!-- <th>Salary</th> -->
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="employee in employees" v-bind:key="employee.id">

                                <td>{{employee.firstname}} {{employee.lastname}}</td>
                                <td>{{employee.job_title}}</td>
                                <td>{{employee.email}}</td>
                            </tr>

                            </tbody>
                        </table>

                    </div>
                </div>

                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i>{{claims.length}} Claims</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Diagnosis</th>
                                <th>Seen date</th>
                                <th>Cost</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="claim in claims" v-bind:key="claim.id">
                                <td>
                                  {{claim.client_name}}
                                </td>
                                <td>{{claim.diagnosis}} </td>
                                <td>{{claim.seen_date}}</td>
                                <td><i class="mdi mdi-currency-ngn"></i> {{claim.cost | numeral('0,0.00')}}</td>
                                <td>
                                  <span v-if="claim.status == 1">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                    </span>
                                   <span v-if="claim.status != 1">
                                   <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                </span>

                                </td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>

            </div>


            <div class="row">


            </div>
        </div>

    </section>
</main>

    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'

export default {
  components: {
     Navbar
  },
  data(){
    return{
      user:null,
      auth_user:"",
      providers:"",
      clients:"",
      claims:"",
      employees:"",
      plans:"",

    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getEmployees(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getEmployee/${this.user.id}`)
                  .then(response => {
                      this.employees = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getClaims/${this.user.id}`)
                  .then(response => {
                      this.claims = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getPlans(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/planAgency/${this.user.id}`)
                  .then(response => {
                      this.plans = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getSubsAgency/${this.user.id}`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    }
  },
  created(){
    this.getProviders()
    this.getClaims()
    this.getPlans()
    this.getClients()
    this.getEmployees()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
