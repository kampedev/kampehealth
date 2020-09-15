<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <strong>{{students.length}} Clients</strong>



                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                         <StudentGrid
                            :students="students"
                            @add-item="addStudent"
                            @remove-item="refreshStudent"
                            @update-item="refreshStudent"
                          />
                       </div>
                   </div>

               </div>
               <div class="row">


                                              <div class="table-responsive">
                                                  <table class="table align-td-middle table-card">
                                                      <thead>
                                                      <tr>
                                                          <!-- <th>Avatar</th> -->
                                                          <th>Name</th>
                                                          <th>Gender</th>
                                                          <th>Phone Number</th>
                                                          <th>State</th>
                                                      </tr>
                                                      </thead>
                                                      <tbody>
                                                      <tr v-for="client in students" v-bind:key="client.id">
                                                          <!-- <td>
                                                              <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                                  class="avatar-img avatar-sm rounded-circle"
                                                                                                  alt=""></div>
                                                          </td> -->
                                                          <td >{{client.firstname}} {{client.lastname}}</td>
                                                          <td>{{client.gender}}</td>
                                                          <td>{{client.phone_number}}</td>
                                                          <td>{{client.state}}/{{client.localgovt}}</td>

                                                      </tr>


                                                      </tbody>
                                                  </table>

                                              </div>

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
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
     import StudentGrid from "./OfflineEmployee.vue";
     import { initJsStore } from "./../../service/idb_service";
     import { StudentService } from "./../../service/student_service";
     import { Global } from "./../../global";

export default {
  components: {
     Navbar, Loading, StudentGrid
  },
  async beforeCreate() {
    try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
        console.log("db created");
        // prefill database
      } else {
        console.log("db opened");
      }
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
  },
  mounted() {
    this.refreshStudent();
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      states:"",
      clients:"",
      state:"",
      students: [],
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"client",
                username:"",
                state:"",
                lga:"",
                ward:"",
                address:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                .then(response => {
                    this.clients = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    async refreshStudent() {
      this.students = await new StudentService().getStudents();
    },
    addStudent(student) {
      this.students.push(student);
    }


  },
  created(){
    this.getClients()
  }

}
</script>
