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
                                                            </div>

                                                            <div class="row">

                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">Gender</label>
                                                                    <select class="form-control"  v-model="newStudent.gender" >
                                                                     <option  value="Male">Male</option>
                                                                     <option  value="Female">Female</option>
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
                                                                  <label for="inputPassword4">Weight</label>
                                                                  <input type="text" class="form-control" v-model="newStudent.weight" placeholder="Weight in (Kg)" >
                                                              </div>
                                                            </div>

                                                            <!-- <div class="row">
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">State </label>

                                                                <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                                 <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                                                             </select>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label for="inputCity">LGA</label>
                                                                  <select class="form-control"  v-model="newStudent.localgovt">
                                                                    <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                                 </select>
                                                              </div>
                                                            </div> -->

                                                            <div class="form-group">
                                                               <label for="inputAddress">Address</label>
                                                               <textarea name="name" rows="3" cols="80"  class="form-control" v-model="newStudent.address" placeholder="1234 Main St"></textarea>
                                                           </div>

                                                           <div class="form-group">
                                                               <button class="btn btn-primary" @click="add" v-if="client_number.length >=11">Submit</button>
                                                               <button class="disabled btn btn-primary" v-if="client_number.length < 11">Submit</button>
                                                           </div>
                                        <div>
                                  </div>

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
          genotype: this.newStudent.genotype,
          address: this.newStudent.address,
          agency_id: this.user.institutional_id,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
        this.$toasted.info('Client Added Successfully', {position: 'top-center', duration:3000 })

      } catch (ex) {
        alert(ex.message);
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
