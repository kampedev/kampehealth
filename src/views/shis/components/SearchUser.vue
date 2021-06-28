<template>
           <div class="container">
               <div class="row list">
                   <div class="col-md-3">
                       <div class="row">
                           <button class="btn btn-primary" @click="show = !show"
                           style="margin-bottom:10px;margin-left:15px;"><i class="fe fe-search"></i></button>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">
                          <div class="text-center">
                            <strong >(Fill any one of field to search for enrollee)</strong>
                          </div>

                          <div class="row" >

                            <div class="form-group col-md-12">
                              <label> Select Search Parameter {{search}}</label>
                                  <select class="form-control"  v-model="search" >
                                    <option  value="ohis_number">OHIS Number</option>
                                    <option  value="phone_number">Phone Number</option>
                                    <option  value="nimc_number">NIN</option>
                               </select>
                            </div>

                            <div class="form-group col-md-12" v-if="search == 'ohis_number'">
                                <label for="inputEmail4">OHIS Number</label>
                                <input type="text" class="form-control" v-model="searchkey" placeholder="OHIS Number">
                            </div>
                            <div class="form-group col-md-12" v-if="search == 'phone_number'">
                                <label for="inputPassword4">Phone Number</label>
                                <input type="text" class="form-control" v-model="searchkey"  placeholder="Phone Number">
                            </div>
                           <div class="form-group col-md-12" v-if="search == 'nimc_number'">
                                <label for="inputPassword4">NIN Number</label>
                                <input type="text" class="form-control" v-model="searchkey"  placeholder="NIN Number">
                            </div>




                          </div>

                         <button  class="btn btn-primary btn-block btn-lg" @click="SearchUser" style="margin-top:20px;"> Search </button>

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
        ohis_number:"",
        phone_number:"",
        nimc_number:"",
        email:"",
        search:"ohis_number",
        searchkey:"",
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
    SearchUser(){
      if (this.search == 'phone_number') {
          this.searchPhone()
      }
      if (this.search == 'ohis_number') {
          this.searchSalary()
      }
      if (this.search == 'nimc_number') {
          this.searchNIN()
      }
    },

    searchPhone(){
      this.loading = true
      this.axios.post(`/api/v1/auth/searchbymultiplevalues`,{
            agency_id: 95930,
            phone_number: this.searchkey,
      })
                  .then(response => {
                      this.search_result = response.data
                      let user = response.data

                      if (user.length >= 1) {
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
    searchNIN(){
      this.loading = true
      this.axios.post(`/api/v1/auth/searchbymultiplevalues`,{
            agency_id: 95930,
            nimc_number: this.searchkey,
      })
                  .then(response => {
                      this.search_result = response.data
                      let user = response.data

                      if (user.length >= 1) {
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
    searchSalary(){
      this.loading = true
      this.axios.post(`/api/v1/auth/getuserbyIdcard`,{
            // agency_id: 95930,
            id_card_number: this.searchkey,
      })
                  .then(response => {
                      this.search_result = response.data
                      let user = response.data.data
                      console.log(user)

                        this.$router.push(`/client/${user.id}`)
                        this.$toasted.info('Searched Successfully', {position: 'top-center', duration:3000 })


                      console.log(response)
                      this.loading = false

                  })
                  .catch(error => {
                      console.error(error);
                      this.loading = false
                      this.$toasted.info('User not Found', {position: 'top-center', duration:3000 })
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
