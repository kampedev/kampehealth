<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                       <div class="m-b-10">
                           <!-- <div class="avatar">
                             <label class="avatar-input">
                          <span class="avatar avatar-lg">
                              <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`"
                                   class="avatar-img rounded-circle"  v-if="client.user_image != null " >
                          </span>

                             </label>
                           </div> -->
                       </div>
                       <button v-clipboard="client.firstname">
                       <strong>{{client.firstname}} {{client.lastname}}</strong>
                     </button>

                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                                     <div class="form-group">
                                       <!-- <button class="btn btn-info spacer"  >Principal's Details</button> -->

                                         <button class="btn btn-success spacer" data-toggle="modal" data-target="#example_01">Capture Face </button>
                                         <router-link :to="{ path: '/client/biometrics/'+client.id, params: {} }">
                                           <button class="btn btn-info spacer"  >Biometrics</button>
                                        </router-link>
                                        <button class="btn btn-primary spacer"  @click="printMe">Print ID Card</button>

                                        <router-link :to="{ path: '/client/capture-signature/'+client.id, params: {} }">
                                          <button class="btn btn-info spacer" >Capture Signature</button>
                                        </router-link>

                                         <router-link :to="{ path: '/add-dependent/'+client.id, params: {} }">
                                           <button class="btn btn-info spacer"  v-if = "client.type == 'client' && client.category_of_vulnerable_group == null">Dependents</button>
                                         </router-link>
                                         <router-link :to="{ path: '/edit-user/'+client.id, params: {} }">
                                           <button class="btn btn-secondary spacer">Edit Client</button>
                                         </router-link>
                                     </div>

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-8 col-md-12" id="printDiv" ref="printNow">
                       <div class="card" style="background-image: url('../assets/img/kgshia_transparent.png'); background-size: cover; background-repeat: no-repeat;">
                           <div class="card-header ">
                             <div class="row spacer-top">
                               <div class="col-md-2">
                                 <span class="avatar avatar-xl">
                                     <img :src="`http://localhost:8080/assets/img/kgshia_logo.png`"
                                          class=" rounded-circle" >
                                 </span>
                               </div>
                               <div class="col-md-10 ">
                                 <strong ><h2 class="h1">Kogi State Health Insurance Agency </h2> </strong>
                               </div>
                             </div>

                           </div>

                           <div class="card-body row">

                             <div class="col-md-4" >
                               <vue-initials-img :name="client.firstname+' '+client.lastname" class="img-thumbnail" size="300"  v-if="client.user_image == null "/>
                               <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`" class="img spacer-top" alt="User Photo"  height="400px" v-if="client.user_image != null ">
                               <!-- <img :src="`http://localhost:8000/image/${client.user_image}`" class="img spacer-top" alt="Cinque Terre"  height="400px" v-if="client.user_image != null "> -->
                               <!-- <p class="btn btn-default spacer-top-bottom">
                                 <button type="button"  name="button"> Enrollment Card </button>
                               </p> -->

                             </div>

                              <div class="col-md-8">
                                <p class="h2 spacer-top-bottom"><strong class="text-primary">NAME :</strong> <strong>{{client.firstname }}</strong>, {{client.lastname}} {{client.middlename}}</p>
                                <hr>
                                <p class="h2 spacer-top-bottom"> <strong class="text-primary">ID NUMBER:</strong>  <strong>{{client.id_card_number}}</strong></p>
                                <hr>
                                <p class="h2 spacer-top-bottom"><strong class="text-primary">NIN NUMBER:</strong>  <strong>{{client.nimc_number}}</strong></p>
                                <hr>
                                <p class="h2 spacer-top-bottom"> <strong class="text-primary"> FACILITY TO ACCESS CARE:</strong> <strong>{{healthFacility.agency_name}}</strong> </p>
                                <!-- <hr> -->
                                <!-- <p class="h2 spacer-top-bottom"> <strong class="text-primary">ALTERNATE HEALTH FACILITY:</strong> <strong>{{healthFacility.agency_name}}</strong> </p> -->
                                <hr>
                                <p class="h2 spacer-top-bottom" v-if="client.place_of_work != null"> <strong class="text-primary">MDA:</strong> <strong> {{client.place_of_work}}</strong> </p>
                                <hr>
                                <p class="h2 spacer-top-bottom"> <strong class="text-primary">BLOOD GROUP:</strong> <strong> {{client.blood}}</strong> </p>
                                <hr>
                                <!-- <p class="h2 spacer-top-bottom"><strong class="text-primary">SECTOR:</strong>  <strong>{{client.sector}}</strong></p>
                                <hr> -->
                                <p class="h2 spacer-top-bottom"> <strong class="text-primary">SECTOR:</strong> <strong> {{client.sector}}</strong> </p>
                                <hr>
                              </div>

                           </div>
                       </div>
                   </div>

                       <div class="col-lg-4 col-md-12">
                           <div class="card m-b-30">
                               <div class="card-header">

                               </div>

                               <div class="card-body" >
                                   <div class="form-group">
                                       <button class="btn btn-info">Other Details</button>
                                   </div>


                                   <p class="spacer-top-bottom"><strong>NIMC Number:</strong> {{client.nimc_number}}</p>
                                   <hr>
                                   <p class="spacer-top-bottom"><strong>Gender:</strong> {{client.gender}}</p>
                                   <hr>
                                   <p class="spacer-top-bottom"><strong>Phone Number:</strong> {{client.phone_number}}</p>
                                   <hr>
                                   <p class="spacer-top-bottom"><strong>State/LGA:</strong> {{client.state}}/{{client.localgovt}} </p>
                                   <hr>
                                   <p class="spacer-top-bottom"><strong>Date of Birth:</strong> {{client.dob | moment("D/M/YYYY") }}</p>
                                   <hr>
                                   <p class="spacer-top-bottom"><strong>Email:</strong> {{client.email}}</p>
                                   <hr>

                                   <p class="spacer-top-bottom"><strong>Marital Status:</strong> {{client.marital_status }}</p>
                                   <hr>
                                   <p class="spacer-top-bottom" v-if = "client.type == 'client' && client.category_of_vulnerable_group == null"><strong>Grade Level:</strong> {{client.grade_level }}</p>
                                   <hr>
                                   <p class="spacer-top-bottom" v-if = "client.type == 'client' && client.category_of_vulnerable_group == null"><strong>Date of Entry:</strong> {{client.date_of_entry }}</p>
                                   <hr>
                                   <p class="spacer-top-bottom" v-if = "client.type == 'client' && client.category_of_vulnerable_group != null"><strong>Category of Vulnerable Group:</strong> {{client.category_of_vulnerable_group }}</p>

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

                                                                       <canvas id="canvas"  width="600px"   height="450px"></canvas>

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
      auth_user:"",
      client:"",
      notes:"",
      medications:"",
      healthFacility:"",
      signature:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      imagefile:"",
      output:"",
      pictureShower:true,
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
            }

    }
  },
  mounted(){
    this.print()

  var video = document.getElementById('video');
// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    // navigator.mediaDevices.getUserMedia({ video: true}).then(function(stream) {
    navigator.mediaDevices.getUserMedia(this.video_settings).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });

  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  // var video = document.getElementById('video');

    // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 500, 350);

    // get image
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    console.log(image)
    localStorage.setItem('snap',image);
    // this.this.uploadPic()

});


