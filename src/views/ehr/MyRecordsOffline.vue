<template>
  <section class="admin-content" id="contact-search">
    <main class="admin-main">
      <section class="">
        <div class="container">
         
            <div class="col-md-12 form-group" >  
                <button 
                data-toggle="modal"
                 data-target="#slideRightModalAll"
                class="btn m-b-15 ml-2 mr-2 btn-outline-info">
                View All Codes <i class="fe fe-mail"> </i>
                </button>
            </div>

           <div class="row list">
           <div class="col-lg-6 col-md-6"  v-for="record in hospital_records"
                          v-bind:key="record.id" >
                        <div class="card m-b-30">
                            <div class="card-header">

                                <div class="card-controls">
                                    <a class="badge badge-soft-info" href="#">{{record.reasonVisit}} </a>
                                   

                                </div>
                            </div>
                            <div class="card-body">
                                <div class="text-center">
                                    <div>
                                        <div class="avatar avatar-xl avatar-dnd">
                                            <img class="avatar-img rounded-circle" src="/assets/img/ohis_logo.png"
                                                 alt="name">
                                        </div>
                                    </div>
                                    <h3 class="p-t-10 searchBy-name">{{ record.patient_id.full_name }} </h3>
                                </div>
                                <div class="text-muted text-center m-b-10">
                                    <a class="btn btn-sm btn-white"> {{record.patient_id.id_card_number}} </a>

                                </div>


                                <p class="text-muted text-center">
                                    {{record.diagnosis.name}}
                                </p>
                                <div class="row text-center p-b-10">
                                    <div class="col">
                                        <a href="#">
                                            <h3 class="fe fe-thermometer"></h3>
                                            <div class="text-overline">{{record.services_id.length}} Services</div>

                                        </a>
                                    </div>
                                    <div class="col">
                                        <a href="#">
                                            <h3 class="mdi mdi-pill"></h3>
                                            <div class="text-overline">{{record.drug_id.length}}  Drugs</div>

                                        </a>

                                    </div>
                                    <div class="col">
                                        <button
                                        data-toggle="modal"
                                         data-target="#slideRightModal"
                                          @click="getSingleEncounter(record)"
                                         >
                                            <h3 class="fe fe-eye"></h3>
                                            <div class="text-overline"> View</div>

                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>


          <div class="row list">

           

            <!-- Modal -->
            <div
              class="modal fade modal-slide-right"
              id="slideRightModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="slideRightModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="slideRightModalLabel">
                      Encounter Details
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" v-if="record != ''">
                    <p class="h3">{{ record.reasonVisit }}</p>
                    <p class="form-group">
                      <i class="fe fe-user"></i> :
                      {{ record.patient_id.full_name }}
                    </p>

                    <p class="form-group">
                      <i class="mdi mdi-card"></i> :
                      {{ record.patient_id.id_card_number }}
                    </p>

                    <p class="form-group">
                      <i class="fe fe-phone"></i> :
                      {{ record.patient_id.phone_number }}
                    </p>

                    <p class="form-group">
                      <i class="fe fe-briefcase"></i> :
                      {{ record.patient_id.usertpa.organization_name }}
                    </p>

                    <p class="form-group">
                      <i class="fe fe-calendar"></i> : {{ record.date_of_visit }}
                    </p>

                     <div class="form-group">
                      <button  @click="copyText" class="btn btn-default">Copy SMS Code <i class="fe fe-copy"></i> </button>  
                    </div>

    
                    <div class="col-md-12 m-b-30 form-group">
                      <p class="h5">
                       {{ services_obj.length }} Services
                        <i class="fe fe-thermometer"></i>
                      </p>
                      <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                          <thead>
                            <tr>
                              <th>Number</th>
                              <th>Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(service, index) in services_obj"
                              v-bind:key="service.id"
                            >
                              <td>{{ index + 1 }}</td>
                              <td>
                                <span>{{ service.description }}</span>
                              </td>
                              <td>
                                {{ service.price }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                     <div class="col-md-12 m-b-30 form-group">
                      <p class="h5">
                        {{ drugs_obj.length }} Drugs
                        <i class="mdi mdi-pill"></i>
                      </p>
                      <div class="table-responsive">
                        <table class="table align-td-middle table-card">
                          <thead>
                            <tr>
                              <th>Number</th>
                              <th>Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(service, index) in drugs_obj"
                              v-bind:key="service.id"
                            >
                              <td>{{ index + 1 }}</td>
                              <td>
                                <span>{{ service.drug_name }}</span>
                              </td>
                              <td>
                                {{ service.price }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" 
                    @click="copyText"
                    class="btn btn-outline-primary spacer">
                      Copy Code <i class="fe fe-copy"> </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!--End of Modal -->

            
            <!-- Modal -->
            <div
              class="modal fade modal-slide-right"
              id="slideRightModalAll"
              tabindex="-1"
              role="dialog"
              aria-labelledby="slideRightModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="printDiv" ref="printNow">
                  <div class="modal-header">
                    <h5 class="modal-title" id="slideRightModalLabel">
                      All Encounter Short Codes
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body">

                    <div class="form-group h5" v-for="(record, index) in hospital_records"  v-bind:key="record.id">
                   ({{index+1}}) EC{{user.institutional_id}}/{{record.patient_id.id}}-{{record.diagnosis.id}}/{{record.date_of_visit  | moment("YYYYMMDD")}}-{{record.date_of_admission| moment("YYYYMMDD")}}-{{record.date_of_discharge| moment("YYYYMMDD")}}/
                    <a v-for="drug in record.drug_id" v-bind:key="drug">{{drug}},0</a>/<a v-for="service in record.services_id" v-bind:key="service">{{service}},0</a>/{{record.reasonVisit.charAt(0)}}{{user.id}}
                   
                   <br/>
                   <hr/>

                   
                    </div>

                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      class="btn btn-outline-primary spacer"
                      @click="printMe"
                    >
                      Print <i class="fe fe-printer"></i>
                    </button>

                   
                  </div>
                </div>
              </div>
            </div>

            <!--End of Modal -->

            <div class="vld-parent">
              <loading
                :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"
              ></loading>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
import moment from 'moment';
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      user: null,
      records: "",
      record: "",
      drugs_obj: "",
      services_obj: "",
      hospital_records: "",
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.clients = JSON.parse(localStorage.getItem("clients"));
    this.diseases = JSON.parse(localStorage.getItem("diseases"));
    this.services = JSON.parse(localStorage.getItem("services"));
    this.drugs = JSON.parse(localStorage.getItem("drugs"));
  },
  computed:{

    changeDateofVisit(){
        let text = this.record.date_of_visit;
        return  moment(String(text)).format('YYYYMMDD')
    },

     changeDateofAdmission(){
        let text = this.record.date_of_admission;
        if (text == "0") {
          return "0";
        }
        else{
          return  moment(String(text)).format('YYYYMMDD')
        }
    },

    changeDateofDischarge(){
        let text = this.record.date_of_discharge;
        if (text == "0") {
          return "0";
        }
        else{
          return  moment(String(text)).format('YYYYMMDD')
        }
    },

    reduceDrugsarray(){
     let newarray =  this.record.drug_id.reduce(function(accumulator, currentValue) {
         return   currentValue.id;
        }, 0);

        return newarray;

    },
      getSMSCode(){
        
         // ENC_{provider_id}
        // /{client_id}-{diagnosis_id}-{is_outpatient}
        // /{date_of_encounter}-{date_of_admission}-{date_of_discharge}
        // /[drug1-drug2-drug3]
        // /[service1-service2-service3]
        // /{reasonforvisit}{proffessional_id}

       let provider = 'EC' + this.user.institutional_id + '/';
       let patient = this.record.patient_id.id + '-' + this.record.diagnosis.id + '/';
       let dates = this.changeDateofVisit + '-' + this.changeDateofAdmission + '-' +  this.changeDateofDischarge + '/';
       let drugs = this.record.drug_id + '/' ;
       let services = this.record.services_id + '/' ;
       let others = this.record.reasonVisit.charAt(0) + this.user.id ;
       return provider + patient + dates + drugs + services + others;
     }
  },
  methods: {

    drugsObject(record){
        var array1 =  this.drugs.data;
       var array2 =   record.drug_id ;

      array1 = array1.filter(function(item) {
        return array2.includes(item.id); 
      })
     
         this.drugs_obj = array1

    },
    ServicesObject(record){
        var array1 =  this.services.data;
       var array2 =   record.drug_id ;

      array1 = array1.filter(function(item) {
        return array2.includes(item.id); 
      })
     
         this.services_obj = array1
         console.log(this.services_obj)

    },
    getSingleEncounter(record) {
        this.isLoading = true
      let osunlgaarray = this.hospital_records;
      let formatter = osunlgaarray.filter((x) => x.id == record.id);
      this.record = formatter[0];
      this.isLoading = false
      this.drugsObject(record)
      this.ServicesObject(record)
      
    },

    copyText(){
      const copyToClipboard = (text) => navigator.clipboard.writeText(text);
      copyToClipboard(this.getSMSCode);
      this.$toasted.info('Copied to clipboard', {position: 'top-center', duration:3000 })

    },

    async SetDB() {
      this.db = await this.getDb();
      this.hospital_records = await this.getDataFromDb();
      this.ready = true;
    },

    async getDb() {
      const DB_NAME = "hospital_data";
      const DB_VERSION = 1;
      // let DB;

      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (e) => {
          console.log("Error opening db", e);
          reject("Error");
        };

        request.onsuccess = (e) => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = (e) => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          let objectStore = db.createObjectStore("hospital_records", {
            autoIncrement: true,
            keyPath: "id",
          });
          objectStore;
        };
      });
    },

    async getDataFromDb() {
      return new Promise((resolve, reject) => {
        reject;
        let trans = this.db.transaction(["hospital_records"], "readonly");
        trans.oncomplete = (e) => {
          resolve(hospital_records);
          e;
        };

        let store = trans.objectStore("hospital_records");
        let hospital_records = [];

        store.openCursor().onsuccess = (e) => {
          let cursor = e.target.result;
          if (cursor) {
            hospital_records.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },
    printMe() {
      var printContents = document.getElementById("printDiv").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
  },
  created() {
    this.SetDB();
  },
};
</script>
