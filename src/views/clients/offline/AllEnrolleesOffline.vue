<template>
  <section class="admin-content" id="contact-search">
    <!-- <Navbar/> -->
    <main class="admin-main">
      <div class="col-md-12">
        <button
          type="button"
          class="btn btn-info"
          @click="AllSync"
          :disabled="disabled"
        >
          Sync All {{ this.students.length }} Enrollees
        </button>
      </div>

      <div class="col-md-12" v-show="showsync">
        <div class="card m-b-30" style="margin-top:10px,margin-botton:10px;">
          <p class="h5 text-info text-center">
            Syncing in Progress -- {{ this.students.length }} remaining
          </p>

          <b-progress
            :value="syncvalue"
            :max="synctotal"
            show-progress
            animated
            height="2rem"
          ></b-progress>
          <br />
          <p><strong>Total to be Synced:</strong> {{ synctotal }}</p>
          <p><strong>Successfully Synced:</strong> {{ syncvalue }}</p>
        </div>
      </div>
      <section>
        <div class="container row">
          <div class="table-responsive">
            <table class="table align-td-middle table-card">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>User Type</th>
                  <!-- <th>Gender</th> -->
                  <th>Phone Number</th>
                  <th>Sector</th>
                  <!-- <th>Dep</th> -->
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" v-bind:key="student.id">
                  <td>
                    <div class="avatar avatar-md">
                      <img
                        :src="student.user_image"
                        class="avatar-img avatar-md rounded-circle"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{{ student.firstname }} {{ student.lastname }}</td>
                  <td>{{ student.type }}</td>
                  <!-- <td>{{student.gender}}</td> -->
                  <td>{{ student.phone_number }}</td>
                  <td ><span v-if="student.type == 'client'">{{ student.sector }}</span> </td>
                  <!-- <td>{{student.dependent_rel_type}}</td> -->
                  <td>
                    <button
                      type="button"
                      class="btn btn-info"
                      :disabled="disabled"
                      @click="syncUser(student)"
                      v-if="student.type == 'client'"
                    >
                      <i class="fe fe-refresh-cw"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="editUser(student)"
                      v-if="student.type == 'client'"
                    >
                      <i class="fe fe-edit"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="remove(student)"
                    >
                      <i class="fe fe-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              loader="spinner"
              :can-cancel="false"
              :is-full-page="true"
            ></loading>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
