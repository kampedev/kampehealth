<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <p class="h4 text-dark">Manage Claims Facilities</p>
            </div>
          </div>
        </div>
      </div>
      <section class="container">
        <div class="card">
          <div class="row list">
            <div class="col-md-10 offset-md-1">
              <div class="card-header">
                <p class="h6">
                  <i class="fe fe-activity"></i> Health Facilities
                </p>
              </div>
              <div class="card-body table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>E mail</th>
                      <th>Contact</th>
                      <th>Pending Claims</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="provider in providers" v-bind:key="provider.id">
                      <td>
                        {{ provider.agency_name }}
                        <i class="fe fe-copy" @click="copyText(provider)"></i>
                      </td>
                      <td>{{ provider.email }}</td>
                      <td>{{ provider.phone_number }}</td>
                      <td>{{ provider.claimsprovider.length }}</td>

                      <td>
                        <router-link
                          :to="{ path: '/all-claims/' + provider.id }"
                        >
                          <button
                            type="button"
                            name="button"
                            class="btn btn-outline-dark"
                          >
                            <i class="fe fe-eye"></i>
                          </button>
                        </router-link>
                      </td>
                    </tr>
                    <tr v-if="providers.length == 0">
                      <td colspan="4">
                        <p class="h5">You have no pending claims</p>
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
      providers: "",
      agencies: "",
      edit: false,
      show: false,
      showsearch: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
      provider_id: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getpendingclaimsbyProvider/439078`)
      .then((response) => {
        this.providers = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    copyText(provider) {
      const copyToClipboard = (provider) =>
        navigator.clipboard.writeText(provider.agency_name);
      copyToClipboard(provider);
      this.$toasted.info("Copied to clipboard", {
        position: "top-center",
        duration: 3000,
      });
    },

    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getpendingclaimsbyProvider/439078`)
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
    //
  },
};
</script>
