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
                       <h3 class="h3"> {{employees.length}} Employees</h3>

                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <div class="text-center">
                                 <h3 class="h4">Add Employee</h3>
                             </div>
                           </div>

                           <div class="card-body">


                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">First Name</label>
                                                                 <input type="text" class="form-control" v-model="register.firstname" placeholder="First Name">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Last Name</label>
                                                                 <input type="text" class="form-control" v-model="register.lastname"  placeholder="Last Name">
                                                             </div>
                                                         </div>
                                                         <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputEmail4">Email</label>
                                                                  <input type="email" class="form-control" v-model="register.email" placeholder="Email">
                                                              </div>

                                                              <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Phone Number</label>
                                                                  <input type="text" class="form-control" v-model="register.phone_number" placeholder="Phone Number" >
                                                              </div>
                                                          </div>

                                                          <!-- <div class="row">
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">States </label>

                                                              <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                               <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                                                           </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">LGA {{lga.local_name}}</label>
                                                                <select class="form-control"  v-model="register.localgovt">
                                                                  <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                                               </select>
                                                            </div>
                                                          </div> -->

                                                          <div class="form-row">

                                                            <div class="form-group col-md-6">
                                                                <label for="inputCity">Job Title</label>
                                                                <select class="form-control"  v-model="register.job_title">
                                                                  <option  value="Administrative Officer">Administrative Staff</option>
                                                                 <option  value="Claims Officer">Claims Officer</option>
                                                                 <option  value="Enrollment Officer">Enrollment Officer</option>
                                                                 <option  value="Quality Assurance">Quality Assurance</option>
                                                             </select>
                                                            </div>

                                                            <div class="form-group col-md-6">
                                                                <label for="inputCity">Role</label>
                                                                <select class="form-control"  v-model="register.role">
                                                                 <option  :value="admin_role">Admin</option>
                                                                 <option  :value="user_role">Maintainer</option>
                                                             </select>
                                                            </div>



                                                          </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary btn-block btn-lg" @click="registerUser">Submit</button>
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
      admin_role:1,
    user_role:0,
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"employee",
                state:"",
                institutional_id:"",
                job_title:"",
                lga:"",
                id_card_number:"",
                ward:"",
                address:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getEmployee/${this.user.id}`)
                .then(response => {
                    this.employees = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods:{
    getEmployees(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getEmployee/${this.user.id}`)
                  .then(response => {
                      this.employees = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getStates(){
      this.axios.get(`/api/v1/auth/states`)
                  .then(response => {
                      this.states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchLga(state){
      this.axios.get(`/api/v1/auth/lga/${state.id}`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    registerUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          password: 'euhler',
          state : '2669',
          enrolled_by : 0,
          // localgovt : this.register.lga,
          localgovt : '480',
          id_card_number : this.register.id_card_number,
          institutional_id: 90,
          job_title: this.register.job_title,
          role: this.register.role,
          lga: this.register.lga,
          ward: this.register.ward,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            let user_id = response.data.data.id
            this.$router.push(`/client/${user_id}`)

            this.$toasted.info('Employee added Successfully', {position: 'top-center', duration:3000 })
            this.$toasted.info("Employee Password is 'euhler' ", {position: 'top-center', duration:3000 })

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error("Error ", {position: 'top-center', duration:3000 })

        })
    }
  },
  created(){
    this.getStates()
  }

}
</script>
