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
                       <h3 class="h3">Service Summary Details</h3>

                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="row col-md-12">
                               <!-- <textarea name="name" rows="8" cols="80" class="form-control" v-model="claim.treatment"></textarea> -->
                               <div class="col-md-12">
                                 <p class="h4">Service Details:</p>
                               </div>

                               <div class="table-responsive">
                                   <table class="table align-td-middle table-card">
                                       <thead>
                                       <tr>
                                           <th>Treatment</th>
                                           <th>Quantity/Dsage</th>
                                           <th>Cost</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <!-- <tr v-for="dependent in dependents" v-bind:key="dependent.id"> -->
                                       <tr><td>Consulation</td> <td>3</td> <td>4,500</td> </tr>
                                       <tr><td>Urine</td> <td>1</td> <td>10,000</td> </tr>
                                       <tr><td>Silver nitrate</td> <td>5</td> <td>3,000</td> </tr>

                                       <!-- <tr >

                                           <td>
                                             {{dependent.firstname}}

                                           </td>
                                           <td>{{dependent.email}}/{{dependent.phone_number}}</td>
                                           <td>{{dependent.state}}/{{dependent.lga}}</td>
                                           <td>{{dependent.relationShipType}}</td>

                                       </tr> -->

                                       </tbody>
                                   </table>

                               </div>


                             </div>


                           </div>
                       </div>
                   </div>

                   <div class=" col-md-4 card">
                     <div class="card-body">
                       <p><strong>Lookman Hassan</strong> </p>
                       <p><strong> KAMPE/02292</strong></p>
                       <p> <strong>28</strong> </p>
                       <p><strong>13/12/12</strong> </p>
                       <p> <strong> Grand Total:</strong> 17,500</p>
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
      randomvalue:"",
      claims:"",
      min:100000000000000000,
      max:1000000000000000000,
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
  computed:{
    randomNumber: function () {
     let authorization_code = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
     return  authorization_code
    }
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
