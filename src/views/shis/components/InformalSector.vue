<template>
  <div>
    <main>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-info">
                <div class="card-body text-black">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <router-link :to="{ path: '/view-clients-agency' }">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-users"></i>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Total Informal Enrollees</p>
                    <h1 class="fw-400">
                      {{ informaldata.enrollees | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-default">
                <div class="card-body text-black">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <router-link :to="{ path: '/view-clients-agency' }">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-users"></i>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Basic Healthcare Provision Fund</p>
                    <h1 class="fw-400">
                      {{ informaldata.bhcpf | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-dark">
                <div class="card-body text-white">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <router-link :to="{ path: '/view-clients-agency' }">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-users"></i>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div>
                    <p class="h4">State Equity Program</p>
                    <h1 class="fw-400">
                      {{ informaldata.sep | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-secondary">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <router-link :to="{ path: '/plans' }">
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
                    <p class="h4">Voluntary Contributor</p>
                    <h1 class="fw-400">
                      {{ informaldata.voluntary | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-primary">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <router-link :to="{ path: '/plans' }">
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
                    <p class="h4 text-white">Dependents</p>
                    <h1 class="fw-400 text-white">
                      {{ informaldata.dependants | numeral(0, 0) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-light bg-gradient">
                <div class="card-body text-black">
                  <div class="pb-2">
                    <router-link :to="{ path: '/my-providers' }">
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
                    <p class="h4">Health Facilities</p>
                    <h1 class="fw-400">{{ informaldata.providers }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-success">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <!-- <router-link :to="{ path: '/my-tpas' }"> -->
                      <div class="avatar avatar-lg">
                        <div class="avatar-title bg-soft-dark rounded-circle">
                          <i class="fe fe-briefcase"></i>
                        </div>
                      </div>
                    <!-- </router-link> -->
                  </div>
                  <div>
                    <p class="h4">State Pensioners Plan</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-white">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <router-link :to="{ path: '/list-records' }">
                      <div class="avatar avatar-lg">
                        <div
                          class="avatar-title bg-soft-primary rounded-circle"
                        >
                          <i class="fe fe-file-plus"></i>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div>
                    <p class="h4">Encounters</p>
                    <h1 class="fw-400">{{ informaldata.encounters }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container col-md-12 mb-5">
            <div class="row">
              <router-link to="export-date">
                <button class="btn btn-outline-info mr-2">
                  Filter Enrollee Date
                </button>
              </router-link>

              <router-link to="export-provider">
                <button class="btn btn-outline-dark">
                  Filter Enrollee Provider
                </button>
              </router-link>
            </div>
          </div>

          <div>
            <InformalLga />
          </div>

          <div class="row">
            <div class="col-md-12 p-t-20">
              <h5 class="h5">
                <i class="fe fe-activity"></i>Gender Distribution by LGA
              </h5>
            </div>

            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <GenderbyLGA :sectors="sectors" />
                </div>
              </div>
            </div>
          </div>

          <h5 class="h5">
            <i class="fe fe-activity"></i> Category of Basic Health Care
            Provision Fund Data
          </h5>
          <div class="row">
            <div class="col-md-6">
              <BasicCategory />
            </div>
            <div class="col-md-6">
              <genderCategory />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import InformalLga from "./informallga";
import GenderbyLGA from "./GenderbyLGA";
import BasicCategory from "./basicCategory";
import genderCategory from "./genderCategory";

export default {
  components: {
    genderCategory,
    InformalLga,
    GenderbyLGA,
    BasicCategory,
  },

  data() {
    return {
      user: null,
      mydata: "",
      informaldata: "",
      auth_user: "",
      providers: "",
      clients: "",
      total_clients: "",
      claims: "",
      claim_status: "",
      offlineclients: [],
      sectors: [
        {
          name: "Basic Healthcare Provision Fund",
        },
        {
          name: "State Equity Program",
        },
        {
          name: "Voluntary Contributor",
        },
      ],
      employees: "",
      plans: "",
      tpas: "",
    };
  },
  beforeMount() {
    this.axios
      .get("/api/v1/auth/getinformalsectorenrollees/95930")
      .then((response) => {
        this.informaldata = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {},

  methods: {
    getClaims() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/claims/95930`, {
          params: {
            claim_status: "All",
          },
        })
        .then((response) => {
          this.claims = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {},
};
</script>
<style lang="css" scoped>
</style>
