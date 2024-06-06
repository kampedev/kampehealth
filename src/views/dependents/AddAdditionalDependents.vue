<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <div class="bg-dark m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10"></div>
            <strong> Manage Addtional Dependents </strong>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row list">
          <div class="col-lg-12 col-md-8">
            <div class="card m-b-30" v-if="dependents.length <= 4">
              <div class="card-header text-center">
                <strong>Add Dependent</strong>
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">Relationship Type</label>

                    <select
                      class="form-control"
                      v-model="dependent.relationShipType"
                    >
                      <option id="Spouse">Spouse</option>
                      <option id="Child">Child</option>
                      <option id="Others">Others</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputCity">Gender</label>

                    <select class="form-control" v-model="dependent.gender">
                      <option id="Male">Male</option>
                      <option id="Female">Female</option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Surname</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Last Name"
                      v-model="dependent.lastname"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="First Name"
                      v-model="dependent.firstname"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Middle Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Middle Name"
                      v-model="dependent.middlename"
                    />
                  </div>

                  <!-- <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Institution Attending</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  placeholder="Institution Attending" v-model="dependent.institution_attending" >
                                                             </div> -->
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">Date of Birth</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="YYYY/MM/DD"
                      v-model="dependent.dob"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Mobile No"
                      v-model="dependent.phone_number"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <!-- <div class="form-group col-md-4">
                                                           <label for="inputCity">LGA</label>
                                                             <select class="form-control"  v-model="dependent.lga">
                                                               <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                                            </select>
                                                         </div>


                                                         <div class="form-group col-md-4">
                                                           <label for="inputCity">Health Provider</label>
                                                               <select class="form-control"  v-model="dependent.provider">
                                                                <option  v-for="provider in providers" v-bind:key="provider.id" :value="provider.id"> {{provider.agency_name}}</option>
                                                            </select>
                                                         </div>-->
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-primary btn-block btn-lg"
                    @click="addDependant"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-10 m-b-30">
          <h5>
            <i class="fe fe-activity"></i>{{ dependents.length }} Dependents
          </h5>
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <!-- <th>Avatar</th> -->
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Relationship</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dependent in dependents" v-bind:key="dependent.id">
                  <!-- <td>
                                   <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                       class="avatar-img avatar-sm rounded-circle"
                                                                       alt=""></div>
                               </td> -->
                  <td>
                    <router-link :to="{ path: '/provider-' + dependent.id }">
                      {{ dependent.full_name }}
                    </router-link>
                  </td>
                  <td>{{ dependent.phone_number }}</td>
                  <td>{{ dependent.gender }}</td>
                  <td>{{ dependent.relationShipType }}</td>
                </tr>
              </tbody>
            </table>
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
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
// import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      dependents: "",
      client: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      states: "",
      providers: "",
      state: "",
      lga_states: "",
      dependent: {
        firstname: "",
        lastname: "",
        middlename: "",
        institution_attending: "",
        email: "",
        phone_number: "",
        relationShipType: "",
        gender: "",
        lga: "",
        dob: "",
        provider: "",
      },
    };
  },
  beforeMount() {},
  methods: {
    getDependents() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/allDependantUser/${this.$route.params.id}`)
        .then((response) => {
          this.dependents = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchLga() {
      this.axios
        .get(`/api/v1/auth/lga/2683`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/4`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addDependant() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.client);
      if (this.edit === false) {
        // Add dependent
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addDependant", {
            firstname: this.dependent.firstname,
            lastname: this.dependent.lastname,
            middlename: this.dependent.middlename,
            institution_attending: this.dependent.institution_attending,
            relationShipType: this.dependent.relationShipType,
            user_id: this.$route.params.id,
            email: this.dependent.email,
            phone_number: this.dependent.phone_number,
            gender: this.dependent.gender,
            state: 2683,
            lga: this.client.lga,
            dob: this.dependent.dob,
            provider: this.client.provider_id,
          })

          .then((response) => {
            console.log(response);
            this.clearIt();
            this.getDependents();
            this.isLoading = false;
            this.$toasted.info("Dependent added Successfully", {
              position: "top-center",
              duration: 3000,
            });

            // this.$router.push('/my-dependents/'+ this.$route.params.id)
          })
          .catch((error) => {
            this.isLoading = false;

            console.log(error.response);
          });
      } else {
        // Update
        this.isLoading = true;
        this.axios
          .put("/api/v1/auth/addDependant", {
            topic_id: this.topic.id,
            topic_name: this.topic.topic_name,
            // module_id: this.course.id,
            module_id: this.$route.params.id,
            topic_content: this.topic.topic_content,
            video: this.topic.video,
            audio: this.audio,
            doc: this.doc,
          })

          .then((response) => {
            console.log(response);
            this.clearIt();
            this.fetchModule();
            this.edit = true;
            this.isLoading = false;
            this.$toasted.global.crudUpdated().goAway(1500);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },

    clearIt() {
      this.dependent.firstname = "";
      this.dependent.lastname = "";
      this.dependent.email = "";
      this.dependent.phone_number = "";
      this.dependent.relationShipType = "";
      this.dependent.gender = "";
      this.dependent.middlename = "";
      this.dependent.institution_attending = "";
      this.dependent.dob = "";
      this.dependent.lga = "";
      this.dependent.provider = "";
    },
    singleClient() {
      this.axios
        .get(`/api/v1/auth/user/${this.$route.params.id}`)
        .then((response) => {
          this.client = response.data.user;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getDependents();
    this.fetchLga();
    this.fetchProviders();
    this.singleClient();
  },
};
</script>
