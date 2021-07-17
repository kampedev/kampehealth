<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">

                       <h3 class="h4"> Claims  </h3>

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">

                   <div class="col-md-12 m-b-30">
                       <div class="table-responsive">
                           <table class="table align-td-middle table-card">
                               <thead>
                               <tr>
                                   <th>Date </th>
                                   <th>Health Facility</th>
                                   <th>Diagnosis</th>
                                   <th>Status</th>
                                   <th>Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="claim in claims.data" v-bind:key="claim.id">

                                   <td>
                                     <router-link :to="{ path: '/claim/' + claim.id }">
                                     {{claim.seen_date}}
                                   </router-link>

                                   </td>
                                   <td>{{claim.provider.agency_name}}</td>
                                   <td>{{claim.diagnosis.name}}</td>
                                   <td>
                                     <span v-if="claim.status == 1">
                                       <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">approved</button>
                                      </span>

                                      <span v-if="claim.verified_by_id != null">
                                        <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-info" >verified</button>
                                      </span>
                                      <span v-if="claim.status == 0">
                                        <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger">rejected</button>
                                       </span>
                                      <span v-if="claim.status == null">
                                      <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">pending</button>
                                   </span>

                                   </td>
                                   <td>
                                     <router-link :to="{ path: '/claim/'+ claim.id}">
                                       <button type="button" name="button" class="btn btn-info"><i class="fe fe-eye"></i></button>
                                      </router-link>
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
      claims:"",
      edit:false,
      show:false,
      showsearch:false,
      isLoading: false,
      fullPage: true,
      json_fields: {
        'Facility Name': 'agency_name',
        'Contact First Name': "firstname",
        'Contact Last Name': "lastname",
        'Contact Number': 'phone_number',
        'Email': 'email',
        // ' Recipient Merchant': 'receiver.merchant_name',
        // 'Pay Point': 'point.pay_point_name',
        // 'Payment Date': 'created_at',
        // 'Note': 'notes',

      },
      json_meta: [
        [
            {
                'key': 'charset',
                'value': 'utf-8'
            }
        ]
    ],

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{
    getClaims(){
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.type == 'shis' || this.user.type == 'employee') {
        this.axios.get(`/api/v1/auth/claims/95930`)
                    .then(response => {
                        this.claims = response.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
      if (this.user.type == 'provider') {
        this.axios.get(`/api/v1/auth/claminByProvider${this.user.id}`)
                    .then(response => {
                        this.claims = response.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
      if (this.user.type == 'tpa' || this.user.type =='tpa_employee') {
        this.axios.post(`/api/v1/auth/claim-org`,{
          user_id: this.user.id
        })
                    .then(response => {

                        this.claims = response.data
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    })
      }
    },





  },
  created(){
    this.getClaims()
  }

}
</script>
