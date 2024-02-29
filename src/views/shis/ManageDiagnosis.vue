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
              <p class="h3">{{ diagnoses.total }} Diseases</p>
            </div>
          </div>
        </div>
      </div>

      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="showadder = !showadder"
                  >
                    Add Disease <i class="fe fe-plus"></i>
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
                  <h3 class="p-t-10 searchBy-name">Add Disease</h3>
                </div>

                <div class="card-body">
                  <div class="text-center"></div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputEmail4">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="register.name"
                        placeholder="Disease Name"
                      />
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputAddress">Symptoms</label>
                      <textarea
                        name="name"
                        rows="5"
                        cols="80"
                        class="form-control"
                        v-model="register.symptoms"
                      ></textarea>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputAddress">Transmission</label>
                      <textarea
                        name="name"
                        rows="5"
                        cols="80"
                        class="form-control"
                        v-model="register.transmission"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputAddress">Treatment</label>
                      <textarea
                        name="name"
                        rows="5"
                        cols="80"
                        class="form-control"
                        v-model="register.treatment"
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <button class="btn btn-primary" @click="AddDisease">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h1>{{ diagnoses.total }} Diseases</h1>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <!-- <th>Avatar</th> -->
                          <th>Name</th>
                          <th>Symptoms</th>
                          <th>Diagnosis</th>
                          <th>Treatment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diag in diagnoses.data" v-bind:key="diag.id">
                          <td>{{ diag.name }}</td>
                          <td>{{ diag.symptoms }}</td>
                          <td>{{ diag.diagnosis }}</td>
                          <td>{{ diag.treatment }}</td>
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
      showadder: false,
      diagnoses: "",
      state: "",
      lga_states: "",
      wards: "",
      register: {
        name: "",
        symptoms: "",
        transmission: "",
        treatment: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
   
  },
  methods: {
    getDiagnoses() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/diagnosis-agency/95930`)
        .then((response) => {
          this.diagnoses = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    AddDisease() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/diagnosis", {
          agency_id: 95930,
          name: this.register.name,
          symptoms: this.register.symptoms,
          transmission: this.register.transmission,
          treatment: this.register.treatment,
          is_primary: false,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify("Disease added successfully! ", {
            position: "top-right",
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
      this.register.name = "";
      this.register.treatment = "";
      this.register.symptoms = "";
      this.register.transmission = "";
    },
  },
  created() {
    this.getDiagnoses();
  },
};
</script>
