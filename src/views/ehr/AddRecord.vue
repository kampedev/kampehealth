<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <!-- <h3>Add Record</h3> -->

              <strong class="h4">Add Employee</strong>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-header">
                  <!-- <strong class="h3">Add Employee</strong> -->
                </div>

                <div class="card-body">
                  <div class="text-center">
                    <!-- <h3 class="p-t-10 searchBy-name">Add Record</h3> -->
                  </div>

                  <div class="form-row">
                    <div class="col-md-2">
                      <label for="inputCity">Date of Hospital Visit</label>
                      <input
                        class="form-control"
                        type="date"
                        v-model="record.date_of_visit"
                      />
                    </div>
                    <div class="form-group col-md-5">
                      <label for="inputCity">Reason for Visit</label>

                      <select class="form-control" v-model="record.reasonVisit">
                        <option value="General Consultation">
                          General Consultation
                        </option>
                        <option value="Laboratory Test">Laboratory Test</option>
                        <option value="Regular Check ups">
                          Regular Check ups
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-5">
                      <label for="inputCity">Patient OHIS Number</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="searchkey"
                        @change="searchIDCard"
                      />
                    </div>
                    <div class="row col-md-12" v-if="enrollee_details != ''">
                      <div class="form-group col-md-6">
                        <label for="inputCity">Client Surname</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="enrollee_details.user.firstname"
                          disabled
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputCity">Client First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="enrollee_details.user.lastname"
                          disabled
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Sex</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          :value="enrollee_details.user.gender"
                          disabled
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputCity">Phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          v-model="enrollee_details.user.phone_number"
                          
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label> Diagnosis</label>
                      <select class="form-control" v-model="record.diagnosis">
                        <option
                          v-for="dis in diseases"
                          v-bind:key="dis.id"
                          :value="dis.id"
                        >
                          {{ dis.name }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Admission Type</label>
                      <select
                        class="form-control"
                        v-model="record.patient_type"
                      >
                        <option value="1">Inpatient</option>
                        <option value="0">Outpatient</option>
                      </select>
                    </div>

                    <div class="row col-md-12" v-if="record.patient_type == 1">
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

                    <div
                      class="form-group col-md-12"
                     
                    >
                      <label for="inputCity">Test Record</label>
                      <!-- <ckeditor :editor="editor" v-model="complaint.description" :config="editorConfig"></ckeditor> -->
                      <textarea
                        class="form-control"
                        rows="6"
                        v-model="record.testResult"
                      ></textarea>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputCity">Consultation Notes</label>
                      <!-- <ckeditor :editor="editor" v-model="complaint.description" :config="editorConfig"></ckeditor> -->
                      <textarea
                        class="form-control"
                        rows="6"
                        v-model="record.medications"
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <button class="btn btn-primary" @click="AddRecord">
                      Submit
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
      record: {
        provider_id: "",
        patient_id: "",
        reasonVisit: "",
        date_of_visit: "",
        drVisited: "",
        testResult: "No test conducted",
        documents: "no document uploaded",
        medications: "",
        patient_type: "",
        diagnosis: "",
        date_of_admission: "",
        date_of_discharge: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/diagnosis-agency/95930`)
      .then((response) => {
        this.diseases = response.data;
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
          this.search_result = response.data.data;
          //Get Enrollee Details
          this.axios
            .get(`/api/v1/auth/user/zam/${this.search_result.id}`)
            .then((response) => {
              this.enrollee_details = response.data;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          //End of Enrollee Details
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
      if (this.edit === false) {
        // Add comp
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addHealthRecord", {
            provider_id: this.user.institutional_id,
            patient_id: this.enrollee_details.user.id,
            reasonVisit: this.record.reasonVisit,
            testResult: this.record.testResult,
            agency_id: 95930,
            drVisited: this.user.id,
            professional_id: this.user.id,
            notes: this.record.medications,
            diagnosis: this.record.diagnosis,
            phone_number: this.enrollee_details.user.phone_number,
            patient_type: this.record.patient_type,
            medications: "view service rendered page for more details",
            documents: this.record.documents,
            date_of_admission: this.record.date_of_admission,
            date_of_discharge: this.record.date_of_discharge,
            date_of_visit: this.record.date_of_visit,
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
            this.$router.push(`/details-of-treatment/${record_id}`);
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

    clearIt() {
      this.record.patient_id = "";
      this.record.drVisited = "";
      this.record.medications = "";
      this.record.reasonVisit = "";
      this.record.testResult = "";
    },
  },
  created() {
    //
  },
};
</script>
