<template>
  <section class="admin-content " id="contact-search">

  <!-- <Navbar/> -->
      <main class="admin-main">


                         <section>
                           <div class="container row">
                             <div class="col-md-11" v-show="showinput">
                                 <div class="text-center">
                                     <h3 class="h3">(Offline) Bio Data </h3>
                                 </div>
                                                          <div class="form-row">

                                                            <div class="form-group col-md-12">
                                                              <label for="inputCity">Select Sector</label>
                                                                  <select class="form-control"  v-model="sector" >
                                                                   <option  value="formal">Formal Sector</option>
                                                                   <option  value="informal">Informal Sector</option>
                                                               </select>
                                                            </div>

                                                            <div class="col-md-12" v-if="sector == 'formal' " >
                                                                <div class="form-group">
                                                                  <label for="inputCity">Select Formal Sector</label>
                                                                      <select class="form-control"  v-model="newStudent.sector" >
                                                                       <option  value="State Civil Servant Healthcare Plan">State Civil Servant Healthcare Plan</option>
                                                                       <option  value="LGA Civil Servant Healthcare Plan">LGA Civil Servant Healthcare Plan </option>
                                                                       <option  value="State Pensioneers Healthcare Plan">State Pensioneers Healthcare Plan</option>
                                                                       <option  value="LGA Pensioneers Healthcare Plan">LGA Pensioneers Healthcare Plan</option>
                                                                       <option  value="Oganized Private Sector Plan">Organized Private Sector Plan</option>
                                                                       <option value="Tertiary Institution Contributory Health Insurance Plan (TICHIP)">
                                                                         Tertiary Institution Contributory Health Insurance Plan (TICHIP)</option>
                                                                   </select>
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-6"  v-if="sector == 'informal'">
                                                              <label >Informal Sector</label>
                                                                <select class="form-control" v-model="newStudent.sector">
                                                                  <option  value="Basic Healthcare Provision Fund">Basic Healthcare Provision Fund</option>
                                                                  <option  value="Vulnerable Groups">Vulnerable Groups</option>
                                                                  <option  value="Voluntary Contributor">Voluntary Contributor</option>
                                                                  <option  value="Organized Community Healthcare Plan">Organized Community Healthcare Plan</option>
                                                               </select>
                                                            </div>

                                                            <div class="form-group col-md-6"  v-if="sector == 'informal'">
                                                              <label >Special Needs</label>
                                                                <select class="form-control" v-model="newStudent.category_of_vulnerable_group">
                                                                  <option  value="Pregnant Women">Pregnant Women</option>
                                                                  <option  value="Children under 5">Children under 5</option>
                                                                  <option  value="Aged">Aged</option>
                                                                  <option  value="IDP">IDP</option>
                                                                  <option  value="Physically Challenged">Physically Challenged</option>
                                                                  <option  value="People with Special Needs">People with Special Needs</option>
                                                                  <option  value="Poorest of the Poor">Poorest of the Poor</option>
                                                               </select>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">NIN Number</label>
                                                                <input type="text" class="form-control" v-model="newStudent.nimc_number"  placeholder="NIN Number">
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label for="inputPassword4">Surname</label>
                                                                <input type="text" class="form-control" v-model="newStudent.lastname"  placeholder="Last Name">
                                                            </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">First Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.firstname" placeholder="First Name">
                                                               </div>
                                                               <div class="form-group col-md-6">
                                                                   <label for="inputEmail4">Middle Name</label>
                                                                   <input type="text" class="form-control" v-model="newStudent.middlename" placeholder="Middle Name">
                                                               </div>

                                                           </div>
                                                           <div class="form-row">
                                                                <!-- <div class="form-group col-md-6">
                                                                    <label for="inputEmail4">Email</label>
                                                                    <input type="email" class="form-control" v-model="newStudent.email" placeholder="Email">
                                                                </div> -->

                                                                <div class="form-group col-md-6">
                                                                    <label for="inputPassword4">Phone Number {{client_number.length}}</label>
                                                                    <input type="text" class="form-control" v-model="client_number" placeholder="Phone Number" >
                                                                      <div color="alert alert-warning" role="alert" v-if="client_number.length < 14">
                                                                        Number must be 14 characters
                                                                      </div>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                  <p>  <label for="inputPassword4">Date of Birth</label></p>
                                                                    <!-- <input type="text" class="form-control" v-model="newStudent.dob" placeholder="1994/01/01" > -->
                                                                    <date-picker v-model="newStudent.dob" valueType="format"></date-picker>
                                                                </div>

                                                                <div class="form-group col-md-12" v-if="sector == 'formal'">
                                                                    <label for="inputEmail4">Computer Number</label>
                                                                    <input type="text" class="form-control" v-model="newStudent.salary_number" placeholder="Computer Employment Number">
                                                                </div>
                                                            </div>

                                                                  <div class="form-row" v-if="sector == 'formal'">
                                                                       <div class="form-group col-md-6">
                                                                         <label for="inputCity">Select MDA</label>
                                                                             <select class="form-control"  v-model="newStudent.place_of_work" >
                                                                               <option  :value="mda.name" v-for="mda in mdas" v-bind:key="mda.id">{{mda.name}}</option>
                                                                          </select>
                                                                       </div>

                                                                   </div>

                                                            <div class="row">
                                                              <div class="form-group col-md-6">
                                                                <label >Facility for Accessing Care: </label>
                                                                  <select class="form-control" v-model="newStudent.provider_id">
                                                                    <option  :value="provider.id" v-for="provider in providers" v-bind:key="provider.id">{{provider.agency_name}}</option>
                                                                 </select>
                                                              </div>
                                                              <div class="col-md-6">
                                                                <label for="inputCity">Gender</label>
                                                                    <select class="form-control"  v-model="newStudent.gender" >
                                                                     <option  value="Male">Male</option>
                                                                     <option  value="Female">Female</option>
                                                                 </select>
                                                              </div>

                                                                <div class="form-group col-md-6">
                                                                  <label for="inputCity">LGA {{newStudent.localgovt}}</label>
                                                                  <select class="form-control"  v-model="newStudent.localgovt">
                                                                    <option v-for="lga in kogi_lgas.data" v-bind:key="lga" :value="lga.id">{{lga.local_name}}</option>
                                                                 </select>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label for="inputEmail4">Ward</label>
                                                                    <input type="text" class="form-control" v-model="newStudent.ward" placeholder="Ward">
                                                                </div>

                                                             <div class="form-group col-md-6">
                                                                <label for="inputCity">Blood Group</label>
                                                                    <select class="form-control"  v-model="newStudent.blood" >
                                                                     <option  value="A">A</option>
                                                                     <option  value="B">B</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="O">O</option>
                                                                 </select>
                                                              </div>
                                                              <div class="form-group col-md-6">
                                                                <label >Marital Status</label>
                                                                  <select class="form-control" v-model="newStudent.marital_status">
                                                                    <option  value="Married">Married</option>
                                                                    <option  value="Widow">Widow</option>
                                                                    <option  value="Single">Single</option>
                                                                    <option  value="Divorced">Seperated</option>
                                                                    <option  value="Divorced">Divorced</option>
                                                                 </select>
                                                              </div>
                                                              <!--  <div class="form-group col-md-6">
                                                                <label for="inputCity">Genotype</label>
                                                                    <select class="form-control"  v-model="newStudent.genotype" >
                                                                     <option  value="AA">AA</option>
                                                                     <option  value="AO">AO</option>
                                                                     <option  value="BB">BB</option>
                                                                     <option  value="BO">BO</option>
                                                                     <option  value="AB">AB</option>
                                                                     <option  value="OO">OO</option>
                                                                 </select>
                                                              </div> -->

                                                              <!-- <div class="form-group col-md-6">
                                                                  <label for="inputPassword4">Weight</label>
                                                                  <input type="text" class="form-control" v-model="newStudent.weight" placeholder="Weight in (Kg)" >
                                                              </div> -->

                                                              </div>

                                                              <div class="form-group">
                                                                 <label for="inputAddress">Home Address</label>
                                                                 <textarea name="name" rows="3" cols="80"  class="form-control" v-model="newStudent.address" placeholder="1234 Main St"></textarea>
                                                             </div>



                                                             <div class="form-group">
                                                                 <button class="btn btn-primary btn-block btn-lg" @click="showImage" v-if="client_number.length ==14">Proceed to Take Picture</button>
                                                                 <button class="disabled btn btn-primary btn-block btn-lg" v-if="client_number.length != 14">Proceed to Take Picture</button>
                                                             </div>

                                                            </div>

                                                            <div v-show="showcamera" class="container-fluid ">
                                                              <h3 class="h3">Client Picture </h3>

                                                              <div class="form-group">
                                                                <div class="row">
                                                                  <div class="col-md-4">
                                                                    <button  class="btn btn-secondary btn-block btn-lg" @click="showInput">Back</button>
                                                                  </div>
                                                                  <div class="col-md-4">
                                                                    <button  class="btn btn-default btn-block btn-lg" @click="takePic">Capture</button>
                                                                  </div>
                                                                  <div class="col-md-4">
                                                                    <button class="btn btn-primary btn-block btn-lg" @click="takeFinger">Upload Fingerprint</button>
                                                                  </div>

                                                                </div>

                                                              </div>
                                                              <div class="row ">
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                    <video id="video" width="100%"  height="auto" autoplay></video>

                                                                  <div class="col-md-7">
                                                                    <canvas id="canvas" width="300" height="150"></canvas>
                                                                  </div>
                                                                </div>

                                                              </div>
                                                            </div>

                                                            <div v-show="showfinger" class="container-fluid ">
                                                              <h3 class="h5">Client Fingerprint</h3>

                                                              <div class="form-group">
                                                                <div class="row ">
                                                                  <div class="col-md-4">
                                                                    <button  class="btn btn-secondary btn-block btn-lg" @click="showImage">Back</button>
                                                                  </div>
                                                                  <div class="col-md-12">

                                                                    <!-- Start Left Finger -->
                                                                    <div class="" v-show="l_l_finger">
                                                                      <p class="h6 text-center">Left Little Finger</p>
                                                                      <img src="/assets/img/fingers/little_finger.jpg" alt="">

                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Little finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachLLF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showLRF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="l_r_finger">
                                                                      <p class="h6 text-center">Left Ring Finger</p>
                                                                      <img src="/assets/img/fingers/ring_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Ring finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachLRF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showLMF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="l_m_finger">
                                                                      <p class="h6 text-center">Left Middle Finger</p>
                                                                      <img src="/assets/img/fingers/middle_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Middle finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachLMF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showLPF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="l_p_finger">
                                                                      <p class="h6 text-center">Left Pointer Finger</p>
                                                                      <img src="/assets/img/fingers/pointer_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Pointer finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachLPF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showLTF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="l_t_finger">
                                                                      <p class="h6 text-center">Left Thumb</p>
                                                                      <img src="/assets/img/fingers/thumbs.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Thumb</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachLTF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showRLF">Next</button>
                                                                    </div>
                                                                    <!-- End Left Finger -->

                                                                    <!-- Start Right Finger -->
                                                                    <div class="" v-show="r_l_finger">
                                                                      <p class="h6 text-center">Right Little Finger</p>
                                                                      <img src="/assets/img/fingers/little_finger.jpg" alt="">

                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Little finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachRLF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showRRF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="r_r_finger">
                                                                      <p class="h6 text-center">Right Ring Finger</p>
                                                                      <img src="/assets/img/fingers/ring_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Ring finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachRRF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showRMF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="r_m_finger">
                                                                      <p class="h6 text-center">Right Middle Finger</p>
                                                                      <img src="/assets/img/fingers/middle_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Middle finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachRMF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showRPF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="r_p_finger">
                                                                      <p class="h6 text-center">Right Pointer Finger</p>
                                                                      <img src="/assets/img/fingers/pointer_finger.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Pointer finger</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachRPF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer" @click="showRTF">Next</button>
                                                                    </div>

                                                                    <div class="" v-show="r_t_finger">
                                                                      <p class="h6 text-center">Right Thumb</p>
                                                                      <img src="/assets/img/fingers/thumbs.jpg" alt="">
                                                                      <div class="fileinput fileinput-new" data-provides="fileinput" >
                                                                        <span class="btn btn-secondary spacer btn-file">
                                                                          <span class="fileinput-new">Thumb</span>
                                                                          <span class="fileinput-exists">Change</span>
                                                                          <input type="file"   v-on:change="attachRTF">
                                                                        </span>
                                                                        <span class="fileinput-filename"></span>
                                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">&times;</a>
                                                                    </div>
                                                                    <button type="button" class="btn btn-info spacer">Next</button>
                                                                    </div>
                                                                    <!-- End Right Finger -->

                                                                    <div class="" >
                                                                      <div class="col-md-4">
                                                                        <button class="btn btn-primary btn-block btn-lg" @click="add">Submit</button>
                                                                      </div>

                                                                      <img :src="leftfingers">
                                                                      <img :src="rightfingers">
                                                                      <img :src="twothumbs">

                                                                      <div class="row"  ref="leftfingerscanvas">
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.l_l_finger"  class="img-responsive">
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.l_r_finger" class="img-responsive" >
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.l_m_finger" class="img-responsive" >
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.l_p_finger" class="img-responsive" >
                                                                            </div>
                                                                      </div>
                                                                      <div class="row"  ref="rightfingerscanvas">
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_l_finger"  class="img-responsive">
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_r_finger" class="img-responsive" >
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_m_finger" class="img-responsive" >
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_p_finger" class="img-responsive" >
                                                                            </div>
                                                                      </div>

                                                                      <div class="row"  ref="thumbscanvas">
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_t_finger"  class="img-responsive">
                                                                            </div>
                                                                            <div class="col-xs-3 col-md-3 col-lg-3">
                                                                              <img :src="finger_data.r_t_finger" class="img-responsive" >
                                                                            </div>
                                                                      </div>


                                                                    </div>

                                                                </div>



                                                                </div>

                                                              </div>
                                                              <div class="row ">
                                                                <div class="col-md-12 p-t-20 p-b-20">
                                                                    <video id="video" width="100%"  height="auto" autoplay></video>

                                                                  <div class="col-md-7">
                                                                    <canvas id="canvas" width="650px" height="500px"></canvas>
                                                                  </div>
                                                                </div>

                                                              </div>
                                                            </div>


                                        <div>
                                  </div>


                              <!-- <div class="card-body" v-for="student in students" v-bind:key="student.id">
                              <p>{{student.firstname}}</p>
                              <p>{{student.gender}}</p>
                              <p>{{student.user_image}}</p>
                              <button @click="remove(student.id)" class="btn btn-primary">Delete</button>
                             </div> -->

                             <div class="vld-parent">
                                  <loading :active.sync="isLoading"
                                  loader="dots"
                                  :can-cancel="true"
                                  :is-full-page="fullPage"></loading>
                              </div>
                            </div>
                        </section>
                      </main>

