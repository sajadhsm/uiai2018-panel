<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" right clipped>
      <v-list dense>
        <v-list-tile :to="{name: 'teamManagement'}" exact>
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>مدیریت تیم</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'SourceCodeManagement'}">
          <v-list-tile-action>
            <v-icon>code</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ارسال کد</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'GameManagement'}">
          <v-list-tile-action>
            <v-icon>videogame_asset</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>بازی دوستانه</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'QualificationGames'}">
          <v-list-tile-action>
            <v-icon>verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>بازی‌های انتخابی</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'QualificationStanding'}">
          <v-list-tile-action>
            <v-icon>equalizer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>رده‌بندی مرحله غیرحضوری</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'FinalGames'}">
          <v-list-tile-action>
            <v-icon>beenhere</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>بازی‌های نهایی</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="teamInfo.qualified" :to="{name: 'Payment'}">
          <v-list-tile-action>
            <v-icon>payment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>پرداخت و اسکان</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-right dark>
      <v-toolbar-side-icon left @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>UIAI2018</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <GlobalSnackbar/>
  </v-app>
</template>

<script>
import Snackbar from "./Snackbar";
import { mapState } from "vuex";

export default {
  components: {
    GlobalSnackbar: Snackbar
  },
  data: () => ({ drawer: true }),
  computed: mapState(['teamInfo']),
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
