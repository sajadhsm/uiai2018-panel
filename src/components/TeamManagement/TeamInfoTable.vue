<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>اطلاعات تیم</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="leaveTeamDialog" max-width="500px">
          <v-tooltip right slot="activator">
            <v-btn icon right slot="activator">
              <v-icon>block</v-icon>
            </v-btn>
            <span>خروج از تیم</span>
          </v-tooltip>
          <v-card>
            <v-card-text>آیا از خروج از این تیم مطمئن هستید؟</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                flat
                @click.native="leaveTeamDialog = false">خیر</v-btn>
              <v-btn
                color="blue darken-1"
                flat
                @click.native="handleLeaveTeam">بله</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" icon right>
            <v-icon>settings</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>ویرایش اطلاعات تیم</v-card-title>

            <v-card-text>
              <v-form ref="editTeamForm" v-model="valid">
                <v-text-field
                  v-model="teamName"
                  :rules="teamNameRules"
                  label="نام تیم"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                flat
                @click.native="close">لغو</v-btn>
              <v-btn
                color="blue darken-1"
                flat
                :disabled="!valid"
                @click.native="sumbitEditForm">ویرایش</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="teamInfo"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <!-- <td class="text-xs-center">
            <v-avatar color="#ddd">
              <img :src="props.item.logo" :alt="props.item.name">
            </v-avatar>
          </td> -->
          <td class="text-xs-center py-4">{{ props.item.name }}</td>
          <td class="text-xs-center py-4">{{ props.item.members[0] }}</td>
          <td class="text-xs-center py-4">{{ props.item.members[1] || '-'}}</td>
          <td class="text-xs-center py-4">{{ props.item.members[2] || '-' }}</td>
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
    dialog: false,
    leaveTeamDialog: false,
    valid: true,
    teamName: "",
    teamNameRules: [
      v => !!v || "نام تیم الزامی است",
      v =>
        /[A-Za-z0-9 _-]/.test(v) ||
        "نام تیم فقط باید شامل حروف انگلیسی، اعداد، فاصله و یا کاراکترهای - و ـ باشد",
      v => (v && v.length <= 16) || "نام تیم باید کمتر از ۱۶ حرف باشد"
    ],
    headers: [
      // { text: "لوگو", value: "logo", align: "center", sortable: false },
      { text: "نام تیم", value: "name", align: "center", sortable: false },
      { text: "عضو اول", value: "members", align: "center", sortable: false },
      { text: "عضو دوم", value: "members", align: "center", sortable: false },
      { text: "عضو سوم", value: "members", align: "center", sortable: false }
    ]
  }),
  computed: mapState({
    teamInfo: state => [state.teamInfo],
    accessToken: state => state.accessToken
  }),
  methods: {
    close() {
      this.dialog = false;
      this.$refs.editTeamForm.reset();
    },
    sumbitEditForm() {
      if (this.$refs.editTeamForm.validate()) {
        axios
          .post(
            "/team/create/",
            { name: this.teamName },
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
            this.$store.dispatch("getTeamInfo");
            this.close();
          })
          .catch(error => {
            if (error.response) {
              this.$store.dispatch("showSnackbar", {
                text: error.response.data.message,
                color: "error"
              });

              this.$refs.editTeamForm.reset();
            }
          });
      }
    },
    handleLeaveTeam() {
      this.$store
        .dispatch("leaveTeam")
        .then(data => {
          this.$store.dispatch("showSnackbar", {
            text: data.message,
            color: "success"
          });

          this.leaveTeamDialog = false;
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {
            text: error.message,
            color: "error"
          });
        });
    }
  }
};
</script>