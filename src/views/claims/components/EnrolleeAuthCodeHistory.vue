<template>
    
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header">
                  <p class="h4">Authorization Code History</p>
                </div>

                <div class="card-body">
               
                  <div class="col-lg-8 m-b-30">
                    <div class="card">
                      <div class="card-header">
                        <div class="card-title">Timeline</div>

                        <!-- <div class="card-controls">
                          <select class="custom-select">
                            <option value="">Everything</option>
                            <option value="">Charges</option>
                            <option value="">Upgrades</option>
                          </select>
                        </div> -->
                      </div>
                      <div class="card-body">
                        <div class="timeline">
                          <div
                            class="timeline-item"
                            v-for="auth_code in referrals.data"
                            v-bind:key="auth_code.id"
                          >
                            <div class="timeline-wrapper">
                              <div class="">
                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'in-progress'"
                                >
                                  <div
                                    class="avatar-title bg-primary rounded-circle"
                                  >
                                    <i class="mdi mdi-magnet"></i>
                                  </div>
                                </div>
                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'rejected'"
                                >
                                  <div
                                    class="avatar-title bg-danger rounded-circle"
                                  >
                                    <i class="mdi mdi-alert-circle-outline"></i>
                                  </div>
                                </div>

                                 <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'pending'"
                                >
                                  <div
                                    class="avatar-title bg-warning rounded-circle"
                                  >
                                    <i class="fe fe-book-open"></i>
                                  </div>
                                </div>

                                <div
                                  class="avatar avatar-sm"
                                  v-if="auth_code.status == 'approved'"
                                >
                                  <div
                                    class="avatar-title bg-success rounded-circle"
                                  >
                                    <i class="mdi mdi-check-all"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto">
                                <h6 class="m-0">
                                  <router-link :to="`/authorization-code/${auth_code.id}`">
                                   {{auth_code.encounter.healthrecord.encounter_id}}
                                   </router-link>
                                   </h6>
                                <button
                                  v-if="auth_code.code_created != null"
                                  class="btn m-b-15 ml-2 mr-2 badge badge-soft-secondary spacer"
                                >
                                  {{auth_code.code_created}}
                                </button>
                              </div>
                              <div class="ml-auto col-auto text-muted">
                                {{auth_code.date_requested}}
                              </div>
                            </div>
                          </div>
                        
                         
                        

                          <div class="timeline-item">
                            <div class="timeline-wrapper">
                              <div class="">
                                <div class="avatar avatar-sm">
                                  <div
                                    class="avatar-title bg-success rounded-circle"
                                  >
                                    <i class="mdi mdi-account-circle"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto">
                                <h6 class="m-0">Enrolled on</h6>
                              </div>
                              <div class="ml-auto col-auto text-muted">
                               {{auth_code.patient.created_at}}
                              </div>
                            </div>
                          </div>
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
export default {
    data() {
        return{
            referrals: "",
        }
    },
    methods:{
        getReferralPatient() {
      this.isLoading = true;
      this.axios
        .get(`/api/v1/auth/referrals-patient/${this.$route.params.id}`)
        .then((response) => {
          console.log(response);
          this.referrals = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
        });
    },
    },
    created(){
        this.getReferralPatient()
    }
}
</script>