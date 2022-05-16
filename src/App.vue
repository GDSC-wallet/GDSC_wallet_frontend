<template>
  <v-app>
    <v-main>
      <template v-if="isReady">
        <v-container fluid style="height: 100%">
          <router-view />
        </v-container>
        <v-bottom-navigation app grow fixed v-model="route" v-if="isLoggedin">
          <v-btn value="Home" to="/">
            <span>Home</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-btn value="Chart" to="/chart">
            <span>Table</span>
            <v-icon>mdi-table</v-icon>
          </v-btn>
          <v-btn depressed @click="openRecordModal">
            <span>New</span>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn value="Chart" to="/chart">
            <span>Chart</span>
            <v-icon>mdi-chart-pie</v-icon>
          </v-btn>
          <v-btn value="Setting" to="/setting">
            <span>Setting</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-bottom-navigation>
        <RecordModal />
      </template>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RecordModal from "./components/RecordModal/Main.vue"

export default {
  name: "App",
  data() {
    return {
      route: "Home",
    };
  },
  components: {
    RecordModal: RecordModal
  },
  mounted() {
    this.login();
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      openModal: "record/openModal",
      switchCreateMode: "record/createMode",
    }),
    openRecordModal() {
      this.openModal();
      this.switchCreateMode()
    }
  },
  computed: {
    ...mapGetters({
      isLoggedin: "auth/isLoggedin",
      isReady: "auth/isReady",
    }),
  },
  watch: {
    isLoggedin() {
      if (!this.isLoggedin)
        return this.$router.push({ path: "/login", replace: true });
    },
  },
};
</script>

<style>
.v-bottom-navigation--fixed {
  position: fixed !important;
}

.v-item-group.v-bottom-navigation .v-btn {
  height: inherit !important;
}

.v-btn::before {
  background-color: transparent !important;
}

.v-tab::before {
  background-color: transparent !important;
}
</style>