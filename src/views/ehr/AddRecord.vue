<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>

              <strong class="h4 text-dark">Add Record </strong>
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
                  <!-- <strong class="h3">Add Employee</strong> -->
                </div>

                <div class="card-body">
                  <form @submit.prevent="AddRecord">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="inputCity">Date of Hospital Visit</label>
                        <input
                          required
                          class="form-control"
                          type="date"
                          v-model="record.date_of_visit"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Treatment Type</label>
                        <select
                          required
                          class="form-control"
                          v-model="record.treatment_type"
                        >
                          <option value="Primary">Primary Treatment</option>
                          <option value="Secondary">Secondary Treatment</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputCity">Reason for Visit</label>

                        <select
                          class="form-control"
                          v-model="record.reasonVisit"
                          required
                        >
                          <option value="General Consultation">
                            General Consultation
                          </option>
                          <option value="Laboratory Test">
                            Laboratory Test
                          </option>
                          <option value="Regular Check ups">
                            Regular Check ups
                          </option>
                          <option value="Emergency">Emergency</option>
                          <option value="Referred In">Referred In</option>
                          <option value="Review/follow-up">
                            Review/follow-up
                          </option>
                          <option value="Specialist Consultation">
                            Specialist Consultation
                          </option>
                          <option value="Out of Station">Out of Station</option>
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Search Enrollee </label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          placeholder="KAMPE Number, First Name, Last name, "
                          v-model="searchkey"
                          @change="searchIDCard"
                        />
                        <p>{{ search_result.length }} enrollee(s) found</p>
                      </div>

                      <div class="form-group col-md-12">
                        <label for="inputPassword4">Select Enrollee </label>
                        <!-- <v-select
                        v-model="selected_enrollee"
                        label="user_query"
                        :options="search_result"
                      /> -->

                        <select
                          class="form-control"
                          v-model="selected_enrollee"
                          required
                        >
                          <option
                            :value="user"
                            v-for="user in search_result"
                            :key="user.id"
                          >
                            {{ user.user_query }}
                          </option>
                        </select>
                      </div>

                      <div>
                        <div class="row col-md-12" v-show="userDetails">
                          <div class="col-md-6 offset-md-3 my-6">
                            <img
                              :src="`https://kampe.hayokmedicare.ng/image/${selected_enrollee.user_image}`"
                              class="img"
                              alt="User Photo"
                              onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                            />
                          </div>
                          <div class="form-group col-md-6">
                            <label for="inputCity">Client Surname </label>
                            <input
                              type="text"
                              class="form-control"
                              :value="selected_enrollee.full_name"
                              disabled
                            />
                          </div>
                          <div class="form-group col-md-6">
                            <label for="inputCity">Client First Name</label>
                            <input
                              type="text"
                              class="form-control"
                              :value="selected_enrollee.lastname"
                              disabled
                            />
                          </div>

                          <div class="form-group col-md-6">
                            <label for="inputCity">Sector </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputEmail4"
                              :value="selected_enrollee.sector"
                              disabled
                            />
                          </div>
                          <div class="form-group col-md-6">
                            <label for="inputCity">Phone Number</label>
                            <input
                              required
                              type="text"
                              class="form-control"
                              id="inputEmail4"
                              v-model="selected_enrollee.phone_number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="inputPassword4">Diagnosis </label>
                        <v-select
                          @input="clearOthers"
                          v-model="record.diagnosis"
                          label="name"
                          :options="diseases"
                        />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="inputPassword4">Other Diagnosis </label>
                        <v-select
                          v-model="record.secondary_diagnosis"
                          label="name"
                          :options="diseases"
                        />
                      </div>

                      <div
                        class="form-group col-md-4"
                        v-if="record.diagnosis.name == 'Others'"
                      >
                        <label for="inputCity">Type Diagnosis</label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="record.other_diagnosis"
                        />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="inputCity">Encounter Outcome</label>
                        <select
                          required
                          class="form-control"
                          v-model="record.encounter_outcome"
                        >
                          <option value="Admission">Admission</option>
                          <option value="Outpatient">Outpatient</option>
                          <option value="Referred Out">Referred Out</option>
                        </select>
                      </div>

                      <div class="form-group col-md-12">
                        <label for="inputCity">Comments</label>
                        <textarea
                          required
                          class="form-control"
                          rows="4"
                          v-model="record.medications"
                        ></textarea>
                      </div>
                    </div>

                    <div v-if="record.treatment_type == 'Primary'">
                      <h3 class="h3">Treatment</h3>

                      <div
                        v-for="(service_renderred, index) in record.services"
                        v-bind:key="service_renderred"
                        class="card my-4"
                      >
                        <div class="row card-body">
                          <!-- <div
                        class="form-group col-md-2"
                        v-if="record.treatment_type == 'Primary'"
                      >
                        <label>Select Drug </label>
                        <select
                          required
                          class="form-control"
                          v-model="service_renderred.type"
                        >
                          <option value="Drug" selected >Drug</option>
                          <option value="Service">Service</option>
                        </select>
                      </div> -->

                          <div class="form-group col-md-6">
                            <label for="inputPassword4"
                              >Select Primary Drug
                            </label>
                            <v-select
                              v-model="service_renderred.drug"
                              label="item_data"
                              :required="!record.drugs"
                              :options="drugs.data"
                            />
                          </div>

                          <!-- <div
                        class="form-group col-md-7"
                        v-if="
                          record.treatment_type == 'Primary' &&
                          service_renderred.type == 'Service'
                        "
                      >
                        <label for="inputPassword4">Select Services </label>
                        <v-select
                          v-model="service_renderred.service"
                          label="description"
                          :required="!record.services"
                          :options="services.data"
                        />
                      </div> -->

                          <div class="form-group col-md-2">
                            <label for="inputCity">Dose </label>
                            <input
                              type="number"
                              min="1"
                              class="form-control"
                              required
                              id="inputEmail4"
                              placeholder="1"
                              v-model="service_renderred.dose"
                            />
                          </div>

                          <div class="form-group col-md-2">
                            <label for="inputCity">Freq. </label>

                            <select
                              class="form-control"
                              v-model="service_renderred.frequency"
                            >
                              <option value="1">Daily</option>
                              <option value="2">BD</option>
                              <option value="3">TDS</option>
                              <option value="4">QDS</option>
                            </select>
                          </div>

                          <div class="form-group col-md-2">
                            <label for="inputCity">Days </label>
                            <input
                              type="number"
                              min="1"
                              class="form-control"
                              required
                              id="inputEmail4"
                              placeholder="1"
                              v-model="service_renderred.days"
                            />
                          </div>

                          <div class="col-md-6 my-2">
                            <button
                              type="button"
                              @click="addArray()"
                              class="btn btn-outline-info btn-block"
                            >
                              <i class="fe fe-plus"></i>
                            </button>
                          </div>

                          <div class="col-md-6 my-2">
                            <button
                              type="button"
                              @click="removeArray(index)"
                              class="btn btn-outline-danger btn-block"
                            >
                              <i class="fe fe-delete"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="form-group mt-8"
                      v-if="record.treatment_type == 'Primary'"
                    >
                      <button class="btn btn-info btn-block" type="submit">
                        Submit <i class="fe fe-send"></i>
                      </button>
                    </div>

                    <div
                      class="form-group mt-8"
                      v-if="record.treatment_type == 'Secondary'"
                    >
                      <button class="btn btn-info btn-block" type="submit">
                        Proceed to Claims <i class="fe fe-send"></i>
                      </button>
                    </div>
                  </form>
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

