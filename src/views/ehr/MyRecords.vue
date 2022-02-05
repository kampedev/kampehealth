<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                      
                       <h3>My Records</h3>
                      
                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

        <div class="col-md-12 form-group" v-if="user.type == 'provider_employee'">
            <button
              type="button"
              :class="buttoncolor.online"
              @click="showOnline"
            >
              Online <i class="fe fe-wifi"></i>
            </button>
            <button
              type="button"
              :class="buttoncolor.offline"
              @click="showOffline"
            >
              Offline <i class="fe fe-wifi-off"></i>
            </button>
          </div>

          <div class="col-md-12" v-show="online_S">
                <MyRecordsOnline/>
          </div>

          <div class="col-md-12" v-show="offline_S">
                <MyRecordsOffline/>
          </div>


             

              
           </div>

       </section>
       </main>
        <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="fullPage"></loading>
                    </div>

   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import MyRecordsOnline from './MyRecordsOnline.vue'
  import MyRecordsOffline from './MyRecordsOffline.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
     Navbar, Loading, MyRecordsOffline, MyRecordsOnline
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      online_S: true,
      offline_S: false,
      user: null,
      records:"",
       buttoncolor: {
        offline: "btn btn-default",
        online: "btn btn-info",
      },
     
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  
  },
  methods:{

      showOnline() {
      this.online_S = true;
      this.offline_S = false;
      this.buttoncolor.online = "btn btn-info";
      this.buttoncolor.offline = "btn btn-default";
    },
    showOffline() {
      this.online_S = false;
      this.offline_S = true;
      this.buttoncolor.online = "btn btn-default";
      this.buttoncolor.offline = "btn btn-info";
    },
    getRecords(){
    this.user = JSON.parse(localStorage.getItem('user'))

        if (this.user.type == 'provider') {

             this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/gethealthRecord`,{ provider : this.user.id})
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
        }
        if (this.user.type == 'provider_employee') {
                 this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/gethealthRecord`,{ provider : this.user.institutional_id})
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })               

        }
        if (this.user.type == 'employee' || this.user.type == 'shis') {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.axios.post(`/api/v1/auth/service_summary-agency`,{ agency_id : 95930 })
                  .then(response => {
                      this.records = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })               

        }
     
    }


  },
  created(){
    this.getRecords()
  }

}
</script>
