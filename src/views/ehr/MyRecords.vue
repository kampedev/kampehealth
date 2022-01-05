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
                       <h3>My Records</h3>
                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Clients" type="search"
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
       <section class="">
           <div class="container">

               <div class="row list" v-if=" user.type == 'provider'  ||  user.type == 'provider_employee' ">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                       
                                         <th>Patient</th>
                                         <th>Reason for Visit</th>
                                         <th>Medical Diagnosis</th>
                                         <th>Date</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="record in records" v-bind:key="record.id">
                                        
                                         <td> {{record.patient.full_name}}</td>
                                         <td>{{record.reasonVisit}}</td>
                                         <td>{{record.service.diagnosis.name}}</td>
                                         <td>{{record.created_at}}</td>

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

               <div class="row list" v-if=" user.type == 'shis'  ||  user.type == 'employee' ">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                       
                                         <th>Patient</th>
                                         <th>Facility</th>
                                         <th>Reason for Visit</th>
                                         <th>Medical Diagnosis</th>
                                         <th>Date</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="record in records" v-bind:key="record.id">
                                        
                                         <td > {{record.patient.full_name}}</td>
                                         <td > {{record.provider.agency_name}}</td>
                                         <td >{{record.healthrecord.reasonVisit}}</td>
                                         <td>{{record.diagnosis.name}}</td>
                                         <td>{{record.created_at}}</td>

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
      user: null,
      records:"",
     
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  
  },
  methods:{
    getRecords(){
    this.user = JSON.parse(localStorage.getItem('user'))

        if (this.user.type == 'provider') {

             this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/gethealthRecord`,{ provider : this.user.id})
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
        }
        if (this.user.type == 'provider_employee') {
                 this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/gethealthRecord`,{ provider : this.user.institutional_id})
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })               

        }
        if (this.user.type == 'employee' || this.user.type == 'shis') {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/service_summary-agency`,{ agency_id : 95930 })
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })               

        }
     
    }


  },
  created(){
    this.getRecords()
  }

}
</script>
