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
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3>Providers </h3>

                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Providers" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div> -->

                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                               <!-- <div class="text-center">

                                   <h3 class="p-t-10 searchBy-name">Add Agency</h3>
                               </div> -->

                               <!-- <div class="form-row"> -->

                                 <!-- <p v-for="hmo in hmos" v-bind:key="hmo.id">rr {{hmo.agency_name}}</p> -->

                                   <!-- <div class="form-group col-md-12">
                                     <label for="inputCity">Agency</label>

                                         <select class="form-control"  v-model="agency_id">
                                          <option id="Parent" v-for="hmo in hmos" v-bind:key="hmo.id" :value="hmo.id">{{hmo.agency_name}}</option>

                                      </select>
                                   </div> -->
                               <!-- </div> -->


                                                         <div class="form-group">
                                                             <button class="btn btn-primary">Export to CSV</button>
                                                         </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Providers</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <!-- <th>Avatar</th> -->
                                   <th>Name</th>
                                   <th>E mail</th>
                                   <th>Contact</th>
                                   <th>Status</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="provider in providers" v-bind:key="provider.id">
                                   <!-- <td>
                                       <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                           class="avatar-img avatar-sm rounded-circle"
                                                                           alt=""></div>
                                   </td> -->
                                   <td>
                                     <router-link :to="{ path: '/provider-' + provider.id }">
                                     {{provider.agency_name}}
                                   </router-link>

                                   </td>
                                   <td>{{provider.email}}</td>
                                   <td>{{provider.phone_number}}</td>
                                   <td>
                                     <span v-if="provider.status == 1">
                                       <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                       </span>
                                      <span v-if="provider.status == 0">
                                      <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                   </span>

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
    </main>
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
      providers:"",
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
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
  methods:{
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

    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.getHmo()
  }

}
</script>
