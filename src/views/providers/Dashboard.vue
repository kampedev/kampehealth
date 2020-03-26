<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">{{auth_user.agency_name}}</h5>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Revenue</p>
                                <h1 class="fw-400">&#8358;1,500</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-users"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">Clients</p>
                                <h1 class="fw-400">5,200</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="pb-2">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-title bg-soft-primary rounded-circle">
                                        <i class="fe fe-credit-card"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">HMO</p>
                                <h1 class="fw-400">5</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12 p-t-20">
                    <h1 class="fw-300">Analytics</h1>
                </div>
                <div class="col-12 m-t-20">
                    <h5> <i class="fe fe-activity"></i> Overview</h5>
                </div>
                <div class="col-md-12">
                    <div class="card m-b-30">
                      <div class="card-body">
                          <div class="apexcharts-canvas" id="chart-06"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i> Employees</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>

                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>

                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-2.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>

                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-3.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Ashton Cox</td>
                                <td>Junior Technical Author</td>

                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-5.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>

                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-6.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>

                                <td>2012/12/02</td>
                                <td>$372,000</td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i> HMOs</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-2.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>

                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-3.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Ashton Cox</td>
                                <td>Junior Technical Author</td>

                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-5.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>

                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-6.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>

                                <td>2012/12/02</td>
                                <td>$372,000</td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-users"></i> Clients</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>

                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>

                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-2.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>

                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-3.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Ashton Cox</td>
                                <td>Junior Technical Author</td>

                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-5.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>

                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-6.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>

                                <td>2012/12/02</td>
                                <td>$372,000</td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="col-md-6 m-b-30">
                    <h5> <i class="fe fe-alert-circle"></i> Claims</h5>
                    <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-1.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-2.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>

                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-3.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Ashton Cox</td>
                                <td>Junior Technical Author</td>

                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-5.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>

                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="avatar avatar-sm "><img src="assets/img/users/user-6.jpg"
                                                                        class="avatar-img avatar-sm rounded-circle"
                                                                        alt=""></div>
                                </td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>

                                <td>2012/12/02</td>
                                <td>$372,000</td>
                            </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>

    </section>
</main>


    </div>

</template>

<script>
import Navbar from '@/views/Navbar.vue'

export default {
  components: {
     Navbar
  },
  data(){
    return{
      user:null,
      auth_user:""
    }
  },
  beforeMount(){
    this.axios.get(`/api/v1/auth/user`)
                .then(response => {
                    this.auth_user = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{

  },
  created(){

  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
