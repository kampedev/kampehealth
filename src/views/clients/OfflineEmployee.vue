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
                                                                  <select class="form-control"  v-model="sector" >
                                                                   <option  value="formal">Formal Sector</option>
                                                                   <option  value="informal">Informal Sector</option>
                                                               </select>
                                                            </div>

                                                            <div class="col-md-12" v-if="sector == 'formal' " >
                                                                <div class="form-group">
                                                                  <label for="inputCity">Select Formal Sector</label>
                                                                      <select class="form-control"  v-model="newStudent.sector" >
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

                                                            <div class="form-group col-md-6"  v-if="sector == 'informal'">
                                                              <label >Informal Sector <span class="text-danger">*</span></label>
                                                                <select class="form-control" v-model="newStudent.sector">
                                                                  <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                                                                  <option  value="Vulnerable Groups">Vulnerable Groups</option>
                                                                  <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                                                  <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                                               </select>
                                                            </div>

                                                            <div class="form-group col-md-6"  v-if="sector == 'informal'">
                                                              <label >Special Needs</label>
                                                                <select class="form-control" v-model="newStudent.category_of_vulnerable_group">
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
                                                                <input type="text" class="form-control" v-model="newStudent.nimc_number"  placeholder="NIN Number">
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">Surname <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control" v-model="newStudent.lastname"  placeholder="Last Name">
                                                            </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">First Name <span class="text-danger">*</span></label>
                                                                   <input type="text" class="form-control" v-model="newStudent.firstname" placeholder="First Name">
                                                               </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">Middle Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.middlename" placeholder="Middle Name">
                                                               </div>

                                                           </div>
                                                           <div class="form-row">


                                                                <div class="form-group col-md-6">
                                                                    <label for="inputPassword4">Phone Number</label>
                                                                    <input type="text" class="form-control" v-model="client_number" placeholder="Phone Number" >
                                                                      <div color="alert alert-warning" role="alert" v-if="client_number.length < 14">
                                                                        Number must be 11 characters({{client_number.length}})
                                                                      </div>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Date of Birth <span class="text-danger">*</span></label></p>
                                                                    <date-picker v-model="newStudent.dob" valueType="format"></date-picker>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Expiry Date <span class="text-danger">*</span></label></p>
                                                                    <date-picker v-model="newStudent.expiry_date" valueType="format"></date-picker>
                                                                </div>

                                                                <div class="form-group col-md-12" v-if="sector == 'formal'">
                                                                    <label for="inputEmail4">Computer Number</label>
                                                                    <input type="text" class="form-control" v-model="newStudent.salary_number" placeholder="Computer Employment Number">
                                                                </div>
                                                            </div>

                                                                  <div class="form-row" v-if="sector == 'formal'">
                                                                       <div class="form-group col-md-6">
                                                                         <label for="inputCity">Select MDA</label>
                                                                             <select class="form-control"  v-model="newStudent.place_of_work" >
                                                                               <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                                                                          </select>
                                                                       </div>

                                                                   </div>

                                                            <div class="row">

                                                              <div class="form-group col-md-12" >
                                                                <label>Principal Facility for Accessing Health Care <span class="text-danger">*</span></label>
                                                                <v-select v-model="newStudent.provider_id" :options="facilities_sync" label="agency_name" :value="newStudent.provider_id" @input="selected_provider"></v-select>
                                                              </div>


                                                                <div class="form-group col-md-12" >
                                                                  <label>Select LGA <span class="text-danger">*</span></label>
                                                                  <v-select v-model="newStudent.localgovt" :options="osun_lgas.data" label="local_name" :value="newStudent.localgovt" @input="selected_lga" ></v-select>
                                                                </div>

                                                                <div class="form-group col-md-12" >
                                                                  <label>Select Ward <span class="text-danger">*</span></label>
                                                                  <v-select v-model="newStudent.ward" :options="wards_sync" label="ward_name" :value="newStudent.ward" @input="selected_ward"></v-select>
                                                                </div>
                                                                <div class="col-md-6">
                                                                  <label for="inputCity">Gender <span class="text-danger">*</span></label>
                                                                      <select class="form-control"  v-model="newStudent.gender" >
                                                                       <option  value="Male">Male</option>
                                                                       <option  value="Female">Female</option>
                                                                   </select>
                                                                </div>

                                                                <div class="form-group col-md-6">
                                                                  <label >TPA <span class="text-danger">*</span></label>
                                                                  <select class="form-control"  v-model="newStudent.org_id">
                                                                      <option v-for="tpa in tpa_offline.data" v-bind:key="tpa.id" :value="tpa.id">{{tpa.organization_name}}</option>
                                                                   </select>
                                                                </div>

                                                             <div class="form-group col-md-6">
                                                                <label for="inputCity">Blood Group</label>
                                                                    <select class="form-control"  v-model="newStudent.blood" >
                                                                     <option  value="A">A</option>
                                                                     <option  value="B">B</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="O">O</option>
                                                                 </select>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label >Marital Status <span class="text-danger">*</span></label>
                                                                  <select class="form-control" v-model="newStudent.marital_status">
                                                                    <option  value="Married">Married</option>
                                                                    <option  value="Widow">Widow</option>
                                                                    <option  value="Single">Single</option>
                                                                    <option  value="Divorced">Seperated</option>
                                                                    <option  value="Divorced">Divorced</option>
                                                                 </select>
                                                              </div>
                                                               <div class="form-group col-md-6">
                                                                <label for="inputCity">Genotype</label>
                                                                    <select class="form-control"  v-model="newStudent.genotype" >
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
                                                                 <input type="text" class="form-control" v-model="newStudent.address" placeholder="1234 Main St">
                                                             </div>

                                                              </div>

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary btn-block btn-lg" @click="showImage" v-if="client_number.length == 11 ">Proceed to Take Picture</button>
                                                                 <button class="disabled btn btn-primary btn-block btn-lg" v-if="client_number.length != 11 ">Proceed to Take Picture</button>
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
                                                                    <button  class="btn btn-default btn-block btn-lg" @click="takePic">Capture</button>
                                                                  </div>

                                                                </div>
                                                              </div>
                                                              <div class="row">
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                  <button class="btn btn-primary btn-block btn-lg" @click="addUSer">Submit</button>
                                                                </div>
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                    <video id="video" width="100%"  height="auto" autoplay></video>

                                                                  <div class="col-md-12" style="margin-top:10px;" v-show="showcanvas">
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

                               <div class="col-md-12" v-if="students.length > 0">
                                 <div class="alert alert-border-warning  alert-dismissible fade show" role="alert">
                                     <div class="d-flex">
                                         <div class="icon">
                                             <i class="icon mdi mdi-alert-circle-outline"></i>
                                         </div>
                                         <div class="content">
                                             <strong>{{students.length}} Users</strong> added offline.
                                             <download-excel :data="students">
                                                 <button type="button" class="btn btn-primary align-right" name="button" @click="syncClients">Sync all Data</button>
                                               </download-excel>
                                         </div>
                                     </div>
                                  </div>
                               </div>

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Avatar</th>
                                         <th>Name</th>
                                         <th>Gender</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="student in students" v-bind:key="student.id">
                                       <td>
                                           <div class="avatar avatar-sm ">
                                             <img :src="student.user_image"
                                                 class="avatar-img avatar-sm rounded-circle"
                                                 alt="">
                                            </div>
                                       </td>
                                         <td >{{student.firstname}} {{student.lastname}}</td>
                                         <td>{{student.gender}}</td>
                                         <td>{{student.phone_number}}</td>
                                         <td>{{student.sector}} </td>
                                         <td>
                                             <button type="button" class="btn btn-info" @click="syncUser(student)"><i class="fe fe-refresh-cw"></i></button>
                                             <!-- <button type="button" class="btn btn-secondary" @click="pushvalue"><i class="fe fe-edit"></i></button> -->
                                             <button type="button" class="btn btn-danger" @click="remove(student)"><i class="fe fe-delete"></i></button>
                                         </td>

                                     </tr>


                                     </tbody>
                                 </table>

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