// function convertCanvasToImage(canvas) {
	// var image = new Image();
	// image.src = canvas.toDataURL("image/png");
	// return image;
// }

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

    async print() {
     const el = this.$refs.printNow;
     // add option type to get the image version
     // if not provided the promise will return
     // the canvas.
     const options = {
       type: 'dataURL'
     }
     this.output = await this.$html2canvas(el, options);
   },
    printMe(){
          var printContents = document.getElementById('printDiv').innerHTML;
          var originalContents = document.body.innerHTML;
          document.body.innerHTML = printContents;
          window.print();
          document.body.innerHTML = originalContents;
       },
       attachSign(event){
       this.user = JSON.parse(localStorage.getItem('user'))
        this.signature = event.target.files[0];
        console.log(event)
        this.uploadSign()
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

                      // get facility
                      this.axios.get(`/api/v1/auth/user/${this.client.provider_id}`)
                                  .then(response => {
                                      this.healthFacility = response.data.user
                                      console.log(response)
                                  })
                                  .catch(error => {
                                      console.error(error);
                                  })
                      //end of facility
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
  margin-left:5px;
  margin-top:5px;
  margin-bottom:5px;
}
.spacer-image{
  margin-top:25px;
}
.spacer-top-bottom{
  margin-top:10px;
  margin-bottom:10px;
}
.spacer-top{
  margin-top:50px;
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
