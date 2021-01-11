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
                                                                    <select class="form-control"  v-model="sector" >
                                                                     <option  value="formal">Formal Sector</option>
                                                                     <option  value="informal">Informal Sector</option>
                                                                 </select>
                                                              </div>
                                                          </div>

                                                          <div class="col-md-12" v-if="sector == 'informal' " >
                                                              <div class="form-group">
                                                                <label for="inputCity">Select Informal Sector</label>
                                                                    <select class="form-control"  v-model="register.sector" >
                                                                     <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                                                                     <option  value="Vulnerable Groups">Vulnerable Groups</option>
                                                                     <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                                                     <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                                                 </select>
                                                              </div>
                                                          </div>

                                                          <div class="col-md-12" v-if="sector == 'formal' " >
                                                              <div class="form-group">
                                                                <label for="inputCity">Select Formal Sector</label>
                                                                    <select class="form-control"  v-model="register.sector" >
                                                                     <option  value="State Civil Servant Healthcare Plan">State Civil Servant Healthcare Plan</option>
                                                                     <option  value="LGA Civil Servant Healthcare Plan">LGA Civil Servant Healthcare Plan </option>
                                                                     <option  value="State Pensioneers Healthcare Plan">State Pensioneers Healthcare Plan</option>
                                                                     <option  value="LGA Pensioneers Healthcare Plan">LGA Pensioneers Healthcare Plan</option>
                                                                     <option  value="Oganized Private Sector Plan">Organized Private Sector Plan</option>
                                                                     <option value="Tertiary Institution Contributory Health Insurance Plan (TICHIP)">
                                                                       Tertiary Institution Contributory Health Insurance Plan (TICHIP)</option>
                                                                 </select>
                                                              </div>
                                                          </div>
                                                          <div class="form-group col-md-12"  v-if="sector == 'informal'">
                                                            <label >Special Needs</label>
                                                              <select class="form-control" v-model="register.category_of_vulnerable_group">
                                                                <option  value="Pregnant Women">Pregnant Women</option>
                                                                <option  value="Children under 5">Children under 5</option>
                                                                <option  value="Aged">Aged</option>
                                                                <option  value="IDP">IDP</option>
                                                                <option  value="Physically Challenged">Physically Challenged</option>
                                                                <option  value="People with Special Needs">People with Special Needs</option>
                                                                <option  value="Poorest of the Poor">Poorest of the Poor</option>
                                                             </select>
                                                          </div>


                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">NIN Number</label>
                                                                 <input type="text" class="form-control" v-model="register.nimc_number" placeholder="NIMC Number">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Surname</label>
                                                                 <input type="text" class="form-control" v-model="register.lastname"  placeholder="Last Name">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">First Name</label>
                                                                 <input type="text" class="form-control" v-model="register.firstname" placeholder="First Name">
                                                             </div>

                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Middle Name</label>
                                                                 <input type="text" class="form-control" v-model="register.middlename"  placeholder="Last Name">
                                                             </div>

                                                         </div>

                                                         <div class="form-row">
                                                           <div class="form-group col-md-6">
                                                             <p>  <label for="inputPassword4">Date of Birth</label></p>
                                                               <date-picker v-model="register.dob" valueType="format"></date-picker>
                                                           </div>
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputEmail4">Email</label>
                                                                  <input type="email" class="form-control" v-model="register.email" placeholder="Email">
                                                              </div>

                                                              <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Phone Number</label>
                                                                  <input type="text" class="form-control" v-model="register.phone_number" placeholder="Phone Number" >
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Gender</label>
                                                                    <select class="form-control"  v-model="register.gender" >
                                                                     <option  value="Male">Male</option>
                                                                     <option  value="Female">Female</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-6" v-if="sector == 'formal'">
                                                                     <label for="inputCity">Select MDA</label>
                                                                         <select class="form-control"  v-model="register.place_of_work" >
                                                                          <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                                                                      </select>
                                                               </div>

                                                              <div class="form-group col-md-6" v-if="sector == 'formal'">
                                                                  <label for="inputEmail4">Payroll Number</label>
                                                                  <input type="text" class="form-control" v-model="register.salary_number" placeholder="Computer Employment Number">
                                                              </div>
                                                              <div class="form-group col-md-6" v-if="sector == 'formal'">
                                                                  <label for="inputEmail4">PSN Number</label>
                                                                  <input type="text" class="form-control" v-model="register.salary_number" placeholder="Computer Employment Number">
                                                              </div>

                                                              <div class="form-group col-md-6" v-if="sector == 'formal'">
                                                                  <label for="inputEmail4">Grade Level/Step</label>
                                                                  <input type="text" class="form-control" v-model="register.grade_level" placeholder="Grade Level/Step">
                                                              </div>

                                                              <div class="form-group col-md-6" v-if="sector == 'formal'">
                                                                <p>  <label for="inputPassword4">Date of First Appointment</label></p>
                                                                  <date-picker v-model="register.date_of_entry" valueType="format"></date-picker>
                                                              </div>



                                                              <div class="form-group col-md-6">
                                                                <label >Marital Status</label>
                                                                  <select class="form-control" v-model="register.marital_status">
                                                                    <option  value="Married">Married</option>
                                                                    <option  value="Widow">Widow</option>
                                                                    <option  value="Single">Single</option>
                                                                    <option  value="Divorced">Seperated</option>
                                                                    <option  value="Divorced">Divorced</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-6">
                                                                <label>Facility for Accessing Health Care</label>
                                                                  <select class="form-control" v-model="register.provider_id">
                                                                    <option  :value="provider.id" v-for="provider in providers" v-bind:key="provider.id">{{provider.agency_name}}</option>
                                                                 </select>
                                                              </div>

                                                              <!-- <div class="form-group col-md-6">
                                                                <label>Alternate Health Facility</label>
                                                                  <select class="form-control" v-model="register.provider_id">
                                                                    <option  :value="provider.id" v-for="provider in providers" v-bind:key="provider.id">{{provider.agency_name}}</option>
                                                                 </select>
                                                              </div> -->

                                                              <!-- <div class="form-group col-md-6">
                                                                <label >Health Facility</label>
                                                                  <select class="form-control" v-model="register.provider_id">
                                                                    <option  value="Primary Health Care">Primary Health Care</option>
                                                                    <option  value="General Hospital">General Hospital</option>
                                                                    <option  value="Special Hospital">Special Hospital</option>
                                                                    <option  value="Federal Medical Centre">Federal Medical Centre</option>
                                                                    <option  value="Private Health Facility">Private Health Facility</option>
                                                                    <option  value="others">Others</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-6" v-if="register.point_of_care == 'others'">
                                                                <label >Point of HealthCare</label>
                                                                  <select class="form-control" v-model="register.point_of_care">
                                                                    <option  value="Diagnostic Centre">Diagnostic Centre</option>
                                                                    <option  value="Pharmacy">Pharmacy</option>
                                                                    <option  value="Medicine Store">Medicine Store</option>
                                                                 </select>
                                                              </div> -->
                                                              <div class="form-group col-md-4">
                                                                <label for="inputCity">Blood Group</label>
                                                                    <select class="form-control"  v-model="register.blood" >
                                                                     <option  value="A">A</option>
                                                                     <option  value="B">B</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="O">O</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-4">
                                                                <label for="inputCity">LGA</label>
                                                                  <select class="form-control"  v-model="register.localgovt">
                                                                    <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-4">
                                                                <label >Ward</label>
                                                                <input type="text" class="form-control" v-model="register.ward" placeholder="NIMC Number">
                                                              </div>

                                                              <!-- <div class="form-group col-md-12" >
                                                                  <label for="inputEmail4">Ward</label>
                                                                  <input type="text" class="form-control" v-model="register.ward" placeholder="Ward">
                                                              </div> -->



                                                          </div>


                                                          <!-- <div class="row"> -->

                                                            <!--
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">Genotype</label>
                                                                  <select class="form-control"  v-model="register.genotype" >
                                                                   <option  value="AA">AA</option>
                                                                   <option  value="AO">AO</option>
                                                                   <option  value="BB">BB</option>
                                                                   <option  value="BO">BO</option>
                                                                   <option  value="AB">AB</option>
                                                                   <option  value="OO">OO</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">Weight</label>
                                                                <input type="text" class="form-control" v-model="register.weight" placeholder="Weight in (Kg)" >
                                                            </div>
                                                          </div> -->

                                                          <!-- <div class="row">
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">State </label>

                                                              <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                               <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                                                           </select>
                                                            </div>

                                                          </div> -->

                                                          <div class="form-group">
                                                             <label for="inputAddress">Home Address</label>
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

                              <h1 class="h3 text-center">{{clients.meta.total}} Clients</h1>

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>SN</th> -->
                                         <th>Name</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <!-- <th>State</th> -->
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
                                         <!-- <td >{{index+1}} </td> -->
                                         <td >{{client.firstname}} {{client.lastname}}</td>
                                         <td>{{client.phone_number}}</td>
                                         <td>{{client.sector}}</td>
                                         <!-- <td>{{client.state}}/{{client.localgovt}}</td> -->
                                         <td>

                                           <router-link :to="{ path: '/client/'+ client.id}">
                                             <button type="button" name="button" class="btn btn-info">view</button>
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
      providers:"",
      sector:"",
      mdas:"",
      state:"",
      lga_states:"",
      current_page:"",
      register:{
        firstname:"",
        lastname:"",
        middlename:"",
        nimc_number:"",
        email:"",
        phone_number:"",
        type:"client",
        agency_id:"",
        state:"",
        localgovt:"",
        ward:"",
        address:"",
        blood:"",
        weight:"",
        gender:"",
        genotype:"",
        dob:"",
        salary_number:"",
        provider_id:"",
        point_of_care:"",
        sector:"",
        finger_print:"",
        place_of_work:"",
        grade_level:"",
        date_of_entry:"",
        marital_status:"",
        category_of_vulnerable_group:"",
            }
    }
  },
  beforeMount(){
    this.isLoading = true
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`,{
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
                    console.error(error);
                    this.isLoading = false

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
      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true
      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.institutional_id}`,{
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
    fetchLga(){
      this.axios.get(`/api/v1/auth/lga/2669`)
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
                    this.mdas = response.data.data
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
          agency_id: this.user.institutional_id,

          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          middlename: this.register.middlename,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          provider_id: this.register.provider_id,
          // state: 'this.state.name',
          state: '2669',
          role: 0,
          password: 'jacobi',
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          address1: this.register.address,
          genotype: this.register.genotype,
          weight: this.register.weight,
          gender: this.register.gender,
          sector: this.register.sector,
          place_of_work: this.register.place_of_work,
          point_of_care: this.register.point_of_care,
          finger_print: this.register.finger_print,
          salary_number: this.register.salary_number,
          grade_level: this.register.grade_level,
          date_of_entry: this.register.date_of_entry,
          marital_status: this.register.marital_status,
          category_of_vulnerable_group: this.register.category_of_vulnerable_group,
          enrolled_by: this.user.id,
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
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.institutional_id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    }

  },
  created(){
    this.fetchLga()
    this.getClients()
    this.getMDAs()
    this.getProviders()
  }

}
</script>
