<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.firstname}} {{auth_user.lastname}}</h5>
                </div>

                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/manage-appointments'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-calendar"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Manage Appointment</p>
                                <h1 class="fw-400">{{appointments.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/manage-clients'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Patients</p>
                                <h1 class="fw-400">{{clients.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-dependents'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-clipboard"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Notice Boards</p>
                                <h1 class="fw-400">2</h1>
                            </div>
                        </div>
                    </div>
                </div> -->


            </div>


            <div class="row">

              <div class="col-lg-12 col-md-8">
                <h3 class="">Appointments</h3>

                  <div class="card m-b-30">
                      <div class="card-body">

                        <div class="table-responsive">
                            <table class="table align-td-middle table-card">
                                <thead>
                                <tr>

                                    <!-- <th> Patient</th> -->
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="appoint in appointments" v-bind:key="appoint.id">
                                    <!-- <td>
                                        <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                            class="avatar-img avatar-sm rounded-circle"
                                                                            alt=""></div>
                                    </td> -->
                                    <!-- <td >{{appoint.id}} {{appoint.id}}</td> -->
                                    <td>{{appoint.appointDate | moment("dddd, MMMM Do YYYY")}}</td>
                                    <td>{{appoint.appoinTime | moment(" h:mm:ss a") }}</td>
                                    <td>
                                      <router-link :to="{ path: '/appointment/'+ appoint.id}">
                                      <button type="button" name="button" class="btn btn-info">view</button>
                                      </router-link>
                                     </td>

                                </tr>


                                </tbody>
                            </table>

                        </div>


                      </div>
                  </div>
              </div>


            </div>
        </div>

    </section>
</main>


    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'

export default {
  components: {
     Navbar
  },
  data(){
    return{
      auth_user:"",
      clients:"",
      appointments:"",
      user:null

    }
  },
  beforeMount(){

    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getProviderToUser/${this.user.institutional_id}`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getAppointments(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getProviderAppointment/${this.user.institutional_id}`)
                  .then(response => {
                      this.appointments = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


  },
  created(){
    this.getClients()
    this.getAppointments()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
