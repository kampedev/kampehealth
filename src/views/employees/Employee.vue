<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Hello, {{auth_user.full_name}}</h5>
                </div>



                <div class="col-lg-4 col-md-4">
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

                <div class="col-lg-4 col-md-4">
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
                                <p class="text-muted text-overline m-0">Total Enrollees</p>
                                <h1 class="fw-400">{{clients.meta.total | numeral(0,0)}}</h1>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4 col-md-4">
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
                                <p class="text-muted text-overline m-0">My Enrollees</p>
                                <h1 class="fw-400">{{enrollee_clients.meta.total | numeral(0,0)}}</h1>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
              <!-- {{facilities.length}}
              {{wards.length}} -->

              <div class="col-md-12">
                <button type="button" class="btn btn-success" @click="fetchLga" style="margin-bottom:10px;">
                  Upload Facility Data to Offline</button>
              </div>

            <div class="col-md-6" v-show="show">
                <div class="form-group col-md-6">
                  <label for="inputCity">LGA</label>
                    <select class="form-control"   v-model="selected_lga"  @change="fetchFacilitiesperlga()">
                      <option v-for="lga in lga_states" v-bind:key="lga" :value="lga">{{lga.local_name}}</option>
                   </select>

                   <button type="button" class="btn btn-success" @click="saveData()" style="margin-top:10px;">Update Now</button>

                </div>
            </div>

            <informallga/>

            <div class="row">
              <div class="col-md-12 m-b-30">
                  <!-- <h5> <i class="fe fe-alert-circle"></i>{{clients.length}} CLients</h5> -->
                  <div class="table-responsive">
                      <table class="table align-td-middle table-card">
                          <thead>
                          <tr>
                              <th>Name</th>
                              <th>Phone Number</th>
                              <th>Sector</th>
                              <th>KAMPE Number</th>
                              <!-- <th>Facility</th> -->
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="client in clients.data" v-bind:key="client.id">
                              <td>
                                {{client.full_name}}
                              </td>
                              <td>{{client.phone_number}} </td>
                              <td>{{client.sector}}</td>
                              <td> {{client.id_card_number}}</td>
                              <!-- <td>{{client.provider_id}}</td> -->

                              <td>
                                <router-link :to="{ path: '/client/'+ client.id}">
                                  <button type="button" name="button" class="btn btn-info">view</button>
                                </router-link>
                              </td>

                          </tr>
                          <div class="vld-parent">
                               <loading :active.sync="isLoading"
                               loader="spinner"
                               :can-cancel="false"
                               :is-full-page="true"></loading>
                           </div>



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
import informallga from '@/views/shis/components/informallga.vue'
// Import component
   import Loading from 'vue-loading-overlay';
   // Import stylesheet
   import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
     Navbar, informallga, Footer, Loading
  },

  data(){
    return{
      auth_user:"",
      user:null,
      clients:"",
      enrollee_clients:"",
      selected_lga:"",
      facilities:"",
      wards:"",
      providers:"",
      isLoading: false,
      show: false,
      fullPage: true,
      lga_states: true,
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
    myEnrollees(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/employee_client/${this.user.id}`)
                  .then(response => {
                      this.enrollee_clients = response.data
                      this.isLoading = false
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                      this.isLoading = false

                  })

    },
    fetchFacilitiesperlga(){
      this.isLoading = true
      this.axios.get(`/api/v1/auth/getProviderPerLGA/${this.selected_lga.id}`)
                  .then(response => {
                      this.facilities = response.data.data
                      console.log(response)

                      //get wards
            this.axios.get(`/api/v1/auth/getwards/${this.selected_lga.id}`)
                        .then(response => {
                        this.wards = response.data.data

                            console.log(response)
                            this.isLoading = false

                        })
                        .catch(error => {
                            console.error(error);
                            this.isLoading = false

                        })
                      //end of get wards
                  })
                  .catch(error => {
                      console.error(error);
                      this.isLoading = false

                  })
    },
    fetchLga(){
      this.show = true
      this.axios.get(`/api/v1/auth/lga/2676`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    saveData(){
      this.isLoading = true
      localStorage.setItem('wards_data', JSON.stringify(this.wards));
      localStorage.setItem('facilities', JSON.stringify(this.facilities));
      localStorage.setItem('selected_lga', JSON.stringify(this.selected_lga))
      this.isLoading = false
      this.$toasted.info('Updated Successfully', {position: 'top-center', duration:3000 })



    },

    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`)
                  .then(response => {
                      this.clients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/providerAgency/439078`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },



  },
  created(){
    this.getClients()
    this.getProviders()
    this.myEnrollees()

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
