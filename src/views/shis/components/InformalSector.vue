<template>
  <div >

    <main >
   <section >
        <div class="container">

            <div class="row">

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-info">
                        <div class="card-body text-black">
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
                                <p class="h4">Total Informal Enrollees</p>
                                <h1 class="fw-400">{{informaldata.enrollees | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-default">
                        <div class="card-body text-black">
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
                                <p class="h4">Basic Healthcare Provision Fund</p>
                                <h1 class="fw-400">{{informaldata.bhcpf | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-dark">
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
                                <p class="h4">State Equity Program</p>
                                <h1 class="fw-400">{{informaldata.sep | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-secondary">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/plans'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Voluntary Contributor</p>
                                <h1 class="fw-400">{{informaldata.voluntary | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                 <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-primary">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/plans'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4 text-white">Dependents</p>
                                <h1 class="fw-400 text-white">{{informaldata.dependants | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-light bg-gradient">
                        <div class="card-body text-black">
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
                                <p class="h4">Health Facilities</p>
                                <h1 class="fw-400">{{informaldata.providers}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-success">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-tpas'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-dark rounded-circle">
                                        <i class="fe fe-briefcase"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">TPAs</p>
                                <h1 class="fw-400">{{informaldata.tpas}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


               
                 <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-warning">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/all-claims'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Claims</p>
                                <h1 class="fw-400">{{claims.meta.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                  <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-success">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-encounters'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Encounters</p>
                                <h1 class="fw-400"> {{informaldata.encounters}} </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <FilterUserLGA/>
                <FilterUserProvider/>
                <FilterUserDate/>
            </div>

             <div class="row">

              <div class="col-md-12 p-t-20">
                <h5 class="h5"> <i class="fe fe-activity"></i> BHCPF Enrollment Data</h5>
              </div>

              <div class="col-md-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <InformalLga />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">

             <div class="col-md-12 p-t-20">
               <h5 class="h5"> <i class="fe fe-activity"></i>SEP Enrollment Data</h5>
             </div>

             <div class="col-md-12">
               <div class="card m-b-30">
                 <div class="card-body">
                   <SepSectorlga />
                 </div>
               </div>
             </div>
           </div>

            <h5 class="h5"> <i class="fe fe-activity"></i> Category of Basic Health Care Provision Fund Data</h5>
            <div class="row">

                <div class="col-md-6">
                  <BasicCategory />
                </div>
                <div class="col-md-6">
                  <genderCategory/>
                </div>

              </div>

        </div>

    </section>
</main>

    </div>

</template>

<script>
import InformalLga from "./informallga";
import SepSectorlga from "./sepSectorlga";
import BasicCategory from "./basicCategory";
import FilterUserLGA from "./FilterUserLGA";
import FilterUserProvider from "./FilterUserProvider";
import FilterUserDate from "./FilterUserDate";
import genderCategory from "./genderCategory";


export default {
  components: {
       FilterUserProvider, genderCategory, FilterUserLGA,
        InformalLga, SepSectorlga, BasicCategory, FilterUserDate
  },

  data(){
    return{
      user:null,
      mydata:"",
      informaldata:"",
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
    this.axios.get('/api/v1/auth/getinformalsectorenrollees/95930')
                .then(response => {
                  this.informaldata = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{

  },

  methods:{



    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/claims/95930`)
                  .then(response => {
                      this.claims = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },



  },
  created(){
    this.getClaims()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
