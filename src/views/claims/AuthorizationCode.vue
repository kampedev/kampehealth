<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar ">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <p class="h3 text-dark">Authorization Code Manager</p>
            </div>
          </div>
        </div>
      </div>

      <section class=""
      v-if="user.type == 'provider' || user.type == 'provider_employee'"
      >
        <div class="container">
          <div class="row list">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="showadder = !showadder"
                  >
                    Make Code Request <i class="fe fe-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12" v-show="showadder">
              <div class="card m-b-30">
                <div class="card-header">
                  <h3 class="p-t-10 searchBy-name">Make Code Request</h3>
                </div>

                <div class="card-body">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Date Requested</label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="register.date_requested"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee OHIS Number </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="searchkey"
                        @change="searchIDCard"
                      />
                    </div>
                  </div>

                  <div class="row col-md-12" v-if="search_result != ''">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee Surname</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.firstname"
                        disabled
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.lastname"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">O'HIS Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.id_card_number"
                        disabled
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Sector</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.sector"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      class="btn btn-success btn-block"
                      @click="AddDisease"
                    >
                      Submit <i class="fe fe-send"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row list">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h1>{{ codes.length }} Codes</h1>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Creation Date</th>
                          <th>Expiry Date</th>
                          <th>Created By</th>
                          <th>Patient</th>
                          <th>Code</th>
                          <th>Code Usage Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diag in codes" v-bind:key="diag.id">
                          <td>{{ diag.date_requested }}</td>
                          <td>{{ diag.expiry_date }}</td>
                          <td>
                            {{ diag.creator.firstname }}
                            {{ diag.creator.lastname }}
                          </td>
                          <td>
                            {{ diag.enrollee.firstname }}
                            {{ diag.creator.lastname }}
                          </td>
                          <td>{{ diag.code_created }}</td>
                          <td>
                            <span v-if="diag.is_code_used == true" class="bg-success text-white"> code used </span> 
                            <span v-if="diag.is_code_used == false"> code not used yet</span> 
                            </td>
                          <td
                            v-if="
                             diag.code_created == 'null' && (user.type == 'tpa' || user.type == 'tpa_employee')
                            "
                          >
                            <button class="btn btn-outline-success"
                              @click="generateCode(diag)"
                            >
                              Generate Code <i class="fe fe-lock"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              loader="dots"
              :can-cancel="true"
              :is-full-page="fullPage"
            ></loading>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      isLoading: false,
      fullPage: true,
      states: "",
      showadder: false,
      codes: "",
      searchkey: "",
      search_result: "",
      register: {
        date_requested: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.axios
    //   .get(`/api/v1/auth/authorization_code/90`)
    //   .then((response) => {
    //     this.codes = response.data;
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  },
  methods: {
    getCodes() {
      this.user = JSON.parse(localStorage.getItem("user"));

      if (this.user.type == "employee" || this.user.type == "shis") {
        this.axios
          .get(`/api/v1/auth/authorization_code/95930`)
          .then((response) => {
            this.codes = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.user.type == "tpa_employee" || this.user.type == "tpa") {
        this.axios
          .get(`/api/v1/auth/authorization_code-tpa`)
          .then((response) => {
            this.codes = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      if (this.user.type == "provider_employee") {
        this.axios
          .get(
            `/api/v1/auth/authorization_code-provider/${this.user.institutional_id}`
          )
          .then((response) => {
            this.codes = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.user.type == "provider") {
        this.axios
          .get(`/api/v1/auth/authorization_code-provider/${this.user.id}`)
          .then((response) => {
            this.codes = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    generateCode(diag) {
      this.axios
        .post(`/api/v1/auth/generateCode`,{
          id: diag.id
        })
        .then((response) => {
         this.getCodes()
          console.log(response);
           this.$toasted.info("Generated Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    searchIDCard() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          id_card_number: this.searchkey,
        })
        .then((response) => {
          this.search_result = response.data;

          console.log(response);
          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });

          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.info("User not Found", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    AddDisease() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/authorization_code", {
          agency_id: 95930,
          principal_id:
            this.search_result.type == "client"
              ? this.search_result.data.id
              : 0,
          dependent_id:
            this.search_result.type == "dependent"
              ? this.search_result.data.id
              : 0,
          date_requested: this.register.date_requested,
          org_id: this.search_result.data.org_id,
          provider_id: this.user.institutional_id,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.getCodes();
          this.$toasted.info(`${response.data.message}`, {
            position: "top-center",
            duration: 3000,
          });

          this.clearIt();
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
    },
    clearIt() {
      this.register.date_requested = "";
      this.searchkey = "";
      this.search_result = "";
    },
  },
  created() {
    this.getCodes();
  },
};
</script>
