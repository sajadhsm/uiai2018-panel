<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>کد‌های ارسال شده</v-toolbar-title>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="uploadedFiles"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>
            <!--
              A workaround to achive the single row selection
              may be buggy!!!
            -->
            <v-radio-group
              v-model="selectedCodeID"
              name="rowSelector"
              hide-details
              @click="handleRowSelect">
              <v-radio
                class="ma-0"
                color="success"
                on-icon="check_box"
                off-icon="check_box_outline_blank"
                :value="props.item.id"/>
            </v-radio-group>
          </td>
          <td class="text-xs-center">{{ props.item.upload_date }}</td>
          <td class="text-xs-center">{{ props.item.lang }}</td>
          <td class="text-xs-center">
            <v-chip :color="statusColor(props.item.status)" text-color="white" small>
              {{ props.item.status }}
            </v-chip>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      bottom
      left
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <v-btn class="snackbarBtn" right icon @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    selectedCodeID: 0,
    headers: [
      { text: "کد نهایی", align: "right", sortable: false },
      { text: "تاریخ ارسال", value: "upload_date", align: "center" },
      { text: "زبان", value: "lang", align: "center" },
      { text: "وضعیت", value: "status", align: "center" }
    ],
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    uploadedFiles: [
      {
        id: 0,
        upload_date: new Date().toLocaleString(),
        lang: "C++",
        status: "خطا در کامپایل"
      },
      {
        id: 1,
        upload_date: new Date().toLocaleString(),
        lang: "Java",
        status: "خطا در کامپایل"
      },
      {
        id: 2,
        upload_date: new Date().toLocaleString(),
        lang: "Python",
        status: "کامپایل شده"
      },
      {
        id: 3,
        upload_date: new Date().toLocaleString(),
        lang: "C++",
        status: "در انتظار کامپایل"
      },
    ]
  }),
  computed: mapState({
    accessToken: state => state.accessToken,
    // uploadedFiles: state => state.userInfo.received_invitations
  }),
  methods: {
    handleRowSelect() {
      this.snackbar =  true;
      this.snackbarText =  `کد نهایی (${this.selectedCodeID}) با موفقیت انتخاب شد`;
      this.snackbarColor =  "success";
    },
    statusColor(statusText) {
      if (statusText === "کامپایل شده") {
        return "green";
      } else if (statusText === "خطا در کامپایل") {
        return "red";
      } else {
        return "orange";
      }
    }
  }
};
</script>
