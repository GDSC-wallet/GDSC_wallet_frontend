<template>
  <v-sheet class="d-flex flex-column justify-center" style="height: 100%">
    <v-sheet class="d-flex justify-center">
      <v-btn href="https://wallet.ebg.tw/oauth/google/login" color="primary">
        <v-icon small left>mdi-google</v-icon>
        login
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    if (this.isLoggedin) return this.$router.push({ path: "/", replace: true });
  },
  methods: {},
  computed: {
    ...mapGetters({
      isLoggedin: "auth/isLoggedin",
    }),
  },
  watch: {
    isLoggedin() {
      if (this.isLoggedin)
        return this.$router.push({ path: "/", replace: true });
    },
  },
};
</script>