<script>
// const synctotal = this.students.length;
import { StudentService } from "../../../service/student_service";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading,
  },
  name: "Student",
  props: {
    students: {
      required: true,
      type: Array,
    },
  },
  data: function () {
    return {
      disabled: false,
      newStudent: null,
      showsync: false,
      syncvalue: 0,
      synctotal: "",
      user: null,
      fullPage: true,
      sector: "",
      show: false,

      isLoading: false,
      newarray: {
        data: "",
      },

      service: new StudentService(),
    };
  },

  beforeMount: function () {
    // let total = this.students.length;
    // localStorage.setItem('synctotal', total)
    // this.synctotal = localStorage.getItem('synctotal')
  },
  computed: {
    //
  },

  methods: {
    AllSync() {
      if (confirm("Are you sure you want to start syncing?")) {
        this.synctotal = localStorage.getItem("synctotal");
        this.showsync = true;
        setInterval(
          function () {
            this.autoSync();
            if (this.students.length < 1) {
              // clearInterval(repeaterfunct);
              // this.$toasted.info('Syncing Completed Successfully!', {position: 'top-center', duration:10000 })
              this.showsync = false;
            }
          }.bind(this),
          10000
        );
      }
    },

    autoSync() {
      if (this.students.length == 0) {
        this.$toasted.info("Syncing Completed Successfully!", {
          position: "top-center",
          duration: 10000,
        });
        this.showsync = false;
        this.disabled = false;
        this.$router.go();
        this.$toasted.info("Syncing Completed Successfully!", {
          position: "top-center",
          duration: 10000,
        });
        this.$router.push("/employee-dashboard");
      } else {
        let singlesync = this.students[0];
        // this.isLoading = true;
        this.disabled = true;
        this.axios
          .post("/api/v1/auth/syncUser", {
            agency_id: singlesync.agency_id,
            nimc_number: singlesync.nimc_number,
            firstname: singlesync.firstname,
            lastname: singlesync.lastname,
            middlename: singlesync.middlename,
            email: singlesync.email,
            user_image: singlesync.user_image,
            phone_number: singlesync.phone_number,
            type: singlesync.type,
            provider_id: singlesync.provider_id,
            state: "2676",
            role: 0,
            password: "euhler",
            localgovt: singlesync.localgovt,
            ward: singlesync.ward,
            blood: singlesync.blood,
            dob: singlesync.dob,
            expiry_date: singlesync.expiry_date,
            address1: singlesync.address,
            place_of_work: singlesync.place_of_work,
            salary_number: singlesync.salary_number,
            genotype: singlesync.genotype,
            weight: singlesync.weight,
            gender: singlesync.gender,
            sector: singlesync.sector,
            sectorType: singlesync.sectorType,
            org_id: singlesync.org_id,
            marital_status: singlesync.marital_status,
            category_of_vulnerable_group:
              singlesync.category_of_vulnerable_group,
            enrolled_by: singlesync.enrolled_by,
            dependent_rel_type: singlesync.dependent_rel_type,
            dependent_gender: singlesync.dependent_gender,
            dependent_dob: singlesync.dependent_dob,
          })
          .then((response) => {
            console.log(response);
            // this.isLoading = false;
            this.$toasted.info("one down!", {
              position: "top-center",
              duration: 3000,
            });
            this.syncvalue++;
            // let deleteID = this.students[0]
            //End Delete User

            this.removegroupsync(singlesync);
          })
          .catch((error) => {
            console.log(error.response);
            // this.isLoading = false;
            let errormessage = error.response.data.message;
            if (errormessage == "user exist") {
              this.removegroupsync(singlesync);
              // this.removesync(student)
            } else {
              this.$toasted.info("Network Error, retrying!", {
                position: "top-center",
                duration: 7000,
              });
            }
          });
      }
    },
    syncUser(student) {
      // if (confirm('Are you sure you want to sync this user to the server? It will be deleted from your computer!') ) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.isLoading = true;
      this.disabled = true;
      this.axios
        .post("/api/v1/auth/syncUser", {
          agency_id: student.agency_id,
          nimc_number: student.nimc_number,
          firstname: student.firstname,
          lastname: student.lastname,
          middlename: student.middlename,
          email: student.email,
          user_image: student.user_image,
          phone_number: student.phone_number,
          type: student.type,
          provider_id: student.provider_id,
          state: "2676",
          role: 0,
          password: "euhler",
          localgovt: student.localgovt,
          ward: student.ward,
          blood: student.blood,
          salary_number: student.salary_number,
          dob: student.dob,
          expiry_date: student.expiry_date,
          address1: student.address,
          genotype: student.genotype,
          weight: student.weight,
          gender: student.gender,
          sector: student.sector,
          sectorType: student.sectorType,
          org_id: student.org_id,
          marital_status: student.marital_status,
          category_of_vulnerable_group: student.category_of_vulnerable_group,
          enrolled_by: student.enrolled_by,
          dependent_rel_type: student.dependent_rel_type,
          dependent_gender: student.dependent_gender,
          dependent_dob: student.dependent_dob,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$toasted.info("Enrollee synced Successfully", {
            position: "top-center",
            duration: 3000,
          });
          this.disabled = false;
          this.removesync(student);
          //End Delete User
        })
        .catch((error) => {
          console.log(error.response);
          this.isLoading = false;
          this.disabled = false;

          // this.getClients();
          this.$breadstick.notify("Oops! something went wrong", {
            position: "top-right",
          });
        });
      // }
    },

    editUser(student) {
      let singleenrollee = localStorage.setItem(
        "editUser",
        JSON.stringify(student)
      );
      // if (singleenrollee) {
      this.$breadstick.notify("Oops! something went wrong", {
        position: "top-right",
      });
      singleenrollee;
      this.$router.push("/edit-offline");

      // }
    },
    async remove(student) {
      if (confirm("Are you sure you want to delete?")) {
        const service = new StudentService();
        service;
        this.disabled = false;
        const noOfStudentRemoved = await this.service.removeStudent(student.id);
        if (noOfStudentRemoved > 0) {
          this.$emit("remove-item");
          console.log(noOfStudentRemoved);
        }
      }
    },
    async removesync(student) {
      const service = new StudentService();
      service;
      this.disabled = false;
      const noOfStudentRemoved = await this.service.removeStudent(student.id);
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
        console.log(noOfStudentRemoved);
      }
    },
    async removegroupsync(student) {
      const service = new StudentService();
      service;
      const noOfStudentRemoved = await this.service.removeStudent(student.id);
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
        console.log(noOfStudentRemoved);
      }
    },
  },
  created() {
    //
  },
};
</script>
<style scoped>
.spacer {
  margin-left: 5px;
  margin-top: 5px;
}
</style>
