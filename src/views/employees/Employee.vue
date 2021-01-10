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

                <div class="col-md-12" v-if="offlineclients.length > 0">
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
                </div>

                <div class="col-lg-6 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                              <!-- <router-link :to="{ path: '/manage-appointments'}"> -->
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-calendar"></i>
                                    </div>
                                </div>
                              <!-- </router-link> -->
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Health Facilities</p>
                                <h1 class="fw-400">{{providers.length}}</h1>
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
                                <p class="text-muted text-overline m-0">Clients</p>
                                <h1 class="fw-400">{{clients.length}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
              <div class="col-md-10 m-b-30">
                  <!-- <h5> <i class="fe fe-alert-circle"></i>{{clients.length}} CLients</h5> -->
                  <div class="table-responsive">
                      <table class="table align-td-middle table-card">
                          <thead>
                          <tr>
                              <th>Name</th>
                              <th>E mail</th>
                              <th>Phone Number</th>
                              <th>State</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="client in clients" v-bind:key="client.id">
                              <td>
                                {{client.firstname}} {{client.lastname}}
                              </td>
                              <td>{{client.email}} </td>
                              <td>{{client.phone_number}}</td>
                              <td> {{client.state}}</td>
                              <td>
                                <router-link :to="{ path: '/client/'+ client.id}">
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

    </section>
</main>


    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import { StudentService } from "./../../service/student_service";
import { initJsStore } from "./../../service/idb_service";
import { Global } from "./../../global";
import { connection } from "./../../service/jsstore_con";

export default {
  components: {
     Navbar
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
      auth_user:"",
      clients:"",
      appointments:"",
      providers:"",
      user:null,
      offlineclients: [],


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
  methods:{

    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      // this.axios.get(`/api/v1/auth/getProviderToUser/${this.user.institutional_id}`)
      //             .then(response => {
      //                 this.clients = response.data.data
      //                 console.log(response)
      //             })
      //             .catch(error => {
      //                 console.error(error);
      //             })

      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`)
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
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.institutional_id}`)
                  .then(response => {
                      this.providers = response.data.data
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
                                  // this.$breadstick.notify("Profile pushed Successfully!", {position: "top-right"});
                              })
                              .catch(error => {
                                  console.error(error);
                              })
                  //End upload Pic

                  //upload left finger image
                  var formData = new FormData();
                  formData.append("user_id", user_added_id)
                  formData.append("leftfour", item.left_fingers)
                  this.axios.post("/api/v1/auth/uploadLeftfour", formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then(response => {
                    console.log(response);

                  })
                  //End of upload left image

                  //upload right finger image
                  var formDataright = new FormData();
                  formDataright.append("user_id", user_added_id)
                  formDataright.append("rightfour", item.right_fingers)
                  this.axios.post("/api/v1/auth/uploadRightfour", formDataright, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then(response => {
                    console.log(response);

                  })
                  //End of upload left image

                  //upload thumbs finger image
                  var formDataThumbs = new FormData();
                  formDataThumbs.append("user_id", user_added_id)
                  formDataThumbs.append("thumbs", item.thumbs_fingers)
                  this.axios.post("/api/v1/auth/uploadThumbs", formDataThumbs, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then(response => {
                    console.log(response);

                  })
                  //End of upload thumbs image
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
    this.getClients()
    this.getAppointments()
    this.getOfflineCLients()
    this.getProviders()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
