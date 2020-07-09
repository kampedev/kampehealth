<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3> {{appoint.agency_name}} </h3>
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
                                     <div class="form-group">
                                         <button class="btn btn-primary spacer" data-toggle="modal" data-target="#example_01">Add Consultancy Notes</button>
                                         <!-- <button class="btn btn-primary spacer" data-toggle="modal" data-target="#example_02">Add Record</button> -->
                                     </div>
                                     <p class="text-right">
                                       <span v-if="appoint.data.status == 'true'">
                                         <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">completed</button>
                                         </span>
                                        <span v-if="appoint.data.status == 'false'">
                                        <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                      </span>
                                     </p>
                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <h3 class="p-t-10 searchBy-name">Appointment Details</h3>
                           </div>

                           <div class="card-body">
                             <p class="spacer-top-bottom"><strong>Date:</strong>  {{appoint.data.appointDate | moment("dddd, MMMM Do YYYY")}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Time:</strong> {{appoint.data.appoinTime}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Patient Name:</strong> {{appoint.patient_id}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Attending Professional:</strong> {{appoint.professionalDetails.firstname}} {{appoint.professionalDetails.lastname}}</p>




                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-4">
                           <div class="card m-b-30">
                               <div class="card-header">

                                 <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                               </div>

                               <div class="card-body">

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary" @click="acceptProvider">mark as complete</button>
                                                             </div>
                               </div>
                           </div>
                       </div>
               </div>



               <!-- <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>CAC Document:</strong></p>
                           </div>

                           <div class="card-body">


                           </div>
                       </div>
                   </div>

               </div> -->

               <!-- Modal for Prescription/Notes -->
                                             <div class="modal fade "   id="example_01" tabindex="-1" role="dialog"
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
                                                                             <div class="form-group col-md-10">
                                                                               <label for="inputCity">Consultancy Notes</label>
                                                                              <textarea class="form-control" rows="8" v-model=notes></textarea>
                                                                             </div>
                                                                         </div>

                                                                         <div class="form-row">
                                                                             <div class="form-group col-md-10">
                                                                               <label for="inputCity">Medications</label>
                                                                              <textarea class="form-control" rows="8" v-model=medications></textarea>
                                                                             </div>
                                                                         </div>


                                                                         <button  class="btn btn-primary btn-block btn-lg" @click="createRecord">Add Note</button>

                                                                 </div>
                                                             </div>
                                                         </div>

                                                     </div>
                                                 </div>
                                             </div>
                                             <!-- Modal Ends -->


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
      appoint:"",
      notes:"",
      medications:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getSpecificAppoint/${this.$route.params.id}`)
                .then(response => {
                    this.appoint = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    fetchSingelAPpointment(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getSpecificAppoint/${this.$route.params.id}`)
                  .then(response => {
                      this.appoint = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    createRecord(){
        this.isLoading = true;
        this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.post('/api/v1/auth/addHealthRecord',{
          notes: this.notes,
          medications: this.medications,
          patient_id: this.appoint.data.patient_id,
          appointment_id: this.$route.params.id,
          professional_id: this.appoint.data.professional_id,
          provider_id: this.user.institutional_id,

          reasonVisit: 'Consulation',
          testResult: "this.user.institutional_id",
          drVisited: 'this.user.institutional_id',
          documents: 'this.user.institutional_id',
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            thi.fetchSingelAPpointment()
            this.$breadstick.notify("Record created successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    },

    acceptProvider(){
      if (confirm('Are You Sure You Want to Approve Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 1

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Approved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()

    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    rejectProvider(){
      if (confirm('Are You Sure You Want to Disapprove this Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 0

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Disapproved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()

    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.fetchSingelAPpointment()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
.spacer-top-bottom{
  margin-top:7px;
  margin-bottom:7px;
}
</style>
