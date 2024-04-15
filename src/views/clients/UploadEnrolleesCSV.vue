<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-success m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <h3 class="h3">Enrollee Uploads CSV</h3>

              <div class="form-dark">
                <div class="input-group input-group-flush mb-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <a class="btn btn-dark my-3" href="/Sample_Data.xlsx">Download Sample Format</a>
        <div class="row list">
          <div class="col-lg-12 col-md-12">
            <div class="card m-b-30">
              <div class="card card-header">
                <div class="col-md-3">
                  <label for=""
                    >Start Upload From Number?: {{ json_index }}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="json_index"
                  />
                </div>
                <div class="col-md-12 my-2">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroupFileAddon01"
                        >Upload</span
                      >
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        @change="handleFileUpload"
                        accept=".csv"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label class="custom-file-label" for="inputGroupFile01"
                        >Choose file (Must be CSV)</label
                      >
                    </div>
                  </div>

                  <div v-if="clients.length > 1" class="my-2">
                    <p class="h6">
                      Total to be Uploaded JSON: {{ clients.length }}
                    </p>
                    <p class="h6">{{ this.json_index }} Index Uploaded</p>
                  </div>
                </div>

                <p>
                  <button class="btn btn-dark btn-block" @click="autoUpdate">
                    Update All
                  </button>
                </p>
              </div>

              <div class="card-body">
                <div class="table-responsive">
                  <div class="col-md-12">
                    <b-table striped hover :items="clients"></b-table>
                  </div>
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
      </div>
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
import Papa from "papaparse";

export default {
  components: {
    Loading,
    Navbar,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      states: "",
      clients: "",
      gender: "",
      value_list: "",
      auto_selected: "",
      json_index: 0,
    };
  },
  computed: {
    //
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        this.clients = JSON.parse(e.target.result);
      };
      reader.readAsText(file);
    },

    //papaParse Functions
    async handleFileUpload(event) {
      const file = event.target.files[0];
      try {
        const jsonData = await this.parseCSVtoJSON(file);
        console.log(jsonData);
        this.clients = jsonData;
      } catch (error) {
        console.error(error);
      }
    },

    async parseCSVtoJSON(file) {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },

    //End of papaParse Functions

    autoUpdate() {
      if (confirm("Are you sure you want to auto update?")) {
        setInterval(
          function () {
            this.updateDateauto();
          }.bind(this),
          3000
        );
      }
    },

    updateDateauto() {
      this.isLoading = true;

      // this.auto_selected = this.clients.data[0]
      //  console.log(this.auto_selected)
      //  let formatter =  this.clients.filter((x) => x.id_card_number == this.auto_selected.id_card_number);

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/multiverse/add`, {
          firstname: this.clients[this.json_index].firstname,
          lastname: this.clients[this.json_index].lastname,
          middlename: this.clients[this.json_index].middlename,
          gender: this.clients[this.json_index].gender,
          dob: this.clients[this.json_index].dob,
          expiry_date: this.clients[this.json_index].expiry_date,
          id_card_number: this.clients[this.json_index].id_card_number,
          CATEGORY: this.clients[this.json_index].CATEGORY,
          provider_id: this.clients[this.json_index].provider_id,
          place_of_work: this.clients[this.json_index].place_of_work,
          // org_id: this.clients[this.json_index].org_id,
          user_image: this.clients[this.json_index].user_image,
          plan_type: this.clients[this.json_index].plan_type,
          nimc_number: this.clients[this.json_index].nimc_number,
          agency_id: 95930,
          state: 2676,
          enrolled_by: 95930,
          sector: this.clients[this.json_index].sector,
          sectorType: this.clients[this.json_index].sectorType,
          marital_status: this.clients[this.json_index].marital_status,
          // localgovt: this.clients[this.json_index].localgovt,
          user_role: 0,
        })
        .then((response) => {
          console.log(response);
          // this.getClients()
          this.isLoading = false;
          this.json_index++;
          this.$toasted.success("updated!", {
            position: "top-center",
            duration: 1000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.success("error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    updateDate(client) {
      this.isLoading = true;
      let formatter = this.clients.filter(
        (x) => x.id_card_number == client.id_card_number
      );

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/update-dates-all`, {
          values: formatter,
        })
        .then((response) => {
          console.log(response);
          this.getClients();
          this.isLoading = false;
          this.$toasted.success("updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.success("error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
  },
  created() {},
};
</script>
  