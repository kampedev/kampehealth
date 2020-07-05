<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-12  mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <p>{{employer.agency_name}}</p>
                       <h3 class="text-center">Manage Appointments</h3>
                       <button type="button" name="button" class="btn btn-primary text-right" data-toggle="modal" data-target="#example_02">Create Appointment</button>


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

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>

                                         <th> Patient</th>
                                         <th>Date</th>
                                         <th>Time</th>
                                         <th>Professional Seen</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="record in records" v-bind:key="record.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <!-- <td >{{client.firstname}} {{client.lastname}}</td> -->
                                         <td>{{record.drVisited}}</td>
                                         <td>{{record.reasonVisit}}</td>
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

                    <!-- Modal -->
                                                  <div class="modal fade "   id="example_02" tabindex="-1" role="dialog"
                                                       aria-labelledby="example_02" aria-hidden="true">
                                                      <div class="modal-dialog modal-dialog-centered modal-lg"  role="document">
                                                          <div class="modal-content " >


                                                              <div class="container-fluid ">
                                                                  <button type="button" class="close" data-dismiss="modal"
                                                                          aria-label="Close">
                                                                      <span aria-hidden="true">&times;</span>
                                                                  </button>
                                                                  <div class="row ">

                                                                      <div class="col-md-12 p-t-20 p-b-20">




                                                                              <div class="form-row">
                                                                                  <div class="form-group col-md-6">
                                                                                      <label for="inputCity">Select Patient</label>
                                                                                      <select class="form-control"  v-model="appointment.patient_id">
                                                                                       <option  :value="client.id" v-for="client in clients" v-bind:key="client.id">
                                                                                       {{client.firstname}} {{client.lastname}}
                                                                                       </option>
                                                                                   </select>
                                                                                  </div>

                                                                              </div>

                                                                              <div class="form-row">
                                                                                  <div class="form-group col-md-6">
                                                                                      <label for="inputCity">Select Professional</label>
                                                                                      <select class="form-control"  v-model="appointment.professional_id">
                                                                                       <option  :value="prof.id" v-for="prof in professionals" v-bind:key="prof.id">
                                                                                         <span v-if="prof.job_title == 'doctor' ">
                                                                                           Dr
                                                                                         </span>{{prof.firstname}} {{prof.lastname}}
                                                                                       </option>
                                                                                   </select>
                                                                                  </div>

                                                                              </div>

                                                                              <div class="form-row">
                                                                                <div class="form-group col-md-6">
                                                                                  <p>  <label for="inputPassword4">Select Date {{appointment.appointDate}}</label> </p>
                                                                                    <date-picker v-model="appointment.appointDate" valueType="format"></date-picker>

                                                                                </div>
                                                                              </div>

                                                                              <div class="form-row">
                                                                                <div class="form-group col-md-6">
                                                                                   <p><label for="inputPassword4">Select Time  {{appointment.appoinTime}}</label></p>
                                                                                    <vue-timepicker v-model="appointment.appoinTime"></vue-timepicker>
                                                                                </div>
                                                                              </div>

                                                                              <button  class="btn btn-primary btn-block btn-lg" @click="createAppointment">Create Appointment</button>

                                                                      </div>
                                                                  </div>
                                                              </div>

                                                          </div>
                                                      </div>
                                                  </div>
                                                  <!-- Modal Ends -->

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

      import DatePicker from 'vue2-datepicker';
      import 'vue2-datepicker/index.css';
      import VueTimepicker from 'vue2-timepicker'
      // CSS
      import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: {
     Navbar, Loading, DatePicker, VueTimepicker
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      employer:"",
      professionals:"",
      clients:"",
      appointment:{
                patient_id:"",
                professional_id:"",
                appoinTime:"",
                appointDate:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getEmployeeInstituional/${this.user.institutional_id}`)
                .then(response => {
                    this.employer = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getProfessionals(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getEmployee/${this.user.institutional_id}`)
                  .then(response => {
                      this.professionals = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getSubscribedProvider/${this.user.institutional_id}`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    createAppointment(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/makeAppointment',{
          appoinTime: this.appointment.appoinTime,
          appointDate: this.appointment.appointDate,
          patient_id: this.appointment.patient_id,
          professional_id: this.appointment.professional_id,

        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Appointment created successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }

  },
  created(){
    this.getProfessionals()
    this.getClients()
  }

}
</script>
