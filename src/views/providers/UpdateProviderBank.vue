<template>
  <div class="">
    <Navbar />
    <section class="admin-content ">
      <div class="bg-dark bg-dots m-b-30">
        <div class="container">
          <div class="row p-b-60 p-t-60">
            <div class="col-lg-8 text-center mx-auto text-white p-b-30">
              <div class="m-b-10">
                <div class="avatar avatar-lg ">
                  <div
                    class="avatar-title bg-info rounded-circle mdi mdi-settings "
                  ></div>
                </div>
              </div>
              <h3>Update Bank Details</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="pull-up">
        <div class="container">
          <div class="row ">
            <div class="col-lg-10 mx-auto  mt-2">
              <div class="card py-3 m-b-30">
                <div class="card-body">
                  <h3 class="">Bank Details</h3>
                  <p class="text-muted">
                    OHIS Bank Code: {{auth_user.recipient_code}}
                  </p>

                  <div class="form-row">
                   

                    <div class="form-group col-md-6">
                      <label for="inputCity">Bank </label>
                      <select class="form-control" v-model="bank_code">
                        <option
                          v-for="bank in banks.data"
                          v-bind:key="bank"
                          :value="bank.code"
                          >{{ bank.name }}</option
                        >
                      </select>
                    </div>

                     <div class="form-group col-md-6">
                      <label for="asd">Bank Account Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone Number"
                        v-model="bank_account_number"
                        @change="verifyAccount"
                      />
                    </div>

                     <div class="form-group col-md-6" v-if="verified_user != ''">
                      <label for="asd">Bank Account Name</label>
                      <input
                        type="text"
                        disabled
                        class="form-control"
                        placeholder="Phone Number"
                        :value="verified_user.data.account_name"
                       
                      />
                    </div>

            
                  </div>

                  <button
                    type="submit"
                    class="btn btn-success btn-cta"
                    @click="creatAccount"
                  >
                    Save changes <i class="fe fe-pocket"></i>
                  </button>
                </div>
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
      </section>
    </section>
  </div>
</template>
<script>
import Navbar from "@/views/Navbar.vue";
import Loading from "vue-loading-overlay";
export default {
  // name: 'Home',
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      auth_user: "",
      banks: "",
      bank_code: "",
      bank_account_number: "",
      verified_user: "",
      user: null,
      image: "",
      sector: "",
      lga_states: "",
      isLoading: false,
      fullPage: true,
    };
  },
  beforeMount() {
   this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    getProviders() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.axios
        .get(`https://api.paystack.co/bank`, {
          headers: {
            Authorization: `Bearer sk_test_9bf6e51dcb060ac515b5f073b4a1dec81cb200a8`,
          },
        })
        .then((response) => {
          this.banks = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    verifyAccount() {
      this.isLoading = true;

      this.axios
        .get(`https://api.paystack.co/bank/resolve?account_number=${this.bank_account_number}&bank_code=${this.bank_code}`, {
          headers: {
            Authorization: `Bearer sk_test_9bf6e51dcb060ac515b5f073b4a1dec81cb200a8`,
          },
        })
        .then((response) => {
          this.verified_user = response.data;
          console.log(response);
             this.isLoading = false;
              this.$toasted.success("Account Verified Successfully", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
           this.isLoading = false;
            this.$toasted.error("Account Not Found!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    creatAccount() {
      this.axios
        .post(
          `https://api.paystack.co/transferrecipient`,{
            type: "nuban",
            name: this.verified_user.data.account_name,
            account_number: this.bank_account_number,
            bank_code: this.bank_code,
            currency: "NGN",
          },
          {
            headers: {
              Authorization: `Bearer sk_test_9bf6e51dcb060ac515b5f073b4a1dec81cb200a8`,
            },
          },
           
        )
        .then((response) => {
          this.$toasted.success("Account Created Successfully", {
            position: "top-center",
            duration: 3000,
          });
          console.log(response);
            let recipient_code = response.data.data.recipient_code
          this.updateRecipientCode(recipient_code)
        })
        .catch((error) => {
          console.error(error);
           this.$toasted.error("Error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    getUser() {
      this.axios
        .get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
        .then((response) => {
          this.auth_user = response.data.user;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateRecipientCode(recipient_code) {
      this.axios
        .patch(`/api/v1/auth/update/recipientcode/${this.$route.params.id}`,{
            recipient_code : recipient_code 
        })
        .then((response) => {
         
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchLga() {
      this.axios
        .get(`/api/v1/auth/lga/2676`)
        .then((response) => {
          this.lga_states = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    editUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post(`/api/v1/auth/editProfile/${this.$route.params.id}`, {
          firstname: this.auth_user.firstname,
          lastname: this.auth_user.lastname,
          email: this.auth_user.email,
          type: this.auth_user.type,
          state: "2676",
          localgovt: this.auth_user.localgovt,
          ward: this.auth_user.ward,
          dob: this.auth_user.dob,
          phc_general: this.auth_user.phc_general,
          gender: this.auth_user.gender,
          genotype: this.auth_user.genotype,
          institutional_id: this.auth_user.institutional_id,
          sector: this.auth_user.sector,
          user_image: this.auth_user.user_image,
          middlename: this.auth_user.middlename,
          nimc_number: this.auth_user.nimc_number,
          password: this.auth_user.password,
          phone_number: this.auth_user.phone_number,
          agency_name: this.auth_user.agency_name,
          address1: this.auth_user.address1,
          //    agencyAddress: this.auth_user.agencyAddress,
          //    agencyWebsite: this.auth_user.agencyWebsite
        })
        .then((response) => {
          console.log(response);
          this.$breadstick.notify("Provider updated Successfully!", {
            position: "top-right",
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.$breadstick.notify("error on adding!", {
            position: "top-right",
          });
        });
    },
  },
  created() {
    this.fetchLga();
    this.getProviders();
    this.getUser();
  },
};
</script>
