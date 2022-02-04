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
                       <!-- <strong class="h4">{{encounters.meta.total}} Encounters</strong> -->
                       <strong class="h4">Manage Encounters</strong>

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Facility</th>
                                         <th>Patient</th>
                                         <th>Patient Phone Number</th>
                                         <th>Diagnosis</th>
                                         
                                         <th >Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="encounter in encounters.data" v-bind:key="encounter.id">
                                       <td>
                                           {{encounter.provider.agency_name}}
                                       </td>
                                         <td >   
                                             {{encounter.patient.full_name}}

                                         </td>
                                         <td>{{encounter.patient.phone_number}}</td>
                                         <td>
                                             {{encounter.diagnosis.name}}                                           
                                         </td>
                                         
                                        
                                         <td >
                                           <router-link :to="{ path: '/encounter/'+ encounter.id}">
                                           <button type="button" class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                         </router-link>
                                         <button type="button" @click="deleteUser(encounter)" class="btn btn-danger"> <i class="fe fe-delete"></i></button>
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


               </div>
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
      isLoading: false,
      fullPage: true,
      states:"",
      encounters:"",
     
     
    }
  },
  beforeMount(){
    this.axios.post(`/api/v1/auth/service_summary-agency`,{ agency_id : 95930 })
                .then(response => {
                    this.encounters = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getEncounters(){
      this.axios.post(`/api/v1/auth/service_summary-agency`,{ agency_id : 95930 })
                .then(response => {
                    this.encounters = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
    },
    deleteUser(employee){
      if (confirm('Are you Sure you want to delete this user') ) {
        this.axios.delete(`/api/v1/auth/deleteUser/${employee.id}`)
                    .then(response => {
                        console.log(response)
                        this.getEmployees()
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },
  

  },
  created(){
//
  }

}
</script>
