<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-12  mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3 class="text-center"> Drug Listing</h3>
                       <button type="button" name="button" class="btn btn-primary text-right" data-toggle="modal" data-target="#example_02">Add Drug</button>


                       <!-- <div class="form-dark">
                           <div class="input-group input-group-flush mb-3">
                               <input placeholder="Filter Clients" type="search"
                                      class="form-control form-control-lg search form-control-prepended">
                               <div class="input-group-prepend">
                                   <div class="input-group-text">
                                       <i class="mdi mdi-magnify"></i>
                                   </div>
                               </div>
                           </div>
                       </div> -->

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <!-- <th>Avatar</th> -->
                                         <!-- <th>Name</th> -->
                                         <th>Dr. Visited</th>
                                         <th>Reason for Visit</th>
                                         <th>Date</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="record in records" v-bind:key="record.id">
                                         <!-- <td>
                                             <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                                 class="avatar-img avatar-sm rounded-circle"
                                                                                 alt=""></div>
                                         </td> -->
                                         <!-- <td >{{client.firstname}} {{client.lastname}}</td> -->
                                         <td>{{record.drVisited}}</td>
                                         <td>{{record.reasonVisit}}</td>
                                         <td>{{record.created_at}}</td>

                                     </tr>


                                     </tbody>
                                 </table>

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

                    <!-- Modal -->
                                                  <div class="modal fade "   id="example_02" tabindex="-1" role="dialog"
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

                                                                              <div class="form-row">
                                                                                <div class="form-group col-md-6">
                                                                                    <label for="inputPassword4">Name</label>
                                                                                    <input type="text" class="form-control" v-model="inventory.description" placeholder="Name" >
                                                                                </div>
                                                                              </div>


                                                                              <div class="form-row">
                                                                                  <div class="form-group col-md-6">
                                                                                      <label for="inputCity">Inventory Type</label>
                                                                                      <select class="form-control"  v-model="inventory.inventory_type">
                                                                                       <option  value="Drugs">Drugs</option>
                                                                                       <option  value="Laboratory Facility">Laboratory Facility</option>
                                                                                       <option  value="Consumables">Consumables</option>
                                                                                       <option  value="Others">Others</option>
                                                                                   </select>
                                                                                  </div>

                                                                              </div>



                                                                              <div class="form-row">
                                                                                <div class="form-group col-md-6">
                                                                                    <label for="inputPassword4">Cost</label>
                                                                                    <input type="text" class="form-control" v-model="inventory.cost" placeholder="Cost" >
                                                                                </div>
                                                                              </div>

                                                                              <div class="form-row">
                                                                                <div class="form-group col-md-6">
                                                                                    <label for="inputPassword4">Quantity</label>
                                                                                    <input type="text" class="form-control" v-model="inventory.quantity" placeholder="Quantity" >
                                                                                </div>
                                                                              </div>

                                                                              <button  class="btn btn-primary btn-block btn-lg" @click="addInventory">Add Inventory</button>

                                                                      </div>
                                                                  </div>
                                                              </div>

                                                          </div>
                                                      </div>
                                                  </div>
                                                  <!-- Modal Ends -->

               </div>
           </div>

       </section>
       </main>
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
      lga_states:"",
      inventory:{
                inventory_type:"",
                name:"",
                quantity:"",
                cost:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/gethealthRecord`)
                .then(response => {
                    this.records = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getRecords(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/gethealthRecord`)
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addInventory(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/addInventory',{
          inventory_type: this.inventory.inventory_type,
          quantity: this.inventory.quantity,
          cost: this.inventory.cost,
          description: this.inventory.description,

        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$breadstick.notify("Inventory added successfully", {position: "top-right"});

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {position: "top-right"});

        })
    }

  },
  created(){
    // this.getRecords()
  }

}
</script>
