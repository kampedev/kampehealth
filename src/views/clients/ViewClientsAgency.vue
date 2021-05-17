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
                       <h3 class="h3">Enrollees</h3>

                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">

                           </div>
                           <button type="button" class="btn btn-info " name="button" @click="getClients">Refresh Clients</button>

                       </div>

                   </div>

               </div>
           </div>
       </div>
       <!-- <FilterUsers/> -->
       <SearchUser/>
       <FilterUserProvider/>
       <FilterUserLGA/>

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
                                     <tr v-for="client in clients.data" v-bind:key="client.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <td >{{client.firstname}}, {{client.lastname}} {{client.middlename}}</td>
                                         <td>{{client.phone_number}} </td>
                                         <td>{{client.sector}}</td>
                                         <td>{{client.category_of_vulnerable_group}}</td>
                                         <td>
                                           <router-link :to="{ path: '/client/'+ client.id}">
                                             <button type="button" name="button" class="btn btn-info"><i class="fe fe-eye"></i> </button>
                                            </router-link>

                                         </td>
                                     </tr>


                                     </tbody>
                                 </table>
                                 <div class="col-lg-4 offset-lg-4">
                                   <button  class="btn btn-default btn-lg" @click="gotoPrevious">Previous</button>
                                   <button class="btn btn-default btn-lg" @click="gotoNext">Next</button>
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


               </div>
           </div>

       </section>
       </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import SearchUser from '@/views/shis/components/SearchUser.vue'
  import FilterUserProvider from '@/views/shis/components/FilterUserProvider.vue'
  import FilterUserLGA from '@/views/shis/components/FilterUserLGA.vue'

  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
     Navbar, Loading, SearchUser, FilterUserProvider, FilterUserLGA
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      states:"",
      clients:"",
      state:"",
      lga_states:"",
      current_page:1,
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
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`,{
    params:{
      page: this.current_page
    }
  })
                .then(response => {
                    this.clients = response.data
                    console.log(response)
                    this.isLoading = false

                })
                .catch(error => {
                  this.isLoading = false

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
      this.isLoading = true
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`,{
      params:{
        page: this.current_page
      }
    })
                  .then(response => {
                      this.clients = response.data
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
