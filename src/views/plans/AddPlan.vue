<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

    <main class="admin-main">
        <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <strong>Plans</strong>
                       <div class="form-dark">
                           <!-- <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Employees" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div> -->
                       </div>

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

                                   <h3 class="p-t-10 searchBy-name">Add Plan</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-12">
                                                                 <label for="inputEmail4">Plan Title</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="plan.title">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Plan Price</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  v-model="plan.cost" >
                                                             </div>
                                                         </div>

                                                         <div class="form-row">

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Plan Interval</label>

                                                                   <select class="form-control"  v-model="plan.plan_inteval">
                                                                    <option id="yearly">Yearly</option>
                                                                    <option id="monthly">Monthly</option>
                                                                    <option id="weekly">Weekly</option>
                                                                    <option id="daily">Daily</option>
                                                                </select>
                                                             </div>
                                                         </div>
                                                         <div class="form-group">
                                                           <label for="inputCity">Plan Description</label>

                                                           <ckeditor :editor="editor" v-model="plan.description" :config="editorConfig"></ckeditor>
                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="addPlan">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>



                   <div class="col-lg-4 col-md-6" v-for="plan in plans" v-bind:key="plan.id">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#">{{plan.cost}}</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>

                                   </div>
                                   <h3 class="p-t-10 searchBy-name">{{plan.title}}</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                  {{plan.plan_inteval}}
                               </div>


                               <p class="text-muted text-center">

                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <button @click="editPlan(plan)">
                                           <h3 class="fe fe-edit"></h3>
                                           <div class="text-overline">Edit</div>

                                       </button>
                                   </div>
                                   <!-- <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-eye"></h3>
                                           <div class="text-overline">View</div>

                                       </a>

                                   </div> -->

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
    </main>
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
      plans:"",
      plan:{
        id:"",
        agency_id:"",
        title:"",
        description:"",
        plan_inteval:"",
        cost:""
      }

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/planAgency/${this.user.id}`)
                .then(response => {
                    this.plans = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

      getPlans(){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.get(`/api/v1/auth/planAgency/${this.user.id}`)
                    .then(response => {
                        this.plans = response.data.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      },
            addPlan(){
              this.user = JSON.parse(localStorage.getItem('user'))

              if (this.edit === false) {
              // Add comp
              this.isLoading = true;
              this.axios.post('/api/v1/auth/addPlan',{

                agency_id: this.user.id,
                title: this.plan.title,
                description: this.plan.description,
                plan_inteval: this.plan.plan_inteval,
                cost: this.plan.cost

              })

              .then(response=>{
                  console.log(response);
                  this.clearIt();
                  this.getPlans();
                  this.isLoading = false;
                  this.$breadstick.notify("Plan added Successfuly!", {position: "top-right"});


              })
              .catch(error=>{
                  console.log(error.response)
              })
              }else {
              // Update
              this.isLoading = true;
              this.axios.put(`/api/v1/auth/editPlan/${this.plan.id}`,{

                agency_id: this.user.id,
                title: this.plan.title,
                description: this.plan.description,
                plan_inteval: this.plan.plan_inteval,
                cost: this.plan.cost

              })

              .then(response=>{
                  console.log(response);
                  this.clearIt();
                  this.edit = false;
                  this.isLoading = false;
                  this.getPlans();
                  this.$breadstick.notify("Updated Plan Successfuly!", {position: "top-right"});


              })
              .catch(error=>{
                  console.log(error.response)
                  this.isLoading = false;

              })

              }
            },
            editPlan(plan) {
              this.edit = true;
              // this.plan.id = topic.id;
              // this.topic.topic_id = topic.id;
              this.plan.id = plan.id;
              this.plan.agency_id = plan.agency_id;
              this.plan.title = plan.title;
              this.plan.description = plan.description;
              this.plan.plan_inteval = plan.plan_inteval;
              this.plan.cost = plan.cost;

            },
            clearIt(){

              this.plan.title = "";
              this.plan.description = "";
              this.plan.cost = "";
              this.plan.plan_inteval ="";
            },

  },
  created(){
    this.getPlans()
  }

}
</script>
