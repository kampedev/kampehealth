<template >
  <body class="jumbo-page">
<main class="admin-main">
    <div class="container-fluid">
        <div class="row ">
            <div class="col-lg-4  bg-white">
                <div class="row align-items-center m-h-100">
                    <div class="mx-auto col-md-8">
                        <div class="p-b-20 text-center">
                            <p>
                                <img src="assets/img/logo.svg" width="80" alt="">

                            </p>
                            <p class="admin-brand-content">
                                HIP
                            </p>
                        </div>
                        <h3 class="text-center p-b-20 fw-400">Login</h3>

                            <div class="form-row">
                                <div class="form-group floating-label col-md-12">
                                    <label>Email</label>
                                    <input type="email" required class="form-control" v-model="email">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Password</label>
                                    <input type="password" required class="form-control "  v-model="password">
                                </div>
                            </div>

                            <div class="form-group">
                              <div class="form-check">
                                  <input class="form-check-input" type="checkbox" id="gridCheck">
                                  <label class="form-check-label" for="gridCheck">
                                      Remember Me
                                  </label>
                              </div>
                          </div>

                            <button type="submit" class="btn btn-primary btn-block btn-lg" @click="logIn">Login</button>
                        <p class="text-right p-t-10">
                            <a href="#!" class="text-underline">Forgot Password?</a>
                        </p>

                        <p class="text-right p-t-10">
                            <a href="/select-type" class=" btn btn-link">or Sign up</a>
                        </p>
                    </div>

                </div>
            </div>
            <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/login.svg');">

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
      email:"",
      password:"",
      isLoading: false,
      fullPage: true,
      auth_user:""

    }
  },
  beforeMount(){

  },
  methods:{

    getUser(){
      this.axios.get(`/api/v1/auth/user`)
                  .then(response => {
                      this.auth_user = response.data.data
                      console.log(response)
                       localStorage.setItem('user',JSON.stringify(response.data.data))
                       // let type = response.data.data.type

                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    logIn(){
            this.isLoading = true;
            this.axios.post('/api/v1/auth/login',{email:this.email,password:this.password})
            .then(response=>{
              console.log(response)
                let token= response.data.token;

                // let admin = response.data.user.is_admin
                // this.isLoading = false;
                // this.$toasted.global.login().goAway(1500);

                if(token){
                   localStorage.setItem('jwt',token);
                   this.$breadstick.notify("🥞 Welcome to HIP!", {position: "top-right"});
                   if (localStorage.getItem('jwt') != null){

                                 this.$router.push('/pusher')

                           }



                           }
                })
                .catch(error=>{
                    console.log(error.response)
                    this.isLoading = false;
                    // this.$toasted.global.errorLogin().goAway(3000);
                })
              }
  },
  created(){

  }

}
</script>
