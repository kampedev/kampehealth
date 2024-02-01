<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-dark p-b-30">
              <h3 class="h3">Claims</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="form-group col-md-4">
                        <p><label for="inputPassword4">Date of Care</label></p>

                        <input
                          type="date"
                          class="form-control"
                          v-model="claim.seen_date"
                        />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="inputCity">Authorization Code </label>

                        <select
                          class="form-control"
                          required
                          v-model="claim.authorization_code"
                        >
                          <option
                            v-for="auth_code in referrals"
                            :key="auth_code.id"
                            :value="auth_code.code_created"
                          >
                            {{ auth_code.code_created }} (
                            {{ auth_code.code_usage }})
                          </option>
                        </select>
                      </div>

                      <div class="form-group col-md-4">
                        <label for="inputCity">Enrollee OHIS Number </label>
                        <input
                          disabled
                          type="text"
                          class="form-control"
                          v-model="summary.enrollee.id_card_number"
                        />
                      </div>

                      <div class="row col-md-12">
                        <div class="form-group col-md-6">
                          <label for="inputCity">Enrollee Surname</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            :value="summary.enrollee.firstname"
                            disabled
                          />
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputCity">Enrollee First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            :value="summary.enrollee.lastname"
                            disabled
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputCity">OHIS Number </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            :value="summary.enrollee.id_card_number"
                            disabled
                          />
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputCity">Phone Number</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            :value="summary.enrollee.phone_number"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputPassword4">Select Diagnosis </label>
                        <v-select
                          v-model="summary.diagnosis.name"
                          label="name"
                          :required="!claim.diagnosis"
                          :options="diseases"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Enter Encounter ID</label>
                        <input
                          type="text"
                          disabled
                          class="form-control"
                          v-model="summary.healthrecord.encounter_id"
                          @change="verifyEncounter"
                        />
                        <p class="text-primary" v-if="summary != ''">
                          Encounter verified for enrollee
                          <i class="fe fe-check-circle"></i>
                        </p>
                        <p class="text-danger" v-else>
                          Encounter not Found for enrollee
                        </p>
                      </div>
                    </div>
                    <!-- <div class="col-md-12">
                      <b-form-checkbox
                        v-model="claim.is_out_of_station"
                        name="check-button"
                        switch
                      >
                        Enrollee is an Out-of-Station <b>({{ claim.is_out_of_station }})</b>
                      </b-form-checkbox>
                    </div> -->

                    <div class="form-group col-md-12">
                      <label for="inputAddress">Reason for Claim</label>
                      <textarea
                        name="name"
                        rows="5"
                        cols="80"
                        class="form-control"
                        v-model="claim.treatment"
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      class="btn btn-outline-success btn-block"
                      @click="checkCode"
                    >
                      Proceed to Drugs/Service Processing
                      <i class="fe fe-chevron-right"></i>
                    </button>
                  </div>
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

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      clients: "",
      client: "",
      encounter_id: "",
      encounter_details: "",
      summary: "",
      referrals: "",
      claims: "",
      diseases: "",
      searchkey: "",
      search_result: "",
      enrollee_details: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      claim: {
        provider_id: "",
        client_id: "",
        diagnosis: "",
        treatment: "",
        is_out_of_station: false,
        client_name: "",
        seen_date: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    randomNumber: function () {
      let authorization_code = Math.floor(
        Math.random() * (this.max - this.min + 1) + this.min
      );
      return authorization_code;
    },
  },
  methods: {
    getEnrollees() {
      if (this.user.type == "shis") {
        this.axios
          .get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
          .then((response) => {
            this.clients = response.data.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.axios
          .get(`/api/v1/auth/getProviderToUser/${this.user.id}`)
          .then((response) => {
            this.clients = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    getClaims() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/claminByProvider${this.user.id}`)
        .then((response) => {
          this.claims = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getClient() {
      this.axios
        .get(`/api/v1/auth/user/${this.claim.client_id}`)
        .then((response) => {
          this.client = response.data.user;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    verifyEncounter(summary) {
      this.axios
        .post(`/api/v1/auth/verifyrecordbyencounterID`, {
          encounter_id: summary.id,
          patient_id: summary.enrollee.id,
        })
        .then((response) => {
          console.log(response);
          this.encounter_details = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.encounter_details = "";
        });
    },

    getDiseases() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/diagnosis-agency/95930`)
        .then((response) => {
          this.diseases = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchIDCard(summary) {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          id_card_number: summary.enrollee.id_card_number,
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
          this.$toasted.error("User not Found", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    makeClaim() {
      if (this.claim.authorization_code != "") {
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user.type == "provider_employee") {
          // Add claim
          this.isLoading = true;
          this.axios
            .post("/api/v1/auth/claims", {
              provider_id: this.user.institutional_id,
              user_id: this.user.id,
              agency_id: 95930,
              client_name:
                this.search_result.type == "client"
                  ? this.search_result.data[0].id
                  : 0,
              dependent_id:
                this.search_result.type == "dependent"
                  ? this.search_result.data[0].id
                  : 0,
              seen_date: this.claim.seen_date,
              diagnosis: this.summary.diagnosis.id,
              treatment: this.claim.treatment,
              authorization_code: this.claim.authorization_code,
              is_out_of_station: this.claim.is_out_of_station,
            })

            .then((response) => {
              console.log(response);
              let id = response.data.id;
              this.isLoading = false;
              this.$router.push(`/service-processing-form/${id}`);
            })
            .catch((error) => {
              console.log(error.response);
            });
        } else {
          // Add claim
          this.isLoading = true;
          this.axios
            .post("/api/v1/auth/claims", {
              provider_id: this.user.id,
              user_id: this.user.id,
              agency_id: 95930,
              client_name: this.enrollee_details.user.id,
              seen_date: this.claim.seen_date,
              diagnosis: this.claim.diagnosis.id,
              treatment: this.claim.treatment,
            })

            .then((response) => {
              console.log(response);
              let id = response.data.id;
              this.isLoading = false;
              // this.$breadstick.notify("Claim added Successfuly!", {position: "top-right"});
              this.$router.push(`/service-processing-form/${id}`);
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      } else {
        this.$toasted.error("Authorization Code cannot be blank", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    checkCode() {
      this.axios
        .post(`/api/v1/auth/checkAuthCode`, {
          authorization_code: this.claim.authorization_code,
        })
        .then((response) => {
          this.makeClaim();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          //  this.$toasted.info(`${error.message}`, {
          this.$toasted.error(`Authorization Code not found or already used!`, {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    verifyRef(summary) {
      this.axios
        .post(`/api/v1/auth/verifyReferal`, {
          searchkey: summary.enrollee.id_card_number,
        })
        .then((response) => {
          this.referrals = response.data.data;
          console.log(response);
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getSingleSummary() {
      this.axios
        .get(`/api/v1/auth/service_summary/${this.$route.params.id}`)
        .then((response) => {
          this.summary = response.data;
          console.log(response);
          let summary = this.summary;
          this.searchIDCard(summary);
          this.verifyEncounter(summary);
          this.verifyRef(summary);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getSingleSummary();
    this.getDiseases();
    this.getEnrollees();
  },
};
</script>
