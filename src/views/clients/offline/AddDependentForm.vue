<template>
  <section class="admin-content" id="contact-search">
    <!-- <Navbar/> -->
    <main class="admin-main">
      <section>
        <div class="container row">
         

          <div class="col-md-12" v-show="showinput">
            <div class="text-center">
              <h3 class="h3"> {{ offline_user.firstname }} {{ offline_user.lastname }} Dependent Page</h3>
              <b>
                 {{getDep.length}}  Depedents Added 
                
               </b
              >
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">Relationship Type</label>
                <select
                  class="form-control"
                  v-model="newStudent.dependent_rel_type"
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
                <select
                  class="form-control"
                  v-model="newStudent.dependent_gender"
                >
                  <option id="Male">Male</option>
                  <option id="Female">Female</option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="inputPassword4">Surname </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newStudent.dependent_last_name"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  v-model="newStudent.dependent_firstname"
                />
              </div>

              <div class="form-group col-md-6">
                <p> <label for="inputCity">Date of Birth</label></p> 
                  <input type="date" class="form-control"  placeholder="YYYY/MM/DD" v-model="newStudent.dependent_dob" >

                <!-- <date-picker
                  v-model="newStudent.dependent_dob"
                  valueType="format"
                ></date-picker> -->
              </div>
               <div class="form-group col-md-6">
                <p> <label for="inputCity">Date of Expiry: {{getExpiry}} </label></p> 
                  <input type="date" class="form-control"  placeholder="YYYY/MM/DD" v-model="getExpiry" >
                  <p class="text-success">Principal Expiry: {{offline_user.expiry_date}} </p>

                <!-- <date-picker
                  v-model="newStudent.dependent_dob"
                  valueType="format"
                ></date-picker> -->
              </div>
             
            </div>

        

            <div class="form-group">
              <button
                class="btn btn-primary btn-block btn-lg"
                v-if="newStudent.dependent_rel_type != null && newStudent.dependent_dob != null && newStudent.dependent_firstname != null  
                 && newStudent.dependent_last_name != null && newStudent.dependent_dob != null
                
                 "
                @click="showImage"
              >
                Proceed to Take Picture
              </button>

             
            </div>
          </div>

          <div v-show="showcamera" class="container-fluid">
            <h3 class="h3 text-center">Dependent Picture</h3>

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
                  v-if="getDep.length <= 4 "
                >
                  Submit
                </button>
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
import { connection } from "../../../service/jsstore_con";

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
      provider_id: "",
      imagefile: "",
      selected_provider_id: "",
      selected_lga_id: "631",
      selected_mda_name: "",
      selected_ward_id: "",
      user: null,
      editStudent: {},
      fullPage: true,
      phone_number: "",
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
    this.offline_user = JSON.parse(localStorage.getItem("offline_user"));
    this.phone_number = localStorage.getItem("phone_number");
    this.provider_id = localStorage.getItem("provider_id");
  },
  computed: {

     getAge(){
            var today = new Date();
        var birthDate = new Date (this.newStudent.dependent_dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
      },

     getExpiry(){

      if (this.newStudent.dependent_rel_type == 'Spouse A') {
        return this.offline_user.expiry_date
        
      } else {
        var today = new Date();
        var principalExpiry = new Date (this.offline_user.expiry_date);
        var principalExpYear = principalExpiry.getFullYear() 

        var birthDate = new Date (this.newStudent.dependent_dob);
        // var year = birthDate.getFullYear();
        var month = birthDate.getMonth();
        var day = birthDate.getDate();
        month;
        day;
        let remainingYears = 18 - this.getAge
        let finaldate = today.getFullYear() + remainingYears
          
          if (finaldate > principalExpYear) {
            return this.offline_user.expiry_date
          } else {
            
            return  finaldate + '-12-31' 
          }
      
      
      }

  },

    getDep(){
    let  enrollees = this.students
    let formatter = enrollees.filter(
        (x) => x.dependent_identifier ==  this.offline_user.salary_number);
        return formatter 

    },
     getsalaryNumber(){
      if (this.offline_user.salary_number ==  null) {
          return 'nil'
      } else {
        return this.offline_user.salary_number
        
      }
    },
    getplaceofWork(){
      if (this.offline_user.place_of_work ==  null) {
          return null
      } else {
        return this.offline_user.place_of_work.name
        
      }
    },
  },

  methods: {
   
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
          firstname: this.newStudent.dependent_firstname,
          lastname: this.newStudent.dependent_last_name,
          middlename: this.offline_user.middlename,
          nimc_number: this.offline_user.nimc_number,
          provider_id: parseInt(this.provider_id, 10),
          localgovt: this.offline_user.localgovt,
          ward: this.offline_user.ward,
          phone_number: this.client_number,
          dob: this.offline_user.dob,
          expiry_date: this.getExpiry,
          plan_type: this.offline_user.plan_type,
          type: "dependent",
          gender: this.offline_user.gender,
          user_image: this.imagefile,
          sector: this.offline_user.sector,
          sectorType: 'this.offline_user.sectorType',
          marital_status: this.offline_user.marital_status,
          blood: this.offline_user.blood,
          salary_number: this.getsalaryNumber,
          place_of_work: this.getplaceofWork,
          category_of_vulnerable_group: this.offline_user.category_of_vulnerable_group,
          genotype: this.offline_user.genotype,
          address1: this.offline_user.address,
          agency_id: 95930,
          enrolled_by: this.user.id,
          org_id: 12,
           dependent_identifier: this.getsalaryNumber,
          dependent_firstname: this.newStudent.dependent_firstname,
          dependent_last_name: this.newStudent.dependent_last_name,
          dependent_rel_type: this.newStudent.dependent_rel_type,
          dependent_gender: this.newStudent.dependent_gender,
          dependent_id_number: this.newStudent.dependent_id_number,
          dependent_dob: this.newStudent.dependent_dob,
          dependent_phone_number: this.offline_user.phone_number,
           dependent_provider: this.provider_id,
          dependent_localgovt: this.newStudent.localgovt,
          dependent_image: this.imagefile,
          dependent_state: 2676,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
        this.showInput();
        this.$toasted.info("Dependent Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
        this.dependents_counter ++
       } catch (ex) {
        alert(ex.message);
      }
    },
    async addUserEmployee() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
         firstname: this.newStudent.dependent_firstname,
         lastname: this.newStudent.dependent_last_name,
          middlename: this.offline_user.middlename,
          nimc_number: this.offline_user.nimc_number,
          provider_id: parseInt(this.provider_id, 10),
          localgovt: this.offline_user.localgovt,
          ward: this.offline_user.ward,
          phone_number: this.phone_number,
         plan_type: this.offline_user.plan_type,
          dob: this.offline_user.dob,
          expiry_date: this.getExpiry,
          type: "dependent",
          gender: this.offline_user.gender,
          user_image: this.imagefile,
          sector: this.offline_user.sector,
          sectorType: 'this.offline_user.sectorType',
          marital_status: this.offline_user.marital_status,
          blood: this.offline_user.blood,
          salary_number: this.getsalaryNumber,
          place_of_work: this.getplaceofWork,
          category_of_vulnerable_group:
            this.offline_user.category_of_vulnerable_group,
          genotype: this.offline_user.genotype,
          address: this.offline_user.address,
          agency_id: 95930,
          enrolled_by: this.user.id,
          org_id: 11,
            dependent_identifier: this.getsalaryNumber,
          dependent_firstname: this.newStudent.dependent_firstname,
          dependent_last_name: this.newStudent.dependent_last_name,
          dependent_rel_type: this.newStudent.dependent_rel_type,
          dependent_id_number: this.newStudent.dependent_id_number,
          dependent_gender: this.newStudent.dependent_gender,
          dependent_dob: this.newStudent.dependent_dob,
          dependent_phone_number: this.phone_number,
          dependent_provider: this.provider_id,
          dependent_localgovt: this.newStudent.localgovt,
          dependent_image: this.imagefile,
          dependent_state: 2676,
        });
        this.$emit("add-item", studentsAdded[0]);

        this.clear();
        this.showInput();
        localStorage.removeItem("snap");
        this.imagefile = "";
        this.modalShow = true;
        this.$toasted.info("Dependent Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
        this.dependents_counter ++
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
   async getUser(){
    //    let  salary_number_id = this.offline_user.salary_number
        // this.offline_user = localStorage.getItem('offline_user')
        var results = await connection.select({
            from: "Users",
            where: {
                salary_number: this.getSalaryNum(),
                
            }
        });
    //results will contains no of rows deleted.
    console.log('results');
    console.log(results);

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
    this.getUser()
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
