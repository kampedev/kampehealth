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

                            <button type="submit" class="btn btn-primary btn-block btn-lg" @click="logIn">Login</button>
                            <p>aa {{jwt}}</p>
                        <p class="text-right p-t-10">
                            <a href="#!" class="text-underline">Forgot Password?</a>
                        </p>
                    </div>

                </div>
            </div>
            <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/login.svg');">

            </div>
        </div>
    </div>
</main>

  </body>
</template>

<script>
export default {
  data(){
    return{
      email:"",
      password:"",
      jwt:""
    }
  },
  beforeMount(){

  },
  methods:{
    logIn(){
    // this.isLoading = true;
  this.axios.post('/api/v1/auth/login',{email:this.email,password:this.password})
  .then(response=>{
    console.log(response)
      let token= response.data.access_token;

      // let admin = response.data.user.is_admin
      // this.isLoading = false;
      // this.$toasted.global.login().goAway(1500);

      if(token){
         // localStorage.setItem('jwt',token);
        // localStorage.setItem('user',JSON.stringify(response.data.user))
         if (localStorage.getItem('jwt') != null){
                       this.$emit('loggedIn')
                       if(this.$route.params.nextUrl != null){

                         this.$router.push(this.$route.params.nextUrl)

                       }
                       else {

                            //  if(admin == true){
                            //    // this.$toasted.global.login().goAway(1500);
                            //   this.$router.push('/admin')
                            // }

                          // else {
                          //    // this.$toasted.global.login().goAway(1500);
                          //     this.$router.push('/my-profile')
                          //     // this.$router.go('dashboard')
                          // }
                       }
                   }
                 }
      })
      .catch(error=>{
          console.log(error.response)
          this.isLoading = false;
          this.$toasted.global.errorLogin().goAway(3000);
      })
    }
  },
  created(){

  }

}
</script>
