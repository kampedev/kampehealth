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
                       <h3>My Records</h3>
                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Clients" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div> -->

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>Avatar</th> -->
                                         <!-- <th>Name</th> -->
                                         <th>Dr. Visited</th>
                                         <th>Reason for Visit</th>
                                         <th>Date</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="record in records" v-bind:key="record.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <!-- <td >{{client.firstname}} {{client.lastname}}</td> -->
                                         <td>{{record.drVisited}}</td>
                                         <td>{{record.reasonVisit}}</td>
                                         <td>{{record.created_at}}</td>

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
      records:"",
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
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/gethealthRecord`)
                .then(response => {
                    this.records = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getRecords(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/gethealthRecord`)
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    registerUser(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/register',{
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          username: this.register.username,
          state: this.state,
          role: 0,
          lga: this.register.lga,
          ward: this.register.ward,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Client added successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }

  },
  created(){
    this.getRecords()
  }

}
</script>
