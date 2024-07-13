<template>
  <div class="sidebar-pinned ">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->

      <section class="admin-content">
        <div class="container">
          <div class="row" style="margin-top:30px;">
            <div class="col-12 m-b-20">
              <h5 class="h5">{{ orgDetails.organization_name }}</h5>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/view-clients-tpa' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-users"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Enrollees</p>
                    <h1 class="fw-400" v-if="clients != ''">
                      {{ clients.meta.total | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/add-officers' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-briefcase"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      Staffs
                    </p>
                    <h1 class="fw-400" v-if="employees != ''">
                      {{ employees.meta.total }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/all-claims' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="mdi mdi-view-day"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Claims</p>
                    <h1 class="fw-400" >
                      {{ claims.data.length }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

             <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/authorization-code' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-anchor"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Authorization Code</p>
                    <h1 class="fw-400" >
                      {{ codes.length }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" style="margin-top:20px;">
              <TPAEnrollees/>
          </div>
         <div class="row" style="margin-top:20px;">
             <div class="col-md-6">
            <ClaimStatusChart/>
          </div>

           <div class="col-md-6">
            <ReferralStatusChart/>
          </div>
         </div>

          <div class="row" style="margin-top:20px;">
            <div class="col-md-10 m-b-30">
              <h5 class="h5"><i class="fe fe-users"></i>Employees</h5>
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <!-- <th>Picture</th> -->
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <!-- <th>Beneficiaries Enrolled</th> -->
                      <!-- <th>Action</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="client in employees.data" v-bind:key="client.id">
                      <!-- <td>
                                <div class="avatar avatar-sm " v-if="client.agent.user_image != null ">
                                  <img :src="`https://insurance-api.hayokmedicare.ng/image/${client.agent.user_image}`"
                                    class="avatar-img avatar-sm rounded-circle"
                                            alt=""></div>
                            </td> -->
                      <td>{{ client.full_name }} </td>
                      <td>{{ client.phone_number }}</td>
                      <td>{{ client.email }}</td>
                      <!-- <td> {{client.enrolleduserby_count}} Enrollees</td> -->
                      <!-- <td>
                                  <button type="button" @click="deleteAgent(client)" class="btn btn-danger">delete  <i class="fe fe-delete"></i></button>
                              </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import Footer from "@/views/Footer.vue";
import TPAEnrollees from "./components/TPAEnrollees.vue";
import ClaimStatusChart from "./components/ClaimStatusChart.vue";
import ReferralStatusChart from "./components/ReferralStatusChart.vue";

export default {
  components: {
    Navbar,
    Footer, TPAEnrollees, ClaimStatusChart, ReferralStatusChart
  },

  data() {
    return {
      auth_user: "",
      clients: "",
      officers: "",
      orgDetails: "",
      codes: "",
      employees: "",
      claims: "",
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
      .then((response) => {
        this.orgDetails = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getOrgDetails() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
        .then((response) => {
          this.orgDetails = response.data;
          let org_id = response.data.id;

          // get clients
          this.axios
            .get(`/api/v1/auth/org_client/${org_id}`)
            .then((response) => {
              this.clients = response.data;
              console.log(response);
              // this.getEmployees()
            })
            .catch((error) => {
              console.error(error);
            });
          //end of get ss

          // get employees
          this.axios
            .get(`/api/v1/auth/enrollment_user/${org_id}`)
            .then((response) => {
              this.employees = response.data;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          // end of employees

          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getEmployees() {
      // get employees
      this.axios
        .get(`/api/v1/auth/enrollment_user/${this.orgDetails.id}`)
        .then((response) => {
          this.employees = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      //end of employees
    },
    getClaims() {
      this.isLoading = true;
        this.axios
          .get(`/api/v1/auth/claim-org`, {
            params: {
              claim_status: 'All',
              claim_unique_id: this.claim_unique_id,
              authorization_code: this.authorization_code,
              id_card_number: this.id_card_number,
              provider_id: this.provider_id,
              date: this.date,
              from: this.from,
              to: this.addOneDay,
            },
          })
          .then((response) => {
            this.claims = response.data;
            console.log(response);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
          });
    },

     getCodesTpa() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/authorization_code-tpa`)
        .then((response) => {
          this.codes = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteAgent(client) {
      if (confirm("Are you sure you want to delete?")) {
        this.axios
          .delete(`/api/v1/auth/enrollment_user/${client.id}`)
          .then((response) => {
            console.log(response);
            this.$toasted.info("Deleted Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
            this.$toasted.error("Error!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
  },
  created() {
    this.getOrgDetails();
    this.getClaims();
    this.getCodesTpa();
  },
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
