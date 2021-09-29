<template>

  <div class="row list">
                        <div class="col-lg-12 col-md-12">
                            <div class="card m-b-30">
                              <div class="card card-header">
                                <strong> {{idcard_offline.length}} Special Filter  {{clients.length}}pp</strong>

                                <div >
                                    <p class="btn btn-success">
                                          <i class="fe fe-download"></i> <download-excel :data="clients" :fields="json_fields" type="csv" :escapeCsv=false name="Picture Error List.csv"
                        >
                                    Download Data for BHCPF
                                    <!-- <img src="download_icon.png" /> -->
                                    </download-excel></p>
                                </div>




                              </div>

                                <div class="card-body">

                                  <div class="table-responsive">
                                      <table class="table align-td-middle table-card">
                                          <thead>
                                          <tr>
                                              <th>Avatar</th>
                                              <th>Name</th>
                                              <th>Phone Number</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr v-for="(client, index) in clients" v-bind:key="client.id">
                                              <td>
                                                <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`" height="170px" width="120px" alt="User Photo">
                                              </td>
                                              <td>
                                                <router-link :to="{ path: '/client/'+client.id, params: {} }">
                                                {{index+1}} {{client.firstname}} {{client.lastname}}
                                              </router-link>
                                              </td>
                                              <td>{{client.phone_number}}</td>

                                              <td>
                                                <!-- <div class="form-group col-md-6">
                                                  <label for="inputCity">Gender <span class="text-danger">*</span></label>
                                                      <select class="form-control" required v-model="gender" >
                                                       <option  value="Male">Male</option>
                                                       <option  value="Female">Female</option>
                                                   </select>
                                                </div> -->
                                                {{client.id_card_number}}

                                                  <button type="button" @click="changeNumber(client)" class="btn btn-primary"
                                                  style="margin-left:10px; margin-top:10px;" >
                                                    Update</button>


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
                             :can-cancel="false"
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
     import idcardJson from './../../../public/offline/id_card_number.json'


export default {
  components: {
    Loading
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      states:"",
      clients:"",
      gender:"",
      idcard_offline:idcardJson,
      json_fields: {
                'First Name': 'firstname',
                'Last Name':'lastname',
                'Middle Name':'middlename',
                'User Image': {
                  field:'user_image',
                callback: (value) => {
                return `https://api.hayokinsurance.com/image/${value}`;
            }
          },
                'phone_number':'phone_number',
                'Plan':'sector',
                'Vulnerable Group':'category_of_vulnerable_group',
                'Date of Birth':'dob',
                'Local Govt':'localgovt.local_name',
                'Ward': 'ward.ward_name',
                'OHIS Number':'id_card_number',
                'Health Facility':'userprovider.agency_name',
                'Card Expiry Date':'expiry_date',
                'Sector':'sectorType',
                'gender':'gender',
                'Date Enrolled':'created_at',
                // 'MDA':'place_of_work',
                'NIN Number':'nimc_number',
                'HMO':'usertpa.organization_name',
                'Enrolled By First Name':'userenrolledby.firstname',
                'Enrolled By Last Name':'userenrolledby.lastname',
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
  computed:{
   //
  },

  methods:{

    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/sp-filter/95930`,{
        list_items: this.idcard_offline
      })
                  .then(response => {
                      this.clients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    changeNumber(client){
      this.isLoading = true
        this.axios.post(`/api/v1/auth/update-gender`,{
          id: client.id,
          gender: this.gender,
        })
                    .then(response => {
                        console.log(response)
                        this.getClients()
                        this.$toasted.success('Changed Successfully', {position: 'top-center', duration:3000 })
                        this.isLoading = false

                    })
                    .catch(error => {
                        console.error(error);
                        this.$toasted.error('Error!', {position: 'top-center', duration:3000 })
                        this.isLoading = false

                    })



    },


  },
  created(){
    this.getClients()
  }

}
</script>
