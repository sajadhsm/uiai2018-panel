<template>
  <v-navigation-drawer
    v-model="drawer"
    right
    clipped
    app
  >
    <v-list dense>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>supervisor_account</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>مدیریت تیم</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>contact_mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Contact</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  })
};
</script>