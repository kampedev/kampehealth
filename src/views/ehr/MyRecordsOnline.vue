<template>
  <section class="admin-content" id="contact-search">
    <main class="admin-main">
      <section class="">
        <div class="col-md-12 text-center">
          <p class="h5">My Records</p>
        </div>
        <div class="">
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
                        <tr v-for="record in records" v-bind:key="record.id">
                          <td>{{ record.encounter_id }}</td>
                          <td>{{ record.patient.full_name }}</td>
                          <td>{{ record.provider.agency_name }}</td>
                          <td>{{ record.healthrecord.reasonVisit }}</td>
                          <td>{{ record.diagnosis.name }}</td>
                          <td>{{ record.date_of_visit }}</td>
                          <router-link
                            :to="{ path: '/encounter/' + record.service.id }"
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
      user: null,
      records: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
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
          .post(`/api/v1/auth/service_summary-agency`, { agency_id: 95930 })
          .then((response) => {
            this.records = response.data.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
  },
};
</script>
