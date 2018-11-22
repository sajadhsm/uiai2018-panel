<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>کد‌های ارسال شده</v-toolbar-title>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="uploadedFiles"
        :pagination.sync="pagination"
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
              hide-details>
              <!-- 
                <v-radio
                  ...
                  @click="handleSetFinalCode(props.item.id)"
                  ...>
                Fixes the multi radio button selection bug
                when the last selected code is not compiled currectly...
                Also notice that the setter in computed selectedCodeID
                is commented out since the below solution surprisingly
                works with out it!! O_o
               -->
              <v-radio
                class="ma-0"
                color="success"
                on-icon="check_box"
                off-icon="check_box_outline_blank"
                @click="handleSetFinalCode(props.item.id)"
                :value="props.item.id"/>
            </v-radio-group>
          </td>
          <td class="text-xs-center">
            {{ new Date(props.item.upload_time).toLocaleString() }}
          </td>
          <td class="text-xs-center">{{ props.item.language }}</td>
          <td class="text-xs-center">
            <v-chip :color="statusColor(props.item.compile_status)" text-color="white" small>
              {{ props.item.compile_status }}
            </v-chip>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { text: "کد نهایی", align: "right", sortable: false },
      { text: "تاریخ ارسال", value: "upload_time", align: "center" },
      { text: "زبان", value: "language", align: "center" },
      { text: "وضعیت", value: "compile_status", align: "center" }
    ],
    // Used for default sorting
    pagination: { sortBy: "upload_time", descending: true, rowsPerPage: -1 },
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  computed: {
    selectedCodeID: {
      get() {
        const finalCode = this.$store.state.teamInfo.uploaded_codes.find(
          code => code.is_final
        );

        return finalCode ? finalCode.id : null;
      }
      // Commented out because of @click on v-radio
      // set(value) {
      //    this.handleSetFinalCode(value);
      // }
    },
    ...mapState({
      accessToken: state => state.accessToken,
      uploadedFiles: state => state.teamInfo.uploaded_codes
    })
  },
  methods: {
    handleSetFinalCode(id) {
      axios
        .post(
          "api/team/set_final_code/",
          { id },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          this.$store.dispatch("showSnackbar", {
            text: res.data.message,
            color: "success"
          });
          // Update uploadedCodes table
          this.$store.dispatch("getTeamInfo");
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {
              text: error.response.data.message,
              color: "error"
            });
          }
        });
    },
    statusColor(statusText) {
      if (statusText === "کامپایل موفق") {
        return "green";
      } else if (statusText === "خطای کامپایل") {
        return "red";
      } else {
        return "orange";
      }
    }
  }
};
</script>
