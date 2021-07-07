<template>
<div class="card m-b-30">
  <div class="card-body">
    <h3 class="h3">Drug Sub Category </h3>

    <div class="row">
      <div class="form-group col-md-8">
        <label>Select Category</label>
            <select class="form-control"  v-model="category_id">
             <option v-for="category in categories" v-bind:key="category.id" :value="category.id">{{category.category_name}}</option>
         </select>
      </div>

      <div class="form-group floating-label col-md-8">
          <label>Drug Sub Category</label>
          <input type="text" required class="form-control" placeholder="Drug Sub Category" v-model="sub_category_name">
      </div>
  </div>

    <button @click="addSubcategory" class="btn btn-primary btn-block btn-lg">Add Sub Category</button>



  </div>
  <div class="row col-md-4">
    <ol>
      <li class="h5" v-for="cat in sub_categories" v-bind:key="cat.id">{{cat.sub_category_name}}
        <button class="btn btn-danger" @click="deleteCategory(cat)"><i class="fe fe-delete"></i> </button>
      </li>
    </ol>
  </div>

  <div class="vld-parent">
       <loading :active.sync="isLoading"
       loader="dots"
       :can-cancel="true"
       :is-full-page="fullPage"></loading>
   </div>
</div>
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
      category_id:"",
      sub_categories:"",
      sub_category_name:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      states:"",

    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/drug_category`)
                .then(response => {
                    this.categories = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    deleteCategory(cat){
      if (confirm('Are you sure you want to delete Category?') ) {
        this.axios.delete(`/api/v1/auth/drug_subcategory/${cat.id}`)
                    .then(response => {
                        console.log(response)
                        this.getSubCategories()
                        this.$toasted.success('Deleted Successfully!', {position: 'top-left', duration:5000 })

                    })
                    .catch(error => {
                        console.error(error);
                    })
      }

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

    addSubcategory(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/drug_subcategory',{
          category_id : this.category_id,
          sub_category_name : this.sub_category_name,

        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$toasted.success('Added Successfully!', {position: 'top-left', duration:5000 })
            this.clearIt()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Not Successful!', {position: 'top-left', duration:5000 })

        })
    },


    clearIt(){
      this.category_id = "";
      this.sub_category_name = "";
    },

  },
  created(){
    this.getCategories()
    this.getSubCategories()
  }

}
</script>

<style scoped>
  .spacer-input{
    margin-top:15px;
  }
</style>
