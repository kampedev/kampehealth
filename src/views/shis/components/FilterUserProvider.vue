<template>
  <section>

    <div>
      <div class="m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60"></div>
        </div>
      </div>
    </div>

    <section>
      <div class="container">
        <div class="row list">
          <div class="col-md-12">
            <div class="card m-b-30">
              <div class="card-body">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Select Facility</label>
                    <select class="form-control" v-model="selected_provider">
                      <option
                        v-for="provider in providers"
                        v-bind:key="provider.id"
                        :value="provider"
                      >
                        {{ provider.agency_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  @click="filterProvider()"
                  class="btn btn-primary btn-block btn-lg"
                  style="margin-top: 20px"
                >
                  Filter
                </button>
                <br />

                <div v-show="showdownload">
                  <div v-if="loader == true">
                    <vue-loaders
                      name="line-spin-fade-loader"
                      color="black"
                      scale="1"
                    ></vue-loaders>
                    Preparing data for download for Health Facility
                  </div>
                  <div v-else>
                    <download-excel
                      :data="json_data"
                      :fields="json_fields"
                      class="btn btn-success"
                      :header="
                        'Enrollee Data for' + selected_provider.agency_name
                      "
                      :escapeCsv="false"
                      :name="selected_provider.agency_name + '.xls'"
                    >
                      <span class="fe fe-download"></span>
                      Download {{ json_data.length }} Data for
                      {{ selected_provider.agency_name }}
                    </download-excel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vld-parent">
          <loading
            :active.sync="isLoading"
            loader="dots"
            :can-cancel="true"
            :is-full-page="fullPage"
          ></loading>
        </div>
      </div>
    </section>
  </section>
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
                 
                return `https://insurance-api.hayokmedicare.ng/image/${value}`;

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
                "Enrollee Address": "address1",
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
