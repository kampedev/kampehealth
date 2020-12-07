<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div >
      <AddClientAgencyKogi/>
    </div>

    <!-- <div  v-if="user.state == 'Zamfara'">
      <AddClientAgencyZamfara/>
    </div> -->

   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // import AddClientAgencyZamfara from '@/views/clients/AddClientAgencyZamfara.vue'
  import AddClientAgencyKogi from '@/views/clients/AddClientAgencyKogi.vue'

export default {
  components: {
     Navbar,  AddClientAgencyKogi
  },
  data(){
    return{
      states:"",
      providers:"",
      clients:"",
      mdas:"",
      sector:"",
      state:"",
      lga_states:"",
      user:null
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getAgencyToUser/${this.user.id}`)
                .then(response => {
                    this.clients = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods:{
  //

  },
  created(){

  }

}
</script>
