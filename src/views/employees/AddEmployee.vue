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
                       <h3>Employees </h3>
                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Employees" type="search"
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

                                   <h3 class="p-t-10 searchBy-name">Add Employee</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">First Name</label>
                                                                 <input type="text" class="form-control" id="inputEmail4" placeholder="Email">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Last Name</label>
                                                                 <input type="text" class="form-control" id="inputPassword4"  >
                                                             </div>
                                                         </div>
                                                         <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputEmail4">Email</label>
                                                                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Password</label>
                                                                  <input type="password" class="form-control" id="inputPassword4"  >
                                                              </div>
                                                          </div>
                                                          <div class="form-group">
                                                             <label for="inputAddress">Address</label>
                                                             <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                                                         </div>

                                                         <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputCity">City</label>
                                                                 <input type="text" class="form-control" id="inputCity">


                                                             </div>

                                                             <div class="form-group col-md-6">
                                                               <label for="inputCity">Employee type</label>

                                                                   <select class="form-control">
                                                                    <option>Clerk</option>
                                                                    <option>Finance</option>
                                                                    <option>Operator</option>
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
                                   <a class="badge badge-soft-success" href="#">Clerk</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>
                                       <div class="avatar avatar-xl avatar-away">
                                           <img class="avatar-img rounded-circle" src="assets/img/users/user-7.jpg"
                                                alt="name">
                                       </div>
                                   </div>
                                   <h3 class="p-t-10 searchBy-name">Isaac Williams</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                   React, VUE , WebGL <a class="btn btn-sm btn-white">View</a>

                               </div>


                               <p class="text-muted text-center">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet at
                                   odio quod rem rerum temporibus veniam vero.
                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-account-group"></h3>
                                           <div class="text-overline">Teams</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-check-all"></h3>
                                           <div class="text-overline">Tasks</div>

                                       </a>

                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-email-outline"></h3>
                                           <div class="text-overline">Message</div>

                                       </a>

                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-4 col-md-6">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-success" href="#">Operator</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>
                                       <div class="avatar avatar-xl avatar-dnd">
                                           <img class="avatar-img rounded-circle" src="assets/img/users/user-8.jpg"
                                                alt="name">
                                       </div>
                                   </div>
                                   <h3 class="p-t-10 searchBy-name">Joseph Simard</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                   Tweenjs, Pulse <a class="btn btn-sm btn-white">View</a>

                               </div>


                               <p class="text-muted text-center">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet at
                                   odio quod rem rerum temporibus veniam vero.
                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-account-group"></h3>
                                           <div class="text-overline">Teams</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-check-all"></h3>
                                           <div class="text-overline">Tasks</div>

                                       </a>

                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-email-outline"></h3>
                                           <div class="text-overline">Message</div>

                                       </a>

                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-4 col-md-6">
                       <div class="card m-b-30">
                           <div class="card-header">

                               <div class="card-controls">
                                   <a class="badge badge-soft-danger" href="#">FINANCE</a>

                               </div>
                           </div>
                           <div class="card-body">
                               <div class="text-center">
                                   <div>
                                       <div class="avatar avatar-xl avatar-offline">
                                           <img class="avatar-img rounded-circle" src="assets/img/users/user-10.jpg"
                                                alt="name">
                                       </div>
                                   </div>
                                   <h3 class="p-t-10 searchBy-name">Kingston Gauthier</h3>
                               </div>
                               <div class="text-muted text-center m-b-10">
                                   Tally, SAP <a class="btn btn-sm btn-white">View</a>

                               </div>


                               <p class="text-muted text-center">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet at
                                   odio quod rem rerum temporibus veniam vero.
                               </p>
                               <div class="row text-center p-b-10">
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-account-group"></h3>
                                           <div class="text-overline">Teams</div>

                                       </a>
                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-check-all"></h3>
                                           <div class="text-overline">Tasks</div>

                                       </a>

                                   </div>
                                   <div class="col">
                                       <a href="#">
                                           <h3 class="mdi mdi-email-outline"></h3>
                                           <div class="text-overline">Message</div>

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

export default {
  components: {
     Navbar
  },
  data(){
    return{

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
