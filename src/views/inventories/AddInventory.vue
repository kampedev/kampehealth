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
                       <h3>Add Inventory</h3>
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

                                   <!-- <h3 class="p-t-10 searchBy-name">Add Record</h3> -->
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <!-- <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="complaint.title"> -->

                                                                 <label for="inputCity">Select Patient</label>
                                                                     <select class="form-control" v-model="record.patient_id">
                                                                      <option v-for="client in clients" v-bind:key="client.id" :value="client.id">{{client.firstname}} {{client.lastname}}</option>

                                                                  </select>
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Reason for Visit</label>

                                                                   <select class="form-control" v-model="record.reasonVisit">
                                                                    <option value="General Consultation">General Consultation</option>
                                                                    <option value="Laboratory Test">Laboratory Test</option>
                                                                    <option value="Regular Check ups">Regular Check ups</option>
                                                                </select>
                                                             </div>

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Doctor Visited</label>

                                                                   <select class="form-control" v-model="record.drVisited">
                                                                    <option value="Dr. Ibrahim Yakubu">Dr. Ibrahim Yakubu</option>
                                                                    <option value="Dr. Grema Yahaya">Dr. Grema Yahaya</option>
                                                                    <option value="Dr. Umar Mohammed">Dr. Umar Mohammed</option>
                                                                </select>
                                                             </div>

                                                             <!-- <div class="form-group col-md-6">
                                                               <label for="inputCity">Doctor Visited</label>

                                                                   <select class="form-control" v-model="complaint.type">
                                                                    <option id="Quality of Service">General Consultation</option>
                                                                    <option id="Financial Issue">Laboratory Test</option>
                                                                    <option id="Administrative">Regular Check ups</option>
                                                                </select>
                                                             </div> -->

                                                         </div>

                                                         <div class="form-row">
                                                             <div class="form-group col-md-12" v-if="record.reasonVisit == 'Laboratory Test' ">
                                                                 <label for="inputCity">Test Record</label>
                                                                 <!-- <ckeditor :editor="editor" v-model="complaint.description" :config="editorConfig"></ckeditor> -->
                                                                 <textarea class="form-control" rows="6" v-model="record.testResult" ></textarea>

                                                             </div>

                                                             <div class="form-group col-md-12">
                                                                 <label for="inputCity">Consultation Notes</label>
                                                                 <!-- <ckeditor :editor="editor" v-model="complaint.description" :config="editorConfig"></ckeditor> -->
                                                                 <textarea class="form-control" rows="6" v-model="record.medications" ></textarea>

                                                             </div>


                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="AddRecord">Submit</button>
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


               </div>
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

export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      editor: ClassicEditor,
      editorConfig: {
                   // The configuration of the editor.
               },
      user:null,
      edit:false,
      isLoading: false,
      fullPage: true,
      clients:"",
      record:{
        provider_id:"",
        patient_id:"",
        reasonVisit:"",
        drVisited:"",
        testResult:"no test conducted",
        documents:"no document uploaded",
        medications:"",
      }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getSubscribedProvider/${this.user.id}`)
                .then(response => {
                    this.clients = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

        AddRecord(){

          this.user = JSON.parse(localStorage.getItem('user'))

          if (this.edit === false) {
          // Add comp
          this.isLoading = true;
          this.axios.post('/api/v1/auth/addHealthRecord',{

            provider_id: this.user.id,
            patient_id: this.record.patient_id,
            reasonVisit: this.record.reasonVisit,
            testResult: this.record.testResult,
            drVisited: this.record.drVisited,
            medications: this.record.medications,
            documents: this.record.documents,

          })

          .then(response=>{
              console.log(response);
              this.clearIt();
              this.isLoading = false;
              this.$breadstick.notify("Record added Successfuly!", {position: "top-right"});


          })
          .catch(error=>{
              console.log(error.response)
          })
          }else {
          // Update
          this.isLoading = true;
          this.axios.put('/api/v1/auth/makeComplaints',{

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
        getClients(){
          this.user = JSON.parse(localStorage.getItem('user'))
          this.axios.get(`/api/v1/auth/getSubscribedProvider/${this.user.id}`)
                      .then(response => {
                          this.clients = response.data.data
                          console.log(response)
                      })
                      .catch(error => {
                          console.error(error);
                      })
        },

        clearIt(){
          this.record.patient_id = "";
          this.record.drVisited = "";
          this.record.medications = "";
          this.record.reasonVisit ="";
          this.record.testResult ="";
        },

  },
  created(){
//
  }

}
</script>
