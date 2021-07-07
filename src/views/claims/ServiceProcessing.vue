<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                     <div class="m-b-10">
                         <div class="avatar ">
                         </div>
                     </div>
                       <h3 class="h3">Drugs/Services Processing Form </h3>

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

                               <div class="form-group col-md-12">
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

                                <div class="form-group col-md-6" v-if="type == 'Drug'">
                                  <label for="inputCity">Quantity</label>
                                  <input type="text" class="form-control" id="inputEmail4" placeholder="Qty" v-model="quantity">
                                </div>


                               <div class="form-group col-md-6">
                                 <label for="inputCity">Cost</label>
                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Cost" v-model="calcCost" disabled>
                               </div>
                               <div class="col-md-12">
                                 <button type="button" class="btn btn-info" style="margin-bottom:30px;" @click="addServiceRendered">Add</button>
                               </div>

                               <!-- <div class="col-md-12">
                                 <p class="h4">Drug:</p>
                               </div>


                                <div class="form-group col-md-2">
                                  <label for="inputCity">Quantity</label>
                                  <input type="text" class="form-control" id="inputEmail4" placeholder="Qty" v-model="quantity">
                                </div>
                                <div class="form-group col-md-3">
                                  <label for="inputCity">Cost</label>
                                  <input type="text" class="form-control" id="inputEmail4" placeholder="Cost" v-model="calcCost" disabled>
                                </div>
                                <div class="col-md-3">
                                  <button type="button" class="btn btn-info" style="margin-top:30px;" @click="addServiceRendered">Add</button>
                                </div> -->

                             </div>

                               <div class="form-group">
                                   <button class="btn btn-primary btn-block btn-lg" @click="singleClaim()">Proceed to Document Upload</button>
                               </div>

                           </div>
                       </div>
                   </div>

                   <div class="col-md-12 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Claim Services/Drugs</h5>
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
                                   <td>{{service.cost | numeral(0,0)}}</td>
                                   <td>
                                     <!-- <button class="btn btn-info" name="button"><i class="fe fe-edit"></i> </button> -->
                                     <button class="btn btn-danger" name="button" @click="deleteService(service)"><i class="fe fe-delete"></i> </button>
                                   </td>

                               </tr>
                               <tr v-for="drug in singleclaim.drugs" v-bind:key="drug.id">


                                   <td>{{drug.drug_name}}</td>
                                   <td>{{drug.cost | numeral(0,0)}}</td>
                                   <td>
                                     <!-- <button class="btn btn-info" name="button"><i class="fe fe-edit"></i> </button> -->
                                     <button class="btn btn-danger" name="button" @click="deleteDrug(drug)"><i class="fe fe-delete"></i> </button>
                                   </td>

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
      singleclaim:"",
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
    calcCost(){
      if (this.type == 'Service') {
        return this.quantity * this.singleservice.price

      }else {
        return this.quantity * this.singledrug.price

      }
    }


  },
  methods:{
    deleteDrug(drug){
      this.axios.delete(`/api/v1/auth/claim_service/${drug.id}`)
                  .then(response => {
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    deleteService(service){
      this.axios.delete(`/api/v1/auth/claim_service/${service.id}`)
                  .then(response => {
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    handleData(){
      if (this.type == 'Drug') {
        this.addservice.services_id = ''
      }
      if (this.type == 'Service') {
        this.addservice.drugs_id = ''
      }
    },
    singleClaim(){
      this.$router.push(`/upload-claims-docs/${this.$route.params.id}`)

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
      this.quantity = 1
      this.calcCost = ""
    },
    getSingleClaim(){
      this.axios.get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
                  .then(response => {
                      this.singleclaim = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

getClaims(){
  this.axios.get(`/api/v1/auth/claminByProvider${this.user.id}`)
              .then(response => {
                  this.claims = response.data.data
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
        this.axios.post('/api/v1/auth/claim_service',{

          services_id: this.addservice.services_id,
          drugs_id: this.addservice.drugs_id,
          claims_id: this.$route.params.id,
          cost: this.calcCost

        })

        .then(response=>{
            console.log(response);
            this.clearIt();
            this.getSingleClaim();
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
    this.getSingleClaim()
  }

}
</script>
