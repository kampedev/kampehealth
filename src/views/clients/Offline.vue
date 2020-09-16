<template>
  <section class="admin-content " id="contact-search">

  <!-- <Navbar/> -->
      <main class="admin-main">


                           <section >
                             <div class="card-body">
                                 <div class="text-center">
                                     <h1 > <strong>(Offline) Bio Data</strong> </h1>
                                 </div>

                                                          <div class="form-row">

                                                            <div class="form-group col-md-12">
                                                              <label for="inputCity">Select Sector</label>
                                                                  <select class="form-control"  v-model="sector" >
                                                                   <option  value="formal">Formal Sector</option>
                                                                   <option  value="informal">Informal Sector</option>
                                                               </select>
                                                            </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">First Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.firstname" placeholder="First Name">
                                                               </div>

                                                               <div class="form-group col-md-6">
                                                                   <label for="inputPassword4">Last Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.lastname"  placeholder="Last Name">
                                                               </div>
                                                           </div>
                                                           <div class="form-row">
                                                                <!-- <div class="form-group col-md-6">
                                                                    <label for="inputEmail4">Email</label>
                                                                    <input type="email" class="form-control" v-model="newStudent.email" placeholder="Email">
                                                                </div> -->

                                                                <div class="form-group col-md-6">
                                                                    <label for="inputPassword4">Phone Number</label>
                                                                    <input type="text" class="form-control" v-model="client_number" placeholder="Phone Number" >
                                                                      <div color="alert alert-warning" role="alert" v-if="client_number.length < 11">
                                                                        Number must be minimum of 11 characters
                                                                      </div>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Date of Birth</label></p>
                                                                    <!-- <input type="text" class="form-control" v-model="newStudent.dob" placeholder="1994/01/01" > -->
                                                                    <date-picker v-model="newStudent.dob" valueType="format"></date-picker>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <label >Point of HealthCare: {{newStudent.point_of_care}}</label>
                                                                    <select class="form-control" v-model="newStudent.point_of_care">
                                                                      <option  value="Primary Health Care">Primary Health Care</option>
                                                                      <option  value="General Hospital">General Hospital</option>
                                                                      <option  value="Special Hospital">Special Hospital</option>
                                                                      <option  value="Federal Medical Centre">Federal Medical Centre</option>
                                                                      <option  value="Private Health Facility">Private Health Facility</option>
                                                                      <option  value="others">Others</option>
                                                                   </select>
                                                                </div>

                                                                <div class="form-group col-md-6" v-if="newStudent.point_of_care == 'others'">
                                                                  <label >Point of HealthCare</label>
                                                                    <select class="form-control" v-model="newStudent.point_of_care">
                                                                      <option  value="Diagnostic Centre">Diagnostic Centre</option>
                                                                      <option  value="Pharmacy">Pharmacy</option>
                                                                      <option  value="Medicine Store">Medicine Store</option>
                                                                   </select>
                                                                </div>
                                                                <div class="form-group col-md-12" v-if="sector == 'formal'">
                                                                    <label for="inputEmail4">Computer Number</label>
                                                                    <input type="text" class="form-control" v-model="newStudent.salary_number" placeholder="Computer Employment Number">
                                                                </div>
                                                            </div>

                                                                  <div class="form-row" v-if="sector == 'formal'">
                                                                       <!-- <div class="form-group col-md-6">
                                                                         <label for="inputCity">Select MDA</label>
                                                                             <select class="form-control"  v-model="newStudent.place_of_work" >
                                                                              <option  value="Ministry">Ministry of Health</option>
                                                                              <option  value="Ministry">Ministry of Labour</option>
                                                                          </select>
                                                                       </div> -->

                                                                       <!-- <div class="form-group col-md-6">
                                                                         <label for="inputCity">Department</label>
                                                                             <select class="form-control"  v-model="newStudent.place_of_work" >
                                                                              <option  value="Department">Department</option>
                                                                              <option  value="Department">Department</option>
                                                                          </select>
                                                                       </div> -->

                                                                       <!-- <div class="form-group col-md-6">
                                                                         <label for="inputCity">Parastatals</label>
                                                                             <select class="form-control"  v-model="newStudent.place_of_work" >
                                                                              <option  value="ZAMCHEMA">ZAMCHEMA</option>
                                                                              <option  value="Others">Others</option>
                                                                          </select>
                                                                       </div> -->

                                                                   </div>

                                                            <div class="row">
                                                              <div class="col-md-6">
                                                                <label for="inputCity">Gender</label>
                                                                    <select class="form-control"  v-model="newStudent.gender" >
                                                                     <option  value="Male">Male</option>
                                                                     <option  value="Female">Female</option>
                                                                 </select>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">State </label>
                                                                <select class="form-control" v-model="newStudent.state" @change="showState">
                                                                  <option v-for="state in states.data" v-bind:key="state.id" :value="state.name">{{state.name}}</option>
                                                                </select>
                                                              </div>

                                                                <div class="form-group col-md-6" v-show="show">
                                                                  <label for="inputCity">LGA {{newStudent.localgovt}}</label>
                                                                    <select class="form-control"  v-model="newStudent.localgovt" v-if="newStudent.state == 'Zamfara'">
                                                                      <option v-for="lga in zamfara_lgas.data" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                                   </select>

                                                                   <select class="form-control"  v-model="newStudent.localgovt" v-if="newStudent.state == 'Yobe'">
                                                                     <option v-for="lga in yobe_lgas.data" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                                  </select>

                                                                  <select class="form-control"  v-model="newStudent.localgovt" v-if="newStudent.state == 'Kogi'">
                                                                    <option v-for="lga in kogi_lgas.data" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                                 </select>

                                                                 <div class="form-group col-md-6"  v-if="sector == 'informal'">
                                                                   <label >Informal sector</label>
                                                                     <select class="form-control" v-model="newStudent.sector">
                                                                       <option  value="Rural Women Heathcare Program">Rural Women Heathcare Program</option>
                                                                       <option  value="Reach Every Child Healthcare Program">Reach Every Child Healthcare Program</option>
                                                                       <option  value="Rural Outreach Surgical Intervention Program">Rural Outreach Surgical Intervention Program</option>
                                                                       <option  value="Rural Outreach Medical Intervention Program">Rural Outreach Medical Intervention Program</option>
                                                                       <option  value="Organized Private Sector Healthcare Program">Organized Private Sector Healthcare Program</option>
                                                                       <option  value="Organized Rural Community Intervention Halthcare Program">Organized Rural Community Intervention Halthcare Program</option>
                                                                    </select>
                                                                 </div>

                                                                </div>

                                                              <!-- <div class="form-group col-md-6">
                                                                <label for="inputCity">Blood Group</label>
                                                                    <select class="form-control"  v-model="newStudent.blood" >
                                                                     <option  value="A">A</option>
                                                                     <option  value="B">B</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="O">O</option>
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
                                                              </div> -->

                                                              <!-- <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Weight</label>
                                                                  <input type="text" class="form-control" v-model="newStudent.weight" placeholder="Weight in (Kg)" >
                                                              </div> -->

                                                              </div>

                                                              <div class="form-group">
                                                                 <label for="inputAddress">Address</label>
                                                                 <textarea name="name" rows="3" cols="80"  class="form-control" v-model="newStudent.address" placeholder="1234 Main St"></textarea>
                                                             </div>

                                                             <div class="form-group">
                                                                 <button class="btn btn-primary" @click="add" v-if="client_number.length >=11">Submit</button>
                                                                 <button class="disabled btn btn-primary" v-if="client_number.length < 11">Submit</button>
                                                             </div>

                                                            </div>


                                        <div>
                                  </div>


                              <!-- <div class="card-body" v-for="student in students" v-bind:key="student.id">
                              <p>{{student.email}}</p>
                              <p>{{student.gender}}</p>
                              <button @click="remove(student.id)" class="btn btn-primary">Delete</button>
                             </div> -->

                             <div class="vld-parent">
                                  <loading :active.sync="isLoading"
                                  loader="dots"
                                  :can-cancel="true"
                                  :is-full-page="fullPage"></loading>
                              </div>

                           </section>
                           </main>

