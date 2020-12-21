<template >
  <body class="jumbo-page">
<main class="admin-main">
    <div class="container-fluid">
        <div class="row">

            <div class="container spacer-top">
            <div class="card col-md-6 offset-md-3">
                <div class="row align-items-center m-h-70">

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <div class="col-md-4 offset-md-4">
                                <img src="assets/img/kgshia_logo.png" width="80" alt="">
                            </div>

                            <p class="admin-brand-content">
                                Kogi State Health Insurance Agency
                            </p>
                            <h3 class="h4">Login</h3>
                        </div>

                            <div class="form-row">
                                <div class="form-group floating-label col-md-12">
                                    <label>Email</label>
                                    <input type="text" required class="form-control" v-model="identifier" placeholder="Email">
                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Password</label>
                                    <input type="password" required class="form-control "  v-model="password" placeholder="password">
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
                    </div>

                </div>
            </div>
            </div>

            <!-- <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/login.svg');">

            </div> -->
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
      identifier:"",
     reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      password:"",
      isLoading: false,
      fullPage: true,
      auth_user:""

    }
  },
  beforeMount(){
//
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
        if ( this.reg.test(this.identifier) )
            {
                this.axios.post('/api/v1/auth/login',{
                email:this.identifier,
                password:this.password,
              })

            .then(response=>{
              console.log(response)
              // this.$toasted.info('Welcome back!', {position: 'top-center', duration:3000 })
                let token= response.data.token;
                if(token){

                   localStorage.setItem('jwt',token);

                   if (localStorage.getItem('jwt') != null){

                                 this.$router.push('/pusher')
                        }

                    }
                })
                .catch(error=>{
                    console.log(error.response)
                    this.isLoading = false;
                    this.$toasted.error('Username or Password Incorrect', {position: 'top-center', duration:3000 })

                })

            } else {
                    this.axios.post('/api/v1/auth/login',{
                    username:this.identifier,
                    password:this.password,
                  })

                .then(response=>{
                  console.log(response)
                    let token= response.data.token;
                    if(token){
                       localStorage.setItem('jwt',token);
                       // this.$breadstick.notify("🥞 Welcome to HIP!", {position: "top-right"});
                       if (localStorage.getItem('jwt') != null){
                                     this.$router.push('/pusher')
                            }

                        }
                    })
                    .catch(error=>{
                        console.log(error.response)
                        this.isLoading = false;
                        this.$toasted.error('Username or Password Incorrect', {position: 'top-center', duration:3000 })

                    })
                  }

        }
  },
  created(){

  }

}
</script>
<style scoped>
  .spacer-top{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
