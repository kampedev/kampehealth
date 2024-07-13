<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <h3 class="h3">Enrollees</h3>

              <div class="form-dark">
                <div class="input-group input-group-flush mb-3"></div>
                <button
                  type="button"
                  class="btn btn-info"
                  name="button"
                  @click="getUSerDetails"
                >
                  Refresh Enrollees
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchUser />
      <!-- <FilterUserProvider/> -->
      <section class="">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <!-- <th>Picture</th> -->
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Sector</th>
                          <th>Place of Work</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="client in clients.data"
                          v-bind:key="client.id"
                        >
                          <!-- <td>
                                             <div class="avatar avatar-sm " v-if="client.user_image != null ">
                                               <img :src="`https://insurance-api.hayokmedicare.ng/image/${client.user_image}`"
                                                class="avatar-img avatar-sm rounded-circle"
                                                      alt=""></div>
                                         </td> -->
                          <td>{{ client.full_name }}</td>
                          <td>{{ client.phone_number }}</td>
                          <td>{{ client.sector }}</td>
                          <td>{{ client.place_of_work }}</td>
                          <td>
                            <router-link :to="{ path: '/client/' + client.id }">
                              <button
                                type="button"
                                name="button"
                                class="btn btn-info"
                              >
                                view
                              </button>
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="col-lg-4 offset-lg-4">
                      <button
                        class="btn btn-default btn-lg"
                        @click="gotoPrevious"
                      >
                        Previous
                      </button>
                      <button class="btn btn-default btn-lg" @click="gotoNext">
                        Next
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
      orgDetails: "",
      employee: "",
      clients: "",
      state: "",
      lga_states: "",
      current_page: 1,
      register: {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        type: "client",
        username: "",
        state: "",
        lga: "",
        ward: "",
        address: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    gotoNext() {
      if (this.clients.meta.current_page != this.clients.meta.last_page) {
        this.current_page++;
        this.getUSerDetails();
      } else {
        this.$toasted.info("You have reached the Last Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    gotoPrevious() {
      if (this.clients.meta.current_page != 1) {
        this.current_page--;
        this.getUSerDetails();
      } else {
        this.$toasted.info("You have reached the First Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    getUSerDetails() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == "tpa") {
        this.getOrgDetailsTPA();
      } else {
        this.getOrgDetailsTPAAgent();
      }
    },

    getOrgDetailsTPAAgent() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/OfficerDetails/${this.user.id}`)
        .then((response) => {
          this.employee = response.data;
          let org_id = response.data.orgenrol_id;

          // get clients
          this.axios
            .get(`/api/v1/auth/org_client/${org_id}`, {
              params: {
                page: this.current_page,
              },
            })
            .then((response) => {
              this.clients = response.data;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          //end of get
          this.isLoading = false;
          console.log(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },

    getOrgDetailsTPA() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
        .then((response) => {
          this.orgDetails = response.data;
          let org_id = response.data.id;

          // get clients
          this.axios
            .get(`/api/v1/auth/org_client/${org_id}`, {
              params: {
                page: this.current_page,
              },
            })
            .then((response) => {
              this.clients = response.data;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          //end of get
          this.isLoading = false;
          console.log(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
  },
  created() {
    this.getUSerDetails();
  },
};
</script>
