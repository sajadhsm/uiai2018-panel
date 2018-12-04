<template>
  <v-layout>
    <v-flex>
      <v-card color="success" dark>
        <v-card-title primary-title>
          <div>
            <h2>منتظر دیدار شما در مرحله حضوری هستیم!</h2>
            <p>{{paymentInfo.message}}</p>
            <div>
              <p class="mb-0"><b>شماره فاکتور:</b> {{paymentInfo.factor_number}}</p>
              <p class="mb-0"><b>شماره پیگیری:</b> {{paymentInfo.trace_number}}</p>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["paymentInfo"],
};
</script>