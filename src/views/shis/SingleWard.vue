<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <div>
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>
              <!-- <h3 class="h5"> {{provider.agency_name}} </h3> -->
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12">
              <div class="card m-b-30">
                <div class="card-header text-center">
                  <h4 class="h4">{{ clients.data.length }} Ward Enrollees</h4>
                </div>

                <div class="card-body">
                  <div class="col-md-12">
                    <p class="h5">
                      Basic Healthcare Provision Fund: {{ clients.bhcpf }}
                    </p>
                    <p class="h5">State Equity Program: {{ clients.sep }}</p>
                  </div>
                  <button class="btn btn-outline-primary" @click="show = !show">
                    Bulk Update Sector
                  </button>
                  <div class="form-group col-md-8" v-show="show">
                    <label>Select Sector </label>

                    <select class="form-control" v-model="sector">
                      <option value="State Civil Servant Healthcare Plan">
                        State Civil Servant Healthcare Plan
                      </option>
                      <option value="Basic Healthcare Provision Fund">
                        Basic Healthcare Provision Fund
                      </option>
                      <option value="State Equity Program">
                        State Equity Program
                      </option>
                      <option value="Universal Basic Education Healthcare Plan">
                        Universal Basic Education Healthcare Plan
                      </option>
                      <option value="Voluntary Contributors Healthcare Plan">
                        Voluntary Contributors Healthcare Plan
                      </option>
                      <option value="Voluntary Contributor">
                        Voluntary Contributor
                      </option>
                      <option value="Organized Community Healthcare Plan">
                        Organized Community Healthcare Plan
                      </option>
                      <option value="Oganized Private Sector Healthcare Plan">
                        Oganized Private Sector Healthcare Plan
                      </option>
                    </select>

                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="updateSector"
                      style="margin-top: 10px"
                    >
                      Update
                    </button>
                  </div>
                  <!-- {{checked}} -->
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th v-show="show">Marker</th>
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="enrollee in clients.data"
                          v-bind:key="enrollee.id"
                        >
                          <td v-show="show">
                            <div class="row form-check">
                              <input
                                class="form-check-input"
                                v-model="checked"
                                type="checkbox"
                                :value="enrollee.id"
                                :id="enrollee.id"
                              />
                            </div>
                          </td>
                          <td>
                            {{ enrollee.full_name }}
                          </td>
                          <td>{{ enrollee.phone_number }}</td>
                          <td>{{ enrollee.sector }}</td>

                          <td>
                            <router-link
                              :to="{ path: '/client/' + enrollee.id }"
                            >
                              <button
                                type="button"
                                name="button"
                                class="btn btn-info"
                              >
                                <i class="fe fe-eye"></i>
                              </button>
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      clients: "",
      edit: false,
      show: false,
      sector: "",
      checked: [],
      isLoading: false,
      fullPage: true,
      agency_id: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getuserbyward/${this.$route.params.id}`)
      .then((response) => {
        this.clients = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    //
  },
  methods: {
    updateSector() {
      if (this.checked.length < 1 || this.sector == "") {
        this.$toasted.error("No enrolleee or sector selected", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        this.isLoading = true;
        this.axios
          .patch(`/api/v1/auth/change-sector-bulk`, {
            sector: this.sector,
            id_list: this.checked,
          })
          .then((response) => {
            console.log(response);
            this.getUsers();
            this.$toasted.success("Enrollees Changed Successfully", {
              position: "top-center",
              duration: 3000,
            });
            this.isLoading = false;
            this.show = false;
          })
          .catch((error) => {
            console.error(error);
            this.$toasted.error("Error!", {
              position: "top-center",
              duration: 3000,
            });
            this.isLoading = false;
          });
      }
    },
    getUsers() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getuserbyward/${this.$route.params.id}`)
        .then((response) => {
          this.clients = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    // this.getUsers()
  },
};
</script>
<style >
.spacer {
  margin-left: 15px;
}
</style>
