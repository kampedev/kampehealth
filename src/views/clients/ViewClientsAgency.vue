<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <h3 class="h3">Enrollees</h3>

              <div class="form-dark">
                <div class="input-group input-group-flush mb-3"></div>
                <button
                  type="button"
                  class="btn btn-outline-info"
                  name="button"
                  @click="getUserData(currentPage ? currentPage : 1)"
                >
                  <i class="fe fe-refresh-cw"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchUser />
      <div class="card m-b-30 container">
        <div class="card-body">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="inputCity"
                ><i class="fe fe-credit-card"></i> Select Plan</label
              >
              <select class="form-control" v-model="sector">
                <option :value="plan" v-for="plan in plans" :key="plan.id">
                  {{ plan }}
                </option>
              </select>
            </div>

            <div class="form-group col-md-6">
              <label for="inputCity">State </label>

              <select class="form-control" v-model="state">
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
              <label><i class="fe fe-activity"></i> Select Facility </label>
              <select class="form-control" required v-model="provider_id">
                <option
                  v-for="provider in providers"
                  v-bind:key="provider.id"
                  :value="provider.id"
                >
                  {{ provider.agency_name }}
                </option>
              </select>
            </div>

            <div
              class="form-group col-md-6"
              v-if="user.job_title != 'marketer'"
            >
              <label for="inputCity"
                ><i class="fe fe-user-plus"></i> Select Employee</label
              >
              <select class="form-control" v-model="enrolled_by">
                <option
                  :value="emoployee.id"
                  v-for="emoployee in employees.data"
                  v-bind:key="emoployee.id"
                >
                  {{ emoployee.full_name }}
                </option>
              </select>
            </div>

            <div class="form-group col-md-6">
              <label for="inputCity"
                ><i class="fe fe-calendar"></i> Start Date
              </label>
              <input
                type="date"
                class="form-control"
                v-model="from"
                @change="pushDate"
              />
            </div>

            <div class="form-group col-md-6">
              <label for="inputCity"
                ><i class="fe fe-calendar"></i> End Date
              </label>
              <input
                type="date"
                class="form-control"
                v-model="to"
                @change="pushDate"
              />
            </div>
          </div>

          <button
            @click="getUserData(currentPage ? currentPage : 1)"
            class="btn btn-info btn-block btn-lg"
            style="margin-top: 20px"
          >
            <i class="fe fe-filter"></i>
          </button>
          <button
            @click="clearFilter"
            class="btn btn-default btn-block btn-lg"
            style="margin-top: 20px"
          >
            <i class="fe fe-x-circle"></i>
          </button>
          <br />
        </div>
      </div>
      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <p class="h4">
                    Total Records:
                    <span class="text-info">{{ rows | numeral(0, 0) }}</span>
                  </p>

                  <div class="table table-stripe">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Plan</th>
                          <th>Enrollment Date</th>
                          <th>KAMPE Number</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="client in clients.data"
                          v-bind:key="client.id"
                        >
                          <td>
                            <div
                              class="avatar avatar-sm"
                              v-if="client.user_image != null"
                            >
                              <img
                                :src="`https://kampe.hayokmedicare.ng/image/${client.user_image}`"
                                class="avatar-img avatar-sm rounded-circle"
                                alt="User Photo"
                                onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                              />
                            </div>
                          </td>
                          <td>
                            {{ client.account_type }}
                          </td>
                          <td>
                            {{ client.full_name }}
                          </td>
                          <td>{{ client.phone_number }}</td>
                          <td>{{ client.plan }}</td>
                          <td>
                            {{
                              client.created_at | moment("dddd, MMMM Do YYYY")
                            }}
                          </td>
                          <td>{{ client.id_card_number }}</td>
                          <td>
                            <p>
                              <span v-if="client.status == 'active'">
                                <button
                                  type="button"
                                  class="btn m-b-15 ml-2 mr-2 badge badge-soft-info"
                                >
                                  active
                                </button>
                              </span>
                              <span v-if="client.status == 'inactive'">
                                <button
                                  type="button"
                                  class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                                >
                                  inactive
                                </button>
                              </span>
                            </p>
                          </td>
                          <td>
                            <router-link
                              :to="{ path: '/client/' + client.id }"
                              v-if="client.account_type == 'Principal'"
                            >
                              <button
                                type="button"
                                name="button"
                                class="btn btn-outline-success"
                              >
                                <i class="fe fe-eye"></i>
                              </button>
                            </router-link>

                            <button
                              class="btn btn-link"
                              @click="getDependents(client)"
                              data-toggle="collapse"
                              :data-target="'#collapseExample' + client.id"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                              v-if="client.account_type == 'Principal'"
                            >
                              <i class="fe fe-users"></i>
                            </button>

                            <div
                              class="collapse"
                              :id="'collapseExample' + client.id"
                            >
                              <table class="table table-responsive">
                                <tr>
                                  <th>Name</th>
                                  <th>Relationship</th>
                                  <th>Gender</th>
                                </tr>
                                <tr
                                  v-for="dep in dependents"
                                  v-bind:key="dep.id"
                                >
                                  <td>
                                    <router-link
                                    class="text-info"
                                    :to="`dependent/${dep.id}`"
                                    >
                                      {{ dep.full_name }}

                                    </router-link>
                                  </td>
                                  <td>{{ dep.relationShipType }}</td>
                                  <td>{{ dep.gender }}</td>
                                </tr>
                                <!-- </tbody> -->
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-center">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        @input="getUserData(currentPage ? currentPage : 1)"
                      ></b-pagination>
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
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import SearchUser from "@/views/shis/components/SearchUser.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
    SearchUser,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      plans: "",
      clients: "",
      providers: "",
      wards: "",
      states: "",
      state: "",
      employees: "",
      provider_id: "",
      sector: "",
      place_of_work: "",
      category_of_vulnerable_group: "",
      localgovt: "",
      dependents: "",
      enrolled_by: "",
      ward: "",
      date: "",
      from: "",
      to: "",
      current_page: 1,
      rows: "1",
      perPage: 15,
    };
  },
  beforeMount() {
    this.getUserData();
  },

  methods: {
    clearFilter() {
      this.ward = "";
      this.date = "";
      this.from = "";
      this.to = new Date();
      this.sector = "";
      this.localgovt = "";
      this.provider_id = "";
      this.place_of_work = "";
      this.enrolled_by = "";
    },

    pushDate() {
      this.date = "date";
    },
    getEmployees() {
      this.axios
        .get(`/api/v1/auth/getEmployee/439078`)
        .then((response) => {
          this.employees = response.data;
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
    getUserData(currentPage) {
      this.isLoading = true;

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getUsersfilterparams`, {
          params: {
            page: currentPage,
            agency_id: 439078,
            perPage: this.perPage ? this.perPage : null,
            provider_id: this.provider_id ? this.provider_id : "",
            sector: this.sector ? this.sector : "",
            gender: this.gender ? this.gender : "",
            enabled_user: this.enabled_user,
            place_of_work: this.place_of_work ? this.place_of_work : "",
            localgovt: this.localgovt ? this.localgovt : "",
            enrolled_by: this.enrolled_by ? this.enrolled_by : "",
            date: this.date ? this.date : "",
            from: this.from ? this.from : "",
            to: this.to ? this.to : "",
            ward: this.ward ? this.ward : "",
            category_of_vulnerable_group: this.category_of_vulnerable_group
              ? this.category_of_vulnerable_group
              : "",
          },
        })
        .then((response) => {
          this.clients = response.data;
          console.log(response);
          this.rows = response.data.meta.total_principal;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;

          console.error(error);
        });
    },
    getPlans() {
      this.axios
        .get(`/api/v1/auth/plans-from-users/439078`)
        .then((response) => {
          this.plans = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDependents(client) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/allDependantUser/${client.id}`)
        .then((response) => {
          this.dependents = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

  },
  created() {
    this.getStates();
    this.getProviders();
    this.getEmployees();
    this.getPlans();
  },
};
</script>
