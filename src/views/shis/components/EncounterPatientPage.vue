<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="heading">Patient Details</h1>
    </div>

    <div class="user__details--container">
      <div class="user__details--container-main">
        <h1 class="name">
          {{ encounterDetails.patient.lastname }}
          {{ encounterDetails.patient.firstname }}
        </h1>

        <img
          :src="
            `https://api.hayokinsurance.com/image/${encounterDetails.patient.user_image}`
          "
          alt="Enrollee Image"
          class="enrollee__img"
          onerror="this.onerror=null; this.src='/assets/img/ohis_logo.png'"
        />
        <div class="primary__detail">
          <i class="fas fa-id-card fa-2x icon"></i>
          <p class="id__number primary__detail--text">
            {{ encounterDetails.patient.id_card_number }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-phone fa-2x icon"></i>
          <p class="exp__date primary__detail--text">
            {{ encounterDetails.patient.phone_number }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="far fa-calendar-alt fa-2x icon"></i>
          <p class="facility primary__detail--text">
            {{ encounterDetails.patient.dob }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-venus-mars fa-2x icon"></i>
          <p class="facility primary__detail--text">
            {{ encounterDetails.patient.gender }}
          </p>
        </div>
        <div class="primary__detail">
          <i class="fas fa-hospital fa-2x icon"></i>
          <p class="mda primary__detail--text">
            {{ encounterDetails.provider.agency_name }}
          </p>
        </div>
      </div>
      <div class="user__-details--container-other">
        <div class="user__details-header-and-renewal__CTA">
          <h1 class="other__details--heading">
            Services
          </h1>
        </div>
        <div v-if="encounterDetails.services">
          <div
            class="other__details--list"
            v-for="service in encounterDetails.services"
            :key="service.id"
          >
            <div v-if="service.drug">
              <p class="other__detail">
                <strong>Drug: </strong>
                {{ service.drug.drug_name }}
              </p>
              <p class="other__detail">
                <strong>Price: </strong>
                {{ service.drug.price }}
              </p>
            </div>
            <div v-else>
              <p class="other__detail">
                <strong>Service: </strong>
                Chemotherapy
              </p>
              <p class="other__detail">
                <strong>Price: </strong>
                200000
              </p>
            </div>
            <p class="other__detail">
              <strong>Reason for visit: </strong>
              {{ encounterDetails.healthrecord.reasonVisit }}
            </p>
            <p class="other__detail">
              <strong>Test Result: </strong>
              {{ encounterDetails.healthrecord.testResult }}
            </p>
            <p class="other__detail">
              <strong>Note: </strong>
              {{ encounterDetails.healthrecord.notes }}
            </p>
            <p class="other__detail">
              <strong>Date & time of visit: </strong>
              {{ encounterDetails.healthrecord.created_at }}
            </p>
            <p class="other__detail">
              <strong>Desk Officer: </strong>
              {{ encounterDetails.healthrecord.professional.lastname }}
              {{ encounterDetails.healthrecord.professional.firstname }}
            </p>
            <p class="other__detail">
              <strong>Desk Officer's Phone Number: </strong>
              {{ encounterDetails.healthrecord.professional.phone_number }}
            </p>
          </div>
        </div>
        <div v-else>
          <div class="other__details--list">
            <h2>No Encounter Records</h2>
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
</template>

<script>
// import Loading from "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      encounterDetails: "",
      patient: "",
      paystackkey: "pk_live_1ec7b33187b214721539e421c5c89cd395502361", //paystack public key
      dependants: [],
      isLoading: false,
      encounterId: "",
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
    getUserEncounterDetails() {
      this.isLoading = true;
      this.axios
        .get(
          `https://api.hayokinsurance.com/api/v1/auth/service_summary/${this.$route.params.id}`
        )
        .then((response) => {
          this.encounterDetails = response.data;
          console.log(this.encounterDetails);
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

  created() {
    this.getUserEncounterDetails();
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");

html {
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Nunito";
}

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
}

.image__container {
  display: flex;
  justify-content: center;
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
