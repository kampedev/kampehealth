<template>
  <section class="admin-content " id="contact-search">
    <!-- <Navbar /> -->

    <div class="bg-dark m-b-30">
      <div class="container">
        <div class="row p-b-60 p-t-60">
          <div class="col-md-6 text-center mx-auto text-white p-b-30">
            <div class="m-b-10">
              <div class="avatar ">
                <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
              </div>
            </div>
            <h3 class="h4">Change Of Health Care Provider</h3>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row list" v-show="show">
          <div class="col-lg-12 col-md-12">
            <div class="card m-b-30">
              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">Enrollee OHIS Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your OHIS Number"
                      v-model="searchkey"
                      @change="searchIDCard"
                    />
                    <button class="btn btn-success mt-3">Search</button>
                  </div>

                  <div
                    class="form-group col-md-6"
                    v-if="enrollee_details != ''"
                  >
                    <label for="inputCity">Client Surname</label>
                    <input
                      type="text"
                      class="form-control"
                      :value="enrollee_details.user.lastname"
                      disabled
                    />
                  </div>

                  <div
                    class="form-group col-md-6"
                    v-if="enrollee_details !== ''"
                  >
                    <label for="inputCity">Client First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      :value="enrollee_details.user.firstname"
                      disabled
                    />
                  </div>
                  <div
                    class="form-group col-md-6"
                    v-if="enrollee_details !== ''"
                  >
                    <label for="inputCity">Client Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      :value="enrollee_details.user.phone_number"
                    />
                  </div>
                  <div
                    class="form-group col-md-6"
                    v-if="
                      enrollee_details != '' &&
                        enrollee_details.user.place_of_work != null
                    "
                  >
                    <label for="inputCity">MDA</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      disabled
                      :value="enrollee_details.user.place_of_work"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputCity">Reason for Change</label>
                    <select
                      rows="5"
                      cols="80"
                      class="form-control"
                      v-model="transfer.reason_for_change"
                    >
                      <option value="Change of location"
                        >Change of location</option
                      >
                      <option value="Poor service delivery"
                        >Poor service delivery</option
                      >
                      <option value="Extortion/Over-billing"
                        >Extortion/Over-billing</option
                      >
                      <option value="Facility Disaccreditation"
                        >Facility Disaccreditation</option
                      >
                      <option value="Proximity to new facility"
                        >Proximity to new facility</option
                      >
                    </select>
                    <label for="inputCity" class="mt-3"
                      >Full Residential Address:</label
                    >
                    <input
                      rows="5"
                      cols="80"
                      class="form-control"
                      v-model="search_result.address1"
                      placeholder="Please Enter Your Full Home Address"
                    />

                    <!-- <input type="text" class="form-control"  placeholder="Reason for Change" v-model="transfer.reason_for_change"> -->
                  </div>
                </div>
                <div class="row col-md-12" v-if="enrollee_details != ''">
                  <!-- <textarea name="name" rows="8" cols="80" class="form-control" v-model="claim.treatment"></textarea> -->
                  <div class="col-md-12 text-center">
                    <p class="h4">Change of HCP</p>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputCity">From Facility</label>
                    <input
                      type="text"
                      class="form-control"
                      :value="enrollee_details.provider.agency_name"
                      disabled
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">New Facility</label>
                    <v-select
                      v-model="transfer.new_health_facility"
                      :options="providers"
                      label="agency_name"
                      :value="transfer.new_health_facility"
                      @input="selected"
                    ></v-select>
                  </div>
                </div>

                <div class="col-md-4 offset-md-4">
                  <img
                    :src="
                      `https://api.hayokinsurance.com/image/${enrollee_details.user.user_image}`
                    "
                    class="img spacer-top"
                    alt="User Photo"
                    v-if="
                      enrollee_details != '' &&
                        enrollee_details.user.user_image != null
                    "
                    onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                  />

                  <div
                    class="fileinput fileinput-new"
                    data-provides="fileinput"
                  >
                    <span class="btn btn-file">
                      <button class="btn btn-success">
                        Upload Picture <i class="fe fe-upload"></i>
                      </button>
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

                <span class="notice">
                  <h3 class="notice__heading">
                    Please Note:
                  </h3>
                  <p class="note__content">
                    That this change wiil take effect on the next panel list
                    which will be received by the new facility on the first week
                    of next month. Meanwhile, you can still be accessing care in
                    your current facility pending the approval and
                    implementation of your request. Should you have any further
                    questions or inquiries, please call: 0700022556447 or send
                    us an email via info@oshia.ng.
                  </p>
                </span>

                <div class="form-group">
                  <button
                    class="btn btn-primary btn-block btn-lg"
                    @click="makeRequest"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </section>
