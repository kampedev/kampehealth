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
                       <h3 class="h5"> {{employeee.user.firstname}} {{employeee.user.lastname}} </h3>
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

                             <div class="form-group" v-if="user.id == 95930 || user.user_role == 1">
                                 <button class="btn btn-success spacer-left" @click="show = !show" >Change Password</button>
                                 <button class="btn btn-secondary spacer-left" @click="showupdatedep = !showupdatedep" >Change Role</button>
                                 <button class="btn btn-primary spacer-left" @click="updateRole"  v-if="employeee.user.user_role == 0">make admin</button>
                                 <button class="btn btn-primary spacer-left" @click="updateRole" v-if="employeee.user.user_role == 1">make maintainer</button>
                                 <button class="btn btn-warning spacer-left" @click="blockUnblock" v-if="employeee.user.blocked_at == null">Block</button>
                                 <button class="btn btn-primary spacer-left" @click="blockUnblock" v-if="employeee.user.blocked_at != null">Unblock</button>

                             </div>


                           </div>
                       </div>
                   </div>
               </div>

               <div class="" v-show="show">
                 <ChangePasswordEmployee/>
               </div>

               <div class="" v-show="showupdatedep">
                 <ChangeDept/>
               </div>


               <div class="row">
                   <div class="col-lg-8 col-md-8">

                       <div class="card m-b-30">
                         <div class="card-header">
                           <h4 class="h4 text-center">{{clients.meta.total}} Enrollees</h4>

                         </div>
                         <div class="card-body">
                           <div class="table-responsive">
                               <table class="table align-td-middle table-card">
                                   <thead>
                                   <tr>
                                       <!-- <th>Avatar</th> -->
                                       <th>Name</th>
                                       <th>Phone Number</th>
                                       <th>Sector</th>
                                       <th>Action</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="client in clients.data" v-bind:key="client.id">
                                     <!-- <td>
                                         <div class="avatar avatar-sm " v-if="client.user_image != null ">
                                           <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`"
                                             class="avatar-img avatar-sm rounded-circle"
                                               alt=""></div>
                                     </td> -->
                                       <td >{{client.firstname}} {{client.middlename}} {{client.lastname}}</td>
                                       <td>{{client.phone_number}}</td>
                                       <td>{{client.sector}}</td>
                                       <td>

                                         <router-link :to="{ path: '/client/'+ client.id}">
                                           <button type="button" name="button" class="btn btn-info"><i class="fe fe-eye"></i></button>
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
                               <strong class="h4">Employee Details</strong>
                             </div>

                               <div class="card-body">
                                 <p><strong>Contact Name:</strong>  {{employeee.user.firstname}} {{employeee.user.lastname}}</p>
                                 <button type="button"
                                  class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                                  v-if="employeee.user.role == 1"
                                >admin
                                </button>
                                 <br>
                                 <p><strong>Department/ Job Title:</strong> {{employeee.user.job_title}}</p>
                                 <p><strong>E - Mail:</strong>  {{employeee.user.email}}</p>
                                 <br>
                                 <p><strong>Phone Number:</strong> {{employeee.user.phone_number}}</p>
                                 <br>

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
  import ChangePasswordEmployee from '@/views/auth/ChangePasswordEmployee.vue'
  import ChangeDept from '@/views/employees/ChangeDept.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, ChangePasswordEmployee, ChangeDept
  },
  data(){
    return{
      user:null,
      employeee:"",
      show:false,
      showupdatedep:false,
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      current_page:"",
      unblock:null,
      clients:"",
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
                .then(response => {
                    this.employeee = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    blockUnblock(){
      if (this.employeee.user.blocked_at == null ) {
        this.axios.patch(`/api/v1/auth/block-user/${this.$route.params.id}`,{
          blocked_at:'2021-01-01'
        })
              .then(response => {
                  console.log(response)
                  this.$toasted.info('Blocked Successfully!', {position: 'top-center', duration:3000 })
                  this.getEmployee()
              })
              .catch(error => {
                  console.error(error);
              })
      }
      else {
        this.axios.patch(`/api/v1/auth/block-user/${this.$route.params.id}`,{
          blocked_at:null
        })
              .then(response => {
                  console.log(response)
                  console.log('ublock')
                  this.$toasted.info('Unblocked Successfully!', {position: 'top-center', duration:3000 })
                  this.getEmployee()
              })
              .catch(error => {
                  console.error(error);
              })
      }
    },
    updateRole(){
      if (this.employeee.user.role == 1 ) {
        this.axios.post(`/api/v1/auth/update-role/${this.$route.params.id}`,{
          role:0
        })
              .then(response => {
                  console.log(response)
                  this.$toasted.info('Changed Successfully!', {position: 'top-center', duration:3000 })
                  this.getEmployee()
              })
              .catch(error => {
                  console.error(error);
              })
      }
      else {
        this.axios.post(`/api/v1/auth/update-role/${this.$route.params.id}`,{
          role:1
        })
              .then(response => {
                  console.log(response)
                  this.$toasted.info('Changed Successfully!', {position: 'top-center', duration:3000 })
                  this.getEmployee()
              })
              .catch(error => {
                  console.error(error);
              })
      }
    },
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
      getEmployee(){
        this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
                    .then(response => {
                        this.employeee = response.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      },
      EmployeeClients(){
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
      }

  },
  created(){
    this.EmployeeClients()
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
.spacer-left{
  margin-left:10px;
}
</style>
