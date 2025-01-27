<template>
  <section class="admin-content" id="contact-search">
    <div class="bg-info m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <p class="h4">
              <strong>Kampe Enrollment </strong>
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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Category
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            @change="fetchPlans"
                            required
                            v-model="register.plan_type"
                          >
                            <option
                              :value="plan.id"
                              v-for="plan in plan_categories"
                              :key="plan"
                            >
                              {{ plan.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6">
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
                              :value="plan.id"
                              v-for="plan in plans"
                              :key="plan.id"
                            >
                              {{ plan.title }}

                              (
                              <i
                                class="mdi mdi-currency-ngn"
                                v-if="$route.params.type == 'nigeria'"
                              ></i>
                              <i class="mdi mdi-currency-usd" v-else></i>

                              {{ plan.cost | numeral(0, 0) }})
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        class="col-md-6"
                        v-if="register.plan_type == 'Domestic Plans'"
                      >
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Plan<span class="text-danger"
                              >*</span
                            ></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.sector"
                          >
                            <option
                              :value="plan.name"
                              v-for="plan in nigerian_plans"
                              :key="plan.id"
                            >
                              {{ plan.name }} (₦{{
                                plan.price | numeral(0, 0)
                              }})
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="register.plan_type == 'HDPTC Plans'"
                      >
                        <label for="inputCity">Select Plan</label>
                        <select
                          class="form-control"
                          v-model="register.sector"
                          required
                        >
                          <option
                            :value="plan.name"
                            v-for="plan in hdptc_plans"
                            v-bind:key="plan.id"
                          >
                            {{ plan.name }} (₦{{ plan.price | numeral(0, 0) }})
                          </option>
                        </select>
                      </div>

                      <div
                        class="col-md-6"
                        v-if="register.plan_type == 'Diaspora Plans'"
                      >
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
                              v-for="plan in diaspora_plans"
                              :key="plan.id"
                            >
                              {{ plan.name }} (${{
                                plan.price | numeral(0, 0)
                              }})
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        class="col-md-6"
                        v-if="register.plan_type == 'Diaspora HDPTC Plans'"
                      >
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
                              v-for="plan in diaspora_hdptc_plans"
                              :key="plan.id"
                            >
                              {{ plan.name }} (${{
                                plan.price | numeral(0, 0)
                              }})
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        class="form-group col-md-6"
                        v-if="register.plan_type == 'School Plans'"
                      >
                        <label for="inputCity">Select Plan</label>
                        <select
                          class="form-control"
                          v-model="register.sector"
                          required
                        >
                          <option
                            :value="plan.name"
                            v-for="plan in school_plans"
                            v-bind:key="plan.id"
                          >
                            {{ plan.name }} (₦{{ plan.price | numeral(0, 0) }})
                          </option>
                        </select>
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
                        <!-- <v-select
                          v-model="register.provider_id"
                          required
                          :options="providers"
                          label="agency_name"
                          :value="register.provider_id"
                        ></v-select> -->

                        <select
                          class="form-control"
                          v-model="register.provider_id"
                        >
                          <option
                            v-for="provider in providers"
                            v-bind:key="provider"
                            :value="provider"
                          >
                            <span class="h2">{{ provider.agency_name }} </span>
                            <span class="text-sm">
                              ({{ provider.address1 }})</span
                            >
                          </option>
                        </select>
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

                    <div class="form-group col-md-12">
                      <label for="">
                        Has any application for life, health or critical illness
                        insurance ever been declined, postponed, loaded or been
                        made subject to any special conditions by any insurance
                        company?
                      </label>

                      <!-- pp:{{ register.quality_assurance.response.response }} -->

                      <select
                        class="form-control"
                        v-model="register.quality_assurance.response.response"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div class="form-group col-md-12">
                      <p class="h4">Underlying Health Conditions</p>
                      <label
                        class="cstm-switch"
                        v-for="condition in conditions"
                        :key="condition"
                      >
                        <input
                          type="checkbox"
                          v-model="register.conditions"
                          :value="condition"
                          class="cstm-switch-input"
                        />
                        <span class="cstm-switch-indicator"></span>
                        <span class="cstm-switch-description mr-4">
                          {{ condition.encounter_outcome }}
                        </span>
                      </label>
                    </div>

                    <div class="form-group col-md-12">
                      <button
                        class="btn btn-outline-info"
                        type="button"
                        @click="takePicAndroid"
                      >
                        Capture Photo <i class="fe fe-camera"></i>
                      </button>

                      <div
                        class="fileinput fileinput-new"
                        data-provides="fileinput"
                      >
                        <span class="btn btn-file">
                          <span class="fileinput-new"
                            >Upload Photo <i class="fe fe-upload"></i
                          ></span>
                          <span class="fileinput-exists">Change</span>
                          <input
                            type="file"
                            name="..."
                            multiple
                            v-on:change="attachPic"
                          />
                          <pre id="output"></pre>
                        </span>
                        <span class="fileinput-filename"></span>
                        <a
                          href="#"
                          class="close fileinput-exists"
                          data-dismiss="fileinput"
                          style="float: none"
                          >&times;</a
                        >
                      </div>
                    </div>

                    <div class="form-group col-md-6">
                      <img
                        v-if="register.user_image"
                        :src="`${register.user_image}`"
                        class="rounded"
                        alt="User Photo"
                        onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                      />
                    </div>

                    <div class="col-md-12">
                      <AddDependentVoluntary @clicked="onClickChild" />
                    </div>

                    <div>
                      <p class="mb-2">
                        <strong>
                          Declaration & warranty on behalf of all persons
                          proposed to be insured</strong
                        >
                      </p>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I/We hereby declare, on my behalf and on behalf of all
                          persons proposed to be insured that the above
                          statements, answers and/or particulars given by me are
                          true and complete in all respects to the best of my
                          knowledge and that I/We am/ are authorized to propose
                          on behalf of these other persons.
                        </label>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I understand that the information provided by me will
                          form the basis of insurance policy, is subject to the
                          Board approved underwriting policy of the Insurance
                          Company and that the policy will come into force only
                          after full receipt of the premium chargeable.
                        </label>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I/ We further declare that I/We will notify in writing
                          any change occurring in the occupation or general
                          health of the life to be insured/ proposer after the
                          proposal has been submitted but before communication
                          of the risk acceptance by the company.
                        </label>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I/We declare and consent to the company seeking
                          medical information from any hospital who at any time
                          has attended on the life to be insured/ proposer or
                          from any past or present employer concerning anything
                          which affects the physical and mental health of the
                          life to be assured/proposer and seeking information
                          from any insurance company to which an application for
                          insurance on the life to be assured/ proposer has been
                          made for the purpose of underwriting the proposal
                          and/or claim settlement.
                        </label>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I/ We authorize the company to share information
                          pertaining to my proposal including the medical
                          records for the sole purpose of proposal underwriting
                          and/or claims settlement and with any Governmental
                          and/or Regulatory Authority.
                        </label>
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
import AddDependentVoluntary from "@/views/clients/AddDependentVoluntary.vue";
import nigeriaPlansJSON from "@/jsons/nigerian_plans.json";
import diasporaPlansJSON from "@/jsons/diaspora_plans.json";
import diasporaHDPTCPlansJSON from "@/jsons/hdptc_diaspora_plans.json";
import HDPTCPlansJSON from "@/jsons/hdptc_nigerian_plans.json";
import schoolPlansJSON from "@/jsons/school_plans.json";
import conditionsJSON from "@/jsons/conditions.json";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default {
  components: {
    Loading,
    AddDependentVoluntary,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      dependents: "",
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
      plans: "",
      plan_categories: "",
      plan_categories_local: ["Domestic Plans", "HDPTC Plans", "School Plans"],
      plan_categories_diaspora: ["Diaspora Plans", "Diaspora HDPTC Plans"],
      nigerian_plans: nigeriaPlansJSON,
      diaspora_plans: diasporaPlansJSON,
      hdptc_plans: HDPTCPlansJSON,
      diaspora_hdptc_plans: diasporaHDPTCPlansJSON,
      school_plans: schoolPlansJSON,
      conditions: conditionsJSON,
      employees: "",
      selected_employee: "",
      Imagefile: "",
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
        sector: "",
        finger_print: "",
        place_of_work: "",
        org_id: "",
        grade_level: "",
        date_of_entry: "",
        marital_status: "",
        user_image: "",
        enrolled_by: 0,
        conditions: [],
        quality_assurance: {
          facility_id: 0,
          form_id: 1,
          accreditation_category: "",
          quality_assurance_type: "principal",
          name_of_contact_person: "",
          team_leader: "",
          agency_id: 0,
          response: {
            quality_assurance_id: "",
            quality_assurance_item_id: "1",
            response: "",
            score: 0,
          },
        },
      },
    };
  },
  beforeMount() {
    // if (this.$route.params.type == "nigeria") {
    //   this.plan_categories = this.plan_categories_local;
    // } else {
    //   this.plan_categories = this.plan_categories_diaspora;
    // }
  },

  methods: {
    onClickChild(value) {
      this.dependents = value;
    },
    async takePicAndroid() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      var imageUrl = image.base64String;
      this.register.user_image = "data:image/png;base64," + imageUrl;
      this.$toasted.info("Image taken Successfully!", {
        position: "top-center",
        duration: 8000,
      });
    },
    attachPic(event) {
      let imageFile = event.target.files[0];

      if (imageFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // The result contains the Base64 string
          let base64Data = e.target.result;
          console.log(base64Data); // You can use the Base64 string here
          this.register.user_image = base64Data;
        };

        reader.readAsDataURL(imageFile);
      }
    },

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
          this.getProvidersByState();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    registerUserAdmin() {
      this.isLoading = true;

      this.axios
        .post("/api/v1/auth/register", {
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname.toUpperCase(),
          lastname: this.register.lastname.toUpperCase(),
          middlename: this.register.middlename.toUpperCase(),
          email: this.register.email,
          plan_type: this.register.plan_type,
          phone_number: this.register.phone_number,
          type: this.register.type,
          sectorType: this.sector,
          user_image: this.register.user_image,
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
          dependents: this.dependents,
          conditions: this.register.conditions,
          quality_assurance: this.register.quality_assurance,
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

    getProvidersByState() {
      this.axios
        .get(
          `/api/v1/auth/providerAgencyStates/439078/${this.register.state}`,
          {
            params: {
              status: 1,
            },
          }
        )
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

          // Auto Select Marketer
          let employees = this.employees.data;
          let formatter = employees.filter(
            (x) => x.id == this.$route.params.employee
          );
          this.register.enrolled_by = formatter[0].id;
          console.log(this.register.enrolled_by );

          // End of Function
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchPlanCategories() {
      this.axios
        .get(`/api/v1/plan_categories`, {
          params: {
            is_local: this.$route.params.type == "nigeria" ? 1 : false,
          },
        })
        .then((response) => {
          this.plan_categories = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchPlans() {
      this.axios
        .get(`/api/v1/plans`, {
          params: {
            plan_category_id: this.register.plan_type,
          },
        })
        .then((response) => {
          this.plans = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getStates();
    this.getEmployees();
    this.fetchPlanCategories();
  },
};
</script>