import { StudentService } from "../../service/student_service";
import DatePicker from 'vue2-datepicker';
// Import component
   import Loading from 'vue-loading-overlay';
   // Import stylesheet
   import 'vue-loading-overlay/dist/vue-loading.css';
   import statesJson from './../../../public/offline/states.json'
   import osunJson from './../../../public/offline/osun_lga.json'
   import osunProviderJson from './../../../public/offline/osun_providers.json'
   import egbedorewardJson from './../../../public/offline/egbedore_wards.json'
   import egbedoreJson from './../../../public/offline/egbedore_facility.json'
   import wardsJson from './../../../public/offline/wards_data.json'
   import tpaJson from './../../../public/offline/tpa_data_osun.json'

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
      newStudent: null,
      showinput: true,
      showcanvas: true,
      wards: "",
      wards_sync: "",
      facilities_sync: "",
      showcamera: false,
      providers:"",
      imagefile:"",
      selected_provider_id:"",
      selected_lga_id:"631",
      selected_ward_id:"",
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
        egbedore_providers:egbedoreJson,
        egbedore_wards:egbedorewardJson,
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
    this.clear();
    this.user = JSON.parse(localStorage.getItem('user'))
    this.wards_sync = JSON.parse(localStorage.getItem('wards_data'))
    this.facilities_sync = JSON.parse(localStorage.getItem('facilities'))

  },


  methods: {
    pushvalue(){
      this.students = this.newarray.data
    },
    selected_provider(value){
    this.selected_provider_id = value.id
  },
  selected_ward(value){
    this.selected_ward_id = value.id

  },
  selected_lga(value){
    this.selected_lga_id = value.id

  },

    syncUser(student){
    if (confirm('Are you sure you want to sync this user to the server? It will be deleted from your computer!') ) {
    this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
      this.axios.post('/api/v1/auth/syncUser',{
        agency_id: student.agency_id,
        nimc_number: student.nimc_number,
        firstname: student.firstname,
        lastname: student.lastname,
        middlename: student.middlename,
        email: student.email,
        user_image: student.user_image,
        phone_number: student.phone_number,
        type: student.type,
        provider_id: student.provider_id,
        state: '2676',
        role: 0,
        password: 'euhler',
        localgovt: student.localgovt,
        ward: student.ward,
        blood: student.blood,
        dob: student.dob,
        expiry_date: student.expiry_date,
        address1: student.address,
        genotype: student.genotype,
        weight: student.weight,
        gender: student.gender,
        sector: student.sector,
        sectorType: student.sectorType,
        org_id: student.org_id,
        marital_status: student.marital_status,
        category_of_vulnerable_group: student.category_of_vulnerable_group,
        enrolled_by: student.enrolled_by,
      })
      .then(response=>{

          console.log(response);
          this.isLoading = false;
          // this.refreshStudent();
          this.$toasted.info('Enrollee synced Successfully', {position: 'top-center', duration:3000 })
          let user_added_id = response.data.data.id

          //Start upload Pic
          this.axios.post(`/api/v1/auth/uploadcustomerpicImage`,
           {
              user_image: student.user_image,
              user_id: user_added_id,

            })
              .then(response => {
                  console.log(response)
                  // this.$breadstick.notify("Profile pushed Successfully!", {position: "top-right"});
              })
              .catch(error => {
                  console.error(error);
              })
          //End upload Pic

          //start Delete User
          this.remove(student)
          //End Delete User

      })
      .catch(error=>{
          console.log(error.response)
          this.isLoading = false;
          // this.getClients();
          this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

      })
    }
  },
  async  syncClients(){
    this.isLoading = true;

    if (confirm('Are you Sure you want to Sync all Data from your Device?') ) {
      console.log("data sent to api ",this.students)
      this.axios.post(`/api/v1/auth/syncUserOptim`,{
        data: this.students
      })
                  .then(response => {
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
      // const result = this.students.map((item) => {
      //       this.axios.post('/api/v1/auth/syncUser',{
      //         firstname: item.firstname,
      //         lastname: item.lastname,
      //         middlename: item.middlename,
      //         nimc_number: item.nimc_number,
      //         email: item.email,
      //         phone_number: item.phone_number,
      //         type: item.type,
      //         user_image: item.user_image,
      //         sectorType: item.sectorType,
      //         agency_id: item.agency_id,
      //         provider_id: item.provider_id,
      //         marital_status: item.marital_status,
      //         state: '2676',
      //         role: 0,
      //         password: 'euhler',
      //         localgovt: item.localgovt,
      //         address1: item.address,
      //         sector: item.sector,
      //         category_of_vulnerable_group: item.category_of_vulnerable_group,
      //         ward: item.ward,
      //         blood: item.blood,
      //         dob: item.dob,
      //         expiry_date: item.expiry_date,
      //         org_id: item.org_id,
      //         genotype: item.genotype,
      //         enrolled_by: item.enrolled_by,
      //         gender: item.gender,
      //       })
      //       .then(response=>{
      //           console.log(response)
      //           let student = item
      //           this.remove(student)
      //
      //       }).
      //       catch(error=>{
      //           console.log(error.response)
      //           this.$toasted.error('Error Syncing! Reload Page', {position: 'top-center', duration:3000 })
      //
      //       })
      //       result;
      //
      // });

      this.isLoading = false;
      this.$toasted.info('Client Synced Successfully', {position: 'top-center', duration:3000 })
      // this.getOfflineCLients()
    }


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
    takeFinger(){
      this.showinput = false;
      this.showcamera = false;
      this.showfinger = true;
      this.l_l_finger = true;
    },

    showPreviewFinger(){
      this.r_t_finger = false;
      this.previewfingers = true;
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
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.selected_provider_id,
          localgovt: this.selected_lga_id,
          ward: this.selected_ward_id,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          expiry_date: this.newStudent.expiry_date,
          type: 'client',
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work,
          category_of_vulnerable_group: this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          // left_fingers: this.leftfingers,
          // right_fingers: this.rightfingers,
          // thumbs_fingers: this.twothumbs,
          address1: this.newStudent.address,
          agency_id: this.user.id,
          enrolled_by: this.user.id,
          org_id: this.newStudent.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
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
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.selected_provider_id,
          localgovt: this.selected_lga_id,
          ward: this.selected_ward_id,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          expiry_date: this.newStudent.expiry_date,
          type: 'client',
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work,
          category_of_vulnerable_group: this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          // left_fingers: this.leftfingers,
          // right_fingers: this.rightfingers,
          // thumbs_fingers: this.twothumbs,
          address: this.newStudent.address,
          agency_id: this.user.institutional_id,
          enrolled_by: this.user.id,
          org_id: this.newStudent.org_id,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
        this.showInput();
        this.$toasted.info('Client Added Successfully', {position: 'top-center', duration:3000 })

      } catch (ex) {
        alert(ex.message);
      }
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.type == 'employee') {
        this.axios.get(`/api/v1/auth/providerAgency/${this.user.institutional_id}`)
                    .then(response => {
                        this.providers = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
      if(this.user.type == 'shis') {
        this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                    .then(response => {
                        this.providers = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },
    clear() {
      this.newStudent = {
        name: "",
        gender: "",
        client_number: "0",
        country: "",
        city: ""
      };
      localStorage.removeItem("snap");
      this.imagefile = ""
      this.client_number = "0"
      this.showcanvas = false
    },
    // edit(student) {
    //   var student = this.students.find(qry => qry.id === student);
    //   this.editStudent = {
    //     id: student.id,
    //     firstname: student.firstname,
    //     lastname: student.lastname,
    //     phone_number: student.phone_number,
    //     dob: student.dob,
    //     expiry_date: student.expiry_date,
    //     gender: student.gender,
    //     genotype: student.genotype,
    //     address: student.address
    //   };
    // },
    edit(student) {
      // id = student.id
      this.newStudent.firstname = student.firstname
      this.newStudent.lastname = student.lastname
      this.newStudent.phone_number = student.phone_number
      this.newStudent.middlename = student.middlename
      console.log('edit open')

    },
    async remove(student) {
      if (confirm('Are you Sure you want to delete?') ) {
        const service = new StudentService();
        service;
        const noOfStudentRemoved = await this.service.removeStudent(student.id);
        if (noOfStudentRemoved > 0) {
          this.$emit("remove-item");
          console.log(noOfStudentRemoved)
        }
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
    }
  },
  created(){
    this.getProviders()
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
