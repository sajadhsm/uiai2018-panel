<template>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  mounted() {
    // Check if the token exists
    // If valid store accessToken
    // if !valid use refreshToken
    // if !valid force login
    const accToken = localStorage.getItem("access");

    if (accToken) {
      axios
        .post("api/token/verify/", {
          token: accToken
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("SET_ACCESS_TOKEN", accToken);
            this.$store.commit("SET_IS_LOGGED_IN", true);
            this.$router.push({ name: "teamManagement" });
          }
        })
        // TODO: Proper error handling
        // eslint-disable-next-line
        .catch(error => {
          if (error.response) console.log(error.response.data);
        });
    }
  }
};
</script>
