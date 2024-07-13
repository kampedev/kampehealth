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
                            <img :src="`https://insurance-api.hayokmedicare.ng/image/${client.user_image}`"
                                 class="avatar-img rounded-circle"   >
                        </span>
                           </label>
                         </div> -->
                       </div>
                       <strong> {{client.full_name}} </strong>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12">
                       <div class="card m-b-30">
                           <div class="card-header">
                             <div class="text-center">
                                <strong >Fingerprint Data</strong>
                             </div>
                           </div>

                           <div class="card-body">
                             <label class="h5">Scanner Type</label>
                               <select class="form-control" v-model="type">
                                 <option  value="4-4-2">4-4-2 Scanner</option>
                                 <option  value="single">Single Scanner</option>

                              </select>
                           </div>
                       </div>
                   </div>
               </div>

               <div class="row" v-if="type == '4-4-2'">
                   <div class="col-lg-8 col-md-8">
                       <div class="card m-b-30">


                           <div class="card-body" ref="printNow">

                             <div class="" >
                                   <div class="fileinput fileinput-new" data-provides="fileinput" >
                                     <span class="btn btn-file">
                                       <span class="fileinput-new">Upload Left Fingers</span>
                                       <span class="fileinput-exists">Change</span>
                                       <input type="file"   v-on:change="attachLeft">
                                     </span>
                                     <span class="fileinput-filename"></span>
                                     <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                 </div>

                                 <div class="fileinput fileinput-new" data-provides="fileinput" >
                                   <span class="btn btn-file">
                                     <span class="fileinput-new">Upload Right Fingers</span>
                                     <span class="fileinput-exists">Change</span>
                                     <input type="file" name="..." multiple   v-on:change="attachRight">
                                   </span>
                                   <span class="fileinput-filename"></span>
                                   <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                               </div>

                               <div class="fileinput fileinput-new" data-provides="fileinput" >
                                 <span class="btn btn-file">
                                   <span class="fileinput-new">Upload Thumbs</span>
                                   <span class="fileinput-exists">Change</span>
                                   <input type="file" name="..." multiple   v-on:change="attachThumbs">
                                 </span>
                                 <span class="fileinput-filename"></span>
                                 <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                              </div>

                             </div>

                           </div>
                       </div>
                   </div>


                   <div class="col-lg-4 col-md-4">
                       <div class="card m-b-30">

                           <div class="card-header">
                             <p><strong>Left Four FingerPrints: </strong></p>
                           </div>
                           <div class="card-body">
                             <!-- <img :src="`http://localhost:8000/image/${clientfinger.leftfour}`"> -->
                             <img :src="`https://insurance-api.hayokmedicare.ng/image/${clientfinger.leftfour}`">
                           </div>

                           <div class="card-header">
                             <p><strong>Right Four FingerPrints:</strong></p>
                           </div>
                           <div class="card-body">
                             <!-- <img :src="`http://localhost:8000/image/${clientfinger.rightfour}`"> -->
                             <img :src="`https://insurance-api.hayokmedicare.ng/image/${clientfinger.rightfour}`">
                           </div>

                           <div class="card-header">
                             <p><strong>Two Thumbs FingerPrints:</strong></p>
                           </div>
                           <div class="card-body">
                             <!-- <img :src="`http://localhost:8000/image/${clientfinger.thumbs}`"> -->
                             <img :src="`https://insurance-api.hayokmedicare.ng/image/${clientfinger.thumbs}`">
                           </div>

                           <img :src="output">

                       </div>
                   </div>

               </div>

               <div class="row" v-if="type == 'single'">
                  <SingleFingerprint/>
               </div>


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
  import SingleFingerprint from '@/views/clients/UploadFingerprintSingle.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
// import { WebCam } from "vue-web-cam";

export default {
  components: {
     Navbar, Loading, SingleFingerprint
  },
  data(){
    return{
      user:null,
      client:"",
      output:"",
      auth_user:"",
      selector:"",
      edit:false,
      type:"",
      isLoading: false,
      fullPage: true,
      leftfingers:"",
      rightfingers:"",
      thumbs:"",
      clientfinger:"",
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
    attachLeft(event){
    this.user = JSON.parse(localStorage.getItem('user'))
     this.leftfingers = event.target.files[0];
     console.log(event)
     this.uploadLeft()
 },
     attachRight(event){
     this.user = JSON.parse(localStorage.getItem('user'))
      this.rightfingers = event.target.files[0];
      console.log(event)
      this.uploadRight()
    },
    attachThumbs(event){
    this.user = JSON.parse(localStorage.getItem('user'))
     this.thumbs = event.target.files[0];
     console.log(event)
     this.uploadThumbs()
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

    fetchUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/fingerprint/${this.$route.params.id}`)
                  .then(response => {
                      this.clientfinger = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    uploadLeft(){
              this.isLoading = true;
              this.user = JSON.parse(localStorage.getItem('user'))

            var formData = new FormData();
            formData.append("user_id", this.$route.params.id)
            formData.append("leftfour", this.leftfingers)
            this.axios.post("/api/v1/auth/fingerprintLeftfour", formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              console.log(response);
                 this.isLoading = false;
                 this.$breadstick.notify("Biometric Image uploaded Successfully!", {position: "top-right"});
                 this.fetchUser()

            })
        },
        uploadRight(){
                  this.isLoading = true;
                  this.user = JSON.parse(localStorage.getItem('user'))

                var formData = new FormData();
                formData.append("user_id", this.$route.params.id)
                formData.append("rightfour", this.rightfingers)
                this.axios.post("/api/v1/auth/fingerprintRightfour", formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then(response => {
                  console.log(response);
                     this.isLoading = false;
                     this.$breadstick.notify("Biometric Image uploaded Successfully!", {position: "top-right"});
                     this.fetchUser()

                })
            },
            uploadThumbs(){
                      this.isLoading = true;
                      this.user = JSON.parse(localStorage.getItem('user'))

                    var formData = new FormData();
                    formData.append("user_id", this.$route.params.id)
                    formData.append("thumbs", this.thumbs)
                    this.axios.post("/api/v1/auth/fingerprintthumbs", formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    })
                    .then(response => {
                      console.log(response);
                         this.isLoading = false;
                         this.$breadstick.notify("Biometric Image uploaded Successfully!", {position: "top-right"});
                         this.fetchUser()

                    })
                },
                add(){
                  //
                }



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
