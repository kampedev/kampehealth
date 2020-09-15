<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-12 mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->

                           </div>
                       </div>
                       <button type="button" name="button" class="btn btn-primary text-right" @click="show = true" >Add Clients</button>

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
       <section class="pull-up">
           <div class="container">

               <div class="row list" v-show="show">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>
                           <div class="card-body">

                             <div class="text-center">

                                 <h1 > <strong>Bio Data</strong> </h1>
                             </div>

                                                      <div class="form-row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                              <label for="inputCity">Select Sector</label>
                                                                  <select class="form-control"  v-model="register.sector" >
                                                                   <option  value="formal">Formal Sector</option>
                                                                   <option  value="informal">Informal Sector</option>
                                                               </select>
                                                            </div>
                                                        </div>

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
                                                            <div class="form-group col-md-6">
                                                              <p>  <label for="inputPassword4">Date of Birth</label></p>
                                                                <!-- <input type="text" class="form-control" v-model="register.dob" placeholder="1994/01/01" > -->
                                                                <date-picker v-model="register.dob" valueType="format"></date-picker>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">Gender</label>
                                                                  <select class="form-control"  v-model="register.gender" >
                                                                   <option  value="Male">Male</option>
                                                                   <option  value="Female">Female</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label >Point of HealthCare</label>
                                                                <select class="form-control" v-model="register.poh">
                                                                  <option  value="phc">Primary Health Care</option>
                                                                  <option  value="gh">General Hospital</option>
                                                                  <option  value="sh">Special Hospital</option>
                                                                  <option  value="fmc">Federal Medical Centre</option>
                                                                  <option  value="phf">Private Health Facility</option>
                                                                  <option  value="others">Others</option>
                                                               </select>
                                                            </div>

                                                            <div class="form-group col-md-6" v-if="register.poh == 'others'">
                                                              <label >Point of HealthCare</label>
                                                                <select class="form-control" >
                                                                  <option  value="phc">Diagnostic Centre</option>
                                                                  <option  value="gh">Pharmacy</option>
                                                                  <option  value="sh">Medicine Store</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6" v-if="register.sector == 'formal'">
                                                                <label for="inputEmail4">Computer Number</label>
                                                                <input type="text" class="form-control" v-model="register.firstname" placeholder="Computer Employment Number">
                                                            </div>
                                                        </div>

                                                        <div class="form-row" v-if="register.sector == 'formal'">
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Select MDA</label>
                                                               <select class="form-control"  v-model="register.place_of_work" >
                                                                <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                                                            </select>
                                                             </div>

                                                             <!-- <div class="form-group col-md-6">
                                                               <label for="inputCity">Department</label>
                                                                   <select class="form-control"  v-model="register.gender" >
                                                                    <option  value="Male">Department</option>
                                                                    <option  value="Female">Department</option>
                                                                </select>
                                                             </div>

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Parastatals</label>
                                                                   <select class="form-control"  v-model="register.gender" >
                                                                    <option  value="Male">ZAMCHEMA</option>
                                                                    <option  value="Female">Others</option>
                                                                </select>
                                                             </div> -->


                                                         </div>

                                                        <div class="row">

                                                          <!-- <div class="form-group col-md-6">
                                                            <label for="inputCity">Blood Group</label>
                                                                <select class="form-control"  v-model="register.blood" >
                                                                 <option  value="A">A</option>
                                                                 <option  value="B">B</option>
                                                                 <option  value="AB">AB</option>
                                                                 <option  value="O">O</option>
                                                             </select>
                                                          </div> -->
                                                          <!-- <div class="form-group col-md-6">
                                                            <label for="inputCity">Genotype</label>
                                                                <select class="form-control"  v-model="register.genotype" >
                                                                 <option  value="AA">AA</option>
                                                                 <option  value="AO">AO</option>
                                                                 <option  value="BB">BB</option>
                                                                 <option  value="BO">BO</option>
                                                                 <option  value="AB">AB</option>
                                                                 <option  value="OO">OO</option>
                                                             </select>
                                                          </div> -->
                                                          <!-- <div class="form-group col-md-6">
                                                              <label for="inputPassword4">Weight</label>
                                                              <input type="text" class="form-control" v-model="register.weight" placeholder="Weight in (Kg)" >
                                                          </div> -->
                                                        </div>

                                                        <div class="row">
                                                          <div class="form-group col-md-6">
                                                            <label for="inputCity">State </label>

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

                                                        <div class="form-group">
                                                           <label for="inputAddress">Address</label>
                                                           <textarea name="name" rows="3" cols="80"  class="form-control" v-model="register.address" placeholder="1234 Main St"></textarea>
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

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                              <h1>{{clients.length}} Clients</h1>

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
                                     <tr v-for="client in clients" v-bind:key="client.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <td >{{client.firstname}} {{client.lastname}}</td>
                                         <td>{{client.email}}</td>
                                         <td>{{client.phone_number}}</td>
                                         <!-- <td>{{client.state}}/{{client.localgovt}}</td> -->
                                         <td>{{client.state}}</td>
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
     import DatePicker from 'vue2-datepicker';
     import 'vue2-datepicker/index.css';

export default {
  components: {
     Navbar, Loading, DatePicker
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      states:"",
      show:false,
      clients:"",
      mdas:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"client",
                username:"",
                provider_id:"",
                state:"",
                lga:"",
                poh:"",
                sector:"",
                ward:"",
                address:"",
                blood:"",
                weight:"",
                gender:"",
                genotype:"",
                dob:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`)
                .then(response => {
                    this.clients = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods:{
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))

      // this.axios.get(`/api/v1/auth/getProviderToUser/${this.user.institutional_id}`)
      //             .then(response => {
      //                 this.clients = response.data.data
      //                 console.log(response)
      //             })
      //             .catch(error => {
      //                 console.error(error);
      //             })

      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`)
                  .then(response => {
                      this.clients = response.data.data
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
    getMDAs(){
      this.axios.get(`/api/v1/auth/ministry`)
                  .then(response => {
                      this.mdas = response.data[0]
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
          agency_id: this.user.institutional_id,
          provider_id: this.user.institutional_id,
          username: this.register.username,
          state: this.state.name,
          role: 0,
          password: 'euhler',
          localgovt: this.register.localgovt,
          poh: this.register.poh,
          sector: this.register.sector,
          // ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          genotype: this.register.genotype,
          weight: this.register.weight,
          gender: this.register.gender,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.getClients();
            this.$breadstick.notify("Client added successfully", {position: "top-right"});
            let user_id = response.data.data.id
            this.$router.push(`/client/${user_id}`)

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.getClients();
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }

  },
  created(){
    this.getStates()
    this.getClients()
    this.getMDAs()
  }

}
</script>
