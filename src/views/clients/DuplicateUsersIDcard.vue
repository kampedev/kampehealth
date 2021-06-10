<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3></h3>

                   </div>


               </div>
           </div>
       </div>
       <section class="">
          <div class="col-md-12">
            <!-- <div> -->
                <b-card no-body>
                  <b-tabs pills card align="center">
                    <b-tab title="Duplicate ID Card Number" active>
                      <b-card-text>
                        <div class="row list">
                            <div class="col-lg-12 col-md-12">
                                <div class="card m-b-30">

                                    <div class="card-body">
                                      {{clients.total}} Clients
                                      <div class="table-responsive">
                                          <table class="table align-td-middle table-card">
                                              <thead>
                                              <tr>
                                                  <th>Name</th>
                                                  <th>Phone Number</th>
                                                  <th>Type</th>
                                                  <th>ID card</th>
                                              </tr>
                                              </thead>
                                              <tbody>
                                              <tr v-for="client in clients.data" v-bind:key="client.id">

                                                  <td>
                                                    <router-link :to="{ path: '/client/'+client.id, params: {} }">
                                                    {{client.firstname}} {{client.lastname}} {{client.id}}
                                                  </router-link>
                                                  </td>
                                                  <td>{{client.phone_number}}</td>
                                                  <td>{{client.type}}</td>
                                                  <td>
                                                     {{client.id_card_number}}
                                                  </td>
                                                  <td>

                                                      <button type="button" @click="changeNumber(client)" class="btn btn-primary"
                                                      style="margin-left:10px; margin-top:10px;" >
                                                        <i class="fe fe-edit"></i></button>

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
                      </b-card-text>
                    </b-tab>

                    <b-tab title="Examine ID Card Number">
                      <b-card-text>
                        <div class="card m-b-30">

                            <div class="card-body">
                              <h3>Current Page: {{smallestcards.current_page}} </h3>
                              <div class="table-responsive">
                                  <table class="table align-td-middle table-card">
                                      <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Phone Number</th>
                                          <th>Type</th>
                                          <th>ID card</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr v-for="client in smallestcards.data" v-bind:key="client.id">

                                          <td>
                                            <router-link :to="{ path: '/client/'+client.id, params: {} }">
                                            {{client.firstname}} {{client.lastname}} {{client.id}}
                                          </router-link>
                                          </td>
                                          <td>{{client.phone_number}}</td>
                                          <td>{{client.type}}</td>
                                          <td>
                                             {{client.id_card_number}}
                                          </td>
                                          <td>

                                              <button type="button" @click="changeNumber(client)" class="btn btn-primary"
                                              style="margin-left:10px; margin-top:10px;" >
                                                <i class="fe fe-edit"></i></button>

                                          </td>
                                      </tr>


                                      </tbody>
                                  </table>
                                  <div class="text-center">
                                    <button  class="btn btn-default btn-lg" @click="gotoPrevious"><i class="fe fe-skip-back"></i></button>
                                    <button class="btn btn-default btn-lg" @click="gotoNext"><i class="fe fe-skip-forward"></i></button>
                                  </div>
                              </div>

                            </div>
                        </div>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </b-card>
              <!-- </div> -->
          </div>

           <div class="container">


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
      isLoading: false,
      selected: [],
      fullPage: true,
      states:"",
      clients:"",
      smallestcards:"",
      state:"",
      lga_states:"",
      current_page:1,

    }
  },

  methods:{
    gotoNext(){
      if (this.smallestcards.current_page != this.smallestcards.last_page) {
            this.current_page ++
            this.getSmallCads()
          }
          else {
            this.$toasted.info('You have reached the Last Page', {position: 'top-center', duration:3000 })

          }
    },
    gotoPrevious(){
      if (this.smallestcards.current_page != 1) {
          this.current_page --
          this.getSmallCads()
        }
        else {
          this.$toasted.info('You have reached the First Page', {position: 'top-center', duration:3000 })
        }
    },
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/duplicate_id_card_number/95930`)
                  .then(response => {
                      this.clients = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getSmallCads(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/getmaxidcard/95930`,{
        params:{
          page: this.current_page,

        }
      })
                  .then(response => {
                      this.smallestcards = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    changeNumber(client){
      this.isLoading = true
        this.axios.patch(`/api/v1/auth/id-card-number/change/${client.id}`)
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
    this.getSmallCads()
  }

}
</script>
