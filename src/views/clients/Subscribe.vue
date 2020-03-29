<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3> Subscribe Plan</h3>


                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                               <!-- <div class="text-center">

                                   <h3 class="p-t-10 searchBy-name">Make Subscription</h3>
                               </div> -->

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">Select HMO or State </label>
                                                                 <select class="form-control"  v-model="agency_id" @change="getProviders(agency_id);getPlans(agency_id)">
                                                                  <option id="Parent" v-for="hmo in hmos" v-bind:key="hmo.id" :value="hmo.id" >{{hmo.agency_name}}</option>
                                                              </select>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Select Provider</label>
                                                                 <select class="form-control"  v-model="provider_id">
                                                                  <option id="Parent" v-for="provider in providers" v-bind:key="provider.id" :value="provider.id">{{provider.agency_name}}</option>
                                                                </select>
                                                              </div>
                                                         </div>
                                                         <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                <label for="inputPassword4">Select Plan</label>
                                                                <select class="form-control"  v-model="plan_id">
                                                                 <option id="Parent" v-for="plan in plans" v-bind:key="plan.id" :value="plan.id">{{plan.title}} ({{plan.cost | numeral('0,0')}})</option>
                                                               </select>
                                                              </div>

                                                          </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="makeSubscribe">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>



                   <div class="col-lg-4 col-md-6" v-for="plan in myplan" v-bind:key="plan.id">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#">5000</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>

                                   </div>
                                   <h3 class="p-t-10 searchBy-name">Gold Plan</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                   {{plan.agency_name}}

                               </div>

                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-edit"></h3>
                                           <div class="text-overline">Edit</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-eye"></h3>
                                           <div class="text-overline">View</div>

                                       </a>

                                   </div>

                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="fullPage"></loading>
                    </div>

               </div>
           </div>

       </section>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      hmos:"",
      agency_id:"",
      provider_id:"",
      plan_id:"",
      providers:"",
      plans:"",
      myplan:"",
      user:null,
      isLoading: false,
      fullPage: true,
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/allHmo`)
                .then(response => {
                    this.hmos = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods:{

    getProviders(agency_id){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/providerAgency/${agency_id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getPlans(agency_id){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/planAgency/${agency_id}`)
                  .then(response => {
                      this.plans = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    makeSubscribe(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/subscribePlan',{
        agency_id: this.agency_id,
        plan_id: this.plan_id,
        provider_id: this.provider_id,
        user_id: this.user.id,
        status: true
      })
    .then(response=>{
        console.log(response);
        this.getMyPlan()
        this.$breadstick.notify("Subscription completed Successfully!", {position: "top-right"});
        this.isLoading = false;

    })
    .catch(error=>{
        console.log(error.response)
    })
  },
  getMyPlan(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/userSubscribedPlan`)
                .then(response => {
                    this.myplan = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
          }
    },

  created(){
    this.getMyPlan()
  }

}
</script>
