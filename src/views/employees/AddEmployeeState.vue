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
                                                                   <option v-for="state in states" v-bind:key="state.id" :value="state.name">{{state.name}}</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">LGA</label>

                                                                  <select class="form-control"  v-model="register.lga">
                                                                   <option v-for="lga in lga_states.lgas" v-bind:key="lga" :value="lga">{{lga}}</option>
                                                               </select>
                                                            </div>
                                                          </div>

                                                          <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputCity">Job Title</label>
                                                                  <select class="form-control"  v-model="register.job_title">
                                                                   <option  value="doctor">Claims Clerk</option>
                                                                   <option  value="receptionist">Receptionist</option>
                                                                   <option  value="accountant">Desk Officer</option>
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
      this.axios.get(`http://locationsng-api.herokuapp.com/api/v1/states`)
                  .then(response => {
                      this.states = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchLga(state){
      this.axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${state}/details`)
                  .then(response => {
                      this.lga_states = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    registerUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/register',{
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          password: 'euhler',
          state: this.state,
          institutional_id: this.user.id,
          job_title: this.register.job_title,
          role: 0,
          lga: this.register.lga,
          ward: this.register.ward,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Employee added successfully!, Default Password is 'euhler' ", {position: "top-right"});
            this.getEmployees()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }
  },
  created(){
    this.getStates()
  }

}
</script>
