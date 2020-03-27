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
                       <h3>Claims</h3>
                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Claims" type="search"
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

                                   <h3 class="p-t-10 searchBy-name">Add Claim</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">Client Name</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="claim.client_name">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Select Agency</label>
                                                                 <select class="form-control"  v-model="claim.agency_id">
                                                                  <option v-for="agency in agencies" v-bind:key="agency.id" :value="agency.agency_id">{{agency.created_at}}</option>

                                                              </select>
                                                             </div>
                                                         </div>

                                                         <div class="form-row">

                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Seen Date</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="YYYY/MM/DD" v-model="claim.seen_date">
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Diagnosis</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="Diagnosis" v-model="claim.diagnosis">
                                                           </div>
                                                           <div class="form-group col-md-6">
                                                             <label for="inputCity">Cost</label>
                                                             <input type="text" class="form-control" id="inputEmail4" placeholder="Cost of treatment" v-model="claim.cost">
                                                           </div>

                                                             <div class="form-group col-md-12">
                                                                 <label for="inputCity">Treatment</label>
                                                                 <!-- <input type="text" class="form-control" id="inputCity"> -->
                                                                 <textarea name="name" rows="8" cols="80" class="form-control" v-model="claim.treatment"></textarea>
                                                             </div>

                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="makeClaim">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>



                   <div class="col-lg-4 col-md-6" v-for="claim in claims" v-bind:key="claim.id">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#">{{claim.cost}}</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>

                                   </div>
                                   <h3 class="p-t-10 searchBy-name">{{claim.client_name}}</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                  {{claim.diagnosis}}

                               </div>


                               <p class="text-muted text-center">
                                   {{claim.seen_date}}
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
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      editor: ClassicEditor,
      user:null,
      agencies:"",
      claims:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      claim:{
        agency_id:"",
        diagnosis:"",
        treatment:"",
        client_name:"",
        seen_date:"",
        cost:"",
      },


    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/claminByProvider${this.user.id}`)
                .then(response => {
                    this.claims = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    // clearIt(){
    //   this.claim.client_name ="",
    //   this.claim.cost = "",
    //   this.claim.treatment = "",
    //   this.claim.seen_date = "",
    //   this.claim.agency_id = "",
    //   this.claim.diagnosis = "",
    // },

// getClaims(){
//   this.user = JSON.parse(localStorage.getItem('user'))
//   this.axios.get(`/api/v1/auth/hmoProvider/${this.user.id}`)
//               .then(response => {
//                   this.claims = response.data.data
//                   console.log(response)
//               })
//               .catch(error => {
//                   console.error(error);
//               })
// },

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
makeClaim(){

        this.user = JSON.parse(localStorage.getItem('user'))

        if (this.edit === false) {
        // Add claim
        this.isLoading = true;
        this.axios.post('/api/v1/auth/addClaim',{

          provider_id: this.user.id,
          user_id: this.user.id,
          agency_id: this.claim.agency_id,
          client_name: this.claim.client_name,
          seen_date: this.claim.seen_date,
          diagnosis: this.claim.diagnosis,
          treatment: this.claim.treatment,
          cost: this.claim.cost,
        })

        .then(response=>{
            console.log(response);
            // this.clearIt();
            // this.getAgencies();
            this.isLoading = false;
            this.$breadstick.notify("Claim added Successfuly!", {position: "top-right"});


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
            // this.clearIt();
            this.fetchModule();
            this.edit = true;
            this.isLoading = false;
            this.$toasted.global.crudUpdated().goAway(1500);

        })
        .catch(error=>{
            console.log(error.response)
        })

      }

    }

  },
  created(){
    this.getHmo()
  }

}
</script>
