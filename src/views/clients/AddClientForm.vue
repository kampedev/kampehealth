<template>
  <section class="admin-content" id="contact-search">
    <!-- <Navbar/> -->
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
                  <form @submit.prevent="registerUserEmployee">
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Sector
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="sector"
                            disabled
                          >
                            <option value="formal">Formal Sector</option>
                            <option value="informal">Informal Sector</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6">
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
                      </div>

                      <div class="col-md-6" v-if="sector == 'informal'">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Informal Sector
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.sector"
                          >
                            <option value="Basic Healthcare Provision Fund">
                              Basic Healthcare Provision Fund
                            </option>
                            <option value="State Equity Program">
                              State Equity Program
                            </option>
                            <!-- <option value="Vulnerable Groups">
                              Vulnerable Groups
                            </option> -->
                            <option value="Voluntary Contributor">
                              Voluntary Contributor
                            </option>
                            <option value="State Pensioners Plan">
                              State Pensioners Plan
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-12" v-if="sector == 'formal'">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Category<span class="text-danger"
                              >*</span
                            ></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.sector"
                          >
                            <option value="Civil Servant">Civil Servant</option>
                            <option value="Oganized Private Sector Plan">
                              Organized Private Sector Plan
                            </option>
                            <option
                              value="Tertiary Student Health Insurance Plan (T-SHIP)"
                            >
                              Tertiary Student Health Insurance Plan (T-SHIP)
                            </option>
                          </select>
                        </div>
                      </div>
                      <div
                        class="form-group col-md-12"
                        v-if="
                          register.sector == 'Basic Healthcare Provision Fund'
                        "
                      >
                        <label>Special Needs</label>
                        <select
                          class="form-control"
                          v-model="register.category_of_vulnerable_group"
                        >
                          <option value="Pregnant Women">Pregnant Women</option>
                          <option value="Children under 5">
                            Children under 5
                          </option>
                          <option value="Aged">Aged</option>
                          <option value="People with Special Needs">
                            People with Special Needs
                          </option>
                          <option value="Poorest of the Poor">
                            Poorest of the Poor
                          </option>
                        </select>
                      </div>

                      <div
                        class="form-group col-md-12"
                        v-if="register.sector == 'State Pensioners Plan'"
                      >
                        <label>Category of Pensioner</label>
                        <select
                          class="form-control"
                          v-model="register.category_of_vulnerable_group"
                        >
                          <option value="Contributory">Contributory</option>
                          <option value="Non-Contributory">
                            Non-Contributory
                          </option>
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="inputEmail4">NIN Number</label>
                        <input
                          type="text"
                          pattern="\d*"
                          maxlength="11"
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
                        <label
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
                          placeholder="Middle Name"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <p>
                          <label for="inputPassword4"
                            >Date of Birth<span class="text-danger">*</span>
                          </label>
                        </p>

                        <input
                          type="date"
                          required
                          :min="minDate"
                          :max="maxDate"
                          class="form-control"
                          v-model="register.dob"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <p>
                          <label for="inputPassword4"
                            >Expiry Date<span class="text-danger">*</span>
                          </label>
                        </p>
                        <input
                          type="date"
                          required
                          class="form-control"
                          v-model="register.expiry_date"
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
                          pattern="\d*"
                          maxlength="11"
                          class="form-control"
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

                      <div
                        class="form-group col-md-6"
                        v-if="register.sector == 'State Pensioners Plan'"
                      >
                        <label for="inputCity">Select MDA</label>
                        <select
                          class="form-control"
                          v-model="register.place_of_work"
                        >
                          <option
                            :value="mda.name"
                            v-for="mda in mdas.data"
                            v-bind:key="mda.id"
                          >
                            {{ mda.name }}
                          </option>
                        </select>
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="register.sector == 'State Pensioners Plans'"
                      >
                        <label for="inputEmail4">File Number</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="register.salary_number"
                          placeholder="File Number"
                        />
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="sector == 'formal'"
                      >
                        <label for="inputEmail4">Grade Level/Step</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="register.grade_level"
                          placeholder="Grade Level/Step"
                        />
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="sector == 'formal'"
                      >
                        <p>
                          <label for="inputPassword4"
                            >Date of First Appointment</label
                          >
                        </p>
                        <date-picker
                          v-model="register.date_of_entry"
                          valueType="format"
                        ></date-picker>
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
                          >Select TPA/HMO
                          <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
                          required
                          v-model="register.org_id"
                        >
                          <option
                            v-for="tpa in tpas"
                            v-bind:key="tpa"
                            :value="tpa.id"
                          >
                            {{ tpa.organization_name }}
                          </option>
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

                      <div class="form-group col-md-6">
                        <label
                          >Principal Facility for Accessing Health Care
                        </label>
                        <v-select
                          v-model="register.provider_id"
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
                        <label for="inputAddress">Home Address</label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="register.address"
                          placeholder="1234 Main St"
                        />
                      </div>
                      <div
                        class="col-md-6"
                        v-if="register.sector == 'State Pensioners Plan'"
                      >
                        <div class="form-group">
                          <label for="inputCity"
                            >Is Dependent Alive
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.dependent_alive"
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div v-if="register.dependent_alive == '1'">
                      <h3 class="h3">Add Spouse</h3>

                      <div
                        v-for="dependent in register.dependants"
                        v-bind:key="dependent"
                        class="card my-4"
                      >
                        <div class="row card-body">
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputPassword4">Surname </label>
                              <input
                                required
                                type="text"
                                class="form-control"
                                v-model="dependent.lastname"
                                placeholder="Surname"
                              />
                            </div>

                            <div class="form-group col-md-6">
                              <label for="inputEmail4">First Name</label>
                              <input
                                required
                                type="text"
                                class="form-control"
                                placeholder="First Name"
                                v-model="dependent.firstname"
                              />
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputPassword4">Middle Name</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Middle Name"
                                v-model="dependent.middle_name"
                              />
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputCity">Gender</label>

                              <select
                                required
                                class="form-control"
                                v-model="dependent.gender"
                              >
                                <option id="Male">Male</option>
                                <option id="Female">Female</option>
                              </select>
                            </div>

                            <div class="form-group col-md-6">
                              <label for="inputCity">NIN Number </label>
                              <input
                                type="text"
                                pattern="\d*"
                                maxlength="11"
                                class="form-control"
                                placeholder="NIN"
                                v-model="dependent.nimc_number"
                              />
                            </div>

                            <div class="form-group col-md-6">
                              <label for="inputCity">Date of Birth </label>
                              <input
                                required
                                type="date"
                                class="form-control"
                                placeholder="YYYY/MM/DD"
                                v-model="dependent.dob"
                              />
                            </div>

                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="inputCity"
                                  >Is Dependent a Civil Servant
                                  <span class="text-danger">*</span></label
                                >
                                <select
                                  required
                                  class="form-control"
                                  v-model="dependent.is_civil_servant"
                                >
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group col-md-6">
                              <label for="inputPassword4">Phone Number</label>
                              <input
                                required
                                type="text"
                                pattern="\d*"
                                maxlength="11"
                                class="form-control"
                                id="inputPassword4"
                                placeholder="Mobile No"
                                v-model="dependent.phone_number"
                              />
                            </div>
                          </div>
                        </div>
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
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    Loading,
    DatePicker,
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
      selected_provider: "",
      selected_provider_dependents: "",
      lga_states: "",
      register: {
        firstname: "",
        lastname: "",
        middlename: "",
        nimc_number: "",
        email: "",
        phone_number: "",
        plan_type: "",
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
        expiry_date: "",
        salary_number: "",
        provider_id: "",
        point_of_care: "",
        sector: "",
        finger_print: "",
        place_of_work: "",
        org_id: "",
        grade_level: "",
        date_of_entry: "",
        marital_status: "",
        category_of_vulnerable_group: "",
        dependants: [
          {
            relationShipType: "Spouse",
            is_civil_servant: "",
            firstname: "",
            lastname: "",
            middlename: "",
            institution_attending: "",
            provider: "0",
            agency_id: "95930",
            state: "2676",
            email: "",
            phone_number: "",
            gender: "",
            dob: "",
            id_card_number: "AAA",
            enrolled_by: "1",
          },
        ],
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  computed: {
    minDate() {
      if (this.register.sector == "State Pensioners Plan") {
        // const min = new Date(this.currentDate);
        // min.setFullYear(min.getFullYear() - 60);
        // return min.toISOString().split("T")[0];
        return "1920-01-01";
      }
      return null;
    },

    maxDate() {
      if (this.register.sector == "State Pensioners Plan") {
        return "1964-01-01";
      }
      return null;
    },
  },

  methods: {
    submitForm() {
      if (this.user.type == "employee") {
        if (this.register.provider_id != "") {
          this.registerUserEmployee();
        } else {
          this.$toasted.error(`Facility cannot be null`, {
            position: "top-center",
            duration: 3000,
          });
        }
      }

      if (this.user.type == "tpa" || this.user.type == "tpa_employee") {
        if (this.register.provider_id != "") {
          this.registerUserTPA();
        } else {
          this.$toasted.error(`Facility cannot be null`, {
            position: "top-center",
            duration: 3000,
          });
        }
      }

      // console.log(this.register);
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
    getMDAs() {
      this.axios
        .get(`/api/v1/auth/ministry/95930`)
        .then((response) => {
          this.mdas = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTPAs() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/getorgenrollment/95930/A`)
        .then((response) => {
          this.tpas = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    registerUserTPA() {
      // console.log(this.selected_provider ? this.selected_provider : this.register.provider_id);
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/registerProvider", {
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname.toUpperCase(),
          lastname: this.register.lastname.toUpperCase(),
          middlename: this.register.middlename.toUpperCase(),
          email: this.register.email,
          phone_number: this.register.phone_number,
          plan_type: this.register.plan_type,
          type: this.register.type,
          sectorType: this.sector,
          agency_id: 95930,
          provider_id: this.register.provider_id.id,
          state: "2676",
          role: 0,
          password: "euhler",
          org_id: this.register.org_id,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          expiry_date: this.register.expiry_date,
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
          enrolled_by: this.user.id,
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

    registerUserEmployee() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/registerProvider", {
          agency_id: 95930,
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname.toUpperCase(),
          lastname: this.register.lastname.toUpperCase(),
          middlename: this.register.middlename.toUpperCase(),
          email: this.register.email,
          phone_number: this.register.phone_number,
          plan_type: this.register.plan_type,
          type: this.register.type,
          sectorType: this.sector,
          provider_id: this.register.provider_id.id,
          state: "2676",
          role: 0,
          password: "euhler",
          org_id: this.register.org_id,
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          expiry_date: this.register.expiry_date,
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
          enrolled_by: this.user.id,
          dependants: this.register.dependants,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          // this.getClients();
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
          // this.getClients();
          this.$toasted.error(`Ooop! Not added`, {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));
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

    getProvidersByWards() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(
          `/api/v1/auth/providerAgencies/95930/${this.register.localgovt}/${this.register.ward}`
        )
        .then((response) => {
          this.providers_wards = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.fetchLga();
    this.getMDAs();
    this.getProviders();
    this.getTPAs();
  },
};
</script>
