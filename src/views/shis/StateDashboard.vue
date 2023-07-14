<template>
  <div class="sidebar-pinned">
    <Navbar />

    <main class="admin-main">
      <!--site header begins-->
      <section class="admin-content">
        <div class="container">
         

          <div class="col-md-12 my-8">
            <button
              type="button"
              :class="buttoncolor.formal"
              @click="showFormal"
            >
              Formal <i class="fe fe-list"></i>
            </button>
            <button
              type="button"
              :class="buttoncolor.informal"
              @click="showInformal"
            >
              Informal <i class="fe fe-grid"></i>
            </button>
          </div>

          <div class="" v-show="formal_S">
            <FormalSector />
          </div>

          <div class="" v-show="informal_S">
            <InformalSector />
          </div>

          <div class="col-md-12" style="margin-top: 20px">
            <EncounterbyLGA />
          </div>

          <div class="row" style="margin-top: 20px">
            <div class="col-md-12">
              <ClaimsDate />
            </div>

            <div class="col-md-12">
              <EncountersbyDate />
            </div>
            <div class="col-md-4">
              <ClaimsCategory />
            </div>
            <div class="col-md-4">
              <ReferralCategory />
            </div>
            <div class="col-md-4">
              <ChangeProviderCategory />
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-md-12 m-b-30">
              <h5><i class="fe fe-users"></i>Recent Beneficiaries</h5>
              <div class="table table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Sector</th>
                      <th>O'HIS Number</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="client in clients" v-bind:key="client.id">
                      <td>{{ client.lastname }} {{ client.firstname }}</td>
                      <td>{{ client.phone_number }}</td>
                      <td>{{ client.sector }}</td>
                      <td>{{ client.id_card_number }}</td>
                      <td>
                        <p>
                          <span v-if="client.status == 'active'">
                            <button
                              type="button"
                              class="
                                btn
                                m-b-15
                                ml-2
                                mr-2
                                badge badge-soft-success
                              "
                            >
                              active
                            </button>
                          </span>
                          <span v-if="client.status == 'inactive'">
                            <button
                              type="button"
                              class="
                                btn
                                m-b-15
                                ml-2
                                mr-2
                                badge badge-soft-warning
                              "
                            >
                              inactive
                            </button>
                          </span>
                        </p>
                      </td>
                      <td>
                        <router-link :to="{ path: '/client/' + client.id }">
                          <button
                            type="button"
                            name="button"
                            class="btn btn-outline-success"
                            style="margin-left: 10px; margin-top: 10px"
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
          </div> -->
          <ClientDataDashboard />
        </div>
        <Footer />
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import Footer from "@/views/Footer.vue";
import InformalSector from "@/views/shis/components/InformalSector.vue";
import FormalSector from "@/views/shis/components/FormalSector.vue";
import ClaimsDate from "@/views/shis/components/ClaimsbyDate";
import EncounterbyLGA from "@/views/shis/components/EncounterbyLGA";
import EncountersbyDate from "@/views/shis/components/EncountersbyDate";
import ClaimsCategory from "@/views/shis/components/ClaimStatusChart";
import ReferralCategory from "@/views/shis/components/ReferralStatusChart";
import ChangeProviderCategory from "@/views/shis/components/ChangeProviderStatusChart";

export default {
  components: {
    Navbar,
    InformalSector,
    FormalSector,
    Footer,
    ClaimsDate,
    ClaimsCategory,
    ReferralCategory,
    ChangeProviderCategory,
    EncountersbyDate,
    EncounterbyLGA,
  },

  data() {
    return {
      user: null,
      formal_S: false,
      informal_S: true,
      mydata: "",
      auth_user: "",
      providers: "",
      trial_date: "2/2/2023",
      total_clients: "",
      claims: "",
      offlineclients: [],
      employees: "",
      plans: "",
      tpas: "",
      buttoncolor: {
        informal: "btn btn-success",
        formal: "btn btn-default",
      },
    };
  },
  beforeMount() {},
  computed: {
    //
  },

  methods: {
    showFormal() {
      this.formal_S = true;
      this.informal_S = false;
      this.buttoncolor.formal = "btn btn-success";
      this.buttoncolor.informal = "btn btn-default";
    },
    showInformal() {
      this.formal_S = false;
      this.informal_S = true;
      this.buttoncolor.informal = "btn btn-success";
      this.buttoncolor.formal = "btn btn-default";
    },
  },
  created() {},
};
</script>
<style lang="css" scoped>
.spacer-top {
  margin-top: 10px;
}
</style>
