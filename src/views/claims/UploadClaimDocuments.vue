<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">


                   <div class="col-md-6 text-center mx-auto text-white ">
                     <div class="m-b-10">
                         <div class="avatar ">
                         </div>
                     </div>
                       <h3 class="h3">Document Upload Form </h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">

                   <div class="card col-md-8">
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Document</th>
                                   <th>Date Uploaded</th>
                                   <th>Action</th>

                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="doc in singleclaim.docs" v-bind:key="doc.id">


                                   <td>{{doc.document}}</td>
                                   <td>{{doc.created_at}}</td>
                                   <td>
                                     <a :href="'https://api.hayokinsurance.com/documents/'+ doc.document"  target="_blank">
                                       <button class="btn btn-info" name="button"><i class="fe fe-eye"></i> </button>
                                     </a>
                                   </td>

                               </tr>

                               </tbody>
                           </table>

                       </div>
                   </div>

                   <div class="col-lg-4 col-md-4">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="row ">
                               <div class="fileinput fileinput-new" data-provides="fileinput" >
                                 <span class="btn btn-secondary  btn-lg btn-file">
                                   <span class="fileinput-new"><i class="fe fe-upload"></i> Upload Document</span>
                                   <span class="fileinput-exists">Change</span>
                                   <input type="file" name="..." multiple   v-on:change="attachPic">
                                 </span>
                                 <span class="fileinput-filename"></span>
                                 <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                              </div>

                              <button class="btn btn-primary btn-lg" @click="singleClaim()" style="margin-left:25px;">Proceed to Claim</button>

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
      services:"",
      singleclaim:"",
      drugs:"",
      quantity:"",
      cost:"",
      singleservice:"",
      singledrug:"",
      claims:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      addservice:{
        services_id:"",
        drugs_id:"",
      },


    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/services`)
                .then(response => {
                    this.services = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },

  methods:{
    singleClaim(){
      this.$router.push(`/claim/${this.$route.params.id}`)

    },


    clearIt(){
      this.addservice.services_id =""
      this.addservice.drugs_id = ""
      this.quantity = ""
      this.calcCost = ""
    },
    getSingleClaim(){
      this.axios.get(`/api/v1/auth/detailedClaim/${this.$route.params.id}`)
                  .then(response => {
                      this.singleclaim = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


    attachPic(event){
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(event)
     this.image = event.target.files[0];
     this.uploadPicture()
 },
 uploadPicture(){
   this.isLoading = true;
       this.user = JSON.parse(localStorage.getItem('user'))
         var formData = new FormData();
         formData.append("claim_document", this.image)
         formData.append("claim_id", this.$route.params.id)
         this.axios.post("/api/v1/auth/uploadClaimDocument", formData, {
           headers: {
             'Content-Type': 'multipart/form-data'
           }
         })
         .then(response => {
           console.log(response);
              this.isLoading = false;
              this.$toasted.info('Added Successfully', {position: 'top-center', duration:3000 })

              this.getSingleClaim()

         })
         .catch(error => {
           this.$toasted.error('Error Uploading', {position: 'top-center', duration:3000 })
             console.error(error);
             this.isLoading = false;

         })
     },



  },
  created(){
    this.getSingleClaim()
  }

}
</script>
