<template>
  <div class="sidebar-pinned">
    <header class="admin-header">
      <a
        href="#"
        class="sidebar-toggle"
        data-toggleclass="sidebar-open"
        data-target="body"
      >
      </a>

      <nav class="mr-auto my-auto">
        <ul class="nav align-items-center">
          <!-- <li class="nav-item">
                <a class="nav-link  " data-target="#siteSearchModal" data-toggle="modal" href="#">
                    <i class=" mdi mdi-magnify mdi-24px align-middle"></i>
                </a>
            </li> -->

          <li class="nav-item">
            <SearchUser />
          </li>
        </ul>
      </nav>
      <nav class="ml-auto">
        <ul class="nav align-items-center">
          <NotificationsHeader />

       
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="avatar avatar-sm avatar-online">
                <!-- <span class="avatar-title rounded-circle bg-dark">V</span> -->
                <vue-initials-img
                  :name="auth_user.firstname + ' ' + auth_user.lastname"
                  class="text-center rounded-circle"
                  v-if="auth_user.user_image == null"
                />

                <div class="" v-if="auth_user.user_image != null">
                  <label class="avatar-input">
                    <span class="avatar avatar-sm">
                      <img
                        :src="`https://api.hayokinsurance.com/image/${auth_user.user_image}`"
                        class="avatar-img rounded-circle"
                      />
                      <span class="avatar-input-icon rounded-circle">
                        <i class="mdi mdi-upload mdi-24px"></i>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                href="/user-settings"
                v-if="auth_user.user_role != 'client'"
              >
                Settings
              </a>
              <a class="dropdown-item" href="#"> Help </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/" @click="logOut"> Logout</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <!--site header ends -->

    <!--modal  for search begin here-->
    <div
      class="modal modal-slide-left fade"
      id="siteSearchModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="siteSearchModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body p-all-0" id="site-search">
            <button
              type="button"
              class="close light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="form-dark bg-dark text-white p-t-60 p-b-20 bg-dots">
              <h3 class="text-uppercase text-center fw-300">Search</h3>

              <div class="container-fluid">
                <div class="col-md-10 p-t-10 m-auto">
                  <input
                    type="search"
                    placeholder="Search Something"
                    class="search form-control form-control-lg"
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div
                class="bg-dark text-muted container-fluid p-b-10 text-center text-overline"
              >
                results
              </div>
              <div class="list-group list">
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        src="assets/img/users/user-3.jpg"
                        alt="user-image"
                      />
                    </div>
                  </div>
                  <div class="">
                    <div class="name">Eric Chen</div>
                    <div class="text-muted">Developer</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        src="assets/img/users/user-4.jpg"
                        alt="user-image"
                      />
                    </div>
                  </div>
                  <div class="">
                    <div class="name">Sean Valdez</div>
                    <div class="text-muted">Marketing</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        src="assets/img/users/user-8.jpg"
                        alt="user-image"
                      />
                    </div>
                  </div>
                  <div class="">
                    <div class="name">Marie Arnold</div>
                    <div class="text-muted">Developer</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <div class="avatar-title bg-dark rounded">
                        <i class="mdi mdi-24px mdi-file-pdf"></i>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="name">SRS Document</div>
                    <div class="text-muted">25.5 Mb</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <div class="avatar-title bg-dark rounded">
                        <i class="mdi mdi-24px mdi-file-document-box"></i>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="name">Design Guide.pdf</div>
                    <div class="text-muted">9 Mb</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <div class="avatar avatar-sm">
                        <div class="avatar-title bg-primary rounded">
                          <i class="mdi mdi-24px mdi-code-braces"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="name">response.json</div>
                    <div class="text-muted">15 Kb</div>
                  </div>
                </div>
                <div class="list-group-item d-flex align-items-center">
                  <div class="m-r-20">
                    <div class="avatar avatar-sm">
                      <div class="avatar avatar-sm">
                        <div class="avatar-title bg-info rounded">
                          <i class="mdi mdi-24px mdi-file-excel"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="name">June Accounts.xls</div>
                    <div class="text-muted">6 Mb</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchUser from "@/views/shis/components/SearchUser.vue";
import NotificationsHeader from "@/views/NotificationsHeader.vue";

export default {
  components: {
    SearchUser,
    NotificationsHeader,
  },
  data() {
    return {
      auth_user: null,
      fullscreen: false,
      teleport: true,
      pageOnly: false,
    };
  },
  beforeMount() {
    this.  auth_user = JSON.parse(localStorage.getItem("user"));

    // this.axios
    //   .get(`/api/v1/auth/user`)
    //   .then((response) => {
    //     this.auth_user = response.data;
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  },
  methods: {
    logOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
   
  },
  created() {},
};
</script>
