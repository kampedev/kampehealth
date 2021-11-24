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
            </div>
          </div>
        </div>
      </div>
      <section class="">
        <div class="col-md-12">
          <!-- <div> -->
          <b-card no-body>
            <b-tabs pills card align="center">
              <!-- <b-tab title="Duplicate ID Card Number">
                <b-card-text>
                  <div class="row list">
                    <div class="col-lg-12 col-md-12">
                      <div class="card m-b-30">
                        <div class="card-body">
                          {{ clients.total }} Duplicate ID Cards
                          <div class="table-responsive">
                            <table class="table align-td-middle table-card">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Phone Number</th>
                                  <th>Type</th>
                                  <th>ID card</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="client in clients.data"
                                  v-bind:key="client.id"
                                >
                                  <td>
                                    <router-link
                                      :to="{
                                        path: '/client/' + client.id,
                                        params: {},
                                      }"
                                    >
                                      {{ client.firstname }}
                                      {{ client.lastname }} {{ client.id }}
                                    </router-link>
                                  </td>
                                  <td>{{ client.phone_number }}</td>
                                  <td>{{ client.type }}</td>
                                  <td>
                                    {{ client.id_card_number }}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      @click="changeNumber(client)"
                                      class="btn btn-primary"
                                      style="
                                        margin-left: 10px;
                                        margin-top: 10px;
                                      "
                                    >
                                      <i class="fe fe-edit"></i>
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
                        :can-cancel="false"
                        :is-full-page="fullPage"
                      ></loading>
                    </div>
                  </div>
                </b-card-text>
              </b-tab> -->

              <b-tab title="Special  Filter" active>
                <b-card-text>
                  <NoGender />
                </b-card-text>
              </b-tab>

              <b-tab title="Dependents No Principal">
                <b-card-text>
                  <div class="card m-b-30">
                    <div class="card-body">
                      <h5>Total Page: {{ clients.total }}</h5>
                      <button type="button" class="btn btn-primary" @click="autoUpdate">update All</button>

                      <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Relationship</th>
                              <th>Created</th>
                              <th>ID card</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="client in clients.data"
                              v-bind:key="client.id"
                            >
                              <td>
                                <router-link
                                  :to="{
                                    path: '/dependent/' + client.id,
                                    params: {},
                                  }"
                                >
                                  {{ client.firstname }} {{ client.lastname }}
                                  {{ client.id }}
                                </router-link>
                              </td>
                              <td>{{ client.relationShipType }}</td>
                              <td>{{ client.created_at }}</td>
                              <td>
                                {{ client.id_card_number }}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  @click="changeNumber(client)"
                                  class="btn btn-primary"
                                  style="margin-left: 10px; margin-top: 10px"
                                >
                                  <i class="fe fe-edit"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div class="vld-parent">
                      <loading
                        :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="false"
                        :is-full-page="fullPage"
                      ></loading>
                    </div>

                      </div>
                    </div>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
          <!-- </div> -->
        </div>

        <div class="container"></div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import NoGender from "@/views/clients/NoGender.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
    NoGender,
  },
  data() {
    return {
      isLoading: false,
      selected: [],
      fullPage: true,
      states: "",
      clients: "",
      smallestcards: "",
      state: "",
      lga_states: "",
      current_page: 1,
    };
  },

  methods: {
    getClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/find/principal`)
        .then((response) => {
          this.clients = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

       autoUpdate() {
      if (confirm("Are you sure you want to auto update?")) {
       
        setInterval(
          function () {
            this.changeNumberauto();
             
          }.bind(this),
          5000
        );
      }
    },

      changeNumberauto() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/attach/dependent`,{
          id_card_number: this.clients.data[1].id_card_number,
          dep_id: this.clients.data[1].id,
        })
        .then((response) => {
          console.log(response);
          this.getClients();
          this.$toasted.success("Found Successfully", {
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
           this.getClients();
        });
    },

    changeNumber(client) {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/attach/dependent`,{
          id_card_number: client.id_card_number,
          dep_id: client.id,
        })
        .then((response) => {
          console.log(response);
          this.getClients();
          this.$toasted.success("Found Successfully", {
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
           this.getClients();
        });
    },
  },
  created() {
    this.getClients();
    // this.getSmallCads();
  },
};
</script>
