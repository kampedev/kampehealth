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
                       <strong>{{employees.length}} Employees</strong>
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
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>Avatar</th> -->
                                         <th>Name</th>
                                         <th>E mail</th>
                                         <th>Phone Number</th>
                                         <th>Position</th>
                                         <!-- <th>Action</th> -->
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="employee in employees" v-bind:key="employee.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <td >{{employee.firstname}} {{employee.lastname}} </td>
                                         <td>{{employee.email}}</td>
                                         <td>{{employee.phone_number}}</td>
                                         <td>{{employee.job_title}}</td>
                                         <td v-if="user.id == 95930">
                                          <router-link :to="{ path: '/employee/admin/'+ employee.id}">
                                          <button type="button" class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                        </router-link>
                                        <button type="button" @click="deleteUser(employee)" class="btn btn-danger"> <i class="fe fe-delete"></i></button>

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
      employees:"",
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
    this.axios.get(`/api/v1/auth/getEmployee/95930`)
                .then(response => {
                    this.employees = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    deleteUser(employee){
      if (confirm('Are you Sure you want to delete this user') ) {
        this.axios.delete(`/api/v1/auth/deleteUser/${employee.id}`)
              .then(response => {
                  console.log(response)
                  this.getEmployees()
              })
              .catch(error => {
                  console.error(error);
              })
      }
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
    }
  },
  created(){
    this.getStates()
  }

}
</script>
