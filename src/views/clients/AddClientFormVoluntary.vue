<template>
  <section class="admin-content" id="contact-search">
    <div class="bg-info m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <p class="h4">
              <strong>Kampe Enrollment (Nigeria) </strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <main class="admin-main">
      <section class="container">
        <div class="">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30" style="margin-top: 35px">
                <div class="card-body">
                  <div class="text-center">
                    <p>
                      (All fields marked with
                      <span class="text-danger">*</span> are compulsory)
                    </p>
                  </div>
                  <form @submit.prevent="submitForm">
                    <div class="form-row">
                      <div class="col-md-6" v-if="sector == 'informal'">
                        <div class="form-group">
                          <label for="inputCity"
                            >Category<span class="text-danger">*</span></label
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

                      <!-- <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Plan Type
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.plan_type"
                          >
                            <option value="Family">Family</option>
                            <option value="Individual">Individual</option>
                          </select>
                        </div>
                      </div> -->

                      <div
                        class="form-group col-md-6"
                        v-if="register.sector == 'Civil Servant'"
                      >
                        <label for="inputCity">Select MDA</label>
                        <select
                          class="form-control"
                          v-model="register.place_of_work"
                          required
                        >
                          <option
                            :value="mda.name"
                            v-for="mda in mdas"
                            v-bind:key="mda.id"
                          >
                            {{ mda.name }}
                          </option>
                        </select>
                      </div>
                      <div
                        class="form-group col-md-6"
                        v-if="
                          register.sector ==
                          'Tertiary Student Health Insurance Plan (T-SHIP)'
                        "
                      >
                        <label for="inputEmail4">Institution Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="register.place_of_work"
                          placeholder="example; University of Ife"
                        />
                      </div>
                      <div
                        class="form-group col-md-6"
                        v-if="
                          register.sector == 'Organized Private Sector Plan'
                        "
                      >
                        <label for="inputEmail4">Organization Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="register.place_of_work"
                          placeholder="example;  Name of Company"
                        />
                      </div>

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
                      <div class="form-group col-md-6">
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

                      <div class="form-group col-md-6">
                        <label for="inputPassword4">Middle Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="register.middlename"
                          placeholder="Last Name"
                        />
                      </div>

                      <!-- </div>

                                                         <div class="form-row"> -->
                      <div class="form-group col-md-6">
                        <p>
                          <label for="inputPassword4"
                            >Date of Birth <span class="text-danger">*</span>
                          </label>
                        </p>

                        <input
                          type="date"
                          required
                          class="form-control"
                          v-model="register.dob"
                          placeholder="DD/MM/YYYY"
                        />
                      </div>

                      <div class="form-group col-md-6">
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
                          maxlength="11"
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
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity">State </label>

                        <select
                          class="form-control"
                          v-model="register.state"
                          @change="fetchLga(register.state)"
                        >
                          <option
                            v-for="state in states"
                            v-bind:key="state"
                            :value="state.id"
                          >
                            {{ state.name }}
                          </option>
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputCity"
                          >LGA <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
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
                      </div>

                      <div class="form-group col-md-6">
                        <label>Facility for Accessing Healthcare </label>
                        <v-select
                          v-model="register.provider_id"
                          required
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

                      <div class="form-group col-md-6">
                        <label for="inputAddress"
                          >Home Address
                          <span class="text-danger">*</span></label
                        >
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

                    <div class="form-group">
                      <button class="btn btn-info btn-block btn-lg">
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
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import plansJSON from "@/jsons/nigerian_plans.json";

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
      sector: "informal",
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
      register: {
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
        expiry_date: new Date(),
        salary_number: "",
        provider_id: "",
        point_of_care: "",
        sector: "Voluntary Contributor",
        finger_print: "",
        place_of_work: "",
        org_id: "",
        grade_level: "",
        date_of_entry: "",
        marital_status: "",
        enrolled_by: 0,
      },
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

    getStates() {
      this.axios
        .get(`/api/v1/auth/states`)
        .then((response) => {
          this.states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchLga(state) {
      this.axios
        .get(`/api/v1/auth/lga/${state}`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    registerUserAdmin() {
      this.isLoading = true;
      let snap = localStorage.getItem("voluntary_snap");

      this.axios
        .post("/api/v1/auth/register", {
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname.toUpperCase(),
          lastname: this.register.lastname.toUpperCase(),
          middlename: this.register.middlename.toUpperCase(),
          email: this.register.email,
          plan_type: "Individual",
          phone_number: this.register.phone_number,
          type: this.register.type,
          sectorType: this.sector,
          user_image: snap,
          agency_id: 439078,
          provider_id: this.register.provider_id.id,
          state: this.register.state,
          role: 0,
          password: "jacobi",
          org_id: 0,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          address1: this.register.address,
          genotype: this.register.genotype,
          weight: this.register.weight,
          gender: this.register.gender,
          sector: this.register.sector,
          place_of_work: this.register.place_of_work,
          point_of_care: this.register.provider_id.id,
          finger_print: this.register.finger_print,
          salary_number: this.register.salary_number,
          grade_level: this.register.grade_level,
          date_of_entry: this.register.date_of_entry,
          marital_status: this.register.marital_status,
          category_of_vulnerable_group:
            this.register.category_of_vulnerable_group,
          enrolled_by:
            this.register.enrolled_by == null ? 0 : this.register.enrolled_by,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info(
            "Submited Successfully. Make Payment to complete your registration.",
            { position: "top-center", duration: 8000 }
          );
          let user_id = response.data.data.id;

          this.$router.push(`/subscribe-${user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.response = error.response.data.errors;
          this.$toasted.error(`${JSON.stringify(this.response)}`, {
            position: "top-center",
            duration: 3000,
          });
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
    this.getProviders();
    this.getStates();
    this.getEmployees();
  },
};
</script>
