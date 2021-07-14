<template>
 <section class="admin-content " id="contact-search">
  <Navbar/>
    <div>
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3 class="h5"> Referral Details</h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30" >
                           <div class="card-header">

                           </div>

                           <div class="card-body">

                             <div class="form-group" >
                               <span v-if="singlereferral.authorization_code != null">
                                 <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                </span>
                                <span v-if="singlereferral.authorization_code == null">
                                  <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                 </span>

                                 <button class="btn btn-info spacer" @click="verifyRef"
                                 v-if="claimdetails.status != 1 && singlereferral.authorization_code == null && user.type == 'tpa' || user.type == 'tpa_employee'">
                                 Generate Authorization Code <i class="fe fe-lock"></i></button>

                                 <!-- <router-link :to="{ path: '/edit-claim/' + claimdetails.id}">
                                   <button class="btn btn-warning spacer" v-if="claimdetails.status == 0 && user.type == 'provider'">
                                   Update Claim Application</button>
                               </router-link> -->



                               <!-- <router-link :to="{ path: '/upload-claims-docs/' + claimdetails.id}">
                                   <button class="btn btn-pink spacer" v-if="claimdetails.status != 1" >
                                      Documents <i class="fe fe-file-plus"></i>
                                   </button>
                               </router-link> -->

                               <!-- <router-link :to="{ path: '/service-processing-form/' + claimdetails.id}">
                                   <button class="btn btn-pink spacer" v-if="claimdetails.status != 1 " >
                                      Services <i class="fe fe-thermometer"></i>
                                   </button>
                               </router-link> -->

                             </div>



                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">

                   <div class="col-lg-12 col-md-12">


                       <div class="card m-b-30">
                         <div class="card-header">
                           <p class="h3"> <strong>Patient Details <i class="fe fe-user"></i></strong></p>
                         </div>

                           <div class="card-body">
                             <div class="row">
                               <div class="col-md-6">
                                 <p class="h5"> <span class="text-primary">Full Name: </span>  {{singlereferral.client.firstname}} {{singlereferral.client.lastname}}
                                   {{singlereferral.client.middlename}}
                                 </p>
                                   <p class="h5"> <span class="text-primary">Phone Number:</span> {{singlereferral.client.phone_number}}</p>
                                   <p class="h5"><span class="text-primary">O'HIS Number:</span> {{singlereferral.client.id_card_number}}</p>
                                   <p class="h5"><span class="text-primary">Gender:</span> {{singlereferral.client.gender}}</p>
                                   <p class="h5"><span class="text-primary">HMO:</span>  {{singlereferral.tpa.organization_name}}</p>
                                   <p  class="h5"><span class="text-primary">Date of Birth:</span> {{singlereferral.client.dob}}</p>

                                   <br>
                               </div>

                                <div class="col-md-6">
                                  <p class="h5"><span class="text-primary">Recipient Facility:</span>  {{singlereferral.referred.agency_name}}</p>
                                   <p class="h5"><span class="text-primary">Referring Facility:</span> {{singlereferral.referring.agency_name}}</p>
                                   <p class="h5"><span class="text-primary">Provisional Diagnosis:</span> {{singlereferral.diagnosis.name}}</p>
                                   <p class="h5"><span class="text-primary">Prepared by:</span>  {{singlereferral.creator.firstname}} {{singlereferral.creator.lastname}}</p>
                                   <p class="h5"><span class="text-primary">Date Prepared:</span> {{singlereferral.created_at}}</p>
                                   <p class="h5"><span class="text-primary">Address:</span> {{singlereferral.client.address}}</p>

                                </div>
                             </div>


                           </div>
                       </div>
                   </div>

                       <!-- <div class="col-lg-4 col-md-4">
                           <div class="card m-b-30">
                             <div class="card-header">
                               <strong class="h4">Other Details</strong>
                             </div>

                               <div class="card-body">
                                 <p>


                                 </p>



                               </div>
                           </div>
                       </div> -->


               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>Clinical Findings/ Investigations<i class="fe fe-file"></i></strong></p>
                           </div>

                           <div class="card-body">
                              {{singlereferral.investigations}}

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>Referral Note/ Reason for Referral<i class="fe fe-file"></i></strong></p>
                           </div>

                           <div class="card-body">
                              {{singlereferral.reason}}

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>Treatment Given<i class="fe fe-file"></i></strong></p>
                           </div>

                           <div class="card-body">
                              {{singlereferral.treatment_given}}

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
      singlereferral:"",
      comments:"",
      shownotes:false,
      facility:"",
      clientdetail:"",
      body:"",
      claimdetails:"",
      prepared_by:"",
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
      //
  },
  methods:{

    getReferral(){
      this.isLoading = true
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/referrals/${this.$route.params.id}`)
                  .then(response => {
                      this.singlereferral = response.data

                      console.log(response)
                      this.isLoading = false
                  })
                  .catch(error => {
                      console.error(error);
                      this.isLoading = true
                  })
    },

    addComment(){
        this.axios.post(`/api/v1/auth/addComment`,{
          user_id: this.user.id,
          claim_id: this.$route.params.id,
          body: this.body
        })
                    .then(response => {
                        console.log(response)
                        this.getReferral()
                        this.show = false
                        this.$toasted.info('updated Successfully!', {position: 'top-center', duration:3000 })

                })
    },

    verifyRef(){
      if (confirm('Are you sure you want to approve this referral by generating an authorization code?') ) {
        this.axios.post(`/api/v1/auth/generate-token/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response)
                        this.getReferral()
                        this.$toasted.info('Code generated Successfully!', {position: 'top-center', duration:3000 })

                })
      }
    }

  },
  created(){
  this.getReferral()
  }

}
</script>
<style scoped >
.spacer{
  margin-top:10px;
  margin-bottom:10px;
}
</style>
