<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div
              class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image"
            >
              <div class="m-b-10"></div>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-md-12">
              <div
                class="card m-b-30"
                v-if="user.type == 'employee' || user.type == 'shis'"
              >
                <div class="card-header"></div>

                <div class="card-body">
                  <div class="form-group">
                    <button
                      class="btn btn-outline-info spacer"
                      @click="takePicAndroid"
                    >
                      Capture Photo <i class="fe fe-camera"></i>
                    </button>
                    <div
                      class="fileinput fileinput-new"
                      data-provides="fileinput"
                    >
                      <span class="btn btn-file">
                        <span class="fileinput-new"
                          >Upload Photo <i class="fe fe-upload"></i
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

                    <button
                      class="btn btn-outline-primary spacer"
                      @click="printMe"
                    >
                      Print <i class="fe fe-printer"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger spacer"
                      @click="deleteUser"
                      v-if="user.user_role != 0"
                    >
                      Delete <i class="fe fe-delete"></i>
                    </button>

                    <!-- <router-link
                      :to="{ path: '/patient/' + $route.params.id, params: {} }"
                    >
                      <button class="btn btn-outline-info spacer">
                        Medical<i class="mdi mdi-medical-bag"></i>
                      </button>
                    </router-link> -->

                     <router-link
                      :to="{ path: '/add-dependent/' + $route.params.id, params: {} }"
                    >
                      <button class="btn btn-outline-info spacer">
                        My Enrollees<i class="mdi mdi-user-multiple"></i>
                      </button>
                    </router-link> 

                    <router-link
                      :to="{
                        path: '/subscribe-' + $route.params.id,
                        params: {},
                      }"
                      v-if="user.type != 'provider_employee'"
                    >
                      <button class="btn btn-outline-info mx-2">
                        Payment <i class="fe fe-credit-card"></i>
                      </button>
                    </router-link>
                    <router-link
                      :to="{
                        path: '/edit-user/' + $route.params.id,
                        params: {},
                      }"
                    >
                      <button
                        class="btn btn-outline-dark mx-2"
                        v-if="user.type != 'provider_employee'"
                      >
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
                    </span>
                    <!-- </router-link> -->
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
                  background-image: url('../assets/img/kampe_transparent.png');
                  background-size: cover;
                "
              >
                <div class="card-header">
                  <div class="row spacer-top">
                    <div class="col-md-2">
                      <span class="avatar avatar-xl">
                        <img
                          src="/assets/img/kampe_logo.png"
                          class="rounded-circle"
                        />
                      </span>
                    </div>
                    <div class="col-md-10">
                      <strong
                        ><h2 class="h1 text-info text-center">KAMPE HEALTH</h2>
                      </strong>
                    </div>
                  </div>
                </div>

                <div class="card-body row">
                  <div class="col-md-4">
                    <img
                      :src="`https://kampe.hayokmedicare.ng/image/${client.user.user_image}`"
                      class="img"
                      alt="User Photo"
                      onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                    />
                  </div>

                  <div class="col-md-8">
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">NAME:</strong>
                      <strong>{{ client.user.lastname }}</strong>
                      {{ client.user.firstname }}, {{ client.user.middlename }}
                    </p>
                    <hr />
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
                      <strong v-if="client.provider">{{
                        client.provider.agency_name
                      }}</strong>
                    </p>

                    <hr />
                    <p class="h3 spacer-top-bottom">
                      <strong class="text-primary">Plan: </strong>
                      <strong> {{ client.user.plan }}</strong>
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
                      <strong>Related User Name {{ index + 1 }} :</strong>
                      {{ dep.full_name }}
                    </p>
                    <hr />
                  </div>

                  <p
                    class="spacer-top-bottom"
                    v-if="client.enrolled_by != null"
                  >
                    <strong>Enrolled By:</strong>
                    {{ client.enrolled_by.full_name }}
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
                    <strong>Phone Number:</strong>
                    {{ client.user.phone_number }}
                  </p>
                  <hr />

                  <p class="spacer-top-bottom">
                    <strong>LGA/Ward:</strong>
                    <span v-if="client.local_government != null">{{
                      client.local_government.local_name
                    }}</span>
                    /

                    <span v-if="client.ward != null">
                      {{ client.ward.ward_name }}
                    </span>
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

                  <p class="spacer-top-bottom">
                    <strong>Expiry Date:</strong> {{ client.user.expiry_date }}
                  </p>
                  <hr />

                  <p class="spacer-top-bottom">
                    <strong>Marital Status:</strong>
                    {{ client.user.marital_status }}
                  </p>
                  <hr />

                  <div class="form-group my-4">
                    <button class="btn btn-outline-dark">Plan & Utilization</button>
                  </div>


                  <p class="spacer-top-bottom">
                    <strong>Total Payment:</strong>
                    <i class="mdi mdi-currency-ngn"></i
                    >{{ client.utilization_primary | numeral(0, 0) }}
                  </p>
                  <hr />


                  <p class="spacer-top-bottom">
                    <strong>Primary Utilization:</strong>
                    <i class="mdi mdi-currency-ngn"></i
                    >{{ client.utilization_primary | numeral(0, 0) }}
                  </p>
                  <hr />

                  <p class="spacer-top-bottom">
                    <strong>Secondary Utilization:</strong>
                    <i class="mdi mdi-currency-ngn"></i>
                    {{ client.utilization_secondary | numeral(0, 0) }}
                  </p>
                  <hr />


                  <p class="spacer-top-bottom">
                    <strong>Total Utilization:</strong>
                    <i class="mdi mdi-currency-ngn"></i>
                    {{ client.utilization_primary + client.utilization_secondary | numeral(0, 0) }}
                  </p>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div :class="trxtableclass">
              <h5>
                <i class="fe fe-credit-card"></i>
                <strong>{{ client.transactions.length }} Transactions </strong>
              </h5>
              <div class="table-responsive">
                <table class="table align-td-middle table-card">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Transaction Type</th>
                      <th>Transaction Amount</th>
                      <th>Transaction Proof</th>
                      <th>Description</th>
                      <th>Date Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(trx, index) in client.transactions"
                      v-bind:key="trx.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ trx.type }}</td>
                      <td>&#8358;{{ trx.amount | numeral(0, 0) }}</td>
                      <td>
                        <button
                          class="btn btn-info"
                          v-if="trx.type == 'offline'"
                          @click="gotoTrxImage(trx)"
                        >
                          view proof
                        </button>
                      </td>
                      <td>{{ trx.description }}</td>
                      <td>
                        {{ trx.created_at | moment("dddd, MMMM Do YYYY") }}
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          name="button"
                          @click="deleteTrx(trx)"
                        >
                          <i class="fe fe-delete"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div :class="trxdocclass" v-show="trx_image">
              <img
                :src="`http://localhost:8000/documents/${trx_doc.document}`"
                class="img-responsive"
                v-if="trx_doc != null"
              />
            </div>
          </div>
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
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      trx_image: false,
      client: "",
      trx_doc: null,
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
      transactionID: "",
      agency_id: "",
      imagefile: "",
      image: "",
      paymentProofFile: "",
      paymentProofImage: "",
      output: "",
      singletpa: "",
      trxdocclass: "col-md-4",
      trxtableclass: "col-md-12",
      pictureShower: true,
      userPayment: {
        description: "",
        amount: "",
      },
      transaction_ref_length: 50,
    };
  },
  mounted() {
    this.print();
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
      if (confirm("Are you sure you want to Submit?")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/make/transaction`, {
            user_id: this.$route.params.id,
            agency_id: 439078,
            description: this.userPayment.description,
            amount: this.userPayment.amount,
            type: "offline",
            status: "approved",
            transaction_ref: this.randomTransId,
          })
          .then((response) => {
            this.transactionID = response.data.id;
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
          });

        this.userPayment.description = "";
        this.userPayment.amount = "";
      }

      // if (this.transactionID !== "") {
      //   }

      setTimeout(() => {
        this.uploadPaymentProof();
      }, 3000);
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
      console.log(this.client);
    },

    attachPaymentProof(event) {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(event);
      this.paymentProofFile = event.target.files[0];
      console.log(this.paymentProofFile);
    },

    uploadPaymentProof() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));

      var formData = new FormData();
      formData.append("transaction_id", this.transactionID);
      formData.append("user_id", this.$route.params.id);
      formData.append("document", this.paymentProofFile);

      this.axios
        .post("/api/v1/auth/uploadTransactionDocument", formData)
        .then((response) => {
          this.paymentProofImage = response.data.document;
          console.log(response.data.document);
          this.isLoading = false;
          this.$toasted.success("Payment Added Successfully", {
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

    async takePicAndroid() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      var imageUrl = image.base64String;
      this.imagefile = "data:image/png;base64," + imageUrl;
      this.savePic();
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
            this.$toasted.success("Deleted Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    getDependents(){
      this.axios
        .get(`/api/v1/auth/allDependantUser/${this.$route.params.id}`)
        .then((response) => {
          this.dependents = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteTrx(trx) {
      if (confirm("Are you Sure you want to delete?")) {
        this.axios
          .delete(`/api/v1/auth/delete/transaction/${trx.id}`)
          .then((response) => {
            console.log(response);
            this.fetchUser();
            this.$toasted.success("Deleted Successfully", {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    gotoTrxImage(trx) {
      this.axios
        .get(`/api/v1/auth/get/transaction-document/${trx.id}`)
        .then((response) => {
          console.log(response);
          this.$toasted.success("Gotten Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.trx_doc = response.data.data;
          this.trx_image = true;
          this.trxtableclass = "col-md-8";
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then((response) => {
          this.client = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
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
    // uploadPaymentProof() {
    //   this.isLoading = true;
    //   let snap = localStorage.getItem("snap");

    //   var formData = new FormData();
    //   formData.append("user_image", snap);
    //   this.axios
    //     .post("/api/v1/auth/uploadUserImage", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       this.isLoading = false;
    //       this.$breadstick.notify("Profile Image changed Successfully!", {
    //         position: "top-right",
    //       });
    //       // this.getUser()
    //     });
    // },
  },
  created() {
    this.fetchUser();
    this.getDependents();
  },
};
</script>
<style scoped>
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
th {
  text-align: center;
}

td {
  width: fit-content;
  text-align: center;
}

.payment__proof {
  width: 20%;
}

.payment__proof,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: inline-block;
}
</style>
