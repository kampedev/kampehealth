<template>
  <div class="col-md-12">
    <div class="card m-b-30">
      <div class="card-body">
        <div class="text-center">
          <strong>Search Facility</strong>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <label>Search Facility Name</label>
            <v-select
              v-model="provider_id"
              :options="providers"
              label="agency_name"
              :value="provider_id"
              @input="selected"
            ></v-select>
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
      user: null,
      providers: "",
      selected_provider: "",
      search_result: "",
      edit: false,
      show: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
      provider_id: "",
      mdas: "",
      state: "",
      lga_states: "",
      sector: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
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
  methods: {
    selected(value) {
      this.selected_provider = value.id;
      this.$toasted.info("Searched Successfully", {
        position: "top-center",
        duration: 3000,
      });
      this.$router.push(`/provider-${this.selected_provider}`);
    },

    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));
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

    clearIt() {
      this.agency_id = "";
    },
  },
  created() {
    this.getProviders();
  },
};
</script>
