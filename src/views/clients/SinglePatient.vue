<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div>
        <div class="bg-success m-b-30">
          <div class="container">
            <div class="row p-b-60 p-t-60">

              <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                <p class="h1 text-dark">O'HIS PATIENT RECORD MANAGEMENT </p>

          

              </div>

            </div>
          </div>
        </div>
        <section class="pull-up">
          <div class="container">

            <div class="row list">
              <div class="col-lg-12 col-md-12">
                <div class="card m-b-30">
                  <div class="card-header">

                  </div>

                  <div class="card-body">
                    <div class="form-group">

                      <button class="btn btn-dark spacer">{{records.meta.total}}  Health Records<i class="fe fe-clipboard"></i> </button>
                      <button class="btn btn-dark spacer">{{referrals.meta.total}}  Referrals<i class="mdi mdi-bank-transfer"></i> </button>

                      <button class="btn btn-success spacer" @click="printMe">print <i class="fe fe-printer"></i></button>

                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8 col-md-12" id="printDiv" ref="printNow">
                <div class="card" style="background-image: url('../assets/img/ohis_transparent.png'); background-size: cover; background-repeat: no-repeat;">
                  <div class="card-header ">
                    <div class="row spacer-top">
                      <div class="col-md-2">
                        <span class="avatar avatar-xl">
                          <img src="/assets/img/ohis_logo.png" class=" rounded-circle">
                        </span>
                      </div>
                      <div class="col-md-10 ">



                      </div>
                    </div>

                  </div>

                  <div class="card-body row">

                    <div class="col-md-4">
                      <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`" class="img spacer-top" alt="User Photo"
                      onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                      >
                     
                    </div>

                    <div class="col-md-8">
                      <p class="h5 spacer-top-bottom"><strong class="text-primary">NAME :</strong> <strong>{{client.firstname }}</strong>, {{client.lastname}} {{client.middlename}}</p>
                      <hr>
                      <p class="h5 spacer-top-bottom"> <strong class="text-primary">ID NUMBER:</strong> <strong>{{client.id_card_number}}</strong></p>
                      <hr>

                      <p class="h5 spacer-top-bottom"> <strong class="text-primary"> FACILITY TO ACCESS CARE:</strong> <strong>{{healthFacility.agency_name}}</strong> </p>
                      <hr>
                      <p class="h5 spacer-top-bottom" v-if="client.place_of_work != null"> <strong class="text-primary">MDA:</strong> <strong> {{client.place_of_work}}</strong> </p>
                      <hr>
                      <p class="h5 spacer-top-bottom"> <strong class="text-primary">BLOOD GROUP:</strong> <strong> {{client.blood}}</strong> </p>
                      <hr>
                      <p class="h5 spacer-top-bottom"><strong class="text-primary">Expiry Date:</strong>  <strong>{{client.date_of_expiry}}</strong></p>
                                  <hr>
                      <p class="h5 spacer-top-bottom"> <strong class="text-primary">SECTOR:</strong> <strong> {{client.sector}}</strong> </p>
                      <hr>
                    </div>

                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-12">
                <div class="card m-b-30">
                  <div class="card-header">
                    <!-- <div class="form-group"> -->
                      <p class="h3">Other Details</p>
                    <!-- </div> -->
                  </div>

                  <div class="card-body">



                    <p class="spacer-top-bottom" >
                      <span v-if="singletpa != ''">
                            <strong>HMO:</strong> {{singletpa.organization_name}}
                      </span>
                      
                      </p>
                    <hr>

                    <p class="spacer-top-bottom"><strong>Gender:</strong> {{client.gender}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>Phone Number:</strong> {{client.phone_number}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>LGA/Ward:</strong> {{local_government.local_name}}/{{ward.ward_name}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>Date of Birth:</strong> {{client.dob | moment("D/M/YYYY") }}</p>
                    <hr>

                    <p class="spacer-top-bottom"><strong>Expiry Date:</strong> {{client.expiry_date}}</p>
                    <hr>

                     <p class="spacer-top-bottom"><strong>Date Enrolled:</strong> {{client.created_at | moment("D/M/YYYY") }}</p>
                    <hr>

                    <p class="spacer-top-bottom"><strong>Marital Status:</strong> {{client.marital_status }}</p>
                    <hr>
                    <p class="spacer-top-bottom" v-if="client.type == 'client' && client.category_of_vulnerable_group != null"><strong>Category of Vulnerable Group:</strong> {{client.category_of_vulnerable_group }}</p>

                  </div>
                </div>

              </div>

              <div class="col-lg-12 col-md-12" style="margin-top:20px;">
                <div class="card m-b-30">
                  <div class="card-header">
                    <!-- <div class="form-group"> -->
                      <p class="h3">Health Records</p>
                    <!-- </div> -->
                  </div>

                  <div class="card-body">

                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Encounter ID</th>
                                <th>Name</th>
                                <th>Healthcare Provider</th>
                                <th>Diagnosis</th>
                                <th>Action</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="record in records.data" v-bind:key="record.id">

                               <td>{{record.healthrecord.encounter_id}}</td>
                                <td>
                                  <span >{{record.healthrecord.reasonVisit}}</span>
                                 </td>
                                 <td>{{record.provider.agency_name}}</td>
                                
                                 <td>{{record.diagnosis.name}}</td>
                                 <td>
                                     <router-link :to="{ path: '/encounter/'+ record.id}">
                                           <button type="button" class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                         </router-link>
                                 </td>
                               

                            </tr>

                            </tbody>
                        </table>

                    </div>

                  </div>
                </div>

              </div>

          

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
                               {{client.created_at}}
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
        
           
           
           
            </div>


          </div>


          <div class="vld-parent">
            <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
          </div>

        </section>
      </div>

    </main>

  </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';
 

  export default {
    components: {
      Navbar,
      Loading
    },
    data() {
      return {
        user: null,
        records: "",
        referrals: "",
        client: "",
        notes: "",
        medications: "",
        healthFacility: "",
        signature: "",
        enrolled_by: "",
        ward: "",
        local_government: "",
        edit: false,
        isLoading: false,
        fullPage: true,
        agency_id: "",
        output: "",
        singletpa: "",


      }
    },

    beforeMount() {
      this.user = JSON.parse(localStorage.getItem('user'))
      // this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
      //   .then(response => {
      //     this.client = response.data.user
      //     console.log(response)
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   })

    },

    methods: {

      printMe() {
        var printContents = document.getElementById('printDiv').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      },

      fetchUser() {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
          .then(response => {
            this.client = response.data.user
            this.healthFacility = response.data.provider
            this.local_government = response.data.local_government
            this.ward = response.data.ward
            console.log(response)

          })
          .catch(error => {
            console.error(error);
          })
      },


      HRecord() {
        this.isLoading = true;
        // this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.get(`/api/v1/auth/records-patient/${this.$route.params.id}`)
          .then(response => {
            console.log(response);
            this.records = response.data
            this.isLoading = false;

          })
          .catch(error => {
            console.log(error.response)
            this.isLoading = false;

          })
      },
      getReferrals() {
        this.isLoading = true;
        this.axios.get(`/api/v1/auth/referrals-patient/${this.$route.params.id}`)
          .then(response => {
            console.log(response);
            this.referrals = response.data
            this.isLoading = false;

          })
          .catch(error => {
            console.log(error.response)
            this.isLoading = false;

          })
      },


    },
    created() {
      this.fetchUser()
      this.HRecord()
      this.getReferrals()

    }

  }
</script>
<style>
  .spacer {
    margin-left: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .spacer-image {
    margin-top: 25px;
  }

  .spacer-top-bottom {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .spacer-top {
    margin-top: 10px;
  }

  #container {
    margin: 0px auto;
    width: 500px;
    height: 375px;
    border: 10px #333 solid;
  }

  #videoElement {
    width: 500px;
    height: 375px;
    background-color: #666;
  }
</style>
