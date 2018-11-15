<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>ارسال کد</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <label class="file-select">
              <div class="select-button">
                <span v-if="file">{{file.name}}</span>
                <span v-else>
                  <v-icon dark>cloud_upload</v-icon> سورس کد را در قالب فایل zip انتخاب کنید
                </span>
              </div>
              <input
                type="file"
                accept="application/zip"
                @change="handleFileChange"/>
            </label>

            <div class="mt-3">
              <span>زبان برنامه‌نویسی</span>
              <v-select
                v-model="lang"
                :items="progLangs"
                class="mt-2"
                solo
              />
            </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!file"
            color="primary"
            @click="submit">ارسال</v-btn>
        </v-card-actions>
      </v-card>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: mapState(["accessToken"]),
  data: () => ({
    file: null,
    lang: "C++",
    progLangs: ["C++", "Python", "Java"],
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  methods: {
    handleFileChange(e) {
      this.file = e.target.files[0];
    },
    submit() {
      const formData = new FormData();

      formData.append("lang", this.lang);
      formData.append("file", this.file);

      // BackEnd endpoint is not ready yet!
      // axios
      //   .post("/uploadcode/", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${this.accessToken}`
      //     }
      //   })
      //   .then(() => {
      //     console.log("SUCCESS!!");
      //   })
      //   .catch(() => {
      //     console.log("FAILURE!!");
      //   });
    }
  }
};
</script>

<style scoped>
.file-select > .select-button {
  padding: 1.5rem 1rem;
  font-size: 1.1rem;
  color: white;
  background-color: hsl(211, 77%, 50%);
  border-radius: 0.2rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.23s;
}
.file-select > .select-button:hover {
  background-color: hsl(211, 77%, 45%);
}

.file-select > input[type="file"] {
  display: none;
}
</style>