</section>
</template>
<script>
import { StudentService } from "../../service/student_service";
import DatePicker from 'vue2-datepicker';
// import Navbar from '@/views/Navbar.vue'
// Import component
   import Loading from 'vue-loading-overlay';
   // Import stylesheet
   import 'vue-loading-overlay/dist/vue-loading.css';
   import statesJson from './../../../public/offline/states.json'
   import zamfaraJson from './../../../public/offline/zamfara_lga.json'
   import yobeJson from './../../../public/offline/yobe_lga.json'
   import kogiJson from './../../../public/offline/kogi_lga.json'

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
      user: null,
      editStudent: {},
        fullPage: true,
        client_number:"234",
        sector:"",
        show:false,
        states:statesJson,
        zamfara_lgas:zamfaraJson,
        yobe_lgas:yobeJson,
        kogi_lgas:kogiJson,
        isLoading: false,
      service: new StudentService()
    };
  },

  beforeMount: function() {
    this.clear();
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods: {
    async add() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          gender: this.newStudent.gender,
          state: this.newStudent.state,
          localgovt: this.newStudent.localgovt,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          sector: this.newStudent.sector,
          place_of_work: this.newStudent.place_of_work,
          point_of_care: this.newStudent.point_of_care,
          genotype: this.newStudent.genotype,
          address: this.newStudent.address,
          agency_id: this.user.id,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
        this.$toasted.info('Client Added Successfully', {position: 'top-center', duration:3000 })

      } catch (ex) {
        alert(ex.message);
      }
    },
    showState(){
      this.show= true;
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
    async remove(id) {
      const service = new StudentService();
      service;
      const noOfStudentRemoved = await this.service.removeStudent(id);
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
  }
};
</script>
