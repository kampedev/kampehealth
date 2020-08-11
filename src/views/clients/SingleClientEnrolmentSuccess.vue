<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <strong>Congratulations!!! </strong>
                   </div>

               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-md-6 offset-md-3">
                       <div class="card m-b-30">



                       </div>
                   </div>
               </div>

               <img :src="`https://api.hayokinsurance.com/image/${auth_user.user_image}`" class="rounded col-md-6 offset-md-3" alt="Cinque Terre" width="200px" height="400px">


               <div class="row">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">
                           <div class="card-header">
                           </div>

                           <div class="card-body">

                            <strong class="display-4">{{client.firstname}} {{client.lastname}} has been successfully enrolled into Zamfara Contributory Health Scheme.</strong>

                           </div>
                       </div>
                   </div>

                   <button  class="col-md-6 offset-md-3 btn btn-info spacer-top-bottom" name="button" @click="printMe">Print Enrolment ID Card</button>


               </div>


               <div class="row" id="printDiv">
                   <div class="col-md-12">
                       <div class="card ">
                           <div class="card-header">
                             <p><strong>Patient ID Card</strong></p>


                           </div>

                           <div class="card-body">

                             <div class="col-md-12">
                               <img :src="`https://api.hayokinsurance.com/image/${auth_user.user_image}`" class="rounded mx-auto d-block" style="width:320px;height:240px;">
                             </div>

                             <div class="row">
                               <div class="col-md-4">
                                 <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`" class="rounded" alt="Cinque Terre" width="304" height="236">
                               </div>
                               <div class="col-md-8">
                                 <p class="spacer-top-bottom"><strong>Name:</strong>  {{client.firstname }} {{client.lastname}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Email:</strong> {{client.email}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Phone Number:</strong> {{client.phone_number}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Sector:</strong> {{sector}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Facility:</strong> {{facility}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>State/LGA:</strong> {{client.state}}/{{client.localgovt}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Date of Birth:</strong> {{client.dob | moment("dddd, MMMM Do YYYY") }}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Gender:</strong> {{client.gender}}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Weight:</strong> {{client.weight }}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Blood Group:</strong> {{client.blood }}</p>
                                 <hr>
                                 <p class="spacer-top-bottom"><strong>Genotype:</strong> {{client.genotype }}</p>

                               </div>

                             </div>

                           </div>
                       </div>
                   </div>

               </div>

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
      auth_user:"",
      client:"",
      facility:"",
      sector:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      imagefile:"",
      pictureShower:true,

    }
  },

  beforeMount(){
    this.$toasted.info('Enrolment completed Successfully', {position: 'top-center', duration:3000 })

    this.user = JSON.parse(localStorage.getItem('user'))
    this.sector = localStorage.getItem('sector')
    this.facility = localStorage.getItem('facility')
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
    printMe(){
          var printContents = document.getElementById('printDiv').innerHTML;
          var originalContents = document.body.innerHTML;
          document.body.innerHTML = printContents;
          window.print();
          document.body.innerHTML = originalContents;
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
