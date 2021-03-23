<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.agency_name}}</h5>
                </div>

                <!-- <div class="col-md-12" v-if="offlineclients.length > 0">
                  <div class="alert alert-border-warning  alert-dismissible fade show" role="alert">
                                  <div class="d-flex">
                                      <div class="icon">
                                          <i class="icon mdi mdi-alert-circle-outline"></i>
                                      </div>
                                      <div class="content">
                                          <strong>{{offlineclients.length}} Users</strong> added offline.
                                          <download-excel :data="offlineclients">
                                              <button type="button" class="btn btn-primary align-right" name="button" @click="syncClients">Sync Now</button>
                                            </download-excel>

                                      </div>
                                  </div>


                              </div>
                </div> -->


                <!-- <div class="col-lg-3 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <router-link :to="{ path: '/fund-manager'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                                </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Revenue</p>
                                <h1 class="fw-400">&#8358;103,500</h1>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-secondary">
                        <div class="card-body text-white">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                  <router-link :to="{ path: '/view-clients-agency'}">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                  </router-link>
                                </div>
                            </div>
                            <div>
                                <p class="h4">Clients</p>
                                <h1 class="fw-400">{{total_clients |numeral(0,0) }}</h1>
                                <!-- <h1 class="fw-400">218</h1> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-info">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/my-providers'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-activity"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Health Facilities</p>
                                <h1 class="fw-400">{{providers.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
                    <div class="card m-b-30 bg-warning">
                        <div class="card-body text-dark">
                            <div class="pb-2">
                              <router-link :to="{ path: '/plans'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="h4">Claims</p>
                                <h1 class="fw-400">{{plans.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
              <div class="col-md-12 p-t-20">
                <h5 class="h5"> <i class="fe fe-activity"></i> Formal Sector Enrollment Data</h5>

              </div>
              <div class="col-md-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <LGaData />
                  </div>
                </div>
              </div>
              <div class="col-md-12 p-t-20">
                <h5 class="h5"> <i class="fe fe-activity"></i> Informal Sector Enrollment Data</h5>
              </div>
              <div class="col-md-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <InformalLga />
                    
                  </div>
                </div>
              </div>
              
            </div>
            <h5 class="h5"> <i class="fe fe-activity"></i> Category of Basic Health Care Provision Fund Data</h5>
            <div class="row">
                
                <div class="col-md-6">
                  <BasicCategory />
                </div>
                <div class="col-md-6">

                </div>
              </div>

            <div class="row">
                <div class="col-md-12 m-b-30">
                    <h5 class="h5" style="margin-top:15px;"> <i class="fe fe-users"></i>{{employees.length}} Employees</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr >
                                <!-- <th>Avatar</th> -->
                                <th>Name</th>
                                <th>Position</th>
                                <th>E mail</th>
                                <th>Phone Number</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="employee in employees" v-bind:key="employee.id">

                                <td>{{employee.firstname}} {{employee.lastname}}</td>
                                <td>{{employee.job_title}}</td>
                                <td>{{employee.email}}</td>
                                <td>{{employee.phone_number}}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>



            </div>


            <div class="row">


            </div>
        </div>

    </section>
</main>

    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import LGaData from "./components/lgadata";
import InformalLga from "./components/informallga";
import BasicCategory from "./components/basicCategory";
import { StudentService } from "./../../service/student_service";
import { initJsStore } from "./../../service/idb_service";
import { Global } from "./../../global";
import { connection } from "./../../service/jsstore_con";



export default {
  components: {
     Navbar, LGaData, InformalLga, BasicCategory
  },
  async beforeCreate() {
    try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
        console.log("db created");
        // prefill database
      } else {
        console.log("db opened");
      }
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
  },
  data(){
    return{
      user:null,
      mydata:"",
      auth_user:"",
      providers:"",
      clients:"",
      total_clients:"",
      claims:"",
      offlineclients: [],
      employees:"",
      plans:"",
      options: {
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: ['Pregnant Women', 'Children under 5', 'Aged', 'IDP', 'Physically Challenged', 'People with Special Needs', 'Poorest of the poor']
      }
    },
    optionso: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: ['Okibo', 'Ogugu', 'Oturu-Otuo', 'Ileteju', 'Obinoyin', 'Okesin', 'Eni','Obatigben', 'Aiyeromi', 'Oshobane']
    }
  },
    series: [{
      name: 'Basic Healthcare Provision Fund',
      data: [6, 59, 247, 4, 56, 209, 65]
      // data: []
    }],
    serieso: [{
      name: 'Ogori/Magongo',
      data: [71, 61, 67, 62, 57, 77, 67, 83,43,80]
      // data: []
    }]

    }
  },
  beforeMount(){
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

    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getEmployees(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getEmployee/${this.user.id}`)
                  .then(response => {
                      this.employees = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getClaims/${this.user.id}`)
                  .then(response => {
                      this.claims = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getClients(){
      // this.user = JSON.parse(localStorage.getItem('user'))
      // this.axios.get(`/api/v1/auth/getSubsAgency/${this.user.id}`)
      //             .then(response => {
      //                 this.clients = response.data.data
      //                 console.log(response)
      //             })
      //             .catch(error => {
      //                 console.error(error);
      //             })
      this.axios.get(`/api/v1/auth/getAgencyToUser/4`)
                  .then(response => {
                      this.clients = response.data.data
                      this.total_clients = response.data.meta.total
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
  async  syncClients(){
    if (confirm('Are you Sure you want to Sync Data from your Device?') ) {

      this.isLoading = true;

      const result = this.offlineclients.map((item) => {
            this.axios.post('/api/v1/auth/registerProvider',{
              firstname: item.firstname,
              lastname: item.lastname,
              middlename: item.middlename,
              nimc_number: item.nimc_number,
              email: item.email,
              phone_number: item.phone_number,
              type: 'client',
              agency_id: item.agency_id,
              provider_id: item.provider_id,
              state: '2669',
              role: 0,
              password: 'euhler',
              localgovt: item.localgovt,
              address1: item.address,
              sector: item.sector,
              category_of_vulnerable_group: item.category_of_vulnerable_group,
              ward: item.ward,
              blood: item.blood,
              dob: item.dob,
              genotype: item.genotype,
              enrolled_by: item.enrolled_by,
              gender: item.gender,
            })
            .then(response=>{
                console.log(response)
                let user_added_id = response.data.data.id

                //Start upload Pic
                this.axios.post(`/api/v1/auth/uploadcustomerpicImage`,
                 {
                    user_image: item.user_image,
                    user_id: user_added_id,
                  })
                            .then(response => {
                                console.log(response)
                                this.$breadstick.notify("Profile pushed Successfully!", {position: "top-right"});
                            })
                            .catch(error => {
                                console.error(error);
                            })
                //End upload Pic

            }).
            catch(error=>{
                console.log(error.response)
                this.$toasted.error('Error Syncing! Reload Page', {position: 'top-center', duration:3000 })

            })
            result;
            return  connection.clear('Users')
            // this.$toasted.info('Client Synced Successfully', {position: 'top-center', duration:3000 })

      });
      this.isLoading = false;
      this.$toasted.info('Client Synced Successfully', {position: 'top-center', duration:3000 })
      this.getOfflineCLients()
    }


    },
    async remove() {
      const service = new StudentService();
      service;
      const noOfStudentRemoved = await this.service.getStudents();
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
      }
    },
    async getOfflineCLients() {

      this.offlineclients = await new StudentService().getStudents();
    },
  },
  created(){
    this.getProviders()
    this.getClaims()
    this.getClients()
    this.getEmployees()
    this.getOfflineCLients()
    // this.totalArray()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
