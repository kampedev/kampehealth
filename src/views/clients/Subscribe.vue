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
        <button class="btn btn-dark btn-block btn-lg" @click="showPayPart">
          Proceed to Payment
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
                </div>
              </div>
            </div>
          </div>

          <!-- Modal for Snap Picture -->
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
                        <button @click="takePic" class="bg-navy btn btn-flat">
                          Snap Photo
                        </button>
                        <button
                          v-if="imagefile != ''"
                          type="button"
                          class="btn btn-info"
                          data-dismiss="modal"
                          aria-label="Close"
                          name="button"
                          @click="savePic"
                        >
                          Save Photo
                        </button>
                      </p>

                      <canvas id="canvas" width="600px" height="450px"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Ends -->

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
                    <label for="inputPassword4"
                      ><strong>Select Payment Method: </strong></label
                    >
                    <select class="form-control" v-model="payment_type">
                      <option value="online">Pay Online</option>

                      <option value="offline">Pay Offline</option>
                    </select>
                    <label for="inputPassword4"
                      ><strong
                        >Selected Plan: {{ auth_user.plan_type }}
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
                        {{ plan.plan_name }} Plan (&#8358;
                        {{ plan.plan_cost | numeral(0, 0) }} )
                      </option>
                    </select>
                    <p class="h6 spacer-top-bot">
                      Fee: &#8358; {{ getPlan.fee }}
                    </p>
                    <hr />
                    <p class="h5 spacer-top-bot">
                      <b
                        >Total: &#8358;
                        {{ (getPlan.plan_cost + getPlan.fee) | numeral(0, 0) }}
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

                <div class="col-lg-12">
                  <paystack
                    :amount="totalCost * 100"
                    :email="auth_user.email"
                    :paystackkey="paystackkey"
                    :reference="reference"
                    :callback="callback"
                    :first_name="auth_user.firstname"
                    :last_name="auth_user.lastname"
                    :phone="auth_user.phone_number"
                    :close="close"
                    :embed="false"
                    v-if="payment_type == 'online'"
                  >
                    <button class="btn btn-dark btn-block btn-lg">
                      Proceed to Pay (Online)
                    </button>
                  </paystack>

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
                  <h5 class="modal-title" id="exampleModalLabel">
                    Enter the USSD Code below into your mobile device
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
                  <p>Virual Account Number: {{ auth_user.virtual_account }}</p>
                  <p>*BankCode*SchemeCode*BillerId+UserIdentifier+Amount#</p>
                  <p>
                    *894*000*506+{{ auth_user.virtual_account }}+
                    {{ getPlan.plan_cost }}
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
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
import paystack from "vue-paystack";
import AddDependentVoluntary from "@/views/clients/AddDependentVoluntary.vue";

export default {
  components: {
    Loading,
    paystack,
    AddDependentVoluntary,
  },
  data() {
    return {
      hmos: "",
      agency_id: "",
      provider_id: "",
      auth_user: "",
      amount: "",
      payment_type: "online",
      showpay: false,
      showpic: true,
      showdependent: false,
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
      selected_plan: [
        {
          id: 1,
          plan_name: "Individual",
          description:
            "This Plan type is a General Plan package with a 12-month duration. It only covers one person (Principal). It grants you access to cheap and qualititative healthcare coverage. It allows no depandent(s).",
          plan_cost: 12066,
          fee: 280.99,
        },
        {
          id: 2,
          plan_name: "Family",
          description:
            " This Plan type is a General Plan package with a 12-month duration. It covers 6 people (One Principal and 5 Dependents). It grants you access to cheap and qualititative healthcare coverage. It allows a Maximum of 5-depandent(s).",
          plan_cost: 57600,
          fee: 964.0,
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
    getPlan() {
      let formatter = this.selected_plan.filter(
        (x) => x.plan_name == this.auth_user.plan_type
      );
      console.log(formatter);
      return formatter[0];
    },

    totalCost() {
      return this.getPlan.plan_cost + this.getPlan.fee;
    },

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
          agency_id: 95930,
          amount: this.getPlan.plan_cost,
          description: "OHIS Plan Payment",
          type: "plan_payment",
          transaction_ref: this.reference,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.info(
            "Congratulations you have successfully enrolled to O'HIS",
            { position: "top-center", duration: 8000 }
          );
          this.isLoading = false;
          // window.location = "https://www.oshia.ng";
          this.$router.push(`/subscribe-success/${this.$route.params.id}`);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    streamPic() {
      console.log("hello pic");

      var video = document.getElementById("video");
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices
          .getUserMedia(this.video_settings)
          .then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
          });
      }
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
          sender_name: "OHIS",
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
