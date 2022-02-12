<template>
  <section class="admin-content">

    <Navbar/>

    <main class="admin-main" style="margin-top:20px;" >
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 ">
            <div class="row">

               <div class="col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="row p-t-20 p-b-20">
                    <div class="my-auto col-md-7">
                      <p class="h3">{{user.firstname}} {{user.lastname}} </p>
                      <p class="m-0 text-muted">
                        {{user.email}}, {{user.phone_number}}
                        <span class="text-success">
                          <i class="mdi mdi-user-multiple"></i>
                        </span>
                      </p>
                    </div>
                    <div class="my-auto text-md-right col-md-5">
                      <a
                        href="#"
                        class="btn btn-rounded-circle btn-lg btn-success"
                      >
                        <i class="fe fe-user"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           

            <div class="col-md-6" v-if="user.type == 'employee'" >
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="row p-t-20 p-b-20">
                    <div class="my-auto col-md-7">
                      <p class="h3">Add Enrollee</p>
                      <p class="m-0 text-muted">
                        enroll beneficiaries
                        <span class="text-success">
                          <i class="mdi mdi-user-plus"></i>
                        </span>
                      </p>
                    </div>
                    <div class="my-auto text-md-right col-md-5">
                      <a
                        href="/add-client-offline"
                        class="btn btn-rounded-circle btn-lg btn-success"
                      >
                        <i class="mdi mdi-account-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             <div class="col-md-6" v-if="user.type == 'provider_employee'">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="row p-t-20 p-b-20">
                    <div class="my-auto col-md-7">
                      <p class="h3">Add Encounter Offline</p>
                      <p class="m-0 text-muted">
                        add encounter information
                        <span class="text-success">
                          <i class="mdi mdi-user-multiple"></i>
                        </span>
                      </p>
                    </div>
                    <div class="my-auto text-md-right col-md-5">
                      <a
                        href="/add-record-offline"
                        class="btn btn-rounded-circle btn-lg btn-success"
                      >
                        <i class="mdi mdi-medical-bag"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
            
            <div class="col-md-12" v-if="user.type == 'provider_employee'">
                    <MyRecordsOffline/>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </section>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
import Navbar from "@/views/Navbar.vue";
  import MyRecordsOffline from '@/views/ehr/MyRecordsOffline.vue'

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Loading, MyRecordsOffline, Navbar
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      auth_user: "",
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    //
  },
  created() {
    //
  },
};
</script>
<style scoped>
.spacer-top {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
