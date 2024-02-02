<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main" v-if="user.job_title == 'Executive Secretary'">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30"></div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <div class="col-md-12">
            <div class="card" v-show="filterparams">
              <div class="card-header">
                <p class="text-center h4">Filter Parameter</p>
              </div>
              <div class="card-body">
                <div class="row">
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
                  <div class="row col-md-12">
                    <div class="col-md-6">
                      <button
                        class="btn btn-outline-success btn-block"
                        @click="getClaims()"
                      >
                        Filter
                      </button>
                    </div>

                    <div class="col-md-6">
                      <button class="btn btn-outline-success btn-block">
                        <download-excel
                          :data="claims.data"
                          :fields="json_fields"
                          type="csv"
                          :escapeCsv="false"
                          :name="'claim data' + '.csv'"
                        >
                        </download-excel>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div class="card row list">
            <div class="card-header">
              <button class="btn btn-outline-dark float-left">
                {{ claims.data.total }} Claims
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
                      <th>Date</th>
                      <th>Health Facility</th>
                      <th>Diagnosis</th>
                      <th>Status</th>
                      <th>Approved Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="claim in claims.data.data" v-bind:key="claim.id">
                      <td>
                        <router-link :to="{ path: '/claim/' + claim.id }">
                          {{
                            claim.created_at | moment("dddd, MMMM Do YYYY")
                          }}
                          s
                        </router-link>
                      </td>
                      <td>{{ claim.provider.agency_name }}</td>
                      <td>{{ claim.diagnosis.name }}</td>
                      <td>
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
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-primary"
                          >
                            verified
                          </button>
                        </span>
                        <span v-if="claim.checked_by_id != null">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                          >
                            checked
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
                        <span v-if="claim.status == null">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                          >
                            pending
                          </button>
                        </span>
                      </td>
                      <td>&#8358;{{ claim.approved_total_cost }}</td>
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
                      <td colspan="3">
                        <strong>Total Approved Sum </strong>
                      </td>
                      <td></td>
                      <td>
                        <strong
                          >&#8358;{{ claims.total_sum | numeral(0, 0) }}  </strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6">
                        <!-- <button
                          class="btn btn-outline-dark btn-block"
                          @click="createPaymentOrder()"
                        >
                          Make Payment
                          <i class="mdi mdi-credit-card"></i>
                        </button> -->

                        <button class="btn btn-dark btn-block btn-lg">
                          <paystack
                            :amount="claims.total_sum * 100"
                            :email="email"
                            :paystackkey="paystackkey"
                            :reference="reference"
                            :callback="createPaymentOrder"
                            :first_name="user.firstname"
                            :last_name="user.lastname"
                            :phone="user.phone_number"
                            :close="close"
                            :embed="false"
                          >
                          Make to Payment   <i class="mdi mdi-credit-card"></i>


                          </paystack>
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
import paystack from "vue-paystack";

export default {
  components: {
    Navbar,
    paystack,
    Loading,
  },
  data() {
    return {
      paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      email: "faisalnas7@gmail.com",
      user: null,
      claims: "",
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
      claim_status: "",
      cleaned_array: "",
      date: "",
      json_fields: {
        "Facility Name": "provider.agency_name",
        "Enrollee Full Name": "patient.full_name",
        "Enrollee OHIS Number": "patient.id_card_number",
        Diagnosis: "diagnosis.name",
        HMO: "tpa.organization_name",
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
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    pushDate() {
      this.date = "date";
      this.getClaims();
    },
    getClaims() {
      this.axios
        .get(`/api/v1/auth/treatclaimsprovider`, {
          params: {
            paginate_value: 100,
            provider_id: this.$route.params.id,
            date: this.date,
            from: this.from,
            to: this.addOneDay,
          },
        })
        .then((response) => {
          this.claims = response.data;
          this.cleaned_array = response.data.cleaned_array;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createPaymentOrder() {
      // if (confirm("Are you sure you want to Submit")) {
      this.axios
        .post(`/api/v1/auth/paymentorder`, {
          agency_id: 95930,
          provider_id: this.$route.params.id,
          type: "claims",
          status: "paid",
          payment_method: "online",
          claims: this.cleaned_array,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.info("Payment Order Created Successfully!", {
            position: "top-center",
            duration: 3000,
          });

          this.$router.push(`/all-claims-facility`);
        })
        .catch((error) => {
          console.error(error);
        });
      // }
    },
    close: function () {
      console.log("Payment closed");
    },
  },
  created() {
    this.getClaims();
  },
};
</script>
