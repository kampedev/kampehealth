<template>
  <section class="admin-content" id="contact-search">
    <div class="bg-dark m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <p class="h4"><strong>Complete Registration</strong></p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6 offset-md-3" v-if="showdependent == true">
      <div class="spacer-top-bot">
        <button
          type="button"
          class="btn btn-outline-dark mx-2"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Proceed to Pay
        </button>
      </div>
    </div>

    <section class="" v-show="showpic">
      <div class="container">
        <div class="row list">
          <div class="col-lg-8 offset-lg-2">
            <div class="card m-b-30">
              <div class="card-header">
                <p class="h5 text-center">
                  {{ auth_user.full_name }}
                </p>
              </div>

              <div class="card-body">
                <div class="form-row col-lg-8 offset-lg-2">
                  <button
                    class="btn btn-outline-success mx-2"
                    @click="takePicAndroid"
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
                </div>
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
        </div>
      </div>
    </section>
    <section class="" v-show="showdependent">
      <AddDependentVoluntary />
    </section>

    <section class="" v-show="showpay">
      <div class="container">
        <div class="row list">
          <div class="col-lg-8 offset-lg-2">
            <div class="card m-b-30">
              <div class="card-header">
                <p class="h5 text-center">
                  {{ auth_user.full_name }}
                </p>

                <div class="avatar mx-auto d-block">
                  <label class="avatar-input">
                    <span class="avatar avatar-lg">
                      <img
                        :src="`https://insurance-api.hayokmedicare.ng/image/${auth_user.user_image}`"
                        onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                        class="avatar-img rounded-circle"
                      />
                    </span>
                  </label>
                </div>
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <!-- <label for="inputPassword4"
                      ><strong>Select Payment Method: </strong></label -->

                    <!-- <select class="form-control" v-model="payment_type">
                      <option value="online">Pay Online</option>

                      <option value="offline">Pay Offline</option>
                    </select>  -->
                    <label for="inputPassword4"
                      ><strong
                        >Selected Plan: 
                      </strong></label
                    >
                    <select
                      class="form-control"
                      v-model="auth_user.plan_type"
                      disabled
                    >
                      <option
                        v-for="plan in selected_plan"
                        v-bind:key="plan.id"
                        :value="plan.plan_name"
                      >
                        {{ plan.plan_name }} Plan
                      </option>
                    </select>

                    <div
                      class="col-lg-12"
                      style="margin-top: 15px; margin-bottom: 15px"
                    >
                      <div class="card m-b-30 bg-dark">
                        <div class="card-body text-white">
                          <div class="pb-2 text-center">
                            <div class="avatar avatar-lg">
                              <div
                                class="avatar-title bg-soft-primary rounded-circle"
                              >
                                <i class="fe fe-credit-card"></i>
                              </div>
                            </div>
                          </div>

                          <div class="text-center">
                            <p class="h6">
                              {{ getPlan.description }}
                            </p>
                            <p>
                              <!-- Thank you for enrolling under the Osun Health
                                Insurance Scheme. The plan you selected covers
                                ONLY ONE PERSON for a period of 12 months at the
                                cost of #12,066.  -->
                              Upon payment, you will be able to access robust,
                              qualitative healthcare services as contained in
                              our benefit package. Please note that this
                              registration will be void if you do not proceed to
                              make payment. Should you have any difficulty in
                              making your payment, please call: 0700022556447 or
                              send us a mail at info@oshia.ng Thank you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <button
                    v-if="payment_type == 'online'"
                    type="button"
                    class="btn btn-outline-dark btn-block mx-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Proceed to Pay
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
                          <h5 class="modal-title h5" id="exampleModalLabel">
                            Payment Instruction
                          </h5>
                         
                        </div>

                        <div class="modal-body">
                          <p class="mb-4">Pay to the Account details below and upload evidence of payment.</p>

                          <div class="h6">
                           <p class="my-2"> <b>CORRESPONDENT BANK NAME: </b> 
                            <span>CITIBANK NA</span></p>

                           <p class="my-2">  <b>CORRESPONDENT BANK ADRESS: </b>
                            <span>NEW YORK, NY 10022-4617</span></p>

                          <p class="my-2">   <b>CORRESPONDENT BANK SWIFT CODE: </b>
                            <span>CITIUS33</span>  </p>
                            
                            
                            <p class="my-2"> <b>ROUTING NUMBER: </b>
                            <span>021000089</span> </p>
                          </div>
                          <div
                            class="fileinput fileinput-new"
                            data-provides="fileinput"
                          >
                            <span class="btn btn-file">
                              <span class="fileinput-new"
                                >Upload Payment Proof <i class="fe fe-upload"></i
                              ></span>
                              <span class="fileinput-exists">Change</span>
                              <input
                                type="file"
                                name="..."
                                multiple
                                v-on:change="attachPaymentProof"
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
                  <!-- ENd of Payment Modal -->
                </div>
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
        </div>
      </div>
    </section>
  </section>
