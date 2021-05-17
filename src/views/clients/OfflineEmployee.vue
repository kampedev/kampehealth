<template>
  <section class="admin-content " id="contact-search">

  <!-- <Navbar/> -->
      <main class="admin-main">


                         <section>
                           <div class="container row">
                             <div class="col-md-11" v-show="showinput">
                                 <div class="text-center">
                                     <h3 class="h3">(Offline) Bio Data Form </h3>
                                 </div>
                                                          <div class="form-row">

                                                            <div class="form-group col-md-12">
                                                              <label for="inputCity">Select Sector</label>
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
                                                              <label >Informal Sector</label>
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
                                                                <label for="inputPassword4">Surname</label>
                                                                <input type="text" class="form-control" v-model="newStudent.lastname"  placeholder="Last Name">
                                                            </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">First Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.firstname" placeholder="First Name">
                                                               </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">Middle Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.middlename" placeholder="Middle Name">
                                                               </div>

                                                           </div>
                                                           <div class="form-row">
                                                                <!-- <div class="form-group col-md-6">
                                                                    <label for="inputEmail4">Email</label>
                                                                    <input type="email" class="form-control" v-model="newStudent.email" placeholder="Email">
                                                                </div> -->

                                                                <div class="form-group col-md-6">
                                                                    <label for="inputPassword4">Phone Number {{client_number.length}}</label>
                                                                    <input type="text" class="form-control" v-model="client_number" placeholder="Phone Number" >
                                                                      <div color="alert alert-warning" role="alert" v-if="client_number.length < 14">
                                                                        Number must be 14 characters
                                                                      </div>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Date of Birth</label></p>
                                                                    <!-- <input type="text" class="form-control" v-model="newStudent.dob" placeholder="1994/01/01" > -->
                                                                    <date-picker v-model="newStudent.dob" valueType="format"></date-picker>
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
                                                              <div class="form-group col-md-6">
                                                                <label >Facility for Accessing Care: </label>
                                                                  <select class="form-control" v-model="newStudent.provider_id">
                                                                    <option  :value="provider.id" v-for="provider in osun_providers.data" v-bind:key="provider.id">{{provider.agency_name}}</option>
                                                                 </select>
                                                              </div>
                                                              <div class="col-md-6">
                                                                <label for="inputCity">Gender</label>
                                                                    <select class="form-control"  v-model="newStudent.gender" >
                                                                     <option  value="Male">Male</option>
                                                                     <option  value="Female">Female</option>
                                                                 </select>
                                                              </div>

                                                                <div class="form-group col-md-4">
                                                                  <label for="inputCity">LGA {{newStudent.localgovt}}</label>
                                                                  <select class="form-control"  v-model="newStudent.localgovt" @change="fetchWards($event)">
                                                                    <option v-for="lga in osun_lgas.data" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                                                 </select>
                                                                </div>

                                                                <div class="form-group col-md-4">
                                                                  <label >Ward</label>
                                                                  <select class="form-control"  v-model="newStudent.ward">
                                                                      <option v-for="ward in wards_offline" v-bind:key="ward.id" :value="ward.id">{{ward.ward_name}}</option>
                                                                   </select>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                  <label >TPA</label>
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
                                                                <label >Marital Status</label>
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
                                                                 <button class="btn btn-primary btn-block btn-lg" @click="showImage" v-if="client_number.length == 14 ">Proceed to Take Picture</button>
                                                                 <button class="disabled btn btn-primary btn-block btn-lg" v-if="client_number.length != 14 ">Proceed to Take Picture</button>
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
                                                                <div class="col-md-12">
                                                                  <button class="btn btn-primary btn-block btn-lg" @click="addUSer">Submit</button>
                                                                </div>
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                    <video id="video" width="100%"  height="auto" autoplay></video>

                                                                  <div class="col-md-7">
                                                                    <canvas id="canvas" width="300" height="150"></canvas>
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

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Sector Type</th>
                                         <th>Name</th>
                                         <th>Gender</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="student in students" v-bind:key="student.id">

                                         <td >{{student.sectorType}}</td>
                                         <td >{{student.firstname}} {{student.lastname}}</td>
                                         <td>{{student.gender}}</td>
                                         <td>{{student.phone_number}}</td>
                                         <td>{{student.sector}}</td>
                                         <td>
                                             <button type="button" class="btn btn-default" @click="syncUser(student)">Sync User</button>
                                         </td>

                                     </tr>


                                     </tbody>
                                 </table>

                             </div>

                             <div class="vld-parent">
                                  <loading :active.sync="isLoading"
                                  loader="dots"
                                  :can-cancel="true"
                                  :is-full-page="fullPage"></loading>
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
      wards: "",
      showcamera: false,
      providers:"",
      imagefile:"",
      user: null,
      editStudent: {},
        fullPage: true,
        client_number:"+234",
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

  },
  methods: {
    fetchWards(){
      this.axios.get(`/api/v1/auth/getwards/` + event.target.value)
                  .then(response => {
                      this.wards = response.data.data
                      console.log(response.data.data)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    syncUser(student){
    if (confirm('Ae you sure you want to sync this user to the server? It will be deleted from your computer!') ) {


    this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
      this.axios.post('/api/v1/auth/registerProvider',{
        agency_id: student.agency_id,
        nimc_number: student.nimc_number,
        firstname: student.firstname,
        lastname: student.lastname,
        middlename: student.middlename,
        email: student.email,
        phone_number: student.phone_number,
        type: 'client',
        provider_id: student.provider_id,
        state: '2676',
        role: 0,
        password: 'euhler',
        localgovt: student.localgovt,
        ward: student.ward,
        blood: student.blood,
        dob: student.dob,
        address1: student.address,
        genotype: student.genotype,
        weight: student.weight,
        gender: student.gender,
        sector: student.sector,
        sectorType: student.sectorType,
        org_id: student.org_id,
        marital_status: student.marital_status,
        category_of_vulnerable_group: student.category_of_vulnerable_group,
        enrolled_by: student.id,
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
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, 300, 150);

        // get image
        var image = new Image();

        image.src = canvas.toDataURL("image/png");
        console.log(image)
        localStorage.setItem('snap',this.imagefile.src);
        this.imagefile = image.src
        this.$toasted.info('Picture taken Successfully', {position: 'top-center', duration:3000 })


        // upload image

        // end of upload image

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
          provider_id: this.newStudent.provider_id,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work,
          category_of_vulnerable_group: this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          left_fingers: this.leftfingers,
          right_fingers: this.rightfingers,
          thumbs_fingers: this.twothumbs,
          address: this.newStudent.address,
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
          provider_id: this.newStudent.provider_id,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          sector: this.newStudent.sector,
          sectorType: this.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work,
          category_of_vulnerable_group: this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          left_fingers: this.leftfingers,
          right_fingers: this.rightfingers,
          thumbs_fingers: this.twothumbs,
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
        client_number: "234",
        country: "",
        city: ""
      };
    },
    edit(id) {
      var student = this.students.find(qry => qry.id === id);
      this.editStudent = {
        id: student.id,
        firstname: student.firstname,
        lastname: student.lastname,
        phone_number: student.phone_number,
        dob: student.dob,
        gender: student.gender,
        genotype: student.genotype,
        address: student.address
      };
    },
    async remove(student) {
      const service = new StudentService();
      service;
      const noOfStudentRemoved = await this.service.removeStudent(student.id);
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
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
