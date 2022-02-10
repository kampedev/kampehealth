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
                             <div class="form-group" >

                               <details v-if="singlereferral.status == 'approved'">
                                 <summary>
                                   <span class="btn btn-outline-info" >
                                   Authorization Code: <i class="mdi mdi-eye-check"></i>
                                   </span>
                                 </summary>
                                 <p>{{singlereferral.authorization_code}}</p>
                               </details>

                                <button class="btn btn-default spacer"  @click="shownotes = !shownotes">
                                  {{singlereferral.comments.length}} Notes <i class="fe fe-clipboard"></i>
                                </button>

                                <button class="btn btn-info spacer" @click="verifyRef"
                                 v-if="singlereferral.status != 'rejected' && singlereferral.status != 'approved' && user.type == 'tpa' || user.type == 'tpa_employee'">
                                 Generate Authorization Code <i class="fe fe-lock"></i>
                               </button>

                                 <button class="btn btn-danger spacer" @click="rejectRef"
                                 v-if="singlereferral.status != 'rejected' && singlereferral.status != 'approved'  && user.type == 'tpa' || user.type == 'tpa_employee'">
                                 reject <i class="fe fe-x"></i></button>

                             </div>

                           </div>

                           <div class="card-body">

                             <div class="form-group col-md-12" v-show="show">
                                <label for="inputAddress">Please add a Rejection Comment</label>
                                <textarea name="name" rows="5" cols="80" class="form-control" v-model="body"></textarea>
                                <button type="button" class="btn btn-primary" @click="addComment">submit</button>
                            </div>


                           </div>
                       </div>
                   </div>
               </div>

               <div class="col-md-12">
                 <span v-if="singlereferral.status == 'approved'">
                   <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                  </span>

                  <span v-if="singlereferral.status == 'rejected'">
                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger">rejected</button>
                   </span>

                  <span v-if="singlereferral.status == 'pending'">
                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                  </span>

               </div>

               <div class="row">

                 <div class="col-lg-8 col-md-8" v-show="shownotes">
                     <div class="card m-b-30">
                         <div class="card-body">

                           <div class="card bg-default" v-for="comment in singlereferral.comments"
                            v-bind:key="comment.id"
                            style="margin-top:10px;">
                              <div class="card-body">
                                <p class="">
                                  {{comment.body}}
                                </p>
                                <p class="text-info">By: {{comment.user.firstname}} {{comment.user.lastname}} -
                                  <span >{{comment.user.type}}</span> </p>
                              </div>
                           </div>


                         </div>
                     </div>
                 </div>

                   <div class="col-lg-12 col-md-12">

                       <div class="card m-b-30">
                         <div class="card-header">
                           <p class="h4"> <strong>Patient Details <i class="fe fe-user"></i></strong></p>
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


               </div>

               <div class="row">
                   <div class="col-md-8 offset-md-2">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p class="h4"><strong>Clinical Findings/ Investigations<i class="fe fe-file"></i></strong></p>
                           </div>

                           <div class="card-body">
                              {{singlereferral.investigations}}

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-md-8 offset-md-2">
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
                   <div class="col-md-8 offset-md-2">
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
        this.axios.post(`/api/v1/auth/addComment/referral`,{
          user_id: this.user.id,
          referral_id: this.$route.params.id,
          body: this.body
        })
                    .then(response => {
                        console.log(response)
                        this.getReferral()
                        this.$router.push(`/all-referrals`)
                        this.$toasted.info('added Successfully!', {position: 'top-center', duration:3000 })
                })
    },

    rejectRef(){
      if (confirm('Are you sure you want to reject this request?') ) {
        this.axios.post(`/api/v1/auth/generate-token/${this.$route.params.id}`,{
          type: 'rejection'
        })
                    .then(response => {
                        console.log(response)
                        this.show = true
                        this.getReferral()
                        this.$toasted.info('Rejected Successfully!', {position: 'top-center', duration:3000 })

                })
      }
    },
    verifyRef(){
      if (confirm('Are you sure you want to generate authorization code to approve?') ) {
        this.axios.post(`/api/v1/auth/generate-token/${this.$route.params.id}`,{
          type:'approval'
        })
                    .then(response => {
                        console.log(response)
                        this.getReferral()
                        this.$router.push(`/all-referrals`)
                        this.$toasted.info('Approved Successfully!', {position: 'top-center', duration:3000 })

                })
      }
    },


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
