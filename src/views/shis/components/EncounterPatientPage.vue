<template>
  <section class="admin-content" id="contact-search">
    <Navbar />
    <main class="admin-main">
      <div class="jumbotron">
        <h1 class="h3 text-dark">Encounter Details</h1>
      </div>

      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          loader="dots"
          :can-cancel="true"
          :is-full-page="fullPage"
        ></loading>
      </div>
      <div class="container card col-md-12">
        <div class="card-header"></div>

        <div class="card-body">
          <button class="btn btn-outline-success spacer" @click="printMe">
            Print <i class="fe fe-printer"></i>
          </button>

          <span v-if="encounterDetails.is_confirmed == true">
            <button
              type="button"
              class="btn  m-1 badge badge-soft-success"
            >
              confirmed
            </button>
          </span>

          <span v-if="encounterDetails.is_confirmed == false">
            <button
              type="button"
              class="btn  m-1 badge badge-soft-danger"
            >
              rejected
            </button>
          </span>

          <!-- <button
            class="btn btn-outline-success spacer"
            data-toggle="modal"
            data-target="#example_01"
          >
            Request Authorization Code <i class="fe fe-send"></i>
          </button> -->

          <router-link :to="`/claim/${encounterDetails.claim_id}`">
            <button
              class="btn btn-outline-success spacer"
              v-if="encounterDetails.claim_id != null"
            >
              View Claim <i class="mdi mdi-file-document-outline"></i>
            </button>
          </router-link>
        </div>
      </div>

      <div class="user__details--container" id="printDiv" ref="printNow">
        <div class="user__details--container-main">
          <h1 class="name">
            <span v-if="encounterDetails.enrollee != null">
              {{ encounterDetails.enrollee.full_name }}
            </span>
          </h1>

          <img
            v-if="encounterDetails.enrollee != null"
            :src="`https://kampe.hayokmedicare.ng/image/${encounterDetails.enrollee.user_image}`"
            alt="Enrollee Image"
            class="enrollee__img"
            onerror="this.onerror=null; this.src='/assets/img/KAMPE_logo.png'"
          />
          <div class="primary__detail">
            <i class="fas fa-id-card fa-2x icon"></i>
            <p
              class="id__number primary__detail--text"
              v-if="encounterDetails.enrollee != null"
            >
              {{ encounterDetails.enrollee.id_card_number }}
            </p>
          </div>
          <div class="primary__detail">
            <i class="fas fa-phone fa-2x icon"></i>
            <p
              class="exp__date primary__detail--text"
              v-if="encounterDetails.enrollee != null"
            >
              {{ encounterDetails.enrollee.phone_number }}
            </p>
          </div>
          <div class="primary__detail">
            <i class="far fa-calendar-alt fa-2x icon"></i>
            <p
              class="facility primary__detail--text"
              v-if="encounterDetails.enrollee != null"
            >
              {{ encounterDetails.enrollee.dob }}
            </p>
          </div>
          <div class="primary__detail">
            <i class="fas fa-venus-mars fa-2x icon"></i>
            <p
              class="facility primary__detail--text"
              v-if="encounterDetails.enrollee != null"
            >
              {{ encounterDetails.enrollee.gender }}
            </p>
          </div>

          <div class="primary__detail">
            <i class="fas fa-hospital fa-2x icon"></i>
            <p class="mda primary__detail--text">
              {{ encounterDetails.provider.agency_name }}
            </p>
          </div>

          <div class="primary__detail">
            <i class="fas fa-calendar fa-2x icon"></i>
            <p class="mda primary__detail--text">
              {{ encounterDetails.created_at }}
              <span class="text-primary font-weight-light">
                ({{ encounterDetails.created_at | moment("from", "now") }})
              </span>
            </p>
          </div>
        </div>
        <div class="user__-details--container-other">
          <div class="user__details-header-and-renewal__CTA">
            <h1 class="other__details--heading">Encounter Details</h1>
          </div>

          <div v-if="encounterDetails.services">
            <div class="other__details--list">
              <p class="other__detail">
                <strong>Encounter ID: </strong>
                {{ encounterDetails.healthrecord.encounter_id }}
              </p>

              <p class="other__detail">
                <strong>Diagnosis: </strong>
                <span v-if="encounterDetails.diagnosis != null">
                  {{ encounterDetails.diagnosis.name }}
                </span>
              </p>
              <p class="other__detail">
                <strong>Other Diagnosis: </strong>
                <span v-if="encounterDetails.secondarydiagnosis != null">
                  {{ encounterDetails.secondarydiagnosis.name }}
                </span>
              </p>
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
                {{ encounterDetails.healthrecord.date_of_visit }}
              </p>
              <p class="other__detail">
                <strong>Desk Officer: </strong>
                {{ encounterDetails.healthrecord.professional.full_name }}
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
          <br />

          <div class="card table-responsive">
            <strong class="h5 text-center card-header">
              Service/Drugs Administered During Encounter</strong
            >
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Distribution</th>
                  <th>Unit Amount</th>
                  <!-- <th>Days</th> -->
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(service, index) in encounterDetails.services"
                  v-bind:key="service.id"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <span v-if="service.service != null">Service</span>
                    <span v-if="service.drug_id != null">Drug</span>
                  </td>
                  <td>
                    <span v-if="service.service != null">{{
                      service.service.description
                    }}</span>
                    <span v-if="service.drug != null">{{
                      service.drug.drug_name
                    }}</span>
                  </td>
                  <td>
                    <p>
                      (Freq = {{ service.frequency }}), (Dose =
                      {{ service.dose }}), ( Days = {{ service.days }})
                    </p>
                  </td>
                  <td>
                    <span v-if="service.service != null">{{
                      service.service.price
                    }}</span>
                    <span v-if="service.drug != null">{{
                      service.drug.price
                    }}</span>
                  </td>

                  <!-- <td>
                    <span v-if="service.drug != null">
                      {{ service.dose }}
                    </span>
                  </td> -->

                  <!-- <td>
                    <span>
                      {{ service.days }}
                    </span>
                  </td> -->
                  <td>
                    <span v-if="service.service != null">
                      &#8358;{{ service.total_cost | numeral(0, 0) }}
                    </span>
                    <span v-if="service.drug != null">
                      &#8358;{{ service.total_cost | numeral(0, 0) }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td colspan="5"><strong>Total Cost of Encounter</strong></td>
                  <td>
                    <strong>
                      &#8358;{{ totalServiceCharge | numeral(0, 0) }}</strong
                    >
                  </td>
                </tr>

                <tr>
                  <td><strong>10% of Drug Charged to Customer </strong></td>
                  <td>
                    <strong> &#8358;{{ tenPercent | numeral(0, 0) }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Modal for Authorization Code -->
          <div
            class="modal fade"
            id="example_01"
            tabindex="-1"
            role="dialog"
            aria-labelledby="example_02"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div class="modal-content">
                <div class="container-fluid">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>

                  <div class="row p-t-20 p-b-20">
                    <div class="col-md-12">
                      <p class="h4">Authorization Code Request</p>

                      <div class="form-group col-md-12">
                        <label>Select Secondary Facility </label>
                        <v-select
                          v-model="referred_to_facility"
                          label="agency_name"
                          :options="providers"
                        />
                      </div>

                      <div class="col-md-12">
                        <button
                          class="btn btn-success btn-block"
                          @click="createAuthCode"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Ends -->
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading,
    Navbar,
  },
  data() {
    return {
      encounterDetails: "",
      providers: "",
      patient: "",
      dependants: [],
      isLoading: false,
      encounterId: "",
      referred_to_facility: "",
      fullPage: true,
      payment_type: "online",
      selectedPaymentOption: "",
      paymentOptions: { online: "online", offline: "offline" },
    };
  },
  computed: {
    totalServiceCharge() {
      let total = this.encounterDetails.total_drug_price;
      // this.encounterDetails.total_service_price;
      return total;
    },
    tenPercent() {
      let total = this.encounterDetails.total_drug_price;
      let calc = total * 0.1;
      return calc;
    },
  },

  methods: {
    getUserEncounterDetails() {
      this.isLoading = true;
      this.axios
        .get(`/api/v1/auth/service_summary/${this.$route.params.id}`)
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

    createClaim() {
      if (confirm("Are you Sure you want to create Claim?")) {
        this.isLoading = true;
        this.axios
          .post(`/api/v1/auth/createClaimfromEncounter`, {
            encounter_id: this.$route.params.id,
          })
          .then((response) => {
            console.log(response);
            this.$toasted.info("Created Successfully!", {
              position: "top-center",
              duration: 3000,
            });
            this.getUserEncounterDetails();
          })
          .catch((error) => {
            console.error(error);
            this.$toasted.error("Error!", {
              position: "top-center",
              duration: 3000,
            });
          });
        this.isLoading = false;
      }
    },
    createAuthCode() {
      if (confirm("Are you sure you want to submit request")) {
        this.isLoading = true;
        this.axios
          .post("/api/v1/auth/authorization_code", {
            agency_id: 439078,
            principal_id: this.encounterDetails.client_id,
            dependent_id: this.encounterDetails.dependent_id,
            provider_id: this.encounterDetails.provider_id,
            referred_to_facility: this.referred_to_facility.id,
            service_summary_id: this.encounterDetails.id,
            org_id:
              this.encounterDetails.patient == null
                ? this.encounterDetails.dependent.user.org_id
                : this.encounterDetails.patient.org_id,
          })
          .then((response) => {
            console.log(response);
            this.isLoading = false;
            this.getUserEncounterDetails();
            // this.sendSMS();
            this.$toasted.info(`${response.data.message}`, {
              position: "top-center",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.log(error.response);
            this.isLoading = false;
            this.$breadstick.notify("Oops! something went wrong", {
              position: "top-right",
            });
          });
      }
    },
    sendSMS() {
      this.isLoading = true;
      let message = `your code requested is successful. Go to https://app.Kampe.ng/authorization-code  `;
      this.axios
        .post(
          `https://api.bulksmslive.com/v2/app/sms?email=info@Kampe.ng&password=osun@4141&sender_name=KAMPE&message=${message}&recipients=${this.encounterDetails.creator.phone_number}`,
          {}
        )
        .then((response) => {
          console.log(response);
          let reply = response.data.msg;
          this.clearIt();
          this.isLoading = false;
          this.$toasted.info(`${reply}`, {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
    getProviders() {
      this.axios
        .get(`/api/v1/auth/providerAgency/439078`)
        .then((response) => {
          this.providers = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    this.getUserEncounterDetails();
    this.getProviders();
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

.spacer {
  margin-top: 10px;
  margin-bottom: 10px;
}

.heading {
  font-size: 1.3rem;
}

.jumbotron {
  background: rgb(72, 179, 120);
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
