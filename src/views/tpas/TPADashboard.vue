<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row" style="margin-top:30px;">
                <div class="col-12 m-b-20">
                    <h5 class="h5">{{orgDetails.organization_name}}</h5>
                </div>



                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/view-clients-tpa'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Enrollees</p>
                                <h1 class="fw-400" v-if="clients != ''">{{clients.meta.total | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/add-officers'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-briefcase"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Enrollment Officers</p>
                                <h1 class="fw-400" v-if="employees != ''">{{employees.meta.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/add-officers'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="mdi mdi-view-day"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Claims</p>
                                <h1 class="fw-400" v-if="employees != ''">{{employees.meta.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
              <div class="col-md-10 m-b-30">
                  <h5 class="h5"> <i class="fe fe-users"></i>Employees</h5>
                  <div class="table-responsive">
                      <table class="table align-td-middle table-card">
                          <thead>
                          <tr>
                              <!-- <th>Picture</th> -->
                              <th>Name</th>
                              <th>Phone Number</th>
                              <th>Email</th>
                              <!-- <th>Beneficiaries Enrolled</th> -->
                              <!-- <th>Action</th> -->
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="client in employees.data" v-bind:key="client.id">
                            <!-- <td>
                                <div class="avatar avatar-sm " v-if="client.agent.user_image != null ">
                                  <img :src="`https://api.hayokinsurance.com/image/${client.agent.user_image}`"
                                    class="avatar-img avatar-sm rounded-circle"
                                            alt=""></div>
                            </td> -->
                              <td>
                                {{client.firstname}} {{client.lastname}}
                              </td>
                              <td>{{client.phone_number}}</td>
                              <td> {{client.email}}</td>
                              <!-- <td> {{client.enrolleduserby_count}} Enrollees</td> -->
                              <!-- <td>
                                  <button type="button" @click="deleteAgent(client)" class="btn btn-danger">delete  <i class="fe fe-delete"></i></button>
                              </td> -->
                          </tr>

                          </tbody>
                      </table>

                  </div>
              </div>

            </div>

        </div>
        <Footer/>
    </section>
</main>


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
      clients:"",
      officers:"",
      orgDetails:"",
      employees:"",
      user:null,

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
                .then(response => {
                    this.orgDetails = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    getOrgDetails(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
                  .then(response => {
                      this.orgDetails = response.data
                      let org_id = response.data.id

                      // get clients
                      this.axios.get(`/api/v1/auth/org_client/${org_id}`)
                        .then(response => {
                            this.clients = response.data
                            console.log(response)
                            // this.getEmployees()
                        })
                        .catch(error => {
                            console.error(error);
                        })
                      //end of get ss

                      // get employees
                      this.axios.get(`/api/v1/auth/enrollment_user/${org_id}`)
                        .then(response => {
                            this.employees = response.data
                            console.log(response)
                        })
                        .catch(error => {
                            console.error(error);
                        })
                      // end of employees

                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getEmployees(){
      // get employees
      this.axios.get(`/api/v1/auth/enrollment_user/${this.orgDetails.id}`)
        .then(response => {
            this.employees = response.data.data
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        })
      //end of employees
    },

      deleteAgent(client){
        if (confirm('Are you sure you want to delete?') ) {
          this.axios.delete(`/api/v1/auth/enrollment_user/${client.id}`)
            .then(response => {
                console.log(response)
                this.$toasted.info('Deleted Successfully', {position: 'top-center', duration:3000 })

            })
            .catch(error => {
                console.error(error);
                this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

            })
        }
      }

  },
  created(){
    this.getOrgDetails()
    // this.getEmployees()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
