<template>
  <body class="jumbo-page">
    <main class="admin-main">
      <div class="container-fluid">
        <div class="row">
          <div class="container spacer-top">
            <div class="card col-lg-12">
              <div class="row align-items-center m-h-70">
                <div class="mx-auto col-md-8">
                  <div class="text-center">
                    <p class="admin-brand-content">
                      Change Department/ Job Title
                    </p>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputCity">Job Title</label>
                      <select class="form-control" v-model="job_title">
                        <option value="Executive Secretary">
                          Executive Secretary
                        </option>
                        <option value="Finance">Finance</option>
                        <option value="Claims Vetter">Claims Vetter</option>
                        <option value="Claims Verifier">Claims Verifier</option>
                        <option value="Enrollment Officer">
                          Enrollment Officer
                        </option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-success btn-block btn-lg"
                    @click="changeDept"
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
      job_title: "",
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
    changeDept() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/update-dept/${this.$route.params.id}`, {
          job_title: this.job_title,
        })

        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info("Department Changed", {
            position: "top-center",
            duration: 3000,
          });
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Dept. not changed", {
            position: "top-center",
            duration: 3000,
          });
        });
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
