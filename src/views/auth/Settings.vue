<template>
  <div class="">
    <Navbar/>
    <section class="admin-content ">
       <div class="bg-dark bg-dots m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-lg-8 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar avatar-lg ">
                               <div class="avatar-title bg-info rounded-circle mdi mdi-settings "></div>
                           </div>
                       </div>
                       <h3>User Settings </h3>
                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">
               <div class="row ">
                   <div class="col-lg-8 mx-auto  mt-2">
                      <div class="card py-3 m-b-30">
                          <div class="card-body">

                                  <h3 class="">Personal Data</h3>
                                  <p class="text-muted">
                                      Use this page to update your contact information and change your password.
                                  </p>
                                  <div class="">
                                      <label class="avatar-input">
                                   <span class="avatar avatar-xl">
                                       <img src="assets/img/users/user-6.jpg" alt="..."
                                            class="avatar-img rounded-circle">
                                        <span class="avatar-input-icon rounded-circle">
                                       <i class="mdi mdi-upload mdi-24px"></i>
                                   </span>
                                   </span>
                                          <input type="file" name="avatar" class="avatar-file-picker" >

                                      </label>

                                  </div>
                                  <p>
                                    <vue-initials-img :name="auth_user.firstname+' '+auth_user.lastname" class="text-center rounded-circle" />
                                  </p>

                                  <div class="form-row">
                                      <div class="form-group col-md-6">
                                          <label for="inputEmail6">First Name</label>
                                          <input type="text" v-model="auth_user.firstname" class="form-control"  placeholder="First Name">
                                      </div>
                                      <div class="form-group col-md-6">
                                          <label for="inputEmail6">Last Name</label>
                                          <input type="text" v-model="auth_user.lastname" class="form-control"  placeholder="Last Name">
                                      </div>
                                      <div class="form-group col-md-6">
                                          <label for="inputEmail4">Email</label>
                                          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="auth_user.email" disabled>
                                      </div>
                                      <div class="form-group col-md-6">
                                          <label for="asd">Phone Number</label>
                                          <input type="text" class="form-control"  placeholder="Phone Number" v-model="auth_user.phone_number">
                                      </div>
                                      <!-- <div class="form-group col-md-6">
                                          <label for="asd">Username</label>
                                          <input type="text" class="form-control" id="asd" placeholder="username" v-model="auth_user.username">
                                      </div> -->
                                      <div class="form-group col-md-12" v-if="auth_user.type != 'client' ">
                                          <label for="asd">Company Name</label>
                                          <input type="text" class="form-control" id="asd" placeholder="Company Name" v-model="auth_user.agency_name">
                                      </div>

                                  </div>
                                  <div class="form-row">

                                  </div>
                                  <div class="form-group"  v-if="auth_user.type == 'client' ">
                                      <label for="inputAddress">Address</label>
                                      <input type="text" class="form-control"  v-model="auth_user.address1" placeholder="Address">
                                  </div>
                                  <div class="form-group" v-if="auth_user.type != 'client' ">
                                      <label for="inputAddress2">Office Address</label>
                                      <input type="text" class="form-control"  placeholder="Office Address"  v-model="auth_user.agencyAddress">
                                  </div>
                                  <div class="form-group" v-if="auth_user.type != 'client' ">
                                      <label for="inputAddress2">Office Website</label>
                                      <input type="text" class="form-control"  placeholder="http://example.com or https://example.com"  v-model="auth_user.agencyWebsite">
                                  </div>
                                  <!-- <div class="form-group col-md-6">
                                      <label for="inputPassword4">Password</label>
                                      <input type="password" class="form-control"  placeholder="Password"  v-model="auth_user.password">
                                  </div> -->


                                  <button type="submit" class="btn btn-success btn-cta" @click="editUser">Save changes</button>

                          </div>
                      </div>
                       <div class="card  py-3 m-b-30">
                           <div class="card-body">
                               <h1>CAC Certificate</h1>

                               <button type="submit" class="btn btn-info btn-cta">View</button>
                               <button type="submit" class="btn btn-danger btn-cta">Delete</button>

                           </div>
                       </div>

                       <div class="card  py-3 m-b-30">
                           <div class="card-body">
                               <h3 class="">Plans</h3>
                               <p class="text-muted">
                                   Changes in plans will reflect on 15<sup>th</sup> of every month
                               </p>


                               <div class="p-t-30">
                                   <button type="submit" class="btn btn-success btn-cta">Save changes</button>
                               </div>
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
   </section>
  </div>
</template>
<script>
 // @ is an alias to /src
// import Settings from '@/components/Settings.vue'
import Navbar from '@/views/Navbar.vue'
   import Loading from 'vue-loading-overlay';
export default {
  // name: 'Home',
  components: {
   Navbar, Loading
 },
 data(){
   return{
     auth_user:"",
     user:null,
     isLoading: false,
     fullPage: true,
   }
 },
 beforeMount(){
   this.axios.get(`/api/v1/auth/user`)
               .then(response => {
                   this.auth_user = response.data.data
                   console.log(response)
               })
               .catch(error => {
                   console.error(error);
               })
 },
 methods:{

   editUser(){
     this.user = JSON.parse(localStorage.getItem('user'))
     this.isLoading = true;
   this.axios.post(`/api/v1/auth/editProfile/${this.user.id}`,{
       firstname: this.auth_user.firstname,
       lastname: this.auth_user.lastname,
       email: this.auth_user.email,
       type: this.auth_user.type,
       user_image: this.auth_user.user_image,
       // username: this.auth_user.username,
       password: this.auth_user.password,
       phone_number: this.auth_user.phone_number,
       agency_name: this.auth_user.agency_name,
       address1: this.auth_user.address1,
       agencyAddress: this.auth_user.agencyAddress,
       agencyWebsite: this.auth_user.agencyWebsite
     })
   .then(response=>{
       console.log(response);
       this.$breadstick.notify("User updated Successfully!", {position: "top-right"});
       this.isLoading = false;

   })
   .catch(error=>{
       console.log(error.response)
   })
 },
 },
 created(){

 }
}
</script>
