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

            <div class="col-md-12">
              <button class="btn btn-success" @click="encounterform = !encounterform" >
                <i class="fe fe-plus"></i> Add Encounter code
              </button>
            </div>
          </div>
        </div>
      </div>
      <section class="container">
        <div class="form-group col-md-12 card" v-show="encounterform">
          <div class="card-header"></div>

          <div class="card-body">
            <form @submit.prevent="sendCode" >

            
            <div class="form-group col-md-12">
              <label>Encounter Code</label>
              <input
                type="text" required
                class="form-control"
                v-model="string_data"
                placeholder="EC0/000/000/000"
              />
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block btn-lg">Submit</button>
            </div>
            </form>
          </div>
        </div>
        <div class="">
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Number</th>
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
                          v-for="(encounter, index) in encounters.data"
                          v-bind:key="encounter.id"
                        >
                        <td> {{index+1}} </td>
                          <td>
                            <span v-if="encounter.healthrecord != null" >
                              {{encounter.healthrecord.encounter_id}}
                            </span>
                          </td>
                          <td>
                            {{ encounter.provider.agency_name }}
                          </td>
                          <td>
                            {{ encounter.patient.full_name }}
                          </td>
                          <td>{{ encounter.patient.phone_number }}</td>
                          <td>
                            {{ encounter.diagnosis.name }}
                          </td>

                          <td>
                            <router-link
                              :to="{ path: '/encounter/' + encounter.id }"
                            >
                              <button
                                type="button"
                                class="btn btn-info"
                                name="button"
                              >
                                <i class="fe fe-eye"></i>
                              </button>
                            </router-link>
                            <button
                              type="button"
                              @click="deleteUser(encounter)"
                              class="btn btn-danger"
                            >
                              <i class="fe fe-delete"></i>
                            </button>
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
      isLoading: false,
      encounterform: false,
      fullPage: true,
      states: "",
      string_data: "",
      encounters: "",
    };
  },
  beforeMount() {
    this.axios
      .post(`/api/v1/auth/service_summary-agency`, { agency_id: 95930 })
      .then((response) => {
        this.encounters = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getEncounters() {
      this.axios
        .post(`/api/v1/auth/service_summary-agency`, { agency_id: 95930 })
        .then((response) => {
          this.encounters = response.data;
          console.log(response);
          
        })
        .catch((error) => {
          console.error(error);
        });
    },

    sendCode(){
      if (confirm("Are you Sure you want submit")) {
        this.isLoading = true
        this.axios
          .post(`/api/v1/auth/get-string`, {
           string_data : this.string_data,
           agency_id: 95930
          })
          .then((response) => {
            console.log(response);
             this.getEncounters();
            // let encounter_id = response.data.service_summary.id
            //  this.$router.push(`/encounter/${encounter_id}`);
            this.string_data = "";
            this.isLoading = false
            this.$toasted.info("Encounted submitted Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
             this.isLoading = false
             this.$toasted.error("Code Error!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    deleteUser(employee) {
      if (confirm("Are you Sure you want to delete this user")) {
        this.axios
          .delete(`/api/v1/auth/deleteUser/${employee.id}`)
          .then((response) => {
            console.log(response);
            this.getEmployees();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created() {
    //
  },
};
</script>
