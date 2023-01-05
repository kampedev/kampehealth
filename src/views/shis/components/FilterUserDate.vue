<template>
  <div class="container">
    <div class="row list">
      <div class="col-md-3">
        <div class="row">
          <button
            class="btn btn-success"
            @click="show = !show"
            style="margin-bottom: 10px; margin-left: 15px"
          >
            Filter Enrollee By Date
          </button>
        </div>
      </div>

      <div class="col-md-12" v-show="show">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="row">
              <div class="form-group col-md-4">
                <label for="inputCity">Select Sector *</label>
                <select class="form-control" v-model="sector">
                  <option value="Basic Healthcare Provision Fund">
                    Basic Healthcare Provision Fund
                  </option>
                  <option value="State Equity Program">
                    State Equity Program
                  </option>
                  <option value="Vulnerable Groups">Vulnerable Groups</option>
                  <option value="Voluntary Contributor">
                    Voluntary Contributor
                  </option>
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
              <div class="form-group col-md-4">
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
              <div class="form-group col-md-4">
                <label for="inputCity">LGA</label>
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

              <div class="form-group col-md-6">
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

              <div class="form-group col-md-6">
                <label for="inputCity">Select MDA</label>
                <select class="form-control" v-model="place_of_work">
                  <option
                    :value="mda.name"
                    v-for="mda in mdas.data"
                    v-bind:key="mda.id"
                  >
                    {{ mda.name }}
                  </option>
                </select>
              </div>

              <div class="form-group col-md-4">
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

              <div class="form-group col-md-4">
                <label for="inputCity">Start Date *</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="from"
                  @change="pushDate"
                />
              </div>

              <div class="form-group col-md-4">
                <label for="inputCity">End Date *</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="to"
                  @change="pushDate"
                />
              </div>
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
              class="btn btn-success btn-block btn-lg"
              :disabled="disabled"
              style="margin-top: 20px"
            >
              Filter
            </button>
            <br />
            <div class="col-md-12" v-if="disabled == true">
              <p class="text-primary">We are preparing your document</p>
            </div>

            <div v-show="showdownload">
              <p class="h5">
                Result: {{ results.length }} data filtered
                <span class="text-success" @click="inspect = true"
                  >preview data</span
                >
              </p>

              <p class="btn btn-success">
                <i class="fe fe-download"></i>
                <download-excel
                  :data="results"
                  :fields="json_fields"
                  type="csv"
                  :escapeCsv="false"
                  :name="
                    sector +
                    ' _ ' +
                    category_of_vulnerable_group +
                    '_' +
                    from +
                    '_' +
                    to +
                    '.csv'
                  "
                >
                  Download Data for {{ from }} to {{ to }}
                  {{ category_of_vulnerable_group }} {{ sector }}
                </download-excel>
              </p>

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
                            <th>Name (OHIS Number)</th>
                            <th>Phone Number</th>
                            <th>Facility</th>
                            <th>Date Enrolled</th>
                            <th>DOB/ Expiry Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(client, index) in results"
                            v-bind:key="client.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <span v-if="client.account_type == 'Principal'">{{
                                client.plan_type
                              }}</span>
                              <span v-if="client.account_type != 'Principal'">{{
                                client.user.plan_type
                              }}</span>
                            </td>
                            <td>{{ client.account_type }}</td>

                            <td>
                              <router-link
                                :to="{
                                  path: '/client/' + client.id,
                                  params: {},
                                }"
                              >
                                {{ client.firstname }} {{ client.lastname }}
                                <button
                                  type="button"
                                  class="
                                    btn
                                    m-b-15
                                    ml-2
                                    mr-2
                                    badge badge-soft-dark
                                  "
                                >
                                  {{ client.status }}
                                </button>
                              </router-link>
                              <b> ({{ client.id_card_number }}) </b>
                            </td>
                            <td>{{ client.phone_number }}</td>
                            <td>
                              <span v-if="client.userprovider != null">
                                {{ client.userprovider.agency_name }}</span
                              >
                            </td>
                            <td>
                              {{ client.created_at }}
                            </td>
                            <td>{{ client.dob }}|| {{ client.expiry_date }}</td>

                            <td v-if="user.id == '95930'">
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
      dependents: true,
      agency_id: "",
      provider_id: "",
      providers: "",
      mdas: [],
      state: "",
      category_of_vulnerable_group: "",
      lga_states: "",
      wards: [],
      from: "",
      to: new Date(),
      date: "",
      results: [],
      json_fields: {
        "User Type": "account_type",
        // 'First Name': 'firstname',
        // 'Last Name':'lastname',
        // 'Middle Name':'middlename',
        "Full Name": "full_name",
        "OHIS Number": "id_card_number",
        "User Status": "status",
        "User Image": {
          field: "user_image",
          callback: (value) => {
            return `https://api.hayokinsurance.com/image/${value}`;
          },
        },

        phone_number: "phone_number",
        "Sector Category": "sector",
        "Sector Category(Dependent) ": "user.sector",
        "Vulnerable Group": "category_of_vulnerable_group",
        "Date of Birth": "dob",
        "Local Govt": "localgovt.local_name",
        Ward: "ward.ward_name",
        "Card Expiry Date": "expiry_date",
        "Sector(Principal) ": "sectorType",
        "Sector(Dependent) ": "user.sectorType",
        gender: "gender",
        "Date Enrolled": "created_at",
        "NIN Number": "nimc_number",
        "Plan Type": "plan_type",
        "Plan Type (Dependent)": "user.plan_type",
        HMO: "usertpa.organization_name",
        "HMO(Dependent) ": "user.usertpa.organization_name",
        "Enrolled By": "userenrolledby.full_name",
        "(Dependent) Enrolled By": "user.userenrolledby.full_name",
        MDA: "place_of_work",
        "MDA (Dependent)": "user.place_of_work",
        "Computer Number": "salary_number",
        "Computer Number(Dependent)": "user.salary_number",
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
          agency_id: "95930",
          sector: this.sector,
          category_of_vulnerable_group: this.category_of_vulnerable_group,
          date: this.date,
          from: this.from,
          to: this.addOneDay,
          dependents: this.dependents,
          place_of_work: this.place_of_work,
          provider_id: this.provider_id,
          lga_id: this.localgovt.id,
          ward: this.ward.id,
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
    getProviders() {
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
    getMDAs() {
      this.axios
        .get(`/api/v1/auth/ministry/95930`)
        .then((response) => {
          this.mdas = response.data;
          // console.log(response)
        })
        .catch(() => {
          // console.error(error);
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
  },
  created() {
    this.getProviders();
    this.getMDAs();
  },
};
</script>
