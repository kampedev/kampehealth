<template>
  <div class="sidebar-pinned ">
    <Navbar/>

    <main class="admin-main">
    <!--site header begins-->

   <section class="admin-content">
        <div class="container">

            <div class="row">
                <div class="col-12 m-b-20">
                    <h5 class="spacer-top">Fund Management</h5>
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
                                <p class="text-muted text-overline m-0">Capital</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>901,555</h1>
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
                                        <i class="fe fe-database"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-muted text-overline m-0">ICT</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>28,500</h1>
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
                                <p class="text-muted text-overline m-0">Admin</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>229,200</h1>
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
                                <p class="text-muted text-overline m-0">Reinsurance</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>106,000</h1>
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
                                <p class="text-muted text-overline m-0">Investment</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>171,000</h1>
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
                                <p class="text-muted text-overline m-0">FOS</p>
                                <h1 class="fw-400"> <i class=" mdi mdi-currency-ngn"></i>11,000</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                      <div class="container">
                          <div class="row">
                              <div class="col-md-12">
                                  <div class="card">
                                      <div class="card-body">
                                          <div class="row m-b-20">
                                              <div class="col-md-6 my-auto">
                                                  <h4 class="m-0">Summary</h4>
                                              </div>
                                              <!-- <div class="col-md-6 text-right my-auto">
                                                  <div class="btn-group" role="group" aria-label="Basic example">
                                                      <button type="button" class="btn btn-white shadow-none js-datepicker"><i
                                                                  class="mdi mdi-calendar"></i> Pick Date
                                                      </button>

                                                      <button type="button" class="btn btn-white shadow-none">All</button>
                                                      <button type="button" class="btn btn-white shadow-none">Paid</button>
                                                      <button type="button" class="btn btn-white shadow-none">UnPaid</button>
                                                  </div>
                                              </div> -->
                                          </div>
                                          <div class="row ">
                                              <div class="col-md-12 p-0">

                                                  <div class="table-responsive">
                                                      <table class="table table-hover">
                                                          <thead class="">
                                                          <tr>
                                                              <th scope="col">#</th>
                                                              <th scope="col">Date</th>
                                                              <!-- <th scope="col">Invoice Number</th> -->
                                                              <th scope="col">Recipient</th>
                                                              <th scope="col">Status</th>
                                                              <th scope="col">Amount</th>
                                                              <th scope="col">Action</th>
                                                          </tr>
                                                          </thead>
                                                          <tbody>
                                                          <tr>
                                                              <td class="align-middle">
                                                                  <div class="avatar avatar-xs ">
                                                                      <img class="rounded-circle avatar-img"
                                                                           src="assets/img/logos/stripe.jpg" alt="">
                                                                  </div>
                                                              </td>
                                                              <td class="align-middle">12-Sept-2018</td>
                                                              <!-- <td class="align-middle">#987121</td> -->
                                                              <td class="align-middle">Dove Clinic</td>
                                                              <td class="align-middle"><span class=" text-success"><i
                                                                              class="mdi mdi-check-circle "></i> Paid</span></td>
                                                              <td class="align-middle"><h6 class=" m-0"> <i class=" mdi mdi-currency-ngn"></i>3500</h6></td>
                                                              <td class="align-middle">
                                                                  <div class="input-group ">
                                                                      <div class="input-group-prepend">
                                                                          <a href="invoice-single.html" class="btn btn-white">View
                                                                              Invoice</a>
                                                                          <button type="button"
                                                                                  class="btn btn-white dropdown-toggle dropdown-toggle-split rounded-right"
                                                                                  data-toggle="dropdown" aria-haspopup="true"
                                                                                  aria-expanded="false">
                                                                              <span class="sr-only">Toggle Dropdown</span>
                                                                          </button>
                                                                          <div class="dropdown-menu dropdown-menu-right">
                                                                              <a class="dropdown-item" href="#">Action</a>
                                                                              <a class="dropdown-item" href="#">Another action</a>
                                                                              <a class="dropdown-item" href="#">Something else
                                                                                  here</a>
                                                                              <div role="separator"
                                                                                   class="dropdown-divider"></div>
                                                                              <a class="dropdown-item" href="#">Separated link</a>
                                                                          </div>
                                                                      </div>

                                                                  </div>
                                                              </td>
                                                          </tr>

                                                          <tr>
                                                              <td class="align-middle">
                                                                  <div class="avatar avatar-xs ">
                                                                      <img class="rounded-circle avatar-img"
                                                                           src="assets/img/logos/mailchimp.jpg" alt="">
                                                                  </div>
                                                              </td>
                                                              <td class="align-middle">13-Aug-2018</td>
                                                              <!-- <td class="align-middle">#987123</td> -->
                                                              <td class="align-middle">Hayok Health Clinic</td>
                                                              <td class="align-middle"><span class=" text-danger"><i
                                                                              class="mdi mdi-close-circle "></i> Un-Paid</span>
                                                              </td>
                                                              <td class="align-middle"><h6 class=" m-0">$6500</h6></td>
                                                              <td class="align-middle">
                                                                  <div class="input-group ">
                                                                      <div class="input-group-prepend">
                                                                          <a href="invoice-single.html" class="btn btn-white">View
                                                                              Invoice</a>
                                                                          <button type="button"
                                                                                  class="btn btn-white dropdown-toggle dropdown-toggle-split rounded-right"
                                                                                  data-toggle="dropdown" aria-haspopup="true"
                                                                                  aria-expanded="false">
                                                                              <span class="sr-only">Toggle Dropdown</span>
                                                                          </button>
                                                                          <div class="dropdown-menu dropdown-menu-right">
                                                                              <a class="dropdown-item" href="#">Action</a>
                                                                              <a class="dropdown-item" href="#">Another action</a>
                                                                              <a class="dropdown-item" href="#">Something else
                                                                                  here</a>
                                                                              <div role="separator"
                                                                                   class="dropdown-divider"></div>
                                                                              <a class="dropdown-item" href="#">Separated link</a>
                                                                          </div>
                                                                      </div>

                                                                  </div>
                                                              </td>
                                                          </tr>


                                                          <tr>
                                                              <td class="align-middle">
                                                                  <div class="avatar avatar-xs ">
                                                                      <img class="rounded-circle avatar-img"
                                                                           src="assets/img/logos/tinder.jpg" alt="">
                                                                  </div>
                                                              </td>
                                                              <td class="align-middle">19-Jan-2019</td>
                                                              <!-- <td class="align-middle">#987118</td> -->
                                                              <td class="align-middle">General Hospital Abuja</td>
                                                              <td class="align-middle"><span class=" text-dark"><i
                                                                              class="mdi mdi-watch "></i> Scheduled</span></td>
                                                              <td class="align-middle"><h6 class=" m-0">$5800</h6></td>
                                                              <td class="align-middle">
                                                                  <div class="input-group ">
                                                                      <div class="input-group-prepend">
                                                                          <a href="invoice-single.html" class="btn btn-white">View
                                                                              Invoice</a>
                                                                          <button type="button"
                                                                                  class="btn btn-white dropdown-toggle dropdown-toggle-split rounded-right"
                                                                                  data-toggle="dropdown" aria-haspopup="true"
                                                                                  aria-expanded="false">
                                                                              <span class="sr-only">Toggle Dropdown</span>
                                                                          </button>
                                                                          <div class="dropdown-menu dropdown-menu-right">
                                                                              <a class="dropdown-item" href="#">Action</a>
                                                                              <a class="dropdown-item" href="#">Another action</a>
                                                                              <a class="dropdown-item" href="#">Something else
                                                                                  here</a>
                                                                              <div role="separator"
                                                                                   class="dropdown-divider"></div>
                                                                              <a class="dropdown-item" href="#">Separated link</a>
                                                                          </div>
                                                                      </div>

                                                                  </div>
                                                              </td>
                                                          </tr>



                                                          </tbody>
                                                      </table>
                                                  </div>

                                              </div>
                                              <div class="col-auto ml-auto">
                                                  <div>
                                                      <nav class="">
                                                          <ul class="pagination">
                                                              <li class="page-item disabled">
                                                                  <a class="page-link" href="#" tabindex="-1">Previous</a>
                                                              </li>
                                                              <li class="page-item active"><a class="page-link" href="#">1</a>
                                                              </li>
                                                              <li class="page-item ">
                                                                  <a class="page-link" href="#">2 <span
                                                                              class="sr-only">(current)</span></a>
                                                              </li>
                                                              <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                              <li class="page-item">
                                                                  <a class="page-link" href="#">Next</a>
                                                              </li>
                                                          </ul>
                                                      </nav>
                                                  </div>
                                              </div>
                                          </div>


                                      </div>
                                  </div>
                              </div>
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

  },
  beforeMount(){

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
