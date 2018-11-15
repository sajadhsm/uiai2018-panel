<template>
  <Dashboard />
</template>

<script>
import Dashboard from "../components/Dashboard";

export default {
  components: {
    Dashboard
  }
};
</script>

<style>
.snackbarBtn {
  /* Fix large left margin in RTL */
  margin-left: 0 !important;
}
</style>