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
                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Claims" type="search"
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
       <section class="">
           <div class="container">

               <div class="row list">


                   <div class="col-lg-4 col-md-6" v-for="claim in claims" v-bind:key="claim.id">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#"><i class="mdi mdi-currency-ngn"></i>{{claim.cost | numeral('0,0.00')}}</a>

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
                                     <router-link :to="{ path: '/claim-' + claim.id }">
                                           <h3 class="fe fe-eye"></h3>
                                           <div class="text-overline">View</div>

                                         </router-link>

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
     // import Datepicker from 'vuejs-datepicker';

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

    clearIt(){

      this.claim.client_name =""
      this.claim.cost = ""
      this.claim.treatment = ""
      this.claim.seen_date = ""
      this.claim.agency_id = ""
      this.claim.diagnosis = ""
    },

getClaims(){
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
            this.clearIt();
            this.getClaims();
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
