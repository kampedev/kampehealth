<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>

                       <strong><h3>My Complaints</h3></strong>

                   </div>

               </div>
           </div>
       </div>
       <section>
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8" v-show="show">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">
                               <div class="text-center">

                                   <h3 class="p-t-10 searchBy-name">Edit Complaint</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">Complaint Title</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="complaint.title">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Type</label>

                                                                   <select class="form-control" v-model="complaint.type">
                                                                    <option id="Quality of Service">Quality of Service</option>
                                                                    <option id="Financial Issue">Financial Issue</option>
                                                                    <option id="Administrative">Administrative</option>
                                                                </select>
                                                             </div>


                                                         </div>

                                                         <div class="form-row">
                                                             <div class="form-group col-md-12">
                                                                 <label for="inputCity">Description</label>
                                                                 <!-- <ckeditor :editor="editor" v-model="complaint.description" :config="editorConfig"></ckeditor> -->
                                                                 <textarea class="form-control" rows="6" v-model="complaint.description" ></textarea>


                                                             </div>


                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="AddComplaint">Submit</button>
                                                         </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-12 m-b-30">
                       <h5> <i class="fe fe-alert-circle"></i> Complaints</h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Status</th>
                                   <th>Action</th>

                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="complaint in complaints" v-bind:key="complaint.id">
                                   <td>{{complaint.title}}</td>
                                   <td>{{complaint.type}}</td>
                                   <td>
                                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-secondary" v-if="complaint.status == 'unanswered'">unanswered</button>
                                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning" v-if="complaint.status == 'open'">open</button>
                                     <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-info" v-if="complaint.status == 'closed'">closed</button>


                                   </td>
                                   <td>
                                     <!-- <button type="button" class="btn btn-default"  @click="editComplaint(complaint)">edit</button> -->
                                     <router-link :to="{ path: '/complaint/'+complaint.id, params: {} }">
                                     <button type="button" class="btn btn-info"  name="button">view</button>
                                   </router-link>

                                   </td>
                               </tr>

                               </tbody>
                           </table>

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
      show:false,
      isLoading: false,
      fullPage: true,
      complaints:"",
      complaint:{
        title:"",
        description:"",
        type:""
      }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{

    getComplaints(){
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.type =='client') {
        this.axios.get(`/api/v1/auth/complaints/${this.user.id}`)
                    .then(response => {
                        this.complaints = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
      else {
        this.axios.get(`/api/v1/auth/complaints/agency/439078`)
                    .then(response => {
                        this.complaints = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },

        AddComplaint(){
          this.user = JSON.parse(localStorage.getItem('user'))
          if (this.edit === false) {
          // Add comp
          this.isLoading = true;
          this.axios.post('/api/v1/auth/makeComplaints',{

            title: this.complaint.title,
            description: this.complaint.description,
            type: this.complaint.type,
            status: 'unanswered'

          })

          .then(response=>{
              console.log(response);
              this.clearIt();
              this.getComplaints();
              this.isLoading = false;
              this.$breadstick.notify("Complaint added Successfuly!", {position: "top-right"});


          })
          .catch(error=>{
              console.log(error.response)
          })
          }else {
          // Update
          this.isLoading = true;
          this.axios.put('/api/v1/auth/makeComplaints',{

            title: this.complaint.title,
            description: this.complaint.description,
            type: this.complaint.type,
            status: 'unanswered'

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

        clearIt(){
          this.complaint.title = "";
          this.complaint.description = "";
          this.complaint.type = "";
        },
        editComplaint(complaint){
          this.show = true
          this.edit = true;
          this.complaint.id = complaint.id;
          this.complaint.title = complaint.title;
          this.complaint.description = complaint.description;
          this.complaint.type = complaint.type;
        }

  },
  created(){
    this.getComplaints()
  }

}
</script>
