<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <div>
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar"></div>
              </div>
              <div class="h5">
                {{ dependent.full_name }}
                <span v-if="dependent.status == 'active'">
                  <button
                    type="button"
                    class="btn mx-2 badge badge-soft-success"
                  >
                    active
                  </button>
                </span>
                <span v-else>
                  <button
                    type="button"
                    class="btn mx-2 badge badge-soft-warning"
                  >
                    inactive
                  </button>
                </span>

                <router-link
                  :to="{
                    path: '/add-dependent/' + dependent.user_id,
                    params: {},
                  }"
                  class="btn btn-outline-dark mx-2"
                >
                  Go to Edit
                </router-link>

                <button class="btn btn-outline-primary spacer" @click="printMe">
                  Print <i class="fe fe-printer"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="" id="printDiv" ref="printNow">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header"></div>

                <div class="card-body row">
                  <div class="col-md-4">
                    <vue-initials-img
                      :name="dependent.firstname + ' ' + dependent.lastname"
                      class="text-center rounded-circle"
                      v-if="dependent.image == null"
                    />

                    <div class="" v-if="dependent.image != null">
                      <img
                        :src="`https://kampe.hayokmedicare.ng/image/${dependent.image}`"
                        class="img-thumbnail"
                      />
                    </div>
                  </div>

                  <div class="col-md-8">
                    <p class="spacer-top-bottom">
                      <strong>Name:</strong> {{ dependent.full_name }}
                    </p>
                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>KAMPE ID:</strong> {{ dependent.id_card_number }}
                    </p>

                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>Principal:</strong>
                      {{ dependent.user.full_name }} (
                      {{ dependent.user.id_card_number }} )
                    </p>
                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>Phone Number:</strong>
                      {{ dependent.phone_number }}
                    </p>
                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>LGA:</strong> {{ dependent.localgovt.local_name }}
                    </p>
                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>Date of Birth:</strong>
                      {{ dependent.dob | moment("dddd, MMMM Do YYYY") }}
                    </p>
                    <hr />
                    <p class="spacer-top-bottom">
                      <strong>Gender:</strong> {{ dependent.gender }}
                    </p>
                    <hr />
                    <!-- <p class="spacer-top-bottom">
                      <strong>Relationship Type:</strong>
                      {{ dependent.relationShipType }}
                    </p> -->
                    <hr />

                    <p class="spacer-top-bottom">
                      <strong>Expiry Date:</strong>
                      {{ dependent.expiry_date | moment("dddd, MMMM Do YYYY") }}
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

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

                      <canvas id="canvas" width="720px" height="550px"></canvas>
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
      dependent: "",
      notes: "",
      medications: "",
      image: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      agency_id: "",
      imagefile: "",
      pictureShower: true,
    };
  },
  mounted() {
    //
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getSpeicifDependant/${this.$route.params.id}`)
      .then((response) => {
        this.dependent = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    attachPic(event) {
      this.user = JSON.parse(localStorage.getItem("user"));

      console.log(event);
      // let files = event.target.files
      // let filename = event.target.files[0].name
      this.image = event.target.files[0];
      this.uploadPic();
    },
    uploadPic() {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));

      var formData = new FormData();
      formData.append("user_image", this.image);
      formData.append("dependant_id", this.$route.params.id);
      this.axios
        .post(
          "/api/v1/auth/uploadDependantImage",
          // {user_image: this.image, dependant_id: this.$route.params.id}
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify("Profile Image changed Successfully!", {
            position: "top-right",
          });
          this.fetchUser();
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

      // upload image

      // end of upload image
    },

    savePic() {
      this.axios
        .post(`/api/v1/auth/uploadcustomerpicImage`, {
          user_image: this.imagefile,
          user_id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.$breadstick.notify("Profile Image changed Successfully!", {
            position: "top-right",
          });
          this.fetchUser();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getSpeicifDependant/${this.$route.params.id}`)
        .then((response) => {
          this.dependent = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    uploadPicSnapped() {
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
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>
<style >
.spacer {
  margin-left: 15px;
}
.spacer-top-bottom {
  margin-top: 7px;
  margin-bottom: 7px;
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
