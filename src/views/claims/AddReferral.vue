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
                       <h3 class="h3">Add Referral</h3>


                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">


                                                        <div class="form-row">
                                                          <!-- <div class="form-group col-md-12">
                                                            <p>  <label for="inputPassword4">Date</label></p>
                                                               <date-picker v-model="claim.seen_date" valueType="format"></date-picker>
                                                          </div> -->

                                                          <div class="form-group col-md-6">
                                                            <label for="inputCity">Enrollee OHIS Number</label>
                                                            <input type="text" class="form-control"  v-model="searchkey" @change="searchIDCard">
                                                          </div>
                                                          <!-- <div class="form-group col-md-6">
                                                              <label for="inputPassword4">Referring Facility</label>
                                                              <select class="form-control"  v-model="claim.agency_id">
                                                               <option v-for="agency in agencies" v-bind:key="agency.id" :value="agency.agency_id">{{agency.agency_name}}</option>
                                                           </select>
                                                          </div> -->

                                                          <div class="form-group col-md-6">
                                                              <label >Provisional Diagnosis</label>
                                                              <select class="form-control"  v-model="referral.provisional_diagnosis">
                                                               <option v-for="dis in diseases" v-bind:key="dis.id" :value="dis.id">{{dis.name}}</option>
                                                           </select>
                                                          </div>

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Investigations</label>
                                                               <input type="text" class="form-control" id="inputEmail4" placeholder="Summary of investigations carried out"
                                                               v-model="referral.investigations">
                                                             </div>

                                                          <div class="form-group col-md-6">
                                                              <label >Recipient Facility</label>
                                                              <select class="form-control"  v-model="referral.recipient_facility">
                                                               <option v-for="agency in providers" v-bind:key="agency.id" :value="agency.id">{{agency.agency_name}}</option>
                                                           </select>
                                                          </div>


                                                            <div class="row col-md-12" v-if="enrollee_details != ''">
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Client Surname</label>
                                                                <input type="text" class="form-control" :value="enrollee_details.user.firstname" disabled>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Client First Name</label>
                                                                <input type="text" class="form-control" :value="enrollee_details.user.lastname" disabled>
                                                              </div>

                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Sex</label>
                                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.gender" disabled>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Phone Number</label>
                                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.phone_number" disabled>
                                                              </div>
                                                            </div>

                                                         </div>

                                                         <div class="form-row">
                                                           <!-- <div class="form-group col-md-12">
                                                             <label for="inputCity">Authorization Code </label>
                                                             <input type="text" class="form-control" id="inputEmail4" :value="randomNumber" disabled>
                                                           </div> -->
                                                           <div class="form-group col-md-10">
                                                             <label for="inputCity">Clinical Findings/Treatment Given</label>
                                                             <textarea name="name" rows="8" cols="80" class="form-control"
                                                              v-model="referral.treatment_given"></textarea>
                                                           </div>
                                                           <div class="form-group col-md-10">
                                                             <label for="inputCity">Reason for Referral</label>
                                                             <textarea name="name" rows="8" cols="80" class="form-control" v-model="referral.reason"></textarea>
                                                           </div>
                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="AddReferral">Submit</button>
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
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      editor: ClassicEditor,
      user:null,
      searchkey:"",
      search_result:"",
      enrollee_details:"",
      randomvalue:"",
      providers:"",
      diseases:"",
      min:100000000000000000,
      max:1000000000000000000,
      edit:false,
      isLoading: false,
      fullPage: true,
      referral:{
        client_id:"",
        recipient_facility:"",
        provisional_diagnosis:"",
        treatment_given:"",
        investigations:"",
        reason:"",
        name_of_reffering_personnel:"",
      },


    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/diagnosis`)
                .then(response => {
                    this.diseases = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
    randomNumber: function () {
     let authorization_code = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
     return  authorization_code
    }
  },
  methods:{
      getProviders(){
        this.axios.get(`/api/v1/auth/providerAgency/95930`)
                    .then(response => {
                        this.providers = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      },
        searchIDCard(){
          this.isLoading = true
          this.axios.post(`/api/v1/auth/getuserbyIdcard`,{
                id_card_number: this.searchkey,
          })
                .then(response => {
                    this.search_result = response.data.data
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

                    this.isLoading = false

                })
                .catch(error => {
                    console.error(error);
                    this.isLoading = false
                    this.$toasted.info('User not Found', {position: 'top-center', duration:3000 })
                })
        },

    clearIt(){
      this.referral.recipient_facility= ""
      this.referral.provisional_diagnosis= ""
      this.referral.treatment_given= ""
      this.referral.investigations=""
      this.referral.reason=""
      this.searchkey=""
    },

    AddReferral(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/referrals',{
          name_of_reffering_personnel: this.user.id,
          client_id: this.enrollee_details.user.id,
          agency_id: 95930,
          referring_facility: this.enrollee_details.user.provider_id,
          recipient_facility: this.referral.recipient_facility,
          provisional_diagnosis: this.referral.provisional_diagnosis,
          treatment_given: this.referral.treatment_given,
          investigations: this.referral.investigations,
          reason: this.referral.reason,
        })

        .then(response=>{
            console.log(response);
            this.clearIt();
            this.isLoading = false;
            this.$breadstick.notify("Referral submitted Successfuly!", {position: "top-right"});


        })
        .catch(error=>{
            console.log(error.response)
        })

    }

  },
  created(){
    this.getProviders()
  }

}
</script>
