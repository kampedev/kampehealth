<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3 class="h5"> {{singleemployee.firstname}} {{singleemployee.lastname}} </h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">
                           <div class="card-header">

                           </div>

                           <div class="card-body">

                            <!-- <p class="h3">{{singleemployee.firstname}} {{singleemployee.lastname}}</p> -->


                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-12">

                       <div class="card m-b-30">
                         <div class="card-header">
                           <h4 class="h4"> Enrollees by User</h4>

                         </div>

                           <div class="card-body">
                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Contact</th>
                                         <th>Status</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="enrollee in clients.data" v-bind:key="enrollee.id">

                                         <td>
                                           <router-link :to="{ path: '/client/' + enrollee.id }">
                                           {{enrollee.firstname}} {{enrollee.lastname}}
                                         </router-link>

                                         </td>
                                         <td>{{enrollee.phone_number}}</td>
                                         <td>{{enrollee.sector}}</td>

                                         <td>
                                           <router-link :to="{ path: '/client/'+ enrollee.id}">
                                             <button type="button" name="button" class="btn btn-info">view</button>
                                            </router-link>
                                         </td>
                                     </tr>

                                     </tbody>
                                 </table>
                                 <div class="col-md-4 offset-md-4">
                                   <button  class="btn btn-default btn-lg" @click="gotoPrevious">Previous</button>
                                   <button class="btn btn-default btn-lg" @click="gotoNext">Next</button>
                                 </div>

                             </div>


                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-12">
                           <div class="card m-b-30">
                             <div class="card-header">
                               <strong class="h4">More Details</strong>
                             </div>

                               <div class="card-body">

                                 <p><strong>Beneficiaries Enrolled:</strong>  {{clients.meta.total}}</p>
                                 <br>

                                 <p><strong>E - Mail:</strong>  {{singleemployee.email}}</p>
                                 <br>
                                 <p><strong>Phone Number:</strong> {{singleemployee.phone_number}}</p>
                                 <br>
                                 <!-- <p><strong>Facilty Type:</strong> {{provider.phc_general}}</p>
                                 <br>
                                 <p><strong>Website:</strong> {{provider.website}}</p>
                                 <br> -->

                               </div>
                           </div>
                       </div>
               </div>






           </div>


           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>

       </section>
     </div>

   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      singleemployee:"",
      clients:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      current_page:"",

    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/user/${this.$route.params.id}`)
                .then(response => {
                    this.singleemployee = response.data.user
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    gotoNext(){
      if (this.clients.meta.current_page != this.clients.meta.last_page) {
            this.current_page ++
            this.getClients()
          }
          else {
            this.$toasted.info('You have reached the Last Page', {position: 'top-center', duration:3000 })

          }
    },
    gotoPrevious(){
      if (this.clients.meta.current_page != 1) {
          this.current_page --
          this.getClients()
        }
        else {
          this.$toasted.info('You have reached the First Page', {position: 'top-center', duration:3000 })
        }
    },
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true
      this.axios.get(`/api/v1/auth/employee_client/${this.$route.params.id}`,{
      params:{
        page: this.current_page
      }
    })
                  .then(response => {
                      this.clients = response.data
                      this.isLoading = false
                      console.log(response)
                  })
                  .catch(error => {
                    this.isLoading = false
                      console.error(error);
                  })

    },

  },
  created(){
    this.getClients()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
</style>
