<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <h3 class="h4 text-dark">Referrals</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <div
            class="col-md-12"
            style="margin-top: 15px"
            v-if="user.type == 'provider' || user.type == 'provider_employee'"
          >
            <button
              type="button"
              :class="buttoncolor.formal"
              @click="showPrimary(currentPage)"
            >
              Primary (Referring) <i class="fe fe-list"></i>
            </button>
            <button
              type="button"
              :class="buttoncolor.informal"
              @click="showSecondary(currentPage)"
            >
              Secondary (Recipient) <i class="fe fe-grid"></i>
            </button>
          </div>

          <div class="container my-6">
            <div class="card">
              <div class="card-header">
                <p class="h5">Verify Referral</p>
              </div>
              <div class="form-group col-md-12">
                <input
                  type="text"
                  class="form-control"
                  v-model="searchkey"
                  placeholder="Enrollee ID"
                />
              </div>

              <div class="form-group col-md-12">
                <button
                  type="button"
                  class="btn btn-info btn-block"
                  @click="verifyRef"
                >
                  Verify Referral
                </button>
              </div>
            </div>
          </div>

          <div class="row list">
            <div class="col-md-12">
              <!-- <button
                style="margin-top: 10px"
                class="btn btn-outline-success float-left"
              >
                {{ referrals.meta.total }} Referrals
              </button> -->

              <button
                style="margin-top: 10px"
                class="btn btn-outline-info float-right"
              >
                <download-excel
                  :data="referrals.data"
                  :fields="json_fields"
                  type="csv"
                  :escapeCsv="false"
                  :name="'referrals_data' + '.csv'"
                >
                </download-excel>
              </button>
            </div>
            <div class="col-md-12 m-b-30">
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Referring HCP</th>
                      <th>Recipient HCP</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ref in referrals.data" v-bind:key="ref.id">
                      <td>
                        <router-link
                          :to="{ path: '/authorization-code/' + ref.id }"
                        >
                          {{
                            ref.date_requested | moment("dddd, MMMM Do YYYY")
                          }}
                        </router-link>
                      </td>
                      <td>{{ ref.provider.agency_name }}</td>
                      <td>{{ ref.recipientfacility.agency_name }}</td>
                      <td>
                        <span>
                          <button
                            type="button"
                            class="btn  mr-2 badge badge-soft-info"
                          >
                            {{ ref.status }}
                          </button>

                          <button
                            class="btn badge badge-soft-dark"
                          >
                            {{ ref.code_usage }}
                          </button>

                          <button
                            class="btn btn-outline-info btn-sm m-1"
                            @click="copyCode(ref)"
                          >
                            {{ ref.code_created }} <i class="fe fe-copy"></i>
                          </button>
                        </span>

                        <span v-if="ref.status == 'pending'">
                          <button
                            type="button"
                            class="btn m-b-15 m-1 badge badge-soft-warning"
                          >
                            pending
                          </button>
                        </span>
                        <span v-if="ref.status == 'rejected'">
                          <button
                            type="button"
                            class="btn m-b-15 m-1 badge badge-soft-danger"
                          >
                            rejected
                          </button>
                        </span>
                      </td>
                      <td>
                        <router-link
                          :to="{ path: '/authorization-code/' + ref.id }"
                        >
                          <button
                            type="button"
                            name="button"
                            class="btn btn-outline-info"
                          >
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
                        :total-rows="referrals.meta.total"
                        :per-page="referrals.meta.per_page"
                        aria-controls="my-table"
                        @input="getReferrals(currentPage ? currentPage : 1)"
                      ></b-pagination>
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
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      searchkey: "",
      referrals: {
        meta: {
          total: 0,
        },
      },
      provider_referral_category: "secondary",
      edit: false,
      show: false,
      showsearch: false,
      isLoading: false,
      fullPage: true,
      buttoncolor: {
        informal: "btn btn-info",
        formal: "btn btn-default",
      },
      json_fields: {
        "Patient Name": "client.full_name",
        "Patient Phone Number": "client.phone_number",
        "Reffering Facility": "referring.agency_name",
        "Receiving Facility": "referred.agency_name",
        Diagnosis: "diagnosis.name",
        "Date Created": "created_at",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      current_page: 1,
      rows: "1",
      perPage: 15,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    showPrimary() {
      this.provider_referral_category = "primary";
      this.buttoncolor.formal = "btn btn-info";
      this.buttoncolor.informal = "btn btn-default";
      this.getReferrals();
    },
    showSecondary() {
      this.provider_referral_category = "secondary";
      this.buttoncolor.informal = "btn btn-info";
      this.buttoncolor.formal = "btn btn-default";
      this.getReferrals();
    },
    getReferrals(currentPage) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      if (this.user.type == "shis" || this.user.type == "employee") {
        this.axios
          .get(`/api/v1/auth/referrals-agency/439078`)
          .then((response) => {
            this.referrals = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            this.isLoading = false;
            console.error(error);
          });
      }
      if (this.user.type == "provider") {
        this.axios
          .get(
            `/api/v1/auth/referrals-${this.provider_referral_category}/${this.user.id}`
          )
          .then((response) => {
            this.referrals = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.user.type == "provider_employee") {
        this.axios
          .get(
            `/api/v1/auth/referrals-${this.provider_referral_category}/${this.user.institutional_id}`,
            {
              params:{
                page: currentPage,
              }
            }
          )
          .then((response) => {
            this.referrals = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    verifyRef() {
      this.axios
        .post(`/api/v1/auth/verifyReferal`, { searchkey: this.searchkey })
        .then((response) => {
          this.referrals = response.data;
          console.log(response);
          this.isLoading = false;
          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    copyCode(ref) {
      const copyToClipboard = (text) => navigator.clipboard.writeText(text);
      copyToClipboard(ref.code_created);
      this.$toasted.info("Copied to clipboard", {
        position: "top-center",
        duration: 3000,
      });
    },

  },
  created() {
    this.getReferrals();
  },
};
</script>
