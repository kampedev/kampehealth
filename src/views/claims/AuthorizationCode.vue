<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <p class="h3 text-dark">Authorization Code Manager</p>
            </div>
          </div>
        </div>
      </div>

      <section class="" v-if="user.type == 'provider_employee'">
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="showadder = !showadder"
                  >
                    Request Code <i class="fe fe-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class=""
        v-if="
          user.user_role == 1 ||
          user.job_title == 'Claims Vetter' ||
          user.job_title == 'Claims Verifier' ||
          user.type == 'shis'
        "
      >
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <p class="h5">Filter Auth Code Requests</p>
                </div>
                <div class="card-body">
                  <div class="">
                    <form @submit.prevent="getCodesAgency">
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label>Select Facility </label>
                          <v-select
                            v-model="query.provider_id"
                            label="agency_name"
                            :options="providers"
                          />
                        </div>

                        <div class="form-group col-md-6">
                          <label>Select Status </label>
                          <v-select
                            v-model="query.status"
                            label="agency_name"
                            :options="statuses"
                          />
                        </div>

                   <div class="form-group col-md-5">
                  <label for="inputCity"
                    ><i class="fe fe-calendar"></i> Start Date
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="query.from"
                  />
                </div>

                <div class="form-group col-md-5">
                  <label for="inputCity"
                    ><i class="fe fe-calendar"></i> End Date
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="query.to"
                  />
                </div>

                <div class="col-md-2 form-group">
                  <label for="">Rows</label>
                  <select class="form-control" v-model="query.paginate_value">
                    <option>30</option>
                    <option>100</option>
                    <option>500</option>
                    <option>1000</option>
                    <option>2000</option>
                  </select>
                </div>
                      </div>

                      <div class="form-group">
                        <button type="submit" class="btn btn-info btn-block">
                          Filter
                        </button>

                        <button class="btn btn-outline-dark my-2 btn-block">
                          <download-excel
                            :data="codes.data"
                            :fields="json_fields"
                            type="xls"
                            :escapeCsv="false"
                            :name="'authorization_codes_data' + '.xls'"
                          >
                          </download-excel>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="col-lg-12 col-md-12" v-show="showadder">
        <div class="card m-b-30">
          <div class="card-header">
            <h3 class="p-t-10 searchBy-name">New Request</h3>
          </div>

          <div class="card-body">
            <form @submit.prevent="AddDisease">
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Select Receiving Facility </label>
                  <v-select
                    v-model="referred_to_facility"
                    label="agency_name"
                    :options="providers"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputCity">Search Enrollee </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="KAMPE Number, First Name, Last name, "
                    v-model="searchkey"
                    @change="searchIDCard"
                  />
                  <p>{{ search_result.length }} enrollee(s) found</p>
                </div>

                <div class="form-group col-md-12">
                  <label for="inputPassword4">Select Enrollee </label>
                  <!-- <v-select
                          v-model="selected_enrollee"
                          label="user_query"
                          :options="search_result"
                        /> -->

                  <select
                    class="form-control"
                    v-model="selected_enrollee"
                    required
                    @change="getRecords(selected_enrollee)"
                  >
                    <option
                      :value="user"
                      v-for="user in search_result"
                      :key="user.id"
                    >
                      {{ user.user_query }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row col-md-12" v-show="userDetails">
                <div class="col-md-6 offset-md-3 my-6">
                  <img
                    :src="`https://kampe.hayokmedicare.ng/image/${selected_enrollee.user_image}`"
                    class="img"
                    alt="User Photo"
                    onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputCity">Enrollee Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    :value="selected_enrollee.full_name"
                    disabled
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputCity">Enrollee First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    :value="selected_enrollee.lastname"
                    disabled
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputCity">Kampe Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    :value="selected_enrollee.id_card_number"
                    disabled
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputCity">Plan</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    :value="selected_enrollee.plan"
                    disabled
                  />
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="inputCity">Select Encounter </label>
                    <select
                      class="form-control"
                      required
                      v-model="service_summary_id"
                    >
                      <option
                        :value="encounter.id"
                        v-for="encounter in encounters"
                        v-bind:key="encounter.id"
                      >
                        {{ encounter.encounter_id }}

                        <span v-if="encounter.diagnosis != null"
                          >({{ encounter.diagnosis.name }} )</span
                        >
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button type="submit" class="btn btn-info btn-block">
                  Submit <i class="fe fe-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <p class="h5">{{ codes.total }} Code Requests</p>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Date Requested</th>
                          <th>Requesting Facility</th>
                          <th>Expiry Date</th>
                          <th>Authorization Code</th>
                          <th>Status</th>
                          <th
                            v-if="
                              user.type == 'shis' || user.type == 'employee'
                            "
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diag in codes.data" v-bind:key="diag.id">
                          <td>
                            {{ diag.date_requested }}
                            <span class="text-primary">
                              {{ diag.created_at | moment("from", "now") }}
                            </span>
                          </td>
                          <td>
                            <span v-if="diag.provider != null">{{
                              diag.provider.agency_name
                            }}</span>
                          </td>
                          <td>
                            {{ diag.expiry_date }}
                            <button
                              v-if="diag.status == 'rejected'"
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger spacer"
                            >
                              {{ diag.status }}
                            </button>
                          </td>

                          <td>
                            {{ diag.code_created }}

                            <button
                              v-if="diag.status == 'rejected'"
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger spacer"
                            >
                              {{ diag.status }}
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark spacer"
                            >
                              {{ diag.status }}
                            </button>

                            <span
                              v-if="diag.is_code_used == true"
                              class="bg-info text-white"
                            >
                              code used
                            </span>
                            <span
                              v-if="
                                diag.is_code_used == false &&
                                diag.status == 'approved'
                              "
                            >
                              code not used yet</span
                            >
                          </td>
                          <td>
                            <router-link
                              :to="{ path: '/authorization-code/' + diag.id }"
                            >
                              <button class="btn btn-outline-dark">
                                <i class="fe fe-eye"></i>
                              </button>
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="text-center">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="codes.total"
                        :per-page="codes.per_page"
                        aria-controls="my-table"
                        @input="getCodes(currentPage ? currentPage : 1)"
                      ></b-pagination>
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
      isLoading: false,
      fullPage: true,
      user: null,
      showadder: false,
      userDetails: false,
      statuses: ["pending", "approved", "rejected"],
      json_fields: {
        "Date Requested": "created_at",
        "Auth Code": "code_created",
        "Code Usage": "code_usage",
        "Primary Diagnosis": "encounter.diagnosis.name",
        "Enrollee KAMPE Number": "enrollee.id_card_number",
        "Intra Referral": "intra_referral",
        "Primary Facility": "provider.agency_name",
        "Secondary Facility": "recipientfacility.agency_name",
      },
      query: {
        provider_id: "",
        status: "",
        from: "",
        to: "",
        paginate_value: "",
      },
      codes: "",
      message:
        "Authorization Code is needed. Go to https://app.Kampe.ng/authorization-code  to generate.",
      searchkey: "",
      selected_enrollee: {},
      enrollee_details: "",
      referred_to_facility: "",
      providers: "",
      search_result: "",
      search_obj: "",
      service_summary_id: "",
      encounters: "",
      register: {
        date_requested: "",
      },
      rows: "1",
      perPage: 15,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getCodes(currentPage) {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (
        this.user.type == "provider" ||
        this.user.type == "provider_employee"
      ) {
        this.getCodesProvider(currentPage);
      }

      if (this.user.type == "employee" || this.user.type == "shis") {
        this.getCodesAgency(currentPage);
      }
    },

    getCodesAgency(currentPage) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code/439078`, {
          params: {
            page: currentPage,
            provider_id: this.query.provider_id.id,
            status: this.query.status,
            paginate_value: this.query.paginate_value,
            from: this.query.from,
            to: this.query.to,
          },
        })
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getCodesProvider(currentPage) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code-provider`, {
          params: {
            page: currentPage,
            paginate_value: this.query.paginate_value,
            from: this.query.from,
            to: this.query.to,
          },
        })
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    searchIDCard() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/searchenrollees`, {
          // provider_id: this.user.institutional_id,
          agency_id: 439078,
          request_query: this.searchkey,
        })
        .then((response) => {
          this.isLoading = false;
          this.search_result = response.data;

          this.userDetails = true;

          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
    generateCode(diag) {
      this.axios
        .post(`/api/v1/auth/generateCode`, {
          id: diag.id,
        })
        .then((response) => {
          this.getCodes();
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

    AddDisease() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/authorization_code", {
          agency_id: 439078,
          principal_id:
            this.selected_enrollee.type == "client"
              ? this.selected_enrollee.id
              : 0,
          dependent_id:
            this.selected_enrollee.type == "Dependent"
              ? this.selected_enrollee.id
              : 0,
          provider_id: this.user.institutional_id,
          service_summary_id: this.service_summary_id,
          referred_to_facility: this.referred_to_facility.id,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.getCodes();
          this.$toasted.info("Successful!", {
            position: "top-center",
            duration: 3000,
          });

          this.clearIt();
          // this.sendSMS();
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Not Added!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    getRecords(selected_enrollee) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/service_summary-agency`, {
          agency_id: 439078,
          provider_id: this.user.institutional_id,
          client_id:
            selected_enrollee.type == "client" ? selected_enrollee.id : null,
          dependent_id:
            selected_enrollee.type == "Dependent" ? selected_enrollee.id : null,
        })
        .then((response) => {
          this.encounters = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    clearIt() {
      this.register.date_requested = "";
      this.searchkey = "";
      this.search_result = "";
      this.user.institutional_id = "";
      this.service_summary_id = "";
      this.referred_to_facility = "";
    },
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
    sendSMS() {
      this.isLoading = true;
      this.axios
        .post(
          `https://api.bulksmslive.com/v2/app/sms?email=faisalnas7@gmail.com&password=skrull123&sender_name=KAMPE&message=${this.message}&recipients=+2348033886362`,
          {}
        )
        .then((response) => {
          console.log(response);
          let reply = response.data.msg;
          this.clearIt();
          this.isLoading = false;
          this.$toasted.info(`${reply}`, {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created() {
    this.getCodes();
    this.getProviders();
    // this.getRecords();
  },
};
</script>
