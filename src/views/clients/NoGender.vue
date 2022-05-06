<template>
  <div class="row list">
    <div class="col-lg-12 col-md-12">
      <div class="card m-b-30">
        <div class="card card-header">
          <p class="h5">
            Total to be Uploaded JSON: {{ idcard_offline.length }}
          </p>
          <p class="h5">{{ this.json_index }} Index Uploaded</p>

          <div class="col-md-3">
            <label for="">Start From Index: {{ json_index }} </label>
            <input type="text" class="form-control" v-model="json_index" />
          </div>
          <div class="col-md-12">
            <!-- <input type="file"  accept="application/JSON" @change="onFileChange" class="form-control" /> -->
            <!-- {{idcard_offline[0].id_card_number }} -->

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01"
                  >Upload</span
                >
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  @change="onFileChange"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Choose file</label
                >
              </div>
            </div>
          </div>

          <p>
            <button class="btn btn-dark btn-block" @click="autoUpdate">
              Update All
            </button>
          </p>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <!-- <th>Avatar</th> -->
                  <th>Name</th>
                  <th>Account Type</th>
                  <th>Sector Type</th>
                  <th>DOB || Expiry</th>
                  <th>OHIS Number</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(client, index) in clients.data"
                  v-bind:key="client.id"
                >
                  <td>
                    <router-link
                      :to="{ path: '/client/' + client.id, params: {} }"
                    >
                      {{ index + 1 }} {{ client.firstname }}
                      {{ client.lastname }}
                    </router-link>
                  </td>
                  <td>{{ client.account_type }}</td>
                  <td>{{ client.sector }}</td>
                  <td>{{ client.dob }} || {{ client.expiry_date }}</td>

                  <td>{{ client.id_card_number }}</td>
                  <td>{{ client.created_at }}</td>

                  <td>
                    <button
                      type="button"
                      @click="updateDate(client)"
                      class="btn btn-primary"
                      style="margin-left: 10px; margin-top: 10px"
                    >
                      Update
                    </button>

                    <button class="btn btn-destroy" @click="deleteUser(client)">
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
import idcardJson from "./../../../public/offline/Fuu_list_expiry_dob_all.json";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      states: "",
      clients: "",
      gender: "",
      value_list: "",
      auto_selected: "",
      json_index: 0,
      idcard_offlines: idcardJson,
      idcard_offline: [],
      json_fields: {
        "First Name": "firstname",
        "Last Name": "lastname",
        "Middle Name": "middlename",
        "User Image": {
          field: "user_image",
          callback: (value) => {
            return `https://api.hayokinsurance.com/image/${value}`;
          },
        },
        phone_number: "phone_number",
        Plan: "sector",
        "Vulnerable Group": "category_of_vulnerable_group",
        "Date of Birth": "dob",
        "Local Govt": "localgovt.local_name",
        Ward: "ward.ward_name",
        "OHIS Number": "id_card_number",
        "Health Facility": "userprovider.agency_name",
        "Card Expiry Date": "expiry_date",
        Sector: "sectorType",
        gender: "gender",
        "Date Enrolled": "created_at",
        // 'MDA':'place_of_work',
        "NIN Number": "nimc_number",
        HMO: "usertpa.organization_name",
        "Enrolled By First Name": "userenrolledby.firstname",
        "Enrolled By Last Name": "userenrolledby.lastname",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  computed: {
    //
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        this.idcard_offline = JSON.parse(e.target.result);
      };
      reader.readAsText(file);
    },
    getClients() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/null-expiry`, {
          agency_id: 95930,
        })
        .then((response) => {
          this.clients = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteUser(client) {
      if (confirm("Are you sure you want to delete?")) {
        if (client.account_type == "Dependent") {
          this.axios
            .delete(`/api/v1/auth/deletedependent/${client.id}`)
            .then((response) => {
              console.log(response);
              this.$toasted.success("deleted Successfully!", {
                position: "top-center",
                duration: 3000,
              });
            })
            .catch((error) => {
              console.error(error);
              this.$toasted.error("Error!", {
                position: "top-center",
                duration: 3000,
              });
            });
        } else {
          this.axios
            .delete(`/api/v1/auth/deleteUser/${client.id}`)
            .then((response) => {
              console.log(response);
              this.$toasted.success("deleted Successfully!", {
                position: "top-center",
                duration: 3000,
              });
            })
            .catch((error) => {
              console.error(error);
              this.$toasted.error("Error!", {
                position: "top-center",
                duration: 3000,
              });
            });
        }
      }
    },

    autoUpdate() {
      if (confirm("Are you sure you want to auto update?")) {
        setInterval(
          function() {
            this.updateDateauto();
          }.bind(this),
          3000
        );
      }
    },

    updateDateauto() {
      this.isLoading = true;

      // this.auto_selected = this.clients.data[0]
      //  console.log(this.auto_selected)
      //  let formatter =  this.idcard_offline.filter((x) => x.id_card_number == this.auto_selected.id_card_number);

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/multiverse/add`, {
          firstname: this.idcard_offline[this.json_index].firstname,
          lastname: this.idcard_offline[this.json_index].lastname,
          middlename: this.idcard_offline[this.json_index].middlename,
          gender: this.idcard_offline[this.json_index].gender,
          dob: this.idcard_offline[this.json_index].dob,
          expiry_date: this.idcard_offline[this.json_index].expiry_date,
          id_card_number: this.idcard_offline[this.json_index].id_card_number,
          CATEGORY: this.idcard_offline[this.json_index].CATEGORY,
          provider_id: this.idcard_offline[this.json_index].provider_id,
          place_of_work: this.idcard_offline[this.json_index].place_of_work,
          org_id: this.idcard_offline[this.json_index].org_id,
          user_image: this.idcard_offline[this.json_index].user_image,
          plan_type: this.idcard_offline[this.json_index].plan_type,
          nimc_number: this.idcard_offline[this.json_index].nimc_number,
          enrolled_by: this.idcard_offline[this.json_index].enrolled_by,
          agency_id: 95930,
          sector: this.idcard_offline[this.json_index].sector,
          sectorType: this.idcard_offline[this.json_index].sectorType,
          marital_status: this.idcard_offline[this.json_index].marital_status,
          localgovt: this.idcard_offline[this.json_index].localgovt,
          user_role: 0,
        })
        .then((response) => {
          console.log(response);
          // this.getClients()
          this.isLoading = false;
          this.json_index++;
          this.$toasted.success("updated!", {
            position: "top-center",
            duration: 1000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.success("error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },

    updateDate(client) {
      this.isLoading = true;
      let formatter = this.idcard_offline.filter(
        (x) => x.id_card_number == client.id_card_number
      );

      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .post(`/api/v1/auth/update-dates-all`, {
          values: formatter,
        })
        .then((response) => {
          console.log(response);
          this.getClients();
          this.isLoading = false;
          this.$toasted.success("updated Successfully!", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.$toasted.success("error!", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
  },
  created() {
    this.getClients();
  },
};
</script>
