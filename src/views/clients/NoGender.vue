<template>

  <div class="row list">
                        <div class="col-lg-12 col-md-12">
                            <div class="card m-b-30">

                                <div class="card-body">
                                  <strong> {{clients.total}} No Gender Enrollees {{gender}} </strong>
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
                                          <tr v-for="client in clients.data" v-bind:key="client.id">
                                              <td>
                                                <img :src="`https://api.hayokinsurance.com/image/${client.user_image}`" height="170px" width="120px" alt="User Photo">
                                              </td>
                                              <td>
                                                <router-link :to="{ path: '/client/'+client.id, params: {} }">
                                                {{client.firstname}} {{client.lastname}}
                                              </router-link>
                                              </td>
                                              <td>{{client.phone_number}}</td>

                                              <td>
                                                <div class="form-group col-md-6">
                                                  <label for="inputCity">Gender <span class="text-danger">*</span></label>
                                                      <select class="form-control" required v-model="gender" >
                                                       <option  value="Male">Male</option>
                                                       <option  value="Female">Female</option>
                                                   </select>
                                                </div>

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

    }
  },

  methods:{

    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/filter-no-gender/95930`)
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
