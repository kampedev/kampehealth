<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>

       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                      <p class="h4"> <strong>Subscribe to a Plan</strong>  </p>

                   </div>


               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">
                           <div class="card-header">

                             <!-- <h3 class="p-t-10 searchBy-name">Add Employee</h3> -->
                           </div>

                           <div class="card-body">

                                   <div class="form-row">
                                        <div class="form-group col-md-6">
                                          <label for="inputPassword4"><strong>Select Plan</strong></label>
                                          <select class="form-control"  v-model="plan_id" >
                                           <option  value="12066">Individual Plan (&#8358; 12,066)</option>
                                           <option  value="57600">Family Plan (&#8358; 57,600)</option>
                                         </select>

                                         <!-- <div class="card">

                                         </div> -->

                                        </div>

                                    </div>

                                   <div class="col-md-6 form-group" >
                                     <paystack
                                            :amount="plan_id*100"
                                            :email="randomemail"
                                            :paystackkey="paystackkey"
                                            :reference="reference"
                                            :callback="callback"
                                            :close="close"
                                            :embed="false"
                                            v-if="plan_id != null"
                                        >
                                       <button class="btn btn-primary btn-block btn-lg" >Proceed to Pay </button>
                                     </paystack>

                                       <button class="btn btn-primary btn-block btn-lg" disabled v-if="plan_id == null">
                                         Submit</button>
                                   </div>

                           </div>
                       </div>
                   </div>

                    <!-- <div class="col-md-12">
                      <div class="card">

                      </div>

                    </div> -->


                   <div class="vld-parent">
                        <loading :active.sync="isLoading"
                        loader="dots"
                        :can-cancel="true"
                        :is-full-page="fullPage"></loading>
                    </div>

               </div>
           </div>

       </section>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
     import paystack from 'vue-paystack';

export default {
  components: {
     Navbar, Loading, paystack
  },
  data(){
    return{
      hmos:"",
      agency_id:"",
      provider_id:"",
      amount:"",
      plan_id:null,
      paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      providers:"",
      singleplan:"",
      plans:"",
      myplan:"",
      user:null,
      isLoading: false,
      fullPage: true,
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))


  },
  computed: {
     reference(){
       let text = "";
       let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

       for( let i=0; i < 10; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

       return text;
     },
     randomemail(){
       return 'randomuseremail' + this.$route.params.id + '@ohisuser.com'
     }

   },
  methods:{

    callback: function(response){
      // this.makeSubscribe()
      this.makeSubscribe()
      console.log(response)
    },
    close: function(){
        console.log("Payment closed")
    },



    makeSubscribe(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.isLoading = true;
    this.axios.post('/api/v1/auth/make/transaction',{
        agency_id: this.agency_id,
        amount: this.plan_id,
        user_id: this.$route.params.id
      })
    .then(response=>{
        console.log(response);
        this.$toasted.info('Congratulations you have successfully enrolled to O\'HIS', {position: 'top-center', duration:8000 })
        this.isLoading = false;
        // this.$router.push(`https://oshia.ng`)
        window.location = 'https://www.oshia.ng';



    })
    .catch(error=>{
        console.log(error.response)
    })
  }

    },

  created(){
    //
  }

}
</script>
