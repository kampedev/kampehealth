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

        

              <strong class="h4">Add Record</strong>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <form @submit.prevent="addRecordOffline">
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
                      <div class="col-md-2">
                        <label for="inputCity">Date of Hospital Visit</label>
                        <input
                          required
                          class="form-control"
                          type="date"
                          v-model="record.date_of_visit"
                        />
                      </div>
                      <div class="form-group col-md-5">
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
                        </select>
                      </div>

                      <!-- <div class="form-group col-md-5" required>
                      <label for="inputCity">Patient OHIS Number</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="searchkey"
                        @change="searchIDCard"
                      />
                    </div> -->

                      <div class="form-group col-md-5">
                        <label for="inputPassword4">Select Enrollee </label>
                        <v-select
                          v-model="record.patient_id"
                          label="id_card_number"
                          :options="clients"
                        />
                      </div>
                      <div class="row col-md-12" v-if="record.patient_id != ''">
                        <div class="form-group col-md-6">
                          <label for="inputCity">Client Full Name</label>
                          <input
                            type="text"
                            class="form-control"
                            :value="record.patient_id.firstname"
                            disabled
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputCity">Client First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            :value="record.patient_id.lastname"
                            disabled
                          />
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputCity">Sex</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            :value="record.patient_id.gender"
                            disabled
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputCity">Enrollee TPA</label>
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            v-model="record.patient_id.usertpa.organization_name"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label> Diagnosis </label>
                        <select
                          class="form-control"
                          v-model="record.diagnosis"
                          required
                        >
                          <option
                            v-for="dis in diseases"
                            v-bind:key="dis.id"
                            :value="dis"
                          >
                            {{ dis.name }}
                          </option>
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Admission Type</label>
                        <select
                          class="form-control"
                          required
                          v-model="record.patient_type"
                        >
                          <option value="1">Inpatient</option>
                          <option value="0">Outpatient</option>
                        </select>
                      </div>

                      <div
                        class="row col-md-12"
                        v-if="record.patient_type == 1"
                      >
                        <div class="form-group col-md-6">
                          <p>
                            <label for="inputPassword4"
                              >Date of Admission</label
                            >
                          </p>
                          <input
                            type="date"
                            required
                            class="form-control"
                            v-model="record.date_of_admission"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <p>
                            <label for="inputPassword4"
                              >Date of Discharge</label
                            >
                          </p>
                          <input
                            type="date"
                            class="form-control"
                            v-model="record.date_of_discharge"
                            required
                          />
                        </div>
                      </div>

                      <!-- <div
                      class="form-group col-md-12"
                     
                    >
                      <label for="inputCity">Test Record</label>
                     
                      <textarea
                        class="form-control"
                        rows="6"
                        v-model="record.testResult"
                      ></textarea>
                    </div> -->

                      <!-- <div class="form-group col-md-12">
                      <label for="inputCity">Consultation Notes</label>
                     
                      <textarea
                        class="form-control"
                        rows="6"
                        v-model="record.medications"
                      ></textarea>
                    </div>
                  </div> -->
                      <h3 class="h3">Drugs/Services Treatment</h3>

                      <div class="row col-md-12">
                        <div class="col-md-12">
                          <p class="h4">Service</p>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputPassword4">Select Service </label>
                          <v-select
                            multiple
                            v-model="record.services_id"
                             :reduce="description => description.id"
                            label="description"
                            :required="!record.services_id"
                            :options="services.data"
                          />
                        </div>
                        
                         
                        <div class="form-group col-md-6">
                          <label for="inputPassword4">Select Drug  </label>
                          <v-select
                            multiple
                            v-model="record.drug_id"
                             :reduce="drug_name => drug_name.id"
                            :required="!record.drug_id"
                            label="drug_name"
                            :options="drugs.data"
                          />
                        </div>

                        <div class="col-md-12"></div>
                      </div>

                      <div class="form-group col-md-12">
                        <button class="btn btn-primary btn-block btn-lg">
                          Submit
                        </button>

                       <div class="col-md-12">
                           <a href="/offline"
                           style="margin-top:10px;"
                        class="btn btn-outline-info btn-block btn-lg"
                        >View Records </a>
                       </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

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
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";



