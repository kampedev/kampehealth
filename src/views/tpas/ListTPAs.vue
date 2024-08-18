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
                       <strong> {{tpas.length}} TPAs</strong>

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
                               <div class="form-group">
                                   <button class="btn btn-primary" @click="show = !show">Add TPA</button>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                         <div class="form-row">
                           <div class="col-md-12">
                               <div class="form-group">
                                 <label for="inputCity">Category</label>
                                     <select class="form-control"  v-model="category" >
                                      <option  value="A">Category A</option>
                                      <option  value="B">Category B</option>
                                  </select>
                               </div>
                           </div>

                           <div class="form-group floating-label col-md-4">
                               <label>First Name</label>
                               <input type="text" required class="form-control" placeholder="TPA ID" v-model="register.tpa_id">
                           </div>
                           <div class="form-group floating-label col-md-4">
                               <label>First Name</label>
                               <input type="text" required class="form-control" placeholder="First Name" v-model="register.firstname">
                           </div>
                           <div class="form-group floating-label col-md-4">
                               <label>Last Name</label>
                               <input type="text" required class="form-control" placeholder="Last Name" v-model="register.lastname">
                           </div>

                           <div class="form-group floating-label col-md-6">
                               <label>Organization Name</label>
                               <input type="text" required class="form-control" placeholder="Organization Name" v-model="register.organization_name">
                           </div>

                             <div class="form-group floating-label col-md-6">
                                 <label>Phone Number</label>
                                 <input type="text" required class="form-control" placeholder="Phone Number" v-model="register.phone_number">
                             </div>
                             <div class="form-group floating-label col-md-4">
                                 <label>Email</label>
                                 <input type="email" required class="form-control" placeholder="Email" v-model="register.email">
                             </div>
                             <div class="form-group floating-label col-md-4">
                                 <label>Password</label>
                                 <input type="password" required class="form-control" placeholder="Password" v-model="register.password">
                             </div>

                             <div class="form-group floating-label col-md-4">
                                 <label>Confirm Password</label>
                                 <input type="password" required class="form-control" placeholder="Password" v-model="register.password_confirmation">
                             </div>

                             <!-- <div class="form-group floating-label col-md-6">
                                 <textarea class="form-control" rows="8"  v-model="register.address1" placeholder="Address"></textarea>
                             </div> -->

                       </div>



                         <button @click="registerUser" class="btn btn-primary btn-block btn-lg">Add TPA</button>

                       </div>
                     </div>

                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i>{{tpas.length}} Registered TPAs</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                 <th>Serial Number</th>
                                 <th>Category</th>
                                   <th>Name of TPA</th>
                                   <th>E mail</th>
                                   <th>Phone Number</th>
                                   <!-- <th>Beneficiaries Enrolled</th> -->
                                   <th>Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="(tpa, index) in tpas" v-bind:key="tpa.id">

                                 <td> {{index+1}}</td>
                                 <td> {{tpa.category}}</td>
                                   <td>
                                       {{tpa.organization_name}}
                                   </td>
                                   <td>{{tpa.email}}</td>
                                   <td>{{tpa.phone_number}}</td>


                                   <td>
                                     <router-link :to="{ path: '/tpa/'+ tpa.id}">
                                     <!-- <router-link :to="{ path: '#'}"> -->
                                       <button type="button" name="button" class="btn btn-info"><i class="fe fe-eye"></i></button>
                                     </router-link>

                                       <!-- <button type="button" @click="editTPA(tpa)" class="btn btn-default"><i class="fe fe-edit"></i></button> -->
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
      providers:"",
      agencies:"",
      category:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      tpas:"",
      register:{
                email:"",
                phone_number:"",
                state:"",
                agency_name:"",
                ward:"",
                services_offered:"",
                localgovt:"",
                address1:"",
                tpa_id:"",
                role:0,
                password:"",
                password_confirmation:""
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/org_agency/439078`)
                .then(response => {
                    this.tpas = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    registerUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{

          email : this.register.email,
          phone_number : this.register.phone_number,
          agency_name : this.register.agency_name,
          firstname : this.register.firstname,
          lastname : this.register.lastname,
          state : '2676',
          localgovt : '631',
          type : 'tpa',
          password : this.register.password,
          password_confirmation : this.register.password_confirmation,
          enrolled_by : 0,
        })
        .then(response=>{
          let tpa_user_id = response.data.data.id

            // add Organization
              this.show = false;
              console.log(response)
              this.axios.post('/api/v1/auth/orgenrollment',{
                user_id : tpa_user_id,
                email : this.register.email,
                phone_number : this.register.phone_number,
                organization_name : this.register.organization_name,
                agency_id : this.user.id,
                category : this.category,
                tpa_id : this.register.tpa_id,
                  })

                  .then(response=>{
                      console.log(response);
                      this.getTPAs()
                      this.clearIt()
                      this.$toasted.info('Organization added Successfully!', {position: 'top-left', duration:5000 })

                  })
                  .catch(error=>{
                      console.log(error.response)
                  })
                  // end of provider

            console.log(response);
            this.isLoading = false;
            this.getTPAs()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Sign up not Successful', {position: 'top-left', duration:5000 })

        })
    },
    editTPA(tpa){
      this.show = true;
      this.register.organization_name = tpa.organization_name;
      this.register.phone_number = tpa.phone_number;
      this.register.email = tpa.email;
      this.register.user_id = tpa.user_id;

    },
    getTPAs(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/org_agency/439078`)
                  .then(response => {
                      this.tpas = response.data.data
                      console.log(response)
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
      this.register.organization_name = "";
    },

  },
  created(){
    this.getTPAs()
  }

}
</script>
