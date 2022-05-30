<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar ">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <p class="h3 text-dark">Letter from KGSHIA</p>
            </div>
          </div>
        </div>
      </div>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class=" col-md-12" v-if="user.type == 'employee' || user.type == 'shis'" >
              <div class="card m-b-30">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="showadder = !showadder"
                  >
                    Update Letter <i class="fe fe-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="">
        <div class="container">
          <div class="row list" v-show="showadder">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h1>Type Letter Here</h1>

                  <!-- <wysiwyg v-model="letter_of_address" /> -->
                  <wysiwyg v-model="paymentorder.data.letter_of_address" />
                  <br>

                  <button class="btn btn-info btn-block" @click="updateLetter" >
                    Submit <i class="fe fe-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

           <div class="row list">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                   <button
                    type="button"
                    class="btn btn-info"
                   
                  >
                    Print <i class="fe fe-printer"></i>
                  </button>

                </div>
                <div class="card-body">
                  <h1></h1>

                <div v-html="paymentorder.data.letter_of_address">

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
      showadder: false,
      paymentorder: "",
      user: null,
      letter_of_address: "",
      searchkey: "",
      search_result: "",
     
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getPayment() {
      this.user = JSON.parse(localStorage.getItem("user"));
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

    updateLetter() {
      this.isLoading = true
      this.axios
        .post(`/api/v1/auth/update-payment-letter/${this.$route.params.id}`, {
          letter_of_address: this.paymentorder.data.letter_of_address,
        })
        .then((response) => {
          this.getPayment();
          console.log(response);
          this.$toasted.info("Updated Successfully", {
            position: "top-center",
            duration: 3000,
          });
           this.isLoading = false
        })
        .catch((error) => {
          console.error(error);
           this.isLoading = false
        });
    },

    AddDisease() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/authorization_code", {
          agency_id: 90,
          principal_id:
            this.search_result.type == "client"
              ? this.search_result.data.id
              : 0,
          dependent_id:
            this.search_result.type == "dependent"
              ? this.search_result.data.id
              : 0,
          date_requested: this.register.date_requested,
          provider_id: this.user.institutional_id,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.getCodes();
          this.$toasted.info(`${response.data.message}`, {
            position: "top-center",
            duration: 3000,
          });

          this.clearIt();
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
    },
    clearIt() {
      this.register.date_requested = "";
      this.searchkey = "";
      this.search_result = "";
    },
  },
  created() {
    this.getPayment();
  },
};
</script>
<style lang="css" scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
