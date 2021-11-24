<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <div>
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div
              class="
                col-md-6
                text-center
                mx-auto
                text-white
                p-b-30
                spacer-image
              "
            >
              <div class="m-b-10">
               
              </div>
              <button v-clipboard="client.user.firstname">
                <strong>{{ client.user.firstname }} {{ client.user.lastname }}</strong>
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
                    <!-- <button class="btn btn-info spacer"  >Principal's Details</button> -->

                    <button
                      class="btn btn-outline-success spacer"
                      @click="streamPic"
                      data-toggle="modal"
                      data-target="#example_01"
                    >
                      Take Photo <i class="fe fe-camera"></i>
                    </button>
                    <div
                      class="fileinput fileinput-new"
                      data-provides="fileinput"
                    >
                      <span class="btn btn-file">
                        <span class="fileinput-new"
                          >Upload Picture <i class="fe fe-upload"></i
                        ></span>
                        <span class="fileinput-exists">Change</span>
                        <input
                          type="file"
                          name="..."
                          multiple
                          v-on:change="attachPic"
                        />
                      </span>
                      <span class="fileinput-filename"></span>
                      <a
                        href="#"
                        class="close fileinput-exists"
                        data-dismiss="fileinput"
                        style="float: none"
                        >&times;</a
                      >
                    </div>
                    <!-- <router-link :to="{ path: '/client.user/biometrics/'+client.user.id, params: {} }">
                                           <button class="btn btn-info spacer"  > <i class="mdi mdi-hand"></i> </button>
                                        </router-link> -->

                    <button
                      class="btn btn-outline-primary spacer"
                      @click="printMe"
                    >
                      Print <i class="fe fe-printer"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger spacer"
                      @click="deleteUser"
                    >
                      Delete <i class="fe fe-delete"></i>
                    </button>
                    <!-- <button class="btn btn-primary spacer"  @click="changeNumber">Change ID Card Number </button> -->

                    <router-link
                      :to="{ path: '/patient/' + $route.params.id, params: {} }"
                    >
                      <button class="btn btn-outline-info spacer">
                        Medical<i class="mdi mdi-medical-bag"></i>
                      </button>
                    </router-link>

                    <router-link
                      :to="{
                        path: '/add-dependent/' + $route.params.id,
                        params: {},
                      }"
                    >
                      <button
                        class="btn btn-outline-info spacer"
                        v-if="client.user.type == 'client.user'"
                        @click="findDependents"
                      >
                        Dependents <i class="fe fe-users"></i>
                      </button>
                    </router-link>
                    <router-link
                      :to="{
                        path: '/edit-user/' + $route.params.id,
                        params: {},
                      }"
                    >
                      <button class="btn btn-outline-dark spacer">
                        Edit <i class="fe fe-edit"></i>
                      </button>
                    </router-link>
                    <!-- <router-link
                      :to="{
                        path: '/edit-user/' + $route.params.id,
                        params: {},
                      }"
                    > -->
                    <span>
                      <!-- Button trigger modal -->
                      <button
                        type="button"
                        class="btn btn-outline-dark spacer"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Add Payment
                      </button>

                      <!-- Modal -->
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Add Payment
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <input
                                type="text"
                                placeholder="Enter Payment Description"
                                class="form-control mb-4"
                                v-model="userPayment.description"
                              />
                              <input
                                type="text"
                                placeholder="Enter Amount"
                                class="form-control"
                                v-model="userPayment.amount"
                              />
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                @click="addPayment"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                    <!-- </router-link> -->

                    <span v-if="client.user.status == 'active'">
                      <button
                        type="button"
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-success"
                      >
                        active
                      </button>
                    </span>
                    <span v-if="client.user.status == 'inactive'">
                      <button
                        type="button"
                        class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning"
                      >
                        inactive
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-md-12" id="printDiv" ref="printNow">
              <div
                class="card"
                style="
                  background-image: url('../assets/img/ohis_transparent.png');
                  background-size: cover;
                  background-repeat: no-repeat;
                "
              >
                <div class="card-header">
                  <div class="row spacer-top">
                    <div class="col-md-2">
                      <span class="avatar avatar-xl">
                        <img
                          src="/assets/img/ohis_logo.png"
                          class="rounded-circle"
                        />
                      </span>
                    </div>
                    <div class="col-md-10">
                      <strong
                        ><h2 class="h1 text-primary">
                          OSUN HEALTH INSURANCE SCHEME
                        </h2>
                      </strong>
                      <strong><p class="h2 text-center">(O'HIS)</p></strong>
                    </div>
                  </div>
                </div>

                <div class="card-body row">
                  <div class="col-md-4">
                    <vue-initials-img
                      :name="client.user.firstname + ' ' + client.user.lastname"
                      class="img-thumbnail"
                      size="300"
                      v-if="client.user.user_image == null"
                    />
                    <img
                      :src="
                        `https://api.hayokinsurance.com/image/${client.user.user_image}`
                      "
                      class="img spacer-top"
                      alt="User Photo"
                      v-if="client.user.user_image != null"
                      onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                    />
                    <!-- <img :src="`http://localhost:8000/image/${client.user.user_image}`" class="img spacer-top" alt="Cinque Terre"  height="400px" v-if="client.user.user_image != null "> -->
                    <!-- <p class="btn btn-default spacer-top-bottom">
                                 <button type="button"  name="button"> Enrollment Card </button>
                               </p> -->
                  </div>

                  <div class="col-md-8">
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">NAME :</strong>
                      <strong>{{ client.user.lastname }}</strong
                      > {{ client.user.firstname }}, {{ client.user.middlename }}
                    </p>
                    <hr />
                    <!-- <p class="h2 spacer-top-bottom"> <strong class="text-primary">ID NUMBER:</strong>  <strong>OHIS/A-0{{singletpa.tpa_id}}/{{client.user.id_card_number}}</strong></p> -->
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">ID NUMBER:</strong>
                      <strong>{{ client.user.id_card_number }}</strong>
                    </p>
                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">EXPIRY DATE:</strong>

                      <!-- <strong>{{ client.user.expiry_date | moment("D/M/YYYY")  }}</strong> -->
                      <strong>{{
                        client.user.expiry_date | moment("dddd, MMMM Do YYYY")
                      }}</strong>
                    </p>

                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">
                        FACILITY TO ACCESS CARE:</strong
                      >
                      <strong>{{ client.provider.agency_name }}</strong>
                    </p>
                    
                    <hr />
                    <p
                      class="h3 spacer-top-bottom"
                      v-if="client.user.place_of_work != null"
                    >
                      <strong class="text-primary">MDA:</strong>
                      <strong> {{ client.user.place_of_work }}</strong>
                    </p>
                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">HMO/TPA:</strong>
                      <strong> {{ client.tpa.organization_name }}</strong>
                    </p>
                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">Plan Type:</strong>
                      <strong>{{ client.user.plan_type }} </strong>
                    </p>
                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">SECTOR:</strong>
                      <strong> {{ client.user.sector }}</strong>
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-12">
              <div class="card m-b-30">
                <div class="card-header"></div>

                <div class="card-body">
                  <div class="form-group">
                    <button class="btn btn-outline-dark">Other Details</button>
                  </div>

                  <p class="spacer-top-bottom">
                    <strong>Date Enrolled:</strong>
                    {{ client.user.created_at | moment("dddd, MMMM Do YYYY") }}
                  </p>
                  <hr />
                  <div v-for="(dep, index) in dependents" v-bind:key="dep.id">
                    <p class="spacer-top-bottom">
                      <strong>Dependent Name {{ index + 1 }} :</strong>
                      {{ dep.firstname }} {{ dep.lastname }}
                    </p>
                    <hr />
                  </div>

                  <p class="spacer-top-bottom">
                    <strong>Enrolled By:</strong> {{ client.enrolled_by.firstname }}
                    {{ client.enrolled_by.lastname }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>NIMC Number:</strong> {{ client.user.nimc_number }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>Gender:</strong> {{ client.user.gender }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>Phone Number:</strong> {{ client.user.phone_number }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>LGA/Ward:</strong> <span v-if="client.local_government != null ">{{ client.local_government.local_name }}</span> /
                   
                      
                     <span  v-if="client.ward != null "> {{ client.ward.ward_name}} </span>
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>Date of Birth:</strong>
                    {{ client.user.dob | moment("D/M/YYYY") }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>Email:</strong> {{ client.user.email }}
                  </p>
                  <hr />
                  <!-- <p class="spacer-top-bottom"><strong>Enrolment Date:</strong> {{client.user.created_at}}</p>
                                   <hr> -->
                  <p class="spacer-top-bottom">
                    <strong>Expiry Date:</strong> {{ client.user.expiry_date }}
                  </p>
                  <hr />

                  <p class="spacer-top-bottom">
                    <strong>Marital Status:</strong> {{ client.user.marital_status }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>MDA:</strong> {{ client.user.place_of_work }}
                  </p>
                  <hr />
                  <p class="spacer-top-bottom">
                    <strong>Staff ID:</strong> {{ client.user.salary_number }}
                  </p>
                  <hr />
                  <p
                    class="spacer-top-bottom"
                   
                  >
                    <strong>Category of Vulnerable Group:</strong>
                    {{ client.user.category_of_vulnerable_group }}
                  </p>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <h5>
              <i class="fe fe-credit-card"></i
              > <strong>{{client.transactions.length }} Transactions </strong>
            </h5>
            <div class="table-responsive">
              <table class="table align-td-middle table-card">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Transaction Type</th>
                    <th>Transaction Amount</th>
                    <th>Description </th>
                    <th>Date Created </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(trx, index) in client.transactions" v-bind:key="trx.id" >
                    <td> {{index+1}} </td>
                     <td>{{trx.type}} </td>
                    <td> &#8358;{{trx.amount | numeral(0,0) }}  </td>
                      <td>{{trx.description}} </td>
                    <td> {{trx.created_at | moment("dddd, MMMM Do YYYY") }}  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Modal for Prescription/Notes -->
          <div
            class="modal fade"
            id="example_01"
            tabindex="-1"
            role="dialog"
            aria-labelledby="example_02"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div class="modal-content">
                <div class="container-fluid">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="row">
                    <div class="col-md-12 p-t-20 p-b-20">
                      <video
                        id="video"
                        width="100%"
                        height="auto"
                        autoplay
                      ></video>
                      <p>
                        <!-- <button id="snap" class="bg-navy btn btn-flat">Snap Photo</button> -->
                        <button @click="takePic" class="bg-navy btn btn-flat">
                          Snap Photo
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          name="button"
                          @click="savePic"
                        >
                          Save pic
                        </button>
                      </p>
                      <!-- <p> i am image  <img :src="imagefile" alt=""> </p> -->
                      <!-- <p>{{imagefile}}</p> -->

                      <canvas id="canvas" width="600px" height="450px"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Ends -->
        </div>

        <div class="vld-parent">
          <loading
            :active.sync="isLoading"
            loader="dots"
            :can-cancel="true"
            :is-full-page="fullPage"
          ></loading>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
// import { WebCam } from "vue-web-cam";

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      auth_user: "",
      client: "",
      notes: "",
      dependents: "",
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
      imagefile: "",
      image: "",
      output: "",
      singletpa: "",
      pictureShower: true,
      userPayment: {
        description: "",
        amount: "",
      },
      transaction_ref_length: 50,
      video_settings: {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
          facingMode: "environment",
        },
      },
    };
  },
  mounted() {
    this.print();

    var video = document.getElementById("video");
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      // navigator.mediaDevices.getUserMedia({ video: true}).then(function(stream) {
      navigator.mediaDevices
        .getUserMedia(this.video_settings)
        .then(function(stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
    }

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    // var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
      context.drawImage(video, 0, 0, 500, 350);

      // get image
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      console.log(image);
      localStorage.setItem("snap", image);
      // this.this.uploadPic()
    });
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
      .then((response) => {
        this.client = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  computed: {
    randomTransId() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < this.transaction_ref_length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      console.log({ result });
      return result;
    },
  },

  methods: {
    addPayment() {
        if (confirm('Are you sure you want to Submit?') ) {
           this.isLoading = true;
      this.axios
        .post(`/api/v1/make/transaction`, {
          user_id: this.$route.params.id,
          agency_id: 95930,
          description: this.userPayment.description,
          amount: this.userPayment.amount,
          type: "offline",
          status: "approved",
          transaction_ref: this.randomTransId,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.success("Payment Added Successfully", {
            position: "top-center",
            duration: 3000,
          });
          // this.fetchUser()
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
      console.log("Helloooooooooooooos");
      this.userPayment.description = "";
      this.userPayment.amount = "";
        }
    },

    changeNumber() {
      this.isLoading = true;
      this.axios
        .patch(`/api/v1/auth/id-card-number/change/${this.$route.params.id}`)
        .then((response) => {
          console.log(response);
          // this.getClients()
          this.$toasted.success("Changed Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });
          this.isLoading = false;
        });
    },
    attachPic(event) {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(event);
      this.image = event.target.files[0];
      this.uploadPicture();
    },
    uploadPicture() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("user_image", this.image);
      formData.append("user_id", this.$route.params.id);
      this.axios
        .post("/api/v1/auth/uploadUserImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info("Image added Successfully!", {
            position: "top-center",
            duration: 3000,
          });
          this.fetchUser();
        });
    },

    async print() {
      const el = this.$refs.printNow;
     
      const options = {
        type: "dataURL",
      };
      this.output = await this.$html2canvas(el, options);
    },
    streamPic() {
      console.log("hello pic");

      var video = document.getElementById("video");
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices
          .getUserMedia(this.video_settings)
          .then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
          });
      }
    },
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
    attachSign(event) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.signature = event.target.files[0];
      console.log(event);
      this.uploadSign();
    },

    authUser() {
      this.axios
        .get(`/api/v1/auth/user`)
        .then((response) => {
          this.auth_user = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    takePic() {
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, 640, 480);

      // get image
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      console.log(image);
      localStorage.setItem("snap", this.imagefile.src);
      this.imagefile = image.src;
    },

    savePic() {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/uploadcustomerpicImage`, {
          user_image: this.imagefile,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.success("uploaded Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.fetchUser();
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
    deleteUser() {
      if (confirm("Are you Sure you want to delete this user")) {
        this.axios
          .delete(`/api/v1/auth/deleteUser/${this.$route.params.id}`)
          .then((response) => {
            console.log(response);
            // this.getClients()
            this.$breadstick.notify("Deleted Successfully!", {
              position: "top-right",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    fetchUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then((response) => {
          this.client = response.data;
          this.dependents = response.data.dependents;
        
         
          //get dependents
          this.axios
            .post(`/api/v1/auth/allDependantsUser`, {
              agency_id: 95930,
              id_card_number: this.client.id_card_number,
              user_id: this.$route.params.id,
            })
            .then((response) => {
              let answers = response.data;
              answers;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          //end of get dependents
        })
        .catch((error) => {
          console.error(error);
        });
    },
    findDependents() {
      //get dependents
      this.axios
        .post(`/api/v1/auth/allDependantsUser`, {
          agency_id: 95930,
          id_card_number: this.client.id_card_number,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          let answers = response.data;
          answers;
          this.fetchUser();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      //end of get dependents
    },

    uploadPic() {
      this.isLoading = true;
      let snap = localStorage.getItem("snap");

      var formData = new FormData();
      formData.append("user_image", snap);
      this.axios
        .post("/api/v1/auth/uploadUserImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify("Profile Image changed Successfully!", {
            position: "top-right",
          });
          // this.getUser()
        });
    },
  },
  created() {
    this.fetchUser();
    this.streamPic();
    this.findDependents();
  },
};
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
