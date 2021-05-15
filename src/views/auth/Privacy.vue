<template >
  <body class="jumbo-page">
<main class="admin-main">
    <div class="container-fluid">
        <div class="row">

            <div class="container spacer-top">
            <div class="card col-lg-10">
                <div class="row align-items-center m-h-70">

                    <div class="mx-auto col-md-8">
                        <div class="text-center">
                            <p class="admin-brand-content">
                                 Privacy Policy
                            </p>
                        </div>


                                      <p>Hayok operates the hayokinsurance.com website, which provides the SERVICE.</p>
                                      <p>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>
                                      <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                                      <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at www.grumie.com , unless otherwise defined in this Privacy Policy.</p>
                                      <p><strong>Information Collection and Use</strong></p>
                                      <p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.</p><p><strong>Log Data</strong></p><p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
                                      <p><strong>Cookies</strong></p>
                                      <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</p>
                                      <p>Our website uses these “cookies” to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</p>
                                      <p><strong>Service Providers</strong></p>
                                      <p>We may employ third-party companies and individuals due to the following reasons:</p>
                                      <ul>
                                        <li class="first-child">To facilitate our Service;</li>
                                        <li>To provide the Service on our behalf;</li>
                                        <li>To perform Service-related services; or</li>
                                        <li class="last-child">To assist us in analyzing how our Service is used.</li>
                                      </ul>
                                      <p>We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
                                      <p><strong>Security</strong></p>
                                      <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                                      <p><strong>Links to Other Sites</strong></p>
                                      <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites,
                                        <a href="http://mrpromocode.com.au/city-beach/" target="_blank">read more</a>. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                                        <p><strong>Children’s Privacy</strong></p>
                                        <p>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>
                                        <p><strong>Changes to This Privacy Policy</strong></p>
                                        <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
                                        <p><strong> <a href="/contact"> Contact Us </a></strong></p>
                                        <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>



                    </div>
                </div>
            </div>
            </div>

            <!-- <div class="col-lg-8 d-none d-md-block bg-cover" style="background-image: url('assets/img/login.svg');">

            </div> -->
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
      identifier:"",
     reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      password:"",
      password_confirmation:"",
      response:"",
      isLoading: false,
      fullPage: true,
      auth_user:""

    }
  },
  beforeMount(){
//
  },
  methods:{

    getUser(){
      this.axios.get(`/api/v1/auth/user`)
                  .then(response => {
                      this.auth_user = response.data.data
                      console.log(response)
                       localStorage.setItem('user',JSON.stringify(response.data.data))
                       // let type = response.data.data.type

                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    logIn(){
            this.isLoading = true;
        if ( this.reg.test(this.identifier) )
            {
                this.axios.post('/api/v1/auth/login',{
                email:this.identifier,
                password:this.password,
                password_confirmation:this.password,
              })

            .then(response=>{
              console.log(response)
              // this.$toasted.info('Welcome back!', {position: 'top-center', duration:3000 })
                let token= response.data.token;
                if(token){

                   localStorage.setItem('jwt',token);

                   if (localStorage.getItem('jwt') != null){

                                 this.$router.push('/pusher')
                        }

                    }
                })
                .catch(error=>{
                    console.log(error.response)
                    this.response = error.response.data.error
                    this.isLoading = false;
                    // this.$toasted.error('Email or Password Incorrect', {position: 'top-center', duration:3000 })
                    this.$toasted.error(`${this.response}`, {position: 'top-center', duration:3000 })

                })

            } else {
                    this.axios.post('/api/v1/auth/login',{
                    username:this.identifier,
                    password:this.password,
                  })

                .then(response=>{
                  console.log(response)
                    let token= response.data.token;
                    if(token){
                       localStorage.setItem('jwt',token);
                       // this.$breadstick.notify("🥞 Welcome to HIP!", {position: "top-right"});
                       if (localStorage.getItem('jwt') != null){
                                     this.$router.push('/pusher')
                            }

                        }
                    })
                    .catch(error=>{
                        console.log(error.response)
                        this.isLoading = false;
                        this.$toasted.error('Username or Password Incorrect', {position: 'top-center', duration:3000 })

                    })
                  }

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
