<template >
  <body class="jumbo-page">
<main class="admin-main">
    <div class="container-fluid">
        <div class="row">
          <div  class="container-fluid ">
            <!-- <p>{{leftfingers}}</p>
            <p>{{rightfingers}}</p>
            <p>{{twothumbs}}</p> -->

            <div v-show="showfinger" class="form-group">
              <div class="row">

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
                    <div class="col-md-8">
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

          </div>

        </div>
    </div>
</main>


<div class="vld-parent">
     <loading :active.sync="isLoading"
     loader="dots"
     :can-cancel="true"
     :is-full-page="fullPage"></loading>
 </div>

  </body>
</template>

<script>
  // Import component
     import Loading from 'vue-loading-overlay';
     // Import stylesheet
     import 'vue-loading-overlay/dist/vue-loading.css';
     // Init plugin

export default {
  components: {
    Loading
  },
  data(){
    return{
      fullPage: true,
      isLoading: false,
      showfinger: true,
      l_l_finger: true,
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
      leftfingers:null,
      rightfingers:null,
      twothumbs:null,
      right_fingers:"",
      left_fingers:"",
      thumbs_fingers:"",
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

    }
  },
  beforeMount(){
//
  },
  methods:{
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
    this.uploadLeftC()
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
    add(){
    if (confirm('Are you sure you want to save?') ) {
      this.uploadRightC()
      this.uploadTwoC()

    }
  },
    uploadLeftC(){
      //upload left finger image
      var formData = new FormData();
      formData.append("user_id", this.$route.params.id)
      formData.append("leftfour", this.leftfingers)
      this.axios.post("/api/v1/auth/uploadLeftfour", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response);
        this.$toasted.info('Left 4 added Successfully', {position: 'top-center', duration:3000 })

      })
      //End of upload left image
    },
    uploadRightC(){
      var formDataright = new FormData();
      formDataright.append("user_id", this.$route.params.id)
      formDataright.append("rightfour", this.rightfingers)
      this.axios.post("/api/v1/auth/uploadRightfour", formDataright, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response);
        this.$toasted.info('Right 4 added Successfully', {position: 'top-center', duration:3000 })

      })
    },
    uploadTwoC(){
      var formDataThumbs = new FormData();
      formDataThumbs.append("user_id", this.$route.params.id)
      formDataThumbs.append("thumbs", this.twothumbs)
      this.axios.post("/api/v1/auth/uploadThumbs", formDataThumbs, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response);
        this.$toasted.info('Thumbs added Successfully', {position: 'top-center', duration:3000 })


      })
    }

  },
  created(){

  }

}
</script>
<style scoped>
  .spacer-top{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
