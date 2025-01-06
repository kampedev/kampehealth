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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputCity"
                            >Select Category
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control"
                            required
                            v-model="register.plan_type"
                          >
                            <option value="Diaspora Plans">
                              Diaspora Plans
                            </option>
                            <option value="Diaspora HDPTC Plans">
                              Kampe Diaspora HDPTC
                            </option>
                          </select>
                        </div>
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
                        <!-- <v-select
                          v-model="register.provider_id"
                          required
                          :reduce="(agency_name) => agency_name.id"
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
                            :value="provider.id"
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

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                        />
                        <label class="form-check-label" for="checkbox1">
                          I declare that all the information provided are
                          correct
                        </label>
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
import AddDependentVoluntary from "@/views/clients/AddDependentVoluntary.vue";
import plansJSON from "@/jsons/diaspora_plans.json";
import diasporaHDPTCPlansJSON from "@/jsons/hdptc_diaspora_plans.json";
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
      diaspora_plans: plansJSON,
      diaspora_hdptc_plans: diasporaHDPTCPlansJSON,
      conditions: conditionsJSON,
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
          user_image: "",
          provider_id: "",
          org_id: "1",
          marital_status: "",
          enrolled_by: 0,
          conditions: [],
          dependents: [],
        },
      ],
    };
  },
  beforeMount() {
    //
  },

  methods: {
    onClickChild(value) {
      this.registrations[0].dependents = value;
    },
    async takePicAndroid() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      var imageUrl = image.base64String;
      this.registrations[0].user_image = "data:image/png;base64," + imageUrl;

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

    addArray() {
      this.registrations.push({
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        sector: "",
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
        enrolled_by: 0,
        dependents: [],
        conditions: [],
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
          this.$toasted.error(`${JSON.stringify(this.response)}`, {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/439078`, {
          params: {
            status: 1,
          },
        })
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
  