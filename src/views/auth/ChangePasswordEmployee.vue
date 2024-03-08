<template >
  <body class="jumbo-page">
    <main class="admin-main">
      <div class="container-fluid">
        <div class="row">
          <div class="container spacer-top">
            <div class="card col-lg-12">
              <div class="row align-items-center m-h-70">
                <div class="mx-auto col-md-8">
                  <div class="text-center">
                    <p class="admin-brand-content">Change Password</p>
                  </div>

                  <div class="form-row">
                    <div class="form-group floating-label col-md-12">
                      <label>Password</label>
                      <input
                        type="password"
                        required
                        class="form-control"
                        v-model="password"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group floating-label col-md-12">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        required
                        class="form-control"
                        v-model="password_confirmation"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-success btn-block btn-lg"
                    @click="changePassword"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

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
      password: "password",
      password_confirmation: "",
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
    getUser() {
      this.axios
        .get(`/api/v1/auth/user/${this.$route.params.id}`)
        .then((response) => {
          this.auth_user = response.data.data;
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          // let type = response.data.data.type
        })
        .catch((error) => {
          console.error(error);
        });
    },

    changePassword() {
      if (this.password == this.password_confirmation) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.isLoading = true;
        this.axios
          .patch(`/api/v1/auth/change-password/${this.$route.params.id}`, {
            password: this.password,
          })

          .then((response) => {
            console.log(response);
            this.isLoading = false;
            this.$toasted.info("Password Changed", {
              position: "top-center",
              duration: 3000,
            });
            // this.$router.push('/')
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
            this.$toasted.error("Password not changed", {
              position: "top-center",
              duration: 3000,
            });
          });
      } else {
        this.$toasted.error("Password not the same", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
  },
  created() {},
};
</script>
<style scoped>
.spacer-top {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
