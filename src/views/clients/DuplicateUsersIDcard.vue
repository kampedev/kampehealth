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
                       <h3>{{clients.length}} Clients</h3>

                       <button type="button" class="btn btn-primary" @click="deleteAll">Delete selected</button>


                   </div>


               </div>
           </div>
       </div>
       <section class="">
           <div class="container">

             <p>
               {{selected}}
             </p>


               <div class="row list">
                   <div class="col-lg-12 col-md-12">
                       <div class="card m-b-30">

                           <div class="card-body">

                             <div class="table-responsive">
                                 <table class="table align-td-middle table-card">
                                     <thead>
                                     <tr>
                                         <th>Name</th>
                                         <th>Phone Number</th>
                                         <th>Type</th>
                                         <th>ID card</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                     <tr v-for="client in clients" v-bind:key="client.id">

                                         <td >{{client.firstname}} {{client.lastname}} {{client.id_card_number}}</td>
                                         <td>{{client.phone_number}}</td>
                                         <td>{{client.type}}</td>
                                         <td>
                                           <input type="text" class="form-control" required v-model="client.id_card_number" placeholder="ID card Number">

                                         </td>
                                         <td>

                                             <button type="button" @click="changeNumber(client)" class="btn btn-primary" style="margin-left:10px; margin-top:10px;" ><i class="fe fe-edit"></i></button>

                                         </td>
                                     </tr>


                                     </tbody>
                                 </table>

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


               </div>
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
      isLoading: false,
      selected: [],
      fullPage: true,
      states:"",
      clients:"",
      state:"",
      lga_states:"",
      register:{
                firstname:"",
                lastname:"",
                email:"",
                phone_number:"",
                type:"client",
                username:"",
                state:"",
                lga:"",
                ward:"",
                address:"",
            }
    }
  },
  beforeMount(){

  },
  computed:{
  //
  },

  methods:{
    deleteAll(){
        let answer = this.selected.toString();
        console.log(answer)
      this.axios.post(`/api/v1/auth/deletemultiple`,{
        ids: answer
      })
                  .then(response => {
                      console.log(response)
                      this.getClients()
                      this.selected = []
                      this.$toasted.success('Deleted Successfully', {position: 'top-center', duration:3000 })

                  })
                  .catch(error => {
                      console.error(error);
                      this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

                  })

    },
    valuepasser(client){
          this.selected.push(client.id)
    },
    getClients(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/duplicate_id_card_number/95930`)
                  .then(response => {
                      this.clients = response.data.data
                      console.log(response)
                  })
                  .catch(error => {
                      console.error(error);
                  })
    },
    changeNumber(client){
      // if (confirm('Are you Sure you want to delete this user') ) {
        this.axios.patch(`/api/v1/auth/id-card-number/change/${client.id}`,{
          id_card_number: client.id_card_number
        })
                    .then(response => {
                        console.log(response)
                        this.getClients()
                        this.$toasted.success('Changed Successfully', {position: 'top-center', duration:3000 })

                    })
                    .catch(error => {
                        console.error(error);
                        this.$toasted.error('Error!', {position: 'top-center', duration:3000 })

                    })
      // }
    },


  },
  created(){
    this.getClients()
  }

}
</script>
