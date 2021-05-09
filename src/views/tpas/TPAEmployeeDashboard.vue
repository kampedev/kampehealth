<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">{{user.firstname}} {{user.lastname}}</h5>
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
                              <router-link :to="{ path: '/view-clients-tpa'}">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                              </router-link>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Zamfara Contributory Healthcare Management Agency (ZAMCHEMA)</p>
                                <h1 class="fw-400">Gusau, Zamfara</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6">
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
                                <p class="text-muted text-overline m-0">Enrolled Users</p>
                                <h1 class="fw-400">{{clients.meta.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
              <div class="col-md-10 m-b-30">
                  <h5 class="h5"> <i class="fe fe-users"></i>{{clients.meta.total}} Enrollees</h5>
                  <div class="table-responsive">
                      <table class="table align-td-middle table-card">
                          <thead>
                          <tr>
                              <th>Avatar</th>
                              <th>Name</th>
                              <th>Phone Number</th>
                              <th>Sector</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="client in clients.data" v-bind:key="client.id">
                            <td>
                                <div class="avatar avatar-sm " v-if="client.user_image != null ">
                                  <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`"
                                                         class="avatar-img avatar-sm rounded-circle"
                                                                    alt=""></div>
                            </td>
                              <td>
                                {{client.firstname}} {{client.lastname}}
                              </td>
                              <td>{{client.phone_number}}</td>
                              <td> {{client.sector}}</td>
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
        <Footer/>
    </section>
</main>


    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import Footer from '@/views/Footer.vue'
import { StudentService } from "./../../service/student_service";
import { initJsStore } from "./../../service/idb_service";
import { Global } from "./../../global";
import { connection } from "./../../service/jsstore_con";

export default {
  components: {
     Navbar, Footer
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
      OfficerDetails:"",
      clients:"",
      appointments:"",
      providers:"",
      user:null,
      offlineclients: [],

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/OfficerDetails/${this.user.id}`)
                .then(response => {
                    this.OfficerDetails = response.data
                    let officer = response.data
                    console.log(response)
                    //get user users
                    this.axios.get(`/api/v1/auth/org_client/${officer.orgenrol_id}`)
                                .then(response => {
                                    this.clients = response.data
                                    console.log(response)
                                })
                                .catch(error => {
                                    console.error(error);
                                })
                    //end of get user user
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

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
    this.getOfflineCLients()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
