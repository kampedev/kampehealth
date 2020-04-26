<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.firstname}}</h5>
                </div>

              <div class="row col-md-12"  v-if="myplan.length < 1">
                <div class="col-md-6">
                  <div class="alert alert-border-warning  alert-dismissible fade show" role="alert">
                                  <div class="d-flex">
                                      <div class="icon">
                                          <i class="icon mdi mdi-alert-circle-outline"></i>
                                      </div>
                                      <div class="content">
                                          <strong>No active Plan</strong>
                                          <router-link :to="{ path: '/subscribe'  }">
                                            click to subscribe to a plan
                                           </router-link>
                                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                          </button>
                                      </div>
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
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Wallet</p>
                                <h1 class="fw-400"> <i class="mdi mdi-currency-ngn"></i>{{wallet.amount  | numeral('0,0.00')}}</h1>
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
                                <p class="text-muted text-overline m-0">Dependents</p>
                                <h1 class="fw-400">{{dependents.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6" >
                    <div class="card m-b-30" >
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Plan</p>
                                <h1 class="fw-400"  v-for="plan in myplan" v-bind:key="plan.id">{{plan.title}} </h1>
                                <p v-if="myplan.length < 1">No active Subscription</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12 m-b-30">
                    <h5> <i class="fe fe-users"></i> Dependents</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <!-- <th>Avatar</th> -->
                                <th>Name</th>
                                <th>E mail</th>
                                <th>Phone Number</th>
                                <th>Relationship</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="dependent in dependents" v-bind:key="dependent.id">
                                <!-- <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td> -->
                                <td>{{dependent.firstname}} {{dependent.lastname}}</td>
                                <td>{{dependent.email}}</td>
                                <td>{{dependent.phone_number}}</td>
                                <td>{{dependent.relationShipType}}</td>

                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="col-md-12 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i> Complaints</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Complain Number</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="complaint in complaints" v-bind:key="complaint.id">
                              <td>122333932</td>
                                <td>{{complaint.title}}</td>
                                <td>{{complaint.type}}</td>
                                <td>{{complaint.status}}</td>
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
      auth_user:"",
      dependents:"",
      myplan:"",
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
  methods:{

    getDependents(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/allDependantUser/${this.user.id}`)
                  .then(response => {
                      this.dependents = response.data.data
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
    this.getDependents()
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
