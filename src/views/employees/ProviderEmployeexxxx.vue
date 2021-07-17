<template>
  <!-- <div class=""> -->

          <div class="" v-if="user.job_title == 'Doctor'">
            <Doctor/>
          </div>
          <div class="" v-if="user.job_title == 'Laboratorist'">
            <Laboratorist />
          </div>
          <div class="" v-if="user.job_title == 'Nurse'">
            <Nurse />

          </div>
            <div class="" v-if="user.job_title == 'Desk'">
              <Desk/>

            </div>
  <!-- </div> -->
</template>

<script>
import Doctor from '@/views/employees/Doctor.vue'
import Laboratorist from '@/views/employees/Laboratorist.vue'
import Nurse from '@/views/employees/Nurse.vue'
import Desk from '@/views/employees/Receptionist.vue'


export default {
  components: {
     Doctor, Laboratorist, Nurse,
     Desk
  },

  data(){
    return{
      user:null

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  },

  methods:{
    //
  },
  created(){
    //
  }
}
</script>
<style lang="css" scoped>
  .spacer-top{
    margin-top:10px;
  }
</style>
