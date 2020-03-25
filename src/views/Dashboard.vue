<template>
  <div >
    <div class="" v-if="auth_user.type == 'client'">
      <UserDashboard/>
    </div>

    <div class=""  v-if="auth_user.type == 'hmo'">
      <HmoDashboard/>
    </div>

    <div class=""  v-if="auth_user.type == 'shis'">
      <ShisDashboard/>
    </div>

    <div class=""  v-if="auth_user.type == 'provider'">
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
      auth_user:""

    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

  },
  created(){

  }
}
</script>
