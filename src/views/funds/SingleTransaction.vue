<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <main class="admin-main">
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-white p-b-30">
              <div class="media">
                <div class="avatar avatar mr-3">
                  <div
                    class="avatar-title bg-success rounded-circle mdi mdi-receipt"
                  ></div>
                </div>
                <div class="media-body">
                 
                  <p class="opacity-75">
                    Payment ID #{{ paymentorder.data.payment_number }} <br />
                    Invoice Date :
                    {{ paymentorder.data.created_at | moment("D/M/YYYY") }}
                  </p>
                  <button class="btn btn-white-translucent" @click="printMe">
                    <i class="mdi mdi-printer"></i>
                    Print
                  </button>

                  <button class="btn btn-outline-primary ml-2">
                    <download-excel
                      :data="paymentorder.data.claims"
                      :fields="json_fields"
                      type="csv"
                      :escapeCsv="false"
                      :name="'export' + '.csv'"
                    >
                    </download-excel>
                  </button>
                  <!-- <a
                    :href="`/letter/${paymentorder.data.id}`"
                    class="btn btn-white-translucent spacer-left"
                  >
                    <i
                      class="mdi
                                   mdi-notebook"
                    ></i>
                    Letter of Address
                  </a> -->
                  <button
                    v-if="paymentorder.data.status != 'paid'"
                    @click="approvePayment"
                    class="btn btn-white-translucent ml-2 mt-4"
                  >
                    complete payment
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-5 text-center m-b-30 ml-auto">
              <div class="rounded text-white bg-white-translucent">
                <div class="p-all-15">
                  <div class="row">
                    <div class="col-md-6 my-2 m-md-0">
                      <div class="text-overline opacity-75">Total Amount</div>
                      <h3 class="m-0 text-success">
                        <i class="mdi mdi-currency-ngn"></i
                        >{{ paymentorder.total_claims_cost | numeral(0, 0) }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pull-up">
        <div class="container" id="printDiv">
          <div class="row">
            <div class="col-md-12 m-b-40">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <!-- <img src="assets/img/logos/nytimes.jpg" width="60" class="rounded-circle"
                                                alt=""> -->
                      <address class="m-t-10">
                        To,<br />
                        <span class="h4 font-primary">
                          {{ paymentorder.data.provider.agency_name }}
                        </span>
                        <br />
                        <span>
                          <button
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                            v-if="paymentorder.data.status == 'pending'"
                          >
                            unpaid
                          </button>

                          <button
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                            v-if="paymentorder.data.status == 'paid'"
                          >
                            <i class="fe fe-check-square"></i>paid
                          </button>
                        </span>
                      </address>
                    </div>
                    <div class="col-md-6 text-right my-auto">
                      <h1 class="font-primary">Transaction</h1>
                      <div class="">
                        Payment Number: #{{ paymentorder.data.payment_number }}
                      </div>

                      <div class="">
                        Payment For:
                        <span class="font-weight-bold">{{
                          paymentorder.data.type
                        }}</span>
                      </div>
                      <div class="">
                        Date:
                        {{ paymentorder.data.created_at | moment("D/M/YYYY") }}
                      </div>
                    </div>
                  </div>

                  <div class="table-responsive">
                    <table class="table m-t-50">
                      <thead>
                        <tr>
                          <th class="">Payment Breakdown</th>

                          <th class="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="claim in paymentorder.data.claims"
                          v-bind:key="claim.id"
                        >
                          <td class="">
                            <p class="text-black m-0">
                              Claim ID: #{{ claim.claim_unique_id }}
                            </p>
                            <p class="text-muted">
                              {{ claim.enrollee.full_name }}
                              {{ claim.seen_date | moment("D/M/YYYY") }},
                              {{ claim.authorization_code }}
                            </p>
                          </td>

                          <td class="text-right">
                            <i class="mdi mdi-currency-ngn"></i
                            >{{ claim.approved_total_cost | numeral(0, 0) }}
                          </td>
                        </tr>

                        <tr
                          v-for="cap in paymentorder.data.capitations"
                          v-bind:key="cap.id"
                        >
                          <td class="">
                            <p class="text-black m-0">Item ID: #{{ cap.id }}</p>
                            <p class="text-muted">
                              {{ cap.name }}
                            </p>
                          </td>

                          <td class="text-right">
                            {{ cap.quantity }} x {{ cap.unit_fee }} =
                            <i class="mdi mdi-currency-ngn"></i
                            >{{ cap.total_amount | numeral(0, 0) }}
                          </td>
                        </tr>

                        <!-- <tr class="">
                                               <td  class="">
                                                   Taxes
                                               </td>
                                               <td  class="text-right">
                                                   <i class="mdi mdi-currency-ngn"></i>-580.02
                                               </td>
                                           </tr> -->

                        <tr class="bg-light">
                          <td class="">Total</td>
                          <td class="text-right">
                            <i class="mdi mdi-currency-ngn"></i>
                            <strong>
                              {{
                                paymentorder.total_claims_cost | numeral(0, 0)
                              }}</strong
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div class="p-t-10 p-b-20">
                    <p class="font-weight-bold">Powered by Kampe Health</p>
                    <hr />
                    <div class="text-center opacity-75">&copy; 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
// import LetterForPayment from "@/views/funds/LetterForPayment.vue";
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
      json_fields: {
        "Claim ID": "claim_unique_id",
        "Enrollee Full Name": "enrollee.full_name",
        "Enrollee KAMPE Number": "enrollee.id_card_number",
        "Enrollee Phone Number": "enrollee.phone_number",
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
      user: null,
      paymentorder: "",
      agencies: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    clearIt() {
      this.agency_id = "";
    },

    approvePayment() {
      if (confirm("Are you Sure you want to complete")) {
        this.axios
          .post(`/api/v1/auth/update-payment-status/${this.$route.params.id}`, {
            status: "paid",
          })
          .then((response) => {
            console.log(response);
            this.getPayment();
            this.$toasted.info("Updated Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    getPayment() {
      this.axios
        .get(`/api/v1/auth/paymentorder/${this.$route.params.id}`)
        .then((response) => {
          this.paymentorder = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
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
    this.getPayment();
  },
};
</script>
<style lang="css" scoped>
.spacer {
  margin-top: 30px;
}
.spacer-left {
  margin-left: 5px;
}
</style>
