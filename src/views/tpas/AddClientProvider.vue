<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10"></div>
              <h3 class="h3">Add Client</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <section class="admin-content" id="contact-search">
            <main class="admin-main">
              <section class="">
                <div class="">
                  <div class="row list">
                    <div class="col-lg-12 col-md-12">
                      <div class="card m-b-30">
                        <div class="card-body">
                          <div class="text-center">
                            <h1><strong>Add Enrollee Form </strong></h1>
                            <p>
                              (All fields marked with
                              <span class="text-danger">*</span> are compulsory)
                            </p>
                          </div>
                          <form @submit.prevent="registerUser">
                            <div class="form-row">
                              <div class="form-group col-md-4">
                                <label for="inputPassword4"
                                  >Surname
                                  <span class="text-danger">*</span></label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  required
                                  v-model="register.lastname"
                                  placeholder="Last Name"
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <label for="inputEmail4"
                                  >First Name
                                  <span class="text-danger">*</span></label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  required
                                  v-model="register.firstname"
                                  placeholder="First Name"
                                />
                              </div>

                              <div class="form-group col-md-4">
                                <label for="inputPassword4">Middle Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="register.middlename"
                                  placeholder="Middle Name"
                                />
                              </div>
                            </div>

                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <label for="inputEmail4">NIN Number</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="register.nimc_number"
                                  placeholder="NIN Number"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <p>
                                  <label for="inputPassword4"
                                    >Date of Birth<span class="text-danger"
                                      >*</span
                                    >
                                  </label>
                                </p>

                                <input
                                  type="date"
                                  required
                                  class="form-control"
                                  v-model="register.dob"
                                />
                              </div>

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
                                <label for="inputPassword4"
                                  >Phone Number
                                  <span class="text-danger">*</span></label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="register.phone_number"
                                  placeholder="Phone Number"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <label for="inputCity"
                                  >Gender
                                  <span class="text-danger">*</span></label
                                >
                                <select
                                  class="form-control"
                                  required
                                  v-model="register.gender"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>

                              <div class="form-group col-md-6">
                                <label
                                  >Marital Status
                                  <span class="text-danger">*</span></label
                                >
                                <select
                                  class="form-control"
                                  required
                                  v-model="register.marital_status"
                                >
                                  <option value="Married">Married</option>
                                  <option value="Widow">Widow</option>
                                  <option value="Single">Single</option>
                                  <option value="Separated">Separated</option>
                                  <option value="Divorced">Divorced</option>
                                </select>
                              </div>

                              <div class="form-group col-md-6">
                                <label for="inputCity"
                                  >LGA <span class="text-danger">*</span></label
                                >
                                <select
                                  class="form-control"
                                  required
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
                              </div>

                              <div class="form-group col-md-6">
                                <label>Ward </label>
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
                              </div>

                              <!-- <div class="form-group col-md-6">
                        <label
                          >Principal Facility for Accessing Health Care
                        </label>
                        <v-select
                          v-model="register.provider_id"
                          :options="providers"
                          label="agency_name"
                          :value="register.provider_id"
                        ></v-select>
                      </div> -->

                              <div class="form-group col-md-6">
                                <label for="inputCity">Blood Group</label>
                                <select
                                  class="form-control"
                                  v-model="register.blood"
                                >
                                  <option value="A+">A+</option>
                                  <option value="A-">A-</option>
                                  <option value="B+">B+</option>
                                  <option value="B-">B-</option>
                                  <option value="AB+">AB+</option>
                                  <option value="AB-">AB-</option>
                                  <option value="O+">O+</option>
                                  <option value="O-">O-</option>
                                </select>
                              </div>

                              <div class="form-group col-md-6">
                                <label for="inputAddress">Home Address</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="register.address"
                                  placeholder="1234 Main St"
                                />
                              </div>
                            </div>

                            <div class="form-group">
                              <button class="btn btn-success btn-block btn-lg">
                                Submit <i class="fe fe-send"></i>
                              </button>
                            </div>
                          </form>
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
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      providers: "",
      user: null,
      state: "",
      lga_states: "",
      wards: "",
      register: {
        sectorType: "informal",
        sector: "External Enrollee",
        firstname: "",
        lastname: "",
        middlename: "",
        nimc_number: "",
        email: "",
        phone_number: "",
        type: "client",
        agency_id: "",
        state: "",
        localgovt: "",
        ward: "",
        address: "",
        blood: "",
        weight: "",
        gender: "",
        genotype: "",
        dob: "",
        salary_number: "",
        provider_id: "",
        point_of_care: "",
        finger_print: "",
        place_of_work: "",
        grade_level: "",
        date_of_entry: "",
        marital_status: "",
        category_of_vulnerable_group: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.register.provider_id = this.user.institutional_id;
  },
  methods: {
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
        .post("/api/v1/auth/register", {
          sectorType: this.register.sectorType,
          sector: this.register.sector,
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          middlename: this.register.middlename,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          agency_id: 95930,
          org_id: 24,
          provider_id: this.register.provider_id,
          state: "2676",
          role: 0,
          password: "euhler",
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          address1: this.register.address,
          gender: this.register.gender,
          marital_status: this.register.marital_status,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info("Client added Successfully", {
            position: "top-center",
            duration: 3000,
          });
          let user_id = response.data.data.id;

          this.$router.push(`/client/${user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.response = error.response.data.errors;
          if (this.response.firstname != null) {
            this.$toasted.error(`${this.response.firstname}`, {
              position: "top-center",
              duration: 3000,
            });
          }
          if (this.response.lastname != null) {
            this.$toasted.error(`${this.response.lastname}`, {
              position: "top-center",
              duration: 3000,
            });
          }
          if (this.response.phone_number != null) {
            this.$toasted.error(`${this.response.phone_number}`, {
              position: "top-center",
              duration: 3000,
            });
          }
        });
    },
  },
  created() {
    this.fetchLga();
    this.getProviders();
  },
};
</script>
