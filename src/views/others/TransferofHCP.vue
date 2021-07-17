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
                       <h3 class="h4"> Transfer of Health Facility</h3>

                   </div>

               </div>
           </div>
       </div>
       <section >
           <div class="container">
             <button type="button" class="btn btn-primary" @click="show = !show" style="margin-bottom:20px;">
               Make New Request <i class="fe fe-plus"></i></button>

               <div class="row list" v-show="show">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                                <div class="form-row">

                                     <div class="form-group col-md-6">
                                       <label for="inputCity">Enrollee OHIS Number</label>
                                       <input type="text" class="form-control"  v-model="searchkey" @change="searchIDCard">
                                     </div>

                                     <div class="form-group col-md-6" v-if="enrollee_details != ''">
                                       <label for="inputCity">Client Surname</label>
                                       <input type="text" class="form-control"  :value="enrollee_details.user.lastname" disabled>
                                     </div>

                                     <div class="form-group col-md-6" v-if="enrollee_details != ''">
                                       <label for="inputCity">Client First Name</label>
                                       <input type="text" class="form-control"  :value="enrollee_details.user.firstname" disabled>
                                     </div>
                                     <div class="form-group col-md-6" v-if="enrollee_details != ''">
                                       <label for="inputCity">Client Phone Number</label>
                                       <input type="text" class="form-control" :value="enrollee_details.user.phone_number" disabled>
                                     </div>

                                 </div>

                                 <div class="form-row">

                                   <div class="form-group col-md-12">
                                     <label for="inputCity">Reason for Change</label>
                                     <textarea rows="5" cols="80" class="form-control" v-model="transfer.reason_for_change"></textarea>
                                     <!-- <input type="text" class="form-control"  placeholder="Reason for Change" v-model="transfer.reason_for_change"> -->
                                   </div>


                                 </div>
                                 <div class="row col-md-12" v-if="enrollee_details != ''">
                                   <!-- <textarea name="name" rows="8" cols="80" class="form-control" v-model="claim.treatment"></textarea> -->
                                   <div class="col-md-12 text-center">
                                     <p class="h4">Change of HCP</p>
                                   </div>
                                   <div class="form-group col-md-6">
                                     <label for="inputCity">From Facility</label>
                                     <input type="text" class="form-control" :value="enrollee_details.provider.agency_name" disabled>
                                   </div>
                                   <div class="form-group col-md-6">
                                     <label for="inputPassword4">New Facility</label>
                                     <v-select v-model="transfer.new_health_facility" :options="providers" label="agency_name" :value="transfer.new_health_facility" @input="selected"></v-select>

                                    </div>

                                 </div>



                                 <div class="form-group">
                                     <button class="btn btn-primary btn-block btn-lg" @click="makeRequest">Submit</button>
                                 </div>

                           </div>
                       </div>
                   </div>

               </div>

                <div class="row">

                                 <div :class="card_style">
                                   <div class="card">
                                     <div class="card card-header">
                                       <p class="h4">{{transfers.total}} Transfer of Facility Requests <i class="mdi mdi-bank-transfer"></i></p>
                                     </div>
                                     <div class="card card-body">
                                       <div class="table-responsive">
                                           <table class="table align-td-middle table-card">
                                               <thead>
                                               <tr>
                                                   <!-- <th>Date</th> -->
                                                   <th>Patient Name</th>
                                                   <th>Current facility</th>
                                                   <th>Proposed (New) Facility</th>
                                                   <th>Status</th>
                                                   <th>Action</th>
                                               </tr>
                                               </thead>
                                               <tbody>
                                               <tr v-for="ref in transfers.data" v-bind:key="ref.id">

                                                   <!-- <td> {{ref.created_at}} </td> -->

                                                   <td>{{ref.client.firstname}} {{ref.client.lastname}}</td>
                                                   <td>{{ref.oldfacility.agency_name}}</td>
                                                   <td>{{ref.newfacility.agency_name}}</td>

                                                   <td>
                                                     <span v-if="ref.status == 'approved'">
                                                       <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                                      </span>
                                                      <span v-if="ref.status == 'declined'">
                                                        <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger">declined</button>
                                                       </span>
                                                      <span v-if="ref.status == 'created'">
                                                        <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                                      </span>

                                                   </td>
                                                   <td>
                                                     <router-link :to="{ path: '/transfer/'+ ref.id}">
                                                       <button type="button" name="button" class="btn btn-default"><i class="fe fe-eye"></i></button>
                                                      </router-link>
                                                      <button  class="btn btn-info" @click="quickView(ref)"><i class="mdi mdi-eye-check"></i></button>

                                                   </td>
                                               </tr>

                                               </tbody>
                                           </table>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                                <div class="col-md-4" v-if="quickref != ''">
                                    <div class="card">
                                      <div class="card card-header">
                                        <div class="card card-body">
                                            <!-- <p class="h4">Request Details</p> -->
                                            <p class="h5"> <strong>Reason for Referral:</strong> </p>

                                              <p>{{quickref.reason_for_change}}</p>
                                              <hr>
                                              <div class="col-md-12" v-if="user.type =='shis' || user.user_role != 0">
                                              <button class="btn btn-info spacer" v-if="quickref.status != 'approved'"
                                                @click="updateRequestA">
                                                approve <i class="fe fe-check-square"></i>
                                              </button>

                                              <button class="btn btn-danger spacer"   v-if="quickref.status != 'approved'"
                                              @click="updateRequestR">decline <i class="fe fe-x-circle"></i> </button>
                                            </div>

                                              <div class="row col-md-12">
                                                <div class="col-md-6">
                                                  <p class="text-left"><strong>{{quickref.status}} </strong>  </p>
                                                </div>
                                                  <div class="col-md-6">
                                                    <p class="text-right">{{quickref.created_at}}</p>
                                                  </div>
                                              </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>

           </div>

       </section>

       <div class="vld-parent">
            <loading :active.sync="isLoading"
            loader="dots"
            :can-cancel="true"
            :is-full-page="fullPage"></loading>
        </div>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      // editor: ClassicEditor,
      user:null,
      search_result:"",
      enrollee_details:"",
      searchkey:"",
      transfers:"",
      quickref:"",
      card_style:"col-md-12",
      edit:false,
      isLoading: false,
      show: false,
      fullPage: true,
      transfer:{
        reason_for_change:"",
        client_id:"",
        new_health_facility:"",
        previous_health_facility:"",
        status:"",
        prepared_by:"",
      },

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  computed:{
    //
  },
  methods:{
    selected(value){
      this.transfer.new_health_facility = value
    },

    clearIt(){
      this.transfer.reason_for_change =""
      this.transfer.new_health_facility = ""
      this.transfer.previous_health_facility = ""
      this.transfer.status = ""
      this.transfer.prepared_by = ""

    },
    quickView(ref) {
      this.isLoading = true;
      this.card_style = 'col-md-8'
      this.axios.get(`/api/v1/auth/change_providers/${ref.id}`)
        .then(response => {
          console.log(response);
          this.quickref = response.data
          this.isLoading = false;

        })
        .catch(error => {
          console.log(error.response)
          this.isLoading = false;

        })
    },
    updateRequestA(){
      if (confirm('Are you sure you want to approve this request')) {
        this.isLoading = true;
        this.axios.post(`/api/v1/auth/change_providers/update/${this.quickref.id}`,{
            status: 'approved'
        })
          .then(response => {
            console.log(response);
            this.getTransfer()
            this.isLoading = false;

          })
          .catch(error => {
            console.log(error.response)
            this.isLoading = false;

          })
      }
    },
    updateRequestR(){
      if (confirm('Are you sure you want to reject?')) {
        this.isLoading = true;
        this.axios.post(`/api/v1/auth/change_providers/update/${this.quickref.id}`,{
            status: 'declined'
        })
          .then(response => {
            console.log(response);
            this.getTransfer()
            this.isLoading = false;

          })
          .catch(error => {
            console.log(error.response)
            this.isLoading = false;

          })
      }
    },
    searchIDCard(){
      this.loading = true
      this.axios.post(`/api/v1/auth/getuserbyIdcard`,{
            id_card_number: this.searchkey,
      })
            .then(response => {
                this.search_result = response.data.data
                 // this.enrollee_details = response.data.data
                 //Get Enrollee Details
                 this.axios.get(`/api/v1/auth/user/zam/${this.search_result.id}`)
                             .then(response => {
                                 this.enrollee_details = response.data
                                 console.log(response)
                             })
                             .catch(error => {
                                 console.error(error);
                             })
                 //End of Enrollee Details
                console.log(response)
                  // this.$router.push(`/client/${user.id}`)
                  this.$toasted.info('Searched Successfully', {position: 'top-center', duration:3000 })

                this.loading = false

            })
            .catch(error => {
                console.error(error);
                this.loading = false
                this.$toasted.info('User not Found', {position: 'top-center', duration:3000 })
            })
    },

  getClient(){
    this.axios.get(`/api/v1/auth/user/${this.claim.client_id}`)
                .then(response => {
                    this.client = response.data.user
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },

getProviders(){
  this.user = JSON.parse(localStorage.getItem('user'))
  this.axios.get(`/api/v1/auth/providerAgency/95930`)
              .then(response => {
                  this.providers = response.data.data
                  console.log(response)
              })
              .catch(error => {
                  console.error(error);
              })
},
AllTransfers(){
  this.user = JSON.parse(localStorage.getItem('user'))
  this.axios.get(`/api/v1/auth/all/change_providers/95930`)
              .then(response => {
                  this.transfers = response.data
                  console.log(response)
              })
              .catch(error => {
                  console.error(error);
              })
},
makeRequest(){
        this.user = JSON.parse(localStorage.getItem('user'))
        if (this.edit === false) {
        // Add claim
        this.isLoading = true;
        this.axios.post('/api/v1/auth/change_providers',{
          client_id: this.search_result.id,
          prepared_by: this.user.id,
          agency_id: 95930,
          new_health_facility: this.transfer.new_health_facility.id,
          previous_health_facility: this.search_result.provider_id,
          status: 'created',
          reason_for_change: this.transfer.reason_for_change,
        })

        .then(response=>{
            console.log(response);
            this.AllTransfers()
            this.clearIt();
            this.isLoading = false;
            this.$toasted.info('Request submitted Successfully', {position: 'top-center', duration:3000 })

        })
        .catch(error=>{
            console.log(error.response)
        })
        }else {
        // Update
        this.isLoading = true;
        this.axios.put('/api/v1/auth/addDependant',{

          topic_id: this.topic.id,
          topic_name: this.topic.topic_name,
          // module_id: this.course.id,
          module_id: this.$route.params.id,
          topic_content: this.topic.topic_content,
          video: this.topic.video,
          audio: this.audio,
          doc: this.doc,

        })

        .then(response=>{
            console.log(response);
            // this.clearIt();
            this.fetchModule();
            this.edit = true;
            this.isLoading = false;
            this.$toasted.global.crudUpdated().goAway(1500);

        })
        .catch(error=>{
            console.log(error.response)
        })

      }

    }

  },
  created(){
    this.AllTransfers()
    this.getProviders()
  }

}
</script>
