<template>
<section>
<div class="card m-b-30">
  <div class="card-body">
    <p class="h3 text-center">Add Service Category</p>

    <div class="row col-md-12">
      <div class="form-group floating-label col-md-12">
          <label>Name of Category</label>
          <input type="text" required class="form-control" placeholder="Category Name" v-model="register.category_name">
      </div>
      <div class="form-group col-md-12">
        <label for="inputCity">Laboratory Test?</label>
            <select class="form-control"  v-model="register.is_laboratory_test">
             <option :value="option_true" >Yes</option>
             <option :value="option_false" selected>No</option>
         </select>
      </div>
  </div>


    <button @click="registerCat" class="btn btn-primary btn-block btn-lg">Add Category</button>
    <div class="vld-parent">
         <loading :active.sync="isLoading"
         loader="dots"
         :can-cancel="true"
         :is-full-page="fullPage"></loading>
     </div>

  </div>
</div>

<div class="row col-md-4">
  <ol>
    <li class="h5" v-for="cat in categories" v-bind:key="cat.id">{{cat.category_name}}
      <span><button @click="deleteCat(cat)" class="btn m-b-15 ml-2 mr-2 badge badge-soft-danger"> <i class="fe fe-delete"></i> </button></span>
     </li>
  </ol>
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
      option_true:true,
      option_false:false,
      edit:false,
      show:false,
      isLoading: false,
      fullPage: true,
      categories:"",
      register:{
                category_name:"",
                is_laboratory_test:"",
            }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/service_category`)
                .then(response => {
                    this.categories = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
    deleteCat(cat){
      if (confirm('Are you sure you want to delete Category?') ) {
        this.axios.delete(`/api/v1/auth/service_category/${cat.id}`)
                    .then(response => {
                        console.log(response)
                        this.getCategories()
                        this.$toasted.success('Deleted Successfully!', {position: 'top-left', duration:5000 })

                    })
                    .catch(error => {
                        console.error(error);
                    })
      }

    },

    getCategories(){
      this.axios.get(`/api/v1/auth/service_category`)
                  .then(response => {
                      this.categories = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    registerCat(){
        this.isLoading = true;
        this.axios.post('/api/v1/auth/service_category',{
          category_name : this.register.category_name,
          is_laboratory_test : this.register.is_laboratory_test,
          // agency_id : this.user.id
        })
        .then(response=>{

            console.log(response);
            this.isLoading = false;
            this.$toasted.success('Added!', {position: 'top-left', duration:5000 })
            this.getCategories()
            this.$emit('getCategories')
            this.clearIt()

        })
        .catch(error=>{
            console.log(error.response)
            this.isLoading = false;
            this.$toasted.error('Not added', {position: 'top-left', duration:5000 })

        })
    },

    clearIt(){
      this.register.category_name = "";
      this.register.is_laboratory_test = "";
    },

  },
  created(){
//
  }

}
</script>
