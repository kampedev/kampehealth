<template>
  <section class="admin-content " id="contact-search">
    <Navbar/>


    <div >
    <SingleClientKogi/>
    </div>

   </section>
</template>

<script>

  import Navbar from '@/views/Navbar.vue'
  import SingleClientKogi from '@/views/clients/SingleClientKogi.vue'

export default {
  components: {
     Navbar,   SingleClientKogi
  },
  data(){
    return{
      user:null,
      auth_user:"",
      client:"",
      notes:"",
      medications:"",
      healthFacility:"",
      edit:false,
      isLoading: false,
      fullPage: true,
      agency_id:"",
      imagefile:"",
      pictureShower:true,

    }
  },
  mounted(){


  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    // this.axios.get(`/api/v1/auth/user/zam/${this.$route.params.id}`)
    //             .then(response => {
    //                 this.client = response.data.user
    //                 console.log(response)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })

  },

  methods:{

    // fetchUser(){
    //   this.user = JSON.parse(localStorage.getItem('user'))
    //   this.axios.get(`/api/v1/auth/user/${this.$route.params.id}`)
    //     .then(response => {
    //         this.client = response.data.user
    //         console.log(response)

    //         // get facility
    //         this.axios.get(`/api/v1/auth/user/${this.client.provider_id}`)
    //                     .then(response => {
    //                         this.healthFacility = response.data.user
    //                         console.log(response)
    //                     })
    //                     .catch(error => {
    //                         console.error(error);
    //                     })
    //         //end of facility

    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
    // },




  },
  created(){
  //
  }

}
</script>
<style >
.spacer{
  margin-left:15px;
}
.spacer-image{
  margin-top:25px;
}
.spacer-top-bottom{
  margin-top:10px;
  margin-bottom:10px;
}
.spacer-top{
  margin-top:50px;
}
#container {
	margin: 0px auto;
	width: 500px;
	height: 375px;
	border: 10px #333 solid;
}
#videoElement {
	width: 500px;
	height: 375px;
	background-color: #666;
}
</style>