</template>
  
  <script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
// import paystack from "vue-paystack";
import AddDependentVoluntary from "@/views/clients/AddDependentVoluntary.vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default {
  components: {
    Loading,
    // paystack,
    AddDependentVoluntary,
  },
  data() {
    return {
      transactionID: "",
      agency_id: "",
      paymentProofFile: "",
      auth_user: "",
      amount: "",
      payment_type: "online",
      showpay: false,
      showpic: true,
      showdependent: false,
      selected_plan: [
        {
          id: 1,
          plan_name: "Individual",
          description:
            "This Plan type is a General Plan package with a 12-month duration. It only covers one person (Principal). It grants you access to affordable and qualititative healthcare coverage. It allows no dependent(s).",
          plan_cost: 15,
          fee: 2,
        },
        {
          id: 2,
          plan_name: "Family",
          description:
            " This Plan type is a General Plan package with a 12-month duration. It covers 6 people (One Principal and 5 Dependents). It grants you access to affordable and qualititative healthcare coverage. It allows a Maximum of 5-dependent(s).",
          plan_cost: 15,
          fee: 2,
        },
      ],
      plan_id: null,
      // paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      paystackkey: "pk_live_1ec7b33187b214721539e421c5c89cd395502361", //paystack public key
      providers: "",
      singleplan: "",
      plans: "",
      image: "",
      imagefile: "",
      myplan: "",
      sms_message:
        "Thank you for choosing OHIS. You can come to our office to collect your ID Card in 3 weeks.",
      user: null,
      isLoading: false,
      fullPage: true,
      windowwith: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    getPlan() {
      let formatter = this.selected_plan.filter(
        (x) => x.plan_name == this.auth_user.plan_type
      );
      console.log(formatter);
      return formatter[0];
    },

    totalCost() {
      return 0;
    },

    randomTransId() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i <50; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      console.log({ result });
      return result;
    },
  },
  methods: {
    getUser() {
      this.axios
        .get(`/api/v1/user-no-auth/${this.$route.params.id}`)
        .then((response) => {
          this.auth_user = response.data.user;
          console.log(response);
          this.getShower(this.auth_user);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showPayPart() {
      this.showpay = true;
      this.showpic = false;
      this.showdependent = false;
    },
    getShower(user) {
      if (user.user_image == null) {
        this.showpay = false;
        this.showpic = true;
      } else {
        this.showPayPart();
      }
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
        .post("/api/v1/uploadUserImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (this.auth_user.plan_type == "Individual") {
            this.showpay = true;
            this.showpic = false;
          } else {
            this.showpay = false;
            this.showdependent = true;
            this.showpic = false;
          }
          this.isLoading = false;
          this.$toasted.info("Image added Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        });
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
        .post(`/api/v1/uploadcustomerpicImage`, {
          user_image: this.imagefile,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.success("Picture uploaded Successfully", {
            position: "top-center",
            duration: 3000,
          });
          if (this.auth_user.plan_type == "Individual") {
            this.showpay = true;
            this.showpic = false;
          } else {
            this.showpay = false;
            this.showdependent = true;
            this.showpic = false;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },

    addPayment() {
      if (confirm("Are you sure you want to Submit?")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/make/transaction`, {
            user_id: this.$route.params.id,
            agency_id: 95930,
            description: "Diaspora Payment",
            amount: 0.0,
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
      }

      setTimeout(() => {
        this.uploadPaymentProof();
      }, 3000);
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
        .post("/api/v1/uploadTransactionDocument", formData)
        .then((response) => {
          this.paymentProofImage = response.data.document;
          console.log(response.data.document);
          this.isLoading = false;
          this.$toasted.success("Payment Uploaded Successfully", {
            position: "top-center",
            duration: 3000,
          });

          this.$router.push(`/subscribe-success/${this.$route.params.id}`);
        });
    },
  },

  created() {
    this.getUser();
  },
};
</script>
  <style scoped>
</style>
  