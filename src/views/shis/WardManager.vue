<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">

                       <strong> Ward Manager</strong>

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

                           </div>

                           <div class="card-body">

                                 <div class="form-group">
                                     <button class="btn btn-primary" @click="show = !show">Add Ward</button>
                                 </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                         <div class="form-row">

                           <div class="form-group col-md-12">
                             <label for="inputCity">Select LGA</label>
                                 <select class="form-control"  v-model="lga" >
                                  <option  v-for="lga in lga_states" v-bind:key="lga.id" :value="lga.id">{{lga.local_name}}</option>
                              </select>
                           </div>
                           <div class="form-group floating-label col-md-6" >
                               <label>Ward Name</label>
                               <input type="text" required class="form-control" placeholder="Name of Ward" v-model="register.ward_name">
                           </div>
                           <div class="form-group floating-label col-md-6" >
                               <label>Ward Short Name</label>
                               <input type="text" required class="form-control" placeholder="Short Name" v-model="register.ward_short_name">
                           </div>

                       </div>

                         <button @click="addWard" class="btn btn-primary btn-block btn-lg">Submit</button>

                       </div>
                     </div>

                   </div>

                   <!-- <div class="col-md-6 offset-md-3">
                       <h5> <i class="fe fe-airplay"></i> Wards </h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Name</th>
                                   <th>Short Name</th>
                                   <th>Action</th>

                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="ward in wards" v-bind:key="ward.id">

                                   <td>
                                     {{ward.ward_name}}
                                   </td>
                                   <td>
                                     {{ward.ward_short_name}}
                                   </td>
                                   <td>
                                      <button type="button" class="btn btn-info" name="button">edit</button>
                                   </td>
                               </tr>

                               </tbody>
                           </table>

                       </div>
                   </div> -->

               </div>
           </div>


           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
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
      user:null,
      lga_states:"",
      wards:"",
      edit:false,
      show:false,
      selector:"ministry",
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      lga:"",
      register:{
                ward_name:"",
                ward_short_name:"",

            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/wards`)
                .then(response => {
                    this.wards = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
    //
  },
  methods:{

    getLGAs(){
      this.axios.get(`/api/v1/auth/lga/2669`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addWard(){
        this.isLoading = true;
                this.axios.post('/api/v1/auth/wards',{
                  ward_name : this.register.ward_name,
                  ward_short_name : this.register.ward_short_name,
                  lg_id : this.lga,
                  state_id : 2669,
                })
                .then(response=>{
                    console.log(response);
                    this.isLoading = false;
                    this.clearIt()
                    this.$toasted.info('Ward Added', {position: 'top-center', duration:5000 })
                })
                .catch(error=>{
                    console.log(error.response)
                    this.isLoading = false;
                    this.$toasted.error('Error', {position: 'top-left', duration:5000 })
                })

    },


    clearIt(){

      this.register.ward_name = "";
      this.register.ward_short_name = "";
      this.lga = "";

    },

  },
  created(){
    this.getLGAs()
  }

}
</script>
