<template>
  <div class="container">
    <div class="row list">
      <div class="col-md-3">
        <div class="row">
          <button
            class="btn btn-default"
            @click="show = !show"
            style="margin-bottom: 10px; margin-left: 15px"
          >
            <i class="mdi mdi-magnify mdi-24px"></i>
          </button>
        </div>
      </div>

      <div class="col-md-12" v-show="show">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="text-center"></div>

            <div class="row">
              <div class="form-group col-md-12">
                <label for="inputEmail4" class="h5">Search Key</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchkey"
                  placeholder="KAMPE ID, Phone Number, NIN, First Name, Last Name"
                />
              </div>

              <div class="col-md-12">
                <button
                  class="btn btn-info btn-block btn-lg mt-6"
                  @click="searchAll"
                >
                  Search
                </button>
              </div>
            </div>

            <div class="col-md-12 mt-4">
              <p class="h5">Searched Results {{ searched_array.length }}</p>
              <p
                v-for="(search, index) in searched_array"
                v-bind:key="search.id"
                class="my-2"
              >
                <span>{{ index + 1 }}. </span>
                <a :href="`/${search.type}/${search.id}`">
                  {{ search.full_name }} {{ search.id_card_number }}

                  <button class="btn mx-2 badge badge-soft-info">
                    {{ search.type }}
                  </button>
                </a>
              </p>
              <br />
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
      user: null,
      providers: "",
      KAMPE_number: "",
      phone_number: "",
      nimc_number: "",
      email: "",
      localgovt: "",
      search: "KAMPE_number",
      searchkey: "",
      search_result: "",
      edit: false,
      show: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
      provider_id: "",
      mdas: "",
      searched_array: "",
      state: "",
      lga_states: "",
      sector: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    searchAll() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/searchenrollees`, {
          agency_id: 439078,
          request_query: this.searchkey,
        })
        .then((response) => {
          this.searched_array = response.data;
          console.log(response);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  },
  created() {
    //
  },
};
</script>
