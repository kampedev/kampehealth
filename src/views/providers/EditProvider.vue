<template>
  <div class="">
    <Navbar />
    <section class="admin-content">
      <div class="bg-dark bg-dots m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-lg-8 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar avatar-lg">
                  <div
                    class="avatar-title bg-info rounded-circle mdi mdi-settings"
                  ></div>
                </div>
              </div>
              <h3>Edit Facility Details</h3>
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
                    Use this page to update facility information.
                  </p>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">Contact Surname</label>
                      <input
                        type="text"
                        v-model="auth_user.lastname"
                        class="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">Contact First Name</label>
                      <input
                        type="text"
                        v-model="auth_user.firstname"
                        class="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail6">Contact Middle Name</label>
                      <input
                        type="text"
                        v-model="auth_user.middlename"
                        class="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label>Contact Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        v-model="auth_user.email"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="asd">Contact Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone Number"
                        v-model="auth_user.phone_number"
                      />
                    </div>

                    <div class="col-md-6">
                      <label>State </label>
                      <select
                        class="form-control"
                        v-model="auth_user.state"
                        @change="fetchLga"
                      >
                        <option
                          v-for="sta in states"
                          v-bind:key="sta.id"
                          :value="sta.id"
                        >
                          {{ sta.name }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCity">LGA </label>
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
                      <label for="asd">Facility Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="asd"
                        placeholder="Company Name"
                        v-model="auth_user.agency_name"
                      />
                    </div>
                  </div>

                  <div class="form-group" v-if="auth_user.type != 'client'">
                    <label for="inputAddress2">Office Address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Office Address"
                      v-model="auth_user.agencyAddress"
                    />
                  </div>
                  <div class="form-group" v-if="auth_user.type != 'client'">
                    <label for="inputAddress2">Provider ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="KAMPE/FAC/XXX"
                      v-model="auth_user.facility_code"
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
      states: "",
      lga_states: "",
      isLoading: false,
      fullPage: true,
    };
  },
  beforeMount() {
   
  },
  methods: {
    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/providerAgency/95933`)
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
          this.fetchLga();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchLga() {
      this.axios
        .get(`/api/v1/auth/lga/${this.auth_user.state}`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
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
    editUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/editProfile/${this.$route.params.id}`, {
          firstname: this.auth_user.firstname,
          lastname: this.auth_user.lastname,
          email: this.auth_user.email,
          type: this.auth_user.type,
          state: this.auth_user.state,
          localgovt: this.auth_user.localgovt,
          ward: this.auth_user.ward,
          dob: this.auth_user.dob,
          phc_general: this.auth_user.phc_general,
          gender: this.auth_user.gender,
          genotype: this.auth_user.genotype,
          institutional_id: this.auth_user.institutional_id,
          sector: this.auth_user.sector,
          user_image: this.auth_user.user_image,
          middlename: this.auth_user.middlename,
          nimc_number: this.auth_user.nimc_number,
          password: this.auth_user.password,
          phone_number: this.auth_user.phone_number,
          agency_name: this.auth_user.agency_name,
          address1: this.auth_user.address1,
        })
        .then((response) => {
          console.log(response);
          this.$breadstick.notify("Provider updated Successfully!", {
            position: "top-right",
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.$breadstick.notify("error on adding!", {
            position: "top-right",
          });
        });
    },
  },
  created() {
    this.getUser();
    this.getStates();
    this.getProviders();
  },
};
</script>
