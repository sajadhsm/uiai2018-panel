<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>ورود به داشبورد</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" v-model="valid">
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
              <v-btn
                :disabled="!valid"
                @click="submit"
                color="primary">ورود</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "ایمیل الزامی است",
      v => /.+@.+/.test(v) || "ایمیل معتبر نیست"
    ],
    password: "",
    passwordRules: [v => !!v || "رمزعبور الزامی است"]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(() => this.$router.push({ name: "teamManagement" }))
          .catch(err => {console.log(err)});
      }
    }
  }
};
</script>
