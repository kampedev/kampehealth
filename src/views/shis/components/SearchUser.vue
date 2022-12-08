<template>
  <div class="container">
    <div class="row list">
      <div class="col-md-3">
        <div class="row">
          <button
            class="btn btn-default"
            @click="show = !show"
            style="margin-bottom: 10px; margin-left: 15px"
          >
            <i class="mdi mdi-magnify mdi-24px"></i>
          </button>
        </div>
      </div>

      <div class="col-md-12" v-show="show">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="text-center">
              <strong>(Fill any one of field to search for enrollee)</strong>
            </div>

            <div class="row">
              <div class="form-group col-md-12">
                <label> Select Search Parameter {{ search }}</label>
                <select class="form-control" v-model="search">
                  <option value="ohis_number">OHIS Number</option>
                  <option value="phone_number">Phone Number</option>
                  <option value="nimc_number">NIN</option>
                </select>
              </div>

              <div class="form-group col-md-12" v-if="search == 'ohis_number'">
                <label for="inputEmail4">OHIS Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchkey"
                  placeholder="OHIS Number"
                />
              </div>
              <div class="form-group col-md-12" v-if="search == 'phone_number'">
                <label for="inputPassword4">Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchkey"
                  placeholder="Phone Number"
                />
              </div>
              <div class="form-group col-md-12" v-if="search == 'nimc_number'">
                <label for="inputPassword4">NIN Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchkey"
                  placeholder="NIN Number"
                />
              </div>
            </div>
            <button
              class="btn btn-success btn-block btn-lg"
              @click="SearchUser"
              style="margin-top: 20px"
            >
              Search
            </button>
            <div class="col-md-12">
              <p class="h4 mt-4" v-if="searched_phonenumbers != ''">
                Searched Results {{ searched_phonenumbers.length }}
              </p>
              <p
                v-for="(search, index) in searched_phonenumbers"
                v-bind:key="search.id"
              >
                <a :href="`/client/${search.id}`">
                  {{ index + 1 }}. {{ search.full_name }} -
                  {{ search.id_card_number }}
                </a>
              </p>
              <br />
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
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Loading,
  },
  data() {
    return {
      user: null,
      providers: "",
      ohis_number: "",
      phone_number: "",
      nimc_number: "",
      email: "",
      search: "ohis_number",
      searchkey: "",
      search_result: "",
      edit: false,
      show: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
      searched_phonenumbers: "",
      provider_id: "",
      mdas: "",
      state: "",
      lga_states: "",
      sector: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    SearchUser() {
      if (this.search == "phone_number") {
        this.searchPhone();
      }
      if (this.search == "ohis_number") {
        this.searchSalary();
      }
      if (this.search == "nimc_number") {
        this.searchNIN();
      }
    },

    searchPhone() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/searchbymultiplevalues`, {
          agency_id: 95930,
          phone_number: this.searchkey,
        })
        .then((response) => {
          this.searched_phonenumbers = response.data;

          if (this.searched_phonenumbers.length >= 1) {
            // this.$router.push(`/client/${user[0].id}`)
            this.$toasted.info("Searched Successfully", {
              position: "top-center",
              duration: 3000,
            });
          } else {
            this.$toasted.info("User not Found", {
              position: "top-center",
              duration: 3000,
            });
          }
          console.log(response);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    searchNIN() {
      this.loading = true;
      this.axios
        .post(`/api/v1/auth/searchbymultiplevalues`, {
          agency_id: 95930,
          nimc_number: this.searchkey,
        })
        .then((response) => {
          this.searched_phonenumbers = response.data;
          let user = response.data;

          if (user.length >= 1) {
            if (
              this.user.type == "provider" ||
              this.user.type == "provider_emloyee"
            ) {
              this.$router.push(`/patient/${user[0].id}`);
              this.$toasted.info("Searched Successfully", {
                position: "top-center",
                duration: 3000,
              });
            } else {
              this.$router.push(`/client/${user[0].id}`);
              this.$toasted.info("Searched Successfully", {
                position: "top-center",
                duration: 3000,
              });
            }
          } else {
            this.$toasted.info("User not Found", {
              position: "top-center",
              duration: 3000,
            });
          }
          console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    searchSalary() {
      this.loading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          // agency_id: 95930,
          id_card_number: this.searchkey,
        })
        .then((response) => {
          this.searched_phonenumbers = response.data.data;
          // this.user = JSON.parse(localStorage.getItem("user"));
          // let user = response.data.data;
          // console.log(user);

          // this.$toasted.info("Searched Successfully", {
          //   position: "top-center",
          //   duration: 3000,
          // });
          if (response.data.type == "dependent") {
            // this.$router.push(`/dependent/${user.id}`);
          } else {
            if (
              this.user.type == "provider" ||
              this.user.type == "provider_employee"
            ) {
              // this.$router.push(`/patient/${user.id}`);
              this.$toasted.info("Searched Successfully l", {
                position: "top-center",
                duration: 3000,
              });
            }
            if (
              this.user.type == "employee" ||
              this.user.type == "shis" ||
              this.user.type == "tpa" ||
              this.user.type == "tpa_employee"
            ) {
              // this.$router.push(`/client/${user.id}`);
              this.$toasted.info("Searched Successfully", {
                position: "top-center",
                duration: 3000,
              });
            }
          }

          console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
          this.$toasted.info("User not Found", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    clearIt() {
      this.agency_id = "";
    },
  },
  created() {
    //
  },
};
</script>
