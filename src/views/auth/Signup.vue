<template>
  <body class=jumbo-page>

<main class="admin-main  ">
    <div class="container-fluid">
        <div class="row ">
            <div class="col-lg-4  bg-white">
                <div class="row align-items-center m-h-100">
                    <div class="mx-auto col-md-8">
                        <form class="needs-validation" action="#">
                            <div class="p-b-20 text-center">
                                <p>
                                    <img src="assets/img/logo.svg" width="80" alt="">

                                </p>
                                <p class="admin-brand-content">
                                    atmos
                                </p>
                            </div>
                            <h3 class="text-center p-b-20 fw-400">Register</h3>

                            <div class="form-row">

                                <div class="form-group floating-label col-md-12">
                                    <label>Email</label>
                                    <input type="email" required class="form-control" placeholder="Email">

                                </div>
                                <div class="form-group floating-label col-md-12">
                                    <label>Password</label>
                                    <input type="password" required class="form-control " id="password"
                                            >
                                </div>
                            </div>
                            <div class="form-group floating-label">
                                <label>Password Again</label>
                                <input type="password" class="form-control" required id="confirm_password"
                                       placeholder="Password Again">
                            </div>
                            <div class="form-row">
                                <div class="form-group floating-label col-md-6">
                                    <label>City</label>
                                    <input type="text" class="form-control" placeholder="City">
                                </div>

                                <div class="form-group floating-label col-md-6">
                                    <label>Zip</label>
                                    <input type="text" class="form-control" placeholder="Zip">
                                </div>
                            </div>
                            <p class="">
                                <label class="cstm-switch">
                                    <input type="checkbox" checked name="option" value="1" class="cstm-switch-input">
                                    <span class="cstm-switch-indicator "></span>
                                    <span class="cstm-switch-description">  I agree to the Terms and Privacy. </span>
                                </label>


                            </p>

                            <button type="submit" class="btn btn-primary btn-block btn-lg">Create Account</button>

                        </form>
                        <p class="text-right p-t-10">
                            <a href="#!" class="text-underline">Already a user?</a>
                        </p>
                    </div>

                </div>
            </div>
            <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/auth.svg');">

            </div>
        </div>
    </div>
</main>
  </body>
</template>

<script>


export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){

  },
  beforeMount(){

  },
  methods:{

  },
  created(){

  }
}
</script>
