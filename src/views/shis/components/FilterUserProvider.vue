<template>
  <div class="container">
               <div class="row list">
                   <div class="col-md-3">
                       <div class="row">
                           <button class="btn btn-info" @click="show = !show"
                           style="margin-bottom:10px;margin-left:15px;">Filter Enrollee Provider</button>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                          <div class="row" >

                            <div class="form-group col-md-12" >
                              <label>Select Facility</label>
                              <select class="form-control"  v-model="selected_provider">
                                  <option v-for="provider in providers" v-bind:key="provider.id" :value="provider">{{provider.agency_name}}</option>
                               </select>
                          </div>

                          </div>

                         <button @click="filterProvider()" class="btn btn-primary btn-block btn-lg" style="margin-top:20px;"> Filter </button>
                        <br />

                        <div v-show="showdownload">
                        <div v-if="loader == true">
                            <vue-loaders name="line-spin-fade-loader" color="black" scale="1"></vue-loaders> Preparing data for download for Health Facility
                        </div>
                        <div v-else>
                            <p class="alert alert-warning">
                                  <download-excel :data="json_data" :fields="json_fields" type="csv" :escapeCsv=false :name="selected_provider.agency_name+'.csv'"
                >
                            Download Data for {{selected_provider.agency_name}}
                            <!-- <img src="download_icon.png" /> -->
                            </download-excel></p>
                        </div>
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
      loader:true,
      showdownload:false,
      user:null,
      providers:"",
      selected_provider:"",
      place_of_work:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      mdas:[],
      state:"",
      lga_states:"",
      sector:"",
      wards:[],

      json_fields: {
                // 'MDa name':'place_of_work',
                'firstname': 'firstname',
                'lastname':'lastname',
                // 'computer number':'salary_number',
                // 'Health Facility':'point_of_care',
                'gender':'gender',
                'phone_number':'phone_number' },
                json_data: [],
                json_meta: [
                [
                    {
                    key: "charset",
                    value: "utf-8",
                    },
                ]],

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/providerAgency/95930`)
                .then(response => {
                    this.providers = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    filterProvider(){
      this.axios.get(`/api/v1/auth/getProviderToUser/`+ this.selected_provider.id)
        .then(response => {
          this.json_data = response.data.data
          this.loader = false;
          this.showdownload = true;
        })
        .catch(() => {
            // console.error(error);
        })
    },

    getMDAs(){
      this.axios.get(`/api/v1/auth/ministry`)
                  .then(response => {
                    this.mdas = response.data
                      // console.log(response)
                  })
                  .catch(() => {
                      // console.error(error);
                  })
    },

    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/95930`)
                  .then(response => {
                      this.providers = response.data.data
                      // console.log(response.data.data)
                  })
                  .catch(() => {
                      // console.error(error);
                  })
    },

    clearIt(){
      this.agency_id = "";
    },

  },
  created(){
    // this.getProviders()
    this.getMDAs()
  }

}
</script>
