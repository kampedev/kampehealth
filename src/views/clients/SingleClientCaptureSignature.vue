<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
       <div class="bg-dark m-b-10">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30 spacer-image">
                       <div class="m-b-10">
                         <div class="avatar">
                           <label class="avatar-input">
                        <span class="avatar avatar-lg">
                            <img :src="`https://insurance-api.hayokmedicare.ng/image/${client.user_image}`"
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
                   <div class="col-lg-12">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                                     <div class="text-center">
                                        <strong >Capture Signature</strong>
                                     </div>

                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <VueSignaturePad width="100%" height="300px" ref="signaturePad" />

                             <div class="col-md-6 offset-md-3" >
                               <button class="btn btn-success spacer" @click="save">Save</button>
                               <button class="btn btn-warning spacer" @click="undo">Undo</button>
                               <button class="btn btn-danger spacer" @click="clear">Clear</button>

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
      fingerprint:"",
      selector:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      signature:"",

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
  mounted(){
//
  },

  methods:{

    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.signature = data
      console.log(isEmpty);
      console.log(data);
      this.$toasted.info('Saved Successfully!', {position: 'top-center', duration:3000 })

    },
    clear(){
      this.$refs.signaturePad.clearSignature()
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
.wrapper {
  position: relative;
  width: 400px;
  height: 200px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.signature-pad {
  position: absolute;
  left: 0;
  top: 0;
  width:400px;
  height:200px;
  background-color: white;
}
</style>
