<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div v-for="provider in singleprovider" v-bind:key="provider.id">
        <div class="bg-info m-b-30">
          <div class="container">
            <div class="row p-b-60 p-t-60">
              <div class="col-md-6 text-center mx-auto text-white p-b-30">
                <div class="m-b-10">
                  <div class="avatar"></div>
                </div>
                <h3 class="h5">{{ provider.agency_name }}</h3>
              </div>
            </div>
          </div>
        </div>
        <section class="pull-up">
          <div class="container">
            <div class="row list">
              <div class="col-lg-12 col-md-12">
                <div class="card m-b-30">
                  <div class="card-header"></div>

                  <div class="card-body">
                    <div class="form-group">
                      <button
                        class="btn btn-outline-info"
                        @click="acceptProvider(1)"
                        v-if="provider.status == false"
                      >
                        Approve
                      </button>
                      <button
                        class="btn btn-outline-danger"
                        @click="acceptProvider(0)"
                        v-if="provider.status == true"
                      >
                        Disapprove
                      </button>
                      <router-link
                        :to="{ path: '/provider/add-employee/' + provider.id }"
                      >
                        <button class="btn btn-outline-info spacer">
                          Manage Personnel
                        </button>
                      </router-link>

                      <router-link
                        :to="{ path: '/edit-provider/' + provider.id }"
                      >
                        <button
                          class="btn btn-outline-info"
                          style="margin-left: 10px"
                        >
                          Edit Facility
                        </button>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <router-link :to="{ path: '/view-clients-provider' }">
                        <div class="avatar avatar-lg">
                          <div class="avatar-title bg-soft-info rounded-circle">
                            <i class="mdi mdi-account-group"></i>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Total Enrollees
                      </p>
                      <h1 class="fw-400">
                        {{ dashboarddata.enrollees | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-account-multiple"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">Principal</p>
                      <h1 class="fw-400">
                        {{ dashboarddata.principal | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-account-heart"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">Dependents</p>
                      <h1 class="fw-400">
                        {{ dashboarddata.dependants | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-folder-multiple"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">Encounters</p>
                      <h1 class="fw-400">
                        {{ dashboarddata.encounters | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <router-link :to="{ path: '/all-claims' }">
                        <div class="avatar avatar-lg">
                          <div class="avatar-title bg-soft-info rounded-circle">
                            <i class="fe fe-credit-card"></i>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">Claims</p>
                      <h1 class="fw-400">
                        {{ dashboarddata.claims | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-bank-transfer-out"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Out-going Referrals
                      </p>
                      <h1 class="fw-400">
                        {{ dashboarddata.outgoing_referrals | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-bank-transfer-in"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        In-coming Referrals
                      </p>
                      <h1 class="fw-400">
                        {{ dashboarddata.incoming_referrals | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-account-tie"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">Employees</p>
                      <h1 class="fw-400">
                        {{ dashboarddata.employees | numeral("0,0") }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-folder-multiple"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Total Utilization Rate
                      </p>
                      <h1 class="fw-400">
                        {{
                          dashboarddata.encounter_rate_total
                            | numeral("0,0.00")
                        }}%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-bank-transfer-out"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Total Referral Rate
                      </p>
                      <h1 class="fw-400">
                        {{
                          dashboarddata.referral_rate_total | numeral("0,0.00")
                        }}%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-folder-multiple"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Utilization Rate (Current Month)
                      </p>
                      <h1 class="fw-400">
                        {{
                          dashboarddata.encounter_rate_current_month
                            | numeral("0,0.00")
                        }}%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="pb-2">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-bank-transfer-out"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-muted text-overline m-0">
                        Referral Rate (Current Month)
                      </p>
                      <h1 class="fw-400">
                        {{
                          dashboarddata.referral_rate_current_month
                            | numeral("0,0.00")
                        }}%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8 col-md-8">
                <div class="card m-b-30">
                  <div class="card-header">
                    <h4 class="h4">Facility Enrollees</h4>
                  </div>

                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table align-td-middle table-card">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>AGENCY ID</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="enrollee in providerclients"
                            v-bind:key="enrollee.id"
                          >
                            <td>
                              <router-link
                                :to="{ path: '/client/' + enrollee.id }"
                              >
                                {{ enrollee.firstname }} {{ enrollee.lastname }}
                              </router-link>
                            </td>
                            <td>{{ enrollee.id_card_number }}</td>
                            <td>{{ enrollee.phone_number }}</td>
                            <td>{{ enrollee.sector }}</td>

                            <td>
                              <router-link
                                :to="{ path: '/client/' + enrollee.id }"
                              >
                                <button
                                  type="button"
                                  name="button"
                                  class="btn btn-outline-info"
                                >
                                  <i class="fe fe-eye"></i>
                                </button>
                              </router-link>

                              <!-- <button class="btn btn-dark" @click="editUser(enrollee)">change</button> -->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4">
                <div class="card m-b-30">
                  <div class="card-header">
                    <strong class="h4">Facility Details</strong>
                  </div>

                  <div class="card-body">
                    <p>
                      <span v-if="provider.status == true">
                        <button
                          type="button"
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                        >
                          approved
                        </button>
                      </span>
                      <span v-if="provider.status == false">
                        <button
                          type="button"
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                        >
                          pending
                        </button>
                      </span>
                    </p>
                    <p>
                      <strong>Beneficiaries Enrolled:</strong>
                      {{ providerclients.length }}
                    </p>
                    <br />
                    <p>
                      <strong>Contact Name:</strong> {{ provider.firstname }}
                      {{ provider.lastname }}
                    </p>
                    <br />
                    <p><strong>E - Mail:</strong> {{ provider.email }}</p>
                    <br />
                    <p>
                      <strong>Phone Number:</strong> {{ provider.phone_number }}
                    </p>
                    <br />
                    <p>
                      <strong>Facilty Type:</strong> {{ provider.phc_general }}
                    </p>
                    <br />
                    <p>
                      <strong>LGA/Ward:</strong>
                      <span v-if="provider.user.localgovt">
                        {{ provider.user.localgovt.local_name }} /
                      </span>
                      <span v-if="provider.user.ward">{{
                        provider.user.ward.ward_name
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>CAC Document:</strong></p>
                           </div>

                           <div class="card-body">


                           </div>
                       </div>
                   </div>

               </div> -->
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
      </div>
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
      singleprovider: "",
      providerclients: "",
      agencies: "",
      dashboarddata: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/detailedProviderHmo/${this.$route.params.id}`)
      .then((response) => {
        this.singleprovider = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getData() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/provider-dashboard-data/${this.$route.params.id}`)
        .then((response) => {
          this.dashboarddata = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getProvider() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/detailedProviderHmo/${this.$route.params.id}`)
        .then((response) => {
          this.singleprovider = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getProviderClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getProviderToUser/${this.$route.params.id}`)
        .then((response) => {
          this.providerclients = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    acceptProvider(status) {
      if (confirm("Are You Sure You Want to Update Provider?")) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/approveDisapproveProviderByAgency", {
            agency_id: 439078,
            provider_id: this.$route.params.id,
            status: status,
          })
          .then((response) => {
            console.log(response);
            this.$breadstick.notify("Provider Updated!", {
              position: "top-right",
            });
            this.isLoading = false;
            this.getProvider();
            this.$router.push(`/my-providers`);
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
          });
      }
    },
    rejectProvider() {
      if (confirm("Are You Sure You Want to Disapprove this Provider?")) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/approveDisapproveProviderByAgency", {
            agency_id: this.user.id,
            provider_id: this.$route.params.id,
            status: 0,
          })
          .then((response) => {
            console.log(response);
            this.$breadstick.notify("Provider Disapproved!", {
              position: "top-right",
            });
            this.isLoading = false;
            this.getProvider();
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
          });
      }
    },
    clearIt() {
      this.agency_id = "";
    },
    editUser(enrollee) {
      this.isLoading = true;
      this.axios
        .patch(`/api/v1/auth/id-card-number/change/${enrollee.id}`)
        .then((response) => {
          console.log(response);
          // this.getClients()
          this.$toasted.success("Changed Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProvider();
    this.getProviderClients();
    this.getData();
  },
};
</script>
<style>
.spacer {
  margin-left: 15px;
}
</style>
