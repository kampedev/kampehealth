<template>
  <body class=jumbo-page>

<main class="admin-main  ">
    <div class="container-fluid">
        <div class="row ">
            <div class="col-lg-4  bg-white">
                <div class="row align-items-center m-h-100">
                    <div class="mx-auto col-md-8">
                        <!-- <form class="needs-validation" action="#"> -->
                            <div class="p-b-20 text-center">
                                <p>
                                    <img src="assets/img/logo.svg" width="80" alt="">

                                </p>
                                <p class="admin-brand-content">
                                    HIP
                                </p>
                            </div>
                            <h3 class="text-center p-b-20 fw-400">Register as a HMO</h3>

                            <div class="form-row">
                              <div class="form-group floating-label col-md-6 col-sm-12">
                                  <label>First Name</label>
                                  <input type="text" required class="form-control" placeholder="First Name" v-model="register.firstname">
                              </div>
                              <div class="form-group floating-label col-md-6 col-sm-12">
                                  <label>Last Name</label>
                                  <input type="text" required class="form-control" placeholder="Last Name" v-model="register.lastname">
                              </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Email</label>
                                    <input type="email" required class="form-control" placeholder="Email" v-model="register.email">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Phone Number</label>
                                    <input type="text" required class="form-control" placeholder="Phone Number" v-model="register.phone_number">
                                </div>
                                <div class="form-group floating-label col-md-6 col-sm-12">
                                    <label>Password</label>
                                    <input type="password" required class="form-control " id="password"
                                       placeholder="Password" v-model="register.password">
                                </div>
                            <div class="form-group floating-label col-md-6 col-sm-12">
                                <label>Password Again</label>
                                <input type="password" class="form-control" required id="confirm_password"
                                       placeholder="Password Again" v-model="register.password_confirmation">
                            </div>
                          </div>

                          <!-- <div class="row">
                            <div class="form-group col-md-6">
                              <label for="inputCity">States</label>

                                  <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                   <option v-for="state in states" v-bind:key="state.id" :value="state.name">{{state.name}}</option>
                               </select>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputCity">LGA</label>

                                  <select class="form-control"  v-model="register.localgovt">
                                   <option v-for="lga in lga_states.lgas" v-bind:key="lga" :value="lga">{{lga}}</option>
                               </select>
                            </div>
                          </div> -->

                            <!-- <p class="">
                                <label class="cstm-switch">
                                    <input type="checkbox" checked name="option" value="1" class="cstm-switch-input">
                                    <span class="cstm-switch-indicator "></span>
                                    <span class="cstm-switch-description">  I agree to the Terms and Privacy. </span>
                                </label>


                            </p> -->

                            <button @click="registerUser" class="btn btn-primary btn-block btn-lg">Create Account</button>

                        <!-- </form> -->

                        <p class="text-right p-t-10">
                          <router-link :to="{ path: '/login' }">
                            <span class="text-underline">Already a user?</span>
                          </router-link>
                        </p>
                    </div>

                </div>
            </div>
            <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/auth.svg');">

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
  name: 'Home',
  components: {
    Loading
  },
  data(){
  return{
    isLoading: false,
    fullPage: true,
    states:"",
    state:"",
    lga_states:"",
    register:{
              firstname:"",
              lastname:"",
              email:"",
              type:"hmo",
              phone_number:"",
              username:"testuser",
              state:"",
              localgovt:"",
              role:0,
              password:"",
              password_confirmation:""
          }
  }
  },
  beforeMount(){

  },
  methods:{

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
        this.isLoading = true;
        this.axios.post('/api/v1/auth/register',this.register)
        .then(response=>{
          localStorage.setItem('user',JSON.stringify(this.register))
          localStorage.setItem('jwt',response.data.access_token)
          if (localStorage.getItem('jwt') != null){
                        this.$emit('loggedIn')
                        if(this.$route.params.nextUrl != null){
                            this.$router.push(this.$route.params.nextUrl)
                        }
                        else{
                            this.$router.push('/login')
                        }
                    }
            console.log(response);
            this.$router.push('/login');
            this.isLoading = false;
            // localStorage.setItem('jwt',token);
            this.$breadstick.notify("🥞 Welcome to Hip", {position: "top-right"});

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
