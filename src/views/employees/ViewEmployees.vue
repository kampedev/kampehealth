<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar ">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <strong class="h4 text-dark"
                >{{ employees.length }} Employees</strong
              >
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Picture</th>
                          <th>Name</th>
                          <th>E mail</th>
                          <th>Phone Number</th>
                          <th>Job Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="employee in employees.data"
                          v-bind:key="employee.id"
                        >
                          <td>
                            <div
                              class="avatar avatar-sm "
                              v-if="employee.user_image != null"
                            >
                              <img
                                :src="
                                  `https://kampe.hayokmedicare.ng/image/${employee.user_image}`
                                "
                                class="avatar-img avatar-sm rounded-circle"
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            {{ employee.full_name }} 
                          </td>
                          <td>
                            {{ employee.email }}
                            <button
                              type="button"
                              class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                              v-if="employee.user_role == 1"
                            >
                              admin
                            </button>
                          </td>
                          <td>{{ employee.phone_number }}</td>
                          <td> <strong>{{employee.job_title }}</strong> </td>
                          <td>
                            <router-link
                              :to="{ path: '/employee/' + employee.id }"
                            >
                              <button
                                type="button"
                                class="btn btn-success mr-1"
                                name="button"
                              >
                                <i class="fe fe-eye"></i>
                              </button>
                            </router-link>
                            <button
                              type="button"
                              @click="deleteUser(employee)"
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
      fullPage: true,
      states: "",
      employees: "",
      state: "",
      lga_states: "",
      register: {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        type: "client",
        username: "",
        state: "",
        lga: "",
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
        this.employees = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getEmployees() {
      this.axios
        .get(`/api/v1/auth/getEmployee/439078`)
        .then((response) => {
          this.employees = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
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
    registerUser() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/register", {
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          username: this.register.username,
          state: this.state,
          role: 0,
          lga: this.register.lga,
          ward: this.register.ward,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify("Client added successfully", {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
    },
  },
  created() {
    //
  },
};
</script>
