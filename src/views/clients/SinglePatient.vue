<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div>
        <div class="bg-dark m-b-30">
          <div class="container">
            <div class="row p-b-60 p-t-60">

              <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                <p class="h1 text-primary">O'HIS PATIENT RECORD MANAGEMENT </p>

                <!-- <button v-clipboard="client.firstname">

                  <strong> <span class="h3">{{client.firstname}} {{client.lastname}}</span> </strong>
                </button> -->

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

                    <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                  </div>

                  <div class="card-body">
                    <div class="form-group">

                      <button class="btn btn-default spacer">{{records.meta.total}}  Health Records<i class="fe fe-clipboard"></i> </button>
                      <button class="btn btn-default spacer">{{referrals.meta.total}}  Referrals<i class="mdi mdi-bank-transfer"></i> </button>

                      <button class="btn btn-primary spacer" @click="printMe"><i class="fe fe-printer"></i></button>

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
                      <p class="h2 spacer-top-bottom"><strong class="text-primary">NAME :</strong> <strong>{{client.firstname }}</strong>, {{client.lastname}} {{client.middlename}}</p>
                      <hr>
                      <!-- <p class="h2 spacer-top-bottom"> <strong class="text-primary">ID NUMBER:</strong>  <strong>OHIS/A-0{{singletpa.tpa_id}}/{{client.id_card_number}}</strong></p> -->
                      <p class="h2 spacer-top-bottom"> <strong class="text-primary">ID NUMBER:</strong> <strong>{{client.id_card_number}}</strong></p>
                      <hr>

                      <p class="h2 spacer-top-bottom"> <strong class="text-primary"> FACILITY TO ACCESS CARE:</strong> <strong>{{healthFacility.agency_name}}</strong> </p>
                      <!-- <hr> -->
                      <!-- <p class="h2 spacer-top-bottom"> <strong class="text-primary">ALTERNATE HEALTH FACILITY:</strong> <strong>{{healthFacility.agency_name}}</strong> </p> -->
                      <hr>
                      <p class="h2 spacer-top-bottom" v-if="client.place_of_work != null"> <strong class="text-primary">MDA:</strong> <strong> {{client.place_of_work}}</strong> </p>
                      <hr>
                      <p class="h2 spacer-top-bottom"> <strong class="text-primary">BLOOD GROUP:</strong> <strong> {{client.blood}}</strong> </p>
                      <hr>
                      <!-- <p class="h2 spacer-top-bottom"><strong class="text-primary">SECTOR:</strong>  <strong>{{client.sector}}</strong></p>
                                  <hr> -->
                      <p class="h2 spacer-top-bottom"> <strong class="text-primary">SECTOR:</strong> <strong> {{client.sector}}</strong> </p>
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



                    <p class="spacer-top-bottom"><strong>HMO:</strong> {{singletpa.organization_name}}</p>
                    <hr>

                    <p class="spacer-top-bottom"><strong>Gender:</strong> {{client.gender}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>Phone Number:</strong> {{client.phone_number}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>LGA/Ward:</strong> {{singlelga.local_name}}/{{client.ward_name}}</p>
                    <hr>
                    <p class="spacer-top-bottom"><strong>Date of Birth:</strong> {{client.dob | moment("D/M/YYYY") }}</p>
                    <hr>

                    <p class="spacer-top-bottom"><strong>Expiry Date:</strong> {{client.expiry_date}}</p>
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

                    <h5> <i class="fe fe-clipboard"></i>Services/Drugs <i class="fe fe-thermometer"></i></h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Healthcare Provider</th>
                                <th>Attending Professional</th>
                                <th>Diagnosis</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(record, index) in records.data" v-bind:key="record.id">

                               <td>{{index+1}}</td>
                                <td>
                                  <span >{{record.healthrecord.reasonVisit}}</span>
                                 </td>
                                 <td>{{record.provider.agency_name}}</td>
                                 <td>{{record.healthrecord.professional.firstname}}</td>
                                 <td>{{record.diagnosis.name}}</td>
                                <!-- <td>
                                  <button class="btn btn-danger" name="button" @click="deleteService(service)"><i class="fe fe-delete"></i> </button>
                                </td> -->

                            </tr>

                            </tbody>
                        </table>

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
  // Init plugin
  // import { WebCam } from "vue-web-cam";

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
        singleward: "",
        singlelga: "",
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
      this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then(response => {
          this.client = response.data.user
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        })

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
            console.log(response)

            // get facility
            this.axios.get(`/api/v1/auth/user/${this.client.provider_id}`)
              .then(response => {
                this.healthFacility = response.data.user
                console.log(response)
              })
              .catch(error => {
                console.error(error);
              })
            //end of facility

            // get enrolled by
            this.axios.get(`/api/v1/auth/user/${this.client.enrolled_by}`)
              .then(response => {
                this.enrolled_by = response.data.user
                console.log(response)
              })
              .catch(error => {
                console.error(error);
              })
            //end of enrolled by

            //get tpa
            this.axios.get(`/api/v1/auth/orgenrollment/${this.client.org_id}`)
              .then(response => {
                this.singletpa = response.data[0]
                console.log(response)
              })
              .catch(error => {
                console.error(error);
              })
            //end of get tpa

            //get ward
            this.axios.get(`/api/v1/auth/wards/${this.client.ward}`)
              .then(response => {
                this.singleward = response.data[0]
                console.log(response)
              })
              .catch(error => {
                console.error(error);
              })
            //end of get ward

            //get lga
            this.axios.get(`/api/v1/auth/lgas/${this.client.localgovt}`)
              .then(response => {
                this.singlelga = response.data[0]
                console.log(response)
              })
              .catch(error => {
                console.error(error);
              })
            //end of get lga

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
    margin-top: 50px;
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
