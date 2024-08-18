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
              <p class="h3 text-dark">{{ employees.length }} Employees</p>
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
                  <div class="text-center">
                    <h3 class="h4">Add Employee KAMPE</h3>
                  </div>
                </div>

                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="register.firstname"
                        placeholder="First Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="register.lastname"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="register.email"
                        placeholder="Email"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="register.phone_number"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <!-- <div class="form-group col-md-6">
                      <label for="inputCity">LGA</label>
                      <select
                        class="form-control"
                        v-model="register.localgovt"
                        @change="fetchWards($event)"
                      >
                        <option
                          v-for="lga in lga_states"
                          v-bind:key="lga"
                          :value="lga.id"
                        >
                          {{ lga.local_name }}
                        </option>
                      </select>
                    </div> -->

                    <!-- <div class="form-group col-md-6">
                      <label>Ward</label>
                      <select
                        class="form-control"
                        v-model="register.ward"
                        @change="getProvidersByWards($event)"
                      >
                        <option
                          v-for="ward in wards"
                          v-bind:key="ward.id"
                          :value="ward.id"
                        >
                          {{ ward.ward_name }}
                        </option>
                      </select>
                    </div> -->
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Job Title/Depatment</label>
                      <select class="form-control" v-model="register.job_title">
                        <option value="Administrative Officer">
                          Administrative Staff
                        </option>
                        <!-- <option  value="ICT">ICT Department</option> -->
                        <option value="Claims Vetter">Claims Vetter</option>
                        <option value="Claims Verifier">Claims Verifier</option>
                        <option value="Enrollment Officer">
                          Enrollment Officer
                        </option>
                        <option value="Quality Assurance">
                          Quality Assurance
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Role</label>
                      <select class="form-control" v-model="register.role">
                        <option :value="admin_role">Admin</option>
                        <option :value="user_role">Maintainer</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      class="btn btn-info btn-block btn-lg"
                      @click="registerUser"
                    >
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
      employees: "",
      state: "",
      lga_states: "",
      wards: "",
      admin_role: 1,
      user_role: 0,
      register: {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        type: "employee",
        state: "",
        institutional_id: "",
        job_title: "",
        lga: "",
        id_card_number: "",
        ward: "",
        address: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getEmployee/439078`)
      .then((response) => {
        this.employees = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getEmployees() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getEmployee/439078`)
        .then((response) => {
          this.employees = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchWards() {
      this.axios
        .get(`/api/v1/auth/getwards/${event.target.value}`)
        .then((response) => {
          this.wards = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchLga() {
      this.axios
        .get(`/api/v1/auth/lga/2676`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    registerUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/registerProvider", {
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          password: "euhler",
          state: "2676",
          enrolled_by: 0,
          org_id: 10,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          id_card_number: this.register.id_card_number,
          institutional_id: 439078,
          job_title: this.register.job_title,
          user_role: this.register.role,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.getEmployees();

          this.$toasted.info("Employee added Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.$toasted.info("Employee Password is 'euhler' ", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Error ", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
  },
  created() {
    this.fetchLga();
  },
};
</script>
