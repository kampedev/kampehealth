<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-md-12 m-b-20">
                    <h5 class="spacer-top">Hello, <span v-if="auth_user.job_title == 'Doctor'">Dr.</span> {{auth_user.firstname}} {{auth_user.lastname}}</h5>
                </div>

                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">


                            <div class="pb-2">
                              <!-- <router-link :to="{ path: '/my-dependents'}"> -->
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="mdi mdi-medical-bag"></i>
                                    </div>
                                </div>
                              <!-- </router-link> -->
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">My Records</p>
                                <h1 class="fw-400">{{records.meta.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <!-- <router-link :to="{ path: '/manage-clients'}"> -->
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="mdi mdi-account-group-outline"></i>
                                    </div>
                                </div>
                              <!-- </router-link> -->
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0"> Patients</p>
                                <h1 class="fw-400">{{clients.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div class="row">

                <div class="col-md-12 m-b-30">
                    <p class="h5"> <i class="mdi mdi-medical-bag"></i> Patient Records</p>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Date of Visit</th>
                                <th>Patient Name</th>
                                <th>Patient OHIS Number</th>
                                <!-- <th>Status</th> -->
                                <th>Action</th> 

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="record in records.data" v-bind:key="record.id">
                                <td>{{record.created_at | moment("dddd, MMMM Do YYYY")}}</td>
                                <td>{{record.patient.firstname}} {{record.patient.lastname}}</td>
                                <td>{{record.patient.id_card_number}}</td>

                                <td >
                                           <router-link :to="{ path: '/encounter/'+ record.service.id}">
                                           <button type="button" class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                         </router-link>
                                         <!-- <button type="button" @click="deleteUser(encounter)" class="btn btn-danger"> <i class="fe fe-delete"></i></button> -->
                               </td>
                            </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<Footer/>

  </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import Footer from '@/views/Footer.vue'

export default {
  components: {
     Navbar, Footer

  },
  data(){
    return{
      auth_user:"",
      records:"",
      clients:"",
      wallet:"",
      complaints:"",
      user:null

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data
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

    getRecords(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/professionalGetHealthRecord/${this.user.id}`)
                  .then(response => {
                      this.records = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getProviderToUser/${this.user.institutional_id}`)
                  .then(response => {
                      this.clients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
  },
  created(){
    this.getRecords()
    this.getClients()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
