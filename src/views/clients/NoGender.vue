<template>
  <div class="row list">
    <div class="col-lg-12 col-md-12">
      <div class="card m-b-30">
        <div class="card card-header">
          <strong>Total  {{ clients.total_dep + clients.total_prin}} No Dates </strong>
          <p>Dependents: {{clients.total_dep}} </p>
          <p>Principal: {{clients.total_prin}} </p>
          <p>
            <button class="btn btn-primary" @click="autoUpdate">Update All</button>
          </p>
          <!-- <button class="btn btn-primary" @click="getlist">ffdd</button> -->
          <!-- {{value_list}} -->
          <!-- {{findUser}} -->

          <!-- <button class="btn btn-primary" @click="updateDOB">Update DOB</button> -->

          <!-- <div >
                                    <p class="btn btn-success">
                                          <i class="fe fe-download"></i> <download-excel :data="clients" :fields="json_fields" type="csv" :escapeCsv=false name="Picture Error List.csv"
                        >
                                    Download Data for BHCPF
                                    </download-excel></p>
                                </div> -->
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <!-- <th>Avatar</th> -->
                  <th>Name</th>
                  <th>Account Type</th>
                  <th>Sector Type</th>
                  <th>DOB || Expiry </th>
                  <th>OHIS Number </th>
                  <th>Created </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(client, index) in clients.data" v-bind:key="client.id">
                  <!-- <td>
                    <img
                      :src="`https://api.hayokinsurance.com/image/${client.user_image}`"
                      height="170px"
                      width="120px"
                      alt="User Photo"
                    />
                  </td> -->
                  <td>
                    <router-link
                      :to="{ path: '/client/' + client.id, params: {} }"
                    >
                      {{ index + 1 }} {{ client.firstname }}
                      {{ client.lastname }}
                    </router-link>
                  </td>
                  <td> {{client.account_type}} </td>
                  <td> {{client.sector}} </td>
                  <td>{{ client.dob }} || {{client.expiry_date}} </td>

                  <td>{{ client.id_card_number }} </td>
                  <td>{{ client.created_at }} </td>

                    

                   
                 

                  <td>
                     <button
                      type="button"
                      @click="updateDate(client)"
                      class="btn btn-primary"
                      style="margin-left: 10px; margin-top: 10px"
                    >
                      Update
                    </button>

                    <button class="btn btn-destroy" @click="deleteUser(client)">delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
import idcardJson from "./../../../public/offline/Fuu_list_expiry_dob_all.json";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      states: "",
      clients: "",
      gender: "",
      value_list: "",
      auto_selected: "",
      newarray: [],
      idcard_offline: idcardJson,
      json_fields: {
        "First Name": "firstname",
        "Last Name": "lastname",
        "Middle Name": "middlename",
        "User Image": {
          field: "user_image",
          callback: (value) => {
            return `https://api.hayokinsurance.com/image/${value}`;
          },
        },
        phone_number: "phone_number",
        Plan: "sector",
        "Vulnerable Group": "category_of_vulnerable_group",
        "Date of Birth": "dob",
        "Local Govt": "localgovt.local_name",
        Ward: "ward.ward_name",
        "OHIS Number": "id_card_number",
        "Health Facility": "userprovider.agency_name",
        "Card Expiry Date": "expiry_date",
        Sector: "sectorType",
        gender: "gender",
        "Date Enrolled": "created_at",
        // 'MDA':'place_of_work',
        "NIN Number": "nimc_number",
        HMO: "usertpa.organization_name",
        "Enrolled By First Name": "userenrolledby.firstname",
        "Enrolled By Last Name": "userenrolledby.lastname",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  computed: {
    //
  },

  methods: {
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/null-expiry`,{
        agency_id: 95930
      })
                  .then(response => {
                      this.clients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

  deleteUser(client) {
    if (confirm('Are you sure you want to delete?') ) {
      if (client.account_type == 'Dependent') {
      
      this.axios.delete(`/api/v1/auth/deletedependent/${client.id}`)
                  .then(response => {
                      console.log(response)
                      this.$toasted.success('deleted Successfully!', {position: 'top-center', duration:3000 })
                  })
                  .catch(error => {
                      console.error(error);
                      this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

                  })
    

    } else {
       this.axios.delete(`/api/v1/auth/deleteUser/${client.id}`)
                    .then(response => {
                        console.log(response)
                      this.$toasted.success('deleted Successfully!', {position: 'top-center', duration:3000 })
                    })
                    .catch(error => {
                        console.error(error);
                       this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

                    })
      }
    }

  },

   autoUpdate() {
      if (confirm("Are you sure you want to auto update?")) {
       
        setInterval(
          function () {
            this.updateDateauto();
             
          }.bind(this),
          10000
        );
      }
    },

 updateDateauto(){
      this.isLoading = true
      //  this.auto_selected = this.clients.data[Math.random()]
       this.auto_selected = this.clients.data[0]
       console.log(this.auto_selected)
       let formatter =  this.idcard_offline.filter((x) => x.id_card_number == this.auto_selected.id_card_number);

     if (formatter.length >=1) {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/update-dates-all`,{
        values: formatter
      })
            .then(response => {
                
                console.log(response)
                this.getClients()
                    this.isLoading = false
                  this.$toasted.success('updated Successfully!', {position: 'top-center', duration:3000 })

            })
            .catch(error => {
                console.error(error);
                  this.isLoading = false
                  this.$toasted.success('error!', {position: 'top-center', duration:3000 })
            })
     } else {
     let  formatter = [
          {
             "dob": this.clients.data[0].dob,
              "expiry_date": "01-01-2030",
              "id_card_number": this.clients.data[0].id_card_number,
              "category": this.clients.data[0].account_type
           },
       ]

       this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/update-dates-all`,{
        values: formatter
      })
            .then(response => {
                
                console.log(response)
                this.getClients()
                    this.isLoading = false
                  this.$toasted.success('updated!', {position: 'top-center', duration:3000 })

            })
            .catch(error => {
                console.error(error);
                  this.isLoading = false
                  this.$toasted.success('error!', {position: 'top-center', duration:3000 })
            })

     }
    },

    updateDate(client){
   this.isLoading = true
       let formatter =  this.idcard_offline.filter((x) => x.id_card_number == client.id_card_number);

      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.post(`/api/v1/auth/update-dates-all`,{
        values: formatter
      })
                  .then(response => {
                     
                      console.log(response)
                      this.getClients()
                         this.isLoading = false
                       this.$toasted.success('updated Successfully!', {position: 'top-center', duration:3000 })

                  })
                  .catch(error => {
                      console.error(error);
                       this.isLoading = false
                       this.$toasted.success('error!', {position: 'top-center', duration:3000 })
                  })
    },

   
  },
  created() {
    this.getClients();
  },
};
</script>
