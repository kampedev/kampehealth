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
                       <h3> </h3>
                       <strong>  Ministries Departments and Parastatals</strong>


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

                             <h3 class="p-t-10 searchBy-name">{{ministries.length}} MDAs Added</h3>
                           </div>

                           <div class="card-body">

                                                         <div class="form-group">
                                                             <button class="btn btn-primary" @click="show = !show">Add MDA</button>
                                                         </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                         <div class="form-row">

                           <!-- <div class="form-group col-md-12">
                             <label for="inputCity">Select MDA </label>
                                 <select class="form-control"  v-model="selector">
                                  <option value="ministry">Ministry</option>
                                  <option value="department">Department</option>
                                  <option value="parastatal">Parastatal</option>
                              </select>
                           </div> -->

                           <!-- <div class="form-group col-md-12" v-if="selector != 'ministry' && selector != null">
                             <label for="inputCity">Select Ministry</label>
                                 <select class="form-control"  v-model="ministry_id" @change="fetchLga(state)">
                                  <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
                              </select>
                           </div> -->

                           <div class="form-group floating-label col-md-12 col-sm-12" v-if="selector == 'ministry'">
                               <label>MDA</label>
                               <input type="text" required class="form-control" placeholder="Name of MDA" v-model="register.ministry">
                           </div>

                           <div class="form-group floating-label col-md-12 col-sm-12" v-if="selector == 'department'">
                               <label>Name of Department</label>
                               <input type="text" required class="form-control" placeholder="Name of Department" v-model="register.department">
                           </div>
                           <div class="form-group floating-label col-md-12" v-if="selector == 'parastatal'">
                               <label>Name of Parastatal</label>
                               <input type="text" required class="form-control" placeholder="Name of Parastatal" v-model="register.parastatal">
                           </div>

                       </div>

                         <button @click="registerMDA" class="btn btn-primary btn-block btn-lg">Submit</button>

                       </div>
                     </div>

                   </div>

                   <div class="col-md-10 m-b-30">
                       <h5> <i class="fe fe-airplay"></i> MDAs </h5>
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Name</th>
                                   <th>Action</th>

                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="mda in ministries" v-bind:key="mda.id">

                                   <td>
                                     {{mda.name}}
                                   </td>
                                   <td>
                                      <button type="button" class="btn btn-info" name="button">edit</button>
                                   </td>

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
      ministries:"",
      departments:"",
      parastatals:"",
      edit:false,
      show:false,
      selector:"ministry",
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      ministry_id:"",
      register:{
                ministry:"",
                department:"",
                parastatal:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/ministry`)
                .then(response => {
                    this.ministries = response.data.data[0]
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed:{
    allMDAs(){
    let answer =  this.ministries + this.departments + this.parastatals;
      return [answer]
    }
  },
  methods:{

    getDepts(){
      this.axios.get(`/api/v1/auth/ministry`)
                  .then(response => {
                      this.ministries = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    registerMDA(){
        this.isLoading = true;
          if (this.selector == 'ministry') {
                this.axios.post('/api/v1/auth/ministry',{
                  name : this.register.ministry,
                })
                .then(response=>{
                    console.log(response);
                    this.isLoading = false;
                    this.getDepts()
                    this.clearIt()
                    this.$toasted.info('MDA Added', {position: 'top-center', duration:5000 })
                })
                .catch(error=>{
                    console.log(error.response)
                    this.isLoading = false;
                    this.$toasted.error('Error', {position: 'top-left', duration:5000 })
                })
          }
          if (this.selector == 'department') {
            this.axios.post('/api/v1/auth/department',{
              name : this.register.department,
            })
            .then(response=>{
                console.log(response);
                this.isLoading = false;
                this.$toasted.success('Department Added', {position: 'top-left', duration:5000 })
            })
            .catch(error=>{
                console.log(error.response)
                this.isLoading = false;
                this.$toasted.error('Error', {position: 'top-left', duration:5000 })
            })
          }
          if (this.selector == 'parastatal') {
                this.axios.post('/api/v1/auth/parastatars',{
                  name : this.register.parastatal,
                })
                .then(response=>{
                    console.log(response);
                    this.isLoading = false;
                    this.$toasted.success('Parastatal Added', {position: 'top-left', duration:5000 })
                })
                .catch(error=>{
                    console.log(error.response)
                    this.isLoading = false;
                    this.$toasted.error('Error', {position: 'top-left', duration:5000 })
                })
          }
    },


    clearIt(){

      this.register.ministry = "";

    },

  },
  created(){
    // this.fetchParas()
    this.getDepts()
  }

}
</script>
