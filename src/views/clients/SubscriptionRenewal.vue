<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="heading">Plan Renewal</h1>
    </div>
    <div class="client__details">
      <h3 class="CTA__prompt">Enter Your Detail Below</h3>
      <input
        type="text"
        placeholder="OHIS Number, Email or Virtual Account Number"
        v-model="userIdentifier"
      />
      <button class="btn btn-success" @click="getUserDetails">
        Submit
      </button>
    </div>
    <div class="user__details--container" v-if="user">
      <div class="user__details--container-main">
        <h1 class="name">{{ user.full_name }}</h1>
        <img
          :src="`https://insurance-api.hayokmedicare.ng/image/${user.user_image}`"
          alt="Enrollee Image"
          class="enrollee__img"
          onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
        />
        <div class="primary__detail">
          <i class="fas fa-id-card fa-2x icon"></i>
          <p class="id__number primary__detail--text">
            {{ user.id_card_number }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-calendar-times fa-2x icon"></i>
          <p class="exp__date primary__detail--text">
            {{ user.expiry_date }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-clinic-medical fa-2x icon"></i>
          <p class="facility primary__detail--text">
            {{ user.userprovider.agency_name }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-briefcase fa-2x icon"></i>
          <p class="mda primary__detail--text">{{ user.place_of_work }}</p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-building fa-2x icon"></i>
          <p class="hmo primary__detail--text">
            {{ user.usertpa.organization_name }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-cart-plus fa-2x icon"></i>
          <p class="id__number primary__detail--text">{{ user.plan_type }}</p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-id-card fa-2x icon"></i>
          <p class="id__number primary__detail--text">{{ user.sector }}</p>
        </div>
      </div>
      <div class="user__-details--container-other">
        <div class="user__details-header-and-renewal__CTA">
          <h1 class="other__details--heading">
            Other Details
          </h1>
          <!-- <router-link :to="`/subscribe/${user.id}`">
            <button class="btn btn-success renewal__CTA">
              Renew Plan <i class="fas fa-sync"></i>
            </button>
          </router-link> -->

          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-outline-success spacer"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Renew Plan <i class="fas fa-sync"></i>
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- <h5 class="modal-title" id="exampleModalLabel">
                    {{ selectedPaymentOption }}
                  </h5> -->
                  <button
                    type="button"
                    class="btn-close"
                    data-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <select
                    name="payment__options"
                    id=""
                    required
                    v-model="selectedPaymentOption"
                  >
                    <option value="" disabled selected hidden
                      >Select Payment Option</option
                    >
                    <option value="online"
                      >Pay Online (With Credit Card)</option
                    >
                    <option value="offline">Pay With USSD</option>
                  </select>
                </div>
                <div v-if="selectedPaymentOption === paymentOptions.offline">
                  <p class="ussd">
                    <strong
                      ><p>Dial The Code Below On Your Mobile Phone:</p> </strong
                    ><br />
                    *BankCode*SchemeCode*BillerId+UserIdentifier+Amount#<br />
                    *894*000*506+{{ user.virtual_account }}+
                    {{ getPlan.plan_cost }}#
                  </p>
                  <!-- <p>
                  </p> -->
                </div>

                <div
                  class="col-lg-12"
                  v-if="selectedPaymentOption === paymentOptions.online"
                >
                  <paystack
                    :amount="totalCost * 100"
                    :email="user.email"
                    :paystackkey="paystackkey"
                    :reference="reference"
                    :callback="callback"
                    :first_name="user.firstname"
                    :last_name="user.lastname"
                    :phone="user.phone_number"
                    :close="close"
                    :embed="false"
                    v-if="payment_type == 'online'"
                  >
                    <button class="btn btn-success btn-block">
                      Proceed to Pay (Online)
                    </button>
                  </paystack>

                  <button
                    class="btn btn-dark btn-block btn-lg"
                    v-if="payment_type == 'offline'"
                    data-toggle="modal"
                    data-target="#eofflineModal"
                  >
                    Pay Offline (USSD)
                  </button>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="other__details--list">
          <p class="other__detail">
            <strong>Date Enrolled: </strong> {{ user.created_at }}
          </p>
          <div v-if="user.dependants.length > 0">
            <p
              class="other__detail"
              v-for="(dependant, index) in user.dependants"
              :key="index"
            >
              <strong>Dependent {{ dependentChar(index) }}: </strong>
              {{ dependant.firstname }}
              {{ dependant.lastname }}
            </p>
          </div>
          <p class="other__detail">
            <strong>Enrolled By: </strong>
          </p>
          <p class="other__detail">
            <strong>NIMC Number: </strong> {{ user.nimc_number }}
          </p>
          <p class="other__detail">
            <strong>Virtual Account Number: </strong>{{ user.virtual_account }}
          </p>
          <p class="other__detail">
            <strong>Gender: </strong> {{ user.gender }}
          </p>
          <p class="other__detail">
            <strong>Phone Number: </strong> {{ user.phone_number }}
          </p>
          <p class="other__detail">
            <strong>LGA/Ward: </strong>
            <span v-if="user.local_government != null">{{
              user.local_government.local_name
            }}</span>
            /

            <span v-if="user.ward != null">
              {{ user.ward.ward_name }}
            </span>
          </p>
          <p class="other__detail">
            <strong>Date of Birth: </strong> {{ user.dob }}
          </p>
          <p class="other__detail">
            <strong>Expiry Date: </strong> {{ user.expiry_date }}
          </p>
          <p class="other__detail">
            <strong>Marital Status: </strong> {{ user.marital_status }}
          </p>
          <p class="other__detail">
            <strong>MDA:</strong> {{ user.place_of_work }}
          </p>
          <p class="other__detail">
            <strong>Staff ID: </strong> {{ user.salary_number }}
          </p>
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
</template>

<script>
// import Loading from "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import paystack from "vue-paystack";

export default {
  components: {
    Loading,
    paystack,
  },
  data() {
    return {
      userIdentifier: "",
      user: "",
      paystackkey: "pk_live_1ec7b33187b214721539e421c5c89cd395502361", //paystack public key
      dependants: [],
      isLoading: false,
      fullPage: true,
      payment_type: "online",
      selectedPaymentOption: "",
      paymentOptions: { online: "online", offline: "offline" },
      selected_plan: [
        {
          id: 1,
          plan_name: "Individual",
          description:
            "This Plan type is a General Plan package with a 12-month duration. It only covers one person (Principal). It grants you access to cheap and qualititative healthcare coverage. It allows no depandent(s).",
          plan_cost: 12066,
          fee: 280.99,
        },
        {
          id: 2,
          plan_name: "Family",
          description:
            " This Plan type is a General Plan package with a 12-month duration. It covers 6 people (One Principal and 5 Dependents). It grants you access to cheap and qualititative healthcare coverage. It allows a Maximum of 5-depandent(s).",
          plan_cost: 57600,
          fee: 964.0,
        },
      ],
    };
  },

  methods: {
    getUserDetails() {
      console.log(this.userIdentifier);
      this.isLoading = true;
      this.axios
        .post(`https://insurance-api.hayokmedicare.ng/api/v1/get-userbyEnrollee`, {
          identifier: this.userIdentifier,
        })
        .then((response) => {
          this.user = response.data;
          console.log(this.user);
        })
        .catch((error) => {
          console.error(error);
        });
      this.isLoading = false;
    },

    dependentChar(index) {
      return String.fromCharCode("A".charCodeAt(0) + index);
    },

    makeSubscribe() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.axios
        .post("/api/v1/make/transaction", {
          agency_id: 95930,
          amount: this.getPlan.plan_cost,
          description: "OHIS Plan Payment",
          type: "plan_payment",
          transaction_ref: this.reference,
          user_id: this.user.id,
        })
        .then((response) => {
          console.log(response);
          this.$toasted.info(
            "Congratulations you have successfully enrolled to O'HIS",
            { position: "top-center", duration: 8000 }
          );
          this.isLoading = false;
          // window.location = "https://www.oshia.ng";
          this.$router.push(`/subscribe-success/${this.user.id}`);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    sendSMS() {
      this.isLoading = true;
      this.axios
        .post(`https://app.multitexter.com/v2/app/sms`, {
          email: "wearegrumie@gmail.com",
          password: "AGYkh.EUddNx4j@",
          message: this.sms_message,
          sender_name: "OHIS",
          recipients: this.user.phone_number,
        })
        .then((response) => {
          console.log(response);

          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },

    close: function() {
      console.log("Payment closed");
    },

    callback: function(response) {
      this.sendSMS();
      this.makeSubscribe();
      console.log(response);
    },
  },

  computed: {
    getPlan() {
      let formatter = this.selected_plan.filter(
        (x) => x.plan_name == this.user.plan_type
      );
      console.log(formatter);
      return formatter[0];
    },

    totalCost() {
      return this.getPlan.plan_cost + this.getPlan.fee;
    },

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");

/* * {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
} */

html {
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Nunito";
}

/* .container {
} */

.heading {
  font-size: 1.3rem;
}

.jumbotron {
  background: rgb(10, 10, 102);
  text-align: center;
  color: #fff;
}

.CTA__prompt {
  font-size: 1.4rem;
}

.client__details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  margin-bottom: 2rem;
}

input {
  border: none;
  padding: 9px 12px;
  border: 1px solid rgba(60, 66, 87, 0.12);
  width: 50%;
  margin: 1rem 0;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.04);
}

select {
  border: none;
  padding: 9px 12px;
  border: 1px solid rgba(60, 66, 87, 0.12);
  width: 70%;
  margin: 1rem 0;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.04);
}

.user__details--container {
  height: fit-content;
  /* background: palegreen; */
  display: flex;
}

.user__details-header-and-renewal__CTA {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user__details--container-main {
  display: flex;
  flex-direction: column;
  /* background: blueviolet; */
  padding: 2rem;
  height: fit-content;
  flex: 1;
  align-items: center;
}

.name {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #697386;
}

.primary__detail {
  padding: 1rem 2rem;
  background: #fff;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid black; */
  border: 1px solid rgba(60, 66, 87, 0.12);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
  border-radius: 0.4rem;
}

.ussd {
  padding: 1rem 2rem;
  background: #fff;
  min-width: 90%;
  border: 1px solid rgba(60, 66, 87, 0.12);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.04);
  margin: 0 1rem 2rem 1rem;
  border-radius: 0.4rem;
  transition: ease-in-out 0.3s;
  word-wrap: break-word;
}

.fa-2x {
  color: #697386;
}

.primary__detail--text {
  font-weight: 500;
  text-align: right;
}

.enrollee__img {
  width: 65%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
}

.user__-details--container-other {
  height: fit-content;
  flex: 2;
  /* background: orangered; */
  padding: 2rem;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 8%);
}

.other__details--heading {
  font-size: 1.5rem;
  font-weight: 500;
  color: #697386;
}

.other__detail {
  border-bottom: 1px solid rgba(60, 66, 87, 0.12);
  margin-top: 1rem;
  /* color: #697386; */
}

@media screen and (max-width: 64rem) /* 1024/16 = 64 rem */ {
  .user__details--container-main {
    flex: 2;
  }

  .primary__detail {
    width: 100%;
  }
}

@media screen and (max-width: 48.1rem) /* 769/16 = 48.1 rem */ {
  .user__details--container {
    display: block;
    padding: 2rem 1rem;
  }

  .user__details--container-main {
    padding: 0;
  }

  .fa-2x {
    font-size: 1.5rem;
  }

  input {
    width: 92%;
  }

  select {
    width: 100%;
  }
}
</style>
