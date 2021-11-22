<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
<<<<<<< HEAD
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-12">
              <p class="h4 text-center text-white">Enrollee Management</p>
            </div>
          </div>
        </div>
      </div>

      <SearchUser />
      <!-- <FilterUserProvider/> -->
      <section class="">
        <div class="container">
          <div class="col-md-12 mx-auto text-white p-b-30">
            <button
              type="button"
              name="button"
              class="btn btn-primary text-right"
              @click="show = true"
            >
              Add Enrollee
              <i class="fe fe-plus"></i>
            </button>
          </div>

          <div class="row list" v-show="show">
            <AddClientForm />

            <div class="vld-parent">
              <loading
                :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="true"
              ></loading>
            </div>
          </div>

          <div class="row list">
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h4 class="h4 text-center">
                    {{ clients.meta.total | numeral(0, 0) }} Enrollees
                  </h4>

                  <div class="table-responsive">
                    <table class="table align-td-middle table-card">
                      <thead>
                        <tr>
                          <!-- <th>SN</th> -->
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Sector</th>
                          <th>OHIS Number Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="client in clients.data"
                          v-bind:key="client.id"
                        >
                          <!-- <td>
=======
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">
                 <div class="col-md-12">
                                    <p class="h4 text-center text-white">Enrollee Management</p>

                 </div>

               </div>
           </div>
       </div>
                  

       <SearchUser/>
       <!-- <FilterUserProvider/> -->
       <section class="">
           <div class="container">

             <div class="col-md-12 mx-auto text-white p-b-30">
                       <button type="button" name="button" class="btn btn-primary text-right" @click="show = true" >Add Enrollee 
                         <i class="fe fe-plus"></i>
                       </button>
                   </div>

               <div class="row list" v-show="show">
                 <AddClientForm/>

                   <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="true"></loading>
                    </div>


               </div>

               <div class="row list">
                   <div class="col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                              <h4 class="h4 text-center">{{clients.meta.total | numeral(0,0)}} Enrollees</h4>

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <th>OHIS Number Number</th>
                                         <th>Date Enrolled</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="client in clients.data" v-bind:key="client.id">
                                         <!-- <td>
>>>>>>> 901479ff50c9056f95b0addefb5b189f4492aba4
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
<<<<<<< HEAD
                          <!-- <td >{{index+1}} </td> -->
                          <td>{{ client.firstname }} {{ client.lastname }}</td>
                          <td>{{ client.phone_number }}</td>
                          <td>{{ client.sector }}</td>
                          <td>{{ client.id_card_number }}</td>
                          <!-- <td>{{client.state}}/{{client.localgovt}}</td> -->
                          <td>
                            <router-link :to="{ path: '/client/' + client.id }">
                              <button
                                type="button"
                                name="button"
                                class="btn btn-info"
                              >
                                view
                              </button>
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="col-md-4 offset-md-4">
                      <button
                        class="btn btn-default btn-lg"
                        @click="gotoPrevious"
                      >
                        Previous
                      </button>
                      <button class="btn btn-default btn-lg" @click="gotoNext">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
