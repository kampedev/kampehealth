<template>
 <section class="admin-content " id="contact-search">
  <Navbar/>
    <div>
       <div class="bg-dark m-b-30">
           <div class="container">
               <div class="row p-b-60 p-t-60">

                   <div class="col-md-6 text-center mx-auto text-white p-b-30">
                       <div class="m-b-10">
                           <div class="avatar ">
                           </div>
                       </div>
                       <h3 class="h5">{{complaint.data.title}}</h3>
                   </div>

               </div>
           </div>
       </div>
       <section class="pull-up">
           <div class="container">

               <div class="row list">
                   <div class="col-lg-12 col-md-8">
                       <div class="card m-b-30" >
                           <div class="card-header">

                           </div>

                           <div class="card-body">

                             <div class="form-group" >

                                 <button class="btn btn-info spacer" @click="closeComplain" v-if="complaint.data.status != 'closed' && user.type != 'client'">mark as closed</button>


                               <button class="btn btn-primary"  style="margin-left:10px;" @click="rejectcomplaint" v-if="complaint.status != 0 && complaint.status == null && user.type == 'shis'">Reject</button>

                               <p>
                                 <span v-if="complaint.data.status == 'unanswered'">
                                   <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-secondary">unanswered</button>
                                  </span>
                                  <span v-if="complaint.data.status == 'open'">
                                    <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-warning">open</button>
                                   </span>
                                  <span v-if="complaint.data.status == 'closed'">
                                  <button type="button" class="btn m-b-15 ml-2 mr-2 badge badge-soft-info">closed</button>
                               </span>
                               </p>



                               <p><strong>Content</strong>: <span>{{complaint.data.description}}</span> </p>
                               <br>
                               <p><strong>Type:</strong>  {{complaint.data.type}}</p>
                               <br>
                               <p><strong>Sent by:</strong>  {{complaint.enrollee.full_name}} </p>
                               <br>
                               <p><strong>Date Created:</strong> {{complaint.data.created_at}}</p>
                               <br>

                             </div>



                           </div>
                       </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-lg-7 col-md-7">
                       <div class="card m-b-30">
                           <div class="card-body">

                             <div class="card bg-default" v-for="comment in complaint.comments"
                              v-bind:key="comment.id"
                              style="margin-top:10px;">
                                <div class="card-body">
                                  <p class="">
                                    {{comment.body}}
                                  </p>
                                  <p class="text-info">By: {{comment.user.firstname}} {{comment.user.lastname}} - <span v-if="comment.user.type != 'client'">ZAMCHEMA</span> </p>
                                </div>
                             </div>


                           </div>
                       </div>
                   </div>

                       <div class="col-lg-5 col-md-5" >
                           <div class="card m-b-30">
                             <div class="card-header">
                               <strong class="h4">Comment</strong>
                             </div>

                               <div class="card-body" >

                                 <div class="form-group col-md-12" v-if="complaint.data.status != 'closed'">
                                    <label for="inputAddress">Please add a Comment</label>
                                    <textarea name="name" rows="5" cols="80" class="form-control" v-model="body"></textarea>
                                    <button type="button" class="btn btn-primary" @click="addComment" style="margin-top:10px;">submit</button>
                                    <p class="text-primary"> Please make sure this issue is resolved quickly as you can only post 15 comments per complaint.
                                      <br>Thank you
                                    </p>

                                </div>
                                <div class="" v-if="complaint.data.status == 'closed'">
                                  <p>comment closed for this complaint/inquiry</p>
                                </div>


                               </div>
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
     </div>

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
      comment:"",
      body:"",
      complaint:"",
      show:false,
      isLoading: false,
      fullPage: true,
      agency_id:""
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods:{
    getComplaint(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/complaint/${this.$route.params.id}`)
                  .then(response => {
                      this.complaint = response.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },

    addComment(){
        this.axios.post(`/api/v1/auth/addComment`,{
          user_id: this.user.id,
          complaint_id: this.$route.params.id,
          body: this.body
        })
                    .then(response => {
                        console.log(response)
                        this.getComplaint()
                        this.show = false
                        this.body = ""
                        this.$toasted.info('Submitted Successfully!', {position: 'top-center', duration:3000 })

                })
    },
    closeComplain(){

      if (confirm('Are you sure you want to close?') ) {
        this.isLoading = true
        this.axios.post(`/api/v1/auth/update-complaint/status`,{
          id: this.complaint.data.id,
          status: 'closed'
        })
                    .then(response => {
                        console.log(response)
                        this.getComplaint()
                        this.isLoading = false
                        this.$toasted.info('updated Successfully!', {position: 'top-center', duration:3000 })

                })
      }
    },
    rejectClaim(){
      if (confirm('Are you sure you want to reject?') ) {
        this.axios.post(`/api/v1/auth/rejectClaim/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response)
                        // this.getClaim()
                        this.show = true;
                })
      }
    }
  },
  created(){
  this.getComplaint()
  }

}
</script>
<style scoped >
.spacer{
  margin-top:10px;
  margin-bottom:10px;
}
</style>
