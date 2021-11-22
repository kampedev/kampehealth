<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">

                       <h3 class="h3">Enrollees</h3>

                       <div class="form-dark">
             <div class="input-group input-group-flush mb-3"></div>
             <button
               type="button"
               class="btn btn-outline-info "
               name="button"
               @click="getClients(currentPage ? currentPage : 1)"
             >
               <i class="fe fe-refresh-cw"></i>
             </button>
           </div>


                   </div>

               </div>
           </div>
       </div>
       <SearchUser/>
       <div class="card m-b-30 container">
         <div class="card-body">

            <div class="row" >

              <div class="form-group col-md-4">
                <label for="inputCity"><i class="fe fe-credit-card"></i> Select Sector Plan</label>
                    <select class="form-control"  v-model="sector" >
                     <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                      <option  value="State Equity Program">State Equity Program</option>
                      <option  value="Vulnerable Groups">Vulnerable Groups</option>
                      <option  value="Voluntary Contributor">Voluntary Contributor</option>
                     <option  value="Civil Servant">Civil Servant</option>
                    <option  value="Oganized Private Sector Plan">Organized Private Sector Plan</option>
                    <option value="Tertiary Student Health Insurance Plan (T-SHIP)">
                      Tertiary Student Health Insurance Plan (T-SHIP)</option>
                 </select>
              </div>

              <div class="form-group col-md-4">
                <label for="inputCity"><i class="fe fe-map-pin"></i> Select LGA</label>
                  <select class="form-control"  v-model="localgovt" @change="fetchWards($event)">
                    <option v-for="lga in lga_states" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                 </select>
              </div>

              <div class="form-group col-md-4">
                <label><i class="fe fe-navigation"></i> Ward</label>
                <select class="form-control"  v-model="ward">
                    <option v-for="ward in wards" v-bind:key="ward.id" :value="ward.id">{{ward.ward_name}}</option>
                 </select>
              </div>

              <div class="form-group col-md-4" >
                <label><i class="fe fe-activity"></i> Select Facility </label>
                <select class="form-control" required v-model="provider_id">
                    <option v-for="provider in providers" v-bind:key="provider.id" :value="provider.id">{{provider.agency_name}}</option>
                 </select>
              </div>
              <div class="form-group col-md-4" >
                     <label for="inputCity"><i class="fe fe-briefcase"></i> Select MDA </label>
                         <select class="form-control"  v-model="place_of_work" >
                          <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                      </select>
               </div>

               <div class="form-group col-md-4" >
                      <label for="inputCity"><i class="fe fe-user-plus"></i> Select Employee</label>
                          <select class="form-control"  v-model="enrolled_by" >
                           <option  :value="emoployee.id" v-for="emoployee in employees.data" v-bind:key="emoployee.id">{{emoployee.firstname}} {{emoployee.lastname}}</option>
                       </select>
                </div>

              <div class="form-group col-md-6">
                  <label for="inputCity"><i class="fe fe-calendar"></i> Start Date </label>
                  <input type="date" class="form-control" v-model="from"  @change="pushDate"/>
              </div>

               <div class="form-group col-md-6">
                  <label for="inputCity"><i class="fe fe-calendar"></i> End Date </label>
                  <input type="date" class="form-control" v-model="to"   @change="pushDate"/>
              </div>


            </div>

            <button
          @click="getClients(currentPage ? currentPage : 1)"
          class="btn btn-primary btn-block btn-lg"
          style="margin-top:20px;"
        >
          <i class="fe fe-filter"></i>
        </button>
           <button @click="clearFilter" class="btn btn-default btn-block btn-lg" style="margin-top:20px;"><i class="fe fe-x-circle"></i> </button>
          <br />

         </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">
                           <div class="card-body">

                             <p class="h4">
                                Total Records: <span class="text-primary">{{ rows | numeral(0, 0) }}</span>
                             </p>


                             <div class="table table-stripe">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Avatar</th>
                                         <th>Name</th>
                                         <th>Phone Number</th>
                                         <th>Sector</th>
                                         <th>Enrollment Date</th>
                                         <th>OHIS Number</th>
                                         <th>Status</th>
                                         <th>Action</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="client in clients.data" v-bind:key="client.id">
                                       <td>
                                           <div class="avatar avatar-sm " v-if="client.user_image != null ">
                                             <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`"
                                                class="avatar-img avatar-sm rounded-circle"
                                                alt="User Photo"  onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"></div>
                                       </td>
                                         <td >{{client.firstname}}, {{client.middlename}} {{client.lastname}}</td>
                                         <td>{{client.phone_number}}</td>
                                         <td>{{client.sector}}</td>
                                         <td>{{client.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                                         <td> {{client.id_card_number}}</td>
                                         <td>
                                            <p>
                                              <span v-if="client.status == 'active'">
                                                <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-success">active</button>
                                                </span>
                                                <span v-if="client.status ==  'inactive' ">
                                                <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">inactive</button>
                                              </span>
                                            </p>
                                         </td>
                                         <td >
                                           <router-link :to="{ path: '/client/'+ client.id}">
                                             <button type="button" name="button" class="btn btn-info"><i class="fe fe-eye"></i></button>
                                            </router-link>

                                            <button class="btn btn-link" @click="getDependents(client)" data-toggle="collapse" :data-target="'#collapseExample' + client.id" aria-expanded="false" aria-controls="collapseExample">
                                                 <i class="fe fe-users"></i>
                                             </button>

                                             <div class="collapse" :id="'collapseExample' + client.id">

                                                <table class="table table-responsive">
                                                  <!-- <tbody> -->
                                                    <tr>
                                                    <th>Name</th><th>Relationship</th><th>Gender</th>
                                                  </tr>
                                                  <tr v-for="dep in dependents" v-bind:key="dep.id">
                                                    <td>{{dep.firstname}} {{dep.lastname}}</td>
                                                    <td>{{dep.relationShipType}}</td>
                                                    <td>{{dep.gender}}</td>
                                                  </tr>
                                                  <!-- </tbody> -->


                                                </table>
                                             </div>

                                         </td>
                                     </tr>


                                     </tbody>
                                 </table>
                                 <div class="text-center">
                                   <b-pagination
                                       v-model="currentPage"
                                       :total-rows="rows"
                                       :per-page="perPage"
                                       aria-controls="my-table"
                                       @input="getUserData(currentPage ? currentPage : 1)"
                                     ></b-pagination>
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
           </div>

       </section>
       </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import SearchUser from '@/views/shis/components/SearchUser.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
     Navbar, Loading, SearchUser
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      clients:"",
      providers:"",
      mdas:"",
      wards:"",
      state:"",
      lga_states:"",
      employees:"",
      provider_id:"",
      sector:"",
      place_of_work:"",
      localgovt:"",
      dependents:"",
      enrolled_by:"",
      ward:"",
      date:"",
      from: "",
      to: new Date(),
      current_page: 1,
      rows: "1",
      perPage: 15,

    }
  },
  beforeMount(){
    this.getClients()
  },
  computed:{
             addOneDay() {
              var result = new Date(this.to);
              result.setDate(result.getDate() + 1);
              return result;
        }
  },
  methods:{
    clearFilter(){
      this.ward = ""
      this.date =""
      this.from =""
      this.to = new Date()
      this.sector =""
      this.localgovt =""
      this.provider_id =""
      this.place_of_work =""
      this.enrolled_by =""
    },
    getLGA(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/lga/2676`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    pushDate(){
      this.date = 'date'
    },
    getEmployees(){
      this.axios.get(`/api/v1/auth/getEmployee/95930`)
                  .then(response => {
                      this.employees = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    fetchWards(){
      this.axios.get(`/api/v1/auth/getwards/${this.localgovt}`)
                  .then(response => {
                      this.wards = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getDependents(client){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/allDependantUser/${client.id}`)
                  .then(response => {
                      this.dependents = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    getProviders(){
      this.axios.get(`/api/v1/auth/providerAgency/95930`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getClients(currentPage){
      this.isLoading = true;

    this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/auth/getUsersfilterparams`, {
        params: {
          page: currentPage,
          agency_id: 95930,
          provider_id: this.provider_id ? this.provider_id : "",
          sector: this.sector ? this.sector : "",
          place_of_work: this.place_of_work ? this.place_of_work : "",
          localgovt: this.localgovt ? this.localgovt : "",
          enrolled_by: this.enrolled_by ? this.enrolled_by : "",
          date: this.date ? this.date : "",
          from: this.from ? this.from : "",
          to: this.addOneDay ? this.addOneDay : "",
          ward: this.ward ? this.ward : "",
        },
      })
      .then((response) => {
        this.clients = response.data;
        console.log(response)
        this.rows = response.data.meta.total;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;

        console.error(error);
      });
    },
    
    getMDAs(){
      this.axios.get(`/api/v1/auth/ministry/95930`)
                  .then(response => {
                    this.mdas = response.data.data
                      console.log(response.data)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },


  },
  created(){
    this.getLGA()
    this.getProviders()
    this.getMDAs()
    this.getEmployees()
  }

}
</script>
