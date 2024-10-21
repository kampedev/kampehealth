<template>
  <div class="sidebar-pinned">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->

      <section class="admin-content">
        <div class="container">
          <div class="row">
            <div class="col-12 m-b-20">
              <h5 class="spacer-top">Hello, {{ auth_user.user.firstname }}</h5>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '#' }">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="fe fe-activity"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">My Provider</p>
                    <h1 class="fw-400">
                      <span v-if="auth_user.provider">
                        {{ auth_user.provider.agency_name }}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '#' }">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="mdi mdi-credit-card"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      <i class="mdi mdi-currency-ngn"></i
                      >{{ auth_user.utilization_primary | numeral(0, 0.0) }}
                    </p>
                    <h1 class="fw-400">
                      {{ auth_user.user.sector }}
                    </h1>
                    <p v-if="transactions.length > 1">
                      Last payment:
                      {{
                        transactions[0].created_at
                          | moment("dddd, MMMM Do YYYY,  h:mm:ss a")
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/client-dashboard' }">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="fe fe-file-text"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Encounters</p>
                    <h1 class="fw-400">{{ encounters.length }}</h1>
                    <p class="text-sm">
                      Total Utilization:
                      <i class="icon mdi mdi-currency-ngn"></i
                      >{{
                        (auth_user.utilization_primary +
                          auth_user.utilization_secondary)
                          | numeral(0, 0)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/add-complaint' }">
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-info rounded-circle">
                          <i class="fe fe-message-square"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      Complaints/Inquiries
                    </p>
                    <h1 class="fw-400">{{ complaints.length }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h5>
                    <i class="fe fe-credit-card mr-3"></i>
                    {{ transactions.length }} Transactions
                  </h5>
                </div>

                <div class="card-body table-responsive">
                  <table class="table align-td-middle">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date Created</th>
                        <!-- <th>Action</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(trx, index) in transactions"
                        v-bind:key="trx.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ trx.type }}</td>
                        <td>&#8358;{{ trx.amount | numeral(0, 0.0) }}</td>

                        <td>{{ trx.description }}</td>
                        <td>
                          {{ trx.created_at | moment("dddd, MMMM Do YYYY") }}
                        </td>
                        <!-- <td>
                          <button class="btn btn-danger" name="button">
                            <i class="fe fe-delete"></i>
                          </button>
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-12 m-b-30 mt-4">
              <div class="card">
                <div class="card-header">
                  <h5><i class="fe fe-file-text"></i> Encounters</h5>
                </div>

                <div class="table-responsive">
                  <table class="table align-td-middle table-card">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Provider</th>
                        <th>Diagnosis</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ecc in encounters" v-bind:key="ecc.id">
                        <td>
                          <span v-if="ecc.healthrecord">
                            {{ ecc.healthrecord.encounter_id }}
                          </span>

                          <span v-if="ecc.is_confirmed == true">
                            <button
                              type="button"
                              class="btn  m-1 badge badge-soft-success"
                            >
                              confirmed
                            </button>
                          </span>

                          <span v-if="ecc.is_confirmed == false">
                            <button
                              type="button"
                              class="btn  m-1 badge badge-soft-danger"
                            >
                              rejected
                            </button>
                          </span>
                        </td>
                        <td>
                          <span v-if="ecc.provider">
                            {{ ecc.provider.agency_name }}
                          </span>
                        </td>
                        <td>
                          <span v-if="ecc.diagnosis">
                            {{ ecc.diagnosis.name }}
                          </span>
                        </td>
                        <td>
                          <button
                            v-if="ecc.is_confirmed == null"
                            @click="updateEncounterStatus(ecc, true)"
                            type="button"
                            class="btn btn-outline-success m-1"
                            name="button"
                          >
                            I received this treatment
                            <i class="fe fe-check"></i>
                          </button>

                          <button
                            v-if="ecc.is_confirmed == null"
                            @click="updateEncounterStatus(ecc, false)"
                            type="button"
                            class="btn btn-outline-danger m-1"
                            name="button"
                          >
                            I didnot receive this treatment
                            <i class="fe fe-x"></i>
                          </button>
                          <router-link :to="{ path: '/encounter/' + ecc.id }">
                            <button
                              type="button"
                              class="btn btn-info mr-1"
                              name="button"
                            >
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
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: null,
      auth_user: "",
      transactions: "",
      encounters: "",
      myplan: "",
      wallet: "",
      complaints: "",
    };
  },
  beforeMount() {},
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/user/zam/${this.user.id}`)
        .then((response) => {
          this.auth_user = response.data;
          this.transactions = response.data.transactions;
          this.encounters = response.data.encounters;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPlan() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/userSubscribedPlan`)
        .then((response) => {
          this.myplan = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getComplaints() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/complaints/${this.user.id}`)
        .then((response) => {
          this.complaints = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getWallet() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getUserWallet`)
        .then((response) => {
          this.wallet = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateEncounterStatus(ecc, status) {
      if (confirm("Are you Sure?")) {
        this.axios
          .post(`/api/v1/auth/updateEncounterStatus`, {
            id: ecc.id,
            is_confirmed: status,
          })
          .then((response) => {
            this.getUser();
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created() {
    this.getComplaints();
    this.getPlan();
    this.getWallet();
    this.getUser();
  },
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
