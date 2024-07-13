<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <!-- <strong class="h4">{{encounters.meta.total}} Encounters</strong> -->
              <strong class="h4">Manage Encounters</strong>
            </div>

            <div class="container col-md-12 mb-4">
              <button
                class="btn btn-success"
                @click="encounterform = !encounterform"
              >
                <i class="fe fe-plus"></i> Add Encounter code
              </button>

              <button
                class="btn btn-outline-dark ml-3 my-2"
                @click="filterparams = !filterparams"
              >
                <i class="fe fe-filter"></i> Filter Encounters
              </button>
            </div>
          </div>
        </div>
      </div>
      <section class="container">
        <div class="form-group col-md-12 card" v-show="encounterform">
          <div class="card-header"></div>

          <div class="card-body">
            <form @submit.prevent="sendCode">
              <div class="form-group col-md-12">
                <label>Encounter Code</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  v-model="string_data"
                  placeholder="EC0/000/000/000"
                />
              </div>

              <div class="form-group">
                <button class="btn btn-success btn-block btn-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div class="col-md-12 mb-5">
          <div class="card" v-show="filterparams">
            <div class="card-header">
              <p class="text-center h4">Filter Parameter</p>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Agency ID</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter_field.enrollee"
                    placeholder="ID/XXX/XXXXX"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputPassword4">Diagnosis </label>
                  <v-select
                    v-model="filter_field.diagnosis"
                    :reduce="(name) => name.id"
                    label="name"
                    :options="diseases"
                  />
                </div>

                <div
                  class="form-group col-md-6"
                  v-if="user.type == 'shis' || user.type == 'employee'"
                >
                  <label> Select Facility </label>

                  <v-select
                    v-model="filter_field.provider_id"
                    label="agency_name"
                    :options="providers"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputCity"
                    ><i class="fe fe-calendar"></i> Start Date
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="filter_field.from"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="inputCity"
                    ><i class="fe fe-calendar"></i> End Date
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="filter_field.to"
                  />
                </div>

                <div class="col-md-6">
                  <label for="">Rows</label>
                  <select class="form-control" v-model="paginate_value">
                    <option>30</option>
                    <option>100</option>
                    <option>500</option>
                    <option>1000</option>
                    <option>5000</option>
                    <option>10000</option>
                  </select>
                </div>
                <div class="col-md-12">
                  <button
                    class="btn btn-outline-success btn-block"
                    @click="getEncounters"
                  >
                    Filter
                  </button>

                  <button class="btn btn-outline-dark my-2 btn-block">
                    <download-excel
                      :data="encounters.data"
                      :fields="json_fields"
                      type="xls"
                      :escapeCsv="false"
                      :name="'encounter_data' + '.xls'"
                    >
                    </download-excel>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <p class="h4 my-3">
                      <span v-if="encounters != ''">{{
                        encounters.meta.total
                      }}</span>
                      Encounters
                    </p>

                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Encounter ID</th>
                          <th>Facility</th>
                          <th>Patient</th>
                          <th>Patient Phone Number</th>
                          <th>Diagnosis</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="encounter in encounters.data"
                          v-bind:key="encounter.id"
                        >
                          <td>
                            <span v-if="encounter.healthrecord != null">
                              {{ encounter.healthrecord.encounter_id }}
                            </span>
                          </td>
                          <td>
                            {{ encounter.provider.agency_name }}
                          </td>
                          <td>
                            <span v-if="encounter.enrollee != null">
                              {{ encounter.enrollee.full_name }}</span
                            >
                          </td>
                          <td>
                            <span v-if="encounter.enrollee != null">
                              {{ encounter.enrollee.phone_number }}</span
                            >
                          </td>
                          <td>
                            {{ encounter.diagnosis.name }}
                          </td>

                          <td>
                            <router-link
                              :to="{ path: '/encounter/' + encounter.id }"
                            >
                              <button
                                type="button"
                                class="btn btn-success mr-1"
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
      paginate_value: 30,
      user: null,
      isLoading: false,
      encounterform: false,
      fullPage: true,
      filterparams: false,
      diseases: "",
      providers: "",
      json_fields: {
        "Encounter ID": "healthrecord.encounter_id",
        "Enrollee Full Name": "patient.full_name",
        "Enrollee AGENCY ID": "patient.id_card_number",
        Diagnosis: "diagnosis.name",
        "Facility Name": "provider.agency_name",
      },
      string_data: "",
      encounters: {
        meta: {},
      },
      filter_field: {
        diagnosis: "",
        provider_id: "",
        enrollee: "",
        date: "",
        from: "",
        to: "",
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
    getEncounters() {
      this.axios
        .post(`/api/v1/auth/service_summary-agency`, {
          provider_id: this.filter_field.provider_id.id,
          enrollee: this.filter_field.enrollee,
          diagnosis: this.filter_field.diagnosis,
          date: this.filter_field.date,
          from: this.filter_field.from,
          to: this.filter_field.to,
          agency_id: 95930,
          paginate_value: this.paginate_value,
        })
        .then((response) => {
          this.encounters = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    sendCode() {
      if (confirm("Are you Sure you want submit")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/auth/get-string`, {
            string_data: this.string_data,
            agency_id: 95930,
          })
          .then((response) => {
            console.log(response);
            this.getEncounters();
            this.string_data = "";
            this.isLoading = false;
            this.$toasted.info("Encounted submitted Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
            this.$toasted.error("Code Error!", {
              position: "top-center",
              duration: 3000,
            });
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
  },
  created() {
    this.getEncounters();
    this.getProviders();
  },
};
</script>
