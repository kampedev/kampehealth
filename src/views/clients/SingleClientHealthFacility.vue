<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                       <div class="m-b-10">
                         <div class="avatar">
                           <label class="avatar-input">
                        <span class="avatar avatar-lg">
                            <img :src="`https://api.hayokinsurance.com/image/${auth_user.user_image}`"
                                 class="avatar-img rounded-circle"   >
                        </span>

                           </label>
                         </div>
                       </div>
                       <strong> {{client.firstname}} {{client.lastname}}</strong>
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
                                        <strong >Select Facility</strong>
                                     </div>

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">


                           <div class="card-body">

                             <div class="form-group text-center col-md-8">
                               <label for="inputCity">Select Facilitiy</label>
                                   <select class="form-control"  v-model="facility" >
                                    <option  value="Primary Health Center (PHC)">Primary Health Center (PHC)</option>
                                    <option  value="Secondary Health Center (PHC)">Secondary Health Center (SCH)</option>
                                    <option  value="Tertiary Health Center (PHC)">Tertiary Health Center (THC)</option>
                                </select>
                             </div>

                             <div class="form-group">
                                  <button class="btn btn-info"  @click="gotoSuccess">Complete Enrolment</button>
                             </div>

                           </div>
                       </div>
                   </div>

               </div>



               <!-- <div class="row">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <p><strong>CAC Document:</strong></p>
                           </div>

                           <div class="card-body">


                           </div>
                       </div>
                   </div>

               </div> -->

               <!-- Modal for Prescription/Notes -->
                                             <div class="modal fade "   id="example_01" tabindex="-1" role="dialog"
                                                  aria-labelledby="example_02" aria-hidden="true">
                                                 <div class="modal-dialog modal-dialog-centered modal-lg"  role="document">
                                                     <div class="modal-content " >

                                                         <div class="container-fluid ">
                                                             <button type="button" class="close" data-dismiss="modal"
                                                                     aria-label="Close">
                                                                 <span aria-hidden="true">&times;</span>
                                                             </button>
                                                             <div class="row ">
                                                                 <div class="col-md-12 p-t-20 p-b-20">

                                                                     <video id="video" width="100%" height="auto" autoplay></video>
                                                                     <p>
                                                                       <!-- <button id="snap" class="bg-navy btn btn-flat">Snap Photo</button> -->
                                                                       <button @click="takePic" class="bg-navy btn btn-flat">Snap Photo</button>
                                                                       <button type="button" class="btn btn-info" name="button" @click="savePic">Save pic</button>

                                                                     </p>
                                                                     <!-- <p> i am image  <img :src="imagefile" alt=""> </p> -->
                                                                     <!-- <p>{{imagefile}}</p> -->

                                                                       <canvas id="canvas"  width="720px"   height="550px"></canvas>

                                                                 </div>
                                                             </div>
                                                         </div>

                                                     </div>
                                                 </div>
                                             </div>
                                             <!-- Modal Ends -->

           </div>


           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>

       </section>
     </div>

   </section>
</template>

<script>

  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
// import { WebCam } from "vue-web-cam";

export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      client:"",
      auth_user:"",
      notes:"",
      facility:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      imagefile:"",
      pictureShower:true,

    }
  },

  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/user/${this.$route.params.id}`)
                .then(response => {
                    this.client = response.data.user
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },

  methods:{
    gotoSuccess(){
      localStorage.setItem('facility',this.facility);
      this.$router.push(`/client-submit-success/${this.$route.params.id}`)
    },
    authUser(){
      this.axios.get(`/api/v1/auth/user`)
                  .then(response => {
                      this.auth_user = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    takePic(){
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, 640, 480);

        // get image
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        console.log(image)
        localStorage.setItem('snap',this.imagefile.src);
        this.imagefile = image.src

        // upload image

        // end of upload image

    },

    savePic(){
      this.axios.post(`/api/v1/auth/uploadcustomerpicImage`,
       {
          user_image: this.imagefile,
          user_id: this.$route.params.id,

        })
                  .then(response => {
                      console.log(response)
                      this.$breadstick.notify("Profile Image changed Successfully!", {position: "top-right"});
                      this.fetchUser()
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    fetchUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/user/${this.$route.params.id}`)
                  .then(response => {
                      this.client = response.data.user
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    uploadPic(){
              this.isLoading = true;
        let  snap = localStorage.getItem('snap')

            var formData = new FormData();
            formData.append("user_image", snap)
            this.axios.post("/api/v1/auth/uploadUserImage", formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              console.log(response);
                 this.isLoading = false;
                 this.$breadstick.notify("Profile Image changed Successfully!", {position: "top-right"});
                 // this.getUser()

            })

        },

    createRecord(){
        this.isLoading = true;
        this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.post('/api/v1/auth/addHealthRecord',{
          notes: this.notes,
          medications: this.medications,
          patient_id: this.appoint.data.patient_id,
          appointment_id: this.$route.params.id,
          professional_id: this.appoint.data.professional_id,
          provider_id: this.user.institutional_id,

          reasonVisit: 'Consulation',
          testResult: "this.user.institutional_id",
          drVisited: 'this.user.institutional_id',
          documents: 'this.user.institutional_id',
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.fetchSingelAPpointment()
            this.$breadstick.notify("Record created successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    },

    acceptProvider(){
      if (confirm('Are You Sure You Want to Approve Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 1

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Approved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()

    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    rejectProvider(){
      if (confirm('Are You Sure You Want to Disapprove this Provider?')) {

      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/approveDisapproveProviderByAgency',{
        agency_id: this.user.id,
        provider_id: this.$route.params.id,
        status: 0

      })
    .then(response=>{
        console.log(response);
        this.$breadstick.notify("Provider Disapproved!", {position: "top-right"});
        this.isLoading = false;
        this.getProvider()

    })
    .catch(error=>{
        console.log(error.response)
        this.isLoading = false;

        })
      }
    },
    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.fetchUser()
    this.authUser()

  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
.spacer-image{
  margin-top:25px;
}
.spacer-top-bottom{
  margin-top:7px;
  margin-bottom:7px;
}
#container {
	margin: 0px auto;
	width: 500px;
	height: 375px;
	border: 10px #333 solid;
}
#videoElement {
	width: 500px;
	height: 375px;
	background-color: #666;
}
</style>
