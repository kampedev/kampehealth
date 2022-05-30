<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>

              <strong class="h4 text-dark">Add Record</strong>
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
                  <div class="text-center">
                    <!-- <h3 class="p-t-10 searchBy-name">Add Record</h3> -->
                  </div>

                  <div class="form-row">
                    <div class="col-md-6">
                      <label for="inputCity">Date of Hospital Visit</label>
                      <input
                        class="form-control"
                        type="date"
                        v-model="record.date_of_visit"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Treatment Type</label>
                      <select
                        class="form-control"
                        v-model="record.treatment_type"
                      >
                        <option value="Primary">Primary Treatment</option>
                        <option value="Secondary">Secondary Treatment</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">Reason for Visit</label>

                      <select class="form-control" v-model="record.reasonVisit">
                        <option value="General Consultation">
                          General Consultation
                        </option>
                        <option value="Laboratory Test">Laboratory Test</option>
                        <option value="Regular Check ups">
                          Regular Check ups
                        </option>
                        <option value="Emergency">Emergency</option>
                        <option value="Referred In">Referred In</option>
                        <option value="Review/follow-up"
                          >Review/follow-up</option
                        >
                        <option value="Specialist Consultation"
                          >Specialist Consultation</option
                        >
                        <option value="Out of Station">Out of Station</option>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Patient OHIS Number </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="searchkey"
                        @change="searchIDCard"
                      />
                    </div>

                    <div class="card-body row" v-if="search_result != ''">
                      <div class="col-md-4">
                        <img
                          :src="
                            `https://api.hayokinsurance.com/image/${search_result.data.user_image}`
                          "
                          alt="User Photo"
                          class="rounded"
                          width="200px"
                          height="200px"
                          onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                        />
                      </div>

                      <div class="col-md-6">
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Full Name :</strong>
                          <strong>{{ search_result.data.lastname }}</strong>
                          {{ search_result.data.firstname }},
                          {{ search_result.data.middlename }}
                        </p>
                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">O'HIS Number:</strong>
                          <strong>{{
                            search_result.data.id_card_number
                          }}</strong>
                        </p>
                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Expiry Date:</strong>

                          <strong>{{
                            search_result.data.expiry_date
                              | moment("dddd, MMMM Do YYYY")
                          }}</strong>
                          <button class="btn btn-dark btn-sm">
                            {{ search_result.data.status }}
                          </button>
                        </p>

                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">
                            Facility to Access Care:</strong
                          >
                          <strong>{{
                            search_result.data.userprovider.agency_name
                          }}</strong>
                        </p>

                        <hr />
                        <p
                          class="spacer-top-bottom"
                          v-if="search_result.data.place_of_work != null"
                        >
                          <strong class="text-primary">MDA:</strong>
                          <strong>
                            {{ search_result.data.place_of_work }}</strong
                          >
                        </p>

                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Plan Type:</strong>
                          <strong>{{ search_result.data.plan_type }} </strong>
                        </p>
                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Sector:</strong>
                          <strong> {{ search_result.data.sector }}</strong>
                        </p>
                        <hr />

                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Gender:</strong>
                          <strong> {{ search_result.data.gender }}</strong>
                        </p>
                        <hr />
                        <p class=" spacer-top-bottom">
                          <strong class="text-primary">Date of Birth:</strong>
                          <strong> {{ search_result.data.dob }}</strong>
                        </p>
                        <hr />
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6" v-if="search_result != ''">
                      <label for="inputCity">Enrollee Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        v-model="search_result.data.phone_number"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Diagnosis </label>
                      <v-select
                        v-model="record.diagnosis"
                        label="name"
                        :required="!record.diagnosis"
                        :options="diseases"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Encounter Outcome</label>
                      <select
                        class="form-control"
                        v-model="record.encounter_outcome"
                      >
                        <option value="Admission">Admission</option>
                        <option value="Outpatient">Outpatient</option>
                        <option value="Referred Out">Referred Out</option>
                      </select>
                    </div>

                    <div
                      class="row col-md-12"
                      v-if="record.encounter_outcome == 'Admission'"
                    >
                      <div class="form-group col-md-6">
                        <p>
                          <label for="inputPassword4">Date of Admission</label>
                        </p>
                        <date-picker
                          v-model="record.date_of_admission"
                          valueType="format"
                        ></date-picker>
                      </div>
                      <div class="form-group col-md-6">
                        <p>
                          <label for="inputPassword4">Date of Discharge</label>
                        </p>
                        <date-picker
                          v-model="record.date_of_discharge"
                          valueType="format"
                        ></date-picker>
                      </div>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputCity">Comments</label>
                      <textarea
                        class="form-control"
                        rows="4"
                        v-model="record.medications"
                      ></textarea>
                    </div>
                  </div>

                  <div
                    v-for="service_renderred in record.services"
                    v-bind:key="service_renderred"
                  >
                    <div class="row">
                      <div
                        class="form-group col-md-6"
                        v-if="record.treatment_type == 'Primary'"
                      >
                        <label>Select Type </label>
                        <select
                          required
                          class="form-control"
                          v-model="service_renderred.type"
                        >
                          <option value="Drug">Drug</option>
                          <option value="Service">Service</option>
                        </select>
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="
                          record.treatment_type == 'Primary' &&
                            service_renderred.type == 'Drug'
                        "
                      >
                        <label for="inputPassword4"
                          >Select Primary Drugs
                        </label>
                        <v-select
                          v-model="service_renderred.drug"
                          label="item_data"
                          :required="!record.drugs"
                          :options="drugs.data"
                        />
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="
                          record.treatment_type == 'Primary' &&
                            service_renderred.type == 'Service'
                        "
                      >
                        <label for="inputPassword4"
                          >Select Primary Services
                        </label>
                        <v-select
                          v-model="service_renderred.service"
                          label="description"
                          :required="!record.services"
                          :options="services.data"
                        />
                      </div>
                    </div>

                    <div class="row" v-if="record.treatment_type == 'Primary'">
                      <div
                        class="form-group col-md-4"
                        v-if="service_renderred.type != ''"
                      >
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

                      <div
                        class="form-group col-md-4"
                        v-if="service_renderred.type == 'Drug'"
                      >
                        <label for="inputCity">Dosage</label>
                        <input
                          type="number"
                          min="1"
                          class="form-control"
                          required
                          id="inputEmail4"
                          placeholder="Qty"
                          v-model="service_renderred.dose"
                        />
                      </div>

                      <div
                        class="form-group col-md-4"
                        v-if="service_renderred.type == 'Drug'"
                      >
                        <label for="inputCity"
                          >Frequency (Times per day)
                        </label>
                        <input
                          type="number"
                          min="1"
                          class="form-control"
                          required
                          id="inputEmail4"
                          placeholder="1"
                          v-model="service_renderred.frequency"
                        />
                      </div>

                      <div
                        class="form-group col-md-12"
                        style="margin-bottom:20px"
                      >
                        <button @click="addArray()" class="btn btn-success">
                          add more <i class="fe fe-activity"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="form-group"
                    v-if="record.treatment_type == 'Primary'"
                  >
                    <button
                      class="btn btn-success btn-block"
                      @click="AddRecord"
                    >
                      Submit <i class="fe fe-send"></i>
                    </button>
                  </div>

                  <div class="form-group"
                   v-if="record.treatment_type == 'Secondary'"
                  >
                    <button
                      class="btn btn-success btn-block"
                      @click="AddRecordSecondary"
                    >
                      Proceed to Claims <i class="fe fe-send"></i>
                    </button>
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
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Navbar,
    Loading,
    DatePicker,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      user: null,
      searchkey: "",
      diseases: "",
      search_result: "",
      enrollee_details: "",
      edit: false,
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
        date_of_admission: "",
        date_of_discharge: "",
        treatment_type: "",
        encounter_outcome: "",
        services: [
          {
            drug: "",
            service: "",
            type: "",
            dose: 1,
            frequency: 1,
            days: 1,
          },
        ],
        drug: "",
        // services: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/diagnosis-agency/95930`)
      .then((response) => {
        this.diseases = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    searchIDCard() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          id_card_number: this.searchkey,
        })
        .then((response) => {
          this.search_result = response.data;

          console.log(response);
          // this.$router.push(`/client/${user.id}`)
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

    AddRecord() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (confirm("Are you sure you want to submit ?")) {
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addHealthRecord", {
            provider_id: this.user.institutional_id,
            // patient_id: this.enrollee_details.user.id,
            patient_id:
              this.search_result.type == "client"
                ? this.search_result.data.id
                : 0,
            dependent_id:
              this.search_result.type == "dependent"
                ? this.search_result.data.id
                : null,
            reasonVisit: this.record.reasonVisit,
            testResult: this.record.testResult,
            agency_id: 95930,
            drVisited: this.user.id,
            professional_id: this.user.id,
            notes: this.record.medications,
            encounter_outcome: this.record.encounter_outcome,
            treatment_type: this.record.treatment_type,
            diagnosis: this.record.diagnosis.id,
            phone_number: this.search_result.data.phone_number,
            patient_type: this.record.patient_type,
            medications: "view service rendered page for more details",
            documents: this.record.documents,
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
            let record_id = response.data.service_summary.id;
            this.$router.push(`/encounter/${record_id}`);
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

  AddRecordSecondary() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (confirm("Are you sure you want to submit ?")) {
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addHealthRecord", {
            provider_id: this.user.institutional_id,
            // patient_id: this.enrollee_details.user.id,
            patient_id:
              this.search_result.type == "client"
                ? this.search_result.data.id
                : 0,
            dependent_id:
              this.search_result.type == "dependent"
                ? this.search_result.data.id
                : null,
            reasonVisit: this.record.reasonVisit,
            testResult: this.record.testResult,
            agency_id: 95930,
            drVisited: this.user.id,
            professional_id: this.user.id,
            notes: this.record.medications,
            encounter_outcome: this.record.encounter_outcome,
            treatment_type: this.record.treatment_type,
            diagnosis: this.record.diagnosis.id,
            phone_number: this.search_result.data.phone_number,
            patient_type: this.record.patient_type,
            medications: "view service rendered page for more details",
            documents: this.record.documents,
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
            let record_id = response.data.service_summary.id;
            this.$router.push(`/add-claim/${record_id}`);
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
        .get(`/api/v1/auth/drug-agency/95930`)
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
        .get(`/api/v1/auth/service-agency/95930`)
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
        type: "",
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
  },
  created() {
    this.getDrugs();
    this.getServices();
  },
};
</script>
