<template>
  <section class="admin-content" id="contact-search">
    <Navbar />

    <div class="bg-info m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-10">
            <div class="m-b-10"></div>
            <strong class="h4 spacer-top">Manage Dependents </strong>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row list">
          <div class="col-lg-12 col-md-12">
            <div class="card m-b-30">
              <div class="card-header text-center">
                <strong>Add Dependent ({{ client.id_card_number }}) </strong>
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">Relationship Type</label>

                    <select
                      class="form-control"
                      v-model="dependent.relationShipType"
                    >
                      <option value="Spouse A">Spouse</option>
                      <option value="Child B">Child 1</option>
                      <option value="Child C">Child 2</option>
                      <option value="Child D">Child 3</option>
                      <option value="Child E">Child 4</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputCity">Gender</label>

                    <select class="form-control" v-model="dependent.gender">
                      <option id="Male">Male</option>
                      <option id="Female">Female</option>
                    </select>
                  </div>

                  <div
                    class="form-group col-md-6"
                    v-if="dependent.relationShipType != 'Spouse'"
                  >
                    <label for="inputPassword4">Surname </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="dependent.lastname"
                      placeholder="Surname"
                    />
                  </div>

                  <div
                    class="form-group col-md-6"
                    v-if="dependent.relationShipType == 'Spouse'"
                  >
                    <label for="inputPassword4">Surname </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="dependent.lastname"
                      placeholder="Surname"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputEmail4">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      v-model="dependent.firstname"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Middle Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Middle Name"
                      v-model="dependent.middle_name"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputCity">Date of Birth </label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="YYYY/MM/DD"
                      v-model="dependent.dob"
                    />
                  </div>

                  <div class="form-group col-md-4">
                    <label for="inputCity">Date of Expiry: </label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="YYYY/MM/DD"
                      v-model="dependent.expiry_date"
                    />
                    <p class="text-info">
                      Principal Expiry: {{ client.expiry_date }}
                    </p>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="inputPassword4">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Mobile No"
                      :value="dependent.phone_number"
                    />
                  </div>

                  <div class="form-group col-md-4">
                    <label for="inputCity">Kampe ID: </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="KMPE/XX/XXX"
                      v-model="dependent.id_card_number"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <button
                    class="btn btn-info spacer"
                    @click="streamPic"
                    data-toggle="modal"
                    data-target="#example_01"
                  >
                    Snap Photo <i class="fe fe-camera"></i>
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

                <div class="form-group">
                  <button
                    class="btn btn-info btn-block btn-lg"
                    @click="submitForm"
                  >
                    Submit <i class="fe fe-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 m-b-30">
          <h5><i class="fe fe-users"></i>{{ dependents.length }} Dependents</h5>
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>ID Number</th>
                  <th>DOB (Date of Expiry)</th>
                  <th>Gender</th>
                  <!-- <th>Relationship</th> -->
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dependent in dependents" v-bind:key="dependent.id">
                  <td>
                    <vue-initials-img
                      :name="dependent.firstname + ' ' + dependent.lastname"
                      class="img-thumbnail"
                      size="25"
                      v-if="dependent.image == null"
                    />

                    <div
                      class="avatar avatar-md"
                      v-if="dependent.image != null"
                    >
                      <img
                        :src="`https://kampe.hayokmedicare.ng/image/${dependent.image}`"
                        class="avatar-img avatar-lg rounded"
                        onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <router-link :to="{ path: '/dependent/' + dependent.id }">
                      {{ dependent.full_name }}
                    </router-link>
                  </td>
                  <td>{{ dependent.id_card_number }}</td>
                  <td>{{ dependent.dob }} ({{ dependent.expiry_date }})</td>
                  <td>{{ dependent.gender }}</td>
                  <!-- <td>{{ dependent.relationShipType }}</td> -->
                  <td>
                    <router-link :to="{ path: '/dependent/' + dependent.id }">
                      <button class="btn btn-default" name="button">
                        <i class="fe fe-eye m-1"></i>
                      </button>
                    </router-link>

                    <button
                      class="btn btn-outline-info m-1"
                      name="button"
                      @click="editDep(dependent)"
                    >
                      <i class="fe fe-edit"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger m-1"
                      name="button"
                      @click="deleteDep(dependent)"
                    >
                      <i class="fe fe-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal for Capture Picture -->
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
                      <button
                        @click="takePic"
                        class="bg-navy btn btn-flat my-1"
                      >
                        Snap Photo
                      </button>
                    </p>

                    <canvas id="canvas" width="720px" height="550px"></canvas>
                  </div>

                  <!-- <div class="col-md-12 mt-2"> -->
                  <button
                    type="button"
                    class="btn btn-outline-info btn-block"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Continue
                  </button>
                  <!-- </div> -->
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
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
// import Datepicker from 'vuejs-datepicker';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      dependents: "",
      client: "",
      edit: false,
      isLoading: false,
      fullPage: true,
      states: "",
      providers: "",
      state: "",
      lga_states: "",
      dependent_id: "",
      imagefile: "",
      image: "",
      upload_pic: false,
      dependent: {
        firstname: "",
        lastname: "",
        middlename: "",
        institution_attending: "",
        email: "",
        phone_number: "",
        relationShipType: "Spouse A",
        gender: "",
        lga: "",
        dob: "",
        provider: "",
        id_card_number: "",
        expiry_date: "",
      },
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
  beforeMount() {
    //
  },
  computed: {
    getAge() {
      var today = new Date();
      var birthDate = new Date(this.dependent.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    getExpiry() {
      if (this.dependent.relationShipType == "Spouse A") {
        return this.client.expiry_date;
      } else {
        var today = new Date();
        var principalExpiry = new Date(this.client.expiry_date);
        var principalExpYear = principalExpiry.getFullYear();

        var birthDate = new Date(this.dependent.dob);
        // var year = birthDate.getFullYear();
        var month = birthDate.getMonth();
        var day = birthDate.getDate();
        month;
        day;
        let remainingYears = 18 - this.getAge;
        let finaldate = today.getFullYear() + remainingYears;
        // return  year  + '/' + principalExpYear + '/' + month + '/' + day + '/'+ finaldate
        if (finaldate > principalExpYear) {
          return this.client.expiry_date;
        } else {
          // return  finaldate + '-' + month + '-' + day
          return finaldate + "-12-31";
        }
      }
    },
    getIdNum() {
      if (this.dependent.relationShipType == "Spouse") {
        return "KAMPE/DEP-S/" + this.$route.params.id;
      } else {
        return (
          "KAMPE/DEP-C" +
          this.dependent.relationShipType.slice(-1) +
          "/" +
          this.$route.params.id
        );
      }
    },
  },
  methods: {
    attachPic(event) {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(event);
      this.image = event.target.files[0];
      this.upload_pic = true;
    },
    streamPic() {
      this.upload_pic = false;
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
    uploadPicture(dependent_id) {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("user_image", this.image);
      formData.append("dependant_id", dependent_id);
      this.axios
        .post("/api/v1/auth/uploadDependantImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$breadstick.notify("Profile Image changed Successfully!", {
            position: "top-center",
          });
          this.fetchUser();
        });
    },

    takePic() {
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, 480, 400);
      // get image
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      console.log(image);
      localStorage.setItem("snap", this.imagefile.src);
      this.imagefile = image.src;
      this.upload_pic = false;
    },
    savePic(dependent_id) {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/uploadDependantImage/canvas`, {
          image: this.imagefile,
          dependant_id: dependent_id,
        })
        .then((response) => {
          console.log(response);
          this.getDependents();
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
    getDependents() {
      this.user = JSON.parse(localStorage.getItem("user"));
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

    submitForm() {
      this.addDependant();
    },

    addDependant() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.client);
      if (this.edit === false) {
        // Add dependent
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/addDependant", {
            firstname: this.dependent.firstname,
            lastname: this.dependent.lastname,
            middle_name: this.dependent.middle_name,
            institution_attending: this.dependent.institution_attending,
            relationShipType: this.dependent.relationShipType.slice(0, -1),
            user_id: this.$route.params.id,
            email: this.dependent.email,
            expiry_date: this.dependent.expiry_date,
            phone_number: this.client.phone_number,
            gender: this.dependent.gender,
            state: 2676,
            lga: this.client.localgovt,
            dob: this.dependent.dob,
            provider: this.client.provider_id,
            enrolled_by: this.user.id,
            agency_id: 439078,
            id_card_number:
              this.client.id_card_number +
              "/" +
              this.dependent.relationShipType.slice(
                this.dependent.relationShipType.length - 1
              ),
          })

          .then((response) => {
            console.log(response);
            let dependent_id = response.data.dependent.id;
            this.clearIt();

            if (this.upload_pic == true) {
              this.uploadPicture(dependent_id);
            } else {
              this.savePic(dependent_id);
            }

            this.isLoading = false;
            this.$toasted.success("Dependent added Successfully", {
              position: "top-center",
              duration: 3000,
            });
            this.getDependents();
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toasted.error("uploading error, recheck the fields", {
              position: "top-center",
              duration: 3000,
            });
            console.log(error.response);
          });
      } else {
        // Update
        this.isLoading = true;
        this.axios
          .put(`/api/v1/auth/editDependant/${this.dependent_id}`, {
            firstname: this.dependent.firstname,
            // lastname: this.getSurname ? this.getSurname : this.dependent.lastname,
            lastname: this.dependent.lastname,
            middle_name: this.dependent.middle_name,
            institution_attending: this.dependent.institution_attending,
            relationShipType: this.dependent.relationShipType.slice(0, -1),
            user_id: this.$route.params.id,
            email: this.dependent.email,
            phone_number: this.client.phone_number,
            gender: this.dependent.gender,
            expiry_date: this.dependent.expiry_date,
            id_card_number: this.dependent.id_card_number,
            dob: this.dependent.dob,
            state: 2676,
            lga: this.client.localgovt,
            provider: this.client.provider_id,
          })

          .then((response) => {
            console.log(response);
            let dependent_id = this.dependent_id;
            this.savePic(dependent_id);
            this.edit = false;
            this.isLoading = false;
            this.$toasted.success("Dependent Updated Successfully!", {
              position: "top-center",
              duration: 3000,
            });
            this.getDependents();
            this.clearIt();
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;

            this.$toasted.error("Error!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    deleteDep(dependent) {
      if (confirm("Are you sure you want to delete?")) {
        this.axios
          .delete(`/api/v1/auth/deletedependent/${dependent.id}`)
          .then((response) => {
            console.log(response);
            this.$toasted.success("Dependent deleted Successfully!", {
              position: "top-center",
              duration: 3000,
            });
            this.getDependents();
          })
          .catch((error) => {
            console.error(error);
            this.$toasted.error("Error!", {
              position: "top-center",
              duration: 3000,
            });
          });
      }
    },
    editDep(dependent) {
      this.edit = true;
      this.dependent_id = dependent.id;
      this.dependent.firstname = dependent.firstname;
      this.dependent.lastname = dependent.lastname;
      this.dependent.middle_name = dependent.middle_name;
      this.dependent.relationShipType =
        dependent.relationShipType +
        " " +
        dependent.id_card_number.slice(dependent.id_card_number.length - 1);
      this.dependent.gender = dependent.gender;
      this.dependent.dob = dependent.dob;
      this.dependent.expiry_date = dependent.expiry_date;
      this.dependent.phone_number = dependent.phone_number;
      this.dependent.id_card_number = dependent.id_card_number;
    },
    clearIt() {
      this.dependent.firstname = "";
      this.dependent.lastname = "";
      this.dependent.middle_name = "";
      this.dependent.email = "";
      this.dependent.phone_number = "";
      this.dependent.relationShipType = "";
      this.dependent.gender = "";
      this.dependent.middlename = "";
      this.dependent.institution_attending = "";
      this.dependent.dob = "";
      this.dependent.expiry_date = "";
    },

    singleClient() {
      this.axios
        .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then((response) => {
          this.client = response.data.user;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async takePicAndroid(index) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      var imageUrl = image.base64String;
      this.dependents[index].image = "data:image/png;base64," + imageUrl;
    },
  },
  created() {
    this.getDependents();
    this.singleClient();
  },
};
</script>
