<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-info sm-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">
                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3> </h3>
                       <h3 class="h3">Service Manager</h3>
                   </div>
               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

               <div class="row list">

                   <div class="row col-md-6 offset-md-3">
                     <!-- <div class="col-md-2"> -->
                         <button class="btn btn-default btn-lg spacer" @click="showService = !showService">Add Services</button>
                     <!-- </div> -->
                     <!-- <div class="col-md-2"> -->
                         <button class="btn btn-default btn-lg spacer" @click="showCategory = !showCategory">Add Service Categories</button>
                     <!-- </div> -->
                   </div>

                   <div class="col-md-12" v-show="showService">
                     <AddService/>
                   </div>
                   <div class="col-md-12" v-show="showCategory">
                     <AddServiceCategory/>
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
    </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  import AddService from '@/views/drugs/AddService.vue'
  import AddServiceCategory from '@/views/drugs/AddServiceCategory.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, AddService, AddServiceCategory
  },
  data(){
    return{
      user:null,
      providers:"",
      agencies:"",
      edit:false,
      showService:true,
      showCategory:false,
      isLoading: false,
      fullPage: true,
      services:"",

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{
    //
  },
  created(){
    //
  }

}
</script>
<style scoped>
  .spacer{
    margin-left:5px;
    margin-bottom:10px;
  }
</style>
