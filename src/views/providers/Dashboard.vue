<template>
  <div class="sidebar-pinned">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->

      <section class="admin-content">
        <div class="container">
          <div class="row">
            <div class="col-12 m-b-20">
              <p class="h4 spacer-top">{{ auth_user.agency_name }}</p>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/view-clients-provider' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-success rounded-circle"
                        >
                          <i class="mdi mdi-account-group"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Total Enrollees</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.enrollees | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-account-multiple"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Principal</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.principal | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-account-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Dependents</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.dependants | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <router-link :to="{ path: '/list-records' }">

                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-medical-bag"></i>
                      </div>
                      </router-link>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Encounters</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.encounters | numeral("0,0") }}
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
                          class="avatar-title bg-soft-success rounded-circle"
                        >
                          <i class="fe fe-credit-card"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Claims</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.claims | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-bank-transfer-out"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      Out-going Referrals
                    </p>
                    <h1 class="fw-400">
                      {{ dashboarddata.outgoing_referrals | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/all-referrals' }">

                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-bank-transfer-in"></i>
                      </div>
                    </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      In-coming Referrals
                    </p>
                    <h1 class="fw-400">
                      {{ dashboarddata.incoming_referrals | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-success rounded-circle">
                        <i class="mdi mdi-account-tie"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Employees</p>
                    <h1 class="fw-400">
                      {{ dashboarddata.employees | numeral("0,0") }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 p-t-20">
              <h1 class="fw-300">Analytics</h1>
            </div>
            <div class="col-12 m-t-20">
              <h5><i class="fe fe-activity"></i> Overview</h5>
            </div>
            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <ProviderEncountersbyDate />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i> Clients</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>OHIS Number</th>
                                <th>Phone Number</th>
                                <th>Plan</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="client in clients" v-bind:key="client.id">

                                <td>{{client.firstname}} {{client.lastname}} {{client.middlename}}</td>
                                <td>{{client.id_card_number}}</td>
                                <td>{{client.phone_number}}</td>
                                <td>{{client.sector}}</td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div> -->

            <div class="col-md-12 m-b-30">
              <h5><i class="fe fe-alert-circle"></i> Claims</h5>
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Diagnosis</th>
                      <th>Seen date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="claim in claims" v-bind:key="claim.id">
                      <td>
                        {{ claim.patient.firstname }}
                        {{ claim.patient.lastname }}
                      </td>
                      <td>{{ claim.diagnosis.name }}</td>
                      <td>{{ claim.seen_date }}</td>
                      <td>
                        <span v-if="claim.status == 1">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                          >
                            approved
                          </button>
                        </span>
                        <span v-if="claim.status != 1">
                          <button
                            type="button"
                            class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                          >
                            pending
                          </button>
                        </span>
                      </td>
                      <td>
                        <router-link :to="`/claim/${claim.id}`">
                          <button class="btn btn-outline-success">
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
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import ProviderEncountersbyDate from "@/views/providers/ProviderEncountersbyDate.vue";

export default {
  components: {
    Navbar,
    ProviderEncountersbyDate,
  },
  data() {
    return {
      user: null,
      auth_user: "",
      agencies: "",
      claims: "",
      clients: "",
      employees: "",
      dashboarddata: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/user`)
      .then((response) => {
        this.auth_user = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getData() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/provider-dashboard-data/${this.user.type == 'provider' ? this.user.id : this.user.institutional_id}`)
        .then((response) => {
          this.dashboarddata = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getProviderToUser/${this.user.type == 'provider' ? this.user.id : this.user.institutional_id}`)
        .then((response) => {
          this.clients = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getClaims() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/claminByProvider${this.user.type == 'provider' ? this.user.id : this.user.institutional_id}`)
        .then((response) => {
          this.claims = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getData();
    this.getClaims();
    this.getClients();
  },
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
