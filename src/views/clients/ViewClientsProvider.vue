<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar">
                  <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                </div>
              </div>
              <p class="h3 text-dark">{{ clients.length }} Clients</p>
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
          <div class="row list">
            <div class="col-lg-12 col-md-8">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>KAMPE Number</th>
                          <th>Phone Number</th>
                          <th>Plan</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="client in clients" v-bind:key="client.id">
                          <td>{{ client.full_name }}</td>
                          <td>{{ client.id_card_number }}</td>
                          <td>{{ client.phone_number }}</td>
                          <td>{{ client.sector }}</td>
                          <td>
                            <router-link
                              :to="{ path: '/patient/' + client.id }"
                            >
                              <button
                                type="button"
                                name="button"
                                class="btn btn-outline-success"
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
      fullPage: true,
      states: "",
      clients: "",
    };
  },
  beforeMount() {},
  methods: {
    getClients() {
      // condition ? exprIfTrue : exprIfFalse
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(
          `/api/v1/auth/getProviderToUser/${
            this.user.type == "provider"
              ? this.user.id
              : this.user.institutional_id
          }`
        )
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
    this.getClients();
  },
};
</script>
