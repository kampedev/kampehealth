<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div class=""  v-for="claim in singleclaim" v-bind:key="claim.id">

    <div class="row col-md-12">

      <div class="col-md-12">
        <p class="h3">Treatment</p>
      </div>

        <div class="form-group col-md-6">
          <label for="inputCity">Services/Drugs</label>
          <select class="form-control"  v-model="claim.client_id">
           <option v-for="agency in agencies" v-bind:key="agency.id" :value="agency.agency_id">{{agency.agency_name}}</option>
          </select>
        </div>

        <div class="col-md-6" style="margin-top:30px;">
          <button class="btn btn-info">Add</button>
        </div>

        <div class="col-md-10 m-b-30">
            <h5> <i class="fe fe-activity"></i>Treatments</h5>
            <div class="table-responsive">
                <table class="table align-td-middle table-card">
                    <thead>
                    <tr>
                        <!-- <th>Avatar</th> -->
                        <th>Services Rendered</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="dependent in dependents" v-bind:key="dependent.id">

                        <td>
                          <router-link :to="{ path: '/provider-' + dependent.id }">
                          {{dependent.firstname}}
                        </router-link>

                        </td>
                        <td>{{dependent.email}}/{{dependent.phone_number}}</td>
                        <td>{{dependent.state}}/{{dependent.lga}}</td>
                        <td>{{dependent.relationShipType}}</td>

                    </tr>

                    </tbody>
                </table>

            </div>
        </div>


    </div>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3>{{claim.client_name}}</h3>
                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">



               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <h3 class="p-t-10 searchBy-name">Claim Details</h3>
                           </div>

                           <div class="card-body">
                             <p class="spacer"><strong>Diagnosis:</strong>  {{claim.diagnosis}}</p>

                             <p  class="spacer"><strong>Seen Date:</strong>  {{claim.seen_date}}</p>
                             <p  class="spacer"><strong>Cost:</strong> <i class="mdi mdi-currency-ngn"></i>{{claim.cost | numeral ('0,0.00')}}</p>

                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-4" v-if="user.type == 'hmo'">
                           <div class="card m-b-30">
                               <div class="card-header">

                                 <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                               </div>

                               <div class="card-body">

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary">accept</button>
                                                                 <button class="btn btn-danger spacer">reject</button>
                                                             </div>
                               </div>
                           </div>
                       </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <!-- <h3 class="p-t-10 searchBy-name text-center">Provider Duocuments</h3> -->
                             <p class="text-center"><strong>Treatment</strong></p>
                           </div>

                           <div class="card-body">
                             {{claim.treatment}}

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
      singleclaim:"",
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
                .then(response => {
                    this.singleclaim = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

//


  },
  created(){
  //
  }

}
</script>
<style scoped >
.spacer{
  margin-top:10px;
  margin-bottom:10px;
}
</style>
