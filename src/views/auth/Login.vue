<template>
  <body class="jumbo-page" style="background-image: url('background/1.jpg')">
    <main class="admin-main">
      <div class="container-fluid">
        <div class="row">
          <div class="container spacer-top">
            <div class="card col-lg-6 offset-lg-3 notscroll">
              <div class="row align-items-center m-h-70">
                <div class="mx-auto col-md-8">
                  <div class="text-center">
                    <img
                      src="assets/img/Kampe_logo.png"
                      width="80"
                      alt=""
                      class="rounded mx-auto d-block mb-4"
                    />


                    <p class="admin-brand-content">KAMPE Health</p>
                    <h3 class="h4">Login</h3>
                  </div>

                  <div class="form-row">
                    <div class="form-group floating-label col-md-12">
                      <label>Email</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        v-model="email"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-group floating-label col-md-12">
                      <label>Password</label>
                      <input
                        type="password"
                        required
                        class="form-control"
                        v-model="password"
                        placeholder="password"
                      />
                    </div>
                  </div>

                  <!-- <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                      />
                      <label class="form-check-label" for="gridCheck">
                        Remember Me
                      </label>
                    </div>
                  </div> -->

                  <button
                    type="submit"
                    class="btn btn-info btn-block btn-lg"
                    @click="logIn"
                  >
                    Login <i class="fe fe-send"></i>
                  </button>
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
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </body>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      response: "",
      isLoading: false,
      fullPage: true,
      auth_user: "",
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    logIn() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/login", {
          // email: this.email,
          email: this.email.replace(/\s/g, ""),
          password: this.password,
        })

        .then((response) => {
          console.log(response);
          let token = response.data.token;
          let user = response.data.user;
          if (token) {
            localStorage.setItem("jwt", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (localStorage.getItem("jwt") != null) {
              this.$router.push("/pusher");
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Username or Password Incorrect", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
  },
  created() {
    //
  },
};
</script>
<style scoped>
.spacer-top {
  margin-top: 80px;
  margin-bottom: 180px;
}
.notscroll {
  overflow: hidden;
}
</style>
