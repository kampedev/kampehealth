<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    //
  },
  data() {
    return {
      auth_user: "",
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    let type = this.user.type;
    let role = this.user.user_role;
    if (type == "client") {
      this.$router.push("/client-dashboard");
    }
    if (type == "hmo") {
      this.$router.push("/hmo-dashboard");
    }
    if (type == "employee" && role == 0) {
      this.$router.push("/employee-dashboard");
    }
    if (type == "provider") {
      this.$router.push("/provider-dashboard");
    }
    if (type == "shis" || role == 1) {
      this.$router.push("/state-dashboard");
    }
    if (type == "tpa") {
      this.$router.push("/tpa-dashboard");
    }
    if (type == "tpa_employee") {
      this.$router.push("/tpa-employee-dashboard");
    }

    if (type == "provider_employee") {
      this.$router.push("/personnel");
    }

    this.$router.go();
  },

  mounted() {
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },

  methods: {
    //
  },
  created() {
    //
  },
};
</script>
