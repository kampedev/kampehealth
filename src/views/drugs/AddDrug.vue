<template>
  <section>

<div class="card m-b-30">
  <div class="card-body">
    <p class="h3 text-center">Add Drug</p>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">Drug Category </label>
            <select class="form-control"  v-model="register.category_id">
             <option v-for="cat in categories" v-bind:key="cat.id" :value="cat.id">{{cat.category_name}}</option>
         </select>
      </div>
      <div class="form-group col-md-6">
        <label for="inputCity">Sub Category</label>
            <select class="form-control"  v-model="register.subcategory_id">
             <option v-for="sub in sub_categories" v-bind:key="sub.id" :value="sub.id">{{sub.sub_category_name}}</option>
         </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group floating-label col-md-6 ">
          <label>Name of Drug</label>
          <input type="text" required class="form-control" placeholder="Drug Name" v-model="register.drug_name">
      </div>
      <div class="form-group floating-label col-md-6 ">
          <label>Dosage Form</label>
          <input type="text" required class="form-control" placeholder="Dosage" v-model="register.dosage">
      </div>
      <div class="form-group floating-label col-md-6">
          <label>Strengths</label>
          <input type="text" required class="form-control" placeholder="Strengths" v-model="register.strengths">
      </div>

        <div class="form-group floating-label col-md-3">
            <label>Presentation</label>
            <input type="email" required class="form-control" placeholder="Presentation" v-model="register.presentation">
        </div>
        <div class="form-group floating-label col-md-3">
            <label>Price</label>
            <input type="text" required class="form-control" placeholder="Price" v-model="register.price">
        </div>
  </div>

    <button @click="submitForm" class="btn btn-info btn-block">Submit Drug <i class="fe fe-send"></i> </button>

    <div class="col-md-12 m-b-30">
        <h5 class="h4"> <i class="fe fe-droplet"></i>{{drugs.length}} Drugs</h5>
        <div class="table-responsive">
           <table class="table align-td-middle table-card">
               <thead>
               <tr>
                   <th>Drug Name</th>
                   <th>Dosage Form</th>
                   <th>Strengths</th>
                   <th>Presentation</th>
                   <th>Price</th>
                   <th>Action</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="drug in drugs.data" v-bind:key="drug.id">
                   <td >{{drug.drug_name}} </td>
                   <td >{{drug.dosage}}</td>
                   <td >{{drug.strengths}}</td>
                   <td>{{drug.presentation}}</td>
                   <td>{{drug.agency_id}} </td>
                   <td>  <i class="mdi mdi-currency-ngn"></i>{{drug.price | numeral('0,0.00')}}</td>
                   <td>
                     <button class="btn btn-outline-info" style="margin-left:10px;" @click="editDrug(drug)"><i class="fe fe-edit"></i> </button>
                     <button class="btn btn-outline-danger" style="margin-left:10px;" @click="deleteDrug(drug)"><i class="fe fe-delete"></i> </button>
                   </td>
               </tr>
               </tbody>
           </table>
           <div class="col-lg-4 offset-lg-4">
             <button  class="btn btn-default btn-lg" @click="gotoPrevious">Previous</button>
             <button class="btn btn-default btn-lg" @click="gotoNext">Next</button>
           </div>
         </div>
    </div>

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
      categories:"",
      sub_categories:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      provider_id:"",
      drugs:"",
      drug_id:"",
      current_page:1,
      register:{
                category_id:"",
                subcategory_id:"",
                drug_name:"",
                dosage:"",
                strengths:"",
                presentation:"",
                price:"",

            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods:{
    deleteDrug(drug){
      if (confirm('Are you sure you want to delete Drug?') ) {
        this.axios.delete(`/api/v1/auth/drugs/${drug.id}`)
                    .then(response => {
                        console.log(response)
                        // this.getDrugs()
                        this.$toasted.success('Deleted Successfully!', {position: 'top-left', duration:5000 })

                    })
                    .catch(error => {
                        console.error(error);
                    })
      }

    },
    editDrug(drug){
      this.register.category_id = drug.category_id
      this.register.subcategory_id = drug.sub_category_id
      this.register.drug_name = drug.drug_name
      this.register.dosage = drug.dosage
      this.register.strengths = drug.strengths
      this.register.presentation = drug.presentation
      this.register.price = drug.price
      this.drug_id = drug.id
      this.edit = true
    },

    getCategories(){
      this.axios.get(`/api/v1/auth/drug_category`)
                  .then(response => {
                      this.categories = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    getSubCategories(){
      this.axios.get(`/api/v1/auth/drug_subcategory`)
                  .then(response => {
                      this.sub_categories = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    submitForm(){
      if (this.edit == false) {
        this.registerDrug()
      }
      else {
        this.updateDrug()
      }
    },
    registerDrug(){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.post('/api/v1/auth/drugs',{
          agency_id : 439078,
          category_id : this.register.category_id,
          sub_category_id : this.register.subcategory_id,
          drug_name : this.register.drug_name,
          dosage : this.register.dosage,
          strengths : this.register.strengths,
          presentation : this.register.presentation,
          price : this.register.price,

        })
        .then(response=>{
            console.log(response);
            this.isLoading = false;
            this.$toasted.success('Added!', {position: 'top-center', duration:2000 })
            this.clearIt()
            this.getDrugs()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Not Successful', {position: 'top-left', duration:5000 })

        })
    },
    updateDrug(){
       console.log(this.drug_id)
        this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoading = true;
        this.axios.put(`/api/v1/auth/drugs/${this.drug_id}`,{
          agency_id : 439078,
          category_id : this.register.category_id,
          sub_category_id : this.register.subcategory_id,
          drug_name : this.register.drug_name,
          dosage : this.register.dosage,
          strengths : this.register.strengths,
          presentation : this.register.presentation,
          price : this.register.price,

        })
        .then(response=>{
            console.log(response);
            this.isLoading = false;
            this.edit = false;
            this.$toasted.success('Updated Successfully!', {position: 'top-center', duration:2000 })
            this.clearIt()
            this.getDrugs()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Not Successful', {position: 'top-left', duration:5000 })

        })
    },
    getDrugs(){
      this.user = JSON.parse(localStorage.getItem('user'))
      // this.axios.get(`/api/v1/auth/drug-agency/439078?page=${this.current_page}`)
      this.axios.get(`/api/v1/auth/drug-agency/439078`)
                  .then(response => {
                      this.drugs = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    gotoNext(){
      if (this.drugs.meta.current_page != this.drugs.meta.last_page) {
            this.current_page ++
            this.getDrugs()
          }
          else {
            this.$toasted.info('You have reached the Last Page', {position: 'top-center', duration:3000 })

          }
    },
    gotoPrevious(){
      if (this.drugs.meta.current_page != 1) {
          this.current_page --
          this.getDrugs()
        }
        else {
          this.$toasted.info('You have reached the First Page', {position: 'top-center', duration:3000 })
        }
    },

    clearIt(){

      this.register.drug_name = "";
      this.register.dosage = "";
      this.register.price = "";
      this.register.presentation = "";
      this.register.strengths = "";
      this.register.category_id = "";
      this.register.subcategory_id = "";

    },

  },
  created(){
    this.getCategories()
    this.getSubCategories()
    this.getDrugs()
  }

}
</script>
