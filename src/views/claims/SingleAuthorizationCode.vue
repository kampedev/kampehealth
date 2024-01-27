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
                      @click="generateCode"
                      v-if="
                        (auth_code.status != 'approved' &&
                          user.type == 'employee') ||
                          user.type == 'shis'
                      "
                    >
                      Generate Authorization Code <i class="fe fe-lock"></i>
                    </button>

                    <button
                      class="btn btn-danger spacer"
                      @click="rejectRef"
                      v-if="
                        auth_code.status != 'approved' &&
                          auth_code.status != 'rejected' &&
                          (user.type == 'tpa' || user.type == 'tpa_employee')
                      "
                    >
                      reject <i class="fe fe-x"></i>
                    </button>

                    <button
                      class="btn btn-dark spacer"
                      @click="inProgress"
                      v-if="
                        auth_code.status == 'pending' &&
                          auth_code.status != 'rejected' &&
                          (user.type == 'tpa' || user.type == 'tpa_employee')
                      "
                    >
                      mark as in-progess
                    </button>

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
                    <label for="inputAddress"
                      >Please leave a Comment</label
                    >
                    <textarea
                      name="name"
                      rows="5"
                      cols="80"
                      class="form-control"
                      v-model="body"
                    ></textarea>
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="addComment"
                    >
                      submit
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
                              :to="{
                                path: '/patient/' + auth_code.enrollee.id,
                                params: {},
                              }"
                            >
                              {{ auth_code.enrollee.firstname }}
                              {{ auth_code.enrollee.lastname }}
                            </router-link>
                          </p>
                          <p class="h5">
                            <span class="text-success">Phone Number:</span>
                            {{ auth_code.enrollee.phone_number }}
                          </p>
                          <p class="h5">
                            <span class="text-success">O'HIS Number:</span>
                            {{ auth_code.enrollee.id_card_number }}
                          </p>
                          <p class="h5">
                            <span class="text-success">Gender:</span>
                            {{ auth_code.enrollee.gender }}
                          </p>

                          <p class="h5">
                            <span class="text-success">Date of Birth:</span>
                            {{ auth_code.enrollee.dob }}
                          </p>

                          <p class="h5">
                            <span class="text-success"
                              >Primary/Referring Facilty:</span
                            >
                            {{ auth_code.provider.agency_name }}
                          </p>

                           <p class="h6">
                            <span class="text-success"
                              >Is Intra-Referral :</span
                            >
                            <span v-if="auth_code.provider_id === auth_code.referred_to_facility"> Intra - Referred Case</span>  
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
                            {{ auth_code.creator.firstname }}
                            {{ auth_code.creator.lastname }}
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
                            <span class="h5 text-success"
                              >Requested at:</span
                            >  
                          
                           <span class="h5">  {{ auth_code.created_at  | moment("dddd, MMMM Do YYYY, h:mm:ss a") }} </span>
                           <span class="text-primary" > {{ auth_code.created_at  | moment("from", "now") }} </span> 
                          </p>

                           <p class="h5">
                            <span class="text-success"
                              >Expiry Date:</span
                            >
                            {{ auth_code.expiry_date  | moment("dddd, MMMM Do YYYY")}}
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
                            v-if="auth_code.is_code_used == true"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-secondary spacer"
                          >
                            code used
                          </button>
                          <button
                            v-if="auth_code.is_code_used == false"
                            class="btn m-b-15 ml-2 mr-2 badgebadge-soft-secondary spacer"
                          >
                            code not used yet
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

                        <!-- <div class="card-controls">
                          <select class="custom-select">
                            <option value="">Everything</option>
                            <option value="">Charges</option>
                            <option value="">Upgrades</option>
                          </select>
                        </div> -->
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
                                  <router-link :to="`/authorization-code/${auth_code.id}`">
                                   {{auth_code.encounter.healthrecord.encounter_id}}
                                   </router-link>
                                   </h6>
                                <button
                                  v-if="auth_code.code_created != null"
                                  class="btn m-b-15 ml-2 mr-2 badge badge-soft-secondary spacer"
                                >
                                  {{auth_code.code_created}}
                                </button>
                              </div>
                              <div class="ml-auto col-auto text-muted">
                                {{auth_code.date_requested}}
                              </div>
                            </div>
                          </div>
                        
                         
                        

                          <div class="timeline-item">
                            <div class="timeline-wrapper">
                              <div class="">
                                <div class="avatar avatar-sm">
                                  <div
                                    class="avatar-title bg-success rounded-circle"
                                  >
                                    <i class="mdi mdi-account-circle"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto">
                                <h6 class="m-0">Enrolled on</h6>
                              </div>
                              <div class="ml-auto col-auto text-muted">
                               {{auth_code.patient.created_at}}
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
                        By: {{ comment.user.firstname }}
                        {{ comment.user.lastname }} -
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
      auth_code: "",
      encounter: "",
      shownotes: false,
      facility: "",
      clientdetail: "",
      referrals: "",
      body: "",
      show: false,
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
          let patient_id = response.data.enrollee.id;

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
        .get(`/api/v1/auth/referrals-patient/${patient_id}`)
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
          // this.$router.push(`/all-referrals`);
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

    generateCode() {
      if (confirm("Are you sure you want to Approve?")) {
        this.axios
          .post(`/api/v1/auth/generateCode`, {
            id: this.auth_code.id,
            expiry_days: 90,
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
  },
  created() {
    this.getCode();
  },
};
</script>
<style scoped>
.spacer {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
