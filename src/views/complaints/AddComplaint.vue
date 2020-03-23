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
                       <h3>Complaints</h3>
                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Complaints" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
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

                                   <h3 class="p-t-10 searchBy-name">Add Complaint</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">Complaint Title</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Name">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">HMO</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  >
                                                             </div>

                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Provider</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  >
                                                             </div>
                                                         </div>

                                                         <div class="form-row">
                                                             <div class="form-group col-md-12">
                                                                 <label for="inputCity">Description</label>
                                                                 <!-- <input type="text" class="form-control" id="inputCity"> -->
                                                                 <textarea name="name" rows="8" cols="80" class="form-control"></textarea>

                                                             </div>

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">xx</label>

                                                                   <select class="form-control">
                                                                    <option>Yearly</option>
                                                                    <option>Monthly</option>
                                                                    <option>Weekly</option>
                                                                </select>
                                                             </div>
                                                         </div>

                                                         <div class="form-group">
                                                             <button class="btn btn-primary">Submit</button>
                                                         </div>

                           </div>
                       </div>
                   </div>

                   <div class="col-lg-4 col-md-6">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#">1,200</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>

                                   </div>
                                   <h3 class="p-t-10 searchBy-name">Poor Service</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                  Michael Lowe

                               </div>

                               <p class="text-muted text-center">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet at
                                   odio quod rem rerum temporibus veniam vero.
                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-edit"></h3>
                                           <div class="text-overline">Edit</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="fe fe-eye"></h3>
                                           <div class="text-overline">View</div>

                                       </a>

                                   </div>

                               </div>
                           </div>
                       </div>
                   </div>




               </div>
           </div>

       </section>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
  components: {
     Navbar
  },
  data(){
    return{
      editor: ClassicEditor,

    }
  },
  beforeMount(){

  },
  methods:{

  },
  created(){

  }

}
</script>