export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      user: null,
      searchkey: "",
      type: "",
      search_result: "",
      enrollee_details: "",
      hospital_records: "",
      encounters: "",
       selected_service: "", 
      edit: false,
      isLoading: false,
      fullPage: true,
      clients: null,
      diseases: null,
      services: null,
      drugs: null,
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
        drug_id: "",
        services_id: "",
        diagnosis: "",
        date_of_admission: "0",
        date_of_discharge: "0",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.clients = JSON.parse(localStorage.getItem("clients"));
    this.diseases = JSON.parse(localStorage.getItem("diseases"));
    this.services = JSON.parse(localStorage.getItem("services"));
    this.drugs = JSON.parse(localStorage.getItem("drugs"));
    
  },
  computed:{
//

  },
  methods: {
     
    async SetDB() {
      this.db = await this.getDb();
      this.hospital_records = await this.getDataFromDb();
      this.ready = true;
    },

    async getDb() {
      const DB_NAME = "hospital_data";
      const DB_VERSION = 1;
      // let DB;

      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (e) => {
          console.log("Error opening db", e);
          reject("Error");
        };

        request.onsuccess = (e) => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = (e) => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          let objectStore = db.createObjectStore("hospital_records", {
            autoIncrement: true,
            keyPath: "id",
          });
          objectStore;
        };
      });
    },

    async getDataFromDb() {
      return new Promise((resolve, reject) => {
        reject;
        let trans = this.db.transaction(["hospital_records"], "readonly");
        trans.oncomplete = (e) => {
          resolve(hospital_records);
          e;
        };

        let store = trans.objectStore("hospital_records");
        let hospital_records = [];

        store.openCursor().onsuccess = (e) => {
          let cursor = e.target.result;
          if (cursor) {
            hospital_records.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },

    async addRecordOffline() {
      this.isLoading = true;

      let provider_id = this.record.provider_id;
      let patient_id = this.record.patient_id;
      let reasonVisit = this.record.reasonVisit;
      let date_of_visit = this.record.date_of_visit;
      let drVisited = this.record.drVisited;
      let drug_id = this.record.drug_id;
      let patient_type = this.record.patient_type;
      let services_id = this.record.services_id;
      let diagnosis = this.record.diagnosis;
      let date_of_admission = this.record.date_of_admission;
      let date_of_discharge = this.record.date_of_discharge;

      let hospital_records = {
        record_type: "encounter",
        patient_id: patient_id,
        provider_id: provider_id,
        reasonVisit: reasonVisit,
        date_of_visit: date_of_visit,
        drVisited: drVisited,
        drug_id: drug_id,
        patient_type: patient_type,
        diagnosis: diagnosis,
        services_id: services_id,
        date_of_admission: date_of_admission,
        date_of_discharge: date_of_discharge,
      };
      console.log("about to add " + JSON.stringify(hospital_records));
      await this.addCatToDb(hospital_records);
      this.hospital_records = await this.getDataFromDb();
      this.isLoading = false;
      this.clearIt();
      this.$toasted.info("Record Added Successfully!", {
              position: "top-center",
              duration: 3000,
            });
    },
    async addCatToDb(hospital_records) {
      return new Promise((resolve, reject) => {
        reject;
        let trans = this.db.transaction(["hospital_records"], "readwrite");
        trans.oncomplete = (e) => {
          resolve();
          e;
        };

        let store = trans.objectStore("hospital_records");
        store.add(hospital_records);
      });
    },

    clearIt() {
      this.record.patient_id = "";
      this.record.drVisited = "";
      this.record.medications = "";
      this.record.patient_type = "";
      this.record.diagnosis = "";
      this.record.reasonVisit = "";
      this.record.testResult = "";
      this.record.patient_id = "";
      this.record.drug_id = "";
      this.record.services_id = "";
      this.record.date_of_visit = "";
      this.record.date_of_admission = "0";
      this.record.date_of_discharge = "0";
    },
  },
  created() {
    this.SetDB();
  },
};
</script>
<style scoped>

</style>
