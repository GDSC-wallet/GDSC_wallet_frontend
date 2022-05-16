<template>
  <v-sheet>
    <p>{{ basicInformation }}</p>
    <v-btn @click="logout">logout</v-btn>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Setting",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
    })
  },
};
</script>