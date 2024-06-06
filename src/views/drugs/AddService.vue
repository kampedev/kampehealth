<template>
  <section>
    <div class="card m-b-30">
      <div class="card-body">
        <p class="h3 text-center">Add Service</p>

        <div class="form-row">
          <div class="form-group col-md-10">
            <label for="inputCity">Service Category </label>
            <select
              class="form-control"
              v-model="register.service_category_id"
              @change="getCategories"
            >
              <option
                v-for="cat in categories"
                v-bind:key="cat.id"
                :value="cat.id"
              >
                {{ cat.category_name }}
              </option>
            </select>
          </div>

          <div class="form-group floating-label col-md-6">
            <label>General Description</label>
            <input
              type="text"
              required
              class="form-control"
              placeholder="General Description"
              v-model="register.description"
            />
          </div>
          <div class="form-group floating-label col-md-4">
            <label>Price</label>
            <input
              type="text"
              required
              class="form-control"
              placeholder="Price"
              v-model="register.price"
            />
          </div>
        </div>
        <button @click="submitForm" class="btn btn-success btn-block my-2">
          Submit
        </button>

        <div class="col-md-12 m-b-30">
          <h5 class="h4">
            <i class="fe fe-activity"></i>{{ services.length }} Services
          </h5>
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="service in services.data" v-bind:key="service.id">
                  <td>{{ service.category.category_name }}</td>
                  <td>{{ service.description }}</td>
                  <td>
                    <i class="mdi mdi-currency-ngn"></i
                    >{{ service.price | numeral("0,0.00") }}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-info m-1"
                      @click="editService(service)"
                    >
                      <i class="fe fe-edit"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger m-1"
                      @click="deleteService(service)"
                    >
                      <i class="fe fe-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="col-lg-4 offset-lg-4">
              <button class="btn btn-default btn-lg" @click="gotoPrevious">
                Previous
              </button>
              <button class="btn btn-default btn-lg" @click="gotoNext">
                Next
              </button>
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
      categories: "",
      services: "",
      edit: false,
      show: false,
      current_page: 1,
      isLoading: false,
      fullPage: true,
      service_id: "",
      register: {
        service_category_id: "",
        price: "",
        description: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/service_category`)
      .then((response) => {
        this.categories = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    gotoNext() {
      if (this.services.meta.current_page != this.services.meta.last_page) {
        this.current_page++;
        this.getServices();
      } else {
        this.$toasted.info("You have reached the Last Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    gotoPrevious() {
      if (this.services.meta.current_page != 1) {
        this.current_page--;
        this.getServices();
      } else {
        this.$toasted.info("You have reached the First Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },

    submitForm() {
      if (this.edit == false) {
        this.addService();
      } else {
        this.updateService();
      }
    },

    deleteService(service) {
      if (confirm("Are you sure you want to delete Service?")) {
        this.axios
          .delete(`/api/v1/auth/services/${service.id}`)
          .then((response) => {
            console.log(response);
            this.getServices();
            this.$toasted.success("Deleted Successfully!", {
              position: "top-left",
              duration: 5000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    getCategories() {
      this.axios
        .get(`/api/v1/auth/service_category`)
        .then((response) => {
          this.categories = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getServices() {
      this.axios
        .get(`/api/v1/auth/service-agency/95930`, {
          params: {
            page: this.current_page,
          },
        })
        .then((response) => {
          this.services = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editService(service) {
      this.edit = true;
      this.register.service_category_id = service.service_category_id;
      this.register.price = service.price;
      this.register.description = service.description;
      this.register.description = service.description;
      this.service_id = service.id;
    },
    addService() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post("/api/v1/auth/services", {
          agency_id: 95930,
          service_category_id: this.register.service_category_id,
          price: this.register.price,
          kgshia_code: "OHIS",
          description: this.register.description,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.success("Added Successfully!", {
            position: "top-left",
            duration: 5000,
          });
          this.getServices();
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Not Successful", {
            position: "top-left",
            duration: 5000,
          });
        });
    },
    updateService() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .put(`/api/v1/auth/services/${this.service_id}`, {
          agency_id: 95930,
          service_category_id: this.register.service_category_id,
          price: this.register.price,
          kgshia_code: "OHIS",
          description: this.register.description,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.edit = false;
          this.getServices();
          this.$toasted.success("Updated Successfully!", {
            position: "top-left",
            duration: 5000,
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.$toasted.error("Not Successful", {
            position: "top-left",
            duration: 5000,
          });
        });
    },

    clearIt() {
      this.agency_id = "";
    },
  },
  created() {
    this.getCategories();
    this.getServices();
  },
};
</script>
