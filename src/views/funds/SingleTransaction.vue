<template>
  <body class="sidebar-pinned ">

    <Navbar/>

    <section class="admin-content">
           <div class="bg-dark m-b-30 spacer">
               <div class="container">
                   <div class="row p-b-60 p-t-60">

                       <div class="col-md-6 text-white p-b-30">
                           <div class="media">
                               <div class="avatar avatar mr-3">
                                   <div class="avatar-title bg-success rounded-circle mdi mdi-receipt  ">

                                   </div>
                               </div>
                               <div class="media-body">
                                   <div class="opacity-75">To,</div>
                                   <h4 class="m-b-0">New York Times </h4>
                                   <p class="opacity-75">
                                      Invoice ID #0047 <br>
                                       Invoice Date : 02/29/2018
                                   </p>
                                   <button class="btn btn-white-translucent" id="printDiv" > <i class="mdi
                                   mdi-printer"></i>
                                       Print</button>
                               </div>
                           </div>

                       </div>
                       <div class="col-md-5 text-center m-b-30 ml-auto">
                           <div class="rounded text-white bg-white-translucent">
                               <div class="p-all-15">
                                   <div class="row">
                                       <div class="col-md-6 my-2 m-md-0">
                                           <div class="text-overline    opacity-75">amount received</div>
                                           <h3 class="m-0 text-success">$1500</h3>
                                       </div>
                                       <div class="col-md-6 my-2 m-md-0">

                                           <div class="text-overline    opacity-75">amount pending</div>
                                           <h3 class="m-0 text-danger">$32,590</h3>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>


                   </div>
               </div>
           </div>
           <div class="pull-up">
               <div class="container" id="printableArea">
                   <div class="row"  >
                       <div class="col-md-12 m-b-40">
                           <div class="card">
                               <div class="card-body">
                                   <div class="row">
                                       <div class="col-md-6">
                                           <img src="assets/img/logos/nytimes.jpg" width="60" class="rounded-circle"
                                                alt="">
                                           <address class="m-t-10">
                                               To,<br>
                                               <span class="h4 font-primary"> New York Times,</span> <br>
                                               The New York Times Building <br>
                                               620 Eighth Avenue <br>
                                               New York City, New York 10018 <br>


                                           </address>
                                       </div>
                                       <div class="col-md-6 text-right my-auto">
                                           <h1 class="font-primary">INVOICE</h1>
                                           <div class="">Invoice Number: #0047</div>
                                           <div class="">Date: 02/29/18</div>
                                       </div>
                                   </div>

                                   <div class="table-responsive ">
                                       <table class="table m-t-50">
                                           <thead>
                                           <tr>
                                               <th class="">Task Description</th>
                                               <th class="text-center">Rate</th>
                                               <th class="text-center">Hours</th>
                                               <th class="text-right">Total</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                           <tr>
                                               <td class="">
                                                   <p class="text-black m-0">FrontEnd Development</p>
                                                   <p class="text-muted">
                                                       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                   </p>
                                               </td>
                                               <td class="text-center">$65.00</td>
                                               <td class="text-center">120</td>
                                               <td class="text-right">$7800</td>
                                           </tr>
                                           <tr>
                                               <td class="">
                                                   <p class="text-black m-0">React Native IOS App</p>
                                                   <p class="text-muted">
                                                       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                   </p>
                                               </td>
                                               <td class="text-center">$105.00</td>
                                               <td class="text-center">158</td>
                                               <td class="text-right">$16,590</td>
                                           </tr>
                                           <tr>
                                               <td class="">
                                                   <p class="text-black m-0">Character Illustration

                                                   </p>
                                                   <p class="text-muted">
                                                       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                   </p>
                                               </td>
                                               <td class="text-center">$45.00</td>
                                               <td class="text-center">100</td>
                                               <td class="text-right">$4500</td>
                                           </tr>

                                           <tr>
                                               <td colspan="3" class="text-right">
                                                   Total
                                               </td>
                                               <td colspan="2" class="text-right">
                                                   $ 28890
                                               </td>
                                           </tr>
                                           <tr>
                                               <td colspan="3" class="text-right">
                                                   Advance
                                               </td>
                                               <td colspan="2" class="text-right">
                                                   - $1500
                                               </td>
                                           </tr>

                                           <tr class="">
                                               <td colspan="3" class="text-right">
                                                   Taxes
                                               </td>
                                               <td colspan="2" class="text-right">
                                                   $ 5200.2
                                               </td>
                                           </tr>
                                           <tr class="bg-light">
                                               <td colspan="3" class="text-right">
                                                   Total
                                               </td>
                                               <td colspan="2" class="text-right">
                                                   $ 32,590.2
                                               </td>
                                           </tr>
                                           </tbody>
                                       </table>
                                   </div>
                                   <div class="p-t-10 p-b-20">
                                       <p class="text-muted ">
                                           Services will be invoiced in accordance with the Service Description. You must
                                           pay all undisputed invoices in full within 30 days of the invoice date, unless
                                           otherwise specified under the Special Terms and Conditions. All payments must
                                           reference the invoice number. Unless otherwise specified, all invoices shall be
                                           paid in the currency of the invoice
                                       </p>
                                       <hr>
                                       <div class="text-center opacity-75">
                                           &copy; atmos 2019
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

           </div>
       </section>

           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>
       </body>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      hmos:"",
      agencies:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

    this.axios.get(`/api/v1/auth/allHmo`)
                .then(response => {
                    this.hmos = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    getHmo(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/hmoProvider/${this.user.id}`)
                  .then(response => {
                      this.agencies = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addAgency(){

      this.user = JSON.parse(localStorage.getItem('user'))

      if (this.edit === false) {
      // Add dependent
      this.isLoading = true;
      this.axios.post('/api/v1/auth/providerApply',{

        provider_id: this.user.id,
        agency_id: this.agency_id,
        status: false,
      })

      .then(response=>{
          console.log(response);
          this.clearIt();
          this.getHmo();
          this.isLoading = false;
          this.$breadstick.notify("Agency added Successfully!", {position: "top-right"});


      })
      .catch(error=>{
          console.log(error.response)
      })
      }else {
      // Update
      this.isLoading = true;
      this.axios.put('/api/v1/auth/addDependant',{

        topic_id: this.topic.id,
        topic_name: this.topic.topic_name,
        // module_id: this.course.id,
        module_id: this.$route.params.id,
        topic_content: this.topic.topic_content,
        video: this.topic.video,
        audio: this.audio,
        doc: this.doc,

      })

      .then(response=>{
          console.log(response);
          this.clearIt();
          this.fetchModule();
          this.edit = true;
          this.isLoading = false;
          this.$toasted.global.crudUpdated().goAway(1500);

      })
      .catch(error=>{
          console.log(error.response)
      })

      }
    },

    clearIt(){

      this.agency_id = "";

    },

  },
  created(){
  //
  }

}
</script>
<style lang="css" scoped>
  .spacer{
    margin-top:30px;
  }

</style>
