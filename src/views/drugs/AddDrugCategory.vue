<template>
<div class="card m-b-30">

  <div class="card-body">
    <p class="h3 text-center">Add Drug Category</p>


    <div class="form-row">
      <div class="form-group floating-label col-md-8">
          <label>Name of Category</label>
          <input type="text" required class="form-control" placeholder="Drug Category" v-model="category_name">
      </div>


  </div>

    <button @click="addCategory" class="btn btn-primary btn-block btn-lg">Add Category</button>
    <div class="vld-parent">
         <loading :active.sync="isLoading"
         loader="dots"
         :can-cancel="true"
         :is-full-page="fullPage"></loading>
     </div>

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
      category_name:"",
      drug_categories:"",
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,

    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/drug_category`)
                .then(response => {
                    this.drug_categories = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

    getCategories(){
      this.axios.get(`/api/v1/auth/drug_category`)
                  .then(response => {
                      this.drug_categories = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addCategory(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/drug_category',{
          category_name : this.category_name,

        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$toasted.success('Added Successfully! ', {position: 'top-left', duration:5000 })

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Error adding! ', {position: 'top-left', duration:5000 })

        })
    },

    clearIt(){
      this.category_name = "";
    },

  },
  created(){
    this.getCategories()
  }

}
</script>
