<template>
  <section class="admin-content" id="contact-search">
   
    <section>
      <div class="container">
        <div class="row list">
          <div class="col-lg-12 col-md-12">
            <div class="card m-b-30">
              <div class="card-header">
                <button
                  type="button"
                  @click="addArray()"
                  class="btn btn-text"
                >
                Add User(s)  <i class="fe fe-users"></i>
                </button>

              </div>

              <div
                class="card-body"
                v-for="(dependent, index) in dependents"
                :key="dependent"
              >
                <div class="row">
                  <div class="col-md-3"
                  v-show="false"
                  >
                    <div class="form-row">
                      <img
                        :src="`${dependent.user_image}`"
                        class="rounded"
                        alt="User Photo"
                        onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
                      />

                      <div class="form-group col-md-12 mt-2 text-center  mx-auto ">
                        <button
                          class="btn btn-outline-dark"
                          type="button"
                          @click="takePicAndroid(index)"
                        >
                          Capture <i class="fe fe-camera"></i>
                        </button>

                        <div
                          class="fileinput fileinput-new"
                          data-provides="fileinput"
                        >
                          <span class="btn btn-file">
                            <span class="fileinput-new"
                              >Upload <i class="fe fe-upload"></i
                            ></span>
                            <span class="fileinput-exists">Change</span>
                            <input
                              type="file"
                              name="..."
                              multiple
                              v-on:change="attachPic($event, index)"
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

                  <div class="col-md-12 row">
                    <div class="form-group col-md-4">
                      <label for="inputPassword4">Surname </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="dependent.lastname"
                        placeholder="Surname"
                      />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="inputEmail4">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        v-model="dependent.firstname"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputPassword4">Middle Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Middle Name"
                        v-model="dependent.middle_name"
                      />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="inputCity">Gender</label>

                      <select class="form-control" v-model="dependent.gender">
                        <option id="Male">Male</option>
                        <option id="Female">Female</option>
                      </select>
                    </div>

                    <div class="form-group col-md-4">
                      <label for="inputCity">Date of Birth </label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="YYYY/MM/DD"
                        v-model="dependent.dob"
                      />
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
                  </div>

                  <div class="form-group col-md-12">
                      <p class="h4">Underlying Health Conditions </p>
                      <label
                        class="cstm-switch"
                        v-for="condition in conditions"
                        :key="condition"
                      >
                        <input
                          type="checkbox"
                      
                          v-model="dependent.conditions"
                          :value="condition"
                          class="cstm-switch-input"
                        />
                        <span class="cstm-switch-indicator"></span>
                        <span class="cstm-switch-description mr-4">
                          {{ condition.encounter_outcome }}
                        </span>
                      </label>
                    </div>
                </div>

                <div class="form-group row">
                  <div class="row col-md-6">
                    <button
                      type="button"
                      @click="addArray()"
                      class="btn btn-outline-info btn-block"
                    >
                      <i class="fe fe-plus"></i>
                    </button>
                  </div>

                  <div class="col-md-6">
                    <button
                      type="button"
                      @click="removeArray(index)"
                      class="btn btn-outline-danger btn-block"
                    >
                      <i class="fe fe-delete"></i>
                    </button>
                  </div>
                </div>
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
    </section>
  </section>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import conditionsJSON from "@/jsons/conditions.json";


export default {
  components: {
    Loading,
  },
  data() {
    return {
      user: null,
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
      conditions: conditionsJSON,
      dependents: [
       
      ],
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
    addArray() {
      this.dependents.push({
        firstname: "",
        lastname: "",
        middlename: "",
        institution_attending: "",
        email: "",
        phone_number: "",
        relationShipType: "None",
        gender: "",
        lga: "",
        dob: "",
        provider: "",
        user_image: "",
        conditions: [],
      });
      this.$emit('clicked', this.dependents);  

    },
    removeArray(index) {
      this.dependents.splice(index, 1); // 2nd parameter means remove one item only
      this.$emit('clicked', this.dependents);  

      console.log(this.dependents);
    },

    attachPic(event,index) {
      let imageFile = event.target.files[0];
      console.log(index)
      if (imageFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // The result contains the Base64 string
          let base64Data = e.target.result;
          console.log(base64Data); // You can use the Base64 string here
          this.dependents[index].user_image = base64Data;
        };

        reader.readAsDataURL(imageFile);
      }
    },

    async takePicAndroid(index) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      var imageUrl = image.base64String;
      this.dependents[index].user_image = "data:image/png;base64," + imageUrl;
     
    },

    uploadPicture(dependent_id) {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("user_image", this.image);
      formData.append("dependant_id", dependent_id);
      this.axios
        .post("/api/v1/uploadDependantImage", formData, {
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

    savePic(dependent_id) {
      this.isLoading = true;
      this.axios
        .post(`/api/v1/uploadDependantImage/canvas`, {
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

  

   
  },
  created() {},
};
</script>
