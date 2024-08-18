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
                    Add Personnel <i class="fe fe-plus"></i>
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
                  <h3 class="p-t-10 searchBy-name">Add Employee</h3>
                </div>

                <div class="card-body">
                  <div class="text-center"></div>

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
                      <label for="inputCity">Job Title</label>
                      <select class="form-control" v-model="register.job_title">
                        <option value="Desk">Desk Officer</option>
                        <!-- <option  value="m_and_e">Monitoring and Evaluation Officer</option> -->
                        <!-- <option  value="qao">Quality Assurance Officer</option> -->
                        <!-- <option value="Doctor">Doctor</option> -->
                        <!-- <option value="Pharmacist">Pharmacist</option> -->
                        <!-- <option value="Nurse">Nurse</option> -->
                        <!-- <option value="Laboratorist">Laboratorist</option> -->
                        <!-- <option  value="receptionist">Receptionist</option> -->
                        <!-- <option value="Accountant">Accountant</option> -->
                        <!-- <option value="Extension Worker">
                          Community health extension workers (CHEWs)
                        </option> -->
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <button class="btn btn-info" @click="registerUser">
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
                  <h1>{{ employees.length }} Employee</h1>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>E mail</th>
                          <th>Phone Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="employee in employees"
                          v-bind:key="employee.id"
                        >
                          <td>
                            {{ employee.full_name }} 
                          </td>
                          <td>{{ employee.email }}</td>
                          <td>{{ employee.phone_number }}</td>
                          <td>
                            <router-link :to="{ path: '/employee/'+ employee.id}">
                            <button
                              type="button"
                              name="button"
                              class="btn btn-info"
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
      employees: "",
      state: "",
      lga_states: "",
      wards: "",
      register: {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        type: "provider_employee",
        state: "",
        username: "",
        institutional_id: "",
        job_title: "",
        lga: "",
        ward: "",
        address: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getEmployee/${this.$route.params.id}`)
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
        .get(`/api/v1/auth/getEmployee/${this.$route.params.id}`)
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
          username: this.register.email,
          password: "euhler",
          state: 2676,
          institutional_id: this.$route.params.id,
          job_title: this.register.job_title,
          role: 0,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify(
            "Employee added successfully!, Default Password is 'euhler' ",
            { position: "top-right" }
          );
          this.getEmployees();
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
      this.register.firstname = "";
      this.register.lastname = "";
      this.register.email = "";
      this.register.phone_number = "";
      this.register.job_title = "";
    },
  },
  created() {
    this.fetchLga();
    this.getEmployees();
  },
};
</script>