</template>

<script>
// import Navbar from "@/views/Navbar.vue";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    // Navbar,
    Loading,
  },
  data() {
    return {
      // editor: ClassicEditor,
      user: null,
      search_result: "",
      enrollee_details: "",
      searchkey: "",
      transfers: "",
      quickref: "",
      image: "",
      card_style: "col-md-12",
      edit: false,
      isLoading: false,
      show: true,
      fullPage: true,
      transfer: {
        reason_for_change: "",
        client_id: "",
        new_health_facility: "",
        previous_health_facility: "",
        status: "",
        prepared_by: "",
      },
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    //
  },
  methods: {
    selected(value) {
      this.transfer.new_health_facility = value;
    },

    clearIt() {
<<<<<<< HEAD
      this.search_result = "";
      this.enrollee_details = "";
      this.searchkey = "";
      this.transfers = "";
      this.quickref = "";
      this.image = "";
=======
      this.transfer.reason_for_change = "";
      this.transfer.new_health_facility = "";
      this.transfer.previous_health_facility = "";
      this.transfer.status = "";
      this.transfer.prepared_by = "";
      this.searchkey = "";
      this.enrollee_details = "";
>>>>>>> bde8ca7bc8279b068903f2b8f90392a62a8e8e2f
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
      formData.append("user_id", this.enrollee_details.user.id);
      this.axios
        .post("/api/v1/uploadUserImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.searchIDCard();

          this.isLoading = false;
          this.$toasted.info("Image added Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
   
   
    searchIDCard() {
      this.loading = true;
      this.axios
        .post(`/api/v1/auth/getuserbyIdcard`, {
          id_card_number: this.searchkey,
        })
        .then((response) => {
          this.search_result = response.data.data;
          // this.enrollee_details = response.data.data
          //Get Enrollee Details
          this.axios
            .get(`/api/v1/auth/user/zam/${this.search_result.id}`)
            .then((response) => {
              this.enrollee_details = response.data;
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          //End of Enrollee Details
          console.log(response);
          // this.$router.push(`/client/${user.id}`)
          this.$toasted.info("Searched Successfully", {
            position: "top-center",
            duration: 3000,
          });

          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
          this.$toasted.info("User not Found", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    getClient() {
      this.axios
        .get(`/api/v1/auth/user/${this.claim.client_id}`)
        .then((response) => {
          this.client = response.data.user;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/providerAgency/95930`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    AllTransfers() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/all/change_providers/95930`)
        .then((response) => {
          this.transfers = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    makeRequest() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.edit === false) {
        // Add claim
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/change_providers", {
            client_id: this.search_result.id,
            prepared_by: this.user.id,
            agency_id: 95930,
            new_health_facility: this.transfer.new_health_facility.id,
            previous_health_facility: this.search_result.provider_id,
            phone_number: this.enrollee_details.user.phone_number,
            address: this.search_result.address,
            status: "created",
            reason_for_change: this.transfer.reason_for_change,
          })

          .then((response) => {
            console.log(response);
            this.AllTransfers();
            this.search_result = "";
            this.enrollee_details = "";
            this.searchkey = "";
            this.transfers = "";
            this.quickref = "";
            this.image = "";
            this.isLoading = false;
            this.$toasted.info("Request submitted Successfully", {
              position: "top-center",
              duration: 3000,
            });

          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        // Update
        this.isLoading = true;
        this.axios
          .put("/api/v1/auth/addDependant", {
            topic_id: this.topic.id,
            topic_name: this.topic.topic_name,
            // module_id: this.course.id,
            module_id: this.$route.params.id,
            topic_content: this.topic.topic_content,
            video: this.topic.video,
            audio: this.audio,
            doc: this.doc,
          })

          .then((response) => {
            console.log(response);
            // this.clearIt();
            this.fetchModule();
            this.edit = true;
            this.isLoading = false;
            this.$toasted.global.crudUpdated().goAway(1500);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  created() {
    this.AllTransfers();
    this.getProviders();
  },
};
</script>

<style scoped>
.notice {
  padding: 2rem;
  text-align: center;
}

.notice__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.note__content {
  font-size: 1rem;
}
</style>
