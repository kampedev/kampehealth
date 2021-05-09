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
                       <h3> </h3>
                       <strong> {{officers.meta.total}} Enrollment Officers</strong>

                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Providers" type="search"
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

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">

                           </div>

                           <div class="card-body">
                                    <div class="form-group">
                                        <button class="btn btn-primary" @click="show = !show">Add Officer</button>
                                    </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-12 col-md-8">
                     <download-excel :data="json_data" :fields="json_fields" class="btn btn-success"
                                    :escapeCsv=false>
                                  <span class="fe fe-download"></span>
                            Download Officer Data
                            </download-excel>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                         <div class="form-row">

                           <div class="form-group floating-label col-md-6">
                               <label>First Name</label>
                               <input type="text" required class="form-control" placeholder="First Name" v-model="register.firstname">
                           </div>
                           <div class="form-group floating-label col-md-6">
                               <label>Last Name</label>
                               <input type="text" required class="form-control" placeholder="Last Name" v-model="register.lastname">
                           </div>

                             <div class="form-group floating-label col-md-6">
                                 <label>Phone Number</label>
                                 <input type="text" required class="form-control" placeholder="Phone Number" v-model="register.phone_number">
                             </div>
                             <div class="form-group floating-label col-md-6">
                                 <label>Email</label>
                                 <input type="email" required class="form-control" placeholder="Email" v-model="register.email">
                             </div>
                             <div class="form-group floating-label col-md-6">
                                 <label>Password</label>
                                 <input type="password" required class="form-control" placeholder="Password" v-model="register.password">
                             </div>
                             <div class="form-group floating-label col-md-6">
                                 <label>Confirm Password</label>
                                 <input type="password" required class="form-control" placeholder="Confirm Password" v-model="register.password_confirmation">
                             </div>

                             <!-- <div class="form-group floating-label col-md-6">
                                 <textarea class="form-control" rows="8"  v-model="register.address1" placeholder="Address"></textarea>
                             </div> -->

                       </div>

                         <button @click="registerUser" class="btn btn-primary btn-block btn-lg">Add Officer</button>

                       </div>
                     </div>

                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-users"></i>{{officers.meta.total}} Officers</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <!-- <th>Avatar</th> -->
                                   <th>Name</th>
                                   <th>E mail</th>
                                   <th>Contact</th>
                                   <th>Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="tpa in officers.data" v-bind:key="tpa.id">

                                     <td> {{tpa.firstname}} {{tpa.lastname}} </td>

                                   <td>{{tpa.email}}</td>
                                   <td>{{tpa.phone_number}}</td>

                                   <td>
                                     <!-- <router-link :to="{ path: '/provider-'+ provider.id}"> -->
                                       <button type="button" name="button" class="btn btn-info">view</button>
                                      <!-- </router-link> -->
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
      user:null,
      orgDetails:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      officers:"",
      current_page:1,
      register:{

                email:"",
                firstname:"",
                lastname:"",
                phone_number:"",
                state:"",
                agency_name:"",
                ward:"",
                services_offered:"",
                localgovt:"",
                address1:"",
                role:0,
                password:"",
                password_confirmation:""
            },
       json_fields: {
                'Firstname':'firstname',
                'Lastname':'lastname',
                'Email	': 'email',
                'Phone Number':'phone_number'},
                json_data: [],
                json_meta: [
                [
                    {
                    key: "charset",
                    value: "utf-8",
                    },
                ]],
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/orgenrollment`)
                .then(response => {
                    this.tpas = response.data.data
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    gotoNext(){
      if (this.officers.meta.current_page != this.officers.meta.last_page) {
            this.current_page ++
            this.getOrgDetails()
          }
          else {
            this.$toasted.info('You have reached the Last Page', {position: 'top-center', duration:3000 })

          }
    },
    gotoPrevious(){
      if (this.officers.meta.current_page != 1) {
          this.current_page --
          this.getOrgDetails()
        }
        else {
          this.$toasted.info('You have reached the First Page', {position: 'top-center', duration:3000 })
        }
    },
    registerUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          email : this.register.email,
          phone_number : this.register.phone_number,
          agency_name : this.register.agency_name,
          firstname : this.register.firstname,
          lastname : this.register.lastname,
          state : '2683',
          localgovt : '767',
          type : 'tpa_employee',
          password : this.register.password,
          password_confirmation : this.register.password_confirmation,
          enrolled_by : 0,
        })
        .then(response=>{
          let agent_id = response.data.data.id

            // add Organization
              this.show = false;
              // console.log(response)
              this.axios.post('/api/v1/auth/enrollment_user',{
                orgenrol_id : this.orgDetails.id,
                user_id : agent_id,

                  })

                  .then(response=>{
                      console.log(response);
                      this.getEmployees()
                      this.clearIt()
                      this.$toasted.info('Agent added Successfully!', {position: 'top-left', duration:5000 })

                  })
                  .catch(error=>{
                      console.log(error.response)
                      this.$toasted.error('Oops!', {position: 'top-left', duration:5000 })

                  })
                  // end of provider

            // console.log(response);
            this.isLoading = false;
            // localStorage.setItem('jwt',token);
            this.getEmployees()

        })
        .catch(()=>{
            // console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Sign up not Successful', {position: 'top-left', duration:5000 })

        })
    },
    getOrgDetails(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
                  .then(response => {
                      this.orgDetails = response.data
                      let org_id = response.data.id

                      // get officers
                      this.axios.get(`/api/v1/auth/enrollment_user/${org_id}`,{
                      params:{
                        page: this.current_page
                      }
                    })
                        .then(response => {
                            this.officers = response.data
                            this.getTotalEmployees();
                            // console.log(response)
                        })
                        .catch(() => {
                            // console.error(error);
                        })
                      //end of get officers

                      // console.log(response)
                  })
                  .catch(() => {
                      // console.error(error);
                  })
    },
    getEmployees(){
      this.axios.get(`/api/v1/auth/enrollment_user/${this.orgDetails.id}`)
        .then(response => {
            this.officers = response.data
            // console.log(response)
            
        })
        .catch(error => {
            console.error(error);
        })
    },
    getTotalEmployees(){
      console.log(this.officers.meta.total);
      console.log("this button is working");
      this.axios.get(`/api/v1/auth/enrollment_userall/${this.orgDetails.id}`)
        .then(response => {
            // this.officers = response.data
            this.json_data = response.data.data;
            console.log(this.json_data);
            // console.log(response)
        })
        .catch(error => {
            console.error(error);
        })
    },

    clearIt(){
      this.register.firstname = "";
      this.register.lastname = "";
      this.register.email = "";
      this.register.phone_number = "";
      this.register.password = "";
      this.register.password_confirmation = "";
    },

  },
  created(){
    this.getOrgDetails()
  }

}
</script>
