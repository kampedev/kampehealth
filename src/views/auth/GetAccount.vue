<template >
  <body class="jumbo-page">
<main class="admin-main">
    <div class="container-fluid">
        <div class="row">

            <div class="container spacer-top">

            <div class="card col-lg-6 offset-lg-3" v-show=searchuser>
                <div class="row align-items-center m-h-70">

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <p class="admin-brand-content">
                                Find Account
                            </p>
                        </div>

                            <div class="form-row">
                                <div class="form-group floating-label col-md-12">
                                    <label>Phone Number</label>
                                    <input type="text" required class="form-control" v-model="phone_number" placeholder="Phone Number">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Computer Number</label>
                                    <input type="text" required class="form-control "  v-model="salary_number" placeholder="Computer Number">
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block btn-lg" @click="searchSalary">Submit</button>
                    </div>

                </div>
            </div>
            <!-- Update Email Address -->
            <div class="card col-lg-8 offset-lg-2" v-show="updateemail">
                <div class="row align-items-center m-h-70">

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <p class="admin-brand-content">
                                Update Email
                            </p>
                        </div>

                            <div class="form-row">
                                <div class="form-group floating-label col-md-6">
                                    <label>First Name</label>
                                    <input type="text" required class="form-control" v-model="search_result.firstname" placeholder="First Name" disabled>
                                </div>
                                <div class="form-group floating-label col-md-6">
                                    <label>Last Name</label>
                                    <input type="text" required class="form-control "  v-model="search_result.lastname" placeholder="Last Name" disabled>
                                </div>
                                <div class="form-group floating-label col-md-6">
                                    <label>Phone Number</label>
                                    <input type="text" required class="form-control "  v-model="search_result.phone_number" placeholder="Phone Number" disabled>
                                </div>
                                <div class="form-group floating-label col-md-6">
                                    <label>MDA</label>
                                    <input type="text" required class="form-control "  v-model="search_result.place_of_work" placeholder="Place of Work" disabled>
                                </div>
                            </div>
                    </div>

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <p class="admin-brand-content">
                                Update Email Address
                            </p>
                        </div>

                            <div class="form-row">
                                <div class="form-group floating-label col-md-12">
                                    <label>E-mail</label>
                                    <input type="text" required class="form-control" v-model="email" placeholder="Email">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Confirm E-mail</label>
                                    <input type="text" required class="form-control "  v-model="confirm_email" placeholder="Confirm Email">
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block btn-lg" @click="updateEmail">Submit</button>
                    </div>

                </div>
            </div>


            <!-- Update Password -->
            <div class="card col-lg-8 offset-lg-2" v-show="updatepassword">
                <div class="row align-items-center m-h-70">

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <p class="admin-brand-content">
                                Update Password
                            </p>
                        </div>


                    </div>

                    <div class="mx-auto col-md-8">

                            <div class="form-row">
                                <div class="form-group floating-label col-md-12">
                                    <label>Password</label>
                                    <input type="password" required class="form-control" v-model="password" placeholder="Password">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Confirm Password</label>
                                    <input type="password" required class="form-control "  v-model="password_confirmation" placeholder="Confirm Password">
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block btn-lg" @click="updatePassword">Submit</button>
                    </div>

                </div>
            </div>

            </div>

        </div>
    </div>
</main>


<div class="vld-parent">
     <loading :active.sync="isLoading"
     loader="dots"
     :can-cancel="true"
     :is-full-page="fullPage"></loading>
 </div>

  </body>
</template>

<script>
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
    Loading
  },
  data(){
    return{
      salary_number:"",
      phone_number:"",
      email:"",
      confirm_email:"",
      password:"",
      password_confirmation:"",
      search_result:{},
      isLoading: false,
      fullPage: true,
      searchuser: true,
      updateemail: false,
      updatepassword: false,
      user:null,

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods:{

    searchSalary(){

      this.isLoading = true
      this.axios.post(`/api/v1/getaccount`,{
            agency_id: 4,
            salary_number: this.salary_number,
            phone_number: this.phone_number
      })
                  .then(response => {
                      this.search_result = response.data
                      console.log(this.search_result)
                      this.$toasted.info('Searched Successfully', {position: 'top-center', duration:3000 })
                      this.isLoading = false
                      this.searchuser = false
                      this.updateemail = true

                  })
                  .catch(error => {
                      console.error(error);
                      this.$toasted.info('Your computer number or phone number does not match any of our record!', {position: 'top-center', duration:3000 })

                      this.loading = false
                  })
    },

    updateEmail(){
      if (this.email != this.confirm_email) {
        this.$toasted.info('Email Address does not match!', {position: 'top-center', duration:3000 })

      }
      else {
        this.isLoading = true
        this.axios.post(`/api/v1/update-email/verify`,{
              id: this.search_result.id,
              email: this.email,
        })
                    .then(response => {
                        console.log(response)
                        this.$toasted.info('Email updated Successfully', {position: 'top-center', duration:3000 })
                        this.isLoading = false
                        this.searchuser = false
                        this.updateemail = false
                        this.updatepassword = true

                    })
                    .catch(error => {
                        console.error(error);
                        this.isLoading = false
                        this.$toasted.info('Error updating email address!', {position: 'top-center', duration:3000 })
                    })
      }
    },
    updatePassword(){
      if (this.password != this.password_confirmation) {
        this.$toasted.info('Password does not match!', {position: 'top-center', duration:3000 })

      }
      else {
        this.isLoading = true
        this.axios.post(`/api/v1/update-password/verify`,{
              id: this.search_result.id,
              password: this.password,
        })
                    .then(response => {
                        console.log(response)
                        this.$toasted.info('Password updated Successfully', {position: 'top-center', duration:3000 })
                        this.isLoading = false
                        // this.searchuser = false
                        // this.updateemail = false
                        // this.updatepassword = true

                        this.$router.push(`/`)
                    })
                    .catch(error => {
                        console.error(error);
                        this.$toasted.info('Error updating password!', {position: 'top-center', duration:3000 })

                        this.isLoading = false
                    })
      }
    }



  },
  created(){
      //
  }

}
</script>
<style scoped>
  .spacer-top{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
