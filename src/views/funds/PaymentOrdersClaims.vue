<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar ">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <strong class="h4 text-dark"
                >{{ payments.total }} Payments
              </strong>
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <div>
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row m-b-20">
                        <div class="col-md-6 my-auto">
                          <h4 class="m-0">Payments</h4>
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
                                  <th scope="col">Total Claims</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="payment in payments.data" v-bind:key="payment.id" >
                                  <td class="align-middle"> {{payment.created_at}} </td>
                                  <td class="align-middle">#{{payment.payment_number}} </td>
                                  <td class="align-middle"> {{payment.provider.agency_name}} </td>
                                  <td class="align-middle">
                                    <span class=" text-success"
                                    v-if=" payment.status == 'paid' "
                                      ><i class="mdi mdi-check-circle "></i>
                                      {{payment.status}} </span
                                    >

                                     <span class=" text-warning"
                                      v-if=" payment.status == 'pending' "
                                      ><i class="fe fe-x-circle "></i>
                                      {{payment.status}} </span
                                    >

                                  </td>
                                  <td class="align-middle">
                                    <h6 class=" m-0">
                                      <!-- <i class=" mdi mdi-currency-ngn"></i> -->
                                      {{payment.claims_count}} 
                                    </h6>
                                  </td>
                                  <td class="align-middle">
                                    <div class="input-group ">
                                      <div class="input-group-prepend">
                                        <a
                                          :href="`/transaction/${payment.id}`"
                                          class="btn btn-white"
                                          >View Payment Order</a
                                        >
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

          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              loader="dots"
              :can-cancel="true"
              :is-full-page="fullPage"
            ></loading>
          </div>
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
      isLoading: false,
      fullPage: true,
      states: "",
      user: null,
      employees: "",
      state: "",
      payments: "",
     
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
   
  },
  methods: {
    getPaymentAgency() {
      this.axios
        .get(`/api/v1/auth/paymentorder-agency/95930`,{
        params:{
            type:'claims'
        }})
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
        .get(`/api/v1/auth/paymentorder-provider/${this.user.id}`,{
        params:{
            type:'claims'
        }})
        .then((response) => {
          this.payments = response.data;
          console.log(response);  
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPayments(){
        this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == 'employee' || this.user.type == 'shis'  ) {
        this.getPaymentAgency()
        
      } else {
         this.getPaymentProvider()
      }
    }
    
   
  },
  created() {
    this.getPayments()
  },
};
</script>
