<template>
  <div >

    <main >
   <section>
        <div class="">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.firstname}} {{auth_user.lastname}}</h5>
                </div>

                <div class="col-md-12" v-if="offlineclients.length > 0">
                  <div class="alert alert-border-warning  alert-dismissible fade show" role="alert">
                                  <div class="d-flex">
                                      <div class="icon">
                                          <i class="icon mdi mdi-alert-circle-outline"></i>
                                      </div>
                                      <div class="content">
                                          <strong>{{offlineclients.length}} Users</strong> added offline.
                                          <download-excel :data="offlineclients">
                                              <button type="button" class="btn btn-primary align-right" name="button" @click="syncClients">Sync Now</button>
                                            </download-excel>

                                      </div>
                                  </div>


                              </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-secondary">
                        <div class="card-body text-white">
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
                                <p class="h4">State Formal Sector Enrollees</p>
                                <h1 class="fw-400">{{totalEnrollees | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-info">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-providers'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-activity"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">state Health Facilities</p>
                                <h1 class="fw-400">{{providers.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-warning">
                        <div class="card-body text-dark">
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
                                <p class="h4">State Claims</p>
                                <h1 class="fw-400">{{plans.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <FilterUsers/> -->
                <FilterUserProvider/>
                <FilterUserDate/>
            </div>


             <div class="row">
              <!-- <div class="col-md-12 p-t-20">
                <h5 class="h5"> <i class="fe fe-activity"></i> Formal Sector Enrollment Data</h5>

              </div> -->
              <!-- <div class="col-md-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <LGaData />
                  </div>
                </div>
              </div> -->

              <div class="col-md-12 p-t-20">
                <h5 class="h5"> <i class="fe fe-activity"></i> MDA Sector Enrollment Data</h5>

              </div>
              <div class="col-md-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <MDAData />
                  </div>
                </div>
              </div>
            </div>
            <!-- <h5 class="h5"> <i class="fe fe-activity"></i> Category of Basic Health Care Provision Fund Data</h5> -->
            <!-- <div class="row">

                <div class="col-md-6">
                  <BasicCategory />
                </div>
                <div class="col-md-6">

                </div>
              </div> -->

        </div>

    </section>
</main>

    </div>

</template>

<script>
// import LGaData from "./lgadata";
import MDAData from "./mda";
// import InformalLga from "./informallga";
// import BasicCategory from "./basicCategory";
// import FilterUsers from "./FilterUsers";
import FilterUserProvider from "./FilterUserProvider";
import FilterUserDate from "./FilterUserDate";


export default {
  components: {
     // Navbar, ClientDataDashboard
    //  LGaData,
       FilterUserProvider, FilterUserDate, MDAData
  },

  data(){
    return{
      user:null,
      mydata:"",
      totalusers:"",
      auth_user:"",
      providers:"",
      clients:"",
      total_clients:"",
      claims:"",
      offlineclients: [],
      employees:"",
      plans:"",
      tpas:"",

    }
  },
  beforeMount(){
    this.axios.get('/api/v1/auth/dashboardlga/2669')
                .then(response => {
                  this.totalusers = response.data[0].lga.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
    totalEnrollees(){
      let total = 0;
    for(let i = 0; i < this.totalusers.length; i++){
      total += parseInt(this.totalusers[i].y);
    }
    return total;
    }
  },

  methods:{
  AuthUser(){
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
    getTPAs(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/orgenrollment`)
                  .then(response => {
                      this.tpas = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/95930`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getClaims/95930`)
                  .then(response => {
                      this.claims = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


    getClients(){
      this.axios.get(`/api/v1/auth/getAgencyToUser/95930`)
                  .then(response => {
                      this.clients = response.data.data
                      this.total_clients = response.data.meta.total
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


  },
  created(){
    this.getProviders()
    this.getClaims()
    this.getClients()
    this.AuthUser()
    this.getTPAs()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
