<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">{{user.full_name}} </h5>
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
                                <p class="text-muted text-overline m-0">OHIS</p>
                                <h1 class="fw-400">Osogbo, Osun</h1>
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
                                <h1 class="fw-400">{{clients.total}}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
              <div class="col-md-10 m-b-30">
                  <h5 class="h5"> <i class="fe fe-users"></i>{{clients.total}} Enrollees</h5>
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
                                  <img :src="`https://insurance-api.hayokmedicare.ng/image/${client.user_image}`"
                                                         class="avatar-img avatar-sm rounded-circle"
                                                                    alt=""></div>
                            </td>
                              <td>
                                {{client.full_name}} 
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

export default {
  components: {
     Navbar, Footer
  },
  
  data(){
    return{
      auth_user:"",
      OfficerDetails:"",
      clients:"",
      appointments:"",
      providers:"",
      user:null,

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/OfficerDetails/${this.user.id}`)
                .then(response => {
                    this.OfficerDetails = response.data.data
                    this.clients = response.data.enrollees
                    // let officer = response.data
                    console.log(response)
                    
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    //
  },
  created(){
  

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
