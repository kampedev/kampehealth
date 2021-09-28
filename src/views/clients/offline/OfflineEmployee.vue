<template>
  <section class="admin-content" id="contact-search">
    <!-- <Navbar/> -->
    <main class="admin-main">
      <section>
        <div class="container row">
          <div class="col-md-12" v-if="students.length > 0">
            <div
              class="alert alert-border-info alert-dismissible fade show"
              role="alert"
            >
              <div class="d-flex">
                <div class="icon">
                  <i class="icon mdi mdi-alert-circle-outline"></i>
                </div>
                <div class="row col-md-12">
                  <!-- <download-excel :data="students">
                                               <button type="button" class="btn btn-primary align-right">Download excel Data</button>
                                            </download-excel> -->
                  <router-link :to="{ path: '/offline-sync' }">
                    <button
                      type="button"
                      class="btn btn-info align-right"
                      style="margin-left: 10px"
                    >
                      Start Syncing
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="showinput">
            <div class="text-center">
              <h3 class="h3">(Offline) Bio Data Form</h3>
              <p>
                (All fields marked with <span class="text-danger">*</span> are
                compulsory)
              </p>
            </div>

            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputCity"
                  >Select Sector <span class="text-danger">*</span></label
                >
                <select class="form-control" v-model="sector">
                  <option value="formal">Formal Sector</option>
                  <option value="informal">Informal Sector</option>
                </select>
              </div>

              <div class="col-md-12" v-if="sector == 'formal'">
                <div class="form-group">
                  <label for="inputCity">Select Formal Sector</label>
                  <select class="form-control" v-model="newStudent.sector">
                    <option value="Civil Servant">Civil Servant</option>
                    <option value="Organized Private Sector Plan">
                      Organized Private Sector Plan
                    </option>
                    <option
                      value="Tertiary Student Health Insurance Plan (T-SHIP)"
                    >
                      Tertiary Student Health Insurance Plan (T-SHIP)
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group col-md-6" v-if="sector == 'informal'">
                <label
                  >Informal Sector <span class="text-danger">*</span></label
                >
                <select class="form-control" v-model="newStudent.sector">
                  <option value="Basic Healthcare Provision Fund">
                    Basic Healthcare Provision Fund
                  </option>
                  <option value="Vulnerable Groups">Vulnerable Groups</option>
                  <option value="Voluntary Contributor">
                    Voluntary Contributor
                  </option>
                  <option value="Organized Community Healthcare Plan">
                    Organized Community Healthcare Plan
                  </option>
                </select>
              </div>

              <div class="form-group col-md-6" v-if="sector == 'informal'">
                <label>Special Needs</label>
                <select
                  class="form-control"
                  v-model="newStudent.category_of_vulnerable_group"
                >
                  <option value="Pregnant Women">Pregnant Women</option>
                  <option value="Children under 5">Children under 5</option>
                  <option value="Aged">Aged</option>
                  <option value="IDP">IDP</option>
                  <option value="Physically Challenged">
                    Physically Challenged
                  </option>
                  <option value="People with Special Needs">
                    People with Special Needs
                  </option>
                  <option value="Poorest of the Poor">
                    Poorest of the Poor
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">NIN Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.nimc_number"
                  placeholder="NIN Number"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4"
                  >Surname <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.lastname"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4"
                  >First Name<span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.firstname"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Middle Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.middlename"
                  placeholder="Middle Name"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputPassword4">Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="client_number"
                  placeholder="Phone Number"
                />
                <p
                 class="text-danger"
                  v-if="client_number.length != 11 && client_number != 0"
                >
                  phone number must be 11 characters ({{ client_number.length }})
                </p>
              </div>
              <div class="form-group col-md-6">
                <p>
                  <label for="inputPassword4"
                    >Date of Birth <span class="text-danger">*</span></label
                  >
                </p>
                <date-picker
                  v-model="newStudent.dob"
                  valueType="format"
                ></date-picker>
              </div>
              <div class="form-group col-md-6">
                <p>
                  <label for="inputPassword4"
                    >Expiry Date <span class="text-danger">*</span></label
                  >
                </p>
                <date-picker
                  v-model="newStudent.expiry_date"
                  valueType="format"
                ></date-picker>
              </div>

              <div class="form-group col-md-6" v-if="sector == 'formal'">
                <label for="inputEmail4">Staff ID <span class="text-danger">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.salary_number"
                  placeholder="Computer Employment Number"
                />
              </div>
            </div>

            <div class="form-row" v-if="sector == 'formal'">
              <div class="form-group col-md-12">
                <label for="inputCity">Select MDA </label>
                <v-select
                  v-model="newStudent.place_of_work"
                  :options="mda_offline.data"
                  label="name"
                  :value="newStudent.place_of_work"
                  @input="selected_mda"
                ></v-select>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-md-12" v-if="sector == 'informal'">
                <label
                  >Principal Facility for Accessing Health Care
                  <span class="text-danger">*</span></label
                >
                <v-select
                  v-model="newStudent.provider_id"
                  :options="facilities_sync"
                  label="agency_name"
                  :value="newStudent.provider_id"
                  @input="selected_provider"
                ></v-select>
              </div>
              <div class="form-group col-md-12" v-if="sector == 'formal'">
                <label
                  >Principal Facility for Accessing Health Care 
                  <span class="text-danger">*</span></label
                >
                <v-select
                  v-model="newStudent.provider_id"
                  :options="osun_providers.data"
                  label="agency_name"
                  :value="newStudent.provider_id"
                  @input="selected_provider"
                ></v-select>
              </div>

              <div class="form-group col-md-12">
                <label>Select LGA <span class="text-danger">*</span> {{newStudent.localgovt}} </label>

                <select
                  class="form-control"
                  v-model="newStudent.localgovt"
                  @change="getWards()"
                >
                  <option
                    v-for="loc in osun_lgas.data"
                    v-bind:key="loc.id"
                    :value="loc.id"
                  >
                    {{ loc.local_name }}
                  </option>
                </select>
              </div>

              <div class="form-group col-md-12" v-if="sector == 'informal'">
                <label>Select Ward<span class="text-danger">*</span></label>
                <v-select
                  v-model="newStudent.ward"
                  :options="wards_sync"
                  label="ward_name"
                  :value="newStudent.ward"
                  @input="selected_ward"
                ></v-select>
              </div>

              <div class="form-group col-md-12" v-if="sector == 'formal'">
                <label>Select Ward <span class="text-danger">*</span></label>
                <select class="form-control" v-model="newStudent.ward">
                  <option
                    v-for="loc in wards_lga.wards"
                    v-bind:key="loc.id"
                    :value="loc.id"
                  >
                    {{ loc.ward_name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="inputCity"
                  >Gender <span class="text-danger">*</span></label
                >
                <select class="form-control" v-model="newStudent.gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label
                  >TPA {{newStudent.org_id}}
                  <span class="text-danger">*</span></label
                >
                <select class="form-control" v-model="newStudent.org_id">
                  <option
                    v-for="tpa in tpa_offline.data"
                    v-bind:key="tpa.id"
                    :value="tpa.id"
                  >
                    {{ tpa.organization_name }}
                  </option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="inputCity">Blood Group</label>
                <select class="form-control" v-model="newStudent.blood">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Marital Status <span class="text-danger">*</span></label>
                <select
                  class="form-control"
                  v-model="newStudent.marital_status"
                >
                  <option value="Married">Married</option>
                  <option value="Widow">Widow</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Seperated</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">Genotype</label>
                <select class="form-control" v-model="newStudent.genotype">
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="AC">AC</option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="inputAddress">Home Address</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.address"
                  placeholder="1234 Main St"
                />
              </div>
            </div>

            <div class="form-group">
              <button
                class="btn btn-primary btn-block btn-lg"
                @click="showImage"
                v-if="client_number.length == 11"
              >
                Proceed to Take Picture
              </button>
              <button
                class="disabled btn btn-primary btn-block btn-lg"
                v-if="client_number.length != 11"
              >
                Proceed to Take Picture
              </button>
            </div>
          </div>

          <div v-show="showcamera" class="container-fluid">
            <h3 class="h3">Client Picture</h3>

            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <button
                    class="btn btn-default btn-block btn-lg"
                    @click="showInput"
                  >
                    Back
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    class="btn btn-dark btn-block btn-lg"
                    @click="takePic"
                  >
                    Capture
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 p-t-20 p-b-20">
                <button
                  class="btn btn-primary btn-block btn-lg"
                  @click="addUSer"
                >
                  Submit
                </button>
              </div>
              <div class="col-md-12 p-t-20 p-b-20" v-show="gotoDependent">
                <button
                  @click="modalShow = !modalShow"
                  class="btn btn-primary btn-block btn-lg"
                >
                  Add Dependent
                </button>
              </div>

              <div>
                <b-modal v-model="modalShow" size="xl">
                  <div class="form-row">
                    <p class="h4 text-center">
                      Do you want to add Dependent(s) for
                      {{ newStudent.firstname }} {{ newStudent.lastname }}
                    </p>

                    <div class="row col-md-12">
                      <div class="col-md-6">
                        <button
                          class="btn btn-primary btn-block btn-lg"
                          @click="goAddDep"
                        >
                          Yes
                        </button>
                      </div>
                      <div class="col-md-6">
                        <button
                          class="btn btn-dark btn-block btn-lg"
                          @click="closeDep"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </b-modal>
              </div>

              <div class="col-md-12 p-t-20 p-b-20">
                <video id="video" width="100%" height="auto" autoplay></video>

                <div
                  class="col-md-1"
                  style="margin-top: 10px"
                  v-show="showcanvas"
                >
                  <canvas id="canvas" width="600px" height="450px"></canvas>
                </div>
              </div>
            </div>
            
          </div>

          <!-- <div class="card-body" v-for="student in students" v-bind:key="student.id">
                              <p>{{student.firstname}}</p>
                              <p>{{student.gender}}</p>
                              <p>{{student.user_image}}</p>
                              <button @click="remove(student.id)" class="btn btn-primary">Delete</button>
                             </div> -->

          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              loader="spinner"
              :can-cancel="false"
              :is-full-page="true"
            ></loading>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
<script>
import { StudentService } from "../../../service/student_service";
import DatePicker from "vue2-datepicker";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import allfacilitiesJson from "./../../../../public/offline/allfacilities.json";
import lgaswardsJson from "./../../../../public/offline/lgas_wards.json";
import mdaJson from "./../../../../public/offline/mda.json";
import tpaJson from "./../../../../public/offline/tpa_data_osun.json";

export default {
  components: {
    Loading,
    DatePicker,
  },
  name: "Student",
  props: {
    students: {
      required: true,
      type: Array,
    },
  },
  data: function () {
    return {
      disabled: false,
      modalShow: false,
      gotoDependent: false,
      newStudent: null,
      showinput: true,
      showcanvas: true,
      dependents_counter: 0,
      singleuser: "",
      wards: "",
      wards_sync: "",
      facilities_sync: "",
      showcamera: false,
      providers: "",
      imagefile: "",
      selected_provider_id: "",
      selected_lga_id: "631",
      selected_mda_name: "",
      selected_ward_id: "",
      user: null,
      editStudent: {},
      fullPage: true,
      client_number: "0",
      leftfingers: null,
      rightfingers: null,
      twothumbs: null,
      sector: "",
      show: false,
      osun_lgas: lgaswardsJson,
      wards_lga: "",
      osun_providers: allfacilitiesJson,
      mda_offline: mdaJson,
      tpa_offline: tpaJson,
      isLoading: false,

      newarray: {
        data: "",
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
      service: new StudentService(),
    };
  },

  beforeMount: function () {
    this.clear();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.wards_sync = JSON.parse(localStorage.getItem("wards_data"));
    this.facilities_sync = JSON.parse(localStorage.getItem("facilities"));
    this.selected_lga_sync = JSON.parse(localStorage.getItem("selected_lga"));
  },
  computed: {
    //
  },

  methods: {
    selected_provider(value) {
      this.selected_provider_id = value.id;
    },
    selected_ward(value) {
      this.selected_ward_id = value.id;
    },
    selected_lga(value) {
      this.selected_lga_id = value.id;
    },
    selected_mda(value) {
      this.selected_mda_name = value.name;
    },
    getWards() {
      // let newarr = [1,2, 3].filter(x=> x<2)
      let osunlgaarray = this.osun_lgas.data;
      let formatter = osunlgaarray.filter(
        (x) => x.id == this.newStudent.localgovt
      );
      this.wards_lga = formatter[0];
      console.log(formatter);
    },

    showInput() {
      this.showinput = true;
      this.showcamera = false;
      this.showfinger = false;
    },
    showImage() {
      this.showinput = false;
      this.showcamera = true;
      this.streamPic();
    },
    goAddDep() {
      let singleenrollee = localStorage.setItem(
        "offline_user",
        JSON.stringify(this.newStudent)
      );
      localStorage.setItem("phone_number", this.client_number);
      localStorage.setItem("provider_id", this.selected_provider_id);
      singleenrollee;
      this.$router.push("/add/dependent-offline");
    },

    streamPic() {
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
      this.isLoading = true;
      this.showcanvas = true;
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, 500, 350);

      // get image
      var image = new Image();

      image.src = canvas.toDataURL("image/png");
      console.log(image);
      localStorage.setItem("snap", this.imagefile.src);
      this.imagefile = image.src;
      this.isLoading = false;
      this.$toasted.info("Picture taken Successfully", {
        position: "top-center",
        duration: 3000,
      });
    },
    addUSer() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.type == "shis") {
        this.addUserAdmin();
      }
      if (this.user.type == "employee") {
        this.addUserEmployee();
      }
    },
    async addUserAdmin() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.selected_provider_id,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          expiry_date: this.newStudent.expiry_date,
          type: "client",
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work.name,
          category_of_vulnerable_group:
            this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          address1: this.newStudent.address,
          agency_id: this.user.id,
          enrolled_by: this.user.id,
          org_id: this.newStudent.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);
        // this.clear();
        // this.showInput();
        localStorage.removeItem("snap");
        this.imagefile = "";
        this.modalShow = true;
        this.gotoDependent = true;
        this.$toasted.info("Client Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
      } catch (ex) {
        alert(ex.message);
      }
    },
    async addUserEmployee() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          // firstname: this.newStudent.firstname,
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.selected_provider_id,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          expiry_date: this.newStudent.expiry_date,
          type: "client",
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work.name,
          category_of_vulnerable_group:
            this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          address: this.newStudent.address,
          agency_id: this.user.institutional_id,
          enrolled_by: this.user.id,
          org_id: this.newStudent.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);

        // this.clear();
        // this.showInput();
        localStorage.removeItem("snap");
        this.imagefile = "";
        this.modalShow = true;
        this.gotoDependent = true;
        this.$toasted.info("Client Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
      } catch (ex) {
        alert(ex.message);
      }
    },
    async addUserDependent() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.selected_provider_id,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          expiry_date: this.newStudent.expiry_date,
          type: "dependent",
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work.name,
          category_of_vulnerable_group:
            this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          address: this.newStudent.address,
          agency_id: this.user.institutional_id,
          enrolled_by: this.user.id,
          org_id: this.newStudent.org_id,
          dependent_identifier: this.newStudent.salary_number,
          dependent_firstname: this.newStudent.dependent_firstname,
          dependent_last_name: this.newStudent.dependent_last_name,
          dependent_rel_type: this.newStudent.dependent_rel_type,
          dependent_id_number: this.newStudent.dependent_id_number,
          dependent_dob: this.newStudent.dependent_dob,
          dependent_phone_number: this.client_number,
        });
        this.$emit("add-item", studentsAdded[0]);
        // this.clear();
        // this.showInput();
        this.dependents_counter++;
        this.$toasted.info("Dependent Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
      } catch (ex) {
        alert(ex.message);
      }
    },
    closeDep() {
      this.clear();
      this.modalShow = true;
      this.showInput();
    },

    clear() {
      this.newStudent = {
        name: "",
        gender: "",
        client_number: "0",
        country: "",
        city: "",
      };
      localStorage.removeItem("snap");
      this.imagefile = "";
      this.client_number = "0";
      this.showcanvas = false;
    },

    async remove(student) {
      if (confirm('Are you sure you want to delete? to "Confirm upload?')) {
        const service = new StudentService();
        service;
        this.disabled = false;
        const noOfStudentRemoved = await this.service.removeStudent(student.id);
        if (noOfStudentRemoved > 0) {
          this.$emit("remove-item");
          console.log(noOfStudentRemoved);
        }
      }
    },
    async removesync(student) {
      const service = new StudentService();
      service;
      this.disabled = false;
      const noOfStudentRemoved = await this.service.removeStudent(student.id);
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
        console.log(noOfStudentRemoved);
      }
    },
    async update(id) {
      id;
      // debugger;
      const noOfStudentsUpdated = await this.service.updateStudentById(
        this.editStudent
      );
      if (noOfStudentsUpdated > 0) {
        this.cancelUpdate();
        this.$emit("update-item");
      }
    },
    cancelUpdate() {
      this.editStudent = {};
    },
  },
  created() {
    //
  },
};
</script>
<style scoped>
.spacer {
  margin-left: 5px;
  margin-top: 5px;
}

#videoElement {
  width: 500px;
  height: 375px;
  background-color: #666;
}
</style>
