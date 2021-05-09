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
                       <h3 class="h3">Add Client</h3>
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

     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';



export default {
  components: {
     Navbar, AddClientForm
  },
  data(){
    return{

      isLoading: false,
      fullPage: true,
      OfficerDetails:"",
      providers:"",
      user:null,
      clients:"",
      mdas:"",
      sector:"",
      response:"",
      state:"",
      lga_states:"",
      selected_provider:"",
      selected_provider_dependents:"",
      register:{
                firstname:"",
                lastname:"",
                middlename:"",
                nimc_number:"",
                email:"",
                phone_number:"",
                type:"client",
                agency_id:"",
                state:"",
                localgovt:"",
                ward:"",
                address:"",
                blood:"",
                weight:"",
                gender:"",
                genotype:"",
                dob:"",
                salary_number:"",
                provider_id:"",
                point_of_care:"",
                sector:"",
                finger_print:"",
                place_of_work:"",
                grade_level:"",
                date_of_entry:"",
                marital_status:"",
                category_of_vulnerable_group:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/OfficerDetails/${this.user.id}`)
                .then(response => {
                    this.OfficerDetails = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods:{
    selected(value){
      this.selected_provider = value.id

    },
    selectedPointocare(value){
      this.selected_provider_dependents = value.agency_name

    },
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
    fetchLga(){
      this.axios.get(`/api/v1/auth/lga/2683`)
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
      this.axios.get(`/api/v1/auth/providerAgency/4`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
      getMDAs(){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.axios.get(`/api/v1/auth/ministry`)
                    .then(response => {
                      this.mdas = response.data
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
          agency_id: 4,
          // provider_id: this.register.provider_id,
          provider_id: this.selected_provider,
          state: '2683',
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
          point_of_care: this.selected_provider_dependents,
          finger_print: this.register.finger_print,
          salary_number: this.register.salary_number,
          grade_level: this.register.grade_level,
          date_of_entry: this.register.date_of_entry,
          marital_status: this.register.marital_status,
          category_of_vulnerable_group: this.register.category_of_vulnerable_group,
          enrolled_by: this.user.id,
          org_id: this.OfficerDetails.orgenrol_id,
          enrolled_by_user_id: this.OfficerDetails.id,
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
            this.response = error.response.data.errors
            if (this.response.firstname != null) {
              this.$toasted.error(`${this.response.firstname}`, {position: 'top-center', duration:3000 })

            }
            if(this.response.lastname != null) {
              this.$toasted.error(`${this.response.lastname}`, {position: 'top-center', duration:3000 })

            }
            if (this.response.phone_number != null) {
              this.$toasted.error(`${this.response.phone_number}`, {position: 'top-center', duration:3000 })

            }

        })
    }

  },
  created(){
    this.fetchLga()
    // this.getClients()
    this.getMDAs()
    this.getProviders()
  }

}
</script>