=======
                                         <!-- <td >{{index+1}} </td> -->
                                         <td >{{client.firstname}} {{client.lastname}} {{client.middlename}} </td>
                                         <td>{{client.phone_number}}</td>
                                         <td>{{client.sector}}</td>
                                         <td>{{client.id_card_number}}</td>
                                         <td>{{client.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                                         <td>

                                           <router-link :to="{ path: '/client/'+ client.id}">
                                             <button type="button" name="button" class="btn btn-info">
                                               <i class="fe fe-eye"></i>
                                             </button>
                                            </router-link>

                                         </td>
                                     </tr>

                                     </tbody>
                                 </table>
                                 <div class="col-md-4 offset-md-4">
                                   <button  class="btn btn-default btn-lg" @click="gotoPrevious">Previous</button>
                                   <button class="btn btn-default btn-lg" @click="gotoNext">Next</button>
                                 </div>

                             </div>

                           </div>
                       </div>
                   </div>
               </div>

           </div>

              <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="fullPage"></loading>
                    </div>

       </section>
       </main>
   </section>
>>>>>>> 901479ff50c9056f95b0addefb5b189f4492aba4
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import AddClientForm from "@/views/clients/AddClientForm.vue";
import SearchUser from "@/views/shis/components/SearchUser.vue";
// import FilterUserProvider from '@/views/shis/components/FilterUserProvider.vue'
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Navbar,
    Loading,
    AddClientForm,
    SearchUser,
    // FilterUserProvider
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      states: "",
      show: false,
      clients: "",
      providers: "",
      sector: "",
      mdas: "",
      wards: [],
      state: "",
      lga_states: "",
      current_page: "",
      register: {
        firstname: "",
        lastname: "",
        middlename: "",
        nimc_number: "",
        email: "",
        phone_number: "",
        type: "client",
        agency_id: "",
        state: "",
        localgovt: "",
        ward: "",
        address: "",
        blood: "",
        weight: "",
        gender: "",
        genotype: "",
        dob: "",
        salary_number: "",
        provider_id: "",
        point_of_care: "",
        sector: "",
        finger_print: "",
        place_of_work: "",
        grade_level: "",
        date_of_entry: "",
        marital_status: "",
        category_of_vulnerable_group: "",
      },
    };
  },
  beforeMount() {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/employee_client/${this.user.id}`, {
        params: {
          page: this.current_page,
        },
      })
      .then((response) => {
        this.clients = response.data;
        this.isLoading = false;

        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  },
  methods: {
    fetchWards() {
      this.axios
        .get(`/api/v1/auth/getwards/` + event.target.value)
        .then((response) => {
          this.wards = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    gotoNext() {
      if (this.clients.meta.current_page != this.clients.meta.last_page) {
        this.current_page++;
        this.getClients();
      } else {
        this.$toasted.info("You have reached the Last Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    gotoPrevious() {
      if (this.clients.meta.current_page != 1) {
        this.current_page--;
        this.getClients();
      } else {
        this.$toasted.info("You have reached the First Page", {
          position: "top-center",
          duration: 3000,
        });
      }
    },
    getClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .get(`/api/v1/auth/employee_client/${this.user.id}`, {
          params: {
            page: this.current_page,
          },
        })
        .then((response) => {
          this.clients = response.data;
          this.isLoading = false;
          console.log(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getStates() {
      this.axios
        .get(`/api/v1/auth/states`)
        .then((response) => {
          this.states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchLga() {
      this.axios
        .get(`/api/v1/auth/lga/2669`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getMDAs() {
      this.axios
        .get(`/api/v1/auth/ministry`)
        .then((response) => {
          this.mdas = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    registerUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/auth/registerProvider", {
          agency_id: this.user.institutional_id,

          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          middlename: this.register.middlename,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          provider_id: this.register.provider_id,
          // state: 'this.state.name',
          state: "2669",
          role: 0,
          password: "jacobi",
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          address1: this.register.address,
          genotype: this.register.genotype,
          weight: this.register.weight,
          gender: this.register.gender,
          sector: this.register.sector,
          place_of_work: this.register.place_of_work,
          point_of_care: this.register.point_of_care,
          finger_print: this.register.finger_print,
          salary_number: this.register.salary_number,
          grade_level: this.register.grade_level,
          date_of_entry: this.register.date_of_entry,
          marital_status: this.register.marital_status,
          category_of_vulnerable_group: this.register
            .category_of_vulnerable_group,
          enrolled_by: this.user.id,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.getClients();
          this.$breadstick.notify("Client added successfully", {
            position: "top-right",
          });
          let user_id = response.data.data.id;
          this.$router.push(`/client/${user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.getClients();
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
    },
    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/providerAgency/${this.user.institutional_id}`)
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
    this.fetchLga();
    this.getClients();
    this.getMDAs();
    this.getProviders();
  },
};
</script>
