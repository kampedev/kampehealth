<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3>Health CLub Clinic</h3>
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

                                                         <div class="form-group">
                                                             <button class="btn btn-primary">Export to CSV</button>
                                                         </div>
                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <h3 class="p-t-10 searchBy-name">Provider Details</h3>
                           </div>

                           <div class="card-body">
                             <p><strong>E - Mail:</strong></p>
                             <p><strong>Phone Number:</strong></p>
                             <p><strong>State:</strong></p>
                             <p><strong>Website:</strong></p>
                             <p><strong>Description:</strong></p>
                             <p><strong>Total Clients:</strong></p>


                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-4">
                           <div class="card m-b-30">
                               <div class="card-header">

                                 <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                               </div>

                               <div class="card-body">

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary">accept</button>
                                                                 <button class="btn btn-danger spacer">reject</button>
                                                             </div>
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
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
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

    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.getHmo()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
</style>
