<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>
    <main class="admin-main">
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                               <!-- <div class="avatar-title rounded-circle fe fe-briefcase"></div> -->
                           </div>
                       </div>
                       <h3> </h3>
                       <strong> TPA Dashboard</strong>

                   </div>


               </div>
           </div>
       </div>
       <section  v-if="user.type =='shis' || user.id == '2707'">
           <div class="container">

               <div class="row list">

                   <div class="col-md-12 m-b-30">

                       <div>
                          <b-card no-body>
                            <b-tabs pills card>
                              <b-tab title="MARKFEMA NIGERIA LTD" active>
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th>ENROLLEES</th>
                                          <th>TOTAL</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>Gusau Central Market</td> <td>39</td> <td rowspan="0"><strong>1,669</strong>  </td> </tr>
                                        <tr> <td>Directorate of Information</td> <td>9</td> </tr>
                                        <tr> <td>DURET</td> <td>26</td> </tr>
                                        <tr> <td>Establishment and Training Department</td> <td>561</td> </tr>
                                        <tr> <td>Fertilizer Company</td> <td>73</td> </tr>
                                        <tr> <td>Fire Service</td> <td>578</td> </tr>
                                        <tr> <td>Forestry II Project</td> <td>55</td> </tr>
                                        <tr> <td>Government House Gusau</td> <td>147</td> </tr>
                                        <tr> <td>Government Printing Press</td> <td>13</td> </tr>
                                        <tr> <td>High Court of Justice</td> <td>0</td> </tr>
                                        <tr> <td>Hotels Management and Tourism Board</td> <td>14</td> </tr>
                                        <tr> <td>House of Assembly</td> <td>107</td> </tr>
                                        <tr> <td>Housing Corporation</td> <td>1</td> </tr>
                                        <tr> <td>Directorate of Inter Community Relations</td> <td>0</td> </tr>
                                        <tr> <td>Directorate of Inter Party Relation</td> <td>17</td> </tr>
                                        <tr> <td>Directorate of Protocols</td> <td>0</td> </tr>
                                        <tr> <td>Directorate of Sport Development</td> <td>29</td> </tr>

                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="UNITED COMPREHENSIVE HEALTH MANAGERS">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                          <th>TOTAL</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>Arabic and Islamic Education Board</td> <td>1,123</td> <td rowspan="0"><strong>3,967</strong>  </td> </tr>
                                        <tr> <td>Female Education Board</td> <td>2,050</td> </tr>
                                        <tr> <td>Investment Company</td> <td>0</td> </tr>
                                        <tr> <td>Judicial Service Commission </td> <td>32</td> </tr>
                                        <tr> <td>King Fahad Woman & Childrens Hospitals</td> <td>146</td> </tr>
                                        <tr> <td>Law Reform</td> <td>6</td> </tr>
                                        <tr> <td>Local Government Audit</td> <td>31</td> </tr>
                                        <tr> <td>Local Government Auditor General </td> <td>3</td> </tr>
                                        <tr> <td>Local Government Pension Board </td> <td>15</td> </tr>
                                        <tr> <td>Local Government Service Commission </td> <td>5</td> </tr>
                                        <tr> <td>Liason Office Kaduna</td> <td>5</td> </tr>
                                        <tr> <td>Library Board</td> <td>1</td> </tr>
                                        <tr> <td>Ministry of Agriculture</td> <td>218</td> </tr>
                                        <tr> <td>Ministry of Animals Health</td> <td>221</td> </tr>
                                        <tr> <td>Ministry of Budget and Economy</td> <td>50</td> </tr>
                                        <tr> <td>Ministry of Commerce Industries</td> <td>61</td> </tr>
                                        <tr> <td>Ministry of Culture and Tourism</td> <td>0</td> </tr>
                                        <tr> <td>Ministry for Rural and Community</td> <td>0</td> </tr>


                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="ASHMED INTEGRATED HEALTH SERVICES">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>UNIVERSAL BASIC  EDUCATION</td> <td> <strong> 5,977</strong></td> </tr>

                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="PRECIOUS HEALTHCARE LTD">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                          <th> TOTAL</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>Zamfara College of Arts & Science</td> <td>223</td> <td rowspan="0"><strong>2,459</strong>  </td> </tr>
                                        <tr> <td>Zamfara Agricultural Development Project</td> <td>206</td> </tr>
                                        <tr> <td>Zamfara Radio and Television</td> <td>136</td> </tr>
                                        <tr> <td>Zamfara State Pension Board</td> <td>13</td> </tr>
                                        <tr> <td>Zamfara Poverty Alleviation</td> <td>3</td> </tr>
                                        <tr> <td>Zamfara Road Maintenance</td> <td>9</td> </tr>
                                        <tr> <td>Zamfara State Printing & Publ.</td> <td>5</td> </tr>
                                        <tr> <td>Zamfara Urban and Regional Planning</td> <td>57</td> </tr>
                                        <tr> <td>Zamfara State Internal Revenue Serivce</td> <td>115</td> </tr>
                                        <tr> <td>Zamfara State Mass Education</td> <td>1,213</td> </tr>
                                        <tr> <td>Zamfara State Hajj Commission</td> <td>2</td> </tr>
                                        <tr> <td>Hisbah Commission</td> <td>477</td> </tr>


                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="INIFINITE X2 HMS LTD">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>Ministry for Local Government and Chieftaincy Affairs</td> <td>1</td> <td rowspan="0"><strong>2,441</strong>  </td> </tr>
                                        <tr> <td>Zamfara State Schools Feeding </td> <td>610</td> </tr>
                                        <tr> <td>Ministry of Education </td> <td>515</td> </tr>
                                        <tr> <td>Ministry of Environment </td> <td>72</td> </tr>
                                        <tr> <td>Ministry of Finance</td> <td>433</td> </tr>
                                        <tr> <td>Ministry of Health</td> <td>3</td> </tr>
                                        <tr> <td>Ministry of Higher Education</td> <td>3</td> </tr>
                                        <tr> <td>Ministry of Housing and Town Planning</td> <td>0</td> </tr>
                                        <tr> <td>Ministry of Information</td> <td>49</td> </tr>
                                        <tr> <td>Ministry of Justice</td> <td>155</td> </tr>
                                        <tr> <td>Ministry of Land and Survey</td> <td>0</td> </tr>
                                        <tr> <td>Ministry for Local Government and Chieftaincy Affairs</td> <td>0</td> </tr>
                                        <tr> <td>Ministry for Religious Affairs</td> <td>1</td> </tr>
                                        <tr> <td>Ministry for Religious Affairs</td> <td>1</td> </tr>
                                        <tr> <td>Ministry of Transport</td> <td>24</td> </tr>
                                        <tr> <td>Ministry of Water Resources</td> <td>107</td> </tr>
                                        <tr> <td>Ministry of Women, Children and Social</td> <td>198</td> </tr>
                                        <tr> <td>Ministry of Works</td> <td>211</td> </tr>
                                        <tr> <td>Ministry of Youth and Sports</td> <td>58</td> </tr>
                                        <tr> <td>Political Affairs Department</td> <td>0</td> </tr>

                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="SONGHAI HEALTH TRUST LTD">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                          <th> TOTAL</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>2nd Livestock Project</td> <td>6</td>  <td rowspan="0"><strong>2,418</strong>  </td></tr>
                                        <tr> <td>Abdu Gusau Polytechnic</td> <td>487</td> </tr>
                                        <tr> <td>Administration</td> <td>1</td> </tr>
                                        <tr> <td>Directorate of Afforestation</td> <td>153</td> </tr>
                                        <tr> <td>Gusau Amusement</td> <td>2</td> </tr>
                                        <tr> <td>College of Agriculture & Animal Science</td> <td>219</td> </tr>
                                        <tr> <td>Bureau of Statistics</td> <td>33</td> </tr>
                                        <tr> <td>Cabinet Affairs and Gen. Serv.</td> <td>106</td> </tr>
                                        <tr> <td>College of Education Maru</td> <td>352</td> </tr>
                                        <tr> <td>Commodity Marketting and Ditribution</td> <td>45</td> </tr>
                                        <tr> <td>CSC Consolidated</td> <td>25</td> </tr>
                                        <tr> <td>Council for Art & Culture</td> <td>41</td> </tr>
                                        <tr> <td>Deputy Governors Office</td> <td>58</td> </tr>
                                        <tr> <td>Directorate for Election Matters</td> <td>8</td> </tr>
                                        <tr> <td>Agency for Nomadic Education</td> <td>125</td> </tr>
                                        <tr> <td>Directorate for Rural Water Supply</td> <td>17</td> </tr>
                                        <tr> <td>Zamfara Environmental Sanitation Agency</td> <td>740</td> </tr>

                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>

                              <b-tab title="REGENIX HEALTHCARE SERVICES LTD">
                                <b-card-text>
                                  <div class="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>MDA NAME</th>
                                          <th> ENROLLEES</th>
                                          <th> TOTAL</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr> <td>Directorate of Government Project</td> <td>0</td> <td rowspan="0"><strong>4,569</strong>  </td> </tr>
                                        <tr> <td>State Electoral Commission</td> <td>49</td> </tr>
                                        <tr> <td>Special Services and Home Affairs</td> <td>0</td> </tr>
                                        <tr> <td>Preaching and Estab. Jumuat Mosque</td> <td>23</td> </tr>
                                        <tr> <td>Public Complain Commission</td> <td>13</td> </tr>
                                        <tr> <td>Qur'anic Tajweed and Memorization Fund</td> <td>183</td> </tr>
                                        <tr> <td>Qur'anic Schools Welfare Directorate</td> <td>5</td> </tr>
                                        <tr> <td>School of Nursing & Mid-wifery Gusau</td> <td>0</td> </tr>
                                        <tr> <td>Shari'a Court of Appeal</td> <td>765</td> </tr>
                                        <tr> <td>Sharia'a Research and Development</td> <td>15</td> </tr>
                                        <tr> <td>Special Services and Home Affairs</td> <td>6</td> </tr>
                                        <tr> <td>Science and Technical Teachers Board</td> <td>567</td> </tr>
                                        <tr> <td>State Assembly Service Commission</td> <td>21</td> </tr>
                                        <tr> <td>State Audit</td> <td>3</td> </tr>
                                        <tr> <td>State Auditor General Consolidated</td> <td>70</td> </tr>
                                        <tr> <td>Teachers Service Board Gusau</td> <td>2,321</td> </tr>
                                        <tr> <td>ZACAREP</td> <td>392</td> </tr>
                                        <tr> <td>Zamfara Agricultural and Supply Company</td> <td>136</td> </tr>

                                      </tbody>

                                    </table>

                                  </div>
                                </b-card-text>
                              </b-tab>
                            </b-tabs>
                          </b-card>
                        </div>

                   </div>

               </div>
           </div>


         <div class="vld-parent">
              <loading :active.sync="isLoading"
              loader="dots"
              :can-cancel="true"
              :is-full-page="fullPage"></loading>
          </div>

       </section>
    </main>
   </section>
</template>

<script>
  import Navbar from '@/views/Navbar.vue'
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin


export default {
  components: {
     Navbar, Loading
  },
  data(){
    return{
      user:null,
      tpas:""

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/getorgenrollment`)
                .then(response => {
                    this.tpas = response.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
  },
  methods:{
      //
  },
  created(){
    //
  }

}
</script>
