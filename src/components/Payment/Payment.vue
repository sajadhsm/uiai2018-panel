<template>
  <v-container>
    <PaymentInfo v-if="teamInfo.payment.verified" :paymentInfo="teamInfo.payment" class="mb-4"/>
    <Pay v-else class="mb-4"/>

    <HostelRequested v-if="userInfo.wants_dorm"/>
    <HostelRequest v-else/>
  </v-container>
</template>

<script>
import Pay from "./Pay";
import PaymentInfo from "./PaymentInfo";
import HostelRequest from "./HostelRequest";
import HostelRequested from "./HostelRequested";

import { mapState } from "vuex";

export default {
  components: {
    Pay,
    PaymentInfo,
    HostelRequest,
    HostelRequested
  },
  computed: mapState(["teamInfo", "userInfo"])
};
</script>