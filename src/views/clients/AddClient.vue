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
                       <h3>Clients</h3>
                       <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Clients" type="search"
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

                                   <h3 class="p-t-10 searchBy-name">Add Client</h3>
                               </div>

                                                        <div class="form-row">
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputEmail4">First Name</label>
                                                                 <input type="text" class="form-control" v-model="register.firstname" placeholder="First Name">
                                                             </div>
                                                             <div class="form-group col-md-6">
                                                                 <label for="inputPassword4">Last Name</label>
                                                                 <input type="text" class="form-control" v-model="register.lastname"  placeholder="First Name">
                                                             </div>
                                                         </div>
                                                         <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputEmail4">Email</label>
                                                                  <input type="email" class="form-control" v-model="register.email" placeholder="Email">
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Phone Number</label>
                                                                  <input type="text" class="form-control" v-model="register.phone_number" placeholder="Phone Number" >
                                                              </div>
                                                          </div>

                                                          <div class="row">
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">States</label>

                                                                  <select class="form-control"  v-model="state" @change="fetchLga(state)">
                                                                   <option v-for="state in states" v-bind:key="state.id" :value="state.name">{{state.name}}</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                              <label for="inputCity">LGA</label>

                                                                  <select class="form-control"  v-model="register.lga">
                                                                   <option v-for="lga in lga_states.lgas" v-bind:key="lga" :value="lga">{{lga}}</option>
                                                               </select>
                                                            </div>
                                                          </div>

                                                          <div class="form-row">
                                                              <div class="form-group col-md-6">
                                                                  <label for="inputCity">Ward</label>
                                                                  <input type="text" class="form-control" v-model="register.ward" placeholder="Ward">
                                                              </div>

                                                          </div>

                                                          <div class="form-group">
                                                             <label for="inputAddress">Address</label>
                                                             <textarea name="name" rows="8" cols="80"  class="form-control" v-model="register.address" placeholder="1234 Main St"></textarea>
                                                         </div>



                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="registerUser">Submit</button>
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
                                   Okene, Kogi
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
      isLoading: false,
      fullPage: true,
      states:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"client",
                state:"",
                lga:"",
                ward:"",
                address:"",
            }
    }
  },
  beforeMount(){

  },
  methods:{

    getStates(){
      this.axios.get(`http://locationsng-api.herokuapp.com/api/v1/states`)
                  .then(response => {
                      this.states = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchLga(state){
      this.axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${state}/details`)
                  .then(response => {
                      this.lga_states = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    registerUser(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/register',{
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          state: this.state,
          role: 0,
          lga: this.register.lga,
          ward: this.register.ward,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Client added successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }
  },
  created(){
    this.getStates()
  }

}
</script>
