<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>ورود به داشبورد</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                @keyup.native.enter.prevent="valid && submit()">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  name="email"
                  label="ایمیل"
                  type="email"
                  required></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  name="password"
                  label="رمزعبور"
                  type="password"
                  required></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-dialog v-model="forgetPassModal" persistent max-width="500px">
                <v-btn
                  slot="activator"
                  flat
                  class="ml-2"
                  color="primary">
                  فراموشی رمز عبور
                </v-btn>
                <v-card>
                  <v-card-title>
                    <b>فرم درخواست بازیابی رمزعبور</b>
                  </v-card-title>

                  <v-card-text>
                    <v-form
                      v-if="!forgetPassSecondStep"
                      ref="forgetPassForm"
                      v-model="forgetPassValid">
                      <v-text-field
                        v-model="forgetPassEmail"
                        :rules="emailRules"
                        label="ایمیل"
                        required
                      />
                    </v-form>
                    <v-form
                      v-else
                      ref="forgetPassSecondStepForm"
                      v-model="forgetPassSecondStepValid">
                      <v-text-field
                        v-model="forgetPassToken"
                        :rules="notEmptyRule"
                        label="رمز یک‌بار مصرف دریافتی در ایمیل"
                        required
                      />
                      <v-text-field
                        v-model="newPassword"
                        :rules="notEmptyRule"
                        type="password"
                        label="رمز عبور جدید"
                        required
                      />
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      flat
                      @click.native="forgetPassModal = false">بستن</v-btn>

                    <v-btn
                      v-if="forgetPassSecondStep"
                      color="blue darken-1"
                      flat
                      :disabled="!forgetPassSecondStepValid"
                      @click.native="handleForgetPassSecondStep">تغییر رمز</v-btn>
                    <v-btn
                      v-else
                      color="blue darken-1"
                      flat
                      :disabled="!forgetPassValid"
                      @click.native="handleForgetPassSubmit">ارسال درخواست</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn
                :disabled="!valid"
                @click="submit"
                color="primary">ورود</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <GlobalSnackbar />
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";
import Snackbar from "./Snackbar";

export default {
  components: {
    GlobalSnackbar: Snackbar
  },
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "ایمیل الزامی است",
      v => /.+@.+/.test(v) || "ایمیل معتبر نیست"
    ],
    password: "",
    passwordRules: [v => !!v || "رمزعبور الزامی است"],

    forgetPassEmail: "",
    forgetPassModal: false,
    forgetPassValid: true,

    forgetPassSecondStepValid: true,
    forgetPassSecondStep: false,
    forgetPassToken: "",
    newPassword: "",
    notEmptyRule: [v => !!v || "این فیلد الزامی است"]
  }),
  watch: {
    forgetPassModal(val) {
      val || this.close();
    }
  },
  methods: {
    close() {
      this.forgetPassModal = false;
      this.forgetPassSecondStep = false;

      if (this.$refs.forgetPassForm) this.$refs.forgetPassForm.reset();
      if (this.$refs.forgetPassSecondStepForm)
        this.$refs.forgetPassSecondStepForm.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(() => this.$router.push({ name: "teamManagement" }))
          .catch(error => {
            if (error.non_field_errors) {
              this.$store.dispatch("showSnackbar", {
                text: error.non_field_errors[0],
                color: "error"
              });
              this.$refs.form.reset();
            }
          });
      }
    },
    handleForgetPassSubmit() {
      if (this.$refs.forgetPassForm.validate()) {
        axios
          .post("api/password_reset/", { email: this.forgetPassEmail })
          .then(() => {
            this.forgetPassSecondStep = true;

            this.$store.dispatch("showSnackbar", {
              text: "ایمیل بازیابی رمزعبور برای شما ارسال شد.",
              color: "success"
            });
          })
          .catch(error => {
            if (error.response) {
              this.$store.dispatch("showSnackbar", {
                text: "ایمیل نامعتبر است.",
                color: "error"
              });
              this.$refs.forgetPassForm.reset();
            }
          });
      }
    },
    handleForgetPassSecondStep() {
      if (this.$refs.forgetPassSecondStepForm.validate()) {
        axios
          .post("api/password_reset/confirm/", {
            token: this.forgetPassToken,
            password: this.newPassword
          })
          .then(() => {
            this.$store.dispatch("showSnackbar", {
              text: "رمز عبور شما با موفقیت تغییر کرد.",
              color: "success"
            });

            this.close();
          })
          .catch(error => {
            if (error.response) {
              this.$store.dispatch("showSnackbar", {
                text: error.response.statusText,
                color: "error"
              });
            }
          });
      }
    }
  }
};
</script>
