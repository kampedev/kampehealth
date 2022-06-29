<template>
  <div >

    <main >
   <section>
        <div class="">

            <div class="row">

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
                                <p class="h4">Total Formal Sector Enrollees</p>
                                <h1 class="fw-400">{{total | numeral(0,0)}}</h1>
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
                                <p class="h4">Accredited Health Facilities</p>
                                <h1 class="fw-400">{{formaldata.providers | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-default">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/view-clients-agency'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-user-plus"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Principal Enrollees</p>
                                <h1 class="fw-400">{{formaldata.enrollees | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                  <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-dark">
                        <div class="card-body text-white">
                            <div class="pb-2">
                              <router-link :to="{ path: '/#'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Dependents</p>
                                <h1 class="fw-400">{{formaldata.dependants | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                 <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-success">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/all-claims'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-clipboard"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Claims</p>
                                <h1 class="fw-400">{{claims.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-info">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/list-records'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-file-plus"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Encounters</p>
                                <h1 class="fw-400">{{formaldata.encounters}} </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <FilterUserProvider/>
                <FilterUserDate/>
            </div>


             <div class="row">


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


        </div>

    </section>
</main>

    </div>

</template>

<script>

import MDAData from "./mda";
import FilterUserProvider from "./FilterUserProvider";
import FilterUserDate from "./FilterUserDate";


export default {
  components: {

       FilterUserProvider, FilterUserDate, MDAData
  },

  data(){
    return{
      user:null,
      mydata:"",
      formaldata:"",
      total:0,
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
    this.axios.get('/api/v1/auth/getformalsectorenrollees/95930')
                .then(response => {
                  this.formaldata = response.data
                  this.total = response.data.enrollees + response.data.dependants
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
  totalFormal(){
    let total =  this.formaldata.enrollees + this.formaldata.dependants
    return total
  }
  },

  methods:{


    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/claims/95930`,{
        params:{
           claim_status: 'All',
        }
      })
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