</section>
</template>
<script>
import { StudentService } from "../../service/student_service";
import DatePicker from 'vue2-datepicker';
// Import component
   import Loading from 'vue-loading-overlay';
   // Import stylesheet
   import 'vue-loading-overlay/dist/vue-loading.css';
   import statesJson from './../../../public/offline/states.json'
   import zamfaraJson from './../../../public/offline/zamfara_lga.json'
   import yobeJson from './../../../public/offline/yobe_lga.json'
   import kogiJson from './../../../public/offline/kogi_lga.json'

export default {
  components: {
      Loading, DatePicker
  },
  name: "Student",
  props: {
    students: {
      required: true,
      type: Array
    }
  },
  data: function() {
    return {
      newStudent: null,
      showinput: true,
      showcamera: false,
      showfinger: false,
      l_l_finger: false,
      l_r_finger: false,
      l_m_finger: false,
      l_p_finger: false,
      l_t_finger: false,
      r_l_finger: false,
      r_r_finger: false,
      r_m_finger: false,
      r_p_finger: false,
      r_t_finger: false,
      previewfingers: false,
      providers:"",
      imagefile:"",
      user: null,
      editStudent: {},
        fullPage: true,
        client_number:"+234",
        leftfingers:null,
        rightfingers:null,
        twothumbs:null,
        sector:"",
        finger_data:{
          l_l_finger: '',
          l_r_finger: '',
          l_m_finger: '',
          l_p_finger: '',
          l_t_finger: '',
          r_l_finger: '',
          r_r_finger: '',
          r_m_finger: '',
          r_p_finger: '',
          r_t_finger: '',
        },
        show:false,
        states:statesJson,
        zamfara_lgas:zamfaraJson,
        yobe_lgas:yobeJson,
        kogi_lgas:kogiJson,
        isLoading: false,
        video_settings:{
                video: {
                  width: {
                    min: 1280,
                    ideal: 1920,
                    max: 2560,
                  },
                  height: {
                    min: 720,
                    ideal: 1080,
                    max: 1440
                  },
                  facingMode: 'environment'
                }
              },
      service: new StudentService()
    };
  },

  beforeMount: function() {
    this.clear();
    this.user = JSON.parse(localStorage.getItem('user'))
    this.axios.get(`/api/v1/auth/providerAgency/${this.user.institutional_id}`)
                .then(response => {
                    this.providers = response.data.data
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })

  },
  methods: {
    
    async showCanvasleft() {
     const el = this.$refs.leftfingerscanvas;
     // add option type to get the image version
     // if not provided the promise will return
     // the canvas.
     const options = {
       type: 'dataURL'
     }
     this.leftfingers = await this.$html2canvas(el, options);
     console.log(el)
   },
   async showCanvasright() {
    const el = this.$refs.rightfingerscanvas;
    // add option type to get the image version
    // if not provided the promise will return
    // the canvas.
    const options = {
      type: 'dataURL'
    }
    this.rightfingers = await this.$html2canvas(el, options);
  },
      async showThumbs() {
       const el = this.$refs.thumbscanvas;
       // add option type to get the image version
       // if not provided the promise will return
       // the canvas.
       const options = {
         type: 'dataURL'
       }
       this.twothumbs = await this.$html2canvas(el, options);
     },
    attachLLF(event){
     const file = event.target.files[0];
     this.finger_data.l_l_finger = URL.createObjectURL(file);
     this.showCanvasleft()
 },
   attachLRF(event){
    const file = event.target.files[0];
    this.finger_data.l_r_finger = URL.createObjectURL(file);
    this.showCanvasleft()
  },
  attachLMF(event){
   const file = event.target.files[0];
   this.finger_data.l_m_finger = URL.createObjectURL(file);
   this.showCanvasleft()
  },
  attachLPF(event){
   const file = event.target.files[0];
   this.finger_data.l_p_finger = URL.createObjectURL(file);
   this.showCanvasleft()
  },
  attachLTF(event){
   const file = event.target.files[0];
   this.finger_data.l_t_finger = URL.createObjectURL(file);
   this.showCanvasleft()
   this.showThumbs()
  },
  attachRLF(event){
   const file = event.target.files[0];
   this.finger_data.r_l_finger = URL.createObjectURL(file);
   this.showCanvasright()
},
 attachRRF(event){
  const file = event.target.files[0];
  this.finger_data.r_r_finger = URL.createObjectURL(file);
  this.showCanvasright()
},
attachRMF(event){
 const file = event.target.files[0];
 this.finger_data.r_m_finger = URL.createObjectURL(file);
 this.showCanvasright()
},
attachRPF(event){
 const file = event.target.files[0];
 this.finger_data.r_p_finger = URL.createObjectURL(file);
 this.showCanvasright()
},
attachRTF(event){
 const file = event.target.files[0];
 this.finger_data.r_t_finger = URL.createObjectURL(file);
 this.showCanvasright()
 this.showThumbs()
},
 showInput(){
   this.showinput = true;
   this.showcamera = false;
   this.showfinger = false;
 },
    showImage(){
      this.showinput = false;
      this.showcamera = true;
      this.streamPic()
    },
    takeFinger(){
      this.showinput = false;
      this.showcamera = false;
      this.showfinger = true;
      this.l_l_finger = true;
    },
    showLRF(){
      this.l_l_finger = false;
      this.l_r_finger = true;
    },
    showLMF(){
      this.l_r_finger = false;
      this.l_m_finger = true;
    },
    showLPF(){
      this.l_m_finger = false;
      this.l_p_finger = true;
    },
    showLTF(){
      this.l_p_finger = false;
      this.l_t_finger = true;
    },
    showRLF(){
      this.l_t_finger = false;
      this.r_l_finger = true;
    },
    showRRF(){
      this.r_l_finger = false;
      this.r_r_finger = true;
    },
    showRMF(){
      this.r_r_finger = false;
      this.r_m_finger = true;
    },
    showRPF(){
      this.r_m_finger = false;
      this.r_p_finger = true;
    },
    showRTF(){
      this.r_p_finger = false;
      this.r_t_finger = true;
    },
    showPreviewFinger(){
      this.r_t_finger = false;
      this.previewfingers = true;
    },

    streamPic(){
      var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia(this.video_settings).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });

      }
    },
    takePic(){
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, 300, 150);

        // get image
        var image = new Image();

        image.src = canvas.toDataURL("image/png");
        console.log(image)
        localStorage.setItem('snap',this.imagefile.src);
        this.imagefile = image.src

        // upload image

        // end of upload image

    },
    async add() {
      try {
        // const studentsAdded = await this.service.addStudent(this.newStudent);
        const studentsAdded = await this.service.addStudent({
          firstname: this.newStudent.firstname,
          lastname: this.newStudent.lastname,
          middlename: this.newStudent.middlename,
          nimc_number: this.newStudent.nimc_number,
          provider_id: this.newStudent.provider_id,
          phone_number: this.client_number,
          dob: this.newStudent.dob,
          gender: this.newStudent.gender,
          user_image: this.imagefile,
          localgovt: this.newStudent.localgovt,
          ward: this.newStudent.ward,
          sector: this.newStudent.sector,
          marital_status: this.newStudent.marital_status,
          blood: this.newStudent.blood,
          salary_number: this.newStudent.salary_number,
          place_of_work: this.newStudent.place_of_work,
          category_of_vulnerable_group: this.newStudent.category_of_vulnerable_group,
          genotype: this.newStudent.genotype,
          left_fingers: this.leftfingers,
          right_fingers: this.rightfingers,
          thumbs_fingers: this.twothumbs,
          address: this.newStudent.address,
          agency_id: this.user.institutional_id,
          enrolled_by: this.user.id,
        });
        this.$emit("add-item", studentsAdded[0]);
        this.clear();
        this.showInput();
        this.$toasted.info('Client Added Successfully', {position: 'top-center', duration:3000 })

      } catch (ex) {
        alert(ex.message);
      }
    },
    getProviders(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/providerAgency/${this.user.id}`)
                  .then(response => {
                      this.providers = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    clear() {
      this.newStudent = {
        name: "",
        gender: "",
        client_number: "234",
        country: "",
        city: ""
      };
    },
    edit(id) {
      var student = this.students.find(qry => qry.id === id);
      this.editStudent = {
        id: student.id,
        firstname: student.firstname,
        lastname: student.lastname,
        phone_number: student.phone_number,
        dob: student.dob,
        gender: student.gender,
        genotype: student.genotype,
        address: student.address
      };
    },
    async remove(id) {
      const service = new StudentService();
      service;
      const noOfStudentRemoved = await this.service.removeStudent(id);
      if (noOfStudentRemoved > 0) {
        this.$emit("remove-item");
      }
    },
    async update(id) {
      id;
      // debugger;
      const noOfStudentsUpdated = await this.service.updateStudentById(
        this.editStudent
      );
      if (noOfStudentsUpdated > 0) {
        this.cancelUpdate();
        this.$emit("update-item");
      }
    },
    cancelUpdate() {
      this.editStudent = {};
    }
  }
};
</script>
<style scoped>
  .spacer{
    margin-left:5px;
    margin-top:5px;
  }

#videoElement {
	width: 500px;
	height: 375px;
	background-color: #666;
}
</style>
