<template>
  <v-app>
    <Sidebar />

    <v-toolbar app clipped-right dark>
      <v-toolbar-side-icon left></v-toolbar-side-icon>
      <v-toolbar-title>UIAI2018</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar";

export default {
  components: {
    Sidebar
  },
  methods: {
    logout() {
      localStorage.removeItem("access");
      this.$store.commit("SET_IS_LOGGED_IN", false);
      this.$store.commit("SET_ACCESS_TOKEN", "");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
