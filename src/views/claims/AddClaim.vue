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
                       <h3 class="h3">Add Claim</h3>

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
                                                          <div class="form-group col-md-12">
                                                            <p>  <label for="inputPassword4">Date</label></p>
                                                               <date-picker v-model="claim.seen_date" valueType="format"></date-picker>
                                                          </div>

                                                          <div class="form-group col-md-6">
                                                              <label for="inputPassword4">Select Facility</label>
                                                              <select class="form-control"  v-model="claim.provider_id">
                                                               <option v-for="provider in providers" v-bind:key="provider.id" :value="provider.id">{{provider.agency_name}}</option>
                                                           </select>
                                                          </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Select Enrollee</label>
                                                                 <select class="form-control"  v-model="claim.client_id" @change="getClient(claim.client_id)">
                                                                  <option v-for="client in clients" v-bind:key="client.id" :value="client.id">{{client.lastname}} {{client.firstname}}</option>
                                                              </select>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Client Surname</label>
                                                               <input type="text" class="form-control" id="inputEmail4" :value="client.firstname" disabled>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Client First Name</label>
                                                               <input type="text" class="form-control" id="inputEmail4" :value="client.lastname" disabled>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Enrolle OHIS Number</label>
                                                               <input type="text" class="form-control" id="inputEmail4" :value="client.id_card_number" disabled>
                                                             </div>

                                                         </div>

                                                         <div class="form-row">


                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Diagnosis</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="Diagnosis" v-model="claim.diagnosis">
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Cost</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="Cost of treatment" v-model="claim.cost">
                                                           </div>
                                                           <div class="form-group col-md-12">
                                                             <label for="inputCity">Authorization Code </label>
                                                             <input type="text" class="form-control" id="inputEmail4" :value="randomNumber" disabled>
                                                           </div>

                                                         </div>
                                                         <div class="row col-md-12">
                                                           <!-- <textarea name="name" rows="8" cols="80" class="form-control" v-model="claim.treatment"></textarea> -->
                                                           <div class="col-md-12">
                                                             <p class="h4">Prepared By:</p>
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputPassword4">Select staff</label>
                                                             <select class="form-control"  v-model="claim.prepared_by_id">
                                                               <option v-for="employee in employees" v-bind:key="employee.id" :value="employee.id">{{employee.firstname}} {{employee.lastname}}</option>
                                                              </select>
                                                           </div>

                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Date</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="DD/MM/YYYY" v-model="claim.date">
                                                           </div>

                                                           <div class="col-md-12">
                                                             <p class="h4">Checked By:</p>
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputPassword4">Select staff</label>
                                                             <select class="form-control"  v-model="claim.checked_by_id">
                                                               <option v-for="employee in employees" v-bind:key="employee.id" :value="employee.id">{{employee.firstname}} {{employee.lastname}}</option>
                                                              </select>
                                                            </div>


                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Date</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="DD/MM/YYYY" v-model="claim.diagnosis">
                                                           </div>

                                                           <div class="col-md-12">
                                                             <p class="h4">Verified By:</p>
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputPassword4">Select staff</label>
                                                             <select class="form-control"  v-model="claim.verified_by_id">
                                                               <option v-for="employee in employees" v-bind:key="employee.id" :value="employee.id">{{employee.firstname}} {{employee.lastname}}</option>
                                                              </select>
                                                           </div>

                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Date</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="DD/MM/YYYY" v-model="claim.diagnosis">
                                                           </div>

                                                           <div class="col-md-12">
                                                             <p class="h4">Approved By:</p>
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputPassword4">Select staff</label>
                                                             <select class="form-control"  v-model="claim.approved_by_id">
                                                               <option v-for="employee in employees" v-bind:key="employee.id" :value="employee.id">{{employee.firstname}} {{employee.lastname}}</option>
                                                              </select>
                                                           </div>

                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Date</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="DD/MM/YYYY" v-model="claim.diagnosis">
                                                           </div>

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
      min:100000000000000000,
      max:1000000000000000000,
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
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                .then(response => {
                    this.clients = response.data.data
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

    clearIt(){

      this.claim.client_name =""
      this.claim.cost = ""
      this.claim.treatment = ""
      this.claim.seen_date = ""
      this.claim.agency_id = ""
      this.claim.diagnosis = ""
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
makeClaim(){

        this.user = JSON.parse(localStorage.getItem('user'))
        this.$router.push('/service-processing-form')

        if (this.edit === false) {
        // Add claim
        this.isLoading = true;
        this.axios.post('/api/v1/auth/addClaim',{

          provider_id: this.user.id,
          user_id: this.user.id,
          agency_id: this.claim.agency_id,
          client_name: this.claim.client_name,
          seen_date: this.claim.seen_date,
          diagnosis: this.claim.diagnosis,
          treatment: this.claim.treatment,
          cost: this.claim.cost,
        })

        .then(response=>{
            console.log(response);
            this.clearIt();
            this.getClaims();
            this.isLoading = false;
            this.$breadstick.notify("Claim added Successfuly!", {position: "top-right"});


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
    this.getEmployees()
  }

}
</script>
