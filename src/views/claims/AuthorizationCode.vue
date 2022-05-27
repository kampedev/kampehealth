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
              <p class="h3 text-dark">Authorization Code Manager</p>
            </div>
          </div>
        </div>
      </div>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="showadder = !showadder"
                  >
                    Request Code <i class="fe fe-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12" v-show="showadder">
              <div class="card m-b-30">
                <div class="card-header">
                  <h3 class="p-t-10 searchBy-name">New Request</h3>
                </div>

                <div class="card-body">
                  <div class="row">
                     <div class="form-group col-md-6">
                        <label>Select Secondary Facility </label>
                        <v-select
                          v-model="referred_to_facility"
                          label="agency_name"
                          :options="providers"
                        />
                      </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee KGSHIA Number </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="searchkey"
                        @change="searchIDCard"
                      />
                    </div>
                  </div>

                  <div class="row col-md-12" v-if="search_result != ''">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee Surname</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.firstname"
                        disabled
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Enrollee First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.lastname"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">KGSHIA Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.id_card_number"
                        disabled
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Sector</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        :value="search_result.data.sector"
                        disabled
                      />
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Encounter </label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="service_summary_id"
                            
                          >
                            <option :value="encounter.service.id" v-for="encounter in encounters" 
                            v-bind:key="encounter.id"> {{encounter.encounter_id}} ({{encounter.service.diagnosis.name}} ) </option>
                          </select>
                        </div>
                      </div>

                  </div>

                  <div class="form-group">
                    <button class="btn btn-success btn-block" @click="AddDisease">
                      Submit <i class="fe fe-send"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row list">
            <div class=" col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h1>{{ codes.length }} Codes</h1>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Date Requested</th>
                          <th>Requesting Facility</th>
                          <th>Expiry Date</th>
                          <th>Code</th>
                          <th>Status</th>
                          <th   v-if="
                            user.type == 'shis' || user.type == 'employee'
                            ">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diag in codes" v-bind:key="diag.id">
                          <td>{{ diag.date_requested }}</td>
                          <td>
                            <span v-if="diag.provider != null">{{
                              diag.provider.agency_name
                            }}</span>
                          </td>
                          <td>{{ diag.expiry_date }}</td>
                         
                          <td>{{ diag.code_created }}</td>
                            <td>
                               <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark spacer"
                            >
                              {{diag.status}}
                            </button>

                            <span v-if="diag.is_code_used == true" class="bg-success text-white"> code used </span> 
                            <span v-if="diag.is_code_used == false"> code not used yet</span> 
                            </td>
                          <td
                           
                          >
                            <button class="btn btn-outline-success"
                              @click="generateCode(diag)"
                               v-if="
                             diag.code_created == null && (user.type == 'shis' || user.type == 'employee')
                            "
                            >
                              Generate Code <i class="fe fe-lock"></i>
                            </button>
                              <router-link :to="{ path: '/authorization-code/' + diag.id }">
                            <button class="btn btn-outline-dark" 
                            >
                              <i class="fe fe-eye"></i>
                            </button>
                              </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      showadder: false,
      codes: "",
      singlerecipient: "08024035326",
      message: "Authorization Code is needed. Go to https://app.kgshia.ng/authorization-code  to generate.",
      searchkey: "",
      referred_to_facility : "",
      providers: "",
      search_result: "",
      service_summary_id: "",
      encounters: "",
      register: {
        date_requested: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/authorization_code/95930`)
      .then((response) => {
        this.codes = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {

    getCodes(){
       this.user = JSON.parse(localStorage.getItem("user"));
       if ( this.user.type == 'provider'  || this.user.type == 'provider_employee' ) {
         this.getCodesProvider()
       }
        if ( this.user.type == 'tpa' || this.user.type == 'tpa_employee' ) {
         this.getCodesTpa()
       }
        if ( this.user.type == 'employee' || this.user.type == 'shis' ) {
         this.getCodesAgency()
       }
    },

    getCodesAgency() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code/95930`)
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

     getCodesProvider() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code-provider`)
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

      getCodesTpa() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code-tpa`)
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    searchIDCard() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          id_card_number: this.searchkey,
        })
        .then((response) => {
          this.search_result = response.data;

          console.log(response);
          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });

          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.info("User not Found", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    getRecords(){
        this.user = JSON.parse(localStorage.getItem("user"));
        this.axios
          .post(`/api/v1/auth/gethealthRecord`, {
            provider: this.user.institutional_id,
            patient_id:  this.search_result.type == "client"
              ? this.search_result.data.id
              : null,
            dependent_id:  this.search_result.type == "dependent"
              ? this.search_result.data.id
              : null,

          })
          .then((response) => {
            this.encounters = response.data.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
    },

    generateCode(diag) {
      this.axios
        .post(`/api/v1/auth/generateCode`,{
          id: diag.id
        })
        .then((response) => {
         this.getCodes()
          console.log(response);
           this.$toasted.info("Generated Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    AddDisease() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/authorization_code", {
          agency_id: 95930,
          principal_id:
            this.search_result.type == "client"
              ? this.search_result.data.id
              : 0,
          dependent_id:
            this.search_result.type == "dependent"
              ? this.search_result.data.id
              : 0,
          // date_requested: this.register.date_requested,
           provider_id: this.user.institutional_id,
           service_summary_id: this.service_summary_id,
           referred_to_facility: this.referred_to_facility.id,
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
          this.sendSMS()
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
    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/95930`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendSMS(){
       this.isLoading = true;
          this.axios.post(`https://api.bulksmslive.com/v2/app/sms?email=faisalnas7@gmail.com&password=skrull123&sender_name=OHIS&message=${this.message}&recipients=${this.singlerecipient}`, {

          })
          .then(response=>{
              console.log(response);
              let reply = response.data.msg
              this.clearIt();
              this.isLoading = false;
              this.$toasted.info(`${reply}`, {position: 'top-center', duration:3000 })

          })
          .catch(error=>{
              console.log(error.response)
          })
    }
  },
  created() {
    this.getCodes();
    this.getRecords();
     this.getProviders();
  },
};
</script>
