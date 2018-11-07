<template>
  <v-app>
    <Sidebar />

    <v-toolbar app clipped-right dark>
      <v-toolbar-side-icon left></v-toolbar-side-icon>
      <v-toolbar-title>UIAI2018</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>
