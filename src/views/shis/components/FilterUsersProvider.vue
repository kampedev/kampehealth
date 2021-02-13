<template>
           <div class="container">
               <div class="row list">
                   <div class="col-md-3">
                       <div class="row">
                           <button class="btn btn-info float-left" @click="show = !show"
                           style="margin-bottom:10px;margin-left:15px;">FIlter Enrollees</button>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">
                          <div class="text-center">
                            <strong >(Searchable select box)</strong>
                          </div>

                          <div class="row" >
                            <div class="form-group col-md-12" >
                              <label>Select Facility {{search_result_provider}}</label>
                              <v-select v-model="search_result_provider" :options="providers" label="agency_name" :value="search_result_provider" @input="selected"></v-select>
                            </div>


                          </div>

                         <button  class="btn btn-primary btn-block btn-lg" @click="searchUser" style="margin-top:20px;">Filter</button>

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
      selected_provider:"",
      selected_mda:"",
      search_result_provider:"",
      search_result_mda:"",
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
    selected(value){
      this.selected_provider = value.id
    },
    selectedMDA(value){
      this.selected_mda = value.id
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/providerAgency/90`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getMDAs(){
      this.axios.get(`/api/v1/auth/ministry`)
                  .then(response => {
                    this.mdas = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    searchUser(){
      this.loading = true
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/searchbymultiplevalues`,{
            agency_id: 90,
            salary_number: this.salary_number,
            nimc_number: this.nimc_number,
            phone_number: this.phone_number,
            email: this.email,
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
    this.getProviders()
    this.getMDAs()
  }

}
</script>
