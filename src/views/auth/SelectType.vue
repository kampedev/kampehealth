<template>
  <body class="jumbo-page  gradient-01">

<main class="admin-main">

    <section class="admin-content">

        <div class="container  ">
            <div class="row m-h-100 align-items-center justify-content-center">
                <div class="col-lg-12 col-md-12 p-t-80">
                    <div class="card shadow-lg">
                        <div class=" p-all-25">
                            <div class="pull-up-sm text-center p-b-30">
                                <div class="avatar avatar avatar-lg">
                                    <img src="assets/img/logo.svg" alt="">
                                </div>
                            </div>
                            <div class="col-md-12 text-center">
                              <h2>Select Account Type</h2>
                            </div>
                            <div class="row">

              <router-link :to="{ path: '/signup-client' }">
                              <!--widget card begin-->
                <div class="card  bg-dark">
                    <div class="card-body text-white">
                        <div class="text-center p-all-15">
                            <a class="badge bg-white-translucent    text-uppercase">user 1</a>
                            <div class="p-t-20">
                                <div class="avatar-lg avatar">
                                    <div class="avatar-title rounded-circle badge-soft-success"><i
                                                class="mdi mdi-account-tie h1 m-0"></i></div>

                                </div>
                            </div>
                            <div class="display-4 p-t-20">Personal</div>
                            <p class="opacity-75 p-t-20">
                                for clients
                            </p>
                        </div>
                    </div>
                </div>
                <!--widget card ends-->
              </router-link>

                <router-link :to="{ path: '/signup-state' }">
                                  <!--widget card begin-->
                    <div class="card bg-white">
                        <div class="card-body text-dark">
                            <div class="text-center p-all-15">
                                <a class="badge bg-white-translucent    text-uppercase">user 2</a>
                                <div class="p-t-20">
                                    <div class="avatar-lg avatar">
                                        <div class="avatar-title rounded-circle badge-soft-success"><i
                                                    class="fe fe-airplay h1 m-0"></i></div>

                                    </div>
                                </div>
                                <div class="display-4 p-t-20">SHIS</div>
                                <p class="opacity-75 p-t-20">
                                    for state health insurance schemes
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--widget card ends-->
                  </router-link>

                  <router-link :to="{ path: '/signup-hmo' }">
                                    <!--widget card begin-->
                      <div class="card bg-dark">
                          <div class="card-body text-white">
                              <div class="text-center p-all-15">
                                  <a class="badge bg-white-translucent    text-uppercase">user 3</a>
                                  <div class="p-t-20">
                                      <div class="avatar-lg avatar">
                                          <div class="avatar-title rounded-circle badge-soft-success"><i
                                                      class="mdi mdi-google-analytics h1 m-0"></i></div>

                                      </div>
                                  </div>
                                  <div class="display-4 p-t-20">HMO</div>
                                  <p class="opacity-75 p-t-20">
                                      for Health Management Organizations
                                  </p>
                              </div>
                          </div>
                      </div>
                      <!--widget card ends-->
                    </router-link>

                    <router-link :to="{ path: '/signup-provider' }">
                                      <!--widget card begin-->
                        <div class="card m-b-30 bg-white">
                            <div class="card-body text-dark">
                                <div class="text-center p-all-15">
                                    <a class="badge bg-white-translucent    text-uppercase">user 4</a>
                                    <div class="p-t-20">
                                        <div class="avatar-lg avatar">
                                            <div class="avatar-title rounded-circle badge-soft-success"><i
                                                        class="fe fe-activity h1 m-0"></i></div>

                                        </div>
                                    </div>
                                    <div class="display-4 p-t-20">Providers</div>
                                    <p class="opacity-75 p-t-20">
                                        for health-care providers
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!--widget card ends-->
                      </router-link>


                                  </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    </section>
</main>
  </body>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  beforeMount(){

  },
  methods:{

  },
  created(){

  }

}
</script>
<style lang="css" scoped>
  .spacer{
    margin-left:50px;
  }
</style>
