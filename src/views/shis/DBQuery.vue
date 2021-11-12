<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="bg-dark m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-md-6 text-center mx-auto text-white p-b-30">
              <h3 class="h3">Admin DB Query</h3>

              <div class="form-dark">
                <div class="input-group input-group-flush mb-3"></div>
                <button
                  type="button"
                  class="btn btn-outline-info"
                  name="button"
                  @click="getClients"
                >
                  <i class="fe fe-refresh-cw"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchUser />
        <div class="container">
         <button class="btn btn-outline-info spacer"  @click="firstshow = true">Add First Param</button>
         <button class="btn btn-outline-info spacer"  @click="secondshow = true">Add second Param</button>
         <button class="btn btn-outline-info spacer"  @click="thirdshow = true">Add Third Param</button>
         <a href="/duplicate-id-card"> 
         <button class="btn btn-outline-dark spacer"  >DB Filter</button>
         </a>
         <a href="/duplicate"> 
         <button class="btn btn-outline-dark spacer"  >Duplicate Principal</button>
         </a>
         <a href="/duplicate-dependent"> 
         <button class="btn btn-outline-dark spacer"  >Duplicate Dependent</button>
         </a>

        </div>
      <div class="card m-b-30 container">
        <div class="card-body">
            <div class="row">

                <div class="col-md-1">
                     <label for="inputCity"
                ><i class="fe fe-map-pin"></i>Per Row</label
              >
              <select class="form-control" v-model="paginate">
                <option value="20" selected>20</option>
                <option value="50" >50</option>
                <option value="100" >100</option>
                <option value="200" >200</option>
                <option value="500" >500</option>
              </select>

                </div>
            </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="inputCity"
                ><i class="fe fe-table"></i> Select Table: {{ table }}
              </label>
              <select
                class="form-control"
                v-model="table"
                @change="getColumns($event)"
              >
                <option v-for="table in tables" v-bind:key="table.id">
                  {{ table.Tables_in_hip }}
                </option>
              </select>
            </div>

            <div class="form-group col-md-3">
              <label for="inputCity"
                ><i class="fe fe-hash"></i>Order By</label
              >
              <select class="form-control" v-model="order_by">
                <option v-for="col in columns" v-bind:key="col" :value="col">
                  {{ col }}
                </option>
              </select>
            </div>

            <div class="form-group col-md-3">
              <label for="inputCity"
                > <i class="fe fe-arrow-up"></i><i class="fe fe-arrow-down"></i>Order By Type; {{order_by_type}} </label
              >
              <select class="form-control" v-model="order_by_type">
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
      </div>


            <div class="row" v-show="firstshow">
                <div class="col-md-12">
                    <p class="h4">First Column Params</p>
                </div>
              <div class="form-group col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i> Where Column 1</label
                >
                <select class="form-control" v-model="first_db_column">
                  <option v-for="col in columns" v-bind:key="col" :value="col">
                    {{ col }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i>Query Operator</label
                >
                <select class="form-control" v-model="first_query_operator">
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value="!=">!=</option>
                  <option value=">">Greater than (>)</option>
                  <option value="<">Less than</option>
                  <option value=">=">Greater than or Equals (>=)</option>
                  <option value="<=">Less than or Equals</option>
                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="inputEmail4">Column 1 Param</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="first_param"
                  placeholder="Put Param Here"
                />
              </div>
            </div>

             <div class="row"  v-show="secondshow">
                 <div class="col-md-12">
                    <p class="h4">Second Column Params</p>
                </div>
              <div class="form-group col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i> Where Column 2</label
                >
                <select class="form-control" v-model="second_db_column">
                  <option v-for="col in columns" v-bind:key="col" :value="col">
                    {{ col }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i>Query Operator</label
                >
                <select class="form-control" v-model="second_query_operator">
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value="!=">!=</option>
                  <option value=">">Greater than (>)</option>
                  <option value="<">Less than</option>
                  <option value=">=">Greater than or Equals (>=)</option>
                  <option value="<=">Less than or Equals</option>
                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="inputEmail4">Column 2 Param</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="second_param"
                  placeholder="Put Param Here"
                />
              </div>
            </div>

             <div class="row"  v-show="thirdshow">
                 <div class="col-md-12">
                    <p class="h4">Third Column Params</p>
                </div>
              <div class="form-group col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i> Where Column 3</label
                >
                <select class="form-control" v-model="third_db_column">
                  <option v-for="col in columns" v-bind:key="col" :value="col">
                    {{ col }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="inputCity"
                  ><i class="fe fe-map-pin"></i>Query Operator</label
                >
                <select class="form-control" v-model="third_query_operator">
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value="!=">!=</option>
                  <option value=">">Greater than (>)</option>
                  <option value="<">Less than</option>
                  <option value=">=">Greater than or Equals (>=)</option>
                  <option value="<=">Less than or Equals</option>
                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="inputEmail4">Column 3 Param</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="third_param"
                  placeholder="Put Param Here"
                />
              </div>
            </div>




          <button
            @click="getClients"
            class="btn btn-primary btn-block btn-lg"
            style="margin-top: 20px"
          >
            <i class="fe fe-filter"></i>
          </button>
          <button
            @click="clearFilter"
            class="btn btn-default btn-block btn-lg"
            style="margin-top: 20px"
          >
            <i class="fe fe-x-circle"></i>
          </button>
          <br />
        </div>
      </div>
      <section class="">
        <div class="container">
            <div class="text-center">
                <button class="btn btn-outline-primary" @click="getPrev"><i class="fe fe-rewind"></i> </button>
                <button class="btn btn-outline-primary" @click="getNext"><i class="fe fe-skip-forward"></i> </button>

            </div>
          <div class="row list">
            <div class="col-lg-12 col-md-12">

                
              <div class="">
                <div class="">
                  
                  <p class="h4">
                    Total Records:
                    <span class="text-primary">{{ clients.total | numeral(0, 0) }} Current Page: {{currentPage}} </span>
                  </p>

                   <div class="col-md-12">
                    <b-table striped hover :items="clients.data"></b-table>
                </div>

                  

                </div>
              </div>
            </div>

            <div class="vld-parent">
              <loading
                :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"
              ></loading>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import SearchUser from "@/views/shis/components/SearchUser.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Navbar,
    Loading,
    SearchUser,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      firstshow: false,
      secondshow: false,
      thirdshow: false,

      clients: "",
      tables: "",
      columns: "",

      table: "",
      order_by: "created_at",
      order_by_type: "desc",
      first_query_operator: "=",
      second_query_operator: "",
      third_query_operator: "",
      first_param: "",
      first_db_column: "",

      second_param: "",
      second_db_column: "",
       
       third_param: "",
      third_db_column: "",

      
      date: "",
      from: "",
      to: "",
      currentPage: 1,
      paginate: 20,
      arrayone:[
        {id:1, name: "blue", stat:"0"},
        {id:2, name: "blue", stat:"0"},
        {id:3, name: "blue", stat:"0"}
      ],
       arraytwo:[
        {id:1, name: "blue", stat:"0"},
        {id:2, name: "blue", stat:"0"},
        // {id:3, name: "blue", stat:"0"}
      ]
     
    };
  },
  beforeMount() {

    this.axios
      .get(`/api/v1/auth/db-tables`)
      .then((response) => {
        this.tables = response.data;
        console.log(response);
      

      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    clearFilter() {
      this.columns = "";
      this.first_param = "";
      this.first_db_column = "";
      this.second_param = "";
      this.second_db_column = "";
      this.third_param = "";
      this.third_db_column = "";
    },
    getColumns() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/table-columns/${this.table}`)
        .then((response) => {
          this.columns = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
   
    getClients() {
      this.isLoading = true;

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/db-query?page=${this.currentPage}`, {
            table: this.table ,
            first_db_column: this.first_db_column,
            first_param: this.first_param,
            query_order: this.query_order,
            first_query_operator: this.first_query_operator,
            second_query_operator: this.second_query_operator,
            third_query_operator: this.third_query_operator,
            second_param: this.second_param,
            second_db_column: this.second_db_column,
            third_param: this.third_param,
            third_db_column: this.third_db_column,
            order_by_type: this.order_by_type,
            order_by: this.order_by,
            paginate: this.paginate,
            
          
        })
        .then((response) => {
          this.clients = response.data;
          console.log(response);
        //   this.rows = response.data.meta.total;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;

          console.error(error);
        });
    },
    getPrev()
    {
        this.currentPage --
        this.getClients()
    },
    getNext()
    {
        this.currentPage ++
        this.getClients()
    }

  },
  created() {
   //
  },
};
</script>
