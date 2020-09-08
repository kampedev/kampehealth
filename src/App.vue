<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
// import { initJsStore } from "./service/idb_service";
// import { StudentService } from "./service/student_service";
// import { Global } from "./global";
export default {
  // name: "app",
  // components: {
  //   // StudentGrid
  // },
  // async beforeCreate() {
  //   try {
  //     const isDbCreated = await initJsStore();
  //     if (isDbCreated) {
  //       console.log("db created");
  //       // prefill database
  //     } else {
  //       console.log("db opened");
  //     }
  //   } catch (ex) {
  //     console.error(ex);
  //     alert(ex.message);
  //     Global.isIndexedDbSupported = false;
  //   }
  // },
  // mounted() {
  //   this.refreshStudent();
  // },
  data() {
    return {
      // students: []
    };
  },
  methods: {
    // async refreshStudent() {
    //   this.students = await new StudentService().getStudents();
    // },
    // addStudent(student) {
    //   this.students.push(student);
    // }
  }
};
</script>

<style>

</style>
