<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3>Add Dependent</h3>
                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Employees" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div> -->
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                               <div class="text-center">

                                   <!-- <h3 class="p-t-10 searchBy-name">Add Dependent</h3> -->
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">First Name</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="First Name" v-model="dependent.firstname">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Last Name</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  placeholder="Last Name" v-model="dependent.lastname" >
                                                             </div>
                                                         </div>
                                                         <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputEmail4">Email</label>
                                                                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email"  v-model="dependent.email">
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Phone Number</label>
                                                                  <input type="text" class="form-control" id="inputPassword4" placeholder="Mobile No" v-model="dependent.phone_number" >
                                                              </div>
                                                          </div>

                                                         <div class="form-row">

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Relationship type</label>

                                                                   <select class="form-control"  v-model="dependent.relationShipType">
                                                                    <!-- <option id="Parent">Parent</option> -->
                                                                    <!-- <option id="Sibling">Sibling</option> -->
                                                                    <option id="Spouse">Spouse</option>
                                                                    <option id="ward">Ward</option>
                                                                </select>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Sex</label>

                                                                   <select class="form-control"  v-model="dependent.sex">
                                                                    <!-- <option id="Parent">Parent</option> -->
                                                                    <!-- <option id="Sibling">Sibling</option> -->
                                                                    <option id="Male">Male</option>
                                                                    <option id="Female">Female</option>
                                                                </select>
                                                             </div>

                                                         <div class="form-group col-md-6">
                                                           <label for="inputCity">Date of Birth</label>

                                                              <!-- <input type="text" class="js-datepicker form-control" placeholder="Select a Date"> -->
                                                              <!-- <datepicker v-model="dependent.dob" class="form-control"></datepicker> -->
                                                              <input type="text" class="form-control"  placeholder="YYY/MM/DD" v-model="dependent.dob" >

                                                         </div>

                                                         <div class="row">
                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">States</label>

                                                                 <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                                  <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                                                              </select>
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">LGA</label>

                                                                 <select class="form-control"  v-model="dependent.lga">
                                                                  <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.local_name">{{lga.local_name}}</option>
                                                              </select>
                                                           </div>
                                                         </div>
                                                         <div class="form-group col-md-6">
                                                           <label for="inputCity">Health Facility</label>
                                                               <select class="form-control"  v-model="dependent.age">

                                                                <option  value="7"> 7</option>

                                                            </select>
                                                         </div>
                                                       </div>





                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="addDependant">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>

               </div>
           </div>

           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>

       </section>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
     // import Datepicker from 'vuejs-datepicker';


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      dependents:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      states:"",
      state:"",
      lga_states:"",
      dependent:{
        firstname:"",
        lastname:"",
        email:"",
        phone_number:"",
        relationShipType:"",
        sex:"",
        lga:"",
        dob:""
      }
    }
  },
  beforeMount(){

  },
  methods:{
    getDependents(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/allDependantUser/${this.user.id}`)
                  .then(response => {
                      this.dependents = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getStates(){
      this.axios.get(`/api/v1/auth/states`)
                  .then(response => {
                      this.states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchLga(state){
      this.axios.get(`/api/v1/auth/lga/${state.id}`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addDependant(){

      this.user = JSON.parse(localStorage.getItem('user'))

      if (this.edit === false) {
      // Add dependent
      this.isLoading = true;
      this.axios.post('/api/v1/auth/addDependant',{

        firstname: this.dependent.firstname,
        lastname: this.dependent.lastname,
        relationShipType: this.dependent.relationShipType,
        user_id: this.user.id,
        email: this.dependent.email,
        phone_number: this.dependent.phone_number,
        state: this.state.name,
        lga: this.dependent.lga,
        dob: this.dependent.dob,
      })

      .then(response=>{
          console.log(response);
          this.clearIt();
          this.getDependents();
          this.isLoading = false;
          this.$breadstick.notify("Dependent added Successfuly!", {position: "top-right"});


      })
      .catch(error=>{
        this.isLoading = false;

          console.log(error.response)
      })
      }else {
      // Update
      this.isLoading = true;
      this.axios.put('/api/v1/auth/addDependant',{

        topic_id: this.topic.id,
        topic_name: this.topic.topic_name,
        // module_id: this.course.id,
        module_id: this.$route.params.id,
        topic_content: this.topic.topic_content,
        video: this.topic.video,
        audio: this.audio,
        doc: this.doc,

      })

      .then(response=>{
          console.log(response);
          this.clearIt();
          this.fetchModule();
          this.edit = true;
          this.isLoading = false;
          this.$toasted.global.crudUpdated().goAway(1500);

      })
      .catch(error=>{
          console.log(error.response)
      })

      }
    },

    clearIt(){

      this.dependent.firstname = "";
      this.dependent.lastname = "";
      this.dependent.email = "";
      this.dependent.phone_number ="";
    },

  },
  created(){
    this.getDependents()
    this.getStates()
    this.getFetchLga()
  }

}
</script>
