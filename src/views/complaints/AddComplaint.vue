<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-info m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <div class="m-b-10"></div>
              <p class="h4" >Add Ticket</p>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row list">
            <div class="col-lg-12 col-md-12">
              <div class="card m-b-30">
                <div class="card-header"></div>

                <div class="card-body">
                  <div class="">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputCity">Type</label>
                        <select class="form-control" v-model="complaint.type">
                          <option id="Inquiry">Inquiry</option>
                          <option id="Quality of Service">
                            Facility Quality of Service
                          </option>

                          <option id="Request Change of Facility">
                            Request Change of Facility
                          </option>
                          <option id="Incorrect Details">
                            Incorrect Details
                          </option>
                          <option id="Others">Others</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">Complaint Title</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          placeholder="Name"
                          v-model="complaint.title"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="inputCity">Description</label>
                        <textarea
                          class="form-control"
                          rows="6"
                          v-model="complaint.description"
                        ></textarea>
                      </div>
                    </div>

                    <div class="form-group">
                      <button
                        class="btn btn-info btn-block"
                        @click="AddComplaint"
                      >
                        Submit
                      </button>
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

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: null,
      edit: false,
      isLoading: false,
      fullPage: true,
      complaints: "",
      complaint: {
        title: "",
        description: "",
        type: "",
      },
    };
  },
  beforeMount() {
    //
  },
  methods: {
    getComplaints() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`/api/v1/auth/complaints/${this.user.id}`)
        .then((response) => {
          this.complaints = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    AddComplaint() {
      this.user = JSON.parse(localStorage.getItem("user"));

      if (this.edit === false) {
        // Add comp
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/makeComplaints", {
            title: this.complaint.title,
            description: this.complaint.description,
            type: this.complaint.type,
            agency_id: 439078,
            status: "pending",
          })

          .then((response) => {
            console.log(response);
            this.clearIt();
            this.getComplaints();
            this.isLoading = false;
            this.$toasted.info("Complaint added Successfully!", {
              position: "top-center",
              duration: 3000,
            });
            // this.$router.push("/my-complaints");
            this.$router.push("/client-dashboard");
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        // Update
        this.isLoading = true;
        this.axios
          .put("/api/v1/auth/makeComplaints", {
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
            this.clearIt();
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

    clearIt() {
      this.complaint.title = "";
      this.complaint.description = "";
      this.complaint.type = "";
      // this.dependent.phone_number ="";
    },
  },
  created() {
    this.getComplaints();
  },
};
</script>
