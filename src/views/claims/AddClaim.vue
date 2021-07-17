<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
      <main class="admin-main">

               <div class="bg-dark m-b-30">
                   <div class="container">
                       <div class="row p-b-60 p-t-60">

                           <div class="col-md-6 text-center mx-auto text-white p-b-30">
                               <h3 class="h3">Add Claim</h3>
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
                                          <div class="form-group col-md-12">
                                            <p>  <label for="inputPassword4">Date of Care</label></p>
                                               <date-picker v-model="claim.seen_date" valueType="format"></date-picker>
                                          </div>

                                          <div class="form-group col-md-6" v-if="user.type == 'shis'">
                                              <label for="inputPassword4">Select Facility</label>
                                              <select class="form-control"  v-model="claim.provider_id">
                                               <option v-for="provider in providers" v-bind:key="provider.id" :value="provider.id">{{provider.agency_name}}</option>
                                           </select>
                                          </div>
                                             

                                             <div class="form-group col-md-6">
                                               <label for="inputCity">Enrollee OHIS Number</label>
                                               <input type="text" class="form-control"  v-model="searchkey" @change="searchIDCard">
                                             </div>


                                            <div class="row col-md-12" v-if="enrollee_details != ''">
                                              <div class="form-group col-md-6">
                                                <label for="inputCity">Enrollee Surname</label>
                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.firstname" disabled>
                                              </div>

                                              <div class="form-group col-md-6">
                                                <label for="inputCity">Enrollee First Name</label>
                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.lastname" disabled>
                                              </div>
                                              <div class="form-group col-md-6">
                                                <label for="inputCity">OHIS Number</label>
                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.id_card_number" disabled>
                                              </div>

                                              <div class="form-group col-md-6">
                                                <label for="inputCity">Phone Number</label>
                                                <input type="text" class="form-control" id="inputEmail4" :value="enrollee_details.user.phone_number" disabled>
                                              </div>
                                            </div>

                                             <div class="form-group col-md-6">
                                               <label for="inputCity">Select Diagnosis</label>
                                               <select class="form-control"  v-model="claim.diagnosis" >
                                                <option v-for="dis in diseases" v-bind:key="dis.id" :value="dis.id">{{dis.name}} </option>
                                               </select>
                                             </div>

                                         </div>

                                         <div class="form-group col-md-12">
                                            <label for="inputAddress">Treatment Summary</label>
                                            <textarea name="name" rows="5" cols="80" class="form-control" v-model="claim.treatment"></textarea>
                                        </div>

                                         <div class="form-group">
                                             <button class="btn btn-primary btn-block btn-lg" @click="makeClaim">Proceed to Drugs/Service Processing</button>
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
      </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
     import DatePicker from 'vue2-datepicker';


export default {
  components: {
     Navbar, Loading, DatePicker
  },
  data(){
    return{
      editor: ClassicEditor,
      user:null,
      agencies:"",
      employees:"",
      clients:"",
      client:"",
      claims:"",
      diseases:"",
      searchkey:"",
      search_result:"",
      enrollee_details:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      claim:{
        provider_id:"",
        client_id:"",
        diagnosis:"",
        treatment:"",
        client_name:"",
        seen_date:"",
        cost:"",
      },

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  computed:{
    randomNumber: function () {
     let authorization_code = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
     return  authorization_code
    }
  },
  methods:{

    getEnrollees(){

      if (this.user.type == 'shis') {
        this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                    .then(response => {
                        this.clients = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
      else {
        this.axios.get(`/api/v1/auth/getProviderToUser/${this.user.id}`)
                    .then(response => {
                        this.clients = response.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },
    getEmployees(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getEmployee/${this.user.id}`)
                  .then(response => {
                      this.employees = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

getClaims(){
  this.user = JSON.parse(localStorage.getItem('user'))
  this.axios.get(`/api/v1/auth/claminByProvider${this.user.id}`)
              .then(response => {
                  this.claims = response.data.data
                  console.log(response)
              })
              .catch(error => {
                  console.error(error);
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
getDiseases(){
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
  makeClaim(){
        this.user = JSON.parse(localStorage.getItem('user'))
        if (this.user.type == 'shis') {
        // Add claim
        this.isLoading = true;
        this.axios.post('/api/v1/auth/claims',{

          provider_id: this.claim.provider_id,
          user_id: this.user.id,
          agency_id: 95930,
          // org_id: this.client.org_id,
          client_name: this.enrollee_details.user.id,
          seen_date: this.claim.seen_date,
          diagnosis: this.claim.diagnosis,
          treatment: this.claim.treatment,
          cost: 0.00,

        })

        .then(response=>{
            console.log(response);
            let id = response.data.id
            this.isLoading = false;
            // this.$breadstick.notify("Claim added Successfuly!", {position: "top-right"});
            this.$router.push(`/service-processing-form/${id}`)

        })
        .catch(error=>{
            console.log(error.response)
        })
        }
        else {

          // Add claim
          this.isLoading = true;
          this.axios.post('/api/v1/auth/claims',{

            provider_id: this.user.id,
            user_id: this.user.id,
            agency_id: 95930,
            client_name: this.enrollee_details.user.id,
            seen_date: this.claim.seen_date,
            diagnosis: this.claim.diagnosis,
            treatment: this.claim.treatment,
            cost: 0.00,
          })

          .then(response=>{
              console.log(response);
              let id = response.data.id
              this.isLoading = false;
              // this.$breadstick.notify("Claim added Successfuly!", {position: "top-right"});
              this.$router.push(`/service-processing-form/${id}`)


          })
          .catch(error=>{
              console.log(error.response)
          })

        }

    }

  },
  created(){
    this.getProviders()
    this.getEmployees()
    this.getDiseases()
    this.getEnrollees()
  }

}
</script>
