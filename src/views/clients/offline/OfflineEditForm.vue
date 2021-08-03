<template>
  <section class="admin-content " id="contact-search">

  <!-- <Navbar/> -->
      <main class="admin-main">


                         <section>
                           <div class="container row">

                             <div class="col-md-12" v-show="showinput">
                                 <div class="text-center">
                                     <h3 class="h3">(Offline) Bio Data Form </h3>
                                     <p>(All fields marked with <span class="text-danger">*</span> are compulsory)</p>

                                 </div>
                                                          <div class="form-row">


                                                            <div class="form-group col-md-12">
                                                              <label for="inputCity">Select Sector <span class="text-danger">*</span></label>
                                                                  <select class="form-control"  v-model="editUser.sectorType" >
                                                                   <option  value="formal">Formal Sector</option>
                                                                   <option  value="informal">Informal Sector</option>
                                                               </select>
                                                            </div>

                                                            <div class="col-md-12" v-if="editUser.sectorType == 'formal' " >
                                                                <div class="form-group">
                                                                  <label for="inputCity">Select Formal Sector</label>
                                                                      <select class="form-control"  v-model="editUser.sector" >
                                                                       <option  value="State Civil Servant Healthcare Plan">State Civil Servant Healthcare Plan</option>
                                                                       <option  value="LGA Civil Servant Healthcare Plan">LGA Civil Servant Healthcare Plan </option>
                                                                       <option  value="State Pensioneers Healthcare Plan">State Pensioneers Healthcare Plan</option>
                                                                       <option  value="LGA Pensioneers Healthcare Plan">LGA Pensioneers Healthcare Plan</option>
                                                                       <option  value="Oganized Private Sector Plan">Organized Private Sector Plan</option>
                                                                       <option value="Tertiary Institution Contributory Health Insurance Plan (TICHIP)">
                                                                         Tertiary Institution Contributory Health Insurance Plan (TICHIP)</option>
                                                                   </select>
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-6"  v-if="editUser.sectorType == 'informal'">
                                                              <label >Informal Sector <span class="text-danger">*</span></label>
                                                                <select class="form-control" v-model="editUser.sector">
                                                                  <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                                                                  <option  value="Vulnerable Groups">Vulnerable Groups</option>
                                                                  <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                                                  <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                                               </select>
                                                            </div>

                                                            <div class="form-group col-md-6"  v-if="editUser.sectorType == 'informal'">
                                                              <label >Special Needs</label>
                                                                <select class="form-control" v-model="editUser.category_of_vulnerable_group">
                                                                  <option  value="Pregnant Women">Pregnant Women</option>
                                                                  <option  value="Children under 5">Children under 5</option>
                                                                  <option  value="Aged">Aged</option>
                                                                  <option  value="IDP">IDP</option>
                                                                  <option  value="Physically Challenged">Physically Challenged</option>
                                                                  <option  value="People with Special Needs">People with Special Needs</option>
                                                                  <option  value="Poorest of the Poor">Poorest of the Poor</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">NIN Number</label>
                                                                <input type="text" class="form-control" v-model="editUser.nimc_number"  placeholder="NIN Number">
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">Surname <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control" v-model="editUser.lastname"  placeholder="Last Name">
                                                            </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">First Name<span class="text-danger">*</span></label>
                                                                   <input type="text" class="form-control" v-model="editUser.firstname" placeholder="First Name">
                                                               </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">Middle Name</label>
                                                                   <input type="text" class="form-control" v-model="editUser.middlename" placeholder="Middle Name">
                                                               </div>

                                                           </div>
                                                           <div class="form-row">


                                                                <div class="form-group col-md-6">
                                                                    <label for="inputPassword4">Phone Number</label>
                                                                    <input type="text" class="form-control" v-model="editUser.phone_number" placeholder="Phone Number" >
                                                                      <div color="alert alert-warning" role="alert" v-if="editUser.phone_number.length < 14">
                                                                        Number must be 11 characters({{client_number.length}})
                                                                      </div>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Date of Birth <span class="text-danger">*</span></label></p>
                                                                    <date-picker v-model="editUser.dob" valueType="format"></date-picker>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Expiry Date <span class="text-danger">*</span></label></p>
                                                                    <date-picker v-model="editUser.expiry_date" valueType="format"></date-picker>
                                                                </div>

                                                                <div class="form-group col-md-12" v-if="sector == 'formal'">
                                                                    <label for="inputEmail4">Computer Number</label>
                                                                    <input type="text" class="form-control" v-model="editUser.salary_number" placeholder="Computer Employment Number">
                                                                </div>
                                                            </div>

                                                                  <div class="form-row" v-if="sector == 'formal'">
                                                                       <div class="form-group col-md-6">
                                                                         <label for="inputCity">Select MDA</label>
                                                                             <select class="form-control"  v-model="editUser.place_of_work" >
                                                                               <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                                                                          </select>
                                                                       </div>

                                                                   </div>

                                                            <div class="row">

                                                              <div class="form-group col-md-12" >
                                                                <label>Principal Facility for Accessing Health Care <span class="text-danger">*</span></label>
                                                                <select class="form-control"  v-model="editUser.provider_id">
                                                                  <option v-for="fac in facilities_sync" v-bind:key="fac.id" :value="fac.id">{{fac.agency_name}}</option>
                                                                </select>
                                                              </div>


                                                                <div class="form-group col-md-12" >
                                                                  <label>Select LGA <span class="text-danger">*</span></label>
                                                                  <input type="text" class="form-control" :value="selected_lga_sync.local_name" disabled placeholder="Selected LGA">
                                                                </div>

                                                                <div class="form-group col-md-12" >
                                                                  <label>Select Ward <span class="text-danger">*</span></label>
                                                                  <select class="form-control"  v-model="editUser.ward">
                                                                  <option v-for="ward in wards_sync" v-bind:key="ward.id" :value="ward.id">{{ward.ward_name}}</option>
                                                                  </select>
                                                                </div>
                                                                <div class="col-md-6">
                                                                  <label for="inputCity">Gender <span class="text-danger">*</span></label>
                                                                      <select class="form-control"  v-model="editUser.gender" >
                                                                       <option  value="Male">Male</option>
                                                                       <option  value="Female">Female</option>
                                                                   </select>
                                                                </div>

                                                                <div class="form-group col-md-6">
                                                                  <label >TPA <span class="text-danger">*</span></label>
                                                                  <select class="form-control"  v-model="editUser.org_id">
                                                                      <option v-for="tpa in tpa_offline.data" v-bind:key="tpa.id" :value="tpa.id">{{tpa.organization_name}}</option>
                                                                   </select>
                                                                </div>

                                                             <div class="form-group col-md-6">
                                                                <label for="inputCity">Blood Group</label>
                                                                    <select class="form-control"  v-model="editUser.blood" >
                                                                     <option  value="A">A</option>
                                                                     <option  value="B">B</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="O">O</option>
                                                                 </select>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label >Marital Status <span class="text-danger">*</span></label>
                                                                  <select class="form-control" v-model="editUser.marital_status">
                                                                    <option  value="Married">Married</option>
                                                                    <option  value="Widow">Widow</option>
                                                                    <option  value="Single">Single</option>
                                                                    <option  value="Divorced">Seperated</option>
                                                                    <option  value="Divorced">Divorced</option>
                                                                 </select>
                                                              </div>
                                                               <div class="form-group col-md-6">
                                                                <label for="inputCity">Genotype</label>
                                                                    <select class="form-control"  v-model="editUser.genotype" >
                                                                     <option  value="AA">AA</option>
                                                                     <option  value="AO">AO</option>
                                                                     <option  value="BB">BB</option>
                                                                     <option  value="BO">BO</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="OO">OO</option>
                                                                 </select>
                                                              </div>

                                                              <div class="form-group col-md-6">
                                                                 <label for="inputAddress">Home Address</label>
                                                                 <input type="text" class="form-control" v-model="editUser.address" placeholder="1234 Main St">
                                                             </div>

                                                              </div>

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary btn-block btn-lg" @click="showImage" v-if="editUser.phone_number.length == 11 ">Proceed to Take Picture</button>
                                                                 <button class="disabled btn btn-primary btn-block btn-lg" v-if="editUser.phone_number.length != 11 ">Proceed to Take Picture</button>
                                                             </div>

                                                            </div>

                                                            <div v-show="showcamera" class="container-fluid ">
                                                              <h3 class="h3">Client Picture </h3>

                                                              <div class="form-group">
                                                                <div class="row">
                                                                  <div class="col-md-4">
                                                                    <button  class="btn btn-secondary btn-block btn-lg" @click="showInput">Back</button>
                                                                  </div>
                                                                  <div class="col-md-4">
                                                                    <!-- <button  class="btn btn-default btn-block btn-lg" @click="takePic">Capture</button> -->
                                                                  </div>

                                                                </div>
                                                              </div>
                                                              <div class="row">
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                  <button class="btn btn-primary btn-block btn-lg" @click="addUSer">Update</button>
                                                                </div>
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                  <img :src="editUser.user_image" alt="">
                                                                    <!-- <video id="video" width="100%"  height="auto" autoplay></video> -->

                                                                  <div class="col-md-12" style="margin-top:10px;" v-show="showcanvas">
                                                                    <!-- <canvas id="canvas" width="600px" height="450px"></canvas> -->
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>

                             <div class="vld-parent">
                                  <loading :active.sync="isLoading"
                                  loader="spinner"
                                  :can-cancel="false"
                                  :is-full-page="true"></loading>
                              </div>
                            </div>
                        </section>
                      </main>

