<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <div class="bg-success m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-dark p-b-30">
            <h3 class="h3 spacer-top">Add Referral</h3>
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
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">Enrollee KAMPE Number</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="searchkey"
                      @change="searchIDCard"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Provisional Diagnosis </label>
                    <v-select
                      v-model="referral.provisional_diagnosis"
                      label="name"
                      :required="!referral.provisional_diagnosis"
                      :options="diseases"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputCity">Encounter Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Link refferal to an encounter record of the patient"
                      v-model="referral.investigations"
                    />
                  </div>


                  <div class="form-group col-md-6">
                    <label >Recipient Facility </label>
                    <v-select
                      v-model="referral.recipient_facility"
                      label="agency_name"
                      :required="!referral.recipient_facility"
                      :options="providers"
                    />
                  </div>

                  <div class="row col-md-12" v-if="search_result != ''">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Client Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        :value="search_result.data.full_name"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">Client DOB</label>
                      <input
                        type="text"
                        class="form-control"
                        :value="search_result.data.dob"
                        disabled
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Gender</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.gender"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.phone_number"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputCity"
                      >Clinical Findings/Treatment Given</label
                    >
                    <textarea
                      name="name"
                      rows="8"
                      cols="80"
                      class="form-control"
                      v-model="referral.treatment_given"
                    ></textarea>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputCity">Reason for Referral</label>
                    <textarea
                      name="name"
                      rows="8"
                      cols="80"
                      class="form-control"
                      v-model="referral.reason"
                    ></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-success btn-block"
                    @click="AddReferral"
                  >
                    Submit <i class="fe fe-send"></i>
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
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
      editor: ClassicEditor,
      user: null,
      searchkey: "",
      search_result: "",
      enrollee_details: "",
      randomvalue: "",
      providers: "",
      diseases: "",
      min: 100000000000000000,
      max: 1000000000000000000,
      edit: false,
      isLoading: false,
      fullPage: true,
      referral: {
        client_id: "",
        recipient_facility: "",
        provisional_diagnosis: "",
        treatment_given: "null",
        investigations: "",
        reason: "null",
        name_of_reffering_personnel: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/diagnosis-agency/439078`)
      .then((response) => {
        this.diseases = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
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
    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/439078`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
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

    clearIt() {
      this.referral.recipient_facility = "";
      this.referral.provisional_diagnosis = "";
      this.referral.treatment_given = "";
      this.referral.investigations = "";
      this.referral.reason = "";
      this.searchkey = "";
    },

    AddReferral() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/referrals", {
          name_of_reffering_personnel: this.user.id,
          client_id: this.search_result.type == 'client' ? this.search_result.data.id : 0,
          dependent_id: this.search_result.type == 'dependent' ? this.search_result.data.id : 0,
          agency_id: 439078,
          referring_facility: this.search_result.type == 'client' ?  this.search_result.data.provider_id : this.search_result.data.provider,
          recipient_facility: this.referral.recipient_facility.id,
          provisional_diagnosis: this.referral.provisional_diagnosis.id,
          treatment_given: this.referral.treatment_given,
          investigations: this.referral.investigations,
          reason: this.referral.reason,
        })

        .then((response) => {
          console.log(response);
          this.clearIt();
          this.isLoading = false;
          this.$toasted.info("Referral Submitted Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.$router.push(`/all-referrals`);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created() {
    this.getProviders();
  },
};
</script>
