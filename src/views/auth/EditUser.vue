<template>
  <div class="">
    <Navbar />
    <section class="admin-content">
      <div class="bg-info bg-dots m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-lg-8 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar avatar-lg">
                  <div
                    style="margin-top: 10px"
                    class="avatar-title bg-dark rounded-circle mdi mdi-settings"
                  ></div>
                </div>
              </div>
              <h3>Edit Enrollee</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 mx-auto mt-2">
              <div class="card py-3 m-b-30">
                <div class="card-body">
                  <h3 class="">Personal Data</h3>
                  <p class="text-muted">
                    Use this page to update enrollee's bio-data information.
                  </p>

                  <div class="form-row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="inputCity">Select Plan</label>
                        <select class="form-control" v-model="auth_user.sector">
                          <option value=""></option>
                        </select>
                      </div>
                    </div>

                    <div
                      class="form-group col-md-6"
                      v-if="user.type == 'shis' || user.user_role == 1"
                    >
                      <label for="inputEmail6">KAMPE Number</label>
                      <input
                        type="text"
                        v-model="auth_user.id_card_number"
                        class="form-control"
                        placeholder="KAMPE Number"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">Surname</label>
                      <input
                        type="text"
                        v-model="auth_user.lastname"
                        class="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">First Name</label>
                      <input
                        type="text"
                        v-model="auth_user.firstname"
                        class="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">Middle Name</label>
                      <input
                        type="text"
                        v-model="auth_user.middlename"
                        class="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Email </label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="auth_user.email"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="asd">Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone Number"
                        v-model="auth_user.phone_number"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="asd">NIN Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="asd"
                        placeholder="NIN Number"
                        v-model="auth_user.nimc_number"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Date of Birth </label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="auth_user.dob"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity"
                        >Date of Expiry:
                        <strong>{{ auth_user.expiry_date }}</strong>
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="auth_user.expiry_date"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">Gender</label>
                      <select class="form-control" v-model="auth_user.gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Marital Status </label>
                      <select
                        class="form-control"
                        v-model="auth_user.marital_status"
                      >
                        <option value="Married">Married</option>
                        <option value="Widow">Widow</option>
                        <option value="Single">Single</option>
                        <option value="Divorced">Seperated</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity"
                        >Facility for Accessing Care
                      </label>
                      <select
                        class="form-control"
                        v-model="auth_user.provider_id"
                      >
                        <option
                          v-for="facility in providers"
                          v-bind:key="facility.id"
                          :value="facility.id"
                        >
                          {{ facility.agency_name }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">Blood Group</label>
                      <select class="form-control" v-model="auth_user.blood">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCity">LGA</label>
                      <select
                        class="form-control"
                        v-model="auth_user.localgovt"
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
                      <label for="inputCity">Ward </label>
                      <select class="form-control" v-model="auth_user.ward">
                        <option
                          v-for="ward in wards"
                          v-bind:key="ward"
                          :value="ward.id"
                        >
                          {{ ward.ward_name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="inputAddress">Home Address</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="auth_user.address1"
                      placeholder="Address"
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn btn-success btn-cta"
                    @click="editUser"
                  >
                    Save changes
                  </button>
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
      </section>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
// import Settings from '@/components/Settings.vue'
import Navbar from "@/views/Navbar.vue";
import Loading from "vue-loading-overlay";
export default {
  // name: 'Home',
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      auth_user: "",
      providers: "",
      user: null,
      image: "",
      sector: "",
      wards: "",
      tpas: "",
      lga_states: "",
      isLoading: false,
      fullPage: true,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
      .then((response) => {
        this.auth_user = response.data.user;
        console.log(response);

        //get ward
        this.axios
          .get(`/api/v1/auth/getwardstate/2676`)
          .then((response) => {
            this.wards = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
        //end of get ward
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    autoEmail() {
      if (this.auth_user.email == null) {
        let autogenemail =
          this.auth_user.phone_number +
          this.$route.params.id +
          "@KAMPEuser.com";
        return autogenemail;
      } else {
        return this.auth_user.email;
      }
    },
  },

  methods: {
    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));

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

    getUser() {
      this.axios
        .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then((response) => {
          this.auth_user = response.data.user;
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

    editUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      console.log("ldldl");
      this.axios
        .post(`/api/v1/auth/editProfile/${this.$route.params.id}`, {
          firstname: this.auth_user.firstname,
          lastname: this.auth_user.lastname,
          email: this.auth_user.email,
          type: this.auth_user.type,
          state: "2676",
          localgovt: this.auth_user.localgovt,
          ward: this.auth_user.ward,
          dob: this.auth_user.dob,
          salary_number: this.auth_user.salary_number,
          gender: this.auth_user.gender,
          genotype: this.auth_user.genotype,
          institutional_id: this.auth_user.institutional_id,
          id_card_number: this.auth_user.id_card_number,
          point_of_care: this.auth_user.point_of_care,
          provider_id: this.auth_user.provider_id,
          sector: this.auth_user.sector,
          blood: this.auth_user.blood,
          user_image: this.auth_user.user_image,
          middlename: this.auth_user.middlename,
          nimc_number: this.auth_user.nimc_number,
          marital_status: this.auth_user.marital_status,
          org_id: this.auth_user.org_id,
          password: this.auth_user.password,
          phone_number: this.auth_user.phone_number,
          sectorType: this.auth_user.sectorType,
          category_of_vulnerable_group:
            this.auth_user.category_of_vulnerable_group,
          agency_name: this.auth_user.agency_name,
          address1: this.auth_user.address1,
          plan_type: this.auth_user.plan_type,
          place_of_work: this.auth_user.place_of_work,
          expiry_date: this.auth_user.expiry_date,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.info("Enrollee updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
        });
    },
    getTPAs() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/getorgenrollment/439078/A`)
        .then((response) => {
          this.tpas = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.fetchLga();
    this.getProviders();
    this.getTPAs();
  },
};
</script>
