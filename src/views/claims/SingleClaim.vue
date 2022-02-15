<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <div>
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>
              <h3 class="h5">Claim Details</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-header"></div>

                <div class="card-body">
                  <div class="form-group">
                    <button
                      class="btn btn-success spacer"
                      @click="approveClaim"
                      v-if="
                        (claimdetails.status != 1 && user.type == 'shis') ||
                        user.institutional_id == 95930
                      "
                    >
                      Approve <i class="fe fe-check"></i>
                    </button>

                    <button
                      class="btn btn-outline-success spacer"
                      @click="show = !show"
                    >
                      Add Note <i class="fe fe-plus"></i>
                    </button>

                    <button
                      class="btn btn-success spacer"
                      @click="verifyClaim"
                      v-if="
                        claimdetails.status == null &&
                          
                         ( user.type == 'tpa' ||
                        user.type == 'tpa_employee')
                      "
                    >
                      mark as vetted <i class="fe fe-check"></i>
                    </button>

                    <router-link
                      :to="{ path: '/edit-claim/' + claimdetails.id }"
                    >
                      <button
                        class="btn btn-warning spacer"
                        v-if="
                          claimdetails.status == 0 && user.type == 'provider_employee'
                        "
                      >
                        Update Claim Application
                      </button>
                    </router-link>

                    <button
                      class="btn btn-outline-success spacer"
                      @click="shownotes = !shownotes"
                    >
                      Notes {{comments.length}} <i class="fe fe-clipboard"></i>
                    </button>

                    <router-link
                      :to="{ path: '/upload-claims-docs/' + claimdetails.id }"
                    >
                      <button
                        class="btn btn-outline-success spacer"
                        v-if="claimdetails.status != 1"
                      >
                        Documents  {{singleclaim.docs.length}} <i class="fe fe-file-plus"></i>
                      </button>
                    </router-link>

                    <router-link
                      :to="{
                        path: '/service-processing-form/' + claimdetails.id,
                      }"
                    >
                      <button
                        class="btn btn-outline-success spacer"
                        v-if="claimdetails.status != 1"
                      >
                        Services <i class="fe fe-thermometer"></i>
                      </button>
                    </router-link>

                    <button
                      class="btn btn-danger"
                      style="margin-left: 10px"
                      @click="rejectClaim"
                      v-if="
                        claimdetails.status != 0 &&
                        
                          (user.type == 'shis' ||
                        user.type == 'tpa' ||
                        user.type == 'tpa_employee')
                      "
                    >
                      <i class="fe fe-x"></i> Reject
                    </button>

                    <div class="form-group col-md-12" v-show="show">
                      <label for="inputAddress">Please add a Comment</label>
                      <textarea
                        name="name"
                        rows="5"
                        cols="80"
                        class="form-control"
                        v-model="body"
                      ></textarea>
                      <br />

                      <div class="form-group">
                        <button
                          type="button"
                          class="btn btn-success"
                          @click="addComment"
                        >
                          submit <i class="fe fe-send"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-md-8" v-show="shownotes">
              <div class="card m-b-30">
                <div class="card-body">
                  <div
                    class="card bg-default"
                    v-for="comment in comments"
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

            <div class="col-lg-8 col-md-8">
              <div class="card m-b-30">
                <div class="card-header">
                  <p>
                    <strong
                      >Services/Drugs <i class="fe fe-thermometer"></i
                    ></strong>
                  </p>
                </div>

                <div class="card-body">
                  <p class="h3">Claim Summary:</p>
                  <p>{{ claimdetails.treatment }}</p>
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(service, index) in singleclaim.services"
                          v-bind:key="service.id"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>
                            <span v-if="service.service != null">{{
                              service.service.description
                            }}</span>
                            <span v-if="service.drugs_id != null">{{
                              service.drug.drug_name
                            }}</span>
                          </td>
                          <td>&#8358;{{ service.cost | numeral(0, 0) }}</td>
                        </tr>

                        <tr>
                          <td><strong>Total Fee</strong></td>
                          <td>
                            <strong
                              >&#8358;{{
                                singleclaim.sum | numeral(0, 0)
                              }}</strong
                            >
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
                  <strong class="h4">Other Details</strong>
                </div>

                <div class="card-body">
                  <p>
                    <span v-if="claimdetails.status == 1">
                      <button
                        type="button"
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                      >
                        approved
                      </button>
                    </span>
                    <span v-if="claimdetails.status == 0">
                      <button
                        type="button"
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger"
                      >
                        rejected
                      </button>
                    </span>
                    <span v-if="claimdetails.status == null">
                      <button
                        type="button"
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                      >
                        pending
                      </button>
                    </span>
                    <span v-if="claimdetails.verified_by_id != null">
                      <button
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                      >
                        vetted
                      </button>
                    </span>
                  </p>

                  <!-- <div class="card bg-success" v-if="claimdetails.status == 0">
                                    <div class="card-body">
                                      <p class="text-white"> <strong>Rejection Note:</strong>
                                        {{comment.body}}
                                      </p>
                                    </div>
                                 </div> -->

                  <p>
                    <strong>Health Facility:</strong> {{ claimdetails.provider.agency_name }}
                  </p>
                  <br />
                  <p>
                    <strong>Prepared by:</strong> {{ prepared_by.firstname }}
                    {{ prepared_by.lastname }}
                  </p>
                  <br />
                  <p>
                    <strong>Enrollee/ Patient Name:</strong>
                    {{ claimdetails.patient.firstname }} {{ claimdetails.patient.lastname }}
                  </p>
                  <br />
                  <p>
                    <strong>Enrollee/ Patient O'HIS Number:</strong>
                    {{ claimdetails.patient.id_card_number }}
                  </p>
                  <br />
                  <p>
                    <strong>HMO/TPA:</strong>
                    {{ claimdetails.tpa.organization_name }}
                  </p>
                  <br />
                  <p>
                    <strong>Date Seen:</strong> {{ claimdetails.seen_date }}
                  </p>
                  <br />
                  <p>
                    <strong>Diagnosis:</strong>
                    {{ claimdetails.diagnosis.name }}
                  </p>
                  <br />
                  <p v-if="claimdetails.verified_by_id != null">
                    <strong>Vetted By:</strong>
                    {{ claimdetails.verfieduser.firstname }}
                    {{ claimdetails.verfieduser.lastname }}
                  </p>
                  <br />
                  <p v-if="claimdetails.approved_by_id != null">
                    <strong v-if="claimdetails.verified_by_id != null"
                      >Approved By:</strong
                    >
                    {{ claimdetails.approveduser.firstname }}
                    {{ claimdetails.approveduser.lastname }}
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-md-8">
              <div class="card m-b-30">
                <div class="card-header">
                  <p>
                    <strong>Claim Documents <i class="fe fe-file"></i></strong>
                  </p>
                </div>

                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Uploaded By</th>
                          <th>Date Uploaded</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(doc, index) in singleclaim.docs"
                          v-bind:key="doc.id"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ doc.name }}</td>
                          <td>
                            {{ doc.user.firstname }} {{ doc.user.lastname }}
                          </td>
                          <td>{{ doc.created_at }}</td>
                          <td>
                            <a
                              :href="
                                'https://api.hayokinsurance.com/documents/' +
                                doc.document
                              "
                              target="_blank"
                            >
                              <button
                                class="btn btn-outline-success"
                                name="button"
                              >
                                <i class="fe fe-eye"></i>
                              </button>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
    </div>
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
      singleclaim: "",
      comments: "",
      shownotes: false,
      facility: "",
      clientdetail: "",
      body: "",
      claimdetails: "",
      prepared_by: "",
      show: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    //
  },
  methods: {
    getClaim() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
        .then((response) => {
          this.singleclaim = response.data;
          this.comments = response.data.comments;
          this.claimdetails = response.data.singleclaim[0];

          // Prepared by
          this.axios
            .get(
              `/api/v1/auth/user/zam/${response.data.singleclaim[0].user_id}`
            )
            .then((response) => {
              this.prepared_by = response.data.user;
              console.log(response);
            });
          //end of Prepared by
         
          console.log(response);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = true;
        });
    },

    addComment() {
      this.axios
        .post(`/api/v1/auth/addComment`, {
          user_id: this.user.id,
          claim_id: this.$route.params.id,
          body: this.body,
        })
        .then((response) => {
          console.log(response);
          this.getClaim();
          this.show = false;
          this.$toasted.info("updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    approveClaim() {
      if (confirm("Are you sure you want to approve?")) {
        this.axios
          .post(`/api/v1/auth/acceptClaim/${this.$route.params.id}`)
          .then((response) => {
            console.log(response);
             this.$router.push(`/all-claims`)
            this.getClaim();
            this.$toasted.info("updated Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    verifyClaim() {
      if (confirm("Are you sure you want to mark as vetted?")) {
        this.axios
          .post(`/api/v1/auth/verify-claims/${this.$route.params.id}`)
          .then((response) => {
            console.log(response);
             this.$router.push(`/all-claims`)
            this.getClaim();
            this.$toasted.info("vetted Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    rejectClaim() {
      if (confirm("Are you sure you want to reject?")) {
        this.axios
          .post(`/api/v1/auth/rejectClaim/${this.$route.params.id}`)
           this.$router.push(`/all-claims`)
          .then((response) => {
            console.log(response);
            // this.getClaim()
            this.show = true;
          });
      }
    },
  },
  created() {
    this.getClaim();
  },
};
</script>
<style scoped >
.spacer {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
