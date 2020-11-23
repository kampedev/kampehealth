<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <div  v-if="user.state == 'Kogi'">
      <AddClientAgencyKogi/>
    </div>

    <div  v-if="user.state == 'Zamfara'">
      <AddClientAgencyZamfara/>
    </div>

   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import AddClientAgencyZamfara from '@/views/clients/AddClientAgencyZamfara.vue'
  import AddClientAgencyKogi from '@/views/clients/AddClientAgencyKogi.vue'

export default {
  components: {
     Navbar,  AddClientAgencyZamfara, AddClientAgencyKogi
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
  
    fetchLga(state){
      this.axios.get(`/api/v1/auth/lga/${state.id}`)
                  .then(response => {
                      this.lga_states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))

      this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    registerUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          nimc_number: this.register.nimc_number,
          firstname: this.register.firstname,
          lastname: this.register.lastname,
          middlename: this.register.middlename,
          email: this.register.email,
          phone_number: this.register.phone_number,
          type: this.register.type,
          agency_id: this.user.id,
          provider_id: this.register.provider_id,
          state: this.state.name,
          role: 0,
          password: 'euhler',
          localgovt: this.register.localgovt,
          ward: this.register.ward,
          blood: this.register.blood,
          dob: this.register.dob,
          address1: this.register.address,
          genotype: this.register.genotype,
          weight: this.register.weight,
          gender: this.register.gender,
          sector: this.register.sector,
          place_of_work: this.register.place_of_work,
          point_of_care: this.register.point_of_care,
          finger_print: this.register.finger_print,
          salary_number: this.register.salary_number,
          grade_level: this.register.grade_level,
          date_of_entry: this.register.date_of_entry,
          marital_status: this.register.marital_status,
          category_of_vulnerable_group: this.register.category_of_vulnerable_group,
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$toasted.info('Client added Successfully', {position: 'top-center', duration:3000 })
            let user_id = response.data.data.id

            this.$router.push(`/client/${user_id}`)

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

            this.getClients();

        })
    }

  },
  created(){
    this.getStates()
    this.getClients()
    this.getMDAs()
    this.getProviders()
  }

}
</script>
