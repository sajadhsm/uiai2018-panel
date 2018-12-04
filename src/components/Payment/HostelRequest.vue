<template>
  <v-layout>
    <v-flex>
      <v-card color="info" dark>
        <v-card-title primary-title>
          <div>
            <h2>درخواست اقامت در خوابگاه</h2>
            <p class="mb-0">در صورتی که مایل به اسکان در خوابگاه هستید، این گزینه را انتخاب کنید.</p>
            <p class="mb-0">هزینه خوابگاه به صورت حضوری اخذ می‌گردد.</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-checkbox
            v-model="needHostel"
            @change="handleRequestHostel"
            label="متقاضی دریافت خوابگاه هستم."
            color="white"
            class="mt-0 mr-1"
            hide-details/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    needHostel: false
  }),
  computed: mapState(['teamInfo']),
  // TODO: Initialize needHostel value when the component has been created
  methods: {
    handleRequestHostel() {
      // TODO: Real request
      this.$store.dispatch("showSnackbar", {
        text: 'درخواست شما با موفقیت ثبت شد.',
        color: "success"
      });
    }
  }
};
</script>