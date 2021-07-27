<template>
  <div >

  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){
    return{
      auth_user:'',
      user:null,
    }
  },
  beforeMount(){
    this.$toasted.info('Welcome back!', {position: 'top-center', duration:3000 })

    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data
                    console.log(response)
                     localStorage.setItem('user',JSON.stringify(response.data))
                     let type = response.data.type
                     let role = response.data.user_role
                     // let job_title = response.data.job_title
                     if (type == 'client') {
                       this.$router.push('/client-dashboard')

                     }
                     if (type == 'hmo') {
                       this.$router.push('/hmo-dashboard')

                     }
                     if (type == 'employee' && role == 0) {
                       this.$router.push('/employee-dashboard')
                     }
                     if (type == 'provider') {
                       this.$router.push('/provider-dashboard')

                     }
                     if (type == 'shis' || role == 1) {
                       this.$router.push('/state-dashboard')

                     }
                     if (type == 'tpa') {
                      this.$router.push('/tpa-dashboard')

                    }
                    if (type == 'tpa_employee') {
                      this.$router.push('/tpa-employee-dashboard')

                    }

                     if (type == 'provider_employee') {
                       this.$router.push('/provider-employee')
                     }

                     this.$router.go()

                })
                .catch(error => {
                    console.error(error);
                })
  },

  methods:{
      //
  },
  created(){
    // this.movePage()
    // location.reload()

    if (localStorage.getItem('reloaded')) {
           // The page was just reloaded. Clear the value from local storage
           // so that it will reload the next time this page is visited.
           localStorage.removeItem('reloaded');
       } else {
           // Set a flag so that we know not to reload the page twice.
           localStorage.setItem('reloaded', '1');
           location.reload();
       }


  }
}
</script>
