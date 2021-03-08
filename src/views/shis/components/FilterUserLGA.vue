<template>
  <div class="container">
               <div class="row list">
                   <div class="col-md-3">
                       <div class="row">
                           <button class="btn btn-info" @click="show = !show"
                           style="margin-bottom:10px;margin-left:15px;">Filter Enrollee LGA</button>
                       </div>
                   </div>

                   <div class="col-md-12" v-show="show">
                     <div class="card m-b-30">
                       <div class="card-body">

                          <div class="row" >

                            <div class="form-group col-md-4">
                              <label for="inputCity">Select Sector</label>
                                  <select class="form-control"  v-model="sector" >
                                   <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                                   <option  value="Vulnerable Groups">Vulnerable Groups</option>
                                   <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                   <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                   <option  value="State Civil Servant Healthcare Plan">State Civil Servant Healthcare Plan</option>
                                   <option  value="LGA Civil Servant Healthcare Plan">LGA Civil Servant Healthcare Plan </option>
                                   <option  value="Universal Basic Education Board Healthcare Plan">Universal Basic Education Board Healthcare Plan</option>
                                   <option  value="State Pensioneers Healthcare Plan">State Pensioneers Healthcare Plan</option>
                                   <option  value="LGA Pensioneers Healthcare Plan">LGA Pensioneers Healthcare Plan</option>
                                   <option  value="Oganized Private Sector Plan">Organized Private Sector Plan</option>
                                   <option value="Tertiary Student Health Insurance Plan (T-SHIP)">
                                     Tertiary Student Health Insurance Plan (T-SHIP)</option>
                               </select>
                            </div>

                            <div class="form-group col-md-4">
                              <label for="inputCity">LGA</label>
                                <select class="form-control"  v-model="localgovt" @change="fetchWards($event)">
                                  <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                               </select>
                            </div>

                            <div class="form-group col-md-4">
                              <label >Ward</label>
                              <select class="form-control"  v-model="ward" @change="getProvidersByWards($event)">
                                  <option v-for="ward in wards" v-bind:key="ward.id" :value="ward.id">{{ward.ward_name}}</option>
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
      sector:"",
      ward:"",
      localgovt:"",
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
    this.axios.get(`/api/v1/auth/lga/2669`)
                .then(response => {
                    this.lga_states = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    fetchWards(){
      this.axios.get(`/api/v1/auth/getwards/${event.target.value}`)
                  .then(response => {
                      this.wards = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    fetchLga(){
      this.axios.get(`/api/v1/auth/lga/2669`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
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
