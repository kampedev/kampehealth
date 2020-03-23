<template>
  <body class="jumbo-page  gradient-01">

<main class="admin-main">

    <section class="admin-content">

        <div class="container  ">
            <div class="row m-h-100 align-items-center justify-content-center">
                <div class="col-lg-6 col-md-10 p-t-80">
                    <div class="card shadow-lg">
                        <div class=" p-all-25">
                            <div class="pull-up-sm text-center p-b-30">
                                <div class="avatar avatar avatar-lg">
                                    <img src="assets/img/logo.svg" alt="">
                                </div>
                            </div>
                            <form id="commentForm" method="get" action="forms-wizard.html" class="form-horizontal">
                                <div id="rootwizard">

                                    <ul class="nav nav-pills nav-justified">
                                        <li class="nav-item"><a class="nav-link" href="#tab1" data-toggle="tab">Select HMO</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#tab2" data-toggle="tab">Select
                                                Plans</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#tab3" data-toggle="tab">
                                                Make Payment</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane p-t-20 p-b-20" id="tab1">

                                            <h3>
                                                <span class="align-middle">Welcome Fella,</span></h3>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" placeholder="Enter email">
                                                <small id="emailHelp" class="form-text text-muted">We'll never
                                                    share your email with anyone else.
                                                </small>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" class="form-control"
                                                       id="exampleInputPassword1"  >
                                            </div>

                                            <div class="custom-control custom-checkbox">
                                                <input checked type="checkbox" class="custom-control-input"
                                                       id="customCheck1">
                                                <label class="custom-control-label" for="customCheck1">Agree to
                                                    the terms and conditions.</label>
                                            </div>

                                        </div>
                                        <div class="tab-pane p-t-20 p-b-20" id="tab2">
                                            <div class="option-box">
                                                <input id="radio-new1" name="bigradios" type="radio">
                                                <label for="radio-new1">
                                                    <span class="radio-content">
                                                        <span class="h6 d-block">Starter Plan <span class="badge-soft-primary badge">$12 MONTH</span>
                                                        </span>
                                                        <span class="text-muted m-b-41">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit. Accusantium blanditiis ducimus ipsa provident
                                                            quae quaerat similique? Consequatur consequuntur
                                                            cum, inventore nihil porro quis. Ad assumenda
                                                            eligendi illum impedit quis totam.
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div class="option-box">
                                                <input id="radio-new2" name="bigradios" type="radio">
                                                <label for="radio-new2">
                                                    <span class="radio-content">
                                                        <span class="h6 d-block">Pro Plan <span class="badge-soft-info badge">$49 MONTH</span>
                                                        </span>

                                                        <span class="text-muted m-b-41">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit. Accusantium blanditiis ducimus ipsa provident
                                                            quae quaerat similique? Consequatur consequuntur
                                                            cum, inventore nihil porro quis. Ad assumenda
                                                            eligendi illum impedit quis totam.
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>

                                        </div>
                                        <div class="tab-pane p-t-20 p-b-20" id="tab3">
                                            <div class="row">
                                                <div class="col m-b-30">
                                                    <div class="option-box-column">
                                                        <input id="radio-column-1" name="column-radio"
                                                               type="radio">
                                                        <label for="radio-column-1">
                                                            <span class="radio-content ">
                                                                <span class="p-all-15 d-block">
                                                                    <span class="m-b-20">
                                                                        <img src="assets/img/cake.png" alt="">
                                                                    </span>
                                                                    <span class="list-group">
                                                                        <span class="list-group-item">2 Cups of
                                                                            Icecream Daily
                                                                        </span>
                                                                        <span class="list-group-item">1 Surprise
                                                                            Cake
                                                                        </span>

                                                                    </span>
                                                                </span>

                                                                <span class="radio-highlight d-block">
                                                                    Cup Cakes
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col m-b-30">
                                                    <div class="option-box-column">
                                                        <input id="radio-column-2" name="column-radio"
                                                               type="radio">
                                                        <label for="radio-column-2">
                                                            <span class="radio-content ">
                                                                <span class="p-all-15 d-block">
                                                                    <span class="m-b-20">
                                                                        <img src="assets/img/iceccream-bowl.png"
                                                                             alt="">
                                                                    </span>
                                                                    <span class="list-group">
                                                                        <span class="list-group-item">1 Cups of
                                                                            Icecream Daily
                                                                        </span>
                                                                        <span class="list-group-item">5 Surprise
                                                                            Cakes
                                                                        </span>

                                                                    </span>
                                                                </span>

                                                                <span class="radio-highlight d-block">
                                                                    Ice Cream
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <ul class="nav nav-pills justify-content-between wizard m-b-30">
                                            <li class=" nav-item next"><a class="nav-link btn-success"
                                                                          href="#!">Proceed</a></li>


                                        </ul>
                                    </div>
                                </div>
                            </form>
                            <p class="text-center">
                                <a href="index.html" class="text-underline">Back to Dashboard</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </section>
</main>
  </body>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  beforeMount(){

  },
  methods:{

  },
  created(){

  }

}
</script>
