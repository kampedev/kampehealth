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
                                <h1 class="fw-400">{{clients.meta.total | numeral(0,0)}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <lgadata/>

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
                              <th>NIN Number</th>
                              <!-- <th>Facility</th> -->
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="client in clients.data" v-bind:key="client.id">
                              <td>
                                {{client.firstname}} {{client.lastname}}
                              </td>
                              <td>{{client.phone_number}} </td>
                              <td>{{client.sector}}</td>
                              <td> {{client.nimc_number}}</td>
                              <!-- <td>{{client.provider_id}}</td> -->

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
import lgadata from '@/views/shis/components/lgadata.vue'

export default {
  components: {
     Navbar, lgadata, Footer
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
      this.axios.get(`/api/v1/auth/providerAgency/95930`)
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

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
