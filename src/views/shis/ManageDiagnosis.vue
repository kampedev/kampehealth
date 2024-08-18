<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
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
                    class="btn btn-info"
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
                    <div class="form-group col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="register.name"
                        placeholder="Disease Name"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label>Select Type</label>
                      <select
                        class="form-control"
                        v-model="register.is_primary"
                      >
                        <option value="1">Primary</option>
                        <option value="0">Secondary</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      class="btn btn-info btn-block"
                      @click="AddDisease"
                    >
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
                          <th>Name</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diag in diagnoses.data" v-bind:key="diag.id">
                          <td>{{ diag.name }}</td>
                          <td>{{ diag.type }}</td>
                          <td>
                            <button
                              class="btn btn-outline-info mr-2"
                              @click="startEdit(diag)"
                            >
                              <i class="fe fe-edit"> </i>
                            </button>

                            <button
                              class="btn btn-outline-danger"
                              @click="deleteDiagnosis(diag)"
                            >
                              <i class="fe fe-delete"> </i>
                            </button>
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
      showadder: false,
      edit: false,
      diagnoses: "",
      register: {
        name: "",
        symptoms: "",
        transmission: "",
        treatment: "",
        is_primary: "",
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
        .get(`/api/v1/auth/diagnosis-agency/439078`)
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
          agency_id: 439078,
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

    deleteDiagnosis(diag) {
      if (confirm("Are you Sure?")) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.axios
          .delete(`/api/v1/auth/diagnosis/${diag.id}`)
          .then((response) => {
            this.getDiagnoses();
            response;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    updateDisease() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .put("/api/v1/auth/diagnosis/" + this.register.id, {
          agency_id: 90,
          is_primary: this.register.is_primary,
          name: this.register.name,
          symptoms: this.register.symptoms,
          transmission: this.register.transmission,
          treatment: this.register.treatment,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.edit = false;
          this.$breadstick.notify("Disease updated successfully! ", {
            position: "top-right",
          });
          this.clearIt();
          this.getDiagnoses();
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
    },

    startEdit(diag) {
      this.edit = true;
      this.register.name = diag.name;
      this.register.id = diag.id;
      this.register.is_primary = diag.is_primary;
    },
  },
  created() {
    this.getDiagnoses();
  },
};
</script>
