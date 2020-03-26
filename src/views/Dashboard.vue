<template>
  <div >
    <div class="" v-if="user.type == 'client'">
      <UserDashboard/>
    </div>

    <div class=""  v-if="user.type == 'hmo'">
      <HmoDashboard/>
    </div>

    <div class=""  v-if="user.type == 'shis'">
      <ShisDashboard/>
    </div>

    <div class=""  v-if="user.type == 'provider'">
      <ProviderDashboard/>
    </div>

  </div>
</template>

<script>
// // @ is an alias to /src
import UserDashboard from '@/views/clients/Dashboard.vue'
import HmoDashboard from '@/views/hmos/Dashboard.vue'
import ShisDashboard from '@/views/shis/StateDashboard.vue'
import ProviderDashboard from '@/views/providers/Dashboard.vue'

export default {
  components: {
    UserDashboard, HmoDashboard, ShisDashboard, ProviderDashboard
  },
  data(){
    return{
      user:null

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

    // this.axios.get(`/api/v1/auth/user`)
    //             .then(response => {
    //                 this.auth_user = response.data.data
    //                 console.log(response)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
  },
  methods:{

  },
  created(){

  }
}
</script>
