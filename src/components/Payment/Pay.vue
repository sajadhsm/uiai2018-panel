<template>
  <v-layout>
    <v-flex>
      <v-card color="success" dark>
        <v-card-title primary-title>
          <div>
            <h2>تبریک! شما به مرحله حضوری راه یافتید.</h2>
            <p>لطفا هزینه شرکت در مرحله حضوری را از طریق لینک زیر پرداخت کنید.</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark outline>پرداخت از طریق درگاه آنلاین</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['teamInfo']),
  created() {
    console.log(this.teamInfo)
  }
};
</script>