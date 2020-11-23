<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3> </h3>
                       <strong> Services Added</strong>



                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-body">

                              <div class="row col-md-12">
                                <div class="col-md-2">
                                    <button class="btn btn-primary" @click="showService = !showService">Add Service</button>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-primary" @click="showCategory = !showCategory">Add Service Category</button>
                                </div>

                              </div>

                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="showService">
                     <AddService/>
                   </div>
                   <div class="col-md-12" v-show="showCategory">
                     <AddServiceCategory/>
                   </div>



                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Services</h5>
                       <div class="table-responsive">


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

       </section>
    </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import AddService from '@/views/drugs/AddService.vue'
  import AddServiceCategory from '@/views/drugs/AddServiceCategory.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, AddService, AddServiceCategory
  },
  data(){
    return{
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      showService:false,
      showCategory:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      states:"",
      state:"",
      lga_states:"",

    }
  },
  beforeMount(){
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
  methods:{

    getStates(){
      this.axios.get(`/api/v1/auth/states`)
                  .then(response => {
                      this.states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchLga(state){
      this.axios.get(`/api/v1/auth/lga/${state.id}`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


  },
  created(){
    this.getStates()
  }

}
</script>
