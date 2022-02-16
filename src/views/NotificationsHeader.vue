<template>
  <li class="nav-item">
    <div class="dropdown">
      <a
        href="#"
        class="nav-link"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="mdi mdi-24px mdi-bell-outline"></i>
        <span class="notification-counter" v-if="result.total != 0"></span>
        <span class="text-danger">{{result.total}}</span>
      </a>

      <div class="dropdown-menu notification-container dropdown-menu-right">
        <div
          class="d-flex p-all-15 bg-white justify-content-between border-bottom"
        >
          <a href="#!" class="mdi mdi-18px mdi-settings text-muted"></a>
          <span class="h5 m-0">Notifications</span>
          <a
            href="#!"
            class="mdi mdi-18px mdi-notification-clear-all text-muted"
          ></a>
        </div>
        <div class="notification-events bg-gray-300">
          <div class="text-overline m-b-5">today</div>

          <div v-if="result.total != 0">
            
            <a href="/all-claims" class="d-block m-b-10"
               
            >
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-circle text-warning"></i
                  >{{ result.pending_claims }} Claim(s) still pending 
                </div>
              </div>
            </a>

             <a href="/all-claims" class="d-block m-b-10" 
             v-if="user.type == 'shis' || user.type == 'employee'"
             >
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-circle text-warning"></i
                  > {{ result.verified_awaiting_approval }} vetted Claim(s) awaiting approval
                </div>
              </div>
            </a>

             <a href="/all-referrals" class="d-block m-b-10" v-if="user.type == 'shis' || user.type == 'employee'">
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-circle text-warning"></i
                  >{{ result.pending_referrals }} pending referral(s)
                </div>
              </div>
            </a>

            <a href="/all-claims" class="d-block m-b-10" 
            v-if="user.type == 'provider_employee' || user.type == 'provider' || user.type == 'tpa'
            || user == 'tpa_employee'  "> 
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-circle text-danger"></i> 
                 {{result.rejected_claims}} Claim(s) have been rejected.
                 
                </div>
              </div>
            </a>
            
            <a href="/all-referrals" class="d-block m-b-10"
            v-if="user.type == 'tpa' || user.type == 'tpa_employee' "
            >
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-cancel text-warning"></i> 
                  {{result.pending_referrals}} pending Referral(s) need your attention
                </div>
              </div>
            </a>


             <a href="/all-referrals" class="d-block m-b-10" v-if="user.type == 'provider_employee' || user.type == 'provider'">
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-cancel text-success"></i> 
                 {{result.incoming_referrals_approved}} incoming Referral(s) have been approved
                </div>
              </div>
            </a>

          </div>
          <div v-else >
                 <a href="#" class="d-block m-b-10">
              <div class="card">
                <div class="card-body">
                  <i class="mdi mdi-upload-multiple"></i> 
                You have no pending tasks
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      result: "",
      user:null
    };
  },
  beforeMount(){
       this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getNOtificationsData() {
      this.axios
        .post(`/api/v1/auth/getdashboardnotifications`, {
          agency_id: 95930,
        })
        .then((response) => {
          this.result = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getNOtificationsData();
  },
};
</script>