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
                       <h3> {{employees.length}} Employees</h3>

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

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                               <div class="text-center">

                                   <h3 class="p-t-10 searchBy-name">Add Employee</h3>
                               </div>

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

                                                          <div class="row">
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">States</label>

                                                              <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                               <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                                                           </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">LGA</label>
                                                                <select class="form-control"  v-model="register.localgovt">
                                                                  <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                               </select>
                                                            </div>
                                                          </div>

                                                          <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputCity">Job Title</label>
                                                                  <select class="form-control"  v-model="register.job_title">
                                                                   <option  value="desk">Desk Officer</option>
                                                                   <option  value="m_and_e">Monitoring and Evaluation Officer</option>
                                                                   <option  value="qao">Quality Assurance Officer</option>
                                                                   <option  value="doctor">Doctor</option>
                                                                   <option  value="pharmacist">Pharmacist</option>
                                                                   <option  value="nurse">Nurse</option>
                                                                   <option  value="laboratorist">Laboratorist</option>
                                                                   <option  value="receptionist">Receptionist</option>
                                                                   <option  value="accountant">Accountant</option>
                                                                   <option  value="extension_worker">Community health extension workers (CHEWs)</option>
                                                               </select>
                                                              </div>
                                                          </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="registerUser">Submit</button>
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

               <div class="row list">
                   <div class=" col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                              <h1>{{employees.length}} Clients</h1>

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>Avatar</th> -->
                                         <th>Name</th>
                                         <th>E mail</th>
                                         <th>Phone Number</th>
                                         <th>State</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="employee in employees" v-bind:key="employee.id">

                                         <td >{{employee.firstname}} {{employee.lastname}}</td>
                                         <td>{{employee.email}}</td>
                                         <td>{{employee.phone_number}}</td>
                                         <td>{{employee.state}}</td>
                                         <td>

                                           <router-link :to="{ path: '/client/'+ employee.id}">
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
                type:"employee",
                state:"",
                username:"",
                institutional_id:"",
                job_title:"",
                lga:"",
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
          username: this.register.email,
          password: 'euhler',
          state: this.state.name,
          institutional_id: this.user.id,
          job_title: this.register.job_title,
          role: 0,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Employee added successfully!, Default Password is 'euhler' ", {position: "top-right"});
            this.getEmployees()
            this.clearIt()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    },
    clearIt(){
      this.register.firstname = "";
      this.register.lastname = "";
      this.register.email = "";
      this.register.phone_number = "";
      this.register.job_title = "";
    }
  },
  created(){
    this.getStates()
  }

}
</script>
