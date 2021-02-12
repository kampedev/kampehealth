<template>
           <div class="container">
               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="row">
                           <button class="btn btn-primary" @click="show = !show"
                           style="margin-bottom:10px;margin-left:15px;">Search Enrollee</button>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">
                          <div class="text-center">
                            <strong >(Fill any one of field to search for enrollee)</strong>
                          </div>


                          <div class="row" >

                            <div class="form-group col-md-4">
                                <label for="inputPassword4">Phone Number</label>
                                <input type="text" class="form-control" v-model="phone_number"  placeholder="Phone Number">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputPassword4">NIN Number</label>
                                <input type="text" class="form-control" v-model="nimc_number"  placeholder="NIN Number">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputEmail4">Computer Number</label>
                                <input type="text" class="form-control" v-model="salary_number" placeholder="Computer Number">
                            </div>

                            <!-- <div class="form-group col-md-6">
                                <label for="inputPassword4">E-mail</label>
                                <input type="text" class="form-control" v-model="email"  placeholder="Email">
                            </div> -->


                          </div>

                         <button  class="btn btn-primary btn-block btn-lg" @click="searchUser" style="margin-top:20px;"> Search </button>

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





</template>

<script>
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
   Loading
  },
  data(){
    return{
      user:null,
      providers:"",
      salary_number:"",
      phone_number:"",
      nimc_number:"",
      email:"",
      search_result:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      mdas:"",
      state:"",
      lga_states:"",
      sector:"",

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{
    searchUser(){
      this.loading = true
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/searchbymultiplevalues`,{
            agency_id: 90,
            salary_number: this.salary_number,
            nimc_number: this.nimc_number,
            phone_number: this.phone_number,
            // email: this.email,
      })
                  .then(response => {
                      this.search_result = response.data
                      let user = response.data

                      if (user.length == 1) {
                        this.$router.push(`/client/${user[0].id}`)
                        this.$toasted.info('Searched Successfully', {position: 'top-center', duration:3000 })

                      }
                      else {
                        this.$toasted.info('User not Found', {position: 'top-center', duration:3000 })

                      }
                      console.log(response)
                      this.loading = false

                  })
                  .catch(error => {
                      console.error(error);
                      this.loading = false
                  })
    },

    clearIt(){
      this.agency_id = "";
    },

  },
  created(){
    //
  }

}
</script>
