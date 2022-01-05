<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
      <div class="bg-dark m-b-30">
          <div class="container">
              <div class="row p-b-60 p-t-60">

                  <div class="col-md-6 text-center mx-auto text-white p-b-30">
                    <div class="m-b-10">
                        <div class="avatar ">
                        </div>
                    </div>
                      <h3 class="h3">Drugs/Services Treatment Page </h3>

                  </div>

              </div>
          </div>
      </div>
      <section class="">
          <div class="container">

              <div class="row list">
                  <div class="col-lg-12">
                      <div class="card m-b-30">

                          <div class="card-body">

                            <div class="row col-md-12">
                              <div class="col-md-12">
                                <p class="h4">Service </p>
                              </div>

                              <div class="form-group col-md-6">
                                  <label for="inputPassword4">Select Type</label>
                                  <select class="form-control"  v-model="type"  @change="handleData">
                                   <option value="Drug">Drug </option>
                                   <option value="Service">Service </option>
                               </select>
                              </div>

                              <div class="form-group col-md-6" v-if="type == 'Service'">
                                <label for="inputPassword4">Select Service</label>
                                <select class="form-control"  v-model="addservice.services_id" @change="getService()">
                                  <option v-for="service in services.data" v-bind:key="service.id" :value="service.id">{{service.description}}</option>
                                 </select>
                              </div>
                              <div class="form-group col-md-6" v-if="type == 'Drug'">
                                <label for="inputPassword4">Select Drug</label>
                                <select class="form-control"  v-model="addservice.drugs_id" @change="getDrug()">
                                  <option v-for="drug in drugs.data" v-bind:key="drug.id" :value="drug.id">{{drug.drug_name}}</option>
                                 </select>
                               </div>

                              <div class="col-md-12">
                                <button type="button" class="btn btn-info" style="margin-bottom:30px;" @click="addServiceRendered">Add</button>
                              </div>

                            </div>

                              <div class="form-group">
                                  <button class="btn btn-primary btn-block btn-lg" @click="singlePatient">Proceed to Patient Page</button>
                              </div>

                          </div>
                      </div>
                  </div>

                  <div class="col-md-12 m-b-30">
                      <h5> <i class="fe fe-activity"></i>{{summary.services.length}} Services/Drugs <i class="fe fe-thermometer"></i></h5>
                      <div class="table-responsive">
                          <table class="table align-td-middle table-card">
                              <thead>
                              <tr>
                                  <th>Number</th>
                                  <th>Name</th>

                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(service, index) in summary.services" v-bind:key="service.id">

                                 <td>{{index+1}}</td>
                                  <td>
                                    <span v-if="service.service_id != null ">{{service.service.description}}</span>
                                     <span v-if="service.drug_id != null ">{{service.drug.drug_name}}</span>
                                   </td>
                                  <!-- <td>
                                    <button class="btn btn-danger" name="button" @click="deleteService(service)"><i class="fe fe-delete"></i> </button>
                                  </td> -->

                              </tr>

                              </tbody>
                          </table>

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


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      editor: ClassicEditor,
      user:null,
      services:"",
      summary:"",
      drugs:"",
      quantity:1,
      cost:"",
      singleservice:"",
      singledrug:"",
      claims:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      type:"",
      selected_type:"",
      addservice:{
        services_id:"",
        drugs_id:"",
      },


    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/service-agency/95930`)
                .then(response => {
                    this.services = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
    //
  },
  methods:{

    deleteService(service){
      if (confirm('Are you want you want to delete permanently?')) {
        this.axios.delete(`/api/v1/auth/claim_service/${service.id}`)
                    .then(response => {
                        console.log(response)
                        this.getSingleClaim()
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },

    handleData(){
      if (this.type == 'Drug') {
        this.addservice.services_id = ''
      }
      if (this.type == 'Service') {
        this.addservice.drugs_id = ''
      }
    },
    singlePatient(){
      this.$router.push(`/patient/${this.summary.client_id}`)

    },
    getDrugs(){
      this.axios.get(`/api/v1/auth/drug-agency/95930`)
                  .then(response => {
                      this.drugs = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    clearIt(){
      this.addservice.services_id =""
      this.addservice.drugs_id = ""

    },
    getSingleSummary(){
      this.axios.get(`/api/v1/auth/service_summary/${this.$route.params.id}`)
                  .then(response => {
                      this.summary = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


  getService(){
    this.axios.get(`/api/v1/auth/services/${this.addservice.services_id}`)
                .then(response => {
                    this.singleservice = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  getDrug(){
    this.axios.get(`/api/v1/auth/drugs/${this.addservice.drugs_id}`)
                .then(response => {
                    this.singledrug = response.data[0]
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },

  addServiceRendered(){
        this.user = JSON.parse(localStorage.getItem('user'))
        // Add claim_service
        this.isLoading = true;
        this.axios.post('/api/v1/auth/services_rendered',{

          service_id: this.addservice.services_id,
          drug_id: this.addservice.drugs_id,
          service_summary_id : this.$route.params.id

        })

        .then(response=>{
            console.log(response);
            this.clearIt();

            this.isLoading = false;
            this.$breadstick.notify("Added Successfully!", {position: "top-right"});


        })
        .catch(error=>{
            console.log(error.response)
        })

    }

  },
  created(){
    this.getDrugs()
    this.getSingleSummary()
  }

}
</script>
