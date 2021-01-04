<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3 class="h3">Clients</h3>

                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <!-- <input placeholder="Filter Clients" type="search"
                                      class="form-control form-control-lg search form-control-prepended"> -->
                               <!-- <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div> -->
                           </div>
                           <button type="button" class="btn btn-info" name="button" @click="getClients">Refresh Clients</button>

                       </div>

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>Avatar</th> -->
                                         <th>Name</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <th>Vulnerable Group</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="client in clients" v-bind:key="client.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <td >{{client.firstname}}, {{client.lastname}} {{client.middlename}}</td>
                                         <td>{{client.phone_number}}</td>
                                         <td>{{client.sector}}</td>
                                         <td>{{client.category_of_vulnerable_group}}</td>
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



                   <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="fullPage"></loading>
                    </div>


               </div>
           </div>

       </section>
       </main>
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
      isLoading: false,
      fullPage: true,
      states:"",
      clients:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"client",
                username:"",
                state:"",
                lga:"",
                ward:"",
                address:"",
            }
    }
  },
  beforeMount(){
    this.isLoading = true
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                .then(response => {
                    this.clients = response.data.data.reverse().slice(0,20)
                    console.log(response)
                    this.isLoading = false

                })
                .catch(error => {
                  this.isLoading = false

                    console.error(error);
                })
  },
  methods:{
    getClients(){
      this.isLoading = true
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                  .then(response => {
                      this.clients = response.data.data.reverse().slice(0,20)
                      console.log(response)
                      this.isLoading = false
                      // this.$toasted.success('Success', {position: 'top-center', duration:3000 })
                  })
                  .catch(error => {
                    this.isLoading = false
                    this.$toasted.error('Error getting clients', {position: 'top-center', duration:3000 })
                      console.error(error);
                  })
    },


  },
  created(){
    // this.getClients()
  }

}
</script>
