<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-success m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-12  mx-auto text-white p-b-30">

                     <div class="text-center">
                       <h3 class="h3 text-dark">Drugs Manager</h3>
                     </div>

                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

             <div class="row col-md-12 col-md-6 offset-md-3">
                   <button class="btn btn-default btn-lg spacer" @click="showDrug = !showDrug">Add Drug</button>
                   <button class="btn btn-default btn-lg spacer" @click="showCategory = !showCategory">Add Drug Category</button>
                   <button class="btn btn-default btn-lg spacer" @click="showSubCategory = !showSubCategory">Add Sub Category</button>
             </div>

               <div class="row ">


                   <div class="col-md-12" v-show="showDrug">
                     <AddDrug/>
                   </div>
                   <div class="col-md-12" v-show="showCategory">
                     <AddDrugCategory/>
                   </div>

                   <div class="col-md-12" v-show="showSubCategory">
                     <AddSubCategory/>
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
  import AddDrug from '@/views/drugs/AddDrug.vue'
  import AddDrugCategory from '@/views/drugs/AddDrugCategory.vue'
  import AddSubCategory from '@/views/drugs/AddSubCategory.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading, AddDrug, AddDrugCategory, AddSubCategory
  },
  data(){
    return{
      user:null,
      drugs:"",
      edit:false,
      showDrug:true,
      showCategory:false,
      showSubCategory:false,
      isLoading: false,
      fullPage: true,

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/drugs`)
                .then(response => {
                    this.drugs = response.data
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
