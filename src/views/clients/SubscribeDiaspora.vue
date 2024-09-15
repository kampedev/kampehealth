<template>
  <section class="admin-content" id="contact-search">
    <div class="bg-info m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <p class="h4"><strong>Complete Registration Diaspora</strong></p>
          </div>
        </div>
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
                        onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                        class="avatar-img rounded-circle"
                      />
                    </span>
                  </label>
                </div>
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputPassword4"
                      ><strong
                        >Selected Plan: {{ singleplan.name }}
                      </strong></label
                    >

                    <select class="form-control" v-model="singleplan">
                      <option
                        v-for="plan in plans"
                        v-bind:key="plan.id"
                        :value="plan"
                      >
                        {{ plan.name }} ($ {{ plan.price | numeral(0, 0) }} )
                      </option>
                    </select>
                    <!-- <p class="h6 spacer-top-bot">
                      Fee: $ {{ getPlan.fee }}
                    </p> -->
                    <hr />
                    <p class="h5 spacer-top-bot">
                      <b
                        >Total: $

                        {{ singleplan.price | numeral(0, 0) }}

                        <!-- {{ (getPlan.plan_cost + getPlan.fee) | numeral(0, 0) }} -->
                      </b>
                    </p>

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
                            <p>
                              Upon payment, you will be able to access robust,
                              qualitative healthcare services as contained in
                              our benefit package. Please note that this
                              registration will be void if you do not proceed to
                              make payment. Should you have any difficulty in
                              making your payment, please call: 070000xxxx or
                              send us a mail at info@kampe.com Thank you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-lg-12">
                  <div class="col-md-12">
                    <button
                      class="btn btn-outline-success btn-block"
                      data-toggle="modal"
                      data-target="#eofflineModal"
                    >
                      Pay with Wallx
                    </button>
                  </div>
                </div>

                <div class="col-lg-12">
                  <!--  <button class="btn btn-dark btn-block btn-lg">
                      Proceed to Pay (Online)
                    </button> -->

                  <button
                    class="btn btn-dark btn-block btn-lg"
                    v-if="payment_type == 'offline'"
                    data-toggle="modal"
                    data-target="#eofflineModal"
                  >
                    Pay Offline (USSD)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            id="eofflineModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title h5" id="exampleModalLabel">
                    Enter your Details
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form action="" @submit.prevent="wallxPay">
                    <div class="form-group col-md-12">
                      <label>Wallx Pin</label>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="11"
                        class="form-control"
                        v-model="wallx.pin"
                        placeholder="Pin"
                      />
                    </div>
                    <div class="form-group col-md-12">
                      <label>Wallx Secret </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="wallx.secret"
                        placeholder="Secret"
                      />
                    </div>

                    <div class="form-group col-md-12">
                      <button class="btn btn-info btn-block" type="submit">
                        Submit
                      </button>
                    </div>

                    <div class="col-md-12 mt-4">
                      <p>
                        Go to
                        <a
                          href="https://play.google.com/store/apps/details?id=co.wallx.android&pcampaignid=web_share"
                          target="_blank"
                          class="text-info font-bold"
                          rel="noopener noreferrer"
                          >Google Playstore</a
                        >
                        to Create your Pay Code.
                      </p>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <!-- <button type="button" class="btn btn-primary">
                    Save changes
                  </button> -->
                </div>
              </div>
            </div>
          </div>
          <!--End of  Modal -->

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
import plansJSON from "@/jsons/diaspora_plans.json";

export default {
  components: {
    Loading,
    // paystack,
    AddDependentVoluntary,
  },
  data() {
    return {
      hmos: "",
      agency_id: "",
      provider_id: "",
      auth_user: "",
      amount: "",
      plans: plansJSON,
      singleplan: "",
      payment_type: "online",
      showpay: true,
      showpic: false,
      showdependent: false,
      wallx: {},
      plan_id: null,
      // paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      paystackkey: "pk_test_20ff6d54c8989ced65531801332aa63934c7ce15", //paystack public key
      providers: "",
      image: "",
      imagefile: "",
      myplan: "",
      sms_message:
        "Thank you for choosing KAMPE. You can come to our office to collect your ID Card in 3 weeks.",
      user: null,
      isLoading: false,
      fullPage: true,
    };
  },
  beforeMount() {
    this.windowwith = window.innerWidth * 0.75;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/user-no-auth/${this.$route.params.id}`)
      .then((response) => {
        this.auth_user = response.data.user;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    // getPlan() {
    //   let formatter = this.selected_plan.filter(
    //     (x) => x.plan_name == this.auth_user.plan_type
    //   );
    //   console.log(formatter);
    //   return formatter[0];
    // },

    // totalCost() {
    //   return this.getPlan.plan_cost + this.getPlan.fee;
    // },

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    showPayPart() {
      this.showpay = true;
      this.showpic = false;
      this.showdependent = false;
    },

    wallxPay() {
      this.axios
        .post(`https://business.wallx.co/api-v1/claim_paycode`, {
          merchant_id: "WallX-00000220", // Your business's merchant ID
          pin: this.wallx.pin,
          secret: this.wallx.secret,
          amount: this.singleplan.price,
          currency: "USD", // Options: NGN, USD, CAD
        })
        .then((response) => {
          this.$toasted.info("Payment completed Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.sendSMS();
          this.makeSubscribe();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          this.$toasted.error("Insufficient Balance", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    callback: function (response) {
      this.sendSMS();
      this.makeSubscribe();
      console.log(response);
    },
    close: function () {
      console.log("Payment closed");
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

    makeSubscribe() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/make/transaction", {
          agency_id: 439078,
          amount: this.singleplan.price,
          description: this.singleplan.name,
          type: "subscription",
          transaction_ref: this.reference,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.info(
            "Congratulations you have successfully enrolled to KAMPE",
            { position: "top-center", duration: 8000 }
          );
          this.isLoading = false;
          // window.location = "https://www.Kampe.ng";
          this.$router.push(`/subscribe-success-${this.$route.params.id}`);
        })
        .catch((error) => {
          console.log(error.response);
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
    sendSMS() {
      this.isLoading = true;
      this.axios
        .post(`https://app.multitexter.com/v2/app/sms`, {
          email: "wearegrumie@gmail.com",
          password: "AGYkh.EUddNx4j@",
          message: this.sms_message,
          sender_name: "KAMPE",
          recipients: this.auth_user.phone_number,
        })
        .then((response) => {
          console.log(response);

          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },

  created() {
    //
  },
};
</script>
<style scoped>
.spacer-top-bot {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
