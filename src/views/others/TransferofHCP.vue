<template>
  <section class="admin-content " id="contact-search">
    <Navbar />

    <div class="bg-dark m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar ">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <h3 class="h4">All Transfer Requests</h3>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="container">
        <div class="col-md-12 card">
          <div class="card-header"></div>

          <div class="card-body">
            <button class="btn btn-outline-info spacer-side" @click="getPending">Pending</button>
            <button class="btn btn-outline-success spacer-side"  @click="getApproved" v-if="user.user_role != '0' ">Approved</button>
            <button class="btn btn-outline-danger spacer-side"  @click="getRejected"  v-if="user.user_role != '0' ">Rejected</button>
          </div>
        </div>

        <div class="row">
          <div :class="card_style">
            <div class="card">
              <div class="card card-header">
                <p class="h4">
                  <!-- Request(s) -->
                  <i class="mdi mdi-bank-transfer"></i>
                </p>
              </div>
              <div class="card card-body">
                <div class="table-responsive">
                  <table class="table align-td-middle table-card">
                    <thead>
                      <tr>
                        <!-- <th>Date</th> -->
                        <th>Patient Name</th>
                        <th>Current facility</th>
                        <th>Proposed (New) Facility</th>
                        <th>Reason for Change</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="trf in transfers" v-bind:key="trf.id">
                      

                        <td>
                          <span v-if="trf.client != null">
                            {{ trf.client.firstname }} {{ trf.client.lastname }}
                          </span>
                        </td>
                        <td>{{ trf.oldfacility.agency_name }}</td>
                        <td>{{ trf.newfacility.agency_name }}</td>
                        <td>
                          {{ trf.reason_for_change }}
                        </td>

                        <td>
                          <span v-if="trf.status == 'approved'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                            >
                              approved
                            </button>
                          </span>
                          <span v-if="trf.status == 'declined'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger"
                            >
                              declined
                            </button>
                          </span>
                          <span v-if="trf.status == 'created'">
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                            >
                              pending
                            </button>
                          </span>
                        </td>
                        <td>
                          <div class="btn-group CTAs">
                            <button
                              type="button"
                              class="btn btn-outline-primary dropdown-toggle"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="fe fe-edit"></i>
                            </button>
                            <div class="dropdown-menu">
                              <button
                                class="btn btn-success  "
                                href="#"
                                @click="updateRequestA(trf)"
                              >
                                Approve
                                <i class="fe fe-check"></i>
                              </button>
                              <div class="dropdown-divider"></div>
                              <button
                                class="btn btn-danger"
                                href="#"
                                @click="updateRequestR(trf)"
                              >
                                Decline
                                <i class="fe fe-x"></i>
                              </button>
                              <!-- <div class="dropdown-divider"></div> -->
                              <!-- <a
                                class="dropdown-item"
                                href="#"
                                @click="updateprice_vet = true"
                                v-if="
                                  user.type == 'tpa' ||
                                    user.type == 'tpa_employee'
                                "
                                >update price</a
                              >
                              <div class="dropdown-divider"></div>
                              <a
                                class="dropdown-item"
                                href="#"
                                v-if="
                                  user.type == 'shis' || user.type == 'employee'
                                "
                                @click="updateprice_ver = true"
                                >update price</a
                              >
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-info" href="#"
                                >click as applicable</a
                              > -->
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-md-12">
                  <span class="pagination__CTAs">
                    <button
                      class="btn btn-primary next__page"
                      @click="DecreamentPage"
                    >
                      Previous page
                    </button>
                    <p class="currentPage">{{ pageNum }}</p>
                    <button
                      class="btn btn-primary previous__page"
                      @click="IncreamentPage"
                    >
                      Next page
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4" v-if="quickref != ''">
            <div class="card">
              <div class="card card-header">
                <div class="card card-body">
                  <!-- <p class="h4">Request Details</p> -->
                  <p class="h5"><strong>Reason for Referral:</strong></p>

                  <p>{{ quickref.reason_for_change }}</p>
                  <hr />
                  <div
                    class="col-md-12"
                    v-if="user.type == 'shis' || user.user_role != 0"
                  >
                    <button
                      class="btn btn-info spacer"
                      v-if="quickref.status != 'approved'"
                      @click="updateRequestA"
                    >
                      approve <i class="fe fe-check-square"></i>
                    </button>

                    <button
                      class="btn btn-danger spacer"
                      v-if="quickref.status != 'approved'"
                      @click="updateRequestR"
                    >
                      decline <i class="fe fe-x-circle"></i>
                    </button>
                  </div>

                  <div class="row col-md-12">
                    <div class="col-md-6">
                      <p class="text-left">
                        <strong>{{ quickref.status }} </strong>
                      </p>
                    </div>
                    <div class="col-md-6">
                      <p class="text-right">{{ quickref.created_at }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      // editor: ClassicEditor,
      user: null,
      search_result: "",
      enrollee_details: "",
      searchkey: "",
      transfers: "",
      quickref: "",
      status: "created",
      card_style: "col-md-12",
      pageNum: 1,
      edit: false,
      isLoading: false,
      show: false,
      fullPage: true,
      transfer: {
        reason_for_change: "",
        client_id: "",
        new_health_facility: "",
        previous_health_facility: "",
        status: "",
        prepared_by: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    //
  },
  methods: {
    getPending(){
      this.status = 'created';
      this.AllTransfers()
    },
     getApproved(){
      this.status = 'approved';
      this.AllTransfers()
    },
     getRejected(){
      this.status = 'declined';
      this.AllTransfers()
    },
    selected(value) {
      this.transfer.new_health_facility = value;
    },

    clearIt() {
      this.transfer.reason_for_change = "";
      this.transfer.new_health_facility = "";
      this.transfer.previous_health_facility = "";
      this.transfer.status = "";
      this.transfer.prepared_by = "";
    },
    quickView(trf) {
      this.isLoading = true;
      this.card_style = "col-md-8";
      this.axios
        .get(`/api/v1/auth/change_providers/${trf.id}`)
        .then((response) => {
          console.log(response);
          this.quickref = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
        });
    },
    updateRequestA(trf) {
      if (confirm("Are you sure you want to approve this request")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/auth/change_providers/update/${trf.id}`, {
            status: "approved",
          })
          .then((response) => {
            console.log(response);
            this.AllTransfers();
            this.$toasted.success("Updated Successfully", {
              position: "top-center",
              duration: 3000,
            });
            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
          });
      }
    },
    updateRequestR(trf) {
      if (confirm("Are you sure you want to reject?")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/auth/change_providers/update/${trf.id}`, {
            status: "declined",
          })
          .then((response) => {
            console.log(response);
            this.AllTransfers();
            this.isLoading = false;
            this.$toasted.success("Updated Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
          });
      }
    },

    AllTransfers() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/all/change_providers/439078?page=${this.pageNum}&status=${this.status}`)
        .then((response) => {
          this.transfers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    IncreamentPage() {
      this.pageNum = this.pageNum + 1;
      this.AllTransfers();
    },
    DecreamentPage() {
      if (this.pageNum > 1) {
        this.pageNum = this.pageNum - 1;
        this.AllTransfers();
      }
    },
  },
  created() {
    this.AllTransfers();
  },
};
</script>

<style scoped>
.pagination__CTAs {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.currentPage {
  margin: 0 2rem;
  font-weight: 600;
}

.dropdown-menu {
  padding: 1rem;
}
.spacer-side{
  margin-left:3px;
  margin-right:3px;
}
</style>
