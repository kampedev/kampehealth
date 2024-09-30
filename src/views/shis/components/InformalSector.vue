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
                    <p class="h4">Total Enrollees</p>
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
                    <p class="h4">Kampe Basic</p>
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
                    <p class="h4">Kampe Plus</p>
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
                    <p class="h4">Kampe Senior Basic</p>
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
                    <p class="h4 text-white">Kampe Senior Plus</p>
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
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Basic Diaspora</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-info">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Plus Diaspora</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-secondary">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Superior Diaspora</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-success">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Senior Diaspora</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-white">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Ruby</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-success">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Gold</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-primary">
                <div class="card-body text-white">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Diamond</p>
                    <h1 class="fw-400">{{ informaldata.pensioners }}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-3">
              <div class="card m-b-30 bg-info">
                <div class="card-body text-dark">
                  <div class="pb-2">
                    <div class="avatar avatar-lg">
                      <div class="avatar-title bg-soft-dark rounded-circle">
                        <i class="fe fe-briefcase"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="h4">Kampe Travel Plan</p>
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

          <!-- <div class="row">
            <div class="col-md-12 p-t-20">
              <h5 class="h5">
                <i class="fe fe-activity"></i>Gender Distribution by State
              </h5>
            </div>

            <div class="col-md-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <GenderbyLGA :sectors="sectors" />
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import InformalLga from "./informallga";
// import GenderbyLGA from "./GenderbyLGA";

export default {
  components: {
    InformalLga,
    // GenderbyLGA,
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
          name: "Kampe Healthcare Plus",
        },
        {
          name: "Kampe Healthcare",
        },
        {
          name: "Senior Citizens Plus Plan",
        },
        {
          name: "Superior Plan",
        },
      ],
      employees: "",
      plans: "",
      tpas: "",
    };
  },
  beforeMount() {
    this.axios
      .get("/api/v1/auth/getinformalsectorenrollees/439078")
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
        .get(`/api/v1/auth/claims/439078`, {
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