export default {
  components: {
    Navbar,
    Loading,
    // DatePicker,
  },
  data() {
    return {
      user: null,
      searchkey: "",
      selected_enrollee: {},
      diseases: "",
      search_result: "",
      enrollee_details: "",
      edit: false,
      userDetails: false,
      isLoading: false,
      fullPage: true,
      clients: "",
      services: "",
      drugs: "",
      record: {
        provider_id: "",
        patient_id: "",
        reasonVisit: "",
        date_of_visit: "",
        drVisited: "",
        testResult: "Not filled",
        documents: "no document uploaded",
        medications: "",
        patient_type: "",
        diagnosis: "",
        secondary_diagnosis: "",
        other_diagnosis: "",
        date_of_admission: "",
        date_of_discharge: "",
        treatment_type: "",
        encounter_outcome: "",
        services: [
          {
            drug: "",
            service: "",
            type: "Drug",
            dose: 1,
            frequency: 1,
            days: 1,
          },
        ],
        drug: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));

    if (this.$route.params.type == "secondary") {
      this.record.treatment_type = "Secondary";
    } else {
      this.record.treatment_type = "Primary";
    }
    this.axios
      .get(`/api/v1/auth/diagnosis-agency/439078`)
      .then((response) => {
        this.diseases = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    clearOthers() {
      this.record.other_diagnosis = "";
    },
    searchIDCard() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/searchenrollees`, {
          // provider_id: this.user.institutional_id,
          agency_id: 439078,
          request_query: this.searchkey,
        })
        .then((response) => {
          this.isLoading = false;
          this.search_result = response.data;

          this.userDetails = true;

          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },

    AddRecord() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (confirm("Are you Sure you want to Submit?")) {
        // Add comp
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addHealthRecord", {
            provider_id: this.user.institutional_id,
            patient_id:
              this.selected_enrollee.type == "client"
                ? this.selected_enrollee.id
                : 0,
            dependent_id:
              this.selected_enrollee.type == "Dependent"
                ? this.selected_enrollee.id
                : null,
            reasonVisit: this.record.reasonVisit,
            testResult: this.record.testResult,
            agency_id: 439078,
            drVisited: this.user.id,
            professional_id: this.user.id,
            notes: this.record.medications,
            diagnosis: this.record.diagnosis.id,
            secondary_diagnosis: this.record.secondary_diagnosis.id,
            other_diagnosis: this.record.other_diagnosis,
            phone_number: this.selected_enrollee.phone_number,
            patient_type: this.record.patient_type,
            medications: "view service rendered page for more details",
            documents: this.record.documents,
            treatment_type: this.record.treatment_type,
            date_of_admission: this.record.date_of_admission,
            date_of_discharge: this.record.date_of_discharge,
            date_of_visit: this.record.date_of_visit,
            services: this.record.services,
          })

          .then((response) => {
            console.log(response);
            this.clearIt();
            this.isLoading = false;
            this.$toasted.info("Added Successfully!", {
              position: "top-center",
              duration: 3000,
            });

            if (this.record.treatment_type == "Primary") {
              let record_id = response.data.service_summary.id;
              this.$router.push(`/encounter/${record_id}`);
            } else {
              let record_id = response.data.service_summary.id;
              this.$router.push(`/add-claim/${record_id}`);
            }
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
            this.$toasted.error("Error! Fill up on fields", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },

    getDrugs() {
      this.axios
        .get(`/api/v1/auth/drug-agency/439078`)
        .then((response) => {
          this.drugs = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getServices() {
      this.axios
        .get(`/api/v1/auth/service-agency/439078`)
        .then((response) => {
          this.services = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addArray() {
      this.record.services.push({
        drug: "",
        service: "",
        type: "Drug",
        dose: 1,
        frequency: 1,
        days: 1,
        total_cost: "1",
      });
    },
    clearIt() {
      this.record.patient_id = "";
      this.record.drVisited = "";
      this.record.medications = "";
      this.record.reasonVisit = "";
      this.record.testResult = "";
    },

    removeArray(index) {
      if (this.record.services.length != 1) {
        // only splice array when item is found
        this.record.services.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        this.$toasted.error("Minimum of 1 Service/Drug", {
          position: "top-center",
          duration: 3000,
        });
      }

      // array = [2, 9]
      console.log(this.record.services);
    },
  },
  created() {
    this.getDrugs();
    this.getServices();
  },
};
</script>
