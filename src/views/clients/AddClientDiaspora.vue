<template>
  <section class="admin-content" id="contact-search">
    <div class="bg-info m-b-20">
      <div class="container">
        <div class="row p-b-30 p-t-30">
          <div class="text-center mx-auto text-white p-b-30">
            <p class="h4">
              <strong> Kampe Enrollment (Diaspora) </strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <main class="admin-main">
      <section class="container">
        <div class="">
          <div class="">
            <div class="row">
              <div
                class="card col-md-12"
                v-for="register in registrations"
                :key="register"
              >
                <div class="card-body">
                  <div class="text-center">
                    <p>
                      (All fields marked with
                      <span class="text-danger">*</span> are compulsory)
                    </p>
                  </div>
                  <form @submit.prevent="submitForm">
                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Plan
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.sector"
                          >
                            <option
                              :value="plan.name"
                              v-for="plan in plans"
                              :key="plan.id"
                            >
                              {{ plan.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputPassword4"
                          >Surname <span class="text-danger">*</span></label
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
                          >First Name <span class="text-danger">*</span></label
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

                      <div class="form-group col-md-4">
                        <p>
                          <label for="inputPassword4">Date of Birth <span class="text-danger">*</span> </label>
                        </p>

                        <input
                          type="date"
                          required
                          class="form-control"
                          v-model="register.dob"
                          placeholder="DD/MM/YYYY"
                        />
                      </div>

                      <div class="form-group col-md-6" v-show="false">
                        <p><label for="inputPassword4">Expiry Date:</label></p>
                        <input
                          type="text"
                          class="form-control"
                          v-model="addYear"
                          placeholder=""
                          disabled
                        />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="inputEmail4"
                          >Email <span class="text-danger">*</span></label
                        >
                        <input
                          type="email"
                          class="form-control"
                          required
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
                          pattern="\d*"
                          maxlength="15"
                          class="form-control"
                          required
                          v-model="register.phone_number"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputCity"
                          >Gender <span class="text-danger">*</span></label
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
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label>Health Facility </label>
                        <v-select
                          v-model="register.provider_id"
                          required
                          :reduce="(agency_name) => agency_name.id"
                          :options="providers"
                          label="agency_name"
                          :value="register.provider_id"
                        ></v-select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">Blood Group</label>
                        <select class="form-control" v-model="register.blood">
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

                      <!-- <div class="form-group col-md-6">
                        <label for="inputCity"
                          >LGA <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
                          required
                          v-model="register.localgovt"
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

                      <div class="form-group col-md-6">
                        <label for="inputAddress"
                          >Home Address <span class="text-danger">*</span>

                          <span class="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="register.address"
                          placeholder="1234 Main St"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity"> Select Marketer</label>
                        <select
                          class="form-control"
                          v-model="register.enrolled_by"
                        >
                          <option
                            :value="emoployee.id"
                            v-for="emoployee in employees.data"
                            v-bind:key="emoployee.id"
                          >
                            {{ emoployee.full_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="form-row my-3">
                      <div class="col-md-12">
                        <button class="btn btn-info btn-block btn-lg">
                          Proceed to Pay <i class="fe fe-send"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="card col-md-4" v-show="false">
                <div class="card-body">
                  <p class="h4">Enrollees</p>

                  <p v-for="(data, index) in registrations" :key="data">
                    {{ index + 1 }}. {{ data.firstname }} {{ data.lastname }}

                    <button
                      type="button"
                      @click="removeArray(index)"
                      class="btn btn-outline-danger"
                    >
                      <i class="fe fe-delete"></i>
                    </button>
                  </p>
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
import plansJSON from "@/jsons/diaspora_plans.json";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      states: "",
      show: false,
      clients: "",
      providers: "",
      mdas: "",
      wards: "",
      tpas: "",
      providers_wards: "",
      state: "",
      OfficerDetails: "",
      current_page: "",
      image: "",
      imagefile: null,
      lga_states: "",
      response: "",
      plans: plansJSON,
      employees: "",
      registrations: [
        {
          firstname: "",
          lastname: "",
          middlename: "",
          email: "",
          sector: "Diaspora Contributor",
          sectorType: "informal",
          plan_type: "Individual",
          phone_number: "",
          type: "client",
          agency_id: "439078",
          state: "",
          localgovt: "",
          ward: "",
          address: "",
          blood: "",
          gender: "",
          genotype: "",
          dob: "",
          expiry_date: new Date(),
          provider_id: "",
          org_id: "1",
          marital_status: "",
        },
      ],
    };
  },
  beforeMount() {
    //
  },
  computed: {
    addYear() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 1, month, day);
      // var c = new Date(year + 1);
      console.log(c);
      return c;
    },

    getTPA() {
      let osunlgaarray = this.tpa_Lga.lgas;
      // return osunlgaarray
      let formatter = osunlgaarray.filter(
        (x) => x.id == this.register.localgovt
      );
      console.log(formatter);
      return formatter[0];
    },
  },

  methods: {
    submitForm() {
      if (confirm("Are you sure you want to submit?")) {
        this.registerUserAdmin();
      }
    },

    addArray() {
      this.registrations.push({
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        sector: "Voluntary Contributor",
        sectorType: "informal",
        plan_type: "Individual",
        phone_number: "",
        type: "client",
        agency_id: "439078",
        state: "2676",
        role: 0,
        localgovt: "",
        ward: "",
        address: "",
        blood: "",
        gender: "",
        genotype: "",
        dob: "",
        expiry_date: new Date(),
        provider_id: "",
        org_id: "24",
        marital_status: "",
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

    removeArray(index) {
      if (this.registrations.length != 1) {
        // only splice array when item is found
        this.registrations.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        this.$toasted.error("Minimum of 1 Enrollee", {
          position: "top-center",
          duration: 3000,
        });
      }

      console.log(this.registrations);
    },

    registerUserAdmin() {
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/register", this.registrations[0])
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info(
            "Submited Successfully. Make Payment to complete your registration.",
            { position: "top-center", duration: 8000 }
          );
          let user_id = response.data.data.id;

          this.$router.push(`/subscribediaspora-${user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.response = error.response.data.errors;
        });
    },

    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/439078`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getEmployees() {
      this.axios
        .get(`/api/v1/auth/getEmployee/439078`, {
          params: {
            job_title: "marketer",
          },
        })
        .then((response) => {
          this.employees = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getEmployees();
    this.getProviders();
  },
};
</script>
  