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
                       <h3 class="h3">Transfer of Health Facility</h3>

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

                                <div class="form-row">
                                  <!-- <div class="form-group col-md-12">
                                    <p>  <label for="inputPassword4">Date</label></p>
                                       <date-picker v-model="claim.seen_date" valueType="format"></date-picker>
                                  </div> -->

                                     <!-- <div class="form-group col-md-6">
                                         <label for="inputPassword4">Select Client</label>
                                         <select class="form-control"  v-model="claim.client_id" @change="getClient(claim.client_id)">
                                          <option v-for="client in clients" v-bind:key="client.id" :value="client.id">{{client.lastname}} {{client.firstname}}</option>
                                      </select>
                                     </div> -->
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
      edit:false,
      isLoading: false,
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
      this.transfer.new_health_facility = value.id
    },

    clearIt(){
      this.transfer.reason_for_change =""
      this.transfer.new_health_facility = ""
      this.transfer.previous_health_facility = ""
      this.transfer.status = ""
      this.transfer.prepared_by = ""

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
  this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
              .then(response => {
                  this.providers = response.data.data
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
          new_health_facility: this.transfer.new_health_facility,
          previous_health_facility: this.search_result.provider_id,
          status: 'created',
          reason_for_change: this.transfer.reason_for_change,
        })

        .then(response=>{
            console.log(response);
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
    this.getProviders()
  }

}
</script>
