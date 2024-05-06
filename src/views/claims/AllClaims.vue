<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <h3 class="h4 text-dark">Claims</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <!-- <div
            class="row"
            v-if="user.type == 'shis' || user.type == 'employee'"
          >
            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-info">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-activity"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">All Claims</p>
                    <h1 class="fw-400">
                      {{ metrics.all_claims | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-default">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-user-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Pending Claims</p>
                    <h1 class="fw-400">
                      {{ metrics.pending_claims | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-dark">
                <div class="card-body text-white">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-users"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Vetted Claims</p>
                    <h1 class="fw-400">
                      {{ metrics.vetted_claims | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-dark">
                <div class="card-body text-white">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-users"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Verified Claims</p>
                    <h1 class="fw-400">
                      {{ metrics.verified_claims | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="col-md-12">
            <div class="card" v-show="filterparams">
              <div class="card-header">
                <p class="text-center h4">Filter Parameter</p>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Claim ID</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="claim_unique_id"
                      placeholder="CLM_xxxxx"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Authorization Code</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="authorization_code"
                      placeholder="AUT_xxxxxxxx"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputEmail4">OHIS Number</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="id_card_number"
                      placeholder="OHIS/XX/XXXX"
                    />
                  </div>

                  <div
                    class="form-group col-md-6"
                    v-if="user.type == 'shis' || user.type == 'employee'"
                  >
                    <label> Select Facility </label>

                    <v-select
                      v-model="provider_id"
                      label="agency_name"
                      :options="providers"
                      @change="getClaims"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label> Select Status </label>
                    <select class="form-control" v-model="claim_status">
                      <option value="All">All</option>
                      <option value="approved">Approved</option>
                      <option value="vetted">Vetted</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputCity"
                      ><i class="fe fe-calendar"></i> Start Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="from"
                      @change="pushDate"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputCity"
                      ><i class="fe fe-calendar"></i> End Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="to"
                      @change="pushDate"
                    />
                  </div>
                  <div class="col-md-12">
                    <button
                      class="btn btn-outline-success btn-block"
                      @click="getClaims"
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div class="card row list">
            <div class="card-header">
              <button class="btn btn-outline-dark float-left">
                {{ claims.data.length }} {{ provider_id.agency_name }} Claims
              </button>

              <button
                class="btn btn-outline-dark float-right"
                @click="filterparams = !filterparams"
              >
                filters
              </button>

              <button
                style="margin-right: 4px"
                class="btn btn-outline-primary float-right"
              >
                <download-excel
                  :data="claims.data"
                  :fields="json_fields"
                  type="csv"
                  :escapeCsv="false"
                  :name="'claim_data' + '.csv'"
                >
                </download-excel>
              </button>
            </div>
            <div class="card-body m-b-30">
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>Claim ID</th>
                      <th>Health Facility</th>
                      <th>Diagnosis</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="claim in claims.data" v-bind:key="claim.id">
                      <td>
                        <router-link :to="{ path: '/claim/' + claim.id }">
                          {{ claim.claim_unique_id }}
                        </router-link>
                      </td>
                      <td>{{ claim.provider.agency_name }}</td>
                      <td>{{ claim.diagnosis.name }}</td>
                      <td>
                        <span v-if="claim.paymentorders.length >= 1">
                          <button
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark"
                            v-if="claim.paymentorders[0].status == 'pending'"
                          >
                            processed for payment
                          </button>
                        </span>

                        <!-- <button
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                            v-if="claim.paymentorders[0].status == 'paid'"
                          >
                            <i class="fe fe-check-square"></i>paid
                          </button> -->

                        <span v-if="claim.status == 1">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                          >
                            approved
                          </button>
                        </span>

                        <span v-if="claim.verified_by_id != null">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                          >
                            verified
                          </button>
                        </span>

                        <span v-if="claim.checked_by_id != null">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark"
                          >
                            vetted
                          </button>
                        </span>

                        <span v-if="claim.status == null">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                          >
                            pending
                          </button>
                        </span>

                        <span v-if="claim.status == 0">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger"
                          >
                            rejected
                          </button>
                        </span>

                        <!-- border -->
                      </td>
                      <td>
                        <router-link :to="{ path: '/claim/' + claim.id }">
                          <button
                            type="button"
                            name="button"
                            class="btn btn-outline-success"
                          >
                            <i class="fe fe-eye"></i>
                          </button>
                        </router-link>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <div
                          class="col-md-12"
                          v-if="user.job_title == 'Claims Verifier'"
                        >
                          <b-alert show variant="primary">
                            To forward claims to the ES for approval, select the
                            verified facility claims.
                          </b-alert>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        user.job_title == 'Claims Verifier' &&
                        provider_id != '' &&
                        claims.data.length > 0 &&
                        claim_status == 'verified'
                      "
                    >
                      <td colspan="4">
                        <button
                          class="btn btn-outline-success btn-block"
                          @click="forwwardClaims()"
                        >
                          Forward {{ provider_id.agency_name }}'s Claims to the
                          ES for Approval
                          <i class="fe fe-send"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      metrics: "",
      claims: "",
      selected: "",
      claim_unique_id: "",
      authorization_code: "",
      id_card_number: "",
      edit: false,
      show: false,
      filterparams: false,
      showsearch: false,
      isLoading: false,
      fullPage: true,
      paginate_value: 100,
      from: "",
      to: new Date(),
      providers: "",
      tpas: "",
      claim_status: "All",
      org_id: "",
      provider_id: "",
      date: "",
      json_fields: {
        "Claim ID": "claim_unique_id",
        "Enrollee Full Name": "patient.full_name",
        "Enrollee OHIS Number": "patient.id_card_number",
        Diagnosis: "diagnosis.name",
        "Verified Amount": "approved_total_cost",
        "Authorization Code": "authorization_code",
        "Date Created": "seen_date",
        "Facility Name": "provider.agency_name",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    addOneDay() {
      var result = new Date(this.to);
      result.setDate(result.getDate() + 1);
      return result;
    },
  },
  methods: {
    pushDate() {
      this.date = "date";
      this.getClaims();
    },
    getClaims() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == "shis" || this.user.type == "employee") {
        this.isLoading = true;
        this.axios
          .get(`/api/v1/auth/claims/95930`, {
            params: {
              claim_status: this.claim_status,
              claim_unique_id: this.claim_unique_id,
              authorization_code: this.authorization_code,
              id_card_number: this.id_card_number,
              provider_id: this.provider_id.id,
              paginate_value: "20",
              date: this.date,
              from: this.from,
              to: this.addOneDay,
            },
          })
          .then((response) => {
            this.claims = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
          });
      }
      if (this.user.type == "provider") {
        this.isLoading = true;
        this.axios
          .get(`/api/v1/auth/claminByProvider${this.user.id}`, {
            params: {
              claim_status: this.claim_status,
              claim_unique_id: this.claim_unique_id,
              authorization_code: this.authorization_code,
              id_card_number: this.id_card_number,
              date: this.date,
              from: this.from,
              to: this.addOneDay,
            },
          })
          .then((response) => {
            this.claims = response.data.data;
            this.metrics = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
          });
      }
      if (this.user.type == "provider_employee") {
        this.isLoading = true;
        this.axios
          .get(`/api/v1/auth/claminByProvider${this.user.institutional_id}`, {
            params: {
              claim_status: this.claim_status,
              claim_unique_id: this.claim_unique_id,
              authorization_code: this.authorization_code,
              id_card_number: this.id_card_number,
              // org_id: this.org_id,
              date: this.date,
              from: this.from,
              to: this.addOneDay,
            },
          })
          .then((response) => {
            this.claims = response.data;
            this.isLoading = false;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }

     
    },
    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/95930`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    forwwardClaims() {
      if (confirm("Are you sure you want to Forward")) {
        this.axios
          .post(`/api/v1/auth/forwardclaimtoES`, {
            claims: this.claims.data,
          })
          .then((response) => {
            console.log(response);
            this.$toasted.info("Forwarded Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created() {
    this.getClaims();
    this.getProviders();
  },
};
</script>
<style scoped>
.spacer-side {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
