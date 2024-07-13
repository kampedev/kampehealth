<template>
  <section class="admin-content " id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div>
        <div class="bg-dark m-b-30">
          <div class="container">
            <div class="row p-b-60 p-t-60">

              <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                <div class="m-b-10">

                </div>
                <button v-clipboard="client.firstname">
                  <strong> <span class="h3">{{client.full_name}}</span> </strong>
                </button>

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

                      <button class="btn btn-info spacer" v-if="transfer.status != 'approved'"
                        @click="updateRequestA">
                        approve <i class="fe fe-check-square"></i>
                      </button>

                      <button class="btn btn-danger spacer"   v-if="transfer.status != 'approved'"
                      @click="updateRequestR">decline <i class="fe fe-x-circle"></i> </button>

                      <button class="btn btn-primary spacer" @click="printMe"><i class="fe fe-printer"></i></button>

                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8 offset-lg-2" id="printDiv" ref="printNow">
                <div class="card" style="background-image: url('../assets/img/ohis_transparent.png'); background-size: cover; background-repeat: no-repeat;">
                  <div class="card-header ">
                    <div class="row spacer-top">
                      <div class="col-md-2">
                        <span class="avatar avatar-md">
                          <img src="/assets/img/ohis_logo.png" class=" rounded-circle">
                        </span>
                      </div>
                      <div class="col-md-7">
                          <p class="h3 text-center text-primary"><strong>CHANGE OF FACILITY REQUEST</strong></p>
                      </div>

                    </div>
                  </div>

                  <div class="card-body row">

                    <div class="row col-md-12">
                      <div class="col-md-12">
                        <p class="text-primary h4"><strong>Patient Details</strong></p>
                        <hr >
                      </div>
                        <div class=" col-md-6">
                            <p class="h5"> <strong>Patient Name:</strong> {{transfer.client.firstname}} {{transfer.client.lastname}} </p><br>
                            <p class="h5"> <strong>OHIS Number:</strong> {{transfer.client.id_card_number}}</p><br>
                            <p class="h5"> <strong>Phone Number:</strong>{{transfer.client.phone_number}} </p><br>
                            <p class="h5"> <strong>Plan:</strong> {{transfer.client.sector}} </p><br>
                        </div>
                        <!-- <div class="col-md-6">

                            <p class="h5"> <strong>Patient Name:</strong> {{transfer.client.firstname}} {{transfer.client.lastname}} </p><br>
                            <p class="h5"> <strong>OHIS Number:</strong> {{transfer.client.id_card_number}}</p><br>
                            <p class="h5"> <strong>Phone Number:</strong>{{transfer.client.phone_number}} </p><br>
                            <p class="h5"> <strong>Plan:</strong> {{transfer.client.sector}} </p><br>

                        </div> -->
                    </div>
                    <br><br>
                    <div class="col-md-12">
                      <p class="text-primary h4"><strong>Healthcare Provider</strong></p><br>
                      <hr >
                      <p><span class="h5"><strong>Current Facility:</strong> {{transfer.oldfacility.agency_name}}</span>  </p><br>
                      <p><span class="h5"><strong>Proposed New Facility:</strong> {{transfer.newfacility.agency_name}}</span> </p><br>
                    </div>
                    <br><br>
                    <div class="col-md-12">
                      <p class="text-primary h4"><strong>Reason for Request</strong></p>
                      <hr >
                        <p class="h5"> {{transfer.reason_for_change}}</p>
                    </div>
                    <div class="col-md-12">
                      <p class="text-center text-primary h4"><strong>Status</strong></p>
                      <hr >
                        <p class="text-center h5">{{transfer.status}}</p>
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
        transfer: "",
        client: "",
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
      this.axios.get(`/api/v1/auth/change_providers/${this.$route.params.id}`)
        .then(response => {
          this.transfer = response.data
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
      updateRequestA(){
        if (confirm('Are you sure you want to approve this request')) {
          this.isLoading = true;
          this.axios.post(`/api/v1/auth/change_providers/update/${this.$route.params.id}`,{
              status: 'approved'
          })
            .then(response => {
              console.log(response);
              this.getTransfer()
              this.isLoading = false;

            })
            .catch(error => {
              console.log(error.response)
              this.isLoading = false;

            })
        }
      },
      updateRequestR(){
        if (confirm('Are you sure you want to reject?')) {
          this.isLoading = true;
          this.axios.post(`/api/v1/auth/change_providers/update/${this.$route.params.id}`,{
              status: 'declined'
          })
            .then(response => {
              console.log(response);
              this.getTransfer()
              this.isLoading = false;

            })
            .catch(error => {
              console.log(error.response)
              this.isLoading = false;

            })
        }
      },
      getTransfer() {
        this.isLoading = true;
        this.axios.get(`/api/v1/auth/change_providers/${this.$route.params.id}`)
          .then(response => {
            console.log(response);
            this.transfer = response.data
            this.isLoading = false;

          })
          .catch(error => {
            console.log(error.response)
            this.isLoading = false;

          })
      },

    },
    created() {
      this.getTransfer()

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
