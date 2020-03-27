<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">{{auth_user.agency_name}}</h5>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Revenue</p>
                                <h1 class="fw-400">&#8358;1,500</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Clients</p>
                                <h1 class="fw-400">5,200</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Agencies</p>
                                <h1 class="fw-400">{{agencies.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12 p-t-20">
                    <h1 class="fw-300">Analytics</h1>
                </div>
                <div class="col-12 m-t-20">
                    <h5> <i class="fe fe-activity"></i> Overview</h5>
                </div>
                <div class="col-md-12">
                    <div class="card m-b-30">
                      <div class="card-body">
                          <div class="apexcharts-canvas" id="chart-06"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i> Employees</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>

                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>

                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>



                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i> Agencies</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <!-- <th>Avatar</th> -->
                                <th>Name</th>
                                <th>E mail</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="agency in agencies" v-bind:key="agency.id">
                                <!-- <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td> -->
                                <td >{{agency.agency_name}}</td>
                                <td>{{agency.email}}</td>
                                <td>{{agency.phone_number}}</td>
                                <td>
                                  <span v-if="agency.status == 1">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                    </span>
                                   <span v-if="agency.status != 1">
                                   <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                  </span>

                                </td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i> Clients</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>

                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>

                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>







                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i> Claims</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Diagnosis</th>
                                <th>Seen date</th>
                                <th>Cost</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="claim in claims" v-bind:key="claim.id">
                                <!-- <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td> -->
                                <td>{{claim.client_name}}</td>
                                <td>{{claim.diagnosis}}</td>
                                <td>{{claim.seen_date}}</td>
                                <td>{{claim.cost}}</td>
                                <td>
                                  <span v-if="claim.status == 1">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                    </span>
                                   <span v-if="claim.status != 1">
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
      user:null,
      auth_user:"",
      agencies:"",
      claims:"",
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
    getHmo(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/hmoProvider/${this.user.id}`)
                  .then(response => {
                      this.agencies = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/claminByProvider${this.user.id}`)
                  .then(response => {
                      this.claims = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    }

  },
  created(){
    this.getHmo()
    this.getClaims()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
