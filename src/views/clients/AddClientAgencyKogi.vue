<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-info m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3 class="h3">Add Enrollee</h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">
             <AddClientForm/>

           </div>

       </section>
       </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import AddClientForm from '@/views/clients/AddClientForm.vue'

export default {
  components: {
     Navbar, AddClientForm
  },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      states:"",
      providers:"",
      clients:"",
      mdas:"",
      sector:"",
      response:"",
      state:"",
      lga_states:"",
      wards:[],

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{
    getClients(){
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


  },
  created(){
    this.fetchLga()
    // this.getClients()
    this.getMDAs()
    this.getProviders()
  }

}
</script>
