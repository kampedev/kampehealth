<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->
   <section class="admin-content">
        <div class="container">


        <div class="col-md-12" style="margin-top:15px;">
          <button type="button" :class="buttoncolor.formal" @click="showFormal">Formal <i class="fe fe-list"></i> </button>
          <button type="button" :class="buttoncolor.informal" @click="showInformal">Informal <i class="fe fe-grid"></i> </button>
        </div>

            <div class="" v-show="formal_S">
              <FormalSector/>
            </div>

            <div class="" v-show="informal_S">
              <InformalSector/>
            </div>


            <div class="row">

                <div class="col-md-12 m-b-30">
                    <h5> <i class="fe fe-users"></i>Recent Beneficiaries</h5>
                    <div class="table table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Sector</th>
                                <th>OHIS Number</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="client in clients" v-bind:key="client.id">
                                <td> {{client.firstname}} {{client.lastname}}</td>
                                <td>{{client.phone_number}}</td>
                                <td>{{client.sector}}</td>
                                <td>{{client.id_card_number}}</td>
                                <td>
                                  <router-link :to="{ path: '/client/'+ client.id}">
                                    <button type="button" name="button" class="btn btn-info" style="margin-left:10px; margin-top:10px;" ><i class="fe fe-eye"></i></button>
                                  </router-link>
                                  <button type="button" @click="deleteUser(client)" class="btn btn-danger" style="margin-left:10px; margin-top:10px;" ><i class="fe fe-delete"></i></button>
                                  <!-- <button type="button" @click="changeNumber(client)" class="btn btn-primary" v-if="user.id == 95930"
                                  style="margin-left:10px; margin-top:10px;" >
                                    <i class="fe fe-edit"></i></button> -->
                                </td>

                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
              <ClientDataDashboard/>


        </div>
        <Footer/>

    </section>
</main>

    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'
import Footer from '@/views/Footer.vue'
import InformalSector from '@/views/shis/components/InformalSector.vue'
import FormalSector from '@/views/shis/components/FormalSector.vue'
// import ClientDataDashboard from '@/views/clients/ClientDataDashboard.vue'
import { StudentService } from "./../../service/student_service";
import { initJsStore } from "./../../service/idb_service";
import { Global } from "./../../global";
import { connection } from "./../../service/jsstore_con";


export default {
  components: {
     // Navbar, ClientDataDashboard
     Navbar, InformalSector, FormalSector, Footer
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
      formal_S:false,
      informal_S:true,
      mydata:"",
      auth_user:"",
      providers:"",
      clients:"",
      total_clients:"",
      claims:"",
      offlineclients: [],
      employees:"",
      plans:"",
      tpas:"",
      buttoncolor:{
        informal:"btn btn-info",
        formal:"btn btn-default",
      }


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
    showFormal(){
      this.formal_S = true;
      this.informal_S = false;
      this.buttoncolor.formal = 'btn btn-info'
      this.buttoncolor.informal = 'btn btn-default'
    },
    showInformal(){
      this.formal_S = false;
      this.informal_S = true;
      this.buttoncolor.informal = 'btn btn-info'
      this.buttoncolor.formal = 'btn btn-default'
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
    getEmployees(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/getEmployee/95930`)
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
      this.axios.get(`/api/v1/auth/getClaims/95930`)
                  .then(response => {
                      this.claims = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getTPAs(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/org_agency/95930`)
                  .then(response => {
                      this.tpas = response.data;
                      console.log("this response is for tpa");
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    deleteUser(client){
      if (confirm('Are you Sure you want to delete this user') ) {
        this.axios.delete(`/api/v1/auth/deleteUser/${client.id}`)
                    .then(response => {
                        console.log(response)
                        this.getClients()
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },
    changeNumber(client){
      this.isLoading = true
        this.axios.patch(`/api/v1/auth/id-card-number/change/${client.id}`)
                    .then(response => {
                        console.log(response)
                        this.getClients()
                        this.$toasted.success('Changed Successfully', {position: 'top-center', duration:3000 })
                        this.isLoading = false

                    })
                    .catch(error => {
                        console.error(error);
                        this.$toasted.error('Error!', {position: 'top-center', duration:3000 })
                        this.isLoading = false

                    })

    },
    fetchLga(){
      this.axios.get(`/api/v1/auth/lga/2676`)
                  .then(response => {
                      this.optionso.xaxis.categories = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getClients(){
      this.axios.get(`/api/v1/auth/getAgencyToUser/95930`)
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
              state: '2676',
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
    this.fetchLga()
    // this.getTPAs()
    // this.totalArray()
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
