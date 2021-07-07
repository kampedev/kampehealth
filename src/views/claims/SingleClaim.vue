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
                       <h3 class="h5"> Claim Details</h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30" >
                           <div class="card-header">

                           </div>

                           <div class="card-body">

                             <div class="form-group" >

                                 <button class="btn btn-info spacer" @click="approveClaim" v-if="claimdetails.status != 1 && user.type == 'shis'">Approve</button>

                                 <router-link :to="{ path: '/edit-claim/' + claimdetails.id}">
                                 <button class="btn btn-warning spacer" v-if="claimdetails.status == 0 && user.type == 'provider'">Update Claim Application</button>
                               </router-link>

                               <button class="btn btn-primary"  style="margin-left:10px;" @click="rejectClaim" v-if="claimdetails.status != 0 && claimdetails.status == null && user.type == 'shis'">Reject</button>

                               <div class="form-group col-md-12" v-show="show">
                                  <label for="inputAddress">Please add a Rejection Comment</label>
                                  <textarea name="name" rows="5" cols="80" class="form-control" v-model="body"></textarea>
                                  <button type="button" class="btn btn-primary" @click="addComment">submit</button>
                              </div>

                             </div>



                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">

                       <div class="card m-b-30">
                         <div class="card-header">
                           <p> <strong>Services/Drugs</strong></p>
                         </div>

                           <div class="card-body">
                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Cost</th>

                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="service in singleclaim.services" v-bind:key="service.id">


                                         <td>{{service.description}}</td>
                                         <td>&#8358;{{service.cost | numeral(0,0)}}</td>
                                         <!-- <td>
                                           <button class="btn btn-info" name="button"><i class="fe fe-edit"></i> </button>
                                           <button class="btn btn-danger" name="button"><i class="fe fe-delete"></i> </button>
                                         </td> -->

                                     </tr>
                                     <tr v-for="drug in singleclaim.drugs" v-bind:key="drug.id">


                                         <td>{{drug.drug_name}}</td>
                                         <td>&#8358;{{drug.cost | numeral(0,0)}}</td>
                                         <!-- <td>
                                           <button class="btn btn-info" name="button"><i class="fe fe-edit"></i> </button>
                                           <button class="btn btn-danger" name="button"><i class="fe fe-delete"></i> </button>
                                         </td> -->

                                     </tr>
                                     <tr>
                                       <td> <strong>Total Fee</strong></td>
                                       <td> <strong>&#8358;{{singleclaim.sum | numeral(0,0)}}</strong></td>
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
                               <strong class="h4">Other Details</strong>
                             </div>

                               <div class="card-body">
                                 <p>
                                   <span v-if="claimdetails.status == 1">
                                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                    </span>
                                    <span v-if="claimdetails.status == 0">
                                      <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger">rejected</button>
                                     </span>
                                    <span v-if="claimdetails.status == null">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                 </span>
                                 </p>

                                 <div class="card bg-success" v-if="claimdetails.status == 0">
                                    <div class="card-body">
                                      <p class="text-white"> <strong>Rejection Note:</strong>
                                        {{comment.body}}
                                      </p>
                                    </div>
                                 </div>

                                 <p><strong>Health Facility:</strong>  {{facility.agency_name}}</p>
                                 <br>
                                 <p><strong>Prepared by:</strong>  {{prepared_by.firstname}} {{prepared_by.lastname}}</p>
                                 <br>
                                 <p><strong>Enrollee/ Patient:</strong>  {{clientdetail.firstname}} {{clientdetail.lastname}}</p>
                                 <br>

                                 <p><strong>Date Seen:</strong> {{claimdetails.seen_date}}</p>
                                 <br>
                                 <p><strong>Diagnosis:</strong> {{claimdetails.diagnosis}}</p>
                                 <br>


                               </div>
                           </div>
                       </div>


               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>Claim Documents:</strong></p>
                           </div>

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Document</th>
                                         <th>Date Uploaded</th>
                                         <th>Action</th>

                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="doc in singleclaim.docs" v-bind:key="doc.id">


                                         <td>{{doc.document}}</td>
                                         <td>{{doc.created_at}}</td>
                                         <td>
                                           <a :href="'https://api.hayokinsurance.com/documents/'+ doc.document"  target="_blank">
                                             <button class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                           </a>
                                         </td>

                                     </tr>

                                     </tbody>
                                 </table>

                             </div>

                           </div>
                       </div>
                   </div>


               </div>

               <!-- <div class="col-lg-4 col-md-4">
                   <div class="card m-b-30">
                     <div class="card-header">
                       <strong class="h4">Rejection Note</strong>
                     </div>

                       <div class="card-body">

                        <p></p>


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
      singleclaim:"",
      comment:"",
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

    getClaim(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
                  .then(response => {
                      this.singleclaim = response.data
                      this.comment = response.data.comments[0]
                      this.claimdetails = response.data.singleclaim[0]
                      //single client
                      this.axios.get(`/api/v1/auth/user/${response.data.singleclaim[0].client_name}`)
                                  .then(response => {
                                      this.clientdetail = response.data.user
                                      console.log(response)})
                      //end of single client

                      // Prepared by
                      this.axios.get(`/api/v1/auth/user/${response.data.singleclaim[0].user_id}`)
                                  .then(response => {
                                      this.prepared_by = response.data.user
                                      console.log(response)})
                      //end of Prepared by
                      //get facility
                      this.axios.get(`/api/v1/auth/detailedProviderHmo/${response.data.singleclaim[0].provider_id}`)
                                  .then(response => {
                                      this.facility = response.data.data[0]
                                      console.log(response)
                                  })
                      //end of get facility
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
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
                        this.getClaim()
                        this.show = false
                        this.$toasted.info('updated Successfully!', {position: 'top-center', duration:3000 })

                })
    },
    approveClaim(){
      if (confirm('Are you sure you want to approve?') ) {
        this.axios.post(`/api/v1/auth/acceptClaim/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response)
                        this.getClaim()
                        this.$toasted.info('updated Successfully!', {position: 'top-center', duration:3000 })

                })
      }
    },
    rejectClaim(){
      if (confirm('Are you sure you want to reject?') ) {
        this.axios.post(`/api/v1/auth/rejectClaim/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response)
                        // this.getClaim()
                        this.show = true;
                })
      }
    }
  },
  created(){
  this.getClaim()
  }

}
</script>
<style scoped >
.spacer{
  margin-top:10px;
  margin-bottom:10px;
}
</style>
