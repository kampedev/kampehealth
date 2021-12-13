<template>
  <div class="container">
    <div class="jumbotron">
      OHIS PLAN RENEWAL
    </div>
    <div class="client__details">
      <h3 class="CTA__prompt">Enter Your Details</h3>
      <input type="text" placeholder="OHIS Number, Email, Virtual Account" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

.container {
}
.jumbotron {
  background: black;
  text-align: center;
  color: #fff;
  padding: 3rem 12rem;
}

.client__details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  border: none;
}
</style>
