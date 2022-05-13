<template>
  <v-sheet>
    <p>this is Setting</p>
    <v-btn @click="logout">logout</v-btn>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";

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
  computed: {},
};
</script>