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
              <h3>{{ total.total }} Dependents</h3>

              <button type="button" class="btn btn-primary" @click="deleteAll">
                Delete selected
              </button>
              <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Clients" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div> -->
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="container">
          <p>
            {{ selected }}
          </p>

          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Mark</th>
                          <th>Name</th>
                          <th>ID Number</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="client in clients" v-bind:key="client.id">
                          <td>
                            <button
                              type="button"
                              @click="valuepasser(client)"
                              class="btn btn-default"
                              style="margin-left: 10px; margin-top: 10px"
                            >
                              <i class="fe fe-star"></i>
                            </button>
                          </td>
                          <td>{{ client.full_name }} {{ client.id }}</td>
                          <td>{{ client.id_card_number }}</td>
                          <td>
                            <!-- <button type="button" @click="deleteUser(client)" class="btn btn-danger" style="margin-left:10px; margin-top:10px;" ><i class="fe fe-delete"></i></button> -->
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
          </div>
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
      isLoading: false,
      selected: [],
      fullPage: true,
      states: "",
      total: "",
      clients: "",
      state: "",
      lga_states: "",
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
  beforeMount() {},
  computed: {
    //
  },

  methods: {
    deleteAll() {
      let answer = this.selected.toString();
      console.log(answer);
      this.axios
        .post(`/api/v1/auth/deletemultiple`, {
          ids: answer,
          selected_table: "dependants",
        })
        .then((response) => {
          console.log(response);
          this.getClients();
          this.selected = [];
          this.$toasted.success("Deleted Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    valuepasser(client) {
      this.selected.push(client.id);
    },
    getClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/dependent_duplicate/439078`)
        .then((response) => {
          this.clients = response.data.data;
          this.total = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUser(client) {
      // if (confirm('Are you Sure you want to delete this user') ) {
      this.axios
        .delete(`/api/v1/auth/deleteUser/${client.id}`)
        .then((response) => {
          console.log(response);
          this.getClients();
          this.$toasted.success("Dependent deleted Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });
        });
      // }
    },
  },
  created() {
    this.getClients();
  },
};
</script>
