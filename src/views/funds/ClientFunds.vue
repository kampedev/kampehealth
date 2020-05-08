<template>
<body class="sidebar-pinned">
  <Navbar/>

  <section class="admin-content spacer">
      <div class="bg-dark m-b-30">
          <div class="container">
              <div class="row p-b-60 p-t-60">

                  <div class="col-md-4 text-white p-b-30">
                      <div class="media">
                          <div class="avatar avatar mr-3">
                              <div class="avatar-title bg-success rounded-circle mdi mdi-currency-ngn  ">

                              </div>
                          </div>
                          <div class="media-body">
                              <h1>Fund Manager </h1>
                              <p class="opacity-75">
                                  Manage your funds here.
                              </p>
                          </div>
                      </div>

                  </div>
                  <div class="col-md-8 text-center m-b-30 ml-auto">
                      <div class="rounded text-white bg-white-translucent">
                          <div class="p-all-15">
                              <div class="row">
                                  <div class="col-md-3 my-2 m-md-0">
                                      <div class="text-overline    opacity-75">Wallet</div>
                                      <h3 class="m-0 text-success"> <i class="mdi mdi-currency-ngn"></i>{{wallet.amount | numeral('0,0.00')}}</h3>
                                  </div>
                                  <!-- <div class="col-md-3 my-2 m-md-0">

                                      <div class="text-overline    opacity-75">Amount Spent</div>
                                      <h3 class="m-0 text-danger"><i class="mdi mdi-currency-ngn"></i>1,520</h3>
                                  </div> -->
                                  <!-- <div class="col-md-3 my-2 m-md-0">

                                      <div class="text-overline    opacity-75">Amount Received</div>
                                      <h3 class="m-0 text-info"><i class="mdi mdi-currency-ngn"></i>1,520</h3>
                                  </div> -->
                              </div>
                          </div>
                      </div>
                  </div>

                <div class="form-row">
                  <button type="button" class="btn m-b-15 ml-2 mr-2 btn-outline-primary" data-toggle="modal"
                          data-target="#exampleModalCenter">Fund Wallet</button>


                </div>

              </div>
          </div>
      </div>
      <div class="pull-up">
          <div class="container">
              <div class="row">
                  <div class="col-md-12">
                      <div class="card">
                          <div class="card-body">
                              <div class="row m-b-20">
                                  <div class="col-md-6 my-auto">
                                      <h4 class="m-0">Summary</h4>
                                  </div>
                                  <div class="col-md-6 text-right my-auto">
                                      <div class="btn-group" role="group" aria-label="Basic example">
                                          <button type="button" class="btn btn-white shadow-none js-datepicker"><i
                                                      class="mdi mdi-calendar"></i> Pick Date
                                          </button>

                                          <button type="button" class="btn btn-white shadow-none">All</button>
                                          <button type="button" class="btn btn-white shadow-none">Paid</button>
                                          <button type="button" class="btn btn-white shadow-none">UnPaid</button>
                                      </div>

                                  </div>
                              </div>
                              <div class="row ">
                                  <div class="col-md-12 p-0">

                                      <div class="table-responsive">
                                          <table class="table table-hover">
                                              <thead class="">
                                              <tr>
                                                  <!-- <th scope="col">#</th> -->
                                                  <th scope="col">Date</th>
                                                  <th scope="col">Transaction Number</th>
                                                  <th scope="col">Recipient</th>
                                                  <th scope="col">Status</th>
                                                  <th scope="col">Amount</th>
                                                  <!-- <th scope="col">Action</th> -->
                                              </tr>
                                              </thead>
                                              <tbody>

                                              <tr v-for="tran in trans" v-bind:key="tran.id">

                                                  <td class="align-middle">{{tran.created_at}}</td>
                                                  <td class="align-middle">#987118</td>
                                                  <td class="align-middle">atmos@stripe.com</td>
                                                  <td class="align-middle"><span class=" text-success"><i
                                                                  class="mdi mdi-check-circle "></i> Successful</span></td>
                                                  <td class="align-middle"><h6 class=" m-0"> <i class="mdi mdi-currency-ngn"></i>{{tran.amount | numeral('0,0.00')}}</h6></td>

                                              </tr>



                                              </tbody>
                                          </table>
                                      </div>

                                  </div>
                                  <div class="col-auto ml-auto">
                                      <div>
                                          <nav class="">
                                              <ul class="pagination">
                                                  <li class="page-item disabled">
                                                      <a class="page-link" href="#" tabindex="-1">Previous</a>
                                                  </li>
                                                  <li class="page-item active"><a class="page-link" href="#">1</a>
                                                  </li>
                                                  <li class="page-item ">
                                                      <a class="page-link" href="#">2 <span
                                                                  class="sr-only">(current)</span></a>
                                                  </li>
                                                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                  <li class="page-item">
                                                      <a class="page-link" href="#">Next</a>
                                                  </li>
                                              </ul>
                                          </nav>
                                      </div>
                                  </div>
                              </div>


                              <div class="m-b-10">



                                <!-- Modal -->
                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalCenterTitle">Enter Amount</h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- <h3>Amount</h3> -->
                                                  <div class="form-row">
                                                       <div class="form-group col-md-12">
                                                           <label for="inputEmail4"> Amount</label>
                                                           <input type="text" class="form-control"  placeholder="0.00" v-model="useramount">
                                                       </div>

                                                   </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>

                                                <paystack
                                                       :amount="useramount*100"
                                                       :email="user.email"
                                                       :paystackkey="paystackkey"
                                                       :reference="reference"
                                                       :callback="callback"
                                                       :close="close"
                                                       :embed="false"
                                                        v-if="useramount != null"
                                                   >
                                                   <button type="button" class="btn btn-primary ">Pay {{useramount}} </button>

                                                   </paystack>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </section>