</section>
</template>
<script>

import { StudentService } from "../../../service/student_service";
import DatePicker from 'vue2-datepicker';
// Import component
   import Loading from 'vue-loading-overlay';
   // Import stylesheet
   import 'vue-loading-overlay/dist/vue-loading.css';
   import statesJson from './../../../../public/offline/states.json'
   import osunJson from './../../../../public/offline/osun_lga.json'
   import osunProviderJson from './../../../../public/offline/osun_providers.json'
   import wardsJson from './../../../../public/offline/wards_data.json'
   import tpaJson from './../../../../public/offline/tpa_data_osun.json'

export default {
  components: {
      Loading, DatePicker
  },
  name: "Student",
  props: {
    students: {
      required: true,
      type: Array
    }
  },
  data: function() {
    return {
      disabled: false,
      newStudent: null,
      showinput: true,
      showcanvas: true,
      singleuser: "",
      wards: "",
      wards_sync: "",
      facilities_sync: "",
      showcamera: false,
      providers:"",
      imagefile:"",
      selected_provider_id:"",
      selected_lga_id:"631",
      selected_ward_id:"",
      editUser:"",
      user: null,
      editStudent: {},
        fullPage: true,
        client_number:"0",
        leftfingers:null,
        rightfingers:null,
        twothumbs:null,
        sector:"",
        show:false,
        states:statesJson,
        osun_lgas:osunJson,
        osun_providers:osunProviderJson,
        wards_offline:wardsJson,
        tpa_offline:tpaJson,
        isLoading: false,
        newarray:{
            data:""
        },
        video_settings:{
                video: {
                  width: {
                    min: 1280,
                    ideal: 1920,
                    max: 2560,
                  },
                  height: {
                    min: 720,
                    ideal: 1080,
                    max: 1440
                  },
                  facingMode: 'environment'
                }
              },
      service: new StudentService()
    };
  },

  beforeMount: function() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.editUser = JSON.parse(localStorage.getItem('editUser'))
    this.wards_sync = JSON.parse(localStorage.getItem('wards_data'))
    this.facilities_sync = JSON.parse(localStorage.getItem('facilities'))
    this.selected_lga_sync = JSON.parse(localStorage.getItem('selected_lga'))

  },
  computed:{
    //
  },

  methods: {

  selected_lga(value){
    this.selected_lga_id = value.id
  },


 showInput(){
   this.showinput = true;
   this.showcamera = false;
   this.showfinger = false;
 },
    showImage(){
      this.showinput = false;
      this.showcamera = true;
      this.streamPic()
    },


    streamPic(){
      var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia(this.video_settings).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });

      }
    },
    takePic(){
      this.showcanvas = true
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, 500, 350);

        // get image
        var image = new Image();

        image.src = canvas.toDataURL("image/png");
        console.log(image)
        localStorage.setItem('snap',this.imagefile.src);
        this.imagefile = image.src
        this.$toasted.info('Picture taken Successfully', {position: 'top-center', duration:3000 })


    },
    addUSer(){
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.type == 'shis') {
        this.addUserAdmin()


      }
      if (this.user.type == 'employee') {
        this.addUserEmployee()


      }
    },
    async addUserAdmin() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.editUser.firstname,
          lastname: this.editUser.lastname,
          middlename: this.editUser.middlename,
          nimc_number: this.editUser.nimc_number,
          provider_id: this.editUser.provider_id,
          localgovt: this.editUser.localgovt,
          ward: this.editUser.ward,
          phone_number: this.editUser.phone_number,
          dob: this.editUser.dob,
          expiry_date: this.editUser.expiry_date,
          type: 'client',
          gender: this.editUser.gender,
          user_image: this.imagefile ? this.imagefile : this.editUser.user_image,
          sector: this.editUser.sector,
          sectorType: this.editUser.sectorType,
          marital_status: this.editUser.marital_status,
          blood: this.editUser.blood,
          salary_number: this.editUser.salary_number,
          place_of_work: this.editUser.place_of_work,
          category_of_vulnerable_group: this.editUser.category_of_vulnerable_group,
          genotype: this.editUser.genotype,
          address1: this.editUser.address,
          agency_id: this.user.id,
          enrolled_by: this.user.id,
          org_id: this.editUser.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);

        this.showInput();
        this.$toasted.info('Client Added Successfully', {position: 'top-center', duration:3000 })

      } catch (ex) {
        alert(ex.message);
      }
    },
    async addUserEmployee() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.editUser.firstname,
          lastname: this.editUser.lastname,
          middlename: this.editUser.middlename,
          nimc_number: this.editUser.nimc_number,
          provider_id: this.editUser.provider_id,
          localgovt: this.selected_lga_sync.id,
          ward: this.editUser.ward,
          phone_number: this.editUser.phone_number,
          dob: this.editUser.dob,
          expiry_date: this.editUser.expiry_date,
          type: 'client',
          gender: this.editUser.gender,
          user_image: this.imagefile ? this.imagefile : this.editUser.user_image,
          sector: this.editUser.sector,
          sectorType: this.editUser.sectorType,
          marital_status: this.editUser.marital_status,
          blood: this.editUser.blood,
          salary_number: this.editUser.salary_number,
          place_of_work: this.editUser.place_of_work,
          category_of_vulnerable_group: this.editUser.category_of_vulnerable_group,
          genotype: this.editUser.genotype,
          address: this.editUser.address,
          agency_id: this.user.institutional_id,
          enrolled_by: this.user.id,
          org_id: this.editUser.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);

        this.showInput();
        this.$toasted.info('Client updated Successfully!', {position: 'top-center', duration:3000 })
        this.removesync(this.editUser)
        this.$router.push('/add-client/employee-offline')

      } catch (ex) {
        alert(ex.message);
      }
    },


    async removesync(editUser) {
        const service = new StudentService();
        service;
        this.disabled = false;
        const noOfStudentRemoved = await this.service.removeStudent(editUser.id);
        if (noOfStudentRemoved > 0) {
          this.$emit("remove-item");
          console.log(noOfStudentRemoved)
        }
    },


  },
  created(){
    if (localStorage.getItem('reloaded')) {
           // The page was just reloaded. Clear the value from local storage
           // so that it will reload the next time this page is visited.
           localStorage.removeItem('reloaded');
       } else {
           // Set a flag so that we know not to reload the page twice.
           localStorage.setItem('reloaded', '1');
           location.reload();
       }

  }
};
</script>
<style scoped>
  .spacer{
    margin-left:5px;
    margin-top:5px;
  }

#videoElement {
	width: 500px;
	height: 375px;
	background-color: #666;
}
</style>
