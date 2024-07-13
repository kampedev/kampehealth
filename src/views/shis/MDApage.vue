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
              <h3></h3>
              <strong> Ministries Departments and Parastatals</strong>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <h3 class="h5 text-center">{{ ministries.length }} MDAs</h3>
                </div>

                <div class="card-body">
                  <div class="form-group">
                    <button class="btn btn-success" @click="show = !show">
                      Add MDA
                    </button>
                  </div>

                  <download-excel
                    :data="ministries.data"
                    :fields="json_fields"
                    class="btn btn-success"
                    :escapeCsv="false"
                    name="mda.xls"
                  >
                    <span class="fe fe-download"></span>
                    Export Data for MDA
                  </download-excel>
                </div>
              </div>
            </div>

            <div class="col-md-12" v-show="show">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="form-row">
                    <div
                      class="form-group floating-label col-md-12 col-sm-12"
                      v-if="selector == 'ministry'"
                    >
                      <label>MDA</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Name of MDA"
                        v-model="register.ministry"
                      />
                    </div>

                    <div
                      class="form-group floating-label col-md-12 col-sm-12"
                      v-if="selector == 'department'"
                    >
                      <label>Name of Department</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Name of Department"
                        v-model="register.department"
                      />
                    </div>
                    <div
                      class="form-group floating-label col-md-12"
                      v-if="selector == 'parastatal'"
                    >
                      <label>Name of Parastatal</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Name of Parastatal"
                        v-model="register.parastatal"
                      />
                    </div>
                  </div>

                  <button
                    @click="registerMDA"
                    class="btn btn-success btn-block btn-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <h5><i class="fe fe-airplay"></i> MDAs</h5>
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th class="text-center">MDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="mda in ministries.data" v-bind:key="mda.id">
                      <td>{{ mda.name }}</td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-info"
                          name="button"
                          @click="editMin(mda)"
                        >
                          edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    </main>
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
      ministries: "",
      departments: "",
      parastatals: "",
      current_page: 1,
      edit: false,
      show: false,
      selector: "ministry",
      isLoading: false,
      fullPage: true,
      agency_id: "",
      provider_id: "",
      ministry_id: "",
      register: {
        ministry: "",
        department: "",
        parastatal: "",
      },
      json_fields: {
        "MDA Name": "name",
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
      .get(`/api/v1/auth/ministry/95930`)
      .then((response) => {
        this.ministries = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    // gotoNext() {
    //   if (this.ministries.meta.current_page != this.ministries.meta.last_page) {
    //     this.current_page++;
    //     this.getDepts();
    //   } else {
    //     this.$toasted.info("You have reached the Last Page", {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //   }
    // },
    // gotoPrevious() {
    //   if (this.ministries.meta.current_page != 1) {
    //     this.current_page--;
    //     this.getDepts();
    //   } else {
    //     this.$toasted.info("You have reached the First Page", {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //   }
    // },
    // getDepts() {
    //   this.axios
    //     .get(`/api/v1/auth/ministry`)
    //     .then((response) => {
    //       this.ministries = response.data;
    //       this.json_data = this.ministries;

    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    editMin(mda) {
      this.show = true;
      this.edit = true;
      this.register.ministry = mda.name;
      this.ministry_id = mda.id;
    },

    registerMDA() {
      this.isLoading = true;
      if (this.edit == false) {
        this.axios
          .post("/api/v1/auth/ministry", {
            agency_id: 95930,
            name: this.register.ministry,
          })
          .then((response) => {
            console.log(response);
            this.isLoading = false;
            // this.getDepts();
            // this.clearIt();
            this.$toasted.info("MDA Added", {
              position: "top-center",
              duration: 5000,
            });
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
            this.$toasted.error("Error", {
              position: "top-left",
              duration: 5000,
            });
          });
      } else {
        this.axios
          .put("/api/v1/auth/ministry", {
            id: this.ministry_id,
            name: this.register.ministry,
          })
          .then((response) => {
            console.log(response);
            this.isLoading = false;
            // this.getDepts();
            // this.clearIt();
            this.$toasted.info("MDA Updated", {
              position: "top-center",
              duration: 5000,
            });
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
            this.$toasted.error("Error", {
              position: "top-left",
              duration: 5000,
            });
          });
      }
    },

    clearIt() {
      this.register.ministry = "";
    },
  },
  created() {
    // this.getDepts();
  },
};
</script>
