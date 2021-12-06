<template>
  <section class="admin-content " id="contact-search">
    <div >
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <strong> {{auth_user.firstname}} {{auth_user.lastname}}</strong>
                   </div>
               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

             <div class="row">

                 <div class="col-md-10 offset-md-1">
                    <div class="card m-b-30 bg-info">
                        <div class="card-body text-black">
                           
                            <div>
                                <p class="h5">Congratulations on your Successful Registration. Your ID Card will be available in 3 Weeks</p>
                                <p class="h5">You can walk up to our office and collect your ID Card.</p>
                                <p class="h5">For further inquries call <a href="mailto:info.oshia.ng" class="text-link">info.oshia.ng</a> or Call <a href="tel:0700022556447 ">0700022556447 </a> </p>
                                <h1 class="fw-400">
                                  <button class="btn btn-dark" @click="printMe">Print Registration Slip</button>
                                  <a href="https://www.oshia.ng" class="btn btn-default">Go to our Website</a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>


             </div>

              

               <div class="row">
                   <div class="col-md-10 offset-md-1">
                       <div class="card m-b-30"   style="
                  background-image: url('../assets/img/ohis_transparent.png');
                  background-size: cover;
                  background-repeat: no-repeat;
                "  id="printDiv" >
                           <div class="card-header">
                           </div>

                           <div class="card-body">
                              <div class="row">
                                <div class="col-md-12">
                                  <p class="h3">O'HIS Registration Slip</p>
                                </div>
                                
                             <div class="col-md-5" >
                               <!-- <img :src="`http://localhost:8000/image/${auth_user.user_image}`" class="img-thumbnail" alt="Cinque Terre" width="350" height="236"> -->
                               <img
                                      :src="
                                        `https://api.hayokinsurance.com/image/${auth_user.user_image}`
                                      "
                                      class="img spacer-top"
                                      alt="User Photo"
                                     
                                      onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
                                    />
                             </div>

                             <div class="col-md-7">
                                <p class="spacer-top-bottom"><strong>Name:</strong>  {{auth_user.lastname }} {{auth_user.firstname}} {{auth_user.middlename}} </p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>OHIS Number:</strong> {{auth_user.id_card_number}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Plan Type:</strong> {{auth_user.plan_type}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Facility to Access Care:</strong> {{auth_user.userprovider.agency_name}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Email:</strong> {{auth_user.email}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Virtual Account Number:</strong> {{auth_user.virtual_account}}</p>
                             <hr>
                             
                             <p class="spacer-top-bottom"><strong>TPA/HMO:</strong> {{auth_user.usertpa.organization_name}}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Phone Number:</strong> {{auth_user.phone_number}}</p>
                             <hr>
                            
                             <p class="spacer-top-bottom"><strong>Date of Birth:</strong> {{auth_user.dob | moment("dddd, MMMM Do YYYY") }}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Date of Expiry:</strong> {{auth_user.expiry_date | moment("dddd, MMMM Do YYYY") }}</p>
                             <hr>
                             <p class="spacer-top-bottom"><strong>Gender:</strong> {{auth_user.gender}}</p>
                             <hr>

                             </div>

                              <div class="col-md-12" v-if="auth_user.dependents.length >= 1">
            <h5>
              <i class="fe fe-users"></i
              > <strong>{{auth_user.dependents.length }} Dependents </strong>
            </h5>
            <div class="table-responsive">
              <table class="table align-td-middle table-card">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Full Name</th>
                    <th>Relationship</th>
                    <th>Gender </th>
                    <th>Date of Birth </th>
                    <th>Expiry Date </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dep, index) in auth_user.dependents" v-bind:key="dep.id" >
                    <td> {{index+1}} </td>
                     <td>{{dep.full_name}}  </td>
                    <td>{{dep.relationShipType  }}  </td>
                      <td>{{dep.gender}} </td>
                    <td> {{dep.dob | moment("dddd, MMMM Do YYYY") }}  </td>
                    <td> {{dep.expiry_date | moment("dddd, MMMM Do YYYY") }}  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



                              </div>


                           </div>
                       </div>
                   </div>

                    


               </div>


                                            

           </div>


           <div class="vld-parent">
                <loading :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"></loading>
            </div>

       </section>
     </div>

   </section>
</template>

<script>

  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin
// import { WebCam } from "vue-web-cam";

export default {
  components: {
     Loading
  },
  data(){
    return{
      auth_user:null,
      dependent:"",
     

    }
  },
  mounted(){
    //
  },
  beforeMount(){
   this.user = JSON.parse(localStorage.getItem("user"));
    this.axios
      .get(`/api/v1/user-no-auth/${this.$route.params.id}`)
      .then((response) => {
        this.auth_user = response.data.user;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

  },

  methods:{
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
  },
  created(){
    //
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
.spacer-top-bottom{
  margin-top:7px;
  margin-bottom:7px;
}
#container {
	margin: 0px auto;
	width: 500px;
	height: 375px;
	border: 10px #333 solid;
}
#videoElement {
	width: 500px;
	height: 375px;
	background-color: #666;
}
</style>
