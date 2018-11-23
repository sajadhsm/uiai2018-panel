<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>ارسال کد</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-container
              grid-list-xl
              class="pa-0">
              <v-layout row wrap>
                <v-flex sm6>
                  <label class="file-select">
                    <span>سورس کد:</span>
                    <div class="select-button mt-2">
                      <span v-if="file">{{file.name}}</span>
                      <span v-else>
                        <v-icon dark>cloud_upload</v-icon> انتخاب فایل zip
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="application/zip"
                      @change="handleFileChange"/>
                  </label>
                </v-flex>

                <v-flex sm6>
                  <div>
                    <span>زبان برنامه‌نویسی:</span>
                    <v-select
                      v-model="lang"
                      :items="progLangs"
                      item-text="text"
                      item-value="value"
                      class="mt-2"
                      solo
                    />
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
          <p>
            <v-icon color="orange" size="20">error_outline</v-icon>
            فایل‌های کلاینت باید مستقیماً در ریشه فایل زیپ قرار بگیرند.
          </p>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!file"
            color="primary"
            @click="submit">ارسال</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: mapState(["accessToken"]),
  data: () => ({
    file: null,
    lang: "CPP",
    progLangs: ["CPP", "PYTHON", "JAVA"],
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

      formData.append("language", this.lang);
      formData.append("zip_file", this.file);

      axios
        .post("api/team/upload_code/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.accessToken}`
          }
        })
        .then(res => {
          this.$store.dispatch("showSnackbar", {
            text: res.data.message,
            color: "success"
          });
          // Update uploadedCodes table table
          this.$store.dispatch("getTeamInfo");
          this.file = null;
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {
            text: error.response.data.message,
            color: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.file-select > .select-button {
  padding: 12px;
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
