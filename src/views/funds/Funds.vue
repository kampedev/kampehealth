<template>
  <div class="sidebar-pinned ">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->

      <section class="admin-content">
        <div class="container">
          <div class="row">
            <div class="col-12 m-b-20">
              <h5 class="spacer-top">Finance Dashboard</h5>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-credit-card"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Total Payments Made</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>{{ funds_dashboard.total_amount_paid | numeral(0,0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-database"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Claims Payment</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>{{ funds_dashboard.sum_of_claims_paid | numeral(0,0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-users"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Capitations</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>{{ funds_dashboard.sum_captitations | numeral(0,0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-credit-card"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Reinsurance</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>106,000
                    </h1>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-credit-card"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Investment</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>171,000
                    </h1>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-primary rounded-circle">
                        <i class="fe fe-credit-card"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">FOS</p>
                    <h1 class="fw-400">
                      <i class=" mdi mdi-currency-ngn"></i>11,000
                    </h1>
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <div>
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row m-b-20">
                        <div class="col-md-6 my-auto">
                          <h4 class="m-0">Summary</h4>
                        </div>

                        <!-- <div class="col-md-6 text-right my-auto">
                                                  <div class="btn-group" role="group" aria-label="Basic example">
                                                      <button type="button" class="btn btn-white shadow-none js-datepicker"><i
                                                                  class="mdi mdi-calendar"></i> Pick Date
                                                      </button>

                                                      <button type="button" class="btn btn-white shadow-none">All</button>
                                                      <button type="button" class="btn btn-white shadow-none">Paid</button>
                                                      <button type="button" class="btn btn-white shadow-none">UnPaid</button>
                                                  </div>
                                              </div> -->
                      </div>
                      <div class="row ">
                        <div class="col-md-12 p-0">
                          <div class="table-responsive">
                            <table class="table table-hover">
                              <thead class="">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Payment Order Number</th>
                                  <th scope="col">Recipient</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Purpose</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="payment in payments.data"
                                  v-bind:key="payment.id"
                                >
                                  <td class="align-middle">
                                    {{ payment.created_at }}
                                  </td>
                                  <td class="align-middle">
                                    #{{ payment.payment_number }}
                                  </td>
                                  <td class="align-middle">
                                    {{ payment.provider.agency_name }}
                                  </td>
                                  <td class="align-middle">
                                    <span
                                      class=" text-success"
                                      v-if="payment.status == 'paid'"
                                      ><i class="mdi mdi-check-circle "></i>
                                      {{ payment.status }}
                                    </span>

                                    <span
                                      class=" text-warning"
                                      v-if="payment.status == 'pending'"
                                      ><i class="fe fe-x-circle "></i>
                                      {{ payment.status }}
                                    </span>
                                  </td>
                                  <td class="align-middle">
                                    <h6 class=" m-0">
                                      <!-- <i class=" mdi mdi-currency-ngn"></i> -->
                                      {{ payment.type }}
                                    </h6>
                                  </td>
                                  <td class="align-middle">
                                    <div class="input-group ">
                                      <div class="input-group-prepend">
                                          <router-link :to="`/transaction/${payment.id}`">
                                        <button
                                          class="btn btn-white"
                                          >View Payment</button
                                        >
                                          </router-link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                             
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div class="col-auto ml-auto">
                          <div>
                            <nav class="">
                              <ul class="pagination">
                                <li class="page-item disabled">
                                  <a class="page-link" href="#" tabindex="-1"
                                    >Previous</a
                                  >
                                </li>
                                <li class="page-item active">
                                  <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item ">
                                  <a class="page-link" href="#"
                                    >2 <span class="sr-only">(current)</span></a
                                  >
                                </li>
                                <li class="page-item">
                                  <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item">
                                  <a class="page-link" href="#">Next</a>
                                </li>
                              </ul>
                            </nav>
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
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      funds_dashboard: "",
      payments: "",
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getPaymentAgency() {
      this.axios
        .get(`/api/v1/auth/paymentorder-agency/95930`, {
          params: {
            type: "claims",
          },
        })
        .then((response) => {
          this.payments = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },


    getPaymentProvider() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/paymentorder-provider/${this.user.id}`)
        .then((response) => {
          this.payments = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    
 getDashboardAgency() {
      this.axios
        .get(`/api/v1/auth/finance-dashboard-agency/95930`)
        .then((response) => {
          this.funds_dashboard = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
     getDashboardProvider() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/finance-dashboard-provider/${this.user.id}`)
        .then((response) => {
          this.funds_dashboard = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },


    getPayments() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == "employee" || this.user.type == "shis") {
        this.getPaymentAgency();
      } else {
        this.getPaymentProvider();
      }
    },

    
    getDashboard() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == "employee" || this.user.type == "shis") {
        this.getDashboardAgency();
      } else {
        this.getDashboardProvider();
      }
    },
  },
  created() {
    this.getPayments();
    this.getDashboard();
  },
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
