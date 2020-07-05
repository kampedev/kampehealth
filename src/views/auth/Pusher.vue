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
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data.data
                    console.log(response)
                     localStorage.setItem('user',JSON.stringify(response.data.data))
                     let type = response.data.data.type
                     let job_title = response.data.data.job_title
                     if (type == 'client') {
                       this.$router.push('/client-dashboard')

                     }
                     if (type == 'hmo') {
                       this.$router.push('/hmo-dashboard')

                     }
                     if (type == 'provider') {
                       this.$router.push('/provider-dashboard')

                     }
                     if (type == 'shis') {
                       this.$router.push('/state-dashboard')

                     }

                     if (job_title == 'doctor') {
                       this.$router.push('/doctor')

                     }
                     if (job_title == 'nurse') {
                       this.$router.push('/nurse')

                     }
                     if (job_title == 'receptionist') {
                       this.$router.push('/receptionist')
                     }
                     if (job_title == 'laboratorist') {
                       this.$router.push('/laboratorist')
                     }
                     if (job_title == 'pharmacist') {
                       this.$router.push('/pharmacist')
                     }

                     if (job_title == 'accountant') {
                       this.$router.push('/accountant')
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
