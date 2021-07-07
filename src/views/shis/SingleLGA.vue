<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div>
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <!-- <h3 class="h5"> {{provider.agency_name}} </h3> -->
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 text-center">
                       <div class="card m-b-30">
                         <div class="card-header">
                           <h4 class="h4">{{clients.length}} LGA Users/Facilities</h4>
                         </div>

                           <div class="card-body">




                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 offset-lg-2">

                       <div class="card m-b-30">


                           <div class="card-body">
                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Contact</th>
                                         <th>Status</th>
                                         <th>Type</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="enrollee in clients" v-bind:key="enrollee.id">

                                         <td>
                                           {{enrollee.firstname}} {{enrollee.lastname}} {{enrollee.agency_name}}

                                         </td>
                                         <td>{{enrollee.phone_number}}</td>
                                         <td>{{enrollee.sector}}</td>
                                         <td>{{enrollee.type}}</td>

                                         <td>
                                           <router-link :to="{ path: '/client/'+ enrollee.id}" v-if="enrollee.type == 'client'">
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
      clients:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getuserbylga/${this.$route.params.id}`)
                .then(response => {
                    this.clients = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getUsers(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getuserbylga/${this.$route.params.id}`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    }

  },
  created(){
    // this.getUsers()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
</style>
