<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <div class="bg-dark m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <p class="h4"><strong>Subscribe to a Plan</strong></p>
          </div>
        </div>
      </div>
    </div>
    <section class="pull-up" v-show="showpic">
      <div class="container">
        <div class="row list">
          <div class="col-lg-8 offset-lg-2">
            <div class="card m-b-30">
              <div class="card-header">
                <p class="h5 text-center">
                  {{ auth_user.firstname }} {{ auth_user.lastname }}
                </p>
              </div>

              <div class="card-body">
                <div class="form-row col-lg-8 offset-lg-2" >
                 
                 
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
                          type="button"
                          class="btn btn-info"
                           data-dismiss="modal"
                    aria-label="Close"
                          name="button"
                          @click="savePic"
                        >
                          Save pic
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

     <section class="pull-up" v-show="showpay">
      <div class="container">
        <div class="row list">
          <div class="col-lg-8 offset-lg-2">
            <div class="card m-b-30">
              <div class="card-header">
                <p class="h5 text-center">
                  {{ auth_user.firstname }} {{ auth_user.lastname }}
                </p>
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputPassword4"
                      ><strong
                        >Select Plan {{ auth_user.plan_type }}
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

                    <div
                      class="col-lg-12"
                      style="margin-top: 15px; margin-bottom: 15px"
                    >
                      <div class="card m-b-30 bg-dark">
                        <div class="card-body text-white">
                          <div class="pb-2 text-center">
                            <div class="avatar avatar-lg">
                              <div
                                class="
                                  avatar-title
                                  bg-soft-primary
                                  rounded-circle
                                "
                              >
                                <i class="fe fe-credit-card"></i>
                              </div>
                            </div>
                          </div>

                          <div class="text-center">
                            <p class="h6">
                              {{ getPlan.description }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12">
                  <paystack
                    :amount="getPlan.plan_cost * 100"
                    :email="auth_user.email"
                    :paystackkey="paystackkey"
                    :reference="reference"
                    :callback="callback"
                    :close="close"
                    :embed="false"
                  >
                    <button class="btn btn-dark btn-block btn-lg">
                      Proceed to Pay
                    </button>
                  </paystack>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="col-md-12">
                      <div class="card">

                      </div>

                    </div> -->

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
import Navbar from "@/views/Navbar.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
import paystack from "vue-paystack";

export default {
  components: {
    Navbar,
    Loading,
    paystack,
  },
  data() {
    return {
      hmos: "",
      agency_id: "",
      provider_id: "",
      auth_user: "",
      amount: "",
      showpay: false,
      showpic: true,
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
            "This Plan type is a General Plan package with 12-month duration. It grants you access to cheap and qualititative healthcare coverage. It allows no depandant(s).",
          plan_cost: 12066,
        },
        {
          id: 2,
          plan_name: "Family",
          description:
            " This Plan type is a General Plan package with 12-month duration. It grants you access to cheap and qualititative healthcare coverage. It allows a Maximum of 5-depandant(s).",
          plan_cost: 57600,
        },
      ],
      plan_id: null,
      paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      providers: "",
      singleplan: "",
      plans: "",
      image: "",
      imagefile: "",
      myplan: "",
      user: null,
      isLoading: false,
      fullPage: true,
    };
  },
  beforeMount() {
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
      // let newarr = [1,2, 3].filter(x=> x<2)
      // let osunlgaarray = this.tpa_Lga.lgas;
      let formatter = this.selected_plan.filter(
        (x) => x.plan_name == this.auth_user.plan_type
      );
      // this.wards_lga = formatter[0];
      console.log(formatter);
      return formatter[0];
    },

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
   
  },
  methods: {
    callback: function (response) {
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
          this.showpay = true;
          this.showpic = false;
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
        .post("/api/v1/auth/make/transaction", {
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
          // this.$router.push(`https://oshia.ng`)
          window.location = "https://www.oshia.ng";
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
          this.showpay = true;
          this.showpic = false;
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
