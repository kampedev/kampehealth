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
                       <strong> {{providers.length}} Providers</strong>

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

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="show = !show">Add Provider</button>
                                                         </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                         <div class="form-row">
                           <div class="form-group floating-label col-md-6 col-sm-12">
                               <label>First Name</label>
                               <input type="text" required class="form-control" placeholder="First Name" v-model="register.firstname">
                           </div>
                           <div class="form-group floating-label col-md-6 col-sm-12">
                               <label>Last Name</label>
                               <input type="text" required class="form-control" placeholder="Last Name" v-model="register.lastname">
                           </div>
                           <div class="form-group floating-label col-md-6">
                               <label>Agency Name</label>
                               <input type="text" required class="form-control" placeholder="Agency Name" v-model="register.agency_name">
                           </div>

                             <div class="form-group floating-label col-md-6">
                                 <label>Email</label>
                                 <input type="email" required class="form-control" placeholder="Email" v-model="register.email">
                             </div>
                             <div class="form-group floating-label col-md-6">
                                 <label>Phone Number</label>
                                 <input type="text" required class="form-control" placeholder="Phone Number" v-model="register.phone_number">
                             </div>

                             <div class="form-group floating-label col-md-10">
                                 <label>Services Offered</label>
                                 <textarea class="form-control" rows="8"  v-model="register.services_offered" placeholder="Services Offered"></textarea>
                             </div>

                             <div class="form-group floating-label col-md-10">
                                 <label>Address</label>
                                 <textarea class="form-control" rows="8"  v-model="register.address1" placeholder="Address"></textarea>
                             </div>


                       </div>

                       <div class="row">
                         <div class="form-group col-md-6">
                           <label for="inputCity">States </label>

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

                         <div class="form-group floating-label col-md-6 col-sm-12">
                             <label>Ward</label>
                             <input type="text" required class="form-control" placeholder="Ward" v-model="register.ward">
                         </div>

                       </div>

                         <!-- <p class="">
                             <label class="cstm-switch">
                                 <input type="checkbox" checked name="option" value="1" class="cstm-switch-input">
                                 <span class="cstm-switch-indicator "></span>
                                 <span class="cstm-switch-description">  I agree to the Terms and Privacy. </span>
                             </label>


                         </p> -->

                         <button @click="registerUser" class="btn btn-primary btn-block btn-lg">Add Health Provider</button>

                       </div>
                     </div>

                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Providers</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <!-- <th>Avatar</th> -->
                                   <th>Name</th>
                                   <th>E mail</th>
                                   <th>Contact</th>
                                   <th>Status</th>
                                   <th>Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="provider in providers" v-bind:key="provider.id">
                                   <!-- <td>
                                       <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                           class="avatar-img avatar-sm rounded-circle"
                                                                           alt=""></div>
                                   </td> -->
                                   <td>
                                     <router-link :to="{ path: '/provider-' + provider.id }">
                                     {{provider.agency_name}}
                                   </router-link>

                                   </td>
                                   <td>{{provider.email}}</td>
                                   <td>{{provider.phone_number}}</td>
                                   <td>
                                     <span v-if="provider.status == 1">
                                       <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                       </span>
                                      <span v-if="provider.status == 0">
                                      <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                   </span>

                                   </td>
                                   <td>
                                     <router-link :to="{ path: '/provider-'+ provider.id}">
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
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      states:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                type:"provider",
                phone_number:"",
                state:"",
                agency_name:"",
                ward:"",
                services_offered:"",
                localgovt:"",
                address1:"",
                role:0,
                password:"euhler",
                password_confirmation:"euhler"
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                .then(response => {
                    this.providers = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

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
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          firstname : this.register.firstname,
          lastname : this.register.lastname,
          email : this.register.email,
          phone_number : this.register.phone_number,
          agency_name : this.register.agency_name,
          type : this.register.type,
          state : this.state.name,
          localgovt : this.register.localgovt,
          services_offered : this.register.services_offered,
          address1 : this.register.address1,
          role : this.register.role,
          password : this.register.password,
          password_confirmation : this.register.password_confirmation
        })
        .then(response=>{
          let user_id = response.data.data.id

            //add provider
              this.show = false;
              console.log(user_id)
              this.axios.post('/api/v1/auth/providerApply',{
                    provider_id: user_id,
                    agency_id: this.user.id,
                    status: true,
                  })

                  .then(response=>{
                      console.log(response);
                      this.$toasted.info('Provider added Successfully!', {position: 'top-left', duration:5000 })
                      this.$router.push(`/provider-${user_id}`)

                  })
                  .catch(error=>{
                      console.log(error.response)
                  })
                  //end of provider

            console.log(response);
            this.isLoading = false;
            // localStorage.setItem('jwt',token);

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Sign up not Successful', {position: 'top-left', duration:5000 })

        })
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.getStates()
  }

}
</script>
