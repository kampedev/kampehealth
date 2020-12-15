<template>
<div class="card m-b-30">
  <div class="card-body">

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">Drug Sub Category </label>

        <label>Select Category {{categories}}</label>
            <select class="form-control"  v-model="category_id">
             <option v-for="category in categories" v-bind:key="category.id" :value="category.id">{{category.category_name}}</option>
         </select>
      </div>

    </div>

    <div class="form-row">
      <div class="form-group floating-label col-md-6">
          <label>Drug Sub Category</label>
          <input type="text" required class="form-control" placeholder="Drug Sub Category" v-model="sub_category_name">
      </div>
  </div>

    <button @click="addSubcategory" class="btn btn-primary btn-block btn-lg">Add Sub Category</button>
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
      categories:"",
      category_id:"",
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
                    this.categories = response.data
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
                      this.drug_categories = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addSubcategory(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/registerProvider',{
          category_id : this.category_id,
          sub_category_name : this.sub_category_name,

        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$toasted.error('Added Successfully!', {position: 'top-left', duration:5000 })

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
  }

}
</script>
