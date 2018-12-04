<template>
  <v-container>
    <PaymentInfo v-if="teamInfo.payment.verified" :paymentInfo="teamInfo.payment" class="mb-4"/>
    <Pay v-else class="mb-4"/>
    <HostelRequest/>
  </v-container>
</template>

<script>
import Pay from "./Pay";
import PaymentInfo from "./PaymentInfo";
import HostelRequest from "./HostelRequest";

import { mapState } from "vuex";

export default {
  components: {
    Pay,
    PaymentInfo,
    HostelRequest
  },
  computed: mapState(["teamInfo"])
};
</script>