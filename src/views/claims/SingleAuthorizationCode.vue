<template>
  <div class="sidebar-pinned">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>
              <h3 class="h5">Authorization Code Details</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <div class="form-group">
                    <button
                      class="btn btn-outline-success spacer"
                      @click="printMe"
                    >
                      Print <i class="fe fe-printer"></i>
                    </button>

                    <router-link :to="`/encounter/${auth_code.encounter.id}`">
                      <button
                        type="button"
                        class="btn btn-outline-success spacer"
                      >
                        view encounter details
                      </button>
                    </router-link>

                    <button
                      class="btn btn-outline-success spacer"
                      @click="runCheckerForCode"
                      v-if="
                        (auth_code.status != 'approved' &&
                          user.type == 'employee') ||
                        user.type == 'shis'
                      "
                    >
                      Generate Authorization Code <i class="fe fe-lock"></i>
                    </button>

                    <button
                      data-toggle="modal"
                      data-target="#slideRightModalAll"
                      class="btn spacer btn-outline-success"
                    >
                      Services <i class="fe fe-thermometer"> </i>
                    </button>

                    <button
                      class="btn btn-danger spacer"
                      @click="rejectRef"
                      v-if="
                        auth_code.status != 'approved' &&
                        auth_code.status != 'rejected' &&
                        (user.type == 'employee' || user.type == 'shis')
                      "
                    >
                      reject <i class="fe fe-x"></i>
                    </button>

                    <!-- <button
                      class="btn btn-dark spacer"
                      @click="inProgress"
                      v-if="
                        auth_code.status == 'pending' &&
                        auth_code.status != 'rejected' &&
                        (user.type == 'employee' || user.type == 'shis')
                      "
                    >
                      mark as in-progess
                    </button> -->

                    <button
                      class="btn btn-outline-success btn-sm spacer"
                      v-if="auth_code.code_created != null"
                      @click="copyCode"
                    >
                      {{ auth_code.code_created }} <i class="fe fe-copy"></i>
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <div class="form-group col-md-12" v-show="show">
                    <label for="inputAddress">Please leave a Comment</label>
                    <textarea
                      name="name"
                      rows="5"
                      cols="80"
                      class="form-control"
                      v-model="body"
                    ></textarea>
                    <button
                      type="button"
                      class="btn btn-success mt-4"
                      @click="addComment"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div class="card-body" id="printDiv" ref="printNow">
                  <div class="form-group col-md-12">
                    <div class="card-header">
                      <p class="h4">
                        <strong
                          >Authorization Code Details <i class="fe fe-user"></i
                        ></strong>
                      </p>
                    </div>

                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <p class="h5">
                            <span class="text-success">Full Name: </span>
                            <router-link
                              v-if="auth_code.enrollee != null"
                              :to="{
                                path: '/patient/' + auth_code.enrollee.id,
                                params: {},
                              }"
                            >
                              {{ auth_code.enrollee.full_name }}
                            </router-link>
                          </p>
                          <p class="h5" v-if="auth_code.enrollee != null">
                            <span class="text-success">Phone Number:</span>
                            {{ auth_code.enrollee.phone_number }}
                          </p>
                          <p class="h5" v-if="auth_code.enrollee != null">
                            <span class="text-success">O'HIS Number:</span>
                            {{ auth_code.enrollee.id_card_number }}
                          </p>
                          <p class="h5" v-if="auth_code.enrollee != null">
                            <span class="text-success">Gender:</span>
                            {{ auth_code.enrollee.gender }}
                          </p>

                          <p class="h5" v-if="auth_code.enrollee != null">
                            <span class="text-success">Date of Birth:</span>
                            {{ auth_code.enrollee.dob }}
                          </p>

                          <p class="h5" v-if="auth_code.provider != null">
                            <span class="text-success"
                              >Primary/Referring Facilty:</span
                            >
                            {{ auth_code.provider.agency_name }}
                          </p>

                          <p class="h6">
                            <span class="text-success"
                              >Is Intra-Referral :</span
                            >
                            <span
                              v-if="
                                auth_code.provider_id ===
                                auth_code.referred_to_facility
                              "
                            >
                              Intra - Referred Case</span
                            >
                            <span v-else>None Intra referral</span>
                          </p>

                          <br />
                        </div>

                        <div class="col-md-6">
                          <p class="h5">
                            <span class="text-success"
                              >Secondary Facility:</span
                            >
                            {{ auth_code.recipientfacility.agency_name }}
                          </p>

                          <p class="h5">
                            <span class="text-success">Diagnosis:</span>
                            {{ auth_code.encounter.diagnosis.name }}
                          </p>
                          <p class="h5">
                            <span class="text-success">Prepared by:</span>
                            {{ auth_code.creator.full_name }}
                          </p>
                          <p class="h5">
                            <span class="text-success">Date Prepared:</span>
                            {{ auth_code.created_at }}
                          </p>
                          <!-- <p class="h5">
                            <span class="text-success">TPA/HMO:</span>
                            {{ auth_code.tpa.organization_name }}
                          </p> -->
                          <p class="h5">
                            <span class="text-success"
                              >Requesting Officer:</span
                            >
                            {{ auth_code.creator.full_name }}
                          </p>

                          <p class="">
                            <span class="h5 text-success">Requested at:</span>

                            <span class="h5">
                              {{
                                auth_code.created_at
                                  | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                              }}
                            </span>
                            <span class="text-primary">
                              {{ auth_code.created_at | moment("from", "now") }}
                            </span>
                          </p>

                          <p class="h5">
                            <span class="text-success">Expiry Date:</span>
                            {{
                              auth_code.expiry_date
                                | moment("dddd, MMMM Do YYYY")
                            }}
                          </p>
                        </div>
                        <hr />

                        <div class="col-md-12">
                          <span v-if="auth_code.status == 'approved'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                            >
                              approved
                            </button>
                          </span>

                          <span v-if="auth_code.status == 'rejected'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger"
                            >
                              rejected
                            </button>
                          </span>

                          <span v-if="auth_code.status == 'pending'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning spacer"
                            >
                              pending
                            </button>
                          </span>
                          <span v-if="auth_code.status == 'in-progress'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark spacer"
                            >
                              in-progress
                            </button>
                          </span>

                          <button
                            class="btn m-b-15 ml-2 badge badge-soft-secondary"
                          >
                            {{ auth_code.code_usage }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <p class="h4">Authorization Code History</p>
                </div>

                <div class="card-body">
                  <div class="col-lg-8 m-b-30">
                    <div class="card">
                      <div class="card-header">
                        <div class="card-title">Timeline</div>
                      </div>
                      <div class="card-body">
                        <div class="timeline">
                          <div
                            class="timeline-item"
                            v-for="auth_code in referrals.data"
                            v-bind:key="auth_code.id"
                          >
                            <div class="timeline-wrapper">
                              <div class="">
                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'in-progress'"
                                >
                                  <div
                                    class="avatar-title bg-primary rounded-circle"
                                  >
                                    <i class="mdi mdi-magnet"></i>
                                  </div>
                                </div>
                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'rejected'"
                                >
                                  <div
                                    class="avatar-title bg-danger rounded-circle"
                                  >
                                    <i class="mdi mdi-alert-circle-outline"></i>
                                  </div>
                                </div>

                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'pending'"
                                >
                                  <div
                                    class="avatar-title bg-warning rounded-circle"
                                  >
                                    <i class="fe fe-book-open"></i>
                                  </div>
                                </div>

                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'approved'"
                                >
                                  <div
                                    class="avatar-title bg-success rounded-circle"
                                  >
                                    <i class="mdi mdi-check-all"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto">
                                <h6 class="m-0">
                                  <router-link
                                    :to="`/authorization-code/${auth_code.id}`"
                                  >
                                    {{
                                      auth_code.encounter.healthrecord
                                        .encounter_id
                                    }}
                                    ({{ auth_code.encounter.diagnosis.name }})
                                  </router-link>
                                </h6>
                                <button
                                  v-if="auth_code.id == $route.params.id"
                                  class="btn mx-2 badge badge-soft-default"
                                >
                                  <i class="fe fe-droplet"></i>
                                </button>
                                <button
                                  v-if="auth_code.code_created != null"
                                  class="btn mx-2 badge badge-soft-success spacer"
                                >
                                  {{ auth_code.code_created }}
                                </button>
                                <a
                                  :href="`/authorization-code/${auth_code.id}`"
                                  class="btn mx-2 badge badge-soft-dark spacer"
                                >
                                  <i class="fe fe-eye"></i>
                                </a>
                              </div>
                              <div class="ml-auto col-auto text-muted">
                                {{
                                  auth_code.created_at | moment("from", "now")
                                }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <p class="h4">Comments</p>
                </div>

                <div class="card-body">
                  <div class="col-lg-8 m-b-30">
                    <div
                      class="card bg-default"
                      v-for="comment in auth_code.comments"
                      v-bind:key="comment.id"
                      style="margin-top: 10px"
                    >
                      <div class="card-body">
                        <p class="">
                          {{ comment.body }}
                        </p>
                        <p class="text-success">
                          By: {{ comment.user.full_name }}
                          -
                          <span>{{ comment.user.type }}</span>
                        </p>
                        <p class="text-xs">
                          {{
                            comment.created_at
                              | moment("dddd, MMMM Do YYYY,  h:mm:ss a")
                          }}
                        </p>
                      </div>
                    </div>
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

      <!--Approval Modal -->
      <div
        class="modal fade modal-slide-right"
        id="slideRightModalAll"
        tabindex="-1"
        role="dialog"
        aria-labelledby="slideRightModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content" id="printDiv" ref="printNow">
            <div class="modal-header">
              <h5 class="modal-title h5" id="slideRightModalLabel">
                 Services for this Request
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form @submit.prevent="addServiceRendered"
              v-if="user.type == 'employee' || user.type == 'shis'"
              >
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Select Service </label>
                    <v-select
                      v-model="service.service_id"
                      label="description"
                      :required="!service.service_id"
                      :options="services.data"
                    />
                  </div>

                  <!-- <div class="form-group col-md-6" v-if="type == 'Drug'">
                        <label for="inputPassword4">Select Drug </label>
                        <v-select
                          v-model="service.drug_id"
                          label="item_data"
                          :required="!addservice.drugs_id"
                          :options="drugs.data"
                        />
                      </div> -->

                  <!-- <div class="form-group col-md-4" v-if="type == 'Drug'">
                        <label for="inputCity">Dose</label>
                        <input
                          type="text"
                          class="form-control"
                          required
                          placeholder="1"
                          v-model="service.dose"
                        />
                      </div> -->

                  <div class="form-group col-md-6">
                    <label for="inputCity">Frequency </label>
                    <input
                      type="number"
                      min="1"
                      class="form-control"
                      required
                      placeholder="freq"
                      v-model="service.frequency"
                    />

                    <!-- <select
                          class="form-control"
                          v-model="service.frequency"
                        >
                          <option value="1">Daily</option>
                          <option value="2">BD</option>
                          <option value="3">TDS</option>
                          <option value="4">QDS</option>
                        </select> -->
                    <p class="text-dark">number of times in a day</p>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputCity">Duration (Days) </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      class="form-control"
                      required
                      placeholder="Qty"
                      v-model="service.days"
                    />
                    <p class="text-dark">number of days</p>
                  </div>
                </div>
                <div class="col-md-12">
                  <button class="btn btn-success btn-block my-6">
                    <i class="fe fe-send"></i> Add
                  </button>
                </div>
              </form>

              <br />

              <div class="col-md-12 m-b-30">
                <h5>
                  <i class="fe fe-activity"></i> Approved Services
                  <i class="fe fe-thermometer"></i>
                </h5>
                <div class="table-responsive">
                  <table class="table align-td-middle table-card">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Frequency</th>
                        <th>Days</th>
                        <th>Action</th>
                        <!-- <th>Unit Cost</th> -->
                        <!-- <th>Total Cost</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(service, index) in auth_code.services"
                        v-bind:key="service.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <span v-if="service.service != null">{{
                            service.service.description
                          }}</span>
                        </td>
                        <td>{{ service.frequency }}</td>
                        <td>{{ service.days }}</td>

                        <!-- <td>
                          &#8358;
                          <span v-if="service.service != null">{{
                            service.service.price
                          }}</span>
                        </td> -->
                        <!-- <td>&#8358;{{ service.cost | numeral(0, 0) }}</td> -->

                        <td>
                          <button
                          v-if="user.type == 'employee' || user.type == 'shis'"

                            class="btn btn-danger"
                            name="button"
                            @click="deleteService(service)"
                          >
                            <i class="fe fe-delete"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--End of Modal -->
    </main>
  </div>
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
      services: [],
      service: {
        frequency: 1,
        days: 1,
      },
      auth_code: "",
      encounter: "",
      shownotes: false,
      facility: "",
      clientdetail: "",
      referrals: "",
      body: "",
      show: true,
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getCode() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/single_authorization_code/${this.$route.params.id}`)
        .then((response) => {
          this.auth_code = response.data;
          let patient_id = this.auth_code.enrollee.id;

          this.getReferralPatient(patient_id);

          console.log(response);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = true;
        });
    },
    getReferralPatient(patient_id) {
      this.isLoading = true;
      this.axios
        .get(`/api/v1/auth/referrals-patient/${patient_id}`, {
          params: {
            user_type: this.auth_code.enrollee.account_type,
          },
        })
        .then((response) => {
          console.log(response);
          this.referrals = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
        });
    },

    addComment() {
      this.axios
        .post(`/api/v1/auth/addComment/referral`, {
          // user_id: this.user.id,
          authorization_code_id: this.$route.params.id,
          body: this.body,
        })
        .then((response) => {
          console.log(response);
          this.getCode();
          this.show = false;
          this.$toasted.info("added Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    // sendSMS() {
    //   this.isLoading = true;
    //   let message = `your code requested is successful. Go to https://app.oshia.ng/authorization-code  `;
    //   this.axios
    //     .post(
    //       `https://api.bulksmslive.com/v2/app/sms?email=faisalnas7@gmail.com&password=skrull123&sender_name=OHIS&message=${message}&recipients=${this.auth_code.creator.phone_number}`,
    //       {}
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       let reply = response.data.msg;
    //       this.clearIt();
    //       this.isLoading = false;
    //       this.$toasted.info(`${reply}`, {
    //         position: "top-center",
    //         duration: 3000,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // },

    rejectRef() {
      if (confirm("Are you sure you want to reject this request?")) {
        this.axios
          .post(`/api/v1/auth/updateCodeRequestStatus`, {
            id: this.auth_code.id,
            status: "rejected",
          })
          .then((response) => {
            console.log(response);
            this.show = true;
            this.getCode();
            this.$toasted.info("Rejected Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },

    inProgress() {
      if (confirm("Are you sure you want to update this request?")) {
        this.axios
          .post(`/api/v1/auth/updateCodeRequestStatus`, {
            id: this.auth_code.id,
            status: "in-progress",
          })
          .then((response) => {
            console.log(response);
            // this.show = true;
            this.getCode();
            this.$toasted.info("Updated Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },

    runCheckerForCode() {
      if (this.auth_code.services.length < 1) {
        this.$toasted.error("Add atleast 1 service to Approve!", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        this.generateCode();
      }
    },

    generateCode() {
      if (confirm("Are you sure you want to Approve?")) {
        this.axios
          .post(`/api/v1/auth/generateCode`, {
            id: this.auth_code.id,
            expiry_days: 2,
          })
          .then((response) => {
            this.getCode();
            // this.sendSMS();
            console.log(response);
            this.$toasted.info("Generated Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    verifyRef() {
      if (
        confirm(
          "Are you sure you want to generate authorization code to approve?"
        )
      ) {
        this.axios
          .post(`/api/v1/auth/generate-token/${this.$route.params.id}`, {
            type: "approval",
          })
          .then((response) => {
            console.log(response);
            this.getCode();
            this.$router.push(`/all-referrals`);
            this.$toasted.info("Approved Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },

    copyCode() {
      const copyToClipboard = (text) => navigator.clipboard.writeText(text);
      copyToClipboard(this.auth_code.code_created);
      this.$toasted.info("Copied to clipboard", {
        position: "top-center",
        duration: 3000,
      });
    },
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },

    getServices() {
      this.axios
        .get(`/api/v1/auth/service-agency/95930`)
        .then((response) => {
          this.services = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addServiceRendered() {
      this.user = JSON.parse(localStorage.getItem("user"));
      // Add claim_service
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/authorization_code/add_service", {
          service_id: this.service.service_id.id,
          user_id: this.user.id,
          authorizationcode_id: this.$route.params.id,
          dose: this.service.dose,
          frequency: this.service.frequency,
          days: this.service.days,
        })

        .then((response) => {
          console.log(response);
          this.getCode();
          this.isLoading = false;
          this.$breadstick.notify("Added Successfully!", {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteService(service) {
      if (confirm("Are you want you want to delete?")) {
        this.axios
          .delete(
            `/api/v1/auth/authorization_code/delete_service/${service.id}`
          )
          .then((response) => {
            console.log(response);
            this.getCode();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created() {
    this.getCode();
    this.getServices();
  },
};
</script>
<style scoped>
.spacer {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
