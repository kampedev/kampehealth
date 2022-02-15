<template>
  <div class="container">
               <div class="row list">
                   <div class="col-md-3">
                       <div class="row">
                           <button class="btn btn-success" @click="show = !show"
                           style="margin-bottom:10px;">Filter Enrollee Provider</button>
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

                         <button @click="filterProvider()" class="btn btn-success btn-block btn-lg" style="margin-top:20px;"> Filter </button>
                        <br />

                        <div v-show="showdownload">
                        <div v-if="isLoading == true">
                           <p> Preparing data for download for Health Facility</p>
                        </div>
                        <div v-else>
                          <p class="h5">Result: {{json_data.length}} data filtered  <span class="text-success" @click="inspect = true">preview data</span> </p>
                                  <download-excel :data="json_data" :fields="json_fields" class="btn btn-success"
                                   :header="'Enrollee Data for'+selected_provider.agency_name" :escapeCsv=false :name="selected_provider.agency_name+'.xls'">
                                  <span class="fe fe-download"></span>
                            Download Data for {{selected_provider.agency_name}}
                            </download-excel>
                        </div>

                        <div class="col-lg-12 col-md-12" v-show="inspect">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>NO.</th>
                                         <!-- <th>Plan Type</th> -->
                                         <th>Name (OHIS Number)</th>
                                         <th>Phone Number</th>
                                         <th>Facility</th>
                                             <th> DOB/ Expiry Date</th>
                                             <th> Account Type</th>

                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="(client,index) in json_data" v-bind:key="client.id">
                                          <td> {{index+1 }} </td>
                                          <!-- <td> <span v-if="client.account_type == 'Principal'">{{client.plan_type}}</span>
                                               <span v-if="client.account_type != 'Principal'">{{client.user.plan_type}}</span>
                                          </td> -->
                                         <td >
                                           <router-link
                                                :to="{ path: '/client/' + client.id, params: {} }"
                                              >
                                           {{client.firstname}} {{client.lastname}} <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-dark">{{client.status}} </button>
                                           </router-link>
                                            <b> ({{client.id_card_number}}) </b> </td>
                                         <td>{{client.phone_number}}</td>
                                         <td>
                                            {{client.userprovider.agency_name}}
                                         </td>
                                          <td>{{client.dob}}|| {{client.expiry_date}} </td>
                                          <td>{{client.account_type}} </td>

                                         <td v-if="user.id == '95930'"> <button class="btn btn-default" @click="updateExp(client)">update Exp {{client.id}} </button> </td>
                                     </tr>

                                     </tbody>
                                 </table>

                             </div>

                           </div>
                       </div>
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
      isLoading: false,
      fullPage: false,
      showdownload:false,
      inspect:false,
      user:null,
      providers:"",
      selected_provider:"",
      place_of_work:"",
      edit:false,
      show:false,
     
      agency_id:"",
      provider_id:"",
      mdas:[],
      state:"",
      lga_states:"",
      sector:"",
      wards:[],
    json_fields: {
                 'User Type':'account_type',
                // 'First Name': 'firstname',
                // 'Last Name':'lastname',
                'Full Name':'full_name',
                'Middle Name':'middlename',
                'OHIS Number':'id_card_number',
                'User Status':'status',
                'User Image': {
                  field:'user_image',
                callback: (value) => {
                 
                return `https://api.hayokinsurance.com/image/${value}`;

            }
          },
         
                'phone_number':'phone_number',
                'Sector Category':'sector',
                '(Dependent)Sector Category':'user.sector',
                'Vulnerable Group':'category_of_vulnerable_group',
                'Date of Birth':'dob',
                'Local Govt':'localgovt.local_name',
                'Ward': 'ward.ward_name',
                'Card Expiry Date':'expiry_date',
                'Sector(Principal) ':'sectorType',
                'Sector(Dependent) ':'user.sectorType',
                'gender':'gender',
                'Date Enrolled':'created_at',
                'NIN Number':'nimc_number',
                'Plan Type':'plan_type',
                'Plan Type (Dependent)':'user.plan_type',
                'HMO':'usertpa.organization_name',
                'HMO(Dependent) ':'user.usertpa.organization_name',
                'Enrolled By':'userenrolledby.full_name',
                '(Dependent) Enrolled By':'user.userenrolledby.full_name',
                'MDA':'place_of_work',
                'MDA (Dependent)':'user.place_of_work',
                'Health Facility':'userprovider.agency_name',


                 },
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
      this.isLoading = true;
      this.axios.get(`/api/v1/auth/getProviderToUser/`+ this.selected_provider.id)
        .then(response => {
          this.json_data = response.data
          console.log(response)
          this.isLoading = false;
          this.showdownload = true;
         this.$toasted.success('Filtered Successfully', {position: 'top-center', duration:3000 })

        })
        .catch((error) => {
            console.error(error);
            this.isLoading = false;
         this.$toasted.error('Error!', {position: 'top-center', duration:3000 })


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
