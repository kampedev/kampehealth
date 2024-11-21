<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <div>
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>
              <h3 class="h5">Claim: {{ claimdetails.claim_unique_id }}  </h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container" id="printDiv" ref="printNow">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header"></div>

                <div class="card-body">
                  <div class="form-group">
                    <button
                      class="btn btn-warning spacer"
                      @click="verifyClaim"
                      v-if="
                        claimdetails.verified_by_id == null &&
                        user.job_title == 'Claims Verifier'
                      "
                    >
                      revert for vetting <i class="fe fe-check"></i>
                    </button>

                    <button
                      class="btn btn-success spacer"
                      @click="verifyClaim"
                      v-if="
                        claimdetails.verified_by_id == null &&
                        user.job_title == 'Claims Verifier'
                      "
                    >
                      mark as verified <i class="fe fe-check"></i>
                    </button>


                    <router-link
                      :to="`/patient/${claimdetails.enrollee.id}`"
                      v-if="claimdetails.enrollee != null"
                    >
                      <button class="btn btn-outline-success spacer">
                        enrollee records <i class="fe fe-user"></i>
                      </button>
                    </router-link>

                    <button
                      class="btn btn-outline-success spacer"
                      @click="show = !show"
                    >
                      Add Note <i class="fe fe-plus"></i>
                    </button>

                    <button
                      class="btn btn-success spacer"
                      @click="vetClaim"
                      v-if="
                        claimdetails.checked_by_id == null &&
                        user.job_title == 'Claims Vetter'
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
                          claimdetails.status == 0 &&
                          user.type == 'provider_employee'
                        "
                      >
                        Update Claim Application
                      </button>
                    </router-link>

                    <button
                      class="btn btn-outline-success spacer"
                      @click="shownotes = !shownotes"
                    >
                      Notes {{ comments.length }}
                      <i class="fe fe-clipboard"></i>
                    </button>

                    <router-link
                      :to="{ path: '/upload-claims-docs/' + claimdetails.id }"
                    >
                      <button
                        class="btn btn-outline-success spacer"
                        v-if="claimdetails.status != 1"
                      >
                        Documents {{ singleclaim.docs.length }}
                        <i class="fe fe-file-plus"></i>
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

                    <router-link
                      :to="{
                        path: '/encounter/' + claimdetails.servicesummary.id,
                      }"
                      v-if="claimdetails.servicesummary != null"
                    >
                      <button
                        class="btn btn-outline-success spacer"
                        v-if="claimdetails.status != 1"
                      >
                        View Encounter <i class="fe fe-activity"></i>
                      </button>
                    </router-link>

                    <!-- <button
                      class="btn btn-danger"
                      style="margin-left: 10px"
                      @click="rejectClaim"
                      v-if="claimdetails.status != 1 && user.type == 'employee'"
                    >
                      <i class="fe fe-x"></i> Reject
                    </button> -->

                    <button
                      class="btn btn-outline-success spacer"
                      @click="printMe"
                    >
                      Print <i class="fe fe-printer"></i>
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

          <div class="">
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

            <div class="">
              <div class="col-lg-12 col-md-12">
                <div class="card">
                  <div class="card-header">
                    <strong class="h4">Claim Details</strong>
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
                      <span v-if="claimdetails.checked_by_id != null">
                        <button
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                        >
                          vetted
                        </button>
                      </span>

                      <span v-if="claimdetails.verified_by_id != null">
                        <button
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                        >
                          verified
                        </button>
                      </span>

                      <span v-if="claimdetails.paymentorders.length >= 1">
                        <button
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark"
                          v-if="
                            claimdetails.paymentorders[0].status == 'pending'
                          "
                        >
                          processed for payment
                        </button>

                        <button
                          class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                          v-if="claimdetails.paymentorders[0].status == 'paid'"
                        >
                          <i class="fe fe-check-square"></i>paid
                        </button>
                      </span>
                    </p>

                    <div class="row">
                      <div class="col-md-6">
                        <p>
                          <strong>Health Facility:</strong>
                          {{ claimdetails.provider.agency_name }}
                        </p>
                        <br />
                        <p>
                          <strong>Prepared by:</strong>
                          {{ prepared_by.full_name }}
                        </p>
                        <br />
                        <p>
                          <strong>Enrollee/ Patient Name:</strong>
                          <router-link
                            v-if="claimdetails.enrollee != null"
                            :to="`/patient/${claimdetails.enrollee.id}`"
                          >
                            {{ claimdetails.enrollee.full_name }}
                          </router-link>
                        </p>
                        <br />
                        <p v-if="claimdetails.enrollee != null">
                          <strong>Enrollee/ Patient KAMPE Number:</strong>
                          {{ claimdetails.enrollee.id_card_number }}
                        </p>
                        <br />
                        <p>
                          <strong>Is Enrollee Out of Station:</strong>
                          <span v-if="claimdetails.is_out_of_station == true">
                            Yes
                          </span>
                          <span v-if="claimdetails.is_out_of_station == false">
                            No
                          </span>
                        </p>
                        <br />
                        <p>
                          <strong>Date Created:</strong>
                          {{ claimdetails.created_at }}
                        </p>
                        <br />
                        <p>
                          <strong>Diagnosis:</strong>
                          {{ claimdetails.diagnosis.name }}
                        </p>
                        <br />
                        <p>
                          <strong>Claim Treatment Level:</strong>
                          {{ claimdetails.claim_level }}
                        </p>
                        <br />
                      </div>

                      <div class="col-md-6">
                        <p>
                          <span class="h4">Reason For Claim:</span>
                          <span class="ml-2">{{ claimdetails.treatment }}</span>
                        </p>
                        <br />

                        <p v-if="claimdetails.checked_by_id != null">
                          <strong>Vetted By:</strong>
                          {{ claimdetails.checkeduser.full_name }}
                        </p>
                        <br />
                        <p v-if="claimdetails.verified_by_id != null">
                          <strong>Verified By:</strong>
                          {{ claimdetails.verfieduser.full_name }}
                        </p>
                        <br />
                        <p v-if="claimdetails.approved_by_id != null">
                          <strong>Approved By:</strong>
                          {{ claimdetails.approveduser.full_name }}
                        </p>
                        <br />
                        <p>
                          <strong>Date Approved:</strong>
                          {{ claimdetails.approved_by_date }}
                        </p>
                        <br />

                        <p>
                          <strong>Date Verified:</strong>
                          {{ claimdetails.verified_by_date }}
                        </p>
                        <br />

                        <p>
                          <strong>Date Vetted:</strong>
                          {{ claimdetails.checked_by_date }}
                        </p>
                        <br />

                        <div v-if="claimdetails.paymentorders.length >= 1">
                          <p class="h4">Payment Details:</p>
                          <p>
                            <strong>Payment Order ID:</strong>
                            <a
                              :href="`/transaction/${claimdetails.paymentorders[0].id}`"
                              class="text-info"
                            >
                              {{ claimdetails.paymentorders[0].payment_number }}
                            </a>
                          </p>

                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12 col-md-12 spacer">
              <div class="card m-b-30">
                <div class="card-header">
                  <p>
                    <strong
                      >Services/Drugs <i class="fe fe-thermometer"></i
                    ></strong>
                  </p>
                </div>

                <div class="card-body">
                  <p class="h3">Claim Service Breakdown:</p>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>S/N.</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Unit Amount</th>
                          <th>Requested Cost</th>
                          <th>Vetted Amount</th>
                          <th>Verified Amount</th>
                          <th>Verdict</th>

                          <th>Action</th>
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
                          <!-- <td>{{ service.dose }}</td> -->
                          <td>{{ service.frequency }}</td>
                          <td>
                            &#8358;
                            <span v-if="service.service != null">{{
                              service.service.price
                            }}</span>
                            <span v-if="service.drugs_id != null">{{
                              service.drug.price
                            }}</span>
                          </td>

                          <td>&#8358;{{ service.cost | numeral(0, 0) }}</td>
                          <td>
                            <span v-show="listprice">
                              &#8358;{{ service.vetted_price | numeral(0, 0) }}
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              v-show="updateprice_vet"
                              id=""
                              @change="updateServicePrice(service)"
                              v-model="service.vetted_price"
                            />
                          </td>

                          <td>
                            <span v-show="listprice">
                              &#8358;{{
                                service.verified_price | numeral(0, 0)
                              }}
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              :id="`price${service.id}`"
                              v-show="updateprice_ver"
                              @change="updateServicePrice(service)"
                              v-model="service.verified_price"
                            />
                          </td>
                          <td>
                            <span v-if="service.remark != null">{{
                              service.remark.name
                            }}</span>
                          </td>

                          <td>
                            <button
                              data-toggle="modal"
                              data-target="#slideRightModalAll"
                              class="btn m-b-15 ml-2 mr-2 btn-outline-success"
                              @click="getSingleService(service)"
                            >
                              <i class="fe fe-eye"> </i>
                            </button>
                            <div
                              class="col-md-12"
                              v-if="claimdetails.status != 1"
                            >
                              <div
                                class="form-group"
                                v-if="service.id == selected_service"
                              >
                                <label for="inputCity">Select Verdict</label>
                                <select
                                  class="form-control"
                                  v-model="remark_selected"
                                  @change="updateService(service)"
                                >
                                  <option
                                    :value="remark.id"
                                    v-for="remark in remarks"
                                    v-bind:key="remark.id"
                                  >
                                    {{ remark.name }}
                                  </option>
                                </select>
                              </div>

                              <div v-else>
                                <div class="btn-group">
                                  <button
                                    type="button"
                                    class="btn btn-outline-success dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    v-if="
                                      user.type != 'provider_employee' &&
                                      user.type != 'provider' &&
                                      claimdetails.status != 1
                                    "
                                  >
                                    <i class="fe fe-edit"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      @click="remarkService(service)"
                                    >
                                      make verdict</a
                                    >
                                    <div class="dropdown-divider"></div>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      @click="readycommentService(service)"
                                      >add comment</a
                                    >
                                    <div class="dropdown-divider"></div>
                                    <a
                                      class="dropdown-item"
                                      @click="updateprice_vet = true"
                                      v-if="user.job_title == 'Claims Vetter'"
                                      >vet amount</a
                                    >
                                    <div class="dropdown-divider"></div>
                                    <a
                                      class="dropdown-item"
                                      v-if="
                                        user.type == 'shis' ||
                                        user.type == 'employee'
                                      "
                                      @click="updateprice_ver = true"
                                      >verify amount</a
                                    >
                                    <div class="dropdown-divider"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4">
                            <strong>Total</strong>
                          </td>
                          <td>
                            <strong
                              >&#8358;{{
                                singleclaim.sum | numeral(0, 0)
                              }}</strong
                            >
                          </td>
                          <td>
                            <strong
                              >&#8358;{{
                                singleclaim.vetted_sum | numeral(0, 0)
                              }}</strong
                            >
                          </td>

                          <td>
                            <strong>
                              <span
                                >&#8358;{{
                                  singleclaim.verified_sum | numeral(0, 0)
                                }}</span
                              >
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- <p class="spacer">
                      <strong class="h5"
                        >Requested Total Amount of Service
                      </strong>
                      <strong class="h5"
                        >&#8358;{{ singleclaim.sum | numeral(0, 0) }}</strong
                      >
                    </p>

                    <p class="spacer">
                      <strong class="h5"
                        >Vetted Total Amount of Service
                      </strong>
                      <strong class="h5"
                        >&#8358;{{
                          singleclaim.vetted_sum | numeral(0, 0)
                        }}</strong
                      >
                    </p>
                    <p class="h5 spacer">
                      Approved Total Amount of Service
                      <span
                        >&#8358;{{
                          singleclaim.verified_sum | numeral(0, 0)
                        }}</span
                      >
                    </p> -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal -->
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
                    <h5 class="modal-title" id="slideRightModalLabel">
                      <span v-if="singlservicemodal.service != null">{{
                        singlservicemodal.service.description
                      }}</span>
                      <span v-if="singlservicemodal.drugs_id != null">{{
                        singlservicemodal.drug.drug_name
                      }}</span>
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
                    <p v-if="singlservicemodal.drugs_id != null">
                      <span class="font-weignt-bold">Other Service Info :</span>

                      <span>{{ singlservicemodal.drug.item_data }}</span>
                    </p>
                    <br />
                    <p>
                      <span class="font-weight-bold">Dose </span> :
                      {{ singlservicemodal.dose }}
                    </p>
                    <br />
                    <p>
                      <span class="font-weight-bold">Frequency (in a day)</span>
                      :
                      {{ singlservicemodal.frequency }}
                    </p>
                    <br />
                    <p>
                      <span class="font-weight-bold">Duration (days)</span> :
                      {{ singlservicemodal.days }}
                    </p>
                    <br />

                    <p>
                      <span class="font-weight-bold">Unit Amount</span> :
                      &#8358;
                      <span v-if="singlservicemodal.service != null">{{
                        singlservicemodal.service.price
                      }}</span>
                      <span v-if="singlservicemodal.drugs_id != null">{{
                        singlservicemodal.drug.price
                      }}</span>
                    </p>
                    <br />
                    <p>
                      <span class="font-weight-bold">Verdict</span> :
                      <span v-if="singlservicemodal.remark != null">{{
                        singlservicemodal.remark.name
                      }}</span>
                    </p>
                    <br />
                    <p>
                      <span class="font-weight-bold">Requested Amount</span> :
                      &#8358;{{ singlservicemodal.vetted_price }}
                    </p>
                    <br />

                    <p>
                      <span class="font-weight-bold">Approved Amount</span> :
                      &#8358;{{ singlservicemodal.verified_price }}
                    </p>
                    <br />

                    <p class="h4">Comments</p>

                    <div
                      v-for="comment in singlservicemodal.servicecomments"
                      v-bind:key="comment.id"
                      class=""
                    >
                      <b-card class="text-left">
                        <div class="bg-white text-dark">
                          {{ comment.body }}
                          <p>
                            <span class="text-primary"
                              >{{ comment.user.full_name }}
                            </span>
                            <span class="font-weight-light">
                              <small>
                                {{
                                  comment.created_at | moment("from", "now")
                                }}</small
                              >
                            </span>
                          </p>
                        </div>
                      </b-card>
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

            <div class="col-lg-12 col-md-12">
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
                          <th>S/N.</th>
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
                            {{ doc.user.full_name }}
                          </td>
                          <td>{{ doc.created_at }}</td>
                          <td>
                            <a
                              :href="
                                'https://kampe.hayokmedicare.ng/documents/' +
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
    <Footer />
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import Footer from "@/views/Footer.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Navbar,
    Footer,
    Loading,
  },
  data() {
    return {
      user: null,
      singleclaim: "",
      comments: "",
      remarks: "",
      remark_selected: "",
      shownotes: false,
      updateprice_vet: false,
      updateprice_ver: false,
      listprice: true,
      facility: "",
      clientdetail: "",
      selected_service: "",
      body: "",
      claimdetails: "",
      prepared_by: "",
      singlservicemodal: "",
      show: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    this.axios.get(`/api/v1/auth/remarks/439078`).then((response) => {
      this.remarks = response.data;
      console.log(response);
    });
  },
  methods: {
    remarkService(service) {
      this.selected_service = service.id;
    },
    readycommentService(service) {
      this.selected_service = service.id;
      this.show = true;
      // this.addComment(service);
    },
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
      if (this.selected_service != "") {
        this.axios
          .post(`/api/v1/auth/addComment`, {
            user_id: this.user.id,
            claim_service_id: this.selected_service,
            body: this.body,
          })
          .then((response) => {
            console.log(response);
            this.getClaim();
            this.show = false;
            this.selected_service = "";
            this.body = "";
            this.$toasted.info("added Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      } else {
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
            this.$toasted.info("added Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    updateService(service) {
      this.axios
        .put(`/api/v1/auth/claim_service/${service.id}`, {
          user_id: this.user.id,
          claims_id: this.$route.params.id,
          services_id: service.services_id,
          drugs_id: service.drugs_id,
          cost: service.cost,
          remark_id: this.remark_selected,
        })
        .then((response) => {
          console.log(response);
          this.getClaim();
          this.show = false;
          this.$toasted.info("updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
          this.selected_service = "";
          this.remark_selected = "";
        });
    },
    updateServicePrice(service) {
      this.axios
        .post(`/api/v1/auth/claim_service/update-cost`, {
          claims_service_id: service.id,
          vetted_price: service.vetted_price,
          verified_price: service.verified_price,
        })
        .then((response) => {
          console.log(response);
          this.getClaim();
          this.show = false;
          this.$toasted.info("Cost Updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
          this.selected_service = "";
        });
    },
    verifyClaim() {
      if (confirm("Are you sure you want to make verified?")) {
        this.axios
          .post(`/api/v1/auth/verify-claims/${this.$route.params.id}`, {
            claim_level: "Verification",
          })
          .then((response) => {
            console.log(response);
            this.$router.push(`/all-claims`);
            this.getClaim();
            this.$toasted.info("updated Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    vetClaim() {
      if (confirm("Are you sure you want to mark as vetted?")) {
        this.axios
          .post(`/api/v1/auth/checked-claims/${this.$route.params.id}`, {
            claim_level: "HMO",
          })
          .then((response) => {
            console.log(response);
            this.$router.push(`/all-claims`);
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
        this.axios.post(`/api/v1/auth/rejectClaim/${this.$route.params.id}`);
        this.$router.push(`/all-claims`).then((response) => {
          console.log(response);
          // this.getClaim()
          this.show = true;
        });
      }
    },
    getSingleService(service) {
      this.singlservicemodal = service;
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
    this.getClaim();
  },
};
</script>
<style scoped>
.spacer {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
