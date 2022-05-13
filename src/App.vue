<template>
  <v-app>
    <v-main>
      <template v-if="isReady">
        <v-container fluid  style="height: 100%">
          <router-view />
        </v-container>
        <v-bottom-navigation app grow v-model="route" v-if="isLoggedin">
          <v-btn value="Home" to="/">
            <span>Home</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-btn value="Chart" to="/chart">
            <span>Chart</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn value="Setting" to="/setting">
            <span>Setting</span>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      route: "Home",
    };
  },
  mounted() {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken)
    this.login();
  },
  methods: {
    ...mapActions({
      login: "auth/login", // map `this.add()` to `this.$store.dispatch('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      isLoggedin: "auth/isLoggedin",
      isReady: "auth/isReady",
    }),
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
</style>