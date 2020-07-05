<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-md-12 m-b-20">
                    <h5 class="spacer-top">Hello, Dr. {{auth_user.firstname}} {{auth_user.lastname}}</h5>
                </div>


                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">


                            <div class="pb-2">
                              <router-link :to="{ path: '/my-dependents'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-calendar"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">My Appointments</p>
                                <h1 class="fw-400">{{appointments.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-dependents'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0"> Patients</p>
                                <h1 class="fw-400">{{appointments.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
              <div class="col-md-12 m-b-20">
                  <date-picker v-model="date" valueType="format" @change="getAppointments"></date-picker>
              </div>
            </div>
            <div class="row">

                <div class="col-md-12 m-b-30">
                    <h5> <i class="fe fe-calendar"></i> Appointments</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="appoint in appointments" v-bind:key="appoint.id">
                                <td>{{appoint.firstname}} {{appoint.lastname}}</td>
                                <td>{{appoint.appointDate}}</td>
                                <td>{{appoint.appoinTime}}</td>
                                <td>
                                  <button type="button" name="button" class="btn btn-warning btn-small" v-if="appoint.status == 'false' ">pending</button>
                                  <button type="button" name="button" class="btn btn-success btn-small" v-if="appoint.status == 'true' ">completed</button>
                                </td>
                                <td>
                                  <router-link :to="{ path: '/appointment/'+ appoint.id}">
                                  <button type="button" class="btn btn-info" name="button">view</button>
                                  </router-link>
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


    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: {
     Navbar, DatePicker
  },
  data(){
    return{
      auth_user:"",
      appointments:"",
      date:new Date() ,
      wallet:"",
      complaints:"",
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
  computed:{

    formattedDate(){
      let formater = moment().format("YYYY-MM-DD")
      return formater
    }
  },
  methods:{

    getAppointments(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getProfessional/${this.user.id}/${this.formattedDate}`)
                  .then(response => {
                      this.appointments = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getPlan(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/userSubscribedPlan`)
                  .then(response => {
                      this.myplan = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getComplaints(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/complaints/${this.user.id}`)
                  .then(response => {
                      this.complaints = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getWallet(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getUserWallet`)
                  .then(response => {
                      this.wallet = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    }

  },
  created(){
    this.getAppointments()
    this.getComplaints()
    this.getPlan()
    this.getWallet()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
