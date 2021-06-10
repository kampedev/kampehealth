<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">

                       <h3 class="h4">{{providers.length}} Health Facilities </h3>

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
                                 <div class="row">
                                     <button class="btn btn-primary" @click="show = !show" style="margin-right:10px;">Add Facility</button>
                                     <button class="btn btn-info" @click="showsearch = !showsearch"
                                     >Search Facility</button>


                                 </div>


                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="showsearch">
                     <SearchProvider/>
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



                             <div class="form-group floating-label col-md-6">
                                 <textarea class="form-control" rows="8"  v-model="register.address1" placeholder="Address"></textarea>
                             </div>


                       </div>

                       <div class="row">

                         <div class="form-group col-md-6">
                           <label for="inputCity">LGA</label>
                               <select class="form-control"  v-model="register.localgovt" @change="fetchWards($event)">
                                    <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                </select>
                         </div>

                         <div class="form-group  col-md-6 col-sm-12">
                             <label>Ward</label>
                             <select class="form-control"  v-model="register.ward">
                                                                    <option v-for="ward in wards" v-bind:key="ward.id" :value="ward.id">{{ward.ward_name}}</option>
                                                                 </select>
                         </div>

                         <div class="form-group col-md-6 col-sm-12">
                             <label>Sector</label>
                             <select class="form-control"  v-model="sector" >
                                <option  value="formal">Formal Sector</option>
                                <option  value="informal">Informal Sector</option>
                            </select>
                         </div>

                          <div class="col-md-6 col-sm-12" v-if="sector == 'informal' " >
                                    <div class="form-group">
                                        <label for="inputCity">Select Informal Sector</label>
                                            <select class="form-control"  v-model="register.sector" >
                                            <option  value="Vulnerable Groups">Basic Healthcare Provision Fund</option>
                                            <option  value="Oganized Private Sector Plan">Oganized Private Sector Plan</option>
                                            <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                            <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6 col-sm-12" v-if="sector == 'formal' " >
                                    <div class="form-group">
                                        <label for="inputCity">Select Formal Sector</label>
                                            <select class="form-control"  v-model="register.sector" >
                                            <option  value="State Civil Servant Healthcare Plan">State Civil Servant Healthcare Plan</option>
                                            <option  value="LGA Civil Servant Healthcare Plan">LGA Civil Servant Healthcare Plan </option>
                                            <option  value="Universal Basic Education Board Healthcare Plan">Universal Basic Education Board Healthcare Plan</option>
                                            <option  value="State Pensioneers Healthcare Plan">State Pensioneers Healthcare Plan</option>
                                            <option  value="LGA Pensioneers Healthcare Plan">LGA Pensioneers Healthcare Plan</option>
                                            <option value="Tertiary Student Health Insurance Plan (T-SHIP)">Tertiary Student Health Insurance Plan (T-SHIP)</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label>
                                        Facility type
                                    </label>
                                    <select class="form-control" v-model="register.phc_general">
                                        <option>Public Hospital</option>
                                        <option>Private Hospital</option>
                                    </select>
                                </div>
                                <br />
                       </div>


                         <button @click="registerUser" class="btn btn-primary btn-block btn-lg" style="margin-top:20px;">Add Health Facility</button>

                       </div>
                     </div>

                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-activity"></i> Providers</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Name</th>
                                   <th>E mail</th>
                                   <th>Contact</th>
                                   <th>Status</th>
                                   <th>Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="provider in providers" v-bind:key="provider.id">

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
  import SearchProvider from '@/views/providers/SearchProvider.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, SearchProvider
  },
  data(){
    return{
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      show:false,
      showsearch:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      states:"",
      state:"",
      lga_states:"",
      sector:"",
      wards:[],
      json_fields: {
        'Facility Name': 'agency_name',
        'Contact First Name': "firstname",
        'Contact Last Name': "lastname",
        'Contact Number': 'phone_number',
        'Email': 'email',
        // ' Recipient Merchant': 'receiver.merchant_name',
        // 'Pay Point': 'point.pay_point_name',
        // 'Payment Date': 'created_at',
        // 'Note': 'notes',

      },
      json_meta: [
        [
            {
                'key': 'charset',
                'value': 'utf-8'
            }
        ]
    ],
      register:{
                firstname:"Nil",
                lastname:"Nil",
                facility_code:"",
                email:"",
                type:"provider",
                phone_number:"No Number Provided",
                state:"",
                agency_name:"",
                ward:"",
                services_offered:"",
                localgovt:"",
                sector:"",
                address1:"",
                role:0,
                phc_general:"",
                password:"euhler",
                password_confirmation:"euhler"
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/providerAgency/95930`)
                .then(response => {
                    this.providers = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    fetchLga(){
      this.axios.get(`/api/v1/auth/lga/2676`)
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
          facility_code : this.register.facility_code,
          email : this.register.email,
          phone_number : this.register.phone_number,
          agency_name : this.register.agency_name,
          type : this.register.type,
          state : '2676',
          localgovt : this.register.localgovt,
          services_offered : this.register.services_offered,
          address1 : this.register.address1,
          ward : this.register.ward,
          enrolled_by : this.user.id,
          role : this.register.role,
          password : this.register.password,
          password_confirmation : this.register.password_confirmation,
          phc_sector:this.sector,
          phc_type:this.register.sector,
          phc_general:this.register.phc_general

        })
        .then(response=>{
          let user_id = response.data.data.id

            //add provider
              this.show = false;
            //   console.log(user_id)
              this.axios.post('/api/v1/auth/providerApply',{
                    provider_id: user_id,
                    agency_id: 95930,
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
      this.axios.get(`/api/v1/auth/providerAgency/95930`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchWards(){
      this.axios.get(`/api/v1/auth/getwards/` + event.target.value)
                  .then(response => {
                      this.wards = response.data.data
                      console.log(response.data.data)
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
    this.fetchLga()
  }

}
</script>