</body>
</template>

<script>
// // @ is an alias to /src
import Navbar from '@/views/Navbar.vue'
import paystack from 'vue-paystack';

export default {
  components: {
    Navbar, paystack
  },
  data(){
    return{
      wallet:"",
      useramount:"10000",
      paystackkey: "pk_test_551e6fe55f1f3051de41069797574751b1f65c49", //paystack public key
      user:null,
      trans:"",


    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getUserWallet`)
                .then(response => {
                    this.wallet = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  computed: {
     reference(){
       let text = "";
       let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

       for( let i=0; i < 10; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

       return text;
     }
   },
   methods: {
   callback: function(response){
     this.fundWallet()
     console.log(response)
   },
   close: function(){
       console.log("Payment closed")
   },
   fundWallet(){
       this.user = JSON.parse(localStorage.getItem('user'))
       // this.isLoading = true;
     this.axios.post('/api/v1/auth/fundWallet',{
         amount: this.useramount

       })
     .then(response=>{
         console.log(response);
         this.getWallet()
         this.$breadstick.notify("Wallet funded Successfully!", {position: "top-right"});

     })
     .catch(error=>{
         console.log(error.response)
     })
   },
   getWallet(){
     this.user = JSON.parse(localStorage.getItem('user'))
     this.axios.get(`/api/v1/auth/getUserWallet`)
                 .then(response => {
                     this.wallet = response.data.data
                     console.log(response)
                 })
                 .catch(error => {
                     console.error(error);
                 })
   },
   getTrans(){
     this.user = JSON.parse(localStorage.getItem('user'))
     this.axios.get(`/api/v1/auth/getTransUser`)
                 .then(response => {
                     this.trans = response.data.data
                     console.log(response)
                 })
                 .catch(error => {
                     console.error(error);
                 })
   }
 },
 created(){
   this.getTrans()
 }
}
</script>
<style lang="css" scoped>
.spacer{
  margin-top:40px;
}
</style>
