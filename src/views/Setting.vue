<template>
  <v-sheet>
    <v-toolbar flat class="mb-3">
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>設定</v-toolbar-title>
      </v-toolbar>
    <v-card class="mx-1">
      <v-card-title>{{ basicInformation.nickname }}</v-card-title>
      <v-card-subtitle>{{ basicInformation.username }}</v-card-subtitle>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
      tagDialogOpen: false,
    };
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
    }),
  },
};
</script>