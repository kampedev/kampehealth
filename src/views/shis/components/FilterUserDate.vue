<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60"></div>
        </div>
      </div>

      <section class="ml-10">
        <div class="container">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="form-group col-md-3">
                    <label for="inputCity">Select Sector *</label>
                    <select class="form-control" v-model="sector">
                      <option value="Basic Healthcare Provision Fund">
                        Basic Healthcare Provision Fund
                      </option>
                      <option value="State Equity Program">
                        State Equity Program
                      </option>
                      <option value="Voluntary Contributor">
                        Voluntary Contributor
                      </option>

                      <option value="State Civil Servant">
                        State Civil Servant
                      </option>
                      <option value="State Public Servant">
                        State Public Servant
                      </option>
                      <option value="LGA Civil Servant">
                        LGA Civil Servant
                      </option>
                      <option value="Universal Basic Education">
                        Universal Basic Education
                      </option>
                      <option value="State Pensioners Plan">
                        State Pensioners Plan
                      </option>

                      <option
                        value="Tertiary Student Health Insurance Plan (T-SHIP)"
                      >
                        Tertiary Student Health Insurance Plan (T-SHIP)
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-3">
                    <label>Special Needs</label>
                    <select
                      class="form-control"
                      v-model="category_of_vulnerable_group"
                    >
                      <option value="All">All</option>
                      <option value="Pregnant Women">Pregnant Women</option>
                      <option value="Children under 5">Children under 5</option>
                      <option value="Aged">Aged</option>
                      <option value="People with Special Needs">
                        People with Special Needs
                      </option>
                      <option value="Poorest of the Poor">
                        Poorest of the Poor
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputCity">Select LGA</label>
                    <select
                      class="form-control"
                      v-model="localgovt"
                      @change="fetchWards($event)"
                    >
                      <option
                        v-for="lga in lga_states"
                        v-bind:key="lga"
                        :value="lga"
                      >
                        {{ lga.local_name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-3">
                    <label for="inputCity"
                      ><i class="fe fe-briefcase"></i> Select MDA
                    </label>
                    <select class="form-control" v-model="place_of_work">
                      <option
                        :value="mda.place_of_work"
                        v-for="mda in mdas"
                        v-bind:key="mda.id"
                      >
                        {{ mda.name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-3">
                    <label for="inputCity">Health Facility</label>
                    <select
                      class="form-control"
                      v-model="provider_id"
                      @click="getProviders($event)"
                    >
                      <option
                        v-for="provider in providers"
                        v-bind:key="provider"
                        :value="provider.id"
                      >
                        {{ provider.agency_name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-3">
                    <label>Ward</label>
                    <select class="form-control" v-model="ward">
                      <option
                        v-for="ward in wards"
                        v-bind:key="ward.id"
                        :value="ward"
                      >
                        {{ ward.ward_name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-3">
                    <label for="inputCity">Start Date *</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="from"
                      @change="pushDate"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputCity">End Date *</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="to"
                      @change="pushDate"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label>Rows</label>
                    <select class="form-control" v-model="per_page">
                      <option value="100">100</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="5000">5000</option>
                      <option value="10000">10000</option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label>Page</label>
                    <select class="form-control" v-model="current_page">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div class="col-md-12">
                    <input
                      type="checkbox"
                      v-model="dependents"
                      id=""
                      class="form-control"
                    />
                    filter with dependents
                  </div>

                  <button
                    @click="filterEnrollees()"
                    class="btn btn-info btn-block my-2"
                    :disabled="disabled"
                  >
                    Filter
                  </button>
                  <div class="col-md-12" v-if="disabled == true">
                    <p class="text-primary">We are preparing your document</p>
                  </div>

                  <br />

                  <div v-show="showdownload">
                    <div class="col-md-12">
                      <button class="btn btn-dark btn-block">
                        <download-excel
                          :data="results.data"
                          :fields="json_fields"
                          type="xls"
                          :escapeCsv="false"
                          :name="
                            sector +
                            ' _ ' +
                            category_of_vulnerable_group +
                            '_' +
                            from +
                            '_' +
                            to +
                            '.xls'
                          "
                        >
                          Download Data for {{ from }} to {{ to }}
                          {{ category_of_vulnerable_group }} {{ sector }}
                        </download-excel>
                      </button>
                    </div>

                    <div class="my-2">
                      <p class="h6">
                        Total Result: {{ results.meta.total }} data available
                      </p>
                      <p class="h6">
                        Total Filtered: {{ results.data.length }} data filtered
                        <strong>
                          (Page {{ current_page }} of
                          {{ results.meta.last_page }})
                        </strong>
                      </p>

                      <span
                        class="text-info h6 my-1"
                        role="button"
                        @click="inspect = true"
                        >Preview Data</span
                      >
                    </div>

                    <div class="col-lg-12 col-md-12" v-show="inspect">
                      <div class="card m-b-30">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table align-td-middle table-card">
                              <thead>
                                <tr>
                                  <th>NO.</th>
                                  <th>Plan Type</th>
                                  <th>Account Type</th>
                                  <th>Name (Agency Number)</th>
                                  <th>Phone Number</th>
                                  <th>Sector</th>
                                  <th>Facility</th>
                                  <th>Date Enrolled</th>
                                  <th>DOB/ Expiry Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(client, index) in results.data"
                                  v-bind:key="client.id"
                                >
                                  <td>{{ index + 1 }}</td>
                                  <td>
                                    <span
                                      v-if="client.account_type == 'Principal'"
                                      >{{ client.plan_type }}</span
                                    >
                                    <span
                                      v-if="client.account_type != 'Principal'"
                                      >{{ client.user.plan_type }}</span
                                    >
                                  </td>
                                  <td>{{ client.account_type }}</td>

                                  <td>
                                    <router-link
                                      :to="{
                                        path: '/client/' + client.id,
                                        params: {},
                                      }"
                                    >
                                      {{ client.firstname }}
                                      {{ client.lastname }}
                                    </router-link>

                                    <!-- <button @click="changeNumberID(client)" class="btn btn-primary"
                           
                            >change ID {{user.id}} </button> -->

                                    <b> ({{ client.id_card_number }}) </b>
                                  </td>
                                  <td>{{ client.phone_number }}</td>
                                  <td>{{ client.sector }}</td>
                                  <td>
                                    <span v-if="client.userprovider != null">
                                      {{
                                        client.userprovider.agency_name
                                      }}</span
                                    >
                                  </td>
                                  <td>
                                    {{ client.created_at }}
                                  </td>
                                  <td>
                                    {{ client.dob }}|| {{ client.expiry_date }}
                                  </td>

                                  <td v-if="user.id == '439078'">
                                    <button
                                      class="btn btn-default"
                                      @click="updateExp(client)"
                                    >
                                      update Exp {{ client.id }}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

// import FormalLgaDataJson from "./zamchema_lga_formal.json";
// import LgaFacilityJson from "./lga_facility.json";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      // formal_data: FormalLgaDataJson,
      // lga_data: LgaFacilityJson,
      loader: true,
      showdownload: false,
      inspect: false,
      user: null,
      sector: "",
      ward: "",
      localgovt: "",
      place_of_work: "",
      edit: false,
      show: false,
      disabled: false,
      isLoading: false,
      fullPage: false,
      agency_id: "",
      provider_id: "",
      providers: "",
      gender: "",
      dependents: false,
      mdas: [],
      state: "",
      category_of_vulnerable_group: "",
      lga_states: "",
      wards: [],
      from: "",
      to: new Date(),
      date: "",
      results: {
        meta: {
          total: 0,
        },
        data: [],
      },
      per_page: "10000",
      current_page: "1",
      json_fields: {
        // ID: "id",
        "User Type": "account_type",
        // 'First Name': 'firstname',
        "Full Name": "full_name",
        "AGENCY ID": "id_card_number",
        "AGENCY ID (Dependent) ": "user.id_card_number",
        "User Status": "status",
        "Picture Available": "picture_available",
        "User Image": {
          field: "user_image",
          callback: (value) => {
            return `https://kampe.hayokmedicare.ng/image/${value}`;
          },
        },

        phone_number: "phone_number",
        "Sector Category": "sector",
        // "Sector Category(Dependent) ": "user.sector",
        "Computer Number": "salary_number",
        "Computer Number(Dependent)": "user.salary_number",
        "LGA (Dependent)": "user.localgovt",
        "Vulnerable Group": "category_of_vulnerable_group",
        "Date of Birth": "dob",
        "Local Govt": "localgovt.local_name",
        Ward: "ward.ward_name",
        "Card Expiry Date": "expiry_date",
        "Sector(Principal) ": "sectorType",
        // "Sector(Dependent) ": "user.sectorType",
        gender: "gender",
        "Date Enrolled": "created_at",
        "Means of ID": "nimc_number",
        "Plan Type": "plan_type",
        // "Plan Type (Dependent)": "user.plan_type",
        "Enrollee MDA": "place_of_work",
        "Enrollee Address": "address1",
        "Health Facility": "userprovider.agency_name",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
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
  computed: {
    addOneDay() {
      var result = new Date(this.to);
      result.setDate(result.getDate() + 1);
      return result;
    },
  },
  methods: {
    filterEnrollees() {
      this.disabled = true;
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/filtersectordashboardwardlgabydate`, {
          agency_id: "439078",
          sector: this.sector,
          gender: this.gender,
          category_of_vulnerable_group: this.category_of_vulnerable_group,
          date: this.date,
          from: this.from,
          dependents: this.dependents,
          provider_id: this.provider_id,
          place_of_work: this.place_of_work,
          to: this.addOneDay,
          lga_id: this.localgovt.id,
          ward: this.ward.id,
          per_page: this.per_page,
          page: this.current_page,
        })
        .then((response) => {
          this.results = response.data;
          console.log(response);
          this.disabled = false;
          this.showdownload = true;
          this.isLoading = false;
          this.$toasted.success("Filtered Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          this.disabled = false;
          this.isLoading = false;
          this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });

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
    updateExp(client) {
      this.axios
        .post(`/api/v1/auth/dep/expiry`, {
          dep_id: client.id,
        })
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
          this.$toasted.success("updated Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchWards() {
      this.axios
        .get(`/api/v1/auth/getwards/${this.localgovt.id}`)
        .then((response) => {
          this.wards = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    clearIt() {
      this.agency_id = "";
    },
    pushDate() {
      this.date = "date";
    },
    changeNumberID(client) {
      this.isLoading = true;
      this.axios
        .patch(`/api/v1/auth/id-card-number/change/${client.id}`)
        .then((response) => {
          console.log(response);
          this.$toasted.success("Changed Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Not Found!", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
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
    getMDAs() {
      this.axios
        .get(`/api/v1/auth/ministry/439078`)
        .then((response) => {
          this.mdas = response.data.data;
        })
        .catch(() => {});
    },

    cleanUser(client) {
      let osunlgaarray = this.formal_data; //get file
      let lgaarray = this.lga_data; //get file
      let facility_data = 0;
      let facility_updater = 0;

      let formatter = osunlgaarray.filter(
        (x) => x.phone_number == client.phone_number
      );

      facility_updater = formatter[0]; //getting user from json file
      // console.log(facility_updater);

      if (facility_updater) {
        let formatters = lgaarray.filter(
          (x) => x.wordpress_lga == client.localgovt.id
        );
        facility_data = formatters[0];
        // return (facility_data)
      }

      //update ID
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/updatewarduser`, {
          id: client.id,
          provider_id: facility_data.facility_id,
          salary_number: facility_updater.salary_number,
          localgovt: facility_data.lga,
          lga_of_origin: facility_data.lga_of_origin,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.success("Changed Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Not Found!", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        });

      //end of update id

      //update ID

      //end of update id
    },
  },
  created() {
    this.getProviders();
    this.getMDAs();
  },
};
</script>
