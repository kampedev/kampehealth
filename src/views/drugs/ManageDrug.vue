<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-12  mx-auto text-white p-b-30">

                     <div class="col-md-4">
                       <h3 class="h3">{{providers.length}} Drugs Added </h3>
                     </div>

                       <div class="row col-md-12">
                         <div class="col-md-2">
                             <button class="btn btn-primary" @click="showDrug = !showDrug">Add Drug</button>
                         </div>
                         <div class="col-md-2">
                             <button class="btn btn-primary" @click="showCategory = !showCategory">Add Drug Category</button>
                         </div>
                         <div class="col-md-2">
                             <button class="btn btn-primary" @click="showSubCategory = !showSubCategory">Add Sub Category</button>
                         </div>

                       </div>


                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">


                   <div class="col-md-12" v-show="showDrug">
                     <AddDrug/>
                   </div>
                   <div class="col-md-12" v-show="showCategory">
                     <AddDrugCategory/>
                   </div>

                   <div class="col-md-12" v-show="showSubCategory">
                     <AddSubCategory/>
                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Drugs</h5>
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
  import AddDrug from '@/views/drugs/AddDrug.vue'
  import AddDrugCategory from '@/views/drugs/AddDrugCategory.vue'
  import AddSubCategory from '@/views/drugs/AddSubCategory.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, AddDrug, AddDrugCategory, AddSubCategory
  },
  data(){
    return{
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      showDrug:false,
      showCategory:false,
      showSubCategory:false,
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
