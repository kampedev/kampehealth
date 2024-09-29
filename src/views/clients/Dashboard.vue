<template>
  <div class="sidebar-pinned">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->

      <section class="admin-content">
        <div class="container">
          <div class="row">
            <div class="col-12 m-b-20">
              <h5 class="spacer-top">Hello, {{ auth_user.user.full_name }}</h5>
            </div>

            <div class="row col-md-12" v-if="transactions.length < 1">
              <div class="col-md-6">
                <div
                  class="alert alert-border-warning alert-dismissible fade show"
                  role="alert"
                >
                  <div class="d-flex">
                    <div class="icon">
                      <i class="icon mdi mdi-alert-circle-outline"></i>
                    </div>
                    <div class="content">
                      <strong>No active Plan</strong>
                      <router-link :to="{ path: '/subscribe' }">
                        click to subscribe to a plan
                      </router-link>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '#' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-activity"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">My Provider</p>
                    <h1 class="fw-400">
                      {{ auth_user.provider.agency_name }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '#' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-credit-card"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">Plan</p>
                    <h1 class="fw-400">
                      {{ auth_user.user.sector }}
                    </h1>
                    <p v-if="transactions.length < 1">No active Subscription</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="pb-2">
                    <router-link :to="{ path: '/add-complaint' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-message-square"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="text-muted text-overline m-0">
                      Complaints/Inquiries
                    </p>
                    <h1 class="fw-400">{{ 0 }}</h1>
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

            <div class="col-md-12 m-b-30">
              <div class="card">
                <div class="card-header">
                  <h5><i class="fe fe-message-circle"></i> Ticket</h5>
                </div>

                <div class="table-responsive">
                  <table class="table align-td-middle table-card">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="complaint in complaints"
                        v-bind:key="complaint.id"
                      >
                        <td>#{{ complaint.id }}</td>
                        <td>{{ complaint.title }}</td>
                        <td>{{ complaint.type }}</td>
                        <td>
                          <span
                            class="btn ml-2 mr-2 badge badge-soft-warning"
                            >{{ complaint.status }}</span
                          >
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
      myplan: "",
      wallet: "",
      complaints: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/user/zam/${this.user.id}`)
      .then((response) => {
        this.auth_user = response.data;
        this.transactions = response.data.transactions;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
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
  },
  created() {
    this.getComplaints();
    this.getPlan();
    this.getWallet();
  },
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
