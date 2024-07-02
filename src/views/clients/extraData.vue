<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-dark">
        <div class="container m-b-30">
          <div class="row">
            <div class="col-12 text-white p-t-40 p-b-90">
              <h4 class="">
                <span class="btn btn-white-translucent">
                  <i class="mdi mdi-table"></i
                ></span>
                Enrollee Verification Tool
              </h4>
              <p class="opacity-75">
                With this tool, we can verify your enrollees due for expiration
                and exit from the agency.
              </p>
              <hr />
              <br />
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="card my-6">
          <form
            @submit.prevent="getData(currentPage ? currentPage : 1)"
            class="card-body"
          >
            <div class="row">
              <div class="form-group col-md-5">
                <label>Select Facility </label>
                <v-select
                  v-model="register.provider_id"
                  :options="providers"
                  label="agency_name"
                  :value="register.provider_id"
                ></v-select>
              </div>

              <div class="form-group col-md-5">
                <label for="inputCity">LGA </label>
                <select class="form-control" v-model="register.localgovt">
                  <option
                    v-for="lga in lga_states"
                    v-bind:key="lga"
                    :value="lga.id"
                  >
                    {{ lga.local_name }}
                  </option>
                </select>
              </div>

              <div class="form-group col-md-2">
                <label for="inputCity">Rows </label>
                <select class="form-control" v-model="register.per_page">
                  <option value="15">15</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option>500</option>
                  <option>1000</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-success btn-block" type="submit">
                GET DATA
              </button>

              <button class="btn btn-dark btn-block" type="button">
                <download-excel
                  :data="info.data"
                  :fields="json_fields"
                  type="xls"
                  :escapeCsv="false"
                  name="Data.xls"
                >
                  Export to CSV
                </download-excel>
              </button>
            </div>
          </form>
        </div>

        <div class="row">
          <div class="col-md-7">
            <div class="card m-b-30">
              <div class="card-header">
                <h5 class="h5 mb-4">
                  <i class="mdi mdi-checkbox-intermediate"></i> Data Info
                  {{ info.meta.total }}
                </h5>
                <p class="h6">Principals: {{ info.meta.total_principal }}</p>
                <p class="h6">Dependents: {{ info.meta.total_dep }}</p>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Sector</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ins in info.data" v-bind:key="ins.id">
                        <td>{{ ins.account_type }}</td>
                        <td>{{ ins.full_name }}</td>
                        <td>
                          {{ ins.dob }} ({{ ins.dob | moment("from", "now") }})
                        </td>

                        <td>{{ ins.sector }}</td>
                        <td>
                          <button
                            class="btn btn-outline-success"
                            @click="selectEnrollee(ins)"
                          >
                            <i class="fe fe-eye"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="text-center">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="15"
                      aria-controls="my-table"
                      @input="getData(currentPage ? currentPage : 1)"
                    ></b-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <div class="card">
              <div class="card-header">
                <p class="h4 text-center">Enrollee Details</p>
              </div>
              <div>
                <div class="card-body">
                  <div class="text-center" v-if="selected == ''">
                    <i
                      class="las la-folder-open la-3x text-info text-center"
                    ></i>
                    <p class="h5 text-success">No Enrollee selected Yet</p>
                  </div>

                  <div class="" v-if="selected != ''">
                    <div class="col-md-12">
                      <img
                        :src="`https://insurance-api.hayokmedicare.ng/image/${selected.user_image}`"
                        class="img-thumbnail mt-3"
                        onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                      />
                    </div>

                    <div class="col-md-12">
                      <p class="h6 spacer-top-bottom">
                        {{ selected.full_name }}
                      </p>
                      <hr />

                      <p class="h6 spacer-top-bottom">
                        {{ selected.id_card_number }}
                      </p>
                      <hr />
                      <p class="h6 spacer-top-bottom">
                        {{ selected.account_type }}
                      </p>

                      <hr />
                      <p class="h6 spacer-top-bottom">
                        {{ selected.sector }}
                      </p>
                      <hr />

                      <p class="h6 spacer-top-bottom">
                        {{ selected.phone_number }}
                      </p>
                      <hr />

                      <hr />
                      <p class="h6 spacer-top-bottom">
                        Date of Birth: {{ selected.dob }} ({{
                          selected.dob | moment("from", "now")
                        }})
                      </p>

                      <hr />
                      <p
                        class="h6 spacer-top-bottom"
                        v-if="selected.place_of_work != null"
                      >
                        <strong> {{ selected.place_of_work }}</strong>
                      </p>
                      <hr />

                      <p class="h6 spacer-top-bottom">
                        Date of First Appointment:
                        {{ selected.date_of_entry }}
                        ({{ selected.date_of_entry | moment("from", "now") }})
                      </p>

                      <p class="h6 spacer-top-bottom">
                        Date of Expiry:
                        {{ selected.date_of_expiry }}
                      </p>
                    </div>

                    <div class="row my-8">
                      <div class="col-md-4">
                        <button
                          class="btn btn-success btn-block"
                          @click="date_form = true"
                        >
                          Renew
                        </button>
                      </div>
                      <div class="col-md-4">
                        <button
                          class="btn btn-danger btn-block"
                          @click="disableUser(selected)"
                        >
                          Disable User
                        </button>
                      </div>

                      <div class="col-md-4">
                        <a
                          :href="`/${selected.type}/${selected.id}`"
                          target="_blank"
                          class="btn btn-dark btn-block"
                        >
                          visit
                        </a>
                      </div>
                    </div>

                    <div class="row my-8" v-show="date_form">
                      <div class="col-md-6">
                        <input
                          type="date"
                          v-model="date_of_expiry"
                          class="form-control"
                        />
                      </div>

                      <div class="col-md-6">
                        <button
                          class="btn btn-success btn-block"
                          @click="enableUser(selected)"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
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
    Navbar, Loading
  },
  data() {
    return {
      isLoading: false,
      date_form: false,
      rows: "",
      register: {
        localgovt: "",
        provider_id: {
          id: "",
          per_page: "15",
        },
      },
      lga_states: [],
      providers: [],
      info: {
        meta: {},
        data: [],
      },
      selected: "",
      date_of_expiry: "",
      seen: true,
      json_fields: {
        "Enrollee Type": "account_type",
        "Full Name": "full_name",
        "OHIS Number": "id_card_number",
        "User Status": "status",
        phone_number: "phone_number",
        "Sector Category": "sector",
        "Sector Category(Dependent) ": "user.sector",
        "Vulnerable Group": "category_of_vulnerable_group",
        "Date of Birth": "dob",
        "Local Govt": "localgovt.local_name",
        Ward: "ward.ward_name",
        "Card Expiry Date": "expiry_date",
        "Sector(Principal)": "sectorType",
        "Sector(Dependent) ": "user.sectorType",
        gender: "gender",
        "Date of Appointment": "date_of_entry",
        "Date Enrolled": "created_at",
        "NIN Number": "nimc_number",
        MDA: "place_of_work",
        "Computer Number": "salary_number",
        "Enrollee Address": "address1",
        "Health Facility": "userprovider.agency_name",
      },
    };
  },
  methods: {
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
    getData(currentPage) {
      this.isLoading = true;

      this.axios
        .post(
          `/api/v1/auth/get-expiry-due/95930`,

          {
            page: currentPage,
            provider_id: this.register.provider_id.id,
            localgovt: this.register.localgovt,
            per_page: this.register.per_page,
          }
        )
        .then((response) => {
          this.info = response.data;
          this.rows = response.data.meta.total;
          this.isLoading = false;

        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;

        });
    },
    disableUser(selected) {
      if (confirm("Are you Sure?")) {
        this.axios
          .post(`/api/v1/auth/disableUser/` + selected.id)
          .then(() => {
            alert("User disabled");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    enableUser(user) {
      if (confirm("Are you Sure you want to Approve?")) {
        this.axios
          .patch(`/api/v1/auth/extend-expiry/${user.id}`, {
            expiry_date: this.date_of_expiry,
          })
          .then(() => {
            this.$toasted.success("Changed Successfully", {
              position: "top-center",
              duration: 3000,
            });
            this.selected = "";
            this.getData();
          })
          .catch((error) => {
            console.error(error);
            alert(error);
          });
      }
    },

    selectEnrollee(enrollee) {
      this.selected = enrollee;
      console.log(this.selected);
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
  },
  created() {
    this.getData();
    this.fetchLga();
    this.getProviders();
  },
};
</script>

<style scoped>
.spacer-top-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
