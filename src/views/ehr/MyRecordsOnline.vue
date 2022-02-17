<template>
  <section class="admin-content" id="contact-search">
    <main class="admin-main">
      <section class="">
        
       
        <div class="">
          <div class="col-md-12">
            <div class="card" v-show="filterparams">
              <div class="card-header">
                <p class="text-center h4">Filter Parameter</p>
              </div>
              <div class="card-body">
                <div class="row">
                  <div
                    class="form-group col-md-4"
                    v-if="user.type == 'shis' || user.type == 'employee'"
                  >
                    <label> Select Facility </label>
                    <select
                      class="form-control"
                      @change="getRecords"
                      v-model="provider_id"
                    >
                      <option
                        v-for="provider in providers"
                        v-bind:key="provider.id"
                        :value="provider.id"
                      >
                        {{ provider.agency_name }}
                      </option>
                    </select>
                  </div>
               
                  <div class="form-group col-md-4">
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

                  <div class="form-group col-md-4">
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
                  <div class="col-md-12">
                    <button class="btn btn-outline-success btn-block">
                      <download-excel
                        :data="records.data"
                        :fields="json_fields"
                        type="csv"
                        :escapeCsv="false"
                        :name="'encounter_data' + '.csv'"
                      >
                      </download-excel>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

           

          <div
            class="row list"
            v-if="user.type == 'provider' || user.type == 'provider_employee'"
          >
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Encounter ID</th>
                          <th>Patient</th>
                          <th>Reason for Visit</th>
                          <th>Medical Diagnosis</th>
                          <th>Date of Visit</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="record in records" v-bind:key="record.id">
                          <td>{{ record.encounter_id }}
                              <i class="fe fe-copy text-success" @click="copyText(record)"></i>
                          </td>
                          <td>{{ record.patient.full_name }}</td>
                          <td>{{ record.reasonVisit }}</td>
                          <td>{{ record.service.diagnosis.name }}</td>
                          <td>{{ record.date_of_visit }}</td>
                         <td>
                              <router-link
                            :to="{ path: '/encounter/' + record.service.id }"
                          >
                            <button
                              type="button"
                              class="btn btn-outline-success"
                              name="button"
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

            <div class="vld-parent">
              <loading
                :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"
              ></loading>
            </div>
          </div>

          <div
            class="row list"
            v-if="user.type == 'shis' || user.type == 'employee'"
          >
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">

                   <div class="card row list">
            <div class="card-header">
              <button class="btn btn-outline-dark float-left">
                {{ records.meta.total }} Encounters
              </button>

              <button
                class="btn btn-outline-dark float-right"
                @click="filterparams = !filterparams"
              >
                filters
              </button>

             
            </div>
           
          </div>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Encounter ID</th>
                          <th>Patient</th>
                          <th>Facility</th>
                          <th>Reason for Visit</th>
                          <th>Medical Diagnosis</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="record in records.data" v-bind:key="record.id">
                          <td>{{ record.healthrecord.encounter_id }}</td>
                          <td>{{ record.patient.full_name }}</td>
                          <td>{{ record.provider.agency_name }}</td>
                          <td>{{ record.healthrecord.reasonVisit }}</td>
                          <td>{{ record.diagnosis.name }}</td>
                          <td>{{ record.date_of_visit }}</td>
                          <router-link
                            :to="{ path: '/encounter/' + record.id }"
                          >
                            <button
                              type="button"
                              class="btn btn-info"
                              name="button"
                            >
                              <i class="fe fe-eye"></i>
                            </button>
                          </router-link>
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
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
       filterparams: false,
      user: null,
      records: "",
       provider_id: "",
       providers: "",
        date: "",
        from: "",
        to: "",
       paginate_value: 20,
       json_fields: {
         "Date of Visit" : "healthrecord.date_of_visit",
        "Facility Name": "provider.agency_name",
        "Enrollee Full Name": "patient.full_name",
        "Enrollee OHIS Number": "patient.id_card_number",
        "Diagnosis": "diagnosis.name",
        "Reason for Visit" : "healthrecord.reasonVisit",
        "Test Conducted" : "healthrecord.testResult",
        "Desk Officer" : "professional.full_name",
        "Date of Admission" : "date_of_admission",
        "Date of Discharge" : "date_of_discharge",
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
  computed:{
      addOneDay() {
      var result = new Date(this.to);
      result.setDate(result.getDate() + 1);
      return result;
    },
  },
  methods: {
     pushDate() {
      this.date = "date";
      this.getRecords();
    },
    getRecords() {
      this.user = JSON.parse(localStorage.getItem("user"));

      if (this.user.type == "provider") {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.axios
          .post(`/api/v1/auth/gethealthRecord`, { provider: this.user.id })
          .then((response) => {
            this.records = response.data.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.user.type == "provider_employee") {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.axios
          .post(`/api/v1/auth/gethealthRecord`, {
            provider: this.user.institutional_id,
          })
          .then((response) => {
            this.records = response.data.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.user.type == "employee" || this.user.type == "shis") {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.axios
          .post(`/api/v1/auth/service_summary-agency`, {
             agency_id: 95930, 
             provider_id: this.provider_id, 
             paginate_value: this.paginate_value, 
             date: this.date, 
              from: this.from,
              to: this.addOneDay,
             
             })
          .then((response) => {
            this.records = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
    copyText(record) {
      const copyToClipboard = (text) => navigator.clipboard.writeText(text);
      copyToClipboard(record.encounter_id);
      this.$toasted.info("Copied to clipboard", {
        position: "top-center",
        duration: 3000,
      });
    },
  },
  created() {
    this.getRecords();
    this.getProviders();
  },
};
</script>
