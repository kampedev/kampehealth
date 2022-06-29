<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <div class="bg-success m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar"></div>
            </div>
            <h3 class="h3">Drugs/Services Processing Form</h3>
          </div>
        </div>
      </div>
    </div>

    <section class="">
      <div class="container">
        <div class="">
          <div class="">
            <div class="card m-b-30">
              <div class="card-body">
                <div class="">
                 
                  <form  @submit.prevent="addServiceRendered">
                    <div class="row"> 
                    <div class="form-group col-md-6">
                      <label >Select Type</label>
                      <select
                        class="form-control"
                        v-model="type" required
                        @change="handleData"
                      >
                        <option value="Drug">Drug</option>
                        <option value="Service">Service</option>
                      </select>
                    </div>


                    <div class="form-group col-md-6" v-if="type == 'Service'">
                          <label >Select Service  </label>
                          <v-select
                            v-model="addservice.services_id"
                            @change="getService()"
                            label="description"
                            :required="!addservice.services_id"
                            :options="services.data"
                          />
                      </div>                 

                     <div class="form-group col-md-6" v-if="type == 'Drug'">
                          <label for="inputPassword4">Select Drug  </label>
                          <v-select
                            
                            v-model="addservice.drugs_id"
                            
                            label="item_data"
                            :required="!addservice.drugs_id"
                            :options="drugs.data"
                          />
                       
                      </div>

                   
                    <!-- <div class="form-group col-md-6" v-if="type == 'Drug'">
                      <label for="inputCity">Quantity</label>
                      <input
                        type="text"
                        class="form-control" required
                        id="inputEmail4"
                        placeholder="1"
                        v-model="days"
                      />
                    </div> -->

                  <!-- <div class="form-group col-md-4" v-if="type != ''">
                        <label for="inputCity"
                          >Days
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          class="form-control"
                          required
                          id="inputEmail4"
                          placeholder="Qty"
                          v-model="days"
                        />
                        <p class="text-primary">For services such as bedrest, admissions etc </p>
                      </div> -->

                      <!-- <div class="form-group col-md-4" v-if="type == 'Drug'">
                        <label for="inputCity">Dosage</label>
                        <input
                          type="number"
                          min="1"
                          class="form-control"
                          required
                          id="inputEmail4"
                          placeholder="Qty"
                          v-model="dose"
                        />
                      </div> -->

                      <div class="form-group col-md-4" v-if="type != ''">
                        <label for="inputCity"
                          >Quantity/Frequency
                        </label>
                        <input
                          type="number"
                          min="1"
                          class="form-control"
                          required
                          id="inputEmail4"
                          placeholder="Qty"
                          v-model="frequency"
                        />
                        <p class="text-primary">The number of times or quantity given. </p>
                      </div>
                    <!-- <div class="form-group col-md-6">
                      <label for="inputCity">Cost</label>
                      <input
                        type="text"
                        class="form-control" required
                        id="inputEmail4"
                        placeholder="Cost"
                        v-model="calcCost"
                        disabled
                      />
                    </div>
                    -->

                    </div>
                     <div class="col-md-6">
                      <button
                        class="btn btn-success btn-block"
                        style="margin-bottom: 30px"
                      >
                        <i class="fe fe-send"></i> Add
                      </button>
                    </div>
                  </form>
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-outline-success btn-block"
                    @click="singleClaim()"
                  >
                    Proceed to Document Upload <i class="fe fe-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 m-b-30">
            <h5>
              <i class="fe fe-activity"></i> Claim Services/Drugs
              <i class="fe fe-thermometer"></i>
            </h5>
            <div class="table-responsive">
              <table class="table align-td-middle table-card">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <!-- <th>Days</th> -->
                    <!-- <th>Dose</th> -->
                    <th>Quantity/Frequency</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(service, index) in singleclaim.services"
                    v-bind:key="service.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      <span v-if="service.service != null">{{
                        service.service.description
                      }}</span>
                      <span v-if="service.drugs_id != null">{{
                        service.drug.drug_name
                      }}</span>
                    </td>
                    <!-- <td> {{service.days}} </td> -->
                    <!-- <td>  {{service.dose}} </td> -->
                    <td>  {{service.frequency}}  </td>
                    <td>
                      &#8358; <span v-if="service.service != null">{{
                        service.service.price
                      }}</span>
                      <span v-if="service.drugs_id != null">{{
                        service.drug.price
                      }}</span>
                     </td>
                    <td>&#8358;{{ service.cost | numeral(0, 0) }} </td>
                   
                    <td>
                      <button
                        class="btn btn-danger"
                        name="button"
                        @click="deleteService(service)"
                      >
                        <i class="fe fe-delete"></i>
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
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
      editor: ClassicEditor,
      user: null,
      services: "",
      singleclaim: "",
      drugs: "",
      days: 1,
      dose: 1,
      frequency: 1,
      cost: "",
      singleservice: "",
      singledrug: "",
      claims: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      type: "",
      selected_type: "",
      addservice: {
        services_id: "",
        drugs_id: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/service-agency/95930`)
      .then((response) => {
        this.services = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    calcCost() {
      if (this.type == "Service") {
        return this.quantity * this.addservice.services_id.price;
      } else {
        return this.quantity * this.addservice.drugs_id.price;
      }
    },
  },
  methods: {
    deleteService(service) {
      if (confirm("Are you want you want to delete permanently?")) {
        this.axios
          .delete(`/api/v1/auth/claim_service/${service.id}`)
          .then((response) => {
            console.log(response);
            this.getSingleClaim();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    handleData() {
      if (this.type == "Drug") {
        this.addservice.services_id = "";
      }
      if (this.type == "Service") {
        this.addservice.drugs_id = "";
      }
    },
    singleClaim() {
      this.$router.push(`/upload-claims-docs/${this.$route.params.id}`);
    },
    getDrugs() {
      this.axios
        .get(`/api/v1/auth/drug-agency/95930`)
        .then((response) => {
          this.drugs = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    clearIt() {
      this.addservice.services_id = "";
      this.addservice.drugs_id = "";
      this.quantity = 1;
      this.calcCost = "";
    },
    getSingleClaim() {
      this.axios
        .get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
        .then((response) => {
          this.singleclaim = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getService() {
      this.axios
        .get(`/api/v1/auth/services/${this.addservice.services_id.id}`)
        .then((response) => {
          this.singleservice = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDrug() {
      this.axios
        .get(`/api/v1/auth/drugs/${this.addservice.drugs_id}`)
        .then((response) => {
          this.singledrug = response.data[0];
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addServiceRendered() {
      this.user = JSON.parse(localStorage.getItem("user"));
      // Add claim_service
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/claim_service", {
          services_id: this.addservice.services_id.id,
          drugs_id: this.addservice.drugs_id.id,
          claims_id: this.$route.params.id,
          dose: this.dose,
          frequency: this.frequency,
          days: this.days,
          // cost: this.calcCost,
        })

        .then((response) => {
          console.log(response);
          this.clearIt();
          this.getSingleClaim();
          this.isLoading = false;
          this.$breadstick.notify("Added Successfully!", {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created() {
    this.getDrugs();
    this.getSingleClaim();
  },
};
</script>
<style scoped>
.spacer-top{
  margin-top:4px;
}
</style>
