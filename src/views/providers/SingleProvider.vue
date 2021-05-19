<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div v-for="provider in singleprovider" v-bind:key="provider.id">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3 class="h5"> {{provider.agency_name}} </h3>
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

                           </div>

                           <div class="card-body">

                             <div class="form-group" >
                                 <button class="btn btn-primary" @click="acceptProvider" v-if="provider.status == false">Approve</button>
                                 <router-link :to="{ path: '/provider/add-employee/' + provider.id }">
                                 <button class="btn btn-info spacer">Add Personnel</button>
                               </router-link>

                               <router-link :to="{ path: '/edit-provider/' + provider.id }">
                               <button class="btn btn-primary"  style="margin-left:10px;">Edit Facility </button>
                             </router-link>


                             </div>



                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">

                       <div class="card m-b-30">
                         <div class="card-header">
                           <h4 class="h4"> Facility Enrollees</h4>

                         </div>

                           <div class="card-body">
                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Contact</th>
                                         <th>Status</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="enrollee in providerclients" v-bind:key="enrollee.id">

                                         <td>
                                           <router-link :to="{ path: '/provider-' + provider.id }">
                                           {{enrollee.firstname}} {{enrollee.lastname}}
                                         </router-link>

                                         </td>
                                         <td>{{enrollee.phone_number}}</td>
                                         <td>{{enrollee.sector}}</td>

                                         <td>
                                           <router-link :to="{ path: '/client/'+ enrollee.id}">
                                             <button type="button" name="button" class="btn btn-info">view</button>
                                            </router-link>
                                         </td>
                                     </tr>

                                     </tbody>
                                 </table>

                             </div>


                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-4">
                           <div class="card m-b-30">
                             <div class="card-header">
                               <strong class="h4">Facility Details</strong>
                             </div>

                               <div class="card-body">
                                 <p>
                                   <span v-if="provider.status == true">
                                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                     </span>
                                    <span v-if="provider.status == false">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                  </span>
                                 </p>
                                 <p><strong>Beneficiaries Enrolled:</strong>  {{providerclients.length}}</p>
                                 <br>
                                 <p><strong>Contact Name:</strong>  {{provider.firstname}} {{provider.lastname}}</p>
                                 <br>
                                 <p><strong>E - Mail:</strong>  {{provider.email}}</p>
                                 <br>
                                 <p><strong>Phone Number:</strong> {{provider.phone_number}}</p>
                                 <br>
                                 <p><strong>Facilty Type:</strong> {{provider.phc_general}}</p>
                                 <br>
                                 <p><strong>Website:</strong> {{provider.website}}</p>
                                 <br>

                               </div>
                           </div>
                       </div>
               </div>

               <!-- <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>CAC Document:</strong></p>
                           </div>

                           <div class="card-body">


                           </div>
                       </div>
                   </div>

               </div> -->




           </div>


           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>

       </section>
     </div>

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
      singleprovider:"",
      providerclients:"",
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/detailedProviderHmo/${this.$route.params.id}`)
                .then(response => {
                    this.singleprovider = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getProvider(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/detailedProviderHmo/${this.$route.params.id}`)
                  .then(response => {
                      this.singleprovider = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getProviderClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getProviderToUser/${this.$route.params.id}`)
                  .then(response => {
                      this.providerclients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


    acceptProvider(){
      if (confirm('Are You Sure You Want to Approve Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 1

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Approved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()
        // this.$router.push(`/client/${this.$route.params.id}`)
        this.$router.push(`/my-providers`)


    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    rejectProvider(){
      if (confirm('Are You Sure You Want to Disapprove this Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 0

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Disapproved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()

    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.getProvider()
    this.getProviderClients()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
</style>
