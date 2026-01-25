<template>
    <section class="admin-content" id="contact-search">
        <Navbar />
        <main class="admin-main">
            <div>
                <div class="bg-info m-b-30">
                    <div class="container">
                        <div class="row p-b-60 p-t-60">
                            <div class="col-md-6 text-center mx-auto text-white p-b-30">
                                <div class="m-b-10">
                                    <div class="avatar"></div>
                                </div>
                                <h3 class="h5">{{ organization.name }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="pull-up">
                    <div class="container">
                        <div class="row list">
                            <div class="col-lg-12 col-md-12">
                                <div class="card m-b-30">
                                    <div class="card-header"></div>

                                    <div class="card-body">
                                        <div class="form-group">
                                            <button class="btn btn-outline-info" @click="acceptorganization(1)"
                                                v-if="organization.status == false">
                                                Approve
                                            </button>
                                            <button class="btn btn-outline-danger" @click="acceptorganization(0)"
                                                v-if="organization.status == true">
                                                Disapprove
                                            </button>
                                            <router-link
                                                :to="{ path: '/organization/add-employee/' + organization.id }">
                                                <button class="btn btn-outline-info spacer">
                                                    Manage Personnel
                                                </button>
                                            </router-link>

                                            <button class="btn btn-outline-info m-2" data-toggle="modal"
                                                data-target="#slideRightModalAll">
                                                Add Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <router-link :to="{ path: '/view-clients-organization' }">
                                                <div class="avatar avatar-lg">
                                                    <div class="avatar-title bg-soft-info rounded-circle">
                                                        <i class="mdi mdi-account-group"></i>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">
                                                Total Enrollees
                                            </p>
                                            <h1 class="fw-400">
                                                {{ dashboarddata.enrollees | numeral("0,0") }}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <div class="avatar avatar-lg">
                                                <div class="avatar-title bg-soft-info rounded-circle">
                                                    <i class="mdi mdi-folder-multiple"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">Encounters</p>
                                            <h1 class="fw-400">
                                                {{ dashboarddata.encounters | numeral("0,0") }}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <router-link :to="{ path: '/all-claims' }">
                                                <div class="avatar avatar-lg">
                                                    <div class="avatar-title bg-soft-info rounded-circle">
                                                        <i class="fe fe-credit-card"></i>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">Transactions</p>
                                            <h1 class="fw-400">
                                                {{ transactions.total
                                                | numeral("0,0") }}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <div class="avatar avatar-lg">
                                                <div class="avatar-title bg-soft-info rounded-circle">
                                                    <i class="mdi mdi-folder-multiple"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">
                                                Total Utilization Rate
                                            </p>
                                            <h1 class="fw-400">
                                                {{
                                                dashboarddata.encounter_rate_total
                                                | numeral("0,0.00")
                                                }}%
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <div class="avatar avatar-lg">
                                                <div class="avatar-title bg-soft-info rounded-circle">
                                                    <i class="mdi mdi-folder-multiple"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">
                                                Utilization Rate (Current Month)
                                            </p>
                                            <h1 class="fw-400">
                                                {{
                                                dashboarddata.encounter_rate_current_month
                                                | numeral("0,0.00")
                                                }}%
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-3">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                        <div class="pb-2">
                                            <div class="avatar avatar-lg">
                                                <div class="avatar-title bg-soft-info rounded-circle">
                                                    <i class="mdi mdi-bank-transfer-out"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-muted text-overline m-0">
                                                Referral Rate (Current Month)
                                            </p>
                                            <h1 class="fw-400">
                                                {{
                                                dashboarddata.referral_rate_current_month
                                                | numeral("0,0.00")
                                                }}%
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card m-b-30">
                                    <div class="card-header">
                                        <h4 class="h4"> Enrollees</h4>
                                    </div>

                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table align-td-middle table-card">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>ID</th>
                                                        <th>Contact</th>
                                                        <th>Plan</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="enrollee in organizationclients.data"
                                                        v-bind:key="enrollee.id">
                                                        <td>
                                                            <router-link :to="{ path: '/client/' + enrollee.id }">
                                                                {{ enrollee.full_name }} </router-link>
                                                        </td>
                                                        <td>{{ enrollee.id_card_number }}</td>
                                                        <td>{{ enrollee.phone_number }}</td>
                                                        <td>{{ enrollee.plan }}</td>

                                                        <td>
                                                            <router-link :to="{ path: '/client/' + enrollee.id }">
                                                                <button type="button" name="button"
                                                                    class="btn btn-outline-info">
                                                                    <i class="fe fe-eye"></i>
                                                                </button>
                                                            </router-link>

                                                            <!-- <button class="btn btn-dark" @click="editUser(enrollee)">change</button> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class=" col-md-6">
                                <div class="card m-b-30">
                                    <div class="card-header">
                                        <strong class="h4">Transactions</strong>
                                    </div>

                                    <div class="card-body">

                                        <div class="table-responsive">
                                            <table class="table align-td-middle table-card">
                                                <thead>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <th>Enrollees</th>
                                                        <th>Notes</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="trx in transactions.data" v-bind:key="trx.id">
                                                        <td> <i class="mdi mdi-currency-ngn"></i> {{ trx.amount |
                                                            numeral("0,0") }} </td>
                                                        <td>{{ trx.users.length }}</td>
                                                        <td>{{ trx.description }}</td>
                                                        <td>{{ trx.created_at }}</td>


                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Modal -->
                        <div class="modal fade modal-slide-right" id="slideRightModalAll" tabindex="-1" role="dialog"
                            aria-labelledby="slideRightModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content" id="printDiv" ref="printNow">
                                    <div class="modal-header">
                                        <p class="modal-title" id="slideRightModalLabel">
                                            <span class="h5">Payment Details</span>

                                        </p>

                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <div class="">
                                            <form @submit.prevent="addTransaction">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label for="inputCity">Select Enrollees
                                                        </label>
                                                        <select class="form-control"
                                                            @change="getOrganizationClients(organization)"
                                                            v-model="transaction.enabled_user">

                                                            <option value=""> All</option>
                                                            <option value="1">Active</option>
                                                            <option :value="false">Inactive</option>


                                                        </select>
                                                    </div>
                                                </div>



                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label for="inputCity">Select Plan
                                                            <span class="text-danger">*</span></label>
                                                        <select class="form-control" required
                                                            v-model="transaction.sector">
                                                            <option :value="plan.cost" v-for="plan in plans"
                                                                :key="plan.id">
                                                                {{ plan.title }}
                                                                -
                                                                {{ plan.cost | numeral(0, 0) }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div class="form-group col-md-12">
                                                    <label for="inputEmail4">Qty <span
                                                            class="text-danger">*</span></label>
                                                    <input type="number" class="form-control" required disabled
                                                        :value="organizationclients.meta.total" placeholder="Amount" />
                                                    <p class="text-sm"> total enrollees under the organization</p>
                                                </div>



                                                <div class="form-group col-md-12">
                                                    <label for="inputEmail4">Amount <span
                                                            class="text-danger">*</span></label>
                                                    <input type="number" class="form-control" required disabled
                                                        :value="transaction.sector * organizationclients.meta.total"
                                                        placeholder="Amount" />
                                                </div>


                                                <div class="form-group col-md-12">
                                                    <label for="inputEmail4">Expiry Date <span
                                                            class="text-danger">*</span></label>
                                                    <input type="date" class="form-control" required
                                                        :value="transaction.expiry_date" placeholder="Date" />
                                                </div>

                                                <!-- <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="inputCity">Select Type
                                                        <span class="text-danger">*</span></label>
                                                    <select class="form-control" required v-model="transaction.type">
                                                        <option :value="type" v-for="type in types" :key="type">
                                                            {{ type }}

                                                        </option>
                                                    </select>
                                                </div>
                                            </div> -->

                                                <div class="form-group col-md-12">
                                                    <label for="inputAddress">Description</label>
                                                    <textarea name="name" rows="3" cols="80" class="form-control"
                                                        v-model="transaction.description"></textarea>
                                                    <button type="submit" class="btn btn-info m-2 btn-block">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>

                                        </div>

                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-12 m-b-30">
                                                    <div class="card">
                                                        <div class="card-header border-bottom"></div>

                                                        <div class="card-footer row"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--End of Modal -->


                    </div>

                    <div class="vld-parent">
                        <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage">
                        </loading>
                    </div>
                </section>
            </div>
        </main>
    </section>
</template>

<script>
    import Navbar from "@/views/Navbar.vue";
    // Import component
    import Loading from "vue-loading-overlay";
    // Import stylesheet
    import "vue-loading-overlay/dist/vue-loading.css";
    // Init plugin

    export default {
        components: {
            Navbar,
            Loading,
        },
        data() {
            return {
                user: null,
                types: ["online", "offline"],
                organization: "",
                transaction: {
                    "amount": 0,
                    "type": "offline",
                    "description": "",
                },
                transactions: [],
                organizationclients: {
                    meta: {
                        "total": 0,
                        "per_page": 0,
                        "current_page": 0,
                        "last_page": 0,
                        "from": 0,
                        "to": 0
                    },
                    data: []
                },
                plans: "",
                dashboarddata: "",
                edit: false,
                isLoading: false,
                fullPage: true,
                agency_id: "",
            };
        },
        beforeMount() {
            this.user = JSON.parse(localStorage.getItem("user"));

            this.axios
                .get(`/api/v1/auth/transactions`, {
                    params: {
                        ministry_model_id: this.$route.params.id,
                    }
                })
                .then((response) => {
                    this.transactions = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });


        },
        methods: {

            getOrganization() {
                this.axios
                    .get(`/api/v1/auth/ministry_single/${this.$route.params.id}`)
                    .then((response) => {
                        this.organization = response.data;
                        this.getOrganizationClients(this.organization)
                        this.dashboardData(this.organization)
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },

            dashboardData(org) {
                this.axios
                    .get(`/api/v1/auth/mda-dashboard-data/${org.name}`)
                    .then((response) => {
                        this.dashboarddata = response.data;
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            getOrganizationClients(org) {

                this.isLoading = true;

                this.user = JSON.parse(localStorage.getItem("user"));
                this.axios
                    .get(`/api/v1/auth/getUsersfilterparams`, {
                        params: {
                            page: 1,
                            agency_id: 439078,
                            perPage: 1000,
                            place_of_work: org.name,
                            enabled_user: this.transaction.enabled_user,
                        },
                    })
                    .then((response) => {
                        this.organizationclients = response.data;
                        this.isLoading = false;

                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.isLoading = false;
                    });
            },

            acceptorganization(status) {
                if (confirm("Are You Sure You Want to Update organization?")) {
                    this.user = JSON.parse(localStorage.getItem("user"));
                    this.isLoading = true;
                    this.axios
                        .post("/api/v1/auth/approveDisapproveorganizationByAgency", {
                            agency_id: 439078,
                            organization_id: this.$route.params.id,
                            status: status,
                        })
                        .then((response) => {
                            console.log(response);
                            this.$breadstick.notify("organization Updated!", {
                                position: "top-right",
                            });
                            this.isLoading = false;
                            this.getorganization();
                            this.$router.push(`/my-organizations`);
                        })
                        .catch((error) => {
                            console.log(error.response);
                            this.isLoading = false;
                        });
                }
            },
            rejectorganization() {
                if (confirm("Are You Sure You Want to Disapprove this organization?")) {
                    this.user = JSON.parse(localStorage.getItem("user"));
                    this.isLoading = true;
                    this.axios
                        .post("/api/v1/auth/approveDisapproveorganizationByAgency", {
                            agency_id: this.user.id,
                            organization_id: this.$route.params.id,
                            status: 0,
                        })
                        .then((response) => {
                            console.log(response);
                            this.$breadstick.notify("organization Disapproved!", {
                                position: "top-right",
                            });
                            this.isLoading = false;
                            this.getorganization();
                        })
                        .catch((error) => {
                            console.log(error.response);
                            this.isLoading = false;
                        });
                }
            },
            clearIt() {
                this.agency_id = "";
            },
            addTransaction() {
                this.isLoading = true;
                this.axios
                    .post(`/api/v1/auth/transactions`, {
                        agency_id: this.$route.params.id,
                        amount: this.transaction.sector * this.organizationclients.meta.total,
                        type: this.transaction.type,
                        ministry_model_id: this.$route.params.id,
                        description: this.transaction.description,
                        transaction_ref: Math.floor(Math.random() * 10 ** 20).toString().padStart(20, '0'),
                        status: "approved",
                        users: this.dashboarddata.ids,

                    })
                    .then((response) => {
                        console.log(response);
                        this.$toasted.success("Submitted Successfully", {
                            position: "top-center",
                            duration: 3000,
                        });
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        this.$toasted.error("Error!", {
                            position: "top-center",
                            duration: 3000,
                        });
                        this.isLoading = false;
                    });
            },

            fetchPlans() {
                this.axios
                    .get(`/api/v1/plans`)
                    .then((response) => {
                        this.plans = response.data.data;
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
        },
        created() {
            this.getOrganization();
            this.fetchPlans();
        },
    };
</script>
<style>
    .spacer {
        margin-left: 15px;
    }
</style>