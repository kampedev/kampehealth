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
                       <h3>Agencies</h3>
                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Employees" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div>

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

                                   <h3 class="p-t-10 searchBy-name">Add Agency</h3>
                               </div>

                               <div class="form-row">

                                 <!-- <p v-for="hmo in hmos" v-bind:key="hmo.id">rr {{hmo.agency_name}}</p> -->

                                   <div class="form-group col-md-12">
                                     <label for="inputCity">Agency</label>

                                         <select class="form-control"  v-model="agency_id">
                                          <option id="Parent" v-for="hmo in hmos" v-bind:key="hmo.id" :value="hmo.id">{{hmo.agency_name}}</option>

                                      </select>
                                   </div>
                               </div>


                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="addAgency">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>



                   <div class="col-lg-4 col-md-6" v-for="agency in agencies" v-bind:key="agency.id">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#" v-if="agency.status == 1">approved</a>
                                   <a class="badge badge-soft-warning" href="#" v-if="agency.status == 0">pending</a>



                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <!-- <div>
                                       <div class="avatar avatar-xl avatar-away">
                                           <img class="avatar-img rounded-circle" src="assets/img/users/user-7.jpg"
                                                alt="name">
                                       </div>
                                   </div> -->
                                   <h3 class="p-t-10 searchBy-name">{{agency.agency_name}}</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                  {{agency.phone_number}}

                               </div>

                               <p class="text-muted text-center">

                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-edit"></h3>
                                           <div class="text-overline">Edit</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-eye"></h3>
                                           <div class="text-overline">View</div>

                                       </a>

                                   </div>

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


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      hmos:"",
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

    this.axios.get(`/api/v1/auth/allHmo`)
                .then(response => {
                    this.hmos = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getHmo(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/hmoProvider/${this.user.id}`)
                  .then(response => {
                      this.agencies = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addAgency(){

      this.user = JSON.parse(localStorage.getItem('user'))

      if (this.edit === false) {
      // Add dependent
      this.isLoading = true;
      this.axios.post('/api/v1/auth/providerApply',{

        provider_id: this.user.id,
        agency_id: this.agency_id,
        status: false,
      })

      .then(response=>{
          console.log(response);
          this.clearIt();
          this.getHmo();
          this.isLoading = false;
          this.$breadstick.notify("Agency added Successfully!", {position: "top-right"});


      })
      .catch(error=>{
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

      this.agency_id = "";

    },

  },
  created(){
    this.getHmo()
  }

}
</script>
