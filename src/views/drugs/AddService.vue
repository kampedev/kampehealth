<template>
  <section>

<div class="card m-b-30">
  <div class="card-body">
    <p class="h3 text-center">Add Service</p>



    <div class="form-row">
      <div class="form-group col-md-10">
        <label for="inputCity">Service Category </label>
            <select class="form-control"  v-model="state" @change="fetchLga(state)">
             <option v-for="state in states" v-bind:key="state.id" :value="state">{{state.name}}</option>
         </select>
      </div>
      <div class="form-group floating-label col-md-4 ">
          <label>OHIS Code</label>
          <input type="text" required class="form-control" placeholder="OHIS Code" v-model="register.firstname">
      </div>
      <div class="form-group floating-label col-md-4 ">
          <label>General Description</label>
          <input type="text" required class="form-control" placeholder="General Description" v-model="register.lastname">
      </div>
      <div class="form-group floating-label col-md-4">
          <label>Price</label>
          <input type="text" required class="form-control" placeholder="Price" v-model="register.agency_name">
      </div>



  </div>

    <button @click="registerUser" class="btn btn-primary btn-block btn-lg">Add Service</button>

    <div class="vld-parent">
         <loading :active.sync="isLoading"
         loader="dots"
         :can-cancel="true"
         :is-full-page="fullPage"></loading>
     </div>

  </div>
</div>



</section>
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
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      states:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                type:"provider",
                phone_number:"",
                state:"",
                agency_name:"",
                ward:"",
                services_offered:"",
                localgovt:"",
                address1:"",
                role:0,
                password:"euhler",
                password_confirmation:"euhler"
            }
    }
  },
  beforeMount(){
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
  methods:{

    getStates(){
      this.axios.get(`/api/v1/auth/states`)
                  .then(response => {
                      this.states = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
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
    registerUser(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          firstname : this.register.firstname,
          lastname : this.register.lastname,
          email : this.register.email,
          phone_number : this.register.phone_number,
          agency_name : this.register.agency_name,
          type : this.register.type,
          state : this.state.name,
          localgovt : this.register.localgovt,
          services_offered : this.register.services_offered,
          address1 : this.register.address1,
          ward : this.register.ward,
          role : this.register.role,
          password : this.register.password,
          password_confirmation : this.register.password_confirmation
        })
        .then(response=>{
          let user_id = response.data.data.id

            //add provider
              this.show = false;
              console.log(user_id)
              this.axios.post('/api/v1/auth/providerApply',{
                    provider_id: user_id,
                    agency_id: this.user.id,
                    status: true,
                  })

                  .then(response=>{
                      console.log(response);
                      this.$toasted.info('Provider added Successfully!', {position: 'top-left', duration:5000 })
                      this.$router.push(`/provider-${user_id}`)

                  })
                  .catch(error=>{
                      console.log(error.response)
                  })
                  //end of provider

            console.log(response);
            this.isLoading = false;
            // localStorage.setItem('jwt',token);

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Sign up not Successful', {position: 'top-left', duration:5000 })

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

    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
    this.getStates()
  }

}
</script>